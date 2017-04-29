'use strict';

// Глобальный объект для синхронизации полей
window.synchronizeFields = function (field1, field2, array1, array2, callback) {
  if (typeof callback === 'function') {
    callback(field2, array2[array1.indexOf(field1.value)]);
  }
};
