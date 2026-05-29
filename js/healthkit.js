// healthkit.js — step tracking via Capacitor HealthKit bridge

var HK = {
  goal: 8000,
  granted: false,

  init: function() {
    // Set greeting
    var hour = new Date().getHours();
    var greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    var greetEl = document.getElementById('dash-greeting');
    if (greetEl) {
      greetEl.innerHTML = '<p style="font-family:\'DM Serif Display\',serif;font-size:22px;color:var(--dark);padding:0 0 4px;">' + greeting + '</p>';
    }

    // Load saved step goal from localStorage
    var savedGoal = localStorage.getItem('step_goal');
    if (savedGoal) HK.goal = parseInt(savedGoal);

    // Check if permission already granted
    var hkGranted = localStorage.getItem('hk_granted');
    if (hkGranted === 'true') {
      HK.granted = true;
      HK.fetchSteps();
    } else {
      // Show enable button
      var btn = document.getElementById('steps-enable-btn');
      if (btn) btn.style.display = 'block';
    }
  },

  requestPermission: function() {
    if (!window.Capacitor || !window.Capacitor.Plugins || !window.Capacitor.Plugins.HealthKitBridge) {
      console.log('HealthKitBridge not available');
      return;
    }
    window.Capacitor.Plugins.HealthKitBridge.requestPermission().then(function(result) {
      if (result.granted) {
        HK.granted = true;
        localStorage.setItem('hk_granted', 'true');
        var btn = document.getElementById('steps-enable-btn');
        if (btn) btn.style.display = 'none';
        HK.fetchSteps();
      }
    }).catch(function(err) {
      console.error('HealthKit permission error:', err);
    });
  },

  fetchSteps: function() {
    if (!window.Capacitor || !window.Capacitor.Plugins || !window.Capacitor.Plugins.HealthKitBridge) return;

    // Today's steps
    window.Capacitor.Plugins.HealthKitBridge.getStepsToday().then(function(result) {
      HK.renderTodayCard(result.steps || 0);
    }).catch(function() {
      HK.renderTodayCard(0);
    });

    // Week steps
    window.Capacitor.Plugins.HealthKitBridge.getStepsWeek().then(function(result) {
      HK.renderWeekChart(result.days || []);
    }).catch(function() {});
  },

  renderTodayCard: function(steps) {
    var goal = HK.goal;
    var pct = Math.min(100, Math.round((steps / goal) * 100));
    var remaining = Math.max(0, goal - steps);

    // Show sections
    var sec = document.getElementById('steps-section');
    if (sec) sec.style.display = 'block';
    var secP = document.getElementById('steps-section-progress');
    if (secP) secP.style.display = 'block';

    // Update home card
    var countEl = document.getElementById('steps-today-count');
    if (countEl) countEl.textContent = steps.toLocaleString();
    var denomEl = document.getElementById('steps-today-denom');
    if (denomEl) denomEl.textContent = '/ ' + goal.toLocaleString();
    var barEl = document.getElementById('steps-bar');
    if (barEl) barEl.style.width = pct + '%';
    var goalLbl = document.getElementById('steps-goal-label');
    if (goalLbl) goalLbl.textContent = 'Goal: ' + goal.toLocaleString();
    var remEl = document.getElementById('steps-remaining-text');
    if (remEl) remEl.textContent = remaining > 0 ? remaining.toLocaleString() + ' steps to go' : 'Goal reached!';

    // Update progress card
    var countElP = document.getElementById('steps-today-count-p');
    if (countElP) countElP.textContent = steps.toLocaleString();
    var denomElP = document.getElementById('steps-today-denom-p');
    if (denomElP) denomElP.textContent = '/ ' + goal.toLocaleString();
    var barElP = document.getElementById('steps-bar-p');
    if (barElP) barElP.style.width = pct + '%';
    var goalLblP = document.getElementById('steps-goal-label-p');
    if (goalLblP) goalLblP.textContent = 'Goal: ' + goal.toLocaleString();
    var remElP = document.getElementById('steps-remaining-text-p');
    if (remElP) remElP.textContent = remaining > 0 ? remaining.toLocaleString() + ' steps to go' : 'Goal reached!';
  },

  renderWeekChart: function(days) {
    var goal = HK.goal;
    var dayLabels = ['M','T','W','T','F','S','S'];
    var todayIdx = new Date().getDay();
    // Convert Sunday=0 to Monday=0 index
    todayIdx = (todayIdx + 6) % 7;
    var maxSteps = Math.max(goal, Math.max.apply(null, days.concat([1])));

    function buildChart(containerId) {
      var container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = '';
      for (var i = 0; i < 7; i++) {
        var stepVal = days[i] || 0;
        var heightPct = Math.round((stepVal / maxSteps) * 72);
        var isToday = i === todayIdx;
        var hitGoal = stepVal >= goal;
        var isFuture = i > todayIdx;
        var barColor = isFuture ? 'rgba(255,255,255,0.06)' : hitGoal ? '#4682b4' : 'rgba(70,130,180,0.35)';
        var minH = isFuture ? 6 : Math.max(6, heightPct);
        var dayDiv = document.createElement('div');
        dayDiv.className = 'steps-bar-day';
        var fill = document.createElement('div');
        fill.className = 'steps-bar-day-fill';
        fill.style.cssText = 'width:100%;height:' + minH + 'px;background:' + barColor + ';border-radius:3px 3px 0 0;' + (isToday ? 'border:1px dashed rgba(70,130,180,0.6);' : '');
        var lbl = document.createElement('span');
        lbl.className = 'steps-bar-day-lbl' + (isToday ? ' today' : '');
        lbl.textContent = dayLabels[i];
        dayDiv.appendChild(fill);
        dayDiv.appendChild(lbl);
        container.appendChild(dayDiv);
      }
    }

    buildChart('steps-week-chart');
    buildChart('steps-week-chart-p');
  }
};

function requestHealthKit() {
  HK.requestPermission();
}

window.addEventListener('load', function() {
  setTimeout(function() {
    HK.init();
  }, 1000);
});
