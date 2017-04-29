'use strict';

// Глобальный объект для создания метки и обрабоки событий
window.pinAction = (function () {
  // функция удаления активной метки
  var removePinActive = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive !== null) {
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
    pinElement.classList.remove('pin__main');

    // константы для правильного позиционирования меток
    var OFFSET_PIN_X = 28;
    var OFFSET_PIN_Y = 75;

    pinElement.style.left = offer.location.x - OFFSET_PIN_X + 'px';
    pinElement.style.top = offer.location.y - OFFSET_PIN_Y + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;

    // обработчик клика на метку
    pinElement.addEventListener('click', function () {
      addPinActive(pinElement);
      window.showDialog.showDialogCard(offer);
    });

    // обработчик нажатия Enter при фокусе на метке
    var ESC_KEY_CODE = 27;
    pinElement.addEventListener('keydown', function (event) {
      if (event.keyCode === ESC_KEY_CODE) {
        addPinActive(pinElement);
        window.showDialog.showDialogCard(offer);
      }
    });
    return pinElement;
  };

  return {
    renderPin: renderPin,
    removePinActive: removePinActive
  };
})();

