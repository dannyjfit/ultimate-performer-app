// ═══════════════════════════════════════════════════════════════
// GENERATOR RENDERING — shared logic for both training & meal
// ═══════════════════════════════════════════════════════════════

// ─── WORKOUT COMPLETION MESSAGES ────────────────────────────────
const WORKOUT_MESSAGES = [
  "That's another one in the bank. 💪",
  "Done. Most people didn't even start.",
  "Logged. Your future self just said thank you.",
  "Another workout, another standard set.",
  "You showed up. That's the whole game.",
  "Work done. Recovery mode activated.",
  "That's what consistency looks like.",
  "One more. Keep stacking them.",
  "Built different. 🔥",
  "Earned it. Every rep counts.",
  "That's the streak alive. Don't break it.",
  "Didn't feel like it? Did it anyway. That's the difference.",
  "Session logged. On to the next one.",
  "This is what discipline looks like in real life.",
  "Another day, another standard held."
];

// ─── WORKOUT COMPLETION FUNCTIONS ───────────────────────────────
async function logWorkoutCompletion(workoutName, btnEl) {
  const originalText = btnEl.innerHTML;
  btnEl.disabled = true;
  btnEl.innerHTML = 'Logging...';

  try {
    const { data: { user } } = await _db.auth.getUser();
    if (!user) { btnEl.disabled = false; btnEl.innerHTML = originalText; return; }

    const { error } = await _db.from('workout_completions').insert({
      user_id: user.id,
      workout_name: workoutName,
      completed_at: new Date().toISOString()
    });

    if (error) throw error;

    const msg = WORKOUT_MESSAGES[Math.floor(Math.random() * WORKOUT_MESSAGES.length)];
    btnEl.innerHTML = '✅ Logged!';
    btnEl.style.background = '#2d7a4f';
    btnEl.style.borderColor = '#2d7a4f';

    // Show toast message
    progressToast(msg, 'success');

    // Update streak on dashboard if visible
    if (typeof loadWorkoutStreak === 'function') loadWorkoutStreak();

    setTimeout(() => {
      btnEl.disabled = false;
      btnEl.innerHTML = '✅ Finish Workout';
      btnEl.style.background = '';
      btnEl.style.borderColor = '';
    }, 3000);

  } catch(e) {
    console.error(e);
    btnEl.disabled = false;
    btnEl.innerHTML = originalText;
    progressToast('Could not log workout. Try again.', 'error');
  }
}

