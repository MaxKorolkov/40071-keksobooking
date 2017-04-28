'use strict';

(function () {
  var filterType = document.querySelector('#housing_type');
  var filterPrice = document.querySelector('#housing_price');
  var filterRoomNumber = document.querySelector('#housing_room-number');
  var filterGuestNumber = document.querySelector('#housing_guests-number');
  var filterHouseFeatures = document.querySelectorAll('input[name=feature]');

  window.filterOffer = function (data) {
    console.log('filter work');
    data = data.filter(function (element) {
      if (filterType.value !== 'any') {
        return element.offer.type === filterType.value;
      } else {
        return data;
      }
    });

    data = data.filter(function (element) {
      switch (filterPrice.value) {
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

    data = data.filter(function (element) {
      if (filterRoomNumber.value !== 'any') {
        return element.offer.rooms === filterRoomNumber.value;
      } else {
        return data;
      }
    });

    data = data.filter(function (element) {
      if (filterGuestNumber.value !== 'any') {
        return element.offer.guests === filterGuestNumber.value;
      } else {
        return data;
      }
    });

    filterHouseFeatures.forEach(function (feature) {
      if (feature.checked) {
        data = data.filter(function (element) {
          return element.offer.features.indexOf(feature.value) !== -1;
        });
      }
    });

    var oldAllPins = document.querySelector('.pin');
    oldAllPins.forEach(function (pinItem) {
      pinItem.remove();
    });
    window.renderPinOffer(data);
  };

  var addListenerFilter = function (filter, data) {
    filter.addEventListener('change', window.filterOffer(data));
  };

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
