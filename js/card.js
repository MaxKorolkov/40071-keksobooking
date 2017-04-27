'use strict';

// глобальный объект для создания диалога
window.renderDialog = (function () {
  // Функция для возвращения локализованного типа квартиры
  var switchType = function (type) {
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
  };

// Функция для генерации элементов удобств
  var lodgeFeatures = function (array) {
    var codeFeatures = '';
    for (var i = 0; i < array.length; i++) {
      codeFeatures += '<span class="feature__image feature__image--' + array[i] + '"></span>';
    }
    return codeFeatures;
  };

// рендер данных для подстановки в объявление
  var renderLodgeContent = function (object) {
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
  };

  return {
    renderLodgeContent: renderLodgeContent
    /*    dialog: dialog,
     dialogTitle: dialogTitle,
     dialogPanel: dialogPanel,
     dialogClose: dialogClose*/
  };
})();