async function loadWorkoutStreak() {
  const streakEl = document.getElementById('dashboard-streak');
  const streakCountEl = document.getElementById('streak-count');
  const streakLabelEl = document.getElementById('streak-label');
  if (!streakEl || !streakCountEl) return;

  try {
    const { data: { user } } = await _db.auth.getUser();
    if (!user) return;

    const { data, error } = await _db
      .from('workout_completions')
      .select('completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (error || !data) return;

    // Calculate streak — count consecutive days with at least one workout
    const streak = calculateStreak(data.map(d => d.completed_at));
    streakCountEl.textContent = streak;
    streakLabelEl.textContent = streak === 1 ? 'day streak' : 'day streak';

    // Fire emoji based on streak length
    const fireEl = document.getElementById('streak-fire');
    if (fireEl) {
      if (streak >= 14) fireEl.textContent = '🔥🔥🔥';
      else if (streak >= 7) fireEl.textContent = '🔥🔥';
      else if (streak >= 1) fireEl.textContent = '🔥';
      else fireEl.textContent = '💤';
    }

  } catch(e) {
    console.error('Streak load error', e);
  }
}

function calculateStreak(timestamps) {
  if (!timestamps.length) return 0;

  // Get unique days (YYYY-MM-DD in local time)
  const days = [...new Set(timestamps.map(ts =>
    new Date(ts).toLocaleDateString('en-CA') // YYYY-MM-DD format
  ))].sort().reverse();

  if (!days.length) return 0;

  const today = new Date().toLocaleDateString('en-CA');
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');

  // Streak must include today or yesterday to be active
  if (days[0] !== today && days[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i-1]);
    const curr = new Date(days[i]);
    const diff = (prev - curr) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

async function loadWorkoutHistory() {
  const el = document.getElementById('workout-history-list');
  if (!el) return;

  try {
    const { data: { user } } = await _db.auth.getUser();
    if (!user) return;

    const { data, error } = await _db
      .from('workout_completions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(30);

    if (error || !data) { el.innerHTML = '<p class="prog-empty">No workouts logged yet.</p>'; return; }

    const totalEl = document.getElementById('workout-total-count');
    if (totalEl) totalEl.textContent = data.length;

    if (!data.length) {
      el.innerHTML = '<p class="prog-empty">No workouts logged yet. Hit Finish Workout after your first session.</p>';
      return;
    }

    el.innerHTML = data.map(d => {
      const date = new Date(d.completed_at).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
      const time = new Date(d.completed_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      return `<div class="workout-history-row">
        <div class="workout-history-name">${d.workout_name}</div>
        <div class="workout-history-date">${date} at ${time}</div>
      </div>`;
    }).join('');

  } catch(e) {
    el.innerHTML = '<p class="prog-empty">Could not load workout history.</p>';
  }
}

// ─── TRAINING GENERATOR ─────────────────────────────────────────
const _tgState = {
  tg:  {loc:null,level:null,days:null,goal:null},
  tg2: {loc:null,level:null,days:null,goal:null}
};
let _tgActiveVid = null;

function tgPick(btn, ns) {
  const grp = btn.dataset.grp;
  document.querySelectorAll(`#${ns}-sel .gen-opt-btn[data-grp="${grp}"]`).forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  _tgState[ns][grp] = btn.dataset.val;
  const s = _tgState[ns];
  document.getElementById(`${ns}-gen-btn`).disabled = !(s.loc && s.level && s.days && s.goal);
}

function tgGenerate(ns, silent=false) {
  const s = _tgState[ns];
  const key = `${s.loc}_${s.days}`;
  const days = TGPLANS[key]?.[s.level];
  if (!days) { if(!silent) alert('Plan not found — try different options.'); return; }

  if (!silent) {
    saveField('training_loc', s.loc);
    saveField('training_level', s.level);
    saveField('training_days', s.days);
    saveField('training_goal', s.goal);
    const other = ns==='tg' ? 'tg2' : 'tg';
    _tgState[other] = {...s};
    Object.entries(s).forEach(([grp,val]) => {
      document.querySelectorAll(`#${other}-sel .gen-opt-btn[data-grp="${grp}"]`).forEach(b => b.classList.toggle('sel', b.dataset.val===val));
    });
    document.getElementById(`${other}-gen-btn`).disabled = false;
    tgRender(other, days, s);
    document.getElementById(`${other}-sel`).style.display='none';
    document.getElementById(`${other}-plan`).style.display='block';
  }
  tgRender(ns, days, s);
  document.getElementById(`${ns}-sel`).style.display='none';
  document.getElementById(`${ns}-plan`).style.display='block';
}

function tgRender(ns, days, s) {
  const g = TGGOALS[s.goal];
  const locL = {gym:'Gym',home_db:'Home — Dumbbells',home_bw:'Bodyweight Only'};
  const lvlL = {beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced'};

  document.getElementById(`${ns}-subtitle`).textContent = `${g.label} · ${locL[s.loc]} · ${lvlL[s.level]} · ${s.days} Days/Week`;
  document.getElementById(`${ns}-meta`).innerHTML = [locL[s.loc],lvlL[s.level],s.days+' Days/Week',g.label].map(t=>`<span class="gen-meta-tag">${t}</span>`).join('');
  document.getElementById(`${ns}-intro`).innerHTML = `<p>${g.intros[s.level]}</p>`;

  const tabsEl = document.getElementById(`${ns}-tabs`);
  const sessEl = document.getElementById(`${ns}-sessions`);
  tabsEl.innerHTML = ''; sessEl.innerHTML = '';

  days.forEach((day,i) => {
    const tab = document.createElement('button');
    tab.className = 'gen-day-tab'+(i===0?' active':'');
    tab.textContent = `Day ${i+1}`;
    tab.onclick = () => tgSwitchDay(ns, i);
    tabsEl.appendChild(tab);
    const sess = document.createElement('div');
    sess.className = 'gen-session'+(i===0?' active':'');
    sess.innerHTML = tgBuildSession(day, s.goal, s.level);
    sessEl.appendChild(sess);
  });
}

function tgSwitchDay(ns, i) {
  document.querySelectorAll(`#${ns}-tabs .gen-day-tab`).forEach((t,j) => t.classList.toggle('active',j===i));
  document.querySelectorAll(`#${ns}-sessions .gen-session`).forEach((s,j) => s.classList.toggle('active',j===i));
}

function tgChange(ns) {
  document.getElementById(`${ns}-plan`).style.display='none';
  document.getElementById(`${ns}-sel`).style.display='block';
}

function tgBuildSession(day, goal, level) {
  const g = TGGOALS[goal];
  const sets = level==='advanced' ? 3 : 2;
  const safeWorkoutName = day.name.replace(/'/g, "\\'");
  const finishBtn = `<div class="finish-workout-wrap">
    <button class="finish-workout-btn" onclick="logWorkoutCompletion('${safeWorkoutName}', this)">
      ✅ Finish Workout
    </button>
  </div>`;
  let h = `<div class="gen-session-title">${day.name}</div><div class="gen-session-sub">${sets} rounds per block · ${g.rest}</div>`;
  h += tgBlock('🔥 Warm Up','', tgWarmup(day.warmup), '');
  h += tgBlock('💪 Tri-Set A',`${sets} rounds — back to back`, tgExList(day.triA,goal,sets), `<div class="gen-rest-note">⏱ ${g.rest} after final exercise. Repeat ${sets} rounds.</div>`);
  h += tgBlock('🔁 Tri-Set B',`${sets} rounds — back to back`, tgExList(day.triB,goal,sets), `<div class="gen-rest-note">⏱ ${g.rest} after final exercise. Repeat ${sets} rounds.</div>`);
  h += tgBlock('🧠 Core Finisher','2 rounds', tgExList(day.core,goal,2), '');
  h += finishBtn;
  return h;
}

function tgWarmup(exs) {
  return exs.map(e => {
    const clean = e.replace(/ \(light\)/,'').replace(/ \(skip if none\)/,'').replace(/^\d+ /,'').trim();
    const link = TGV[clean];
    const uid = 'v'+Math.random().toString(36).slice(2,9);
    const btn = link ? `<div class="gen-ex-link"><button id="vb-${uid}" onclick="tgVid('${uid}','${link}')">▶ Watch</button></div>` : '';
    const vc  = link ? `<div class="gen-video-container" id="vc-${uid}"></div>` : '';
    return `<div class="gen-ex-row-wrap"><div class="gen-ex-row-inner"><div class="gen-ex-info"><div class="gen-ex-name">${e}</div></div>${btn}</div>${vc}</div>`;
  }).join('');
}

function tgReps(type, goal) {
  const r = TGGOALS[goal].reps;
  return (type==='core' ? r.core : type==='compound' ? r.compound : r.isolation)+' reps';
}

function tgExList(exs, goal, sets) {
  return exs.map((ex,i) => {
    const reps = tgReps(ex.type, goal);
    const link = TGV[ex.name];
    const uid  = 'v'+Math.random().toString(36).slice(2,9);
    const btn  = link ? `<div class="gen-ex-link"><button id="vb-${uid}" onclick="tgVid('${uid}','${link}')">▶ Watch</button></div>` : '';
    const vc   = link ? `<div class="gen-video-container" id="vc-${uid}"></div>` : '';
    const aName = TGALTS[ex.name];
    const aLink = aName ? TGV[aName] : null;
    const aUid  = 'v'+Math.random().toString(36).slice(2,9);
    const alt   = aLink ? `<div><div class="gen-alt-label">Can't do this?</div><button class="gen-alt-watch-btn" id="vb-${aUid}" onclick="tgVid('${aUid}','${aLink}')">▶ ${aName}</button><div class="gen-video-container" id="vc-${aUid}"></div></div>` : '';
    const logBtn = `<button class="tg-log-btn" onclick="tgLogExercise('${ex.name.replace(/'/g,"\\'")}', this)">+ Log</button>`;
    return `<div class="gen-ex-row-wrap"><div class="gen-ex-row-inner"><div class="gen-ex-num">${i+1}</div><div class="gen-ex-info"><div class="gen-ex-name">${ex.name}</div><div class="gen-ex-detail">${sets} sets · ${reps}</div></div><div style="display:flex;align-items:center;gap:4px;">${btn}${logBtn}</div></div>${vc}${alt}</div>`;
  }).join('');
}

function tgBlock(title, meta, content, footer) {
  const id = 'blk'+Math.random().toString(36).slice(2,7);
  return `<div class="gen-block"><div class="gen-block-hdr" onclick="tgToggleBlock('${id}')"><span class="gen-block-name">${title}</span><div style="display:flex;align-items:center;gap:10px"><span class="gen-block-meta">${meta}</span><span class="gen-block-chevron open" id="cv${id}">▼</span></div></div><div class="gen-block-body open" id="${id}">${content}${footer}</div></div>`;
}

function tgToggleBlock(id) {
  const body = document.getElementById(id);
  const cv   = document.getElementById('cv'+id);
  const open = body.classList.toggle('open');
  if (cv) cv.classList.toggle('open', open);
}

function tgVid(uid, url) {
  const c = document.getElementById('vc-'+uid);
  const b = document.getElementById('vb-'+uid);
  if (!c||!b) return;
  if (c.style.display==='block') {
    c.style.display='none'; c.innerHTML='';
    b.textContent='▶ Watch'; b.classList.remove('vactive');
    if (_tgActiveVid===uid) _tgActiveVid=null;
    return;
  }
  if (_tgActiveVid) {
    const pv=document.getElementById('vc-'+_tgActiveVid);
    const pb=document.getElementById('vb-'+_tgActiveVid);
    if(pv){pv.style.display='none';pv.innerHTML='';}
    if(pb){pb.textContent='▶ Watch';pb.classList.remove('vactive');}
  }
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([^?&"'>]+)/);
  if (!m) return;
  c.innerHTML = `<div class="gen-video-wrap"><iframe src="https://www.youtube.com/embed/${m[1]}?rel=0&playsinline=1" frameborder="0" allowfullscreen></iframe></div>`;
  c.style.display='block'; b.textContent='✕ Close'; b.classList.add('vactive');
  _tgActiveVid = uid;
}

function tgToggleCooldown(btnId, vidId) {
  const c = document.getElementById(vidId);
  const b = document.getElementById(btnId);
  if (c.style.display==='block') {
    c.style.display='none'; c.innerHTML=''; b.textContent='▶ Watch';
  } else {
    c.innerHTML=`<div class="gen-video-wrap"><iframe src="https://www.youtube.com/embed/FdUFhUuJl1E?rel=0&playsinline=1" frameborder="0" allowfullscreen></iframe></div>`;
    c.style.display='block'; b.textContent='✕ Close';
  }
}

// ─── MEAL GENERATOR ─────────────────────────────────────────────
const _mgState = {
  mg:  {cals:null, diet:null},
  mg2: {cals:null, diet:null}
};

function mgPick(btn, ns) {
  const grp = btn.dataset.grp;
  document.querySelectorAll(`#${ns}-sel .gen-opt-btn[data-grp="${grp}"]`).forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  _mgState[ns][grp] = btn.dataset.val;
  document.getElementById(`${ns}-gen-btn`).disabled = !(_mgState[ns].cals && _mgState[ns].diet);
}

function mgGenerate(ns, silent=false) {
  const {cals, diet} = _mgState[ns];
  const key = `${diet}_${cals}`;
  const plan = MPLANS[key];
  if (!plan) { if(!silent) alert('Plan not found.'); return; }

  if (!silent) {
    saveField('calorie_target', cals);
    saveField('dietary_pref', diet);
    const pc = document.getElementById('plan_calories');
    if (pc && !pc.value) pc.value = cals;
    const macros = diet==='veggie' ? MEAL_VMACROS[parseInt(cals)] : MEAL_MACROS[parseInt(cals)];
    const pp = document.getElementById('plan_protein');
    if (pp && !pp.value) pp.value = macros.p+'g';
    const other = ns==='mg' ? 'mg2' : 'mg';
    _mgState[other] = {cals, diet};
    document.querySelectorAll(`#${other}-sel .gen-opt-btn[data-grp="cals"]`).forEach(b => b.classList.toggle('sel', b.dataset.val===cals));
    document.querySelectorAll(`#${other}-sel .gen-opt-btn[data-grp="diet"]`).forEach(b => b.classList.toggle('sel', b.dataset.val===diet));
    document.getElementById(`${other}-gen-btn`).disabled = false;
    mgRender(other, plan, cals, diet);
    document.getElementById(`${other}-sel`).style.display='none';
    document.getElementById(`${other}-plan`).style.display='block';
  }
  mgRender(ns, plan, cals, diet);
  document.getElementById(`${ns}-sel`).style.display='none';
  document.getElementById(`${ns}-plan`).style.display='block';
}

function mgRender(ns, plan, cals, diet) {
  const macros = diet==='veggie' ? MEAL_VMACROS[parseInt(cals)] : MEAL_MACROS[parseInt(cals)];
  const dietLabel = diet==='meat' ? 'Meat & Fish' : 'Vegetarian';

  document.getElementById(`${ns}-subtitle`).textContent = `${cals} kcal/day · ${dietLabel}`;
  document.getElementById(`${ns}-meta`).innerHTML = [cals+' kcal', dietLabel, 'High Protein', '5 Days'].map(t=>`<span class="gen-meta-tag">${t}</span>`).join('');
  document.getElementById(`${ns}-macros`).innerHTML = `
    <div class="meal-macro-item"><div class="meal-macro-val">${macros.p}g</div><div class="meal-macro-lbl">Protein</div></div>
    <div class="meal-macro-item"><div class="meal-macro-val">${macros.c}g</div><div class="meal-macro-lbl">Carbs</div></div>
    <div class="meal-macro-item"><div class="meal-macro-val">${macros.f}g</div><div class="meal-macro-lbl">Fat</div></div>
    <div class="meal-macro-item"><div class="meal-macro-val">${cals}</div><div class="meal-macro-lbl">Calories</div></div>`;

  const tabsEl = document.getElementById(`${ns}-tabs`);
  const daysEl = document.getElementById(`${ns}-days`);
  tabsEl.innerHTML = ''; daysEl.innerHTML = '';

  const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  plan.forEach((day, i) => {
    const tab = document.createElement('button');
    tab.className = 'meal-day-tab'+(i===0?' active':'');
    tab.textContent = dayNames[i];
    tab.onclick = () => mgSwitchDay(ns, i);
    tabsEl.appendChild(tab);
    const dp = document.createElement('div');
    dp.className = 'meal-day-plan'+(i===0?' active':'');
    dp.innerHTML = mgBuildDay(day);
    daysEl.appendChild(dp);
  });
}

function mgSwitchDay(ns, i) {
  document.querySelectorAll(`#${ns}-tabs .meal-day-tab`).forEach((t,j) => t.classList.toggle('active',j===i));
  document.querySelectorAll(`#${ns}-days .meal-day-plan`).forEach((d,j) => d.classList.toggle('active',j===i));
}

function mgChange(ns) {
  document.getElementById(`${ns}-plan`).style.display='none';
  document.getElementById(`${ns}-sel`).style.display='block';
}

function mgBuildDay(day) {
  const meals = [
    {key:'breakfast', label:'Breakfast', emoji:'🌅'},
    {key:'lunch',     label:'Lunch',     emoji:'☀️'},
    {key:'dinner',    label:'Dinner',    emoji:'🌙'},
    {key:'snack',     label:'Snack',     emoji:'🍎'}
  ];
  return meals.map(m => {
    const meal = day[m.key];
    if (!meal) return '';
    const isSnack = m.key==='snack';
    const cookSection = isSnack ? '' : `<div class="meal-cook-note"><div class="meal-cook-heading">How to make it</div>${meal.method}</div>`;
    const prepBadge = meal.prepNote ? `<div class="meal-prep-note">${meal.prepNote}</div>` : '';
    return `<div class="meal-card-item">
      <div class="meal-card-hdr">
        <span class="meal-card-type">${m.emoji} ${m.label}</span>
        <span class="meal-card-cals">${meal.cals} kcal</span>
      </div>
      <div class="meal-card-body">
        ${prepBadge}
        <div class="meal-card-name">${meal.name}</div>
        <div class="meal-card-macros">
          <div class="meal-card-macro">Protein <span>${meal.p}g</span></div>
          <div class="meal-card-macro">Carbs <span>${meal.c}g</span></div>
          <div class="meal-card-macro">Fat <span>${meal.f}g</span></div>
        </div>
        <ul class="meal-ingredients">
          ${meal.ingredients.map(ing=>`<li><strong>${ing.item}</strong> — ${ing.amount}</li>`).join('')}
        </ul>
        ${cookSection}
      </div>
    </div>`;
  }).join('');
}

// ─── EXERCISE LOGGING ────────────────────────────────────────────
function tgLogExercise(exName, btnEl) {
  const wrap = btnEl.closest('.gen-ex-row-wrap');
  if (!wrap) return;

  let panel = wrap.querySelector('.tg-log-panel');
  if (panel) {
    const isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'block';
    btnEl.classList.toggle('active', !isOpen);
    if (!isOpen) {
      const histEl = panel.querySelector('.tg-log-history');
      tgLoadExHistory(exName, histEl);
    }
    return;
  }

  const safeId = 'log_' + Math.random().toString(36).slice(2, 9);
  panel = document.createElement('div');
  panel.className = 'tg-log-panel';
  panel.style.cssText = 'padding:12px 0 4px;border-top:1px solid rgba(0,0,0,0.07);margin-top:8px;';
  panel.innerHTML = `
    <div class="tg-log-fields">
      <div class="tg-log-field"><label>Weight</label><input class="tg-log-input" type="text" placeholder="e.g. 60kg" id="${safeId}_w"></div>
      <div class="tg-log-field"><label>Sets</label><input class="tg-log-input" type="number" placeholder="3" min="1" id="${safeId}_s"></div>
      <div class="tg-log-field"><label>Reps</label><input class="tg-log-input" type="text" placeholder="e.g. 10" id="${safeId}_r"></div>
    </div>
    <button class="tg-log-save-btn" onclick="tgSaveExLog('${exName.replace(/'/g, "\\'")}','${safeId}',this)">Save</button>
    <div class="tg-log-history" id="${safeId}_hist"></div>
  `;
  wrap.appendChild(panel);
  btnEl.classList.add('active');
  tgLoadExHistory(exName, document.getElementById(safeId + '_hist'));
}

async function tgSaveExLog(exName, safeId, btnEl) {
  if (!_uid) { progressToast('Not logged in', 'error'); return; }
  const weight = document.getElementById(safeId + '_w')?.value.trim() || null;
  const sets   = parseInt(document.getElementById(safeId + '_s')?.value) || null;
  const reps   = document.getElementById(safeId + '_r')?.value.trim() || null;
  if (!weight && !sets && !reps) { progressToast('Add at least one value', 'error'); return; }

  btnEl.disabled = true;
  btnEl.textContent = 'Saving...';

  const { error } = await _db.from('exercise_logs').insert({
    user_id: _uid,
    exercise_name: exName,
    weight,
    sets,
    reps,
    logged_at: new Date().toISOString()
  });

  btnEl.disabled = false;
  btnEl.textContent = 'Save';

  if (error) { progressToast('Could not save. Try again.', 'error'); return; }

  document.getElementById(safeId + '_w').value = '';
  document.getElementById(safeId + '_s').value = '';
  document.getElementById(safeId + '_r').value = '';
  progressToast('Logged ✓');
  tgLoadExHistory(exName, document.getElementById(safeId + '_hist'));
}

async function tgLoadExHistory(exName, histEl) {
  if (!histEl) return;
  if (!_uid) { histEl.innerHTML = ''; return; }
  histEl.innerHTML = '<div class="tg-log-history-loading">Loading...</div>';

  const { data, error } = await _db
    .from('exercise_logs')
    .select('*')
    .eq('user_id', _uid)
    .eq('exercise_name', exName)
    .order('logged_at', { ascending: false })
    .limit(5);

  if (error || !data || !data.length) {
    histEl.innerHTML = '<div class="tg-log-history-empty">No history yet.</div>';
    return;
  }

  histEl.innerHTML = '<div class="tg-log-history-title">Recent</div>' + data.map(d => {
    const date  = new Date(d.logged_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const parts = [d.weight, d.sets ? d.sets + ' sets' : null, d.reps ? d.reps + ' reps' : null].filter(Boolean);
    return `<div class="tg-log-history-row">
      <span class="tg-log-history-date">${date}</span>
      <span class="tg-log-history-detail">${parts.join(' · ')}</span>
    </div>`;
  }).join('');
}
