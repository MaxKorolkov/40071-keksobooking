'use strict';

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
