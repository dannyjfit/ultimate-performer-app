// ═══════════════════════════════════════════════════════════════
// PROGRESS TRACKER
// Depends on: _supabase (from app.js), TGV (from training-data.js)
// ═══════════════════════════════════════════════════════════════

let _progressChartInstance = null;
let _exerciseChartInstance = null;

// ─── SUPABASE HELPERS ────────────────────────────────────────────
async function progressInsert(row) {
  const { data: { user } } = await _supabase.auth.getUser();
  if (!user) return false;
  const { error } = await _supabase
    .from('progress_logs')
    .insert({ ...row, user_id: user.id, logged_at: new Date().toISOString() });
  return !error;
}

async function progressFetchCheckins() {
  const { data: { user } } = await _supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await _supabase
    .from('progress_logs')
    .select('*')
    .eq('user_id', user.id)
    .not('body_weight', 'is', null)
    .is('exercise', null)
    .order('logged_at', { ascending: true });
  return error ? [] : data;
}

async function progressFetchByExercise(name) {
  const { data: { user } } = await _supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await _supabase
    .from('progress_logs')
    .select('*')
    .eq('user_id', user.id)
    .eq('exercise', name)
    .order('logged_at', { ascending: true });
  return error ? [] : data;
}

// ─── POPULATE EXERCISE DROPDOWNS ─────────────────────────────────
function progressPopulateExerciseDropdown() {
  const sel      = document.getElementById('prog-exercise-select');
  const chartSel = document.getElementById('prog-chart-exercise');
  if (!sel || !chartSel) return;
  const names = Object.keys(TGV).sort();
  [sel, chartSel].forEach(s => {
    s.innerHTML = '<option value="">-- Select exercise --</option>';
    names.forEach(n => {
      const opt = document.createElement('option');
      opt.value = n; opt.textContent = n;
      s.appendChild(opt);
    });
  });
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

// ─── EXERCISE LOG SUBMIT (Progress page) ─────────────────────────
async function progressSubmitExerciseLog() {
  const exercise = document.getElementById('prog-exercise-select').value;
  const weight   = parseFloat(document.getElementById('prog-weight-used').value);
  const sets     = parseInt(document.getElementById('prog-sets').value);
  const reps     = parseInt(document.getElementById('prog-reps').value);
  const notes    = document.getElementById('prog-ex-notes').value.trim();

  if (!exercise)                   { progressToast('Select an exercise.', 'error'); return; }
  if (isNaN(weight) || weight < 0) { progressToast('Enter a valid weight (use 0 for bodyweight).', 'error'); return; }
  if (!sets || sets < 1)           { progressToast('Enter sets.', 'error'); return; }
  if (!reps || reps < 1)           { progressToast('Enter reps.', 'error'); return; }

  const btn = document.getElementById('prog-ex-log-btn');
  btn.disabled = true; btn.textContent = 'Saving...';

  const ok = await progressInsert({ exercise, weight_used: weight, sets, reps, notes: notes || null });

  btn.disabled = false; btn.textContent = 'Log Exercise';

  if (ok) {
    progressToast('Exercise logged!');
    document.getElementById('prog-exercise-select').value = '';
    document.getElementById('prog-weight-used').value     = '';
    document.getElementById('prog-sets').value            = '';
    document.getElementById('prog-reps').value            = '';
    document.getElementById('prog-ex-notes').value        = '';
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

// ─── EXERCISE PROGRESSION CHART ──────────────────────────────────
async function progressLoadExerciseChart() {
  const exercise = document.getElementById('prog-chart-exercise').value;
  if (!exercise) { progressToast('Select an exercise.', 'error'); return; }

  const btn = document.getElementById('prog-ex-chart-btn');
  btn.disabled = true; btn.textContent = 'Loading...';

  const data = await progressFetchByExercise(exercise);
  btn.disabled = false; btn.textContent = 'View Progression';

  const wrap = document.getElementById('prog-ex-chart-wrap');
  if (_exerciseChartInstance) { _exerciseChartInstance.destroy(); _exerciseChartInstance = null; }

  if (data.length === 0) {
    wrap.innerHTML = `<canvas id="prog-ex-chart"></canvas><p class="prog-empty">No logs for ${exercise} yet.</p>`;
    return;
  }

  if (!document.getElementById('prog-ex-chart')) {
    wrap.innerHTML = '<canvas id="prog-ex-chart"></canvas>';
  }

  _exerciseChartInstance = new Chart(document.getElementById('prog-ex-chart'), {
    type: 'line',
    data: {
      labels: data.map(d => new Date(d.logged_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })),
      datasets: [{
        label: `${exercise} — Weight (kg)`,
        data: data.map(d => d.weight_used),
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
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: items => `${data[items[0].dataIndex] ? new Date(data[items[0].dataIndex].logged_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''} — ${exercise}`,
            label: ctx => {
              const d = data[ctx.dataIndex];
              return [`Weight: ${d.weight_used} kg`, `Sets: ${d.sets}`, `Reps: ${d.reps}`];
            }
          }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Inter', size: 11 } } },
        y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Inter', size: 11 }, callback: v => v + ' kg' } }
      }
    }
  });
}

// ─── INLINE LOG (Movement screen) ────────────────────────────────
async function tgLogExercise(exerciseName, btnEl) {
  const wrap     = btnEl.closest('.gen-ex-row-wrap');
  const existing = wrap.querySelector('.tg-inline-log');

  if (existing) {
    existing.remove();
    btnEl.textContent = '+ Log';
    return;
  }

  btnEl.textContent = '✕ Cancel';
  const safeId = exerciseName.replace(/[^a-zA-Z0-9]/g, '_');

  const logForm = document.createElement('div');
  logForm.className = 'tg-inline-log';
  logForm.innerHTML = `
    <div class="tg-log-fields">
      <div class="tg-log-field">
        <label>Weight (kg)</label>
        <input type="number" class="tg-log-input" id="tgw-${safeId}" placeholder="0 = bodyweight" min="0" step="0.5">
      </div>
      <div class="tg-log-field">
        <label>Sets</label>
        <input type="number" class="tg-log-input" id="tgs-${safeId}" placeholder="e.g. 3" min="1" max="20">
      </div>
      <div class="tg-log-field">
        <label>Reps</label>
        <input type="number" class="tg-log-input" id="tgr-${safeId}" placeholder="e.g. 12" min="1" max="100">
      </div>
    </div>
    <button class="tg-log-save-btn" onclick="tgSaveInlineLog('${exerciseName.replace(/'/g, "\\'")}', '${safeId}', this)">Save</button>
    <div class="tg-log-history" id="tgh-${safeId}">
      <span class="tg-log-history-loading">Loading recent logs...</span>
    </div>
  `;
  wrap.appendChild(logForm);
  tgLoadRecentLogs(exerciseName, safeId);
}

async function tgSaveInlineLog(exerciseName, safeId, btnEl) {
  const weight = parseFloat(document.getElementById(`tgw-${safeId}`)?.value);
  const sets   = parseInt(document.getElementById(`tgs-${safeId}`)?.value);
  const reps   = parseInt(document.getElementById(`tgr-${safeId}`)?.value);

  if (isNaN(weight) || weight < 0) { progressToast('Enter a valid weight.', 'error'); return; }
  if (!sets || sets < 1)           { progressToast('Enter sets.', 'error'); return; }
  if (!reps || reps < 1)           { progressToast('Enter reps.', 'error'); return; }

  btnEl.disabled = true; btnEl.textContent = 'Saving...';
  const ok = await progressInsert({ exercise: exerciseName, weight_used: weight, sets, reps });
  btnEl.disabled = false; btnEl.textContent = 'Save';

  if (ok) {
    progressToast(`${exerciseName} logged!`);
    document.getElementById(`tgw-${safeId}`).value = '';
    document.getElementById(`tgs-${safeId}`).value = '';
    document.getElementById(`tgr-${safeId}`).value = '';
    tgLoadRecentLogs(exerciseName, safeId);
  } else {
    progressToast('Could not save. Try again.', 'error');
  }
}

async function tgLoadRecentLogs(exerciseName, safeId) {
  const histEl = document.getElementById(`tgh-${safeId}`);
  if (!histEl) return;

  const data = await progressFetchByExercise(exerciseName);

  if (data.length === 0) {
    histEl.innerHTML = '<span class="tg-log-history-empty">No logs yet — this will be your first.</span>';
    return;
  }

  const recent = data.slice(-5).reverse();
  histEl.innerHTML = `
    <div class="tg-log-history-title">Recent logs</div>
    ${recent.map(d => {
      const dt = new Date(d.logged_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      return `<div class="tg-log-history-row">
        <span class="tg-log-history-date">${dt}</span>
        <span class="tg-log-history-detail">${d.weight_used}kg &middot; ${d.sets} sets &middot; ${d.reps} reps</span>
      </div>`;
    }).join('')}
  `;
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
  progressPopulateExerciseDropdown();
  const bwWrap = document.getElementById('prog-bw-chart-wrap');
  if (bwWrap && !document.getElementById('prog-bw-chart')) {
    bwWrap.innerHTML = '<canvas id="prog-bw-chart"></canvas>';
  }
  const exWrap = document.getElementById('prog-ex-chart-wrap');
  if (exWrap && !document.getElementById('prog-ex-chart')) {
    exWrap.innerHTML = '<canvas id="prog-ex-chart"></canvas>';
  }
  progressLoadCheckinChart();
}
