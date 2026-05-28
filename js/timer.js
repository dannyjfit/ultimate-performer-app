// ═══════════════════════════════════════════════════════════
// WORKOUT TIMER — Session Timer + Rest Timer
// ═══════════════════════════════════════════════════════════

(function() {

// ─── STATE ────────────────────────────────────────────────
const timerState = {
  session: { running: false, seconds: 0, interval: null },
  rest: { running: false, seconds: 0, total: 0, interval: null, alertPlayed: false }
};

// ─── AUDIO BEEP ───────────────────────────────────────────
function beep(freq, duration, volume) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq || 880;
    gain.gain.value = volume || 0.3;
    osc.start();
    osc.stop(ctx.currentTime + (duration || 0.15));
    setTimeout(() => ctx.close(), (duration || 0.15) * 1000 + 100);
  } catch(e) {}
}

function beepDone() {
  // Three beeps when rest is done
  beep(880, 0.15, 0.3);
  setTimeout(() => beep(880, 0.15, 0.3), 200);
  setTimeout(() => beep(1100, 0.3, 0.4), 400);
}

function beepWarning() {
  beep(660, 0.1, 0.2);
}

// ─── FORMAT TIME ──────────────────────────────────────────
function fmt(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return (m > 0 ? m + ':' : '') + (s < 10 ? '0' : '') + s;
}

