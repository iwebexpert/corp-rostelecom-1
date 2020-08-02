'use strict';

class Modal {
    constructor() {
    }

    // Модальное окно
    addModal(e) {
        modalDiv.innerHTML = '';
        const modalContent = document.createElement('div');
        modalContent.className = 'modal__content';
        modalContent.id = 'modal__content';

        const modalClose = document.createElement('button');
        modalClose.className = 'btn-modal-close';
        modalClose.textContent = 'X';
        modalContent.appendChild(modalClose);

        modalDiv.className = 'modal';
        modalDiv.appendChild(modalContent);

        this.showImg(e)
    }

    closeModal() {
        modalDiv.className = 'modal modal-hide';
    }

    showImg(el) {
        const imgModalWrap = document.getElementById('modal__content');

        const imgModal = document.createElement('img');
        imgModal.className = 'image-modal';
        imgModal.src = el.getAttribute('src');
        imgModalWrap.appendChild(imgModal);

    }
}
