'use strict';

// Модуль для зазгрузки данных с сервера
(function () {
  window.load = function (URL, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    // Таймаут для запроса
    var URL_TIMEOUT = 10000;

    xhr.timeout = URL_TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };
})();
