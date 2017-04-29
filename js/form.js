'use strict';

// Глобальный объект для работы с формой создаваемого проекта
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

  // функция для синхронизации минимального значенияч
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  // синхронизация времени заезда и выезда
  offerArrival.addEventListener('change', function () {
    window.synchronizeFields(offerArrival, offerDeparture, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });
  offerDeparture.addEventListener('change', function () {
    window.synchronizeFields(offerDeparture, offerArrival, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });

  // синхронизация типа жилья и зависимости минимальной цены
  offerPropertyType.addEventListener('change', function () {
    window.synchronizeFields(offerPropertyType, offerPrice, ['flat', 'shack', 'palace'], [1000, 0, 10000], syncValueWithMin);
  });

  // синхронизация количества комнат и количества гостей
  offerRoomNumber.addEventListener('change', function () {
    window.synchronizeFields(offerRoomNumber, offerCapacity, ['one-room', 'two-rooms', 'hundred-rooms'], ['not-guest', 'third-guest', 'third-guest'], syncValues);
  });
  offerCapacity.addEventListener('change', function () {
    window.synchronizeFields(offerCapacity, offerRoomNumber, ['third-guest', 'not-guest'], ['two-rooms', 'one-room'], syncValues);
  });

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


