// ═══════════════════════════════════════════════════════════════
// SUPABASE + AUTH + SAVE/LOAD + UI
// ═══════════════════════════════════════════════════════════════

const { createClient } = supabase;
const _db = createClient(
  'https://surkhxljptfidlmrjlmv.supabase.co',
  'sb_publishable_bp0oePwT4E8yTAaa_RsNmw_MFRtv-WE'
);

let _uid = null;
const _saveTimers = {};
let _weeklyTimer = null;

// ─── AUTH ────────────────────────────────────────────────────────
async function initAuth() {
  const { data: { session } } = await _db.auth.getSession();
  if (session) {
    _uid = session.user.id;
    await loadData();
    const agreed = await checkWaiverAgreed();
    if (agreed) {
      showApp(session.user.email);
    } else {
      showWaiverModal(session.user.email);
    }
  } else {
    showAuthScreen();
  }
}

function showApp(email) {
  document.getElementById('auth-screen').classList.remove('visible');
  hideWaiverModal();
  document.getElementById('nav-user-email').textContent = email;
  if (getPillarPicks().length !== 2) {
    openPillarPickerForEditing();
    showScreen('pillar-picker');
  } else {
    showScreen('dashboard');
  }
  updateLockUI();
  loadDailyQuote();
  updateGreeting();
  initSessionLogger();
  pingLastActive();
}
function showAuthScreen() { document.getElementById('auth-screen').classList.add('visible'); }

async function pingLastActive() {
  if (!_uid) return;
  await _db.from('user_data').upsert(
    { id: _uid, last_active: new Date().toISOString() },
    { onConflict: 'id' }
  );
}

async function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pw    = document.getElementById('login-password').value;
  const msg   = document.getElementById('login-msg');
  const btn   = document.querySelector('#auth-login-view .auth-btn');
  msg.className = 'auth-msg';
  if (!email || !pw) { msg.className='auth-msg error'; msg.textContent='Please enter your email and password.'; return; }
  btn.disabled=true; btn.textContent='Signing in...';
  const { data, error } = await _db.auth.signInWithPassword({ email, password: pw });
  btn.disabled=false; btn.textContent='Sign In';
  if (error) {
    msg.className='auth-msg error';
    msg.textContent = error.message==='Invalid login credentials' ? 'Email or password is incorrect.' : error.message;
  } else if (data.session) {
    _uid = data.session.user.id;
    await loadData();
    const agreed = await checkWaiverAgreed();
    if (agreed) {
      showApp(data.session.user.email);
    } else {
      document.getElementById('auth-screen').classList.remove('visible');
      showWaiverModal(data.session.user.email);
    }
  }
}

async function handleForgot() {
  const email = document.getElementById('forgot-email').value.trim();
  const msg   = document.getElementById('forgot-msg');
  const btn   = document.querySelector('#auth-forgot-view .auth-btn');
  msg.className='auth-msg';
  if (!email) { msg.className='auth-msg error'; msg.textContent='Please enter your email.'; return; }
  btn.disabled=true; btn.textContent='Sending...';
  const { error } = await _db.auth.resetPasswordForEmail(email, { redirectTo: 'https://app.theperformancecoach.ae/reset.html' });
  btn.disabled=false; btn.textContent='Send Reset Link';
  if (error) { msg.className='auth-msg error'; msg.textContent=error.message; }
  else { msg.className='auth-msg success'; msg.textContent='Reset link sent — check your inbox.'; }
}

async function handleSignOut() { await _db.auth.signOut(); _uid=null; showAuthScreen(); showLogin(); }
function showForgot() { document.getElementById('auth-login-view').style.display='none'; document.getElementById('auth-forgot-view').style.display='block'; }
function showLogin()  { document.getElementById('auth-forgot-view').style.display='none'; document.getElementById('auth-login-view').style.display='block'; }

document.addEventListener('keydown', e => {
  if (e.key==='Enter' && document.getElementById('auth-screen').classList.contains('visible')) {
    document.getElementById('auth-forgot-view').style.display==='block' ? handleForgot() : handleLogin();
  }
});

async function resetPassword(btn) {
  btn.style.opacity='0.5'; btn.style.pointerEvents='none';
  const { data: { session } } = await _db.auth.getSession();
  if (!session) { alert('Not logged in.'); btn.style.opacity='1'; btn.style.pointerEvents='auto'; return; }
  const { error } = await _db.auth.resetPasswordForEmail(session.user.email, { redirectTo: 'https://app.theperformancecoach.ae/reset.html' });
  btn.style.opacity='1'; btn.style.pointerEvents='auto';
  if (!error) { btn.innerHTML='<span class="icon">✅</span> Reset email sent'; setTimeout(()=>{ btn.innerHTML='<span class="icon">🔑</span> Change Password'; },4000); }
  else alert(error.message);
}

