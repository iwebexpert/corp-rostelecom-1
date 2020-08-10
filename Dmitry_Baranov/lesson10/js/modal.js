'use strict';

class Modal {
    constructor() {
        // this.imgArr = [];
        this.curImg = '';
    }

    // Модальное окно
    addModal(e) {
        modalDiv.innerHTML = '';
        const modalContent = document.createElement('div');
        modalContent.className = 'modal__content';
        modalContent.id = 'modal__content';

        const btnPrev = document.createElement('button');
        btnPrev.textContent = 'prev';
        btnPrev.className = 'btn btn-modal-prev';
        modalContent.appendChild(btnPrev);

        const btnNext = document.createElement('button');
        btnNext.textContent = 'next';
        btnNext.className = 'btn btn-modal-next';
        modalContent.appendChild(btnNext);

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
        // console.log(el);
        const imgModalWrap = document.getElementById('modal__content');

        const imgModal = document.createElement('img');
        imgModal.className = 'image-modal';
        imgModal.id = 'image-modal';
        imgModal.src = el.getAttribute('src');
        imgModalWrap.appendChild(imgModal);
        // this.imgArr = el.parentElement.childNodes;
        this.curImg = el;
    }

    imgPrev() {
        if (this.curImg.previousSibling) {
            this.addModal(this.curImg.previousSibling);
        } else {
            this.addModal(this.curImg.parentElement.lastChild);
        }
    }

    imgNext() {
        console.log(this.curImg.nextSibling);
        if (this.curImg.nextSibling) {
            this.addModal(this.curImg.nextSibling);
        } else {
            this.addModal(this.curImg.parentElement.firstChild);
        }
    }
}
