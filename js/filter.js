'use strict';

// Модуль для фильтрации меток
(function () {
  // Переменные для фильтров
  var filterType = document.querySelector('#housing_type');
  var filterPrice = document.querySelector('#housing_price');
  var filterRoomNumber = document.querySelector('#housing_room-number');
  var filterGuestNumber = document.querySelector('#housing_guests-number');
  var filterHouseFeatures = document.querySelectorAll('input[name=feature]');

  // Функция, применяющая фмльтры и дающая команду на отрисовку
  window.filterOffer = function (data) {
    // Фильтр - тип жилья
    data = data.filter(function (element) {
      if (filterType.value !== 'any') {
        return element.offer.type === filterType.value;
      }
      return data;
    });

    // Фильтр - цена
    data = data.filter(function (element) {
      switch (filterPrice.value) {
        case 'any':
          return true;
        case 'middle':
          return (element.offer.price >= 10000) && (element.offer.price <= 50000);
        case 'low':
          return element.offer.price < 10000;
        case 'high':
          return element.offer.price > 50000;
        default:
          return (element.offer.price >= 10000) && (element.offer.price <= 50000);
      }
    });

    // Фильтр - количество комнат
    data = data.filter(function (element) {
      if (filterRoomNumber.value !== 'any') {
        return element.offer.rooms === +filterRoomNumber.value;
      }
      return data;
    });

    // Фильтр - количество гостей
    data = data.filter(function (element) {
      if (filterGuestNumber.value !== 'any') {
        return element.offer.guests === +filterGuestNumber.value;
      }
      return data;
    });

    // Фильтр - чекбоксы с удобствами
    filterHouseFeatures.forEach(function (feature) {
      if (feature.checked) {
        data = data.filter(function (element) {
          return element.offer.features.indexOf(feature.value) !== -1;
        });
      }
    });

    // Удаление старой выборки и добавление новой
    var oldAllPins = document.querySelectorAll('.pin:not(.pin__main)');
    oldAllPins.forEach(function (pinItem) {
      pinItem.remove();
    });
    window.renderPinOffer(data);
  };

  // Функция для добавления обработчика вызова фильра и применение debounce функции для устранения эффекта дрожания
  var addListenerFilter = function (filter, data) {
    filter.addEventListener('change', function () {
      window.debounce(function () {
        window.filterOffer(data);
      });
    });
  };

  // Добавление обработчиков к полям фильтра
  window.addEventFilters = function (data) {
    addListenerFilter(filterType, data);
    addListenerFilter(filterPrice, data);
    addListenerFilter(filterRoomNumber, data);
    addListenerFilter(filterGuestNumber, data);
    filterHouseFeatures.forEach(function (element) {
      addListenerFilter(element, data);
    });
  };

})();
