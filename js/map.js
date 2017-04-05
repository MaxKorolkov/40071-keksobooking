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
      "Большая уютная квартира", "Маленькая неуютная квартира",
      "Огромный прекрасный дворец", "Маленький ужасный дворец",
      "Красивый гостевой домик", "Некрасивый негостеприимный домик",
      "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"
    ],
    type: ['flat', 'house', 'bungalo'],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
  }
}

function getOfferFeatures() {
  var number = randomInteger(0, offerData.offer.features.length);
  var array = [];
  for (var i = 0; i < number; i++) {
    array[i] = offerData.offer.features.splice(randomInteger(0, offerData.offer.title.length - 1), 1).join();
  }
  return array;
}

// создание объекта объявления
function getRandomOffer() {
  return {
    author: {
      avatar: offerData.author.avatar.splice(randomInteger(0, offerData.author.avatar.length - 1), 1).join()
    },
    offer: {
      title: offerData.offer.title.splice(randomInteger(0, offerData.offer.title.length - 1), 1).join(),
      address: location.x + ', ' + location.y,
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
}

console.log(getRandomOffer());