// ─── WAIVER ──────────────────────────────────────────────────────
async function checkWaiverAgreed() {
  if (!_uid) return false;
  const { data } = await _db.from('user_data').select('waiver_agreed_at').eq('id', _uid).single();
  return !!(data && data.waiver_agreed_at);
}

async function handleWaiverAgree(email) {
  const checkbox = document.getElementById('waiver-checkbox');
  const btn      = document.getElementById('waiver-btn');
  if (!checkbox.checked) return;
  btn.disabled = true;
  btn.textContent = 'Saving...';
  await _db.from('user_data').upsert(
    { id: _uid, waiver_agreed_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { onConflict: 'id' }
  );
  showApp(email);
}

function showWaiverModal(email) {
  document.getElementById('waiver-modal').style.display = 'flex';
  const btn = document.getElementById('waiver-btn');
  btn.onclick = () => handleWaiverAgree(email);
  const cb = document.getElementById('waiver-checkbox');
  cb.checked = false;
  btn.disabled = true;
  cb.onchange = () => { btn.disabled = !cb.checked; };
}

function hideWaiverModal() {
  const m = document.getElementById('waiver-modal');
  if (m) m.style.display = 'none';
}

// ─── LOAD DATA ───────────────────────────────────────────────────
async function loadData() {
  if (!_uid) return;
  const { data } = await _db.from('user_data').select('*').eq('id', _uid).single();
  if (!data) return;

  ['why_statement','reflection_1','reflection_2','reflection_3','reflection_4',
   'sleep_bedtime','sleep_waketime','recovery_breathwork','recovery_session','recovery_when'].forEach(f => {
    const el = document.getElementById(f);
    if (el && data[f]) el.value = data[f];
  });

  if (data.training_loc && data.training_level && data.training_days && data.training_goal) {
    const s = { loc:data.training_loc, level:data.training_level, days:data.training_days, goal:data.training_goal };
    ['tg','tg2'].forEach(ns => {
      _tgState[ns] = {...s};
      Object.entries(s).forEach(([grp,val]) => {
        document.querySelectorAll(`#${ns}-sel .gen-opt-btn[data-grp="${grp}"]`).forEach(b => b.classList.toggle('sel', b.dataset.val===val));
      });
      document.getElementById(`${ns}-gen-btn`).disabled = false;
      tgGenerate(ns, true);
    });
  }

  if (data.calorie_target && data.dietary_pref) {
    ['mg','mg2'].forEach(ns => {
      _mgState[ns] = { cals:data.calorie_target, diet:data.dietary_pref };
      document.querySelectorAll(`#${ns}-sel .gen-opt-btn[data-grp="cals"]`).forEach(b => b.classList.toggle('sel', b.dataset.val===data.calorie_target));
      document.querySelectorAll(`#${ns}-sel .gen-opt-btn[data-grp="diet"]`).forEach(b => b.classList.toggle('sel', b.dataset.val===data.dietary_pref));
      document.getElementById(`${ns}-gen-btn`).disabled = false;
      mgGenerate(ns, true);
    });
  }
}

// ─── SAVE ────────────────────────────────────────────────────────
function showSaveIndicator(state) {
  const el = document.getElementById('save-indicator');
  el.textContent = state==='saving' ? 'Saving...' : 'Saved ✓';
  el.className = state;
  if (state==='saved') setTimeout(()=>{ el.className=''; }, 2000);
}

async function saveField(col, val) {
  if (!_uid) return;
  showSaveIndicator('saving');
  const { error } = await _db.from('user_data').upsert({ id:_uid, [col]:val, updated_at:new Date().toISOString() }, { onConflict:'id' });
  if (!error) showSaveIndicator('saved');
}

function debounceSave(col, val) {
  clearTimeout(_saveTimers[col]);
  _saveTimers[col] = setTimeout(() => saveField(col, val), 1000);
}

// ─── CROSS-POPULATION ────────────────────────────────────────────
function crossPopulateWhy(val) {
  const el = document.getElementById('why_statement');
  if (el && el.value !== val) el.value = val;
}

// ─── UI HELPERS ──────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  const sc = document.getElementById('screen-'+id);
  if (sc) sc.classList.add('active');
  document.querySelectorAll('.sidebar-item').forEach(item => {
    if ((item.getAttribute('onclick')||'').includes("'"+id+"'")) item.classList.add('active');
  });
  if (id === 'progress' && typeof progressInit === 'function') progressInit();
  if (id === 'dashboard' && typeof loadWorkoutStreak === 'function') loadWorkoutStreak();
  window.scrollTo(0,0);
}

