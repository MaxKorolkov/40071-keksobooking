'use strict';

window.renderPinOffer = function (offers) {

  // переменные для блока меток
  var pinMap = document.querySelector('.tokyo__pin-map');

  // создание и добавление меток чероз DocumentFragment
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    pinFragment.appendChild(window.pinAction.renderPin(offers[i]));
  }
  pinMap.appendChild(pinFragment);

  // переменные для работы с перемещением метки
  var pinMain = document.querySelector('.pin__main');
  var inputAddress = document.querySelector('#address');

  // обработчик перемещения метки
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
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
      inputAddress.value = 'x: ' + (pinMain.offsetTop - shift.y + 37) + ', y: ' + (pinMain.offsetLeft - shift.x + 95);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
};
