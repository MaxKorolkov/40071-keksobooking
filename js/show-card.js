'use strict';

// Глобальный объект для показа карточки объявления
window.showDialog = (function () {

  // Переменные для работы с диалогом
  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('.dialog__title');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  var dialogClose = dialog.querySelector('.dialog__close');

  // Функция для скрытия диалога
  var removeDialog = function () {
    dialog.classList.add('hidden');
    window.pinAction.removePinActive();
  };

  // Функция показа диалога и обработчики событий
  var showDialogCard = function (offer) {
    dialogTitle.firstElementChild.src = offer.author.avatar;
    dialogPanel.innerHTML = '';
    dialogPanel.appendChild(window.renderDialog.renderLodgeContent(offer));
    dialog.classList.remove('hidden');
    dialogClose.addEventListener('click', removeDialog);

    var ESC_KEY_CODE = 27;
    var ENTER_KEY_CODE = 13;

    document.addEventListener('keydown', function (event) {
      if (event.keyCode === ESC_KEY_CODE) {
        removeDialog();
      }
    });

    dialogClose.addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        removeDialog();
      }
    });
  };

  return {
    showDialogCard: showDialogCard
  };
})();
