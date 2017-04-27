'use strict';

window.synchronizeFields = function (field1, field2, callback) {

  field1.addEventListener('change', function () {
    if (typeof callback === 'function') {
      callback(field2, field1.value);
    }
  });

  field2.addEventListener('change', function () {
    if (typeof callback === 'function') {
      callback(field1, field2.value);
    }
  });
};
