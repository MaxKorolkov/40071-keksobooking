'use strict';

(function () {

  // переменные для блока меток
  var pinMap = document.querySelector('.tokyo__pin-map');

  // создание и добавление меток чероз DocumentFragment
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < window.offers.length; i++) {
    /*  pinFragment.appendChild(window.pin.renderPin(window.offers[i]));*/
    pinFragment.appendChild(window.pinAction.renderPin(window.offers[i]));
  }
  pinMap.appendChild(pinFragment);

})();
