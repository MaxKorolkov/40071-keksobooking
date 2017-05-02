'use strict';

// Глобальный объект для клонирования и создания меток, а также для Drag And Drop главной метки
window.renderPinOffer = function (offers) {

  // Переменные для блока меток
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = document.querySelector('.pin__main');
  var inputAddress = document.querySelector('#address');

  // Константы отступов для правильного указания положения метки
  var OFFSET_Y = 37;
  var OFFSET_X = 92;

  // Создание и добавление меток чероз DocumentFragment
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    pinFragment.appendChild(window.pinAction.renderPin(offers[i]));
  }
  pinMap.appendChild(pinFragment);

  // Обработка нажатия кнопкой мыши на главную метку
  var onPinMainDown = function (downEvt) {
    downEvt.preventDefault();

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    // Обработка движения мыши
    var onPinMainMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      inputAddress.value = 'x: ' + (pinMain.offsetTop - shift.y + OFFSET_Y) + ', y: ' + (pinMain.offsetLeft - shift.x + OFFSET_X);
    };

    // Обработка отпуска кнопки и удаление обработчиков
    var onPinMainUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onPinMainMove);
      document.removeEventListener('mouseup', onPinMainUp);
      document.removeEventListener('mousedown', onPinMainDown);
    };

    document.addEventListener('mousemove', onPinMainMove);
    document.addEventListener('mouseup', onPinMainUp);
  };
  document.addEventListener('mousedown', onPinMainDown);
};
