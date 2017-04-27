'use strict';

// обработчики полей ничего не возвращают, но вызываются в IIFE
(function () {

  // Переменные для формы
  var addOfferForm = document.forms.addOfferForm;
  var offerArrival = addOfferForm.querySelector('#time');
  var offerDeparture = addOfferForm.querySelector('#timeout');
  var offerPrice = addOfferForm.querySelector('#price');
  var offerPropertyType = addOfferForm.querySelector('#type');
  var offerRoomNumber = addOfferForm.querySelector('#room_number');
  var offerCapacity = addOfferForm.querySelector('#capacity');
  var offerSubmit = addOfferForm.querySelector('.form__submit');

  // функция для синхронизации элементов в форме
  var syncValues = function (element, value) {
    element.value = value;
  };
  window.synchronizeFields(offerArrival, offerDeparture, syncValues);


  // синхронизация типа жилья и зависимости минимальной цены
  var syncTypeRoomPrice = function (element, value) {
    switch (value) {
      case 'flat':
        element.setAttribute('min', 1000);
        break;
      case 'shack':
        element.setAttribute('min', 0);
        break;
      case 'palace':
        element.setAttribute('min', 10000);
        break;
      default:
        offerPrice.setAttribute('min', 0);
        break;
    }
  };
  window.synchronizeFields(offerPropertyType, offerPrice, syncTypeRoomPrice);

  // синхронизация количества комнат и количества гостей
  var syncPropertyRoom = function (element, value) {
    switch (value) {
      case 'one-room':
        element.selectedIndex = 1;
        break;
      case 'two-room':
      case 'hundred-rooms':
        element.selectedIndex = 0;
        break;
      case 'third-guest':
        element.selectedIndex = 1;
        break;
      case 'not-guest':
        element.selectedIndex = 0;
        break;
      default:
        element.selectedIndex = 0;
        break;
    }
  };
  window.synchronizeFields(offerRoomNumber, offerCapacity, syncPropertyRoom);

// Обработка валидации формы при нажатии на кнопку опубликовать
  offerSubmit.addEventListener('click', function () {
    for (var i = 0; i < addOfferForm.elements.length; i++) {
      addOfferForm.elements[i].style.borderColor = '#d9d9d3';
      if (!addOfferForm.elements[i].checkValidity()) {
        addOfferForm.elements[i].style.borderColor = 'red';
      }
    }
  });
})();


