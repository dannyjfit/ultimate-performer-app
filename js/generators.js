// ═══════════════════════════════════════════════════════════════
// GENERATOR RENDERING — shared logic for both training & meal
// ═══════════════════════════════════════════════════════════════

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
  const sets = level==='advanced' ? 4 : 3;
  let h = `<div class="gen-session-title">${day.name}</div><div class="gen-session-sub">${sets} rounds per block · ${g.rest}</div>`;
  h += tgBlock('🔥 Warm Up','', tgWarmup(day.warmup), '');
  h += tgBlock('💪 Tri-Set A',`${sets} rounds — back to back`, tgExList(day.triA,goal), `<div class="gen-rest-note">⏱ ${g.rest} after final exercise. Repeat ${sets} rounds.</div>`);
  h += tgBlock('🔁 Tri-Set B',`${sets} rounds — back to back`, tgExList(day.triB,goal), `<div class="gen-rest-note">⏱ ${g.rest} after final exercise. Repeat ${sets} rounds.</div>`);
  h += tgBlock('🧠 Core Finisher','2 rounds', tgExList(day.core,goal), '');
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

function tgExList(exs, goal) {
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
    const safeId = ex.name.replace(/[^a-zA-Z0-9]/g, '_');
    const logBtn = `<button class="tg-log-btn" onclick="tgLogExercise('${ex.name.replace(/'/g,"\\'")}', this)">+ Log</button>`;
    return `<div class="gen-ex-row-wrap"><div class="gen-ex-row-inner"><div class="gen-ex-num">${i+1}</div><div class="gen-ex-info"><div class="gen-ex-name">${ex.name}</div><div class="gen-ex-detail">${ex.sets} sets · ${reps}</div></div><div style="display:flex;align-items:center;gap:4px;">${btn}${logBtn}</div></div>${vc}${alt}</div>`;
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
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([^?&"'>]+)/);
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
    return `<div class="meal-card-item">
      <div class="meal-card-hdr">
        <span class="meal-card-type">${m.emoji} ${m.label}</span>
        <span class="meal-card-cals">${meal.cals} kcal</span>
      </div>
      <div class="meal-card-body">
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
