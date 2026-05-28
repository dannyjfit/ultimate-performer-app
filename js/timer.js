// ═══════════════════════════════════════════════════════════
// WORKOUT TIMER v2 — Session Timer + Rest Timer
// ═══════════════════════════════════════════════════════════

(function() {

const timerState = {
  session: { running: false, seconds: 0, interval: null },
  rest: { running: false, seconds: 0, total: 0, interval: null, alertPlayed: false }
};

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
    setTimeout(() => ctx.close(), 500);
  } catch(e) {}
}

function beepDone() {
  beep(880, 0.15, 0.3);
  setTimeout(() => beep(880, 0.15, 0.3), 200);
  setTimeout(() => beep(1100, 0.3, 0.4), 400);
}

function beepWarning() { beep(660, 0.1, 0.2); }

function fmt(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return (m > 0 ? m + ':' : '') + (s < 10 ? '0' : '') + s;
}

function injectTimerUI() {
  if (document.getElementById('workout-timer-bar')) return;

  const style = document.createElement('style');
  style.textContent = `
    #workout-timer-bar {
      position: fixed;
      top: 56px;
      left: 0; right: 0;
      z-index: 150;
      background: #1a1a1a;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      display: none;
      padding: 8px 14px;
      gap: 0;
    }
    #workout-timer-bar.visible { display: block; }
    .timer-row {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 8px;
    }
    .timer-row + .timer-row {
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .timer-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      width: 52px;
      flex-shrink: 0;
    }
    .timer-time {
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      font-weight: 800;
      color: white;
      min-width: 44px;
      flex-shrink: 0;
    }
    .timer-time.blue { color: #4682b4; }
    .timer-time.orange { color: #e67e22; }
    .timer-time.green { color: #2ecc71; }
    .timer-btns {
      display: flex;
      gap: 6px;
      margin-left: auto;
      flex-shrink: 0;
    }
    .timer-btn {
      background: rgba(255,255,255,0.08);
      border: none;
      border-radius: 4px;
      padding: 6px 10px;
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      cursor: pointer;
      touch-action: manipulation;
      white-space: nowrap;
    }
    .timer-btn.blue { color: #4682b4; background: rgba(70,130,180,0.18); }
    .timer-btn.green { color: #2ecc71; background: rgba(46,204,113,0.15); }
    .timer-rest-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.08);
      border-radius: 2px;
      overflow: hidden;
      margin: 0 4px;
    }
    .timer-rest-bar-fill {
      height: 100%;
      background: #4682b4;
      border-radius: 2px;
      transition: width 0.5s linear, background 0.3s;
      width: 100%;
    }
    .timer-rest-bar-fill.orange { background: #e67e22; }
    .timer-rest-bar-fill.green { background: #2ecc71; }

    /* REST MODAL */
    #rest-modal {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.92);
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
    }
    #rest-modal.visible { display: flex; }
    .rest-modal-box {
      text-align: center;
      padding: 48px 32px;
    }
    .rest-modal-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      margin-bottom: 16px;
    }
    .rest-modal-time {
      font-family: 'Montserrat', sans-serif;
      font-size: 88px;
      font-weight: 800;
      color: white;
      line-height: 1;
      margin-bottom: 6px;
      transition: color 0.3s;
    }
    .rest-modal-time.orange { color: #e67e22; }
    .rest-modal-time.green { color: #2ecc71; }
    .rest-modal-sub {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.25);
      margin-bottom: 28px;
    }
    .rest-modal-prog {
      width: 180px;
      height: 5px;
      background: rgba(255,255,255,0.08);
      border-radius: 3px;
      overflow: hidden;
      margin: 0 auto 36px;
    }
    .rest-modal-prog-fill {
      height: 100%;
      background: #4682b4;
      border-radius: 3px;
      transition: width 0.5s linear, background 0.3s;
    }
    .rest-modal-prog-fill.orange { background: #e67e22; }
    .rest-modal-prog-fill.green { background: #2ecc71; }
    .rest-modal-btns {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    .rest-modal-btn {
      padding: 13px 22px;
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
    .rest-modal-btn.add { background: rgba(70,130,180,0.2); color: #4682b4; }
    .rest-modal-btn.skip { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.45); }

    /* START SESSION BTN */
    .start-session-wrap { margin-bottom: 16px; }
    .start-session-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #1a1a1a;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 12px 18px;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      cursor: pointer;
      touch-action: manipulation;
    }
    .start-session-btn.active { background: #4682b4; }
  `;
  document.head.appendChild(style);

  // TOP BAR
  const bar = document.createElement('div');
  bar.id = 'workout-timer-bar';
  bar.innerHTML = `
    <div class="timer-row">
      <span class="timer-label">Session</span>
      <span class="timer-time" id="session-display">0:00</span>
      <div class="timer-btns">
        <button class="timer-btn blue" id="session-toggle-btn" onclick="timerToggleSession()">Start</button>
        <button class="timer-btn" onclick="timerResetSession()">Reset</button>
      </div>
    </div>
    <div class="timer-row">
      <span class="timer-label">Rest</span>
      <span class="timer-time blue" id="rest-bar-time">—</span>
      <div class="timer-rest-bar"><div class="timer-rest-bar-fill" id="rest-bar-fill"></div></div>
      <div class="timer-btns">
        <button class="timer-btn blue" onclick="timerStartRest(60)">60s</button>
        <button class="timer-btn blue" onclick="timerStartRest(90)">90s</button>
        <button class="timer-btn" id="rest-stop-btn" onclick="timerStopRest()" style="display:none;">Stop</button>
      </div>
    </div>
  `;
  document.body.appendChild(bar);

  // REST MODAL
  const modal = document.createElement('div');
  modal.id = 'rest-modal';
  modal.innerHTML = `
    <div class="rest-modal-box">
      <div class="rest-modal-label">Rest Timer</div>
      <div class="rest-modal-time" id="rest-modal-time">1:00</div>
      <div class="rest-modal-sub" id="rest-modal-sub">Rest up</div>
      <div class="rest-modal-prog"><div class="rest-modal-prog-fill" id="rest-modal-fill"></div></div>
      <div class="rest-modal-btns">
        <button class="rest-modal-btn add" onclick="timerAddRest(15)">+15s</button>
        <button class="rest-modal-btn skip" onclick="timerStopRest()">Skip Rest</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// SESSION
window.timerToggleSession = function() {
  const bar = document.getElementById('workout-timer-bar');
  const btn = document.getElementById('session-toggle-btn');
  const mainBtn = document.getElementById('main-session-btn');
  if (!timerState.session.running) {
    timerState.session.running = true;
    bar.classList.add('visible');
    btn.textContent = 'Pause';
    if (mainBtn) { mainBtn.classList.add('active'); mainBtn.querySelector('.btn-text').textContent = 'Pause Timer'; }
    timerState.session.interval = setInterval(() => {
      timerState.session.seconds++;
      const t = fmt(timerState.session.seconds);
      document.getElementById('session-display').textContent = t;
      const d = document.getElementById('main-session-display');
      if (d) d.textContent = ' · ' + t;
    }, 1000);
  } else {
    timerState.session.running = false;
    clearInterval(timerState.session.interval);
    btn.textContent = 'Resume';
    if (mainBtn) { mainBtn.classList.remove('active'); mainBtn.querySelector('.btn-text').textContent = 'Resume Timer'; }
  }
};

window.timerResetSession = function() {
  clearInterval(timerState.session.interval);
  timerState.session.running = false;
  timerState.session.seconds = 0;
  const btn = document.getElementById('session-toggle-btn');
  btn.textContent = 'Start';
  document.getElementById('session-display').textContent = '0:00';
  const d = document.getElementById('main-session-display');
  if (d) d.textContent = '';
  const mainBtn = document.getElementById('main-session-btn');
  if (mainBtn) { mainBtn.classList.remove('active'); mainBtn.querySelector('.btn-text').textContent = 'Start Session Timer'; }
};

// REST
window.timerStartRest = function(seconds) {
  clearInterval(timerState.rest.interval);
  timerState.rest.seconds = seconds;
  timerState.rest.total = seconds;
  timerState.rest.running = true;
  timerState.rest.alertPlayed = false;
  document.getElementById('rest-modal').classList.add('visible');
  document.getElementById('rest-stop-btn').style.display = 'inline-flex';
  updateRestUI();
  timerState.rest.interval = setInterval(() => {
    if (timerState.rest.seconds <= 0) {
      clearInterval(timerState.rest.interval);
      timerState.rest.running = false;
      beepDone();
      updateRestUI();
      setTimeout(() => {
        document.getElementById('rest-modal').classList.remove('visible');
        document.getElementById('rest-stop-btn').style.display = 'none';
        resetRestBar();
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
  document.getElementById('rest-modal').classList.remove('visible');
  document.getElementById('rest-stop-btn').style.display = 'none';
  resetRestBar();
};

window.timerAddRest = function(s) {
  timerState.rest.seconds += s;
  timerState.rest.total += s;
  updateRestUI();
};

function resetRestBar() {
  document.getElementById('rest-bar-time').textContent = '—';
  document.getElementById('rest-bar-time').className = 'timer-time blue';
  const f = document.getElementById('rest-bar-fill');
  f.style.width = '100%';
  f.className = 'timer-rest-bar-fill';
}

function updateRestUI() {
  const s = timerState.rest.seconds;
  const pct = timerState.rest.total > 0 ? (s / timerState.rest.total) * 100 : 0;
  const isDone = s <= 0;
  const isWarn = s <= 10 && s > 0;
  const cls = isDone ? 'green' : isWarn ? 'orange' : '';

  // Bar
  const barTime = document.getElementById('rest-bar-time');
  if (barTime) { barTime.textContent = isDone ? 'Go!' : fmt(s); barTime.className = 'timer-time ' + (cls || 'blue'); }
  const barFill = document.getElementById('rest-bar-fill');
  if (barFill) { barFill.style.width = pct + '%'; barFill.className = 'timer-rest-bar-fill' + (cls ? ' ' + cls : ''); }

  // Modal
  const mt = document.getElementById('rest-modal-time');
  if (mt) { mt.textContent = isDone ? 'Go!' : fmt(s); mt.className = 'rest-modal-time' + (cls ? ' ' + cls : ''); }
  const ms = document.getElementById('rest-modal-sub');
  if (ms) ms.textContent = isDone ? 'Next set!' : isWarn ? 'Almost there...' : 'Rest up';
  const mf = document.getElementById('rest-modal-fill');
  if (mf) { mf.style.width = pct + '%'; mf.className = 'rest-modal-prog-fill' + (cls ? ' ' + cls : ''); }
}

// INJECT START BUTTON
function injectStartButton() {
  if (document.getElementById('session-start-wrap')) return;
  const screen = document.getElementById('screen-movement');
  if (!screen) return;
  const wrap = document.createElement('div');
  wrap.id = 'session-start-wrap';
  wrap.className = 'start-session-wrap';
  wrap.innerHTML = `
    <button class="start-session-btn" id="main-session-btn" onclick="timerToggleSession()">
      <span>⏱</span>
      <span class="btn-text">Start Session Timer</span>
      <span id="main-session-display" style="font-size:13px;opacity:0.7;"></span>
    </button>
  `;
  const first = screen.querySelector('.content-section');
  if (first) screen.insertBefore(wrap, first);
}

function init() {
  injectTimerUI();
  injectStartButton();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const _orig = window.showScreen;
if (_orig) {
  window.showScreen = function(id) {
    _orig(id);
    const bar = document.getElementById('workout-timer-bar');
    if (id === 'movement') {
      setTimeout(injectStartButton, 50);
      // Show bar only if session is running
      if (bar && timerState.session.running) bar.classList.add('visible');
    } else {
      // Hide bar when leaving movement screen
      if (bar) bar.classList.remove('visible');
      // Stop rest timer if running
      if (timerState.rest.running) timerStopRest();
    }
  };
}

})();
