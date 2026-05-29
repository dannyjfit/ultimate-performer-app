// healthkit.js — step tracking via @perfood/capacitor-healthkit

var HK = {
  goal: 8000,
  granted: false,

  init: function() {
    var hour = new Date().getHours();
    var greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    var greetEl = document.getElementById('dash-greeting');
    if (greetEl) {
      greetEl.innerHTML = '<p style="font-family:\'DM Serif Display\',serif;font-size:22px;color:white;padding:0 0 4px;text-align:center;">' + greeting + '</p>';
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
    var plugin = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.CapacitorHealthkit;
    if (!plugin) {
      console.log('CapacitorHealthkit plugin not available');
      return;
    }
    plugin.requestAuthorization({
      all: [],
      read: ['steps'],
      write: []
    }).then(function() {
      HK.granted = true;
      localStorage.setItem('hk_granted', 'true');
      var btn = document.getElementById('steps-enable-btn');
      if (btn) btn.style.display = 'none';
      HK.fetchSteps();
    }).catch(function(err) {
      console.error('HealthKit auth error:', err);
    });
  },

  fetchSteps: function() {
    var plugin = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.CapacitorHealthkit;
    if (!plugin) return;

    var now = new Date();
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Today's steps
    plugin.queryHKitSampleType({
      sampleName: 'stepCount',
      startDate: startOfDay.toISOString(),
      endDate: now.toISOString(),
      limit: 0
    }).then(function(result) {
      var steps = 0;
      if (result && result.resultData) {
        result.resultData.forEach(function(entry) {
          // plugin returns 'value' field for quantity samples
          steps += (entry.value || entry.quantity || 0);
        });
      }
      HK.renderTodayCard(Math.round(steps));
    }).catch(function(err) {
      console.error('Steps today error:', err);
      HK.renderTodayCard(0);
    });

    // Week steps — query each of last 7 days
    var weekSteps = [0,0,0,0,0,0,0];
    var todayIdx = (now.getDay() + 6) % 7;
    var pending = 7;

    for (var d = 0; d < 7; d++) {
      (function(dayOffset) {
        var dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOffset);
        var dayEnd = new Date(dayStart.getTime() + 86400000);
        var weekIdx = (todayIdx - dayOffset + 7) % 7;

        plugin.queryHKitSampleType({
          sampleName: 'stepCount',
          startDate: dayStart.toISOString(),
          endDate: dayEnd.toISOString(),
          limit: 0
        }).then(function(result) {
          var steps = 0;
          if (result && result.resultData) {
            result.resultData.forEach(function(entry) {
              steps += (entry.value || entry.quantity || 0);
            });
          }
          weekSteps[weekIdx] = Math.round(steps);
          pending--;
          if (pending === 0) HK.renderWeekChart(weekSteps);
        }).catch(function() {
          pending--;
          if (pending === 0) HK.renderWeekChart(weekSteps);
        });
      })(d);
    }
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
