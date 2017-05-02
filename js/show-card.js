'use strict';

// Глобальный объект для показа карточки объявления
window.showDialog = (function () {
  // Константы
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  // Переменные для работы с диалогом
  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('.dialog__title');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  var dialogClose = dialog.querySelector('.dialog__close');

  // Функция для скрытия диалога
  var onDialogClose = function () {
    dialog.classList.add('hidden');
    window.pinAction.removePinActive();
    document.removeEventListener('click', onDialogClose);
  };

  // Функция обработки нажатие ESC при открытом диалоге
  var onDocumentEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      onDialogClose();
      document.removeEventListener('keydown', onDocumentEscPress);
    }
  };

  // Функция обработки нажатия Enter при фокусе на иконке закрытия диалога
  var onDialogFocusEnter = function (evt) {
    if (event.keyCode === ENTER_KEY_CODE) {
      onDialogClose();
      dialogClose.removeEventListener('keydown', onDialogFocusEnter);
    }
  };

  // Функция показа диалога и обработчики событий
  var showDialogCard = function (offer) {
    dialogTitle.firstElementChild.src = offer.author.avatar;
    dialogPanel.innerHTML = '';
    dialogPanel.appendChild(window.renderDialog.renderLodgeContent(offer));
    dialog.classList.remove('hidden');
    dialogClose.addEventListener('click', onDialogClose);
    document.addEventListener('keydown', onDocumentEscPress);
    dialogClose.addEventListener('keydown', onDialogFocusEnter);
  };

  return {
    showDialogCard: showDialogCard
  };
})();
