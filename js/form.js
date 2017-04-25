'use strict';

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
offerArrival.addEventListener('change', function () {
  offerDeparture.selectedIndex = offerArrival.selectedIndex;
});

offerDeparture.addEventListener('change', function () {
  offerArrival.selectedIndex = offerDeparture.selectedIndex;
});

// обработчик типа жилья и зависимости минимальной цены
offerPropertyType.addEventListener('change', function (event) {
  switch (event.target.value) {
    case 'flat':
      offerPrice.setAttribute('min', 1000);
      break;
    case 'shack':
      offerPrice.setAttribute('min', 0);
      break;
    case 'palace':
      offerPrice.setAttribute('min', 10000);
      break;
    default:
      offerPrice.setAttribute('min', 0);
      break;
  }
});

// Обработчки выбора количества комнат и зависимость количества гостей
offerRoomNumber.addEventListener('change', function (event) {
  switch (event.target.value) {
    case 'one-room':
      offerCapacity.selectedIndex = 1;
      break;
    case 'two-room':
    case 'hundred-rooms':
      offerCapacity.selectedIndex = 0;
      break;
    default:
      offerCapacity.selectedIndex = 0;
      break;
  }
});

// Обработчик выбора количества гостей и зависимость количества комнат
offerCapacity.addEventListener('change', function (event) {
  switch (event.target.value) {
    case 'third-guest':
      offerRoomNumber.selectedIndex = 1;
      break;
    case 'not-guest':
      offerRoomNumber.selectedIndex = 0;
      break;
    default:
      offerRoomNumber.selectedIndex = 1;
      break;
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

