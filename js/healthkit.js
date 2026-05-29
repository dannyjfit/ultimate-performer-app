// healthkit.js — step tracking via Capacitor HealthKit bridge

var HK = {
  goal: 8000,
  granted: false,

  init: function() {
    var hour = new Date().getHours();
    var greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    var greetEl = document.getElementById('dash-greeting');
    if (greetEl) {
      greetEl.innerHTML = '<p style="font-family:\'DM Serif Display\',serif;font-size:22px;color:var(--dark);padding:0 0 4px;text-align:center;">' + greeting + '</p>';
    }

    var savedGoal = localStorage.getItem('step_goal');
    if (savedGoal) HK.goal = parseInt(savedGoal);

    var hkGranted = localStorage.getItem('hk_granted');
    if (hkGranted === 'true') {
      HK.granted = true;
      HK.fetchSteps();
    } else {
      var btn = document.getElementById('steps-enable-btn');
      if (btn) btn.style.display = 'block';
    }
  },

  requestPermission: function() {
    var plugin = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.HealthKitBridge;
    if (!plugin) {
      console.log('HealthKitBridge plugin not found - checking alternatives');
      // Try calling via Capacitor core directly
      if (window.Capacitor) {
        window.Capacitor.nativeCallback('HealthKitBridge', 'requestPermission', {}, function(result) {
          if (result && result.granted) {
            HK.granted = true;
            localStorage.setItem('hk_granted', 'true');
            var btn = document.getElementById('steps-enable-btn');
            if (btn) btn.style.display = 'none';
            HK.fetchSteps();
          }
        });
      }
      return;
    }
    plugin.requestPermission().then(function(result) {
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
    var plugin = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.HealthKitBridge;
    if (!plugin) return;

    plugin.getStepsToday().then(function(result) {
      HK.renderTodayCard(result.steps || 0);
    }).catch(function() {
      HK.renderTodayCard(0);
    });

    plugin.getStepsWeek().then(function(result) {
      HK.renderWeekChart(result.days || []);
    }).catch(function() {});
  },

  renderTodayCard: function(steps) {
    var goal = HK.goal;
    var pct = Math.min(100, Math.round((steps / goal) * 100));
    var remaining = Math.max(0, goal - steps);

    var sec = document.getElementById('steps-section');
    if (sec) sec.style.display = 'block';
    var secP = document.getElementById('steps-section-progress');
    if (secP) secP.style.display = 'block';

    var els = {
      count: ['steps-today-count', 'steps-today-count-p'],
      denom: ['steps-today-denom', 'steps-today-denom-p'],
      bar: ['steps-bar', 'steps-bar-p'],
      goal: ['steps-goal-label', 'steps-goal-label-p'],
      rem: ['steps-remaining-text', 'steps-remaining-text-p']
    };

    els.count.forEach(function(id) { var el = document.getElementById(id); if(el) el.textContent = steps.toLocaleString(); });
    els.denom.forEach(function(id) { var el = document.getElementById(id); if(el) el.textContent = '/ ' + goal.toLocaleString(); });
    els.bar.forEach(function(id) { var el = document.getElementById(id); if(el) el.style.width = pct + '%'; });
    els.goal.forEach(function(id) { var el = document.getElementById(id); if(el) el.textContent = 'Goal: ' + goal.toLocaleString(); });
    els.rem.forEach(function(id) { var el = document.getElementById(id); if(el) el.textContent = remaining > 0 ? remaining.toLocaleString() + ' steps to go' : 'Goal reached!'; });
  },

  renderWeekChart: function(days) {
    var goal = HK.goal;
    var dayLabels = ['M','T','W','T','F','S','S'];
    var todayIdx = (new Date().getDay() + 6) % 7;
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