function switchTab(btn, tabId) {
  const container = btn.closest('.screen') || document.querySelector('.screen.active');
  btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  container.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  const t = document.getElementById(tabId);
  if (t) t.classList.add('active');
}

function toggleVideo(btn, vid) {
  const wrap   = btn.closest('.video-item').querySelector('.video-player-wrap');
  const iframe = wrap.querySelector('iframe');
  if (wrap.classList.contains('open')) { wrap.classList.remove('open'); iframe.src=''; btn.textContent='Watch'; }
  else { wrap.classList.add('open'); iframe.src='https://www.youtube.com/embed/'+vid; btn.textContent='Close'; }
}

function setMobileActive(el) {
  document.querySelectorAll('.mobile-nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

function toggleAccordion(el) { el.classList.toggle('open'); }

function toggleInjury(el) {
  const was = el.classList.contains('open');
  document.querySelectorAll('.injury-option').forEach(o => o.classList.remove('open'));
  if (!was) el.classList.add('open');
}

// ─── SESSION LOGGER ──────────────────────────────────────────────
const SESSION_ACTIVITIES = [
  'Weights','Run','Walk','Cycle','HIIT','Padel','Swim',
  'Boxing','Yoga','Pilates','Stretch','Hike','Tennis',
  'Golf','Meditation','Breathwork','Rest Day'
];
let _selActivity = null, _selDuration = null, _selDay = 'today';

function updateGreeting() {
  const el = document.getElementById('dash-greeting');
  if (!el) return;
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  el.innerHTML = `<p style="font-family:'DM Serif Display',serif;font-size:22px;color:var(--dark);margin:0;">${g}</p>`;
}

function initSessionLogger() {
  const pills = document.getElementById('activity-pills');
  if (!pills || pills.children.length > 0) return;
  pills.innerHTML = SESSION_ACTIVITIES.map(a =>
    `<div class="slc-pill" onclick="selectActivity(this,'${a}')">${a}</div>`
  ).join('');
  loadSessionStreak();
}

function selectActivity(el, activity) {
  document.querySelectorAll('#activity-pills .slc-pill').forEach(p => p.classList.remove('sel'));
  el.classList.add('sel');
  _selActivity = activity;
}

function selectDuration(el, dur) {
  document.querySelectorAll('#duration-pills .slc-dur').forEach(p => p.classList.remove('sel'));
  el.classList.add('sel');
  _selDuration = dur;
}

function selectSessionDay(el, day) {
  document.querySelectorAll('#session-day-pills .slc-dur').forEach(p => p.classList.remove('sel'));
  el.classList.add('sel');
  _selDay = day;
}

async function logSession() {
  if (!_selActivity) { _showToast('Pick an activity first'); return; }
  if (!_uid) { _showToast('Not logged in'); return; }
  const note = (document.getElementById('session-note') || {}).value || '';
  const btn = document.querySelector('.slc-log-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Logging...'; }
  const now = new Date();
  if (_selDay === 'yesterday') now.setDate(now.getDate() - 1);
  const logged_at = now.toISOString();
  const { error } = await _db.from('session_logs').insert({
    user_id: _uid,
    activity: _selActivity,
    duration_mins: _selDuration || null,
    note: note.trim() || null,
    logged_at
  });
  if (btn) { btn.disabled = false; btn.textContent = 'Log Session'; }
  if (error) { _showToast('Something went wrong, try again'); return; }
  document.querySelectorAll('#activity-pills .slc-pill').forEach(p => p.classList.remove('sel'));
  document.querySelectorAll('#duration-pills .slc-dur').forEach(p => p.classList.remove('sel'));
  const noteEl = document.getElementById('session-note');
  if (noteEl) noteEl.value = '';
  _selActivity = null; _selDuration = null; _selDay = 'today';
  const todayBtn = document.getElementById('session-day-today');
  const yestBtn = document.getElementById('session-day-yesterday');
  if (todayBtn) { todayBtn.classList.add('sel'); }
  if (yestBtn) { yestBtn.classList.remove('sel'); }
  _showToast('Session logged ✓');
  loadSessionStreak();
}

async function loadSessionStreak() {
  if (!_uid) return;
  const { data } = await _db.from('session_logs').select('logged_at').eq('user_id', _uid).order('logged_at', { ascending: false }).limit(120);
  if (!data || !data.length) { _updateStreakBadge(0); return; }
  const days = [...new Set(data.map(s => s.logged_at.slice(0, 10)))].sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (days[0] !== today && days[0] !== yesterday) { _updateStreakBadge(0); return; }
  let streak = 0;
  let check = days[0] === today ? today : yesterday;
  for (const d of days) {
    if (d === check) { streak++; check = new Date(new Date(check) - 86400000).toISOString().slice(0, 10); }
    else break;
  }
  _updateStreakBadge(streak);
}

function _updateStreakBadge(n) {
  const badge = document.getElementById('session-streak-badge');
  const count = document.getElementById('session-streak-count');
  if (count) count.textContent = n;
  if (badge) badge.style.display = n > 0 ? 'flex' : 'none';
}

// ─── COMPLETION TRACKING (no locks — used only to hide one-time items) ──
const MODULE_ORDER = ['welcome-video','quiz','why-workshop','movement','nutrition','recovery'];

function _progressKey() { return _uid ? `up_prog_${_uid}` : 'up_prog_guest'; }

function getCompleted() {
  try { return JSON.parse(localStorage.getItem(_progressKey()) || '[]'); }
  catch(e) { return []; }
}

function markComplete(id) {
  const done = getCompleted();
  if (!done.includes(id)) { done.push(id); localStorage.setItem(_progressKey(), JSON.stringify(done)); }
  updateLockUI();
}

function canComplete(id) {
  switch(id) {
    case 'welcome-video':
      return localStorage.getItem('up_wv_' + (_uid||'guest')) === '1';
    case 'quiz': {
      const cb = document.getElementById('quiz-done-cb');
      return cb && cb.checked;
    }
    case 'why-workshop': {
      const el = document.getElementById('why_statement');
      return el && el.value.trim().length >= 5;
    }
    case 'movement': {
      const plan = document.getElementById('tg-plan');
      return plan && plan.style.display !== 'none';
    }
    case 'nutrition': {
      const plan = document.getElementById('mg-plan');
      return plan && plan.style.display !== 'none';
    }
    case 'recovery': {
      const bed  = document.getElementById('sleep_bedtime');
      const wake = document.getElementById('sleep_waketime');
      return !!(bed && bed.value.trim() && wake && wake.value.trim());
    }
    default: return true;
  }
}

function getCompletionHint(id) {
  const hints = {
    'welcome-video': 'Watch the video first',
    'quiz':          'Tick the box to confirm you\'ve completed the quiz',
    'why-workshop':  'Write your why statement first',
    'movement':      'Build your training plan first',
    'nutrition':     'Build your meal plan first',
    'recovery':      'Fill in your sleep times first'
  };
  return hints[id] || 'Complete this section first';
}

function completeAndGo(current, next) {
  if (!canComplete(current)) { _showToast(getCompletionHint(current)); return; }
  markComplete(current);
  showScreen(next);
}

function _showToast(msg) {
  let t = document.getElementById('lock-toast');
  if (!t) { t = document.createElement('div'); t.id='lock-toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('visible'), 2500);
}

// updateLockUI now just handles hiding one-time items (welcome video, quiz)
// once they're done, and marks completed sidebar items. Nothing is ever locked.
function updateLockUI() {
  const done = getCompleted();

  const startBtn = document.getElementById('dash-start-btn');
  if (startBtn) startBtn.style.display = done.includes('welcome-video') ? 'none' : '';

  MODULE_ORDER.forEach(id => {
    const completed = done.includes(id);
    document.querySelectorAll('.sidebar-item').forEach(item => {
      if ((item.getAttribute('onclick')||'').includes(`'${id}'`)) {
        item.classList.toggle('module-done', completed);
        let dk = item.querySelector('.sb-done');
        if (completed) {
          if (!dk) { dk=document.createElement('span'); dk.className='sb-done'; dk.textContent='✓'; item.appendChild(dk); }
        } else if (dk) dk.remove();
      }
    });
  });

  renderDashboardPillars();
}

// ─── PILLAR PICKER ───────────────────────────────────────────────
const PILLAR_META = {
  training: { icon:'&#127947;', label:'Training', screen:'movement',      desc:'Workouts built around your schedule and level.' },
  nutrition:{ icon:'&#129361;', label:'Nutrition', screen:'nutrition',    desc:'Simple, realistic eating for a busy life.' },
  recovery: { icon:'&#129688;', label:'Recovery',  screen:'recovery',     desc:'Sleep, breathwork, stress, and bouncing back.' },
  mindset:  { icon:'&#127919;', label:'Mindset',   screen:'why-workshop', desc:'The thinking behind everything you do.' }
};

function _pillarKey() { return _uid ? `up_pillars_${_uid}` : 'up_pillars_guest'; }

function getPillarPicks() {
  try { return JSON.parse(localStorage.getItem(_pillarKey()) || '[]'); }
  catch(e) { return []; }
}

function togglePillarPick(card) {
  const current = document.querySelectorAll('#pillar-picker-grid .pillar-pick-card.selected');
  const isSelected = card.classList.contains('selected');
  if (!isSelected && current.length >= 2) { _showToast('Pick 2 to start — tap one to swap it out'); return; }
  card.classList.toggle('selected');
  const count = document.querySelectorAll('#pillar-picker-grid .pillar-pick-card.selected').length;
  document.getElementById('pillar-pick-count').textContent = count;
  document.getElementById('pillar-pick-confirm').disabled = count !== 2;
}

function confirmPillarPicks() {
  const picks = Array.from(document.querySelectorAll('#pillar-picker-grid .pillar-pick-card.selected')).map(c => c.dataset.pillar);
  if (picks.length !== 2) return;
  localStorage.setItem(_pillarKey(), JSON.stringify(picks));
  renderDashboardPillars();
  showScreen('dashboard');
}

function openPillarPickerForEditing() {
  const picks = getPillarPicks();
  document.querySelectorAll('#pillar-picker-grid .pillar-pick-card').forEach(card => {
    card.classList.toggle('selected', picks.includes(card.dataset.pillar));
  });
  document.getElementById('pillar-pick-count').textContent = picks.length;
  document.getElementById('pillar-pick-confirm').disabled = picks.length !== 2;
}

function toggleExploreMore() {
  const grid = document.getElementById('dash-explore-more');
  const label = document.getElementById('explore-more-label');
  const open = grid.classList.toggle('open');
  label.innerHTML = open ? 'Explore more &#8593;' : 'Explore more &#8595;';
}

function renderDashboardPillars() {
  const focusEl = document.getElementById('dash-focus-pillars');
  const exploreEl = document.getElementById('dash-explore-more');
  if (!focusEl || !exploreEl) return;

  const picks = getPillarPicks();
  if (picks.length !== 2) return; // picker not completed yet, dashboard pillar section stays empty

  focusEl.innerHTML = picks.map(p => {
    const m = PILLAR_META[p];
    return `<div class="module-card" onclick="showScreen('${m.screen}')"><div class="module-icon">${m.icon}</div><h3>${m.label}</h3><p>${m.desc}</p></div>`;
  }).join('');

  const rest = Object.keys(PILLAR_META).filter(p => !picks.includes(p));
  exploreEl.innerHTML = rest.map(p => {
    const m = PILLAR_META[p];
    return `<div class="module-card" onclick="showScreen('${m.screen}')"><div class="module-icon">${m.icon}</div><h3>${m.label}</h3><p>${m.desc}</p></div>`;
  }).join('');
}

// ─── DAILY QUOTE ─────────────────────────────────────────────────
const DAILY_QUOTES = [
  "You don't need more information. You need to actually do the thing.",
  "Discipline is just deciding in advance.",
  "The gap between where you are and where you want to be is mostly just consistency.",
  "Nobody is coming to sort your life out. Good news though, you don't need them to.",
  "Most people overestimate what they need and underestimate what they already have.",
  "You're not tired. You're just avoiding something.",
  "Standards aren't set once. They're defended every single day.",
  "The version of you that has it together isn't waiting for the right moment either.",
  "Hard things first. Everything else is just admin.",
  "If it's not in the calendar, it's not real.",
  "Progress without reflection is just being busy.",
  "You already know what you need to do. That's the annoying part.",
  "The people you admire aren't more talented. They're just more consistent.",
  "A bad week doesn't reset who you are. Getting back up does.",
  "Your future self is either going to thank you or make excuses for you.",
  "Identity isn't what you say about yourself. It's what you do when nobody's watching.",
  "Comfort is expensive. It just doesn't invoice you straight away.",
  "The goal isn't perfection. It's just not quitting.",
  "Some days the win is just showing up. That counts.",
  "Stop negotiating with yourself at 6am. You already made the decision last night.",
  "You can either protect your standards or your excuses. Not both.",
  "The best time to build the habit was months ago. Second best time is today.",
  "Rest is part of the programme. Giving up isn't.",
  "Execution is the only thing that separates ideas from results.",
  "Your body keeps score. So does your confidence."
];

function loadDailyQuote() {
  const el = document.getElementById('daily-quote-text');
  if (!el) return;
  const dayIndex = Math.floor(Date.now() / 86400000);
  el.textContent = DAILY_QUOTES[dayIndex % DAILY_QUOTES.length];
}

// ─── BOOT ────────────────────────────────────────────────────────
initAuth();
