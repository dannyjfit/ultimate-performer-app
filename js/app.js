// ═══════════════════════════════════════════════════════════════
// SUPABASE + AUTH + SAVE/LOAD + UI
// ═══════════════════════════════════════════════════════════════

const { createClient } = supabase;
const _db = createClient(
  'https://surkhxljptfidlmrjlmv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1cmtoeGxqcHRmaWRsbXJqbG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTY2NjgsImV4cCI6MjA5MzYzMjY2OH0.lLOfYp004WMT2gw-_lWXNIEXpgxglRJzbzkhTZHRMu4'
);

let _uid = null;
const _saveTimers = {};
let _weeklyTimer = null;

// ─── AUTH ────────────────────────────────────────────────────────
async function initAuth() {
  const { data: { session } } = await _db.auth.getSession();
  if (session) { _uid = session.user.id; showApp(session.user.email); await loadData(); }
  else showAuthScreen();
}

function showApp(email) {
  document.getElementById('auth-screen').classList.remove('visible');
  document.getElementById('nav-user-email').textContent = email;
  showScreen('dashboard');
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
    showApp(data.session.user.email);
    await loadData();
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

// ─── LOAD DATA ───────────────────────────────────────────────────
async function loadData() {
  if (!_uid) return;
  const { data } = await _db.from('user_data').select('*').eq('id', _uid).single();
  if (!data) return;

  // Simple text fields
  ['why_statement','reflection_1','reflection_2','reflection_3','reflection_4',
   'sleep_bedtime','sleep_waketime','recovery_breathwork','recovery_session','recovery_when'].forEach(f => {
    const el = document.getElementById(f);
    if (el && data[f]) el.value = data[f];
  });

  // Cross-populate why statement
  if (data.why_statement) {
    const pw = document.getElementById('plan_why');
    if (pw) pw.value = data.why_statement;
  }

  // Cross-populate calories/protein to plan page
  if (data.calorie_target) {
    const pc = document.getElementById('plan_calories');
    if (pc) pc.value = data.calorie_target;
  }
  if (data.protein_target) {
    const pp = document.getElementById('plan_protein');
    if (pp) pp.value = data.protein_target;
  }

  // Cross-populate sleep window
  crossPopulateSleep();

  // Weekly plan
  if (data.weekly_plan && typeof data.weekly_plan === 'object') {
    document.querySelectorAll('.weekly-table textarea[data-day]').forEach(ta => {
      const day = ta.dataset.day, col = ta.dataset.col;
      if (data.weekly_plan[day] && data.weekly_plan[day][col]) ta.value = data.weekly_plan[day][col];
    });
  }

  // Auto-restore training generator if saved
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

  // Auto-restore meal generator if saved
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

// ─── BOOT ────────────────────────────────────────────────────────
initAuth();
