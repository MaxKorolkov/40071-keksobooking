'use strict';

(function () {
  var successHandler = function (offers) {
    window.renderPinOffer(offers);
    window.addEventFilters(offers);
  };

  var errorHandler = function (errorMessage) {
    var error = document.createElement('div');
    error.setAttribute('class', 'error-message');
    error.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  window.load(URL, successHandler, errorHandler);
})();
