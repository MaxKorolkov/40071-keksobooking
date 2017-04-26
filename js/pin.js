'use strict';

// Глобальный объект для создания метки и обрабоки событий
window.pinAction = (function () {
  // функция удаления активной метки
  var removePinActive = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
    }
  };

// функция генерации активной метки
  var addPinActive = function (pinElement) {
    removePinActive();
    pinElement.classList.add('pin--active');
  };

  // генерация метки и обработка клика и нажатия Enter при фокусе
  var renderPin = function (offer) {
    var pin = document.querySelector('.pin');
    var pinElement = pin.cloneNode(true);
    pinElement.style.left = offer.location.x - 37 + 'px';
    pinElement.style.top = offer.location.y - 92 + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.addEventListener('click', function () {
      addPinActive(pinElement);
      window.renderDialog.showDialog(offer);
    });
    pinElement.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        addPinActive(pinElement);
        window.renderDialog.showDialog(offer);
      }
    });
    return pinElement;
  };

  return {
    renderPin: renderPin,
    removePinActive: removePinActive
  };
})();