// ─── INJECT TIMER HTML ────────────────────────────────────
function injectTimerUI() {
  if (document.getElementById('workout-timer-bar')) return;

  const bar = document.createElement('div');
  bar.id = 'workout-timer-bar';
  bar.innerHTML = `
    <style>
      #workout-timer-bar {
        position: fixed;
        top: 56px;
        left: 0; right: 0;
        z-index: 150;
        background: #1a1a1a;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        display: none;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        height: 48px;
        gap: 12px;
      }
      #workout-timer-bar.visible { display: flex; }
      .timer-session {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .timer-session-label {
        font-family: 'Montserrat', sans-serif;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: rgba(255,255,255,0.4);
      }
      .timer-session-time {
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        font-weight: 700;
        color: white;
        min-width: 48px;
      }
      .timer-session-btn {
        background: rgba(255,255,255,0.08);
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        font-family: 'Montserrat', sans-serif;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: rgba(255,255,255,0.6);
        cursor: pointer;
        touch-action: manipulation;
      }
      .timer-session-btn.active { color: #4682b4; background: rgba(70,130,180,0.15); }
      .timer-divider {
        width: 1px;
        height: 28px;
        background: rgba(255,255,255,0.1);
        flex-shrink: 0;
      }
      .timer-rest {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        justify-content: flex-end;
      }
      .timer-rest-label {
        font-family: 'Montserrat', sans-serif;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: rgba(255,255,255,0.4);
        flex-shrink: 0;
      }
      .timer-rest-display {
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        font-weight: 700;
        color: #4682b4;
        min-width: 40px;
        text-align: right;
        transition: color 0.2s;
      }
      .timer-rest-display.warning { color: #e67e22; }
      .timer-rest-display.done { color: #2ecc71; }
      .timer-rest-progress {
        width: 60px;
        height: 4px;
        background: rgba(255,255,255,0.1);
        border-radius: 2px;
        overflow: hidden;
        flex-shrink: 0;
      }
      .timer-rest-progress-fill {
        height: 100%;
        background: #4682b4;
        border-radius: 2px;
        transition: width 0.5s linear, background 0.3s;
        width: 100%;
      }
      .timer-rest-progress-fill.warning { background: #e67e22; }
      .timer-rest-progress-fill.done { background: #2ecc71; }
      .timer-rest-btns {
        display: flex;
        gap: 5px;
        flex-shrink: 0;
      }
      .timer-rest-btn {
        background: rgba(255,255,255,0.08);
        border: none;
        border-radius: 4px;
        padding: 5px 8px;
        font-family: 'Montserrat', sans-serif;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: rgba(255,255,255,0.6);
        cursor: pointer;
        touch-action: manipulation;
        white-space: nowrap;
      }
      .timer-rest-btn.start-btn { color: #4682b4; background: rgba(70,130,180,0.15); }
      .timer-rest-btn.stop-btn { color: rgba(255,255,255,0.4); }

      /* REST TIMER MODAL */
      #rest-timer-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.85);
        z-index: 1500;
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      #rest-timer-modal.visible { display: flex; }
      .rest-modal-inner {
        text-align: center;
        padding: 40px 32px;
      }
      .rest-modal-label {
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: rgba(255,255,255,0.4);
        margin-bottom: 16px;
      }
      .rest-modal-time {
        font-family: 'Montserrat', sans-serif;
        font-size: 80px;
        font-weight: 800;
        color: white;
        line-height: 1;
        margin-bottom: 8px;
        transition: color 0.3s;
      }
      .rest-modal-time.warning { color: #e67e22; }
      .rest-modal-time.done { color: #2ecc71; }
      .rest-modal-sub {
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: rgba(255,255,255,0.3);
        margin-bottom: 32px;
      }
      .rest-modal-progress {
        width: 200px;
        height: 6px;
        background: rgba(255,255,255,0.1);
        border-radius: 3px;
        overflow: hidden;
        margin: 0 auto 32px;
      }
      .rest-modal-progress-fill {
        height: 100%;
        background: #4682b4;
        border-radius: 3px;
        transition: width 0.5s linear, background 0.3s;
      }
      .rest-modal-progress-fill.warning { background: #e67e22; }
      .rest-modal-progress-fill.done { background: #2ecc71; }
      .rest-modal-btns {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .rest-modal-btn {
        padding: 12px 24px;
        border-radius: 6px;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        cursor: pointer;
        border: none;
        touch-action: manipulation;
      }
      .rest-modal-btn.skip { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); }
      .rest-modal-btn.add { background: rgba(70,130,180,0.2); color: #4682b4; }

      /* START SESSION BUTTON — shows in movement screen */
      .start-session-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #1a1a1a;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 12px 20px;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        cursor: pointer;
        margin-bottom: 16px;
        touch-action: manipulation;
      }
      .start-session-btn.active { background: #4682b4; }
      .start-session-btn .btn-icon { font-size: 14px; }

      /* REST TIMER QUICK BUTTONS — show next to exercises */
      .rest-quick-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: rgba(70,130,180,0.1);
        border: 1.5px solid rgba(70,130,180,0.3);
        border-radius: 4px;
        padding: 4px 8px;
        font-family: 'Montserrat', sans-serif;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: #4682b4;
        cursor: pointer;
        margin-left: 6px;
        touch-action: manipulation;
        flex-shrink: 0;
      }
    </style>

    <!-- TOP BAR -->
    <div class="timer-session">
      <span class="timer-session-label">Session</span>
      <span class="timer-session-time" id="session-display">0:00</span>
      <button class="timer-session-btn" id="session-toggle-btn" onclick="timerToggleSession()">Start</button>
      <button class="timer-session-btn" onclick="timerResetSession()" style="color:rgba(255,255,255,0.3);">Reset</button>
    </div>
    <div class="timer-divider"></div>
    <div class="timer-rest">
      <span class="timer-rest-label">Rest</span>
      <div class="timer-rest-progress"><div class="timer-rest-progress-fill" id="rest-bar-fill"></div></div>
      <span class="timer-rest-display" id="rest-bar-display">—</span>
      <div class="timer-rest-btns">
        <button class="timer-rest-btn start-btn" onclick="timerStartRest(60)">60s</button>
        <button class="timer-rest-btn start-btn" onclick="timerStartRest(90)">90s</button>
        <button class="timer-rest-btn stop-btn" id="rest-stop-btn" onclick="timerStopRest()" style="display:none;">Stop</button>
      </div>
    </div>
  `;

  document.body.appendChild(bar);

  // REST MODAL
  const modal = document.createElement('div');
  modal.id = 'rest-timer-modal';
  modal.innerHTML = `
    <div class="rest-modal-inner">
      <div class="rest-modal-label">Rest Timer</div>
      <div class="rest-modal-time" id="rest-modal-time">1:00</div>
      <div class="rest-modal-sub" id="rest-modal-sub">Rest up</div>
      <div class="rest-modal-progress"><div class="rest-modal-progress-fill" id="rest-modal-fill"></div></div>
      <div class="rest-modal-btns">
        <button class="rest-modal-btn add" onclick="timerAddRest(15)">+15s</button>
        <button class="rest-modal-btn skip" onclick="timerStopRest()">Skip Rest</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// ─── SESSION TIMER ─────────────────────────────────────────
window.timerToggleSession = function() {
  const bar = document.getElementById('workout-timer-bar');
  const btn = document.getElementById('session-toggle-btn');
  if (!timerState.session.running) {
    timerState.session.running = true;
    bar.classList.add('visible');
    btn.textContent = 'Pause';
    btn.classList.add('active');
    timerState.session.interval = setInterval(() => {
      timerState.session.seconds++;
      document.getElementById('session-display').textContent = fmt(timerState.session.seconds);
    }, 1000);
  } else {
    timerState.session.running = false;
    clearInterval(timerState.session.interval);
    btn.textContent = 'Resume';
    btn.classList.remove('active');
  }
};

window.timerResetSession = function() {
  clearInterval(timerState.session.interval);
  timerState.session.running = false;
  timerState.session.seconds = 0;
  const btn = document.getElementById('session-toggle-btn');
  btn.textContent = 'Start';
  btn.classList.remove('active');
  document.getElementById('session-display').textContent = '0:00';
};

// ─── REST TIMER ────────────────────────────────────────────
window.timerStartRest = function(seconds) {
  clearInterval(timerState.rest.interval);
  timerState.rest.seconds = seconds;
  timerState.rest.total = seconds;
  timerState.rest.running = true;
  timerState.rest.alertPlayed = false;

  // Show modal
  document.getElementById('rest-timer-modal').classList.add('visible');
  document.getElementById('rest-stop-btn').style.display = 'inline-flex';
  updateRestUI();

  timerState.rest.interval = setInterval(() => {
    if (timerState.rest.seconds <= 0) {
      clearInterval(timerState.rest.interval);
      timerState.rest.running = false;
      timerState.rest.seconds = 0;
      beepDone();
      updateRestUI();
      // Auto close modal after 2 seconds
      setTimeout(() => {
        document.getElementById('rest-timer-modal').classList.remove('visible');
        document.getElementById('rest-stop-btn').style.display = 'none';
        document.getElementById('rest-bar-display').textContent = '—';
        const fill = document.getElementById('rest-bar-fill');
        fill.style.width = '100%';
        fill.className = 'timer-rest-progress-fill';
      }, 2000);
      return;
    }
    if (timerState.rest.seconds === 10 && !timerState.rest.alertPlayed) {
      timerState.rest.alertPlayed = true;
      beepWarning();
    }
    timerState.rest.seconds--;
    updateRestUI();
  }, 1000);
};

window.timerStopRest = function() {
  clearInterval(timerState.rest.interval);
  timerState.rest.running = false;
  document.getElementById('rest-timer-modal').classList.remove('visible');
  document.getElementById('rest-stop-btn').style.display = 'none';
  document.getElementById('rest-bar-display').textContent = '—';
  const fill = document.getElementById('rest-bar-fill');
  fill.style.width = '100%';
  fill.className = 'timer-rest-progress-fill';
  const mFill = document.getElementById('rest-modal-fill');
  mFill.style.width = '100%';
  mFill.className = 'rest-modal-progress-fill';
};

window.timerAddRest = function(secs) {
  timerState.rest.seconds += secs;
  timerState.rest.total += secs;
  updateRestUI();
};

function updateRestUI() {
  const s = timerState.rest.seconds;
  const total = timerState.rest.total;
  const pct = total > 0 ? (s / total) * 100 : 0;
  const isDone = s <= 0;
  const isWarning = s <= 10 && s > 0;
  const cls = isDone ? 'done' : isWarning ? 'warning' : '';

  // Bar
  const barDisplay = document.getElementById('rest-bar-display');
  const barFill = document.getElementById('rest-bar-fill');
  if (barDisplay) {
    barDisplay.textContent = isDone ? 'Go!' : fmt(s);
    barDisplay.className = 'timer-rest-display' + (cls ? ' ' + cls : '');
  }
  if (barFill) {
    barFill.style.width = pct + '%';
    barFill.className = 'timer-rest-progress-fill' + (cls ? ' ' + cls : '');
  }

  // Modal
  const modalTime = document.getElementById('rest-modal-time');
  const modalSub = document.getElementById('rest-modal-sub');
  const modalFill = document.getElementById('rest-modal-fill');
  if (modalTime) {
    modalTime.textContent = isDone ? 'Go!' : fmt(s);
    modalTime.className = 'rest-modal-time' + (cls ? ' ' + cls : '');
  }
  if (modalSub) {
    modalSub.textContent = isDone ? 'Next set!' : isWarning ? 'Almost...' : 'Rest up';
  }
  if (modalFill) {
    modalFill.style.width = pct + '%';
    modalFill.className = 'rest-modal-progress-fill' + (cls ? ' ' + cls : '');
  }
}

// ─── INJECT START BUTTON INTO MOVEMENT SCREEN ─────────────
function injectStartButton() {
  const movementScreen = document.getElementById('screen-movement');
  if (!movementScreen) return;
  if (document.getElementById('session-start-wrap')) return;

  const wrap = document.createElement('div');
  wrap.id = 'session-start-wrap';
  wrap.style.marginBottom = '16px';
  wrap.innerHTML = `
    <button class="start-session-btn" id="main-session-btn" onclick="timerToggleSessionFromBtn(this)">
      <span class="btn-icon">⏱</span>
      <span id="main-session-btn-text">Start Session Timer</span>
      <span id="main-session-timer-display" style="font-size:14px;margin-left:4px;display:none;"></span>
    </button>
  `;

  // Insert before the injury check section
  const firstSection = movementScreen.querySelector('.content-section');
  if (firstSection) {
    movementScreen.insertBefore(wrap, firstSection);
  }
}

window.timerToggleSessionFromBtn = function(btn) {
  const bar = document.getElementById('workout-timer-bar');
  const display = document.getElementById('main-session-timer-display');
  const btnText = document.getElementById('main-session-btn-text');

  if (!timerState.session.running) {
    timerState.session.running = true;
    bar.classList.add('visible');
    btn.classList.add('active');
    btnText.textContent = 'Pause Timer';
    display.style.display = 'inline';
    timerState.session.interval = setInterval(() => {
      timerState.session.seconds++;
      const t = fmt(timerState.session.seconds);
      document.getElementById('session-display').textContent = t;
      display.textContent = t;
    }, 1000);
    // Toggle the top bar button too
    const topBtn = document.getElementById('session-toggle-btn');
    if (topBtn) { topBtn.textContent = 'Pause'; topBtn.classList.add('active'); }
  } else {
    timerState.session.running = false;
    clearInterval(timerState.session.interval);
    btn.classList.remove('active');
    btnText.textContent = 'Resume Timer';
    const topBtn = document.getElementById('session-toggle-btn');
    if (topBtn) { topBtn.textContent = 'Resume'; topBtn.classList.remove('active'); }
  }
};

// ─── INIT ──────────────────────────────────────────────────
function timerInit() {
  injectTimerUI();
  injectStartButton();
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', timerInit);
} else {
  timerInit();
}

// Also re-inject when screens change (since showScreen is patched)
const _timerOrigShow = window.showScreen;
if (_timerOrigShow) {
  window.showScreen = function(id) {
    _timerOrigShow(id);
    if (id === 'movement') {
      setTimeout(injectStartButton, 50);
    }
  };
}

})();
