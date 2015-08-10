// Stageprompt 2.0.1
//
// See: https://github.com/alphagov/stageprompt
//
// Stageprompt allows user journeys to be described and instrumented
// using data attributes.
//
// Setup (run this on document ready):
//
//   LGSS.performance.stageprompt.setupForGoogleAnalytics();
//
// Usage:
//
//   Sending events on page load:
//
//     <div id="wrapper" class="service" data-journey="pay-register-birth-abroad:start">
//         [...]
//     </div>
//
//   Sending events on click:
//
//     <a class="help-button" href="#" data-journey-click="stage:help:info">See more info...</a>

var LGSS = LGSS || {};

LGSS.performance = LGSS.performance || {};

LGSS.performance.stageprompt = (function () {

  var setup, setupForGoogleAnalytics, splitAction;

  splitAction = function (action) {
    var parts = action.split(':');
    if (parts.length <= 3) return parts;
    return [parts.shift(), parts.shift(), parts.join(':')];
  };

  setup = function (analyticsCallback) {
    var journeyStage = $('[data-journey]').attr('data-journey'),
        journeyHelpers = $('[data-journey-click]');

    if (journeyStage) {
      analyticsCallback.apply(null, splitAction(journeyStage));
    }

    journeyHelpers.on('click', function (event) {
      analyticsCallback.apply(null, splitAction($(this).data('journey-click')));
    });
  };

  setupForGoogleAnalytics = function () {
    setup(LGSS.performance.sendGoogleAnalyticsEvent);
  };

  return {
    setup: setup,
    setupForGoogleAnalytics: setupForGoogleAnalytics
  };
}());

LGSS.performance.sendGoogleAnalyticsEvent = function (category, event, label) {
  if (window.ga && typeof(window.ga) === 'function') {
    ga('send', 'event', category, event, label);
  } else {
    _gaq.push(['_trackEvent', category, event, label, undefined, true]);
  }
};
