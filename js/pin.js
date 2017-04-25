'use strict';

// переменные для блока меток
var pin = document.querySelector('.pin');
var pinMap = document.querySelector('.tokyo__pin-map');

// функция удаления активной метки
function removePinActive() {
  var pinActive = document.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
}

// функция генерации активной метки
function addPinActive(pinElement) {
  removePinActive();
  pinElement.classList.add('pin--active');
}

// генерация метки и обработка клика и нажатия Enter при фокусе
function renderPin(offer) {
  var pinElement = pin.cloneNode(true);
  pinElement.style.left = offer.location.x - 37 + 'px';
  pinElement.style.top = offer.location.y - 92 + 'px';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.addEventListener('click', function () {
    addPinActive(pinElement);
    showDialog(offer);
  });
  pinElement.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      addPinActive(pinElement);
      showDialog(offer);
    }
  });
  return pinElement;
}

// создание и добавление меток чероз DocumentFragment
var pinFragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  pinFragment.appendChild(renderPin(offers[i]));
}
pinMap.appendChild(pinFragment);


