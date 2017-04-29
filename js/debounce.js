'use strict';
// Модуль для устранения эффекта дрожания при переключении каких-либо событий
(function () {
  var DEBOUNCE_INTERVAL = 300;

  var lastTimeout;
  window.debounce = function (callback) {
    if (lastTimeout !== null) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
})();
