'use strict';

window.showCard = (function () {

  // Переменные для работы с диалогом
  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('.dialog__title');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  var dialogClose = dialog.querySelector('.dialog__close');

// функция для скрытия диалога
  var removeDialog = function () {
    dialog.classList.add('hidden');
    window.pinAction.removePinActive();
  };

// Функция показа диалога и обработчики событий
  var showDialog = function (offer) {
    dialogTitle.firstElementChild.src = offer.author.avatar;
    dialogPanel.innerHTML = '';
    dialogPanel.appendChild(window.renderDialog.renderLodgeContent(offer));
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
  };

  return {
    showDialog: showDialog
  };
})();
