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
  showScreen('dashboard');
  updateLockUI();
  loadDailyQuote();
}
function showAuthScreen() { document.getElementById('auth-screen').classList.add('visible'); }

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

  if (data.why_statement) {
    const pw = document.getElementById('plan_why');
    if (pw) pw.value = data.why_statement;
  }
  if (data.calorie_target) {
    const pc = document.getElementById('plan_calories');
    if (pc) pc.value = data.calorie_target;
  }
  if (data.protein_target) {
    const pp = document.getElementById('plan_protein');
    if (pp) pp.value = data.protein_target;
  }

  crossPopulateSleep();

  if (data.weekly_plan && typeof data.weekly_plan === 'object') {
    document.querySelectorAll('.weekly-table textarea[data-day]').forEach(ta => {
      const day = ta.dataset.day, col = ta.dataset.col;
      if (data.weekly_plan[day] && data.weekly_plan[day][col]) ta.value = data.weekly_plan[day][col];
    });
  }

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

function debounceWeekly() {
  clearTimeout(_weeklyTimer);
  _weeklyTimer = setTimeout(saveWeekly, 1000);
}

async function saveWeekly() {
  if (!_uid) return;
  const plan = {};
  document.querySelectorAll('.weekly-table textarea[data-day]').forEach(ta => {
    const d=ta.dataset.day, c=ta.dataset.col;
    if (!plan[d]) plan[d]={};
    plan[d][c] = ta.value;
  });
  showSaveIndicator('saving');
  const { error } = await _db.from('user_data').upsert({ id:_uid, weekly_plan:plan, updated_at:new Date().toISOString() }, { onConflict:'id' });
  if (!error) showSaveIndicator('saved');
}

// ─── CROSS-POPULATION ────────────────────────────────────────────
function crossPopulateWhy(val) {
  ['why_statement','plan_why'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value !== val) el.value = val;
  });
}

function crossPopulateSleep() {
  const bed  = (document.getElementById('sleep_bedtime')  || {}).value || '';
  const wake = (document.getElementById('sleep_waketime') || {}).value || '';
  const planSleep = document.getElementById('plan_sleep');
  if (planSleep) planSleep.value = (bed && wake) ? `${bed} – ${wake}` : (bed || wake);
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

// ─── MODULE LOCKING ──────────────────────────────────────────────
const MODULE_ORDER = ['welcome-video','quiz','why-workshop','movement','nutrition','recovery','build-plan'];
const FREE_SCREENS = ['dashboard','progress','calorie-calc','exercise-lib','meal-gen','training-gen','coaching'];

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

function isUnlocked(id) {
  if (FREE_SCREENS.includes(id)) return true;
  if (!MODULE_ORDER.includes(id)) return true;
  const idx = MODULE_ORDER.indexOf(id);
  if (idx === 0) return true;
  return getCompleted().includes(MODULE_ORDER[idx - 1]);
}

function completeAndGo(current, next) {
  markComplete(current);
  showScreen(next);
}

function showLockedToast(id) {
  const idx = MODULE_ORDER.indexOf(id);
  const prev = MODULE_ORDER[idx - 1];
  const names = {
    'welcome-video':'the Welcome Video','quiz':'the Quiz','why-workshop':'the Why Workshop',
    'movement':'Movement','nutrition':'Nutrition','recovery':'Recovery','build-plan':'Your Plan'
  };
  _showToast(`Finish ${names[prev] || 'the previous step'} first`);
}

function _showToast(msg) {
  let t = document.getElementById('lock-toast');
  if (!t) { t = document.createElement('div'); t.id='lock-toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('visible'), 2500);
}

function updateLockUI() {
  const done = getCompleted();
  MODULE_ORDER.forEach(id => {
    const unlocked = isUnlocked(id);
    const completed = done.includes(id);

    // Sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
      if ((item.getAttribute('onclick')||'').includes(`'${id}'`)) {
        item.classList.toggle('module-locked', !unlocked);
        item.classList.toggle('module-done', completed);
        let lk = item.querySelector('.sb-lock'); let dk = item.querySelector('.sb-done');
        if (!unlocked) {
          if (!lk) { lk=document.createElement('span'); lk.className='sb-lock'; lk.textContent='🔒'; item.appendChild(lk); }
          if (dk) dk.remove();
        } else if (completed) {
          if (!dk) { dk=document.createElement('span'); dk.className='sb-done'; dk.textContent='✓'; item.appendChild(dk); }
          if (lk) lk.remove();
        } else {
          if (lk) lk.remove(); if (dk) dk.remove();
        }
      }
    });

    // Mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      if ((item.getAttribute('onclick')||'').includes(`'${id}'`))
        item.classList.toggle('module-locked', !unlocked);
    });

    // Dashboard cards
    document.querySelectorAll('.module-card').forEach(card => {
      if ((card.getAttribute('onclick')||'').includes(`'${id}'`)) {
        card.classList.toggle('module-locked', !unlocked);
        card.classList.toggle('module-done', completed);
        let ov = card.querySelector('.lock-overlay');
        if (!unlocked) {
          if (!ov) { ov=document.createElement('div'); ov.className='lock-overlay'; ov.innerHTML='<span>🔒</span>'; card.appendChild(ov); }
        } else { if (ov) ov.remove(); }
        let tick = card.querySelector('.done-tick');
        if (completed) {
          if (!tick) { tick=document.createElement('div'); tick.className='done-tick'; tick.textContent='✓'; card.appendChild(tick); }
        } else { if (tick) tick.remove(); }
      }
    });
  });
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
