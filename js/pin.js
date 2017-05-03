'use strict';

// Глобальный объект для создания метки и обрабоки событий
window.pinAction = (function () {
  // Константы
  var OFFSET_PIN_X = 28;
  var OFFSET_PIN_Y = 75;
  var ESC_KEY_CODE = 27;

  // Переменные
  var pin = document.querySelector('.pin__main');
  var pinMainClass = 'pin__main';
  var pinActiveClass = 'pin--active';

  // Функция удаления активной метки
  var removePinActive = function () {
    var pinActive = document.querySelector('.' + pinActiveClass);
    if (pinActive !== null) {
      pinActive.classList.remove(pinActiveClass);
    }
  };

  // Функция генерации активной метки
  var addPinActive = function (pinElement) {
    removePinActive();
    pinElement.classList.add(pinActiveClass);
  };

  // Генерация метки и обработка клика и нажатия Enter при фокусе
  var renderPin = function (offer) {
    var pinElement = pin.cloneNode(true);
    pinElement.classList.remove(pinMainClass);
    pinElement.style.left = offer.location.x - OFFSET_PIN_X + 'px';
    pinElement.style.top = offer.location.y - OFFSET_PIN_Y + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;

    // Обработчик клика на метку
    pinElement.addEventListener('click', function () {
      addPinActive(pinElement);
      window.showDialog.showDialogCard(offer);
    });

    // Обработчик нажатия Enter при фокусе на метке
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

