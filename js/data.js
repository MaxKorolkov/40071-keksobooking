'use strict';

// Модуль - IIFE функция для зазрузки данных по сети и дальнейшей обработки.
(function () {
  // Адрес для загрузки данных
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  // Функция возвращения случайного числа
  var randomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  // Функция выдающая случайное значение из массива и удаляющее его.
  var getUniqueValues = function getUniqueValues(array) {
    return array.splice(randomInteger(0, array.length - 1), 1);
  };

  // Функция для возврата массива трех случайных элемнтов из массива
  var getThreeRandomElements = function (array) {
    var copyArray = array.slice();
    var threeElementsArray = [];
    for (var i = 0; i <= 2; i++) {
      threeElementsArray.push(getUniqueValues(copyArray)[0]);
    }
    return threeElementsArray;
  };

  // Функция для обработки положительного ответа сервёра
  var successHandler = function (offers) {
    window.renderPinOffer(getThreeRandomElements(offers));
    window.addEventFilters(offers);
  };

  // Функция для обработки отрицательного ответа сервера
  var errorHandler = function (errorMessage) {
    var error = document.createElement('div');
    error.setAttribute('class', 'error-message');
    error.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  window.load(URL, successHandler, errorHandler);
})();
