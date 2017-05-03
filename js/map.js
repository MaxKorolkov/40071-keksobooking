'use strict';
// Модуль - IIFE функция для добавления меток в DOM

(function () {
  // Блок меток
  var pinMap = document.querySelector('.tokyo__pin-map');

  // Глобальный объект для клонирования и создания меток
  window.renderPinOffer = function (offers) {
    // Создание и добавление меток чероз DocumentFragment
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      pinFragment.appendChild(window.pinAction.renderPin(offers[i]));
    }
    pinMap.appendChild(pinFragment);
  };
})();


