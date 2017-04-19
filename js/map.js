'use strict';

// Функция возвращения случайного числа
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// Возвращение случайного элемента из массива
function randomArrayElement(array) {
  return array[randomInteger(0, array.length - 1)];
}

// объект с данными для подстановки в getRandomOffer
var offerData = {
  author: {
    avatar: [
      'img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png',
      'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'
    ]
  },
  offer: {
    title: [
      'Большая уютная квартира', 'Маленькая неуютная квартира',
      'Огромный прекрасный дворец', 'Маленький ужасный дворец',
      'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'
    ],
    type: ['flat', 'house', 'bungalo'],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  }
};

/* Функция выдающая случайное значение из массива и удаляющее его.
 Используется для заполнения объявлений уникальными значениями
 join используется для приведения значения к строке*/
function getUniqueValues(array) {
  return array.splice(randomInteger(0, array.length - 1), 1).join();
}

// функция для случайного заполнения свойства features в объявлении
function getOfferFeatures() {
  var number = randomInteger(0, offerData.offer.features.length);
  var array = [];
  var features = offerData.offer.features.slice();
  if (number) {
    for (var i = 0; i < number; i++) {
      array[i] = getUniqueValues(features);
    }
  }
  return array;
}

// создание объекта объявления
function getRandomOffer() {
  var object = {
    author: {
      avatar: getUniqueValues(offerData.author.avatar)
    },
    offer: {
      title: getUniqueValues(offerData.offer.title),
      price: randomInteger(1000, 1000000),
      type: randomArrayElement(offerData.offer.type),
      rooms: randomInteger(1, 5),
      guests: randomInteger(1, 10),
      checkin: randomArrayElement(offerData.offer.checkin),
      checkout: randomArrayElement(offerData.offer.checkout),
      features: getOfferFeatures(),
      description: '',
      photos: []
    },
    location: {
      x: randomInteger(300, 900),
      y: randomInteger(100, 500)
    }
  };
  object.offer.address = object.location.x + ', ' + object.location.y;
  return object;
}

// заполнение массива объявлений
function getOffersArray(number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array.push(getRandomOffer());
  }
  return array;
}

// объявление массива объявлений и заполнение через функцию с количеством эллементов;
var offers = getOffersArray(8);

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


// Функция для возвращения локализованного типа квартиры
function switchType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return '';
  }
}

// Функция для генерации элементов удобств
function lodgeFeatures(array) {
  var codeFeatures = '';
  for (i = 0; i < array.length; i++) {
    codeFeatures += '<span class="feature__image feature__image--' + array[i] + '"></span>';
  }
  return codeFeatures;
}

// рендер данных для подстановки в объявление
function renderLodgeContent(object) {
  var lodge = document.querySelector('#lodge-template').content.cloneNode(true);
  lodge.querySelector('.lodge__title').textContent = object.offer.title;
  lodge.querySelector('.lodge__address').textContent = object.offer.address;
  lodge.querySelector('.lodge__type').textContent = switchType(object.offer.type);
  lodge.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + object.offer.guests
    + ' гостей в ' + object.offer.rooms + ' комнатах';
  lodge.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + object.offer.checkin
    + ', выезд до ' + object.offer.checkout;
  lodge.querySelector('.lodge__features').innerHTML = lodgeFeatures(object.offer.features);
  lodge.querySelector('.lodge__description').textContent = object.offer.description;
  return lodge;
}

// Переменные для работы с диалогом
var dialog = document.querySelector('.dialog');
var dialogTitle = dialog.querySelector('.dialog__title');
var dialogPanel = dialog.querySelector('.dialog__panel');
var dialogClose = dialog.querySelector('.dialog__close');

// функция для скрытия диалога
function removeDialog() {
  dialog.classList.add('hidden');
  removePinActive();
}

// Функция показа диалога и обработчики событий
function showDialog(offer) {
  dialogTitle.firstElementChild.src = offer.author.avatar;
  dialogPanel.innerHTML = '';
  dialogPanel.appendChild(renderLodgeContent(offer));
  dialog.classList.remove('hidden');
  dialogClose.addEventListener('click', removeDialog);

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      removeDialog();
    }
  });
  dialogClose.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      removeDialog();
    }
  });
}

// Переменные для формы
var addOfferForm = document.forms.addOfferForm;
var offerArrival = addOfferForm.querySelector('#time');
var offerDeparture = addOfferForm.querySelector('#timeout');
var offerPrice = addOfferForm.querySelector('#price');
var offerPropertyType = addOfferForm.querySelector('#type');
var offerRoomNumber = addOfferForm.querySelector('#room_number');
var offerCapacity = addOfferForm.querySelector('#capacity');
var offerSubmit = addOfferForm.querySelector('.form__submit');

// обработчики для добавления зависимости между временем заезда и выезда
offerArrival.addEventListener('change', function (event) {
  offerDeparture.selectedIndex = event.target.value;
});

offerDeparture.addEventListener('change', function (event) {
  offerArrival.selectedIndex = event.target.value;
});

// обработчик типа жилья и зависимости минимальной цены
offerPropertyType.addEventListener('change', function (event) {
  switch (event.target.value) {
    case '0':
      offerPrice.setAttribute('min', 1000);
      break;
    case '1':
      offerPrice.setAttribute('min', 0);
      break;
    case '2':
      offerPrice.setAttribute('min', 10000);
      break;
    default:
      offerPrice.setAttribute('min', 0);
      break;
  }
});

// Обработчки выбора количества комнат и зависимость количества гостей
offerRoomNumber.addEventListener('change', function (event) {
  if (parseInt(event.target.value, 10)) {
    offerCapacity.selectedIndex = 0;
  } else {
    offerCapacity.selectedIndex = 1;
  }
});

// Обработчик выбора количества гостей и зависимость количества комнат
offerCapacity.addEventListener('change', function (event) {
  if (parseInt(event.target.value, 10)) {
    offerRoomNumber.selectedIndex = 0;
  } else {
    offerRoomNumber.selectedIndex = 1;
  }
});

// Обработка валидации формы при нажатии на кнопку Опубликовать
offerSubmit.addEventListener('click', function () {
  for (i = 0; i < addOfferForm.elements.length; i++) {
    addOfferForm.elements[i].style.borderColor = '#d9d9d3';
    if (!addOfferForm.elements[i].checkValidity()) {
      addOfferForm.elements[i].style.borderColor = 'red';
    }
  }
});

