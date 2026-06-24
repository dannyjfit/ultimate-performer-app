// ═══════════════════════════════════════════════════════════════
// PROGRESS TRACKER
// Depends on: _db (from app.js), TGV (from training-data.js)
// ═══════════════════════════════════════════════════════════════

let _progressChartInstance = null;
let _exerciseChartInstance = null;

// ─── SUPABASE HELPERS ────────────────────────────────────────────
async function progressInsert(row) {
  const { data: { user } } = await _db.auth.getUser();
  if (!user) return false;
  const { error } = await _db
    .from('progress_logs')
    .insert({ ...row, user_id: user.id, logged_at: new Date().toISOString() });
  return !error;
}

async function progressFetchCheckins() {
  const { data: { user } } = await _db.auth.getUser();
  if (!user) return [];
  const { data, error } = await _db
    .from('progress_logs')
    .select('*')
    .eq('user_id', user.id)
    .not('body_weight', 'is', null)
    .is('exercise', null)
    .order('logged_at', { ascending: true });
  return error ? [] : data;
}

async function progressFetchByExercise(name) {
  const { data: { user } } = await _db.auth.getUser();
  if (!user) return [];
  const { data, error } = await _db
    .from('progress_logs')
    .select('*')
    .eq('user_id', user.id)
    .eq('exercise', name)
    .order('logged_at', { ascending: true });
  return error ? [] : data;
}

// ─── WEEKLY CHECK-IN SUBMIT ───────────────────────────────────────
async function progressSubmitCheckin() {
  const bw     = parseFloat(document.getElementById('prog-bw').value);
  const energy = parseInt(document.getElementById('prog-energy').value);
  const sleep  = parseInt(document.getElementById('prog-sleep').value);
  const notes  = document.getElementById('prog-notes').value.trim();

  if (!bw || bw <= 0)                       { progressToast('Enter a valid body weight.', 'error'); return; }
  if (!energy || energy < 1 || energy > 10) { progressToast('Energy must be 1–10.', 'error'); return; }
  if (!sleep  || sleep  < 1 || sleep  > 10) { progressToast('Sleep quality must be 1–10.', 'error'); return; }

  const btn = document.getElementById('prog-checkin-btn');
  btn.disabled = true; btn.textContent = 'Saving...';

  const ok = await progressInsert({ body_weight: bw, energy, sleep_quality: sleep, notes: notes || null });

  btn.disabled = false; btn.textContent = 'Save Check-In';

  if (ok) {
    progressToast('Check-in saved!');
    document.getElementById('prog-bw').value     = '';
    document.getElementById('prog-energy').value = '';
    document.getElementById('prog-sleep').value  = '';
    document.getElementById('prog-notes').value  = '';
    progressLoadCheckinChart();
  } else {
    progressToast('Something went wrong. Try again.', 'error');
  }
}

// ─── BODY WEIGHT CHART ───────────────────────────────────────────
async function progressLoadCheckinChart() {
  const data = await progressFetchCheckins();
  const wrap = document.getElementById('prog-bw-chart-wrap');
  if (!wrap) return;

  if (_progressChartInstance) { _progressChartInstance.destroy(); _progressChartInstance = null; }

  if (data.length === 0) {
    wrap.innerHTML = '<p class="prog-empty">No check-ins logged yet. Complete your first one above.</p>';
    return;
  }

  if (!document.getElementById('prog-bw-chart')) {
    wrap.innerHTML = '<canvas id="prog-bw-chart"></canvas>';
  }

  _progressChartInstance = new Chart(document.getElementById('prog-bw-chart'), {
    type: 'line',
    data: {
      labels:   data.map(d => new Date(d.logged_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })),
      datasets: [{
        label: 'Body Weight (kg)',
        data: data.map(d => d.body_weight),
        borderColor: '#4682b4',
        backgroundColor: 'rgba(70,130,180,0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#4682b4',
        pointRadius: 4,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${ctx.parsed.y} kg` } } },
      scales: {
        x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Inter', size: 11 } } },
        y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Inter', size: 11 }, callback: v => v + ' kg' } }
      }
    }
  });
}

// ─── TOAST ───────────────────────────────────────────────────────
function progressToast(msg, type = 'success') {
  let t = document.getElementById('prog-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'prog-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = 'prog-toast ' + (type === 'error' ? 'prog-toast-error' : 'prog-toast-success');
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(10px)';
  }, 3000);
}

// ─── INIT (called by showScreen in app.js) ────────────────────────
function progressInit() {
  const bwWrap = document.getElementById('prog-bw-chart-wrap');
  if (bwWrap && !document.getElementById('prog-bw-chart')) {
    bwWrap.innerHTML = '<canvas id="prog-bw-chart"></canvas>';
  }
  progressLoadCheckinChart();
  loadWorkoutHistory();
  progressLoadStats();
}

async function progressLoadStats() {
  if (typeof _uid === 'undefined' || !_uid) return;
  const { data } = await _db.from('session_logs').select('logged_at').eq('user_id', _uid).order('logged_at', { ascending: false }).limit(120);
  const total = document.getElementById('prog-total-sessions');
  const streakEl = document.getElementById('prog-streak-num');
  if (total) total.textContent = data ? data.length : 0;
  if (!data || !data.length) { if (streakEl) streakEl.textContent = 0; return; }
  const days = [...new Set(data.map(s => s.logged_at.slice(0, 10)))].sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (days[0] !== today && days[0] !== yesterday) { if (streakEl) streakEl.textContent = 0; return; }
  let streak = 0;
  let check = days[0] === today ? today : yesterday;
  for (const d of days) {
    if (d === check) { streak++; check = new Date(new Date(check) - 86400000).toISOString().slice(0, 10); }
    else break;
  }
  if (streakEl) streakEl.textContent = streak;
}
