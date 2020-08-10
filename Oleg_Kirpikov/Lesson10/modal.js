const stash = [];

function createModal() {
    const modalElem = document.querySelector('.modal');
    modalElem.innerHTML = '';
    const closeButton = document.createElement('a');
    closeButton.classList.add('modal__cross');
    closeButton.classList.add('js-modal-close');
    closeButton.textContent = 'Закрыть';
    modalElem.appendChild(closeButton);
    //обработчик закрытия модального окна
    closeButton.addEventListener('click', closeModal);

    return modalElem;
};

//закрытие модального окна при нажатии на кнопку Закрыть
function closeModal(event) {
    const parentModal = this.closest('.modal');
    const overlay = document.querySelector('.js-overlay-modal');
    parentModal.classList.remove('active');

    //удаляем кнопку Закрыть мы ее первую добавляли
    parentModal.removeChild(parentModal.firstChild);

    //если есть еще элемент переносим его назад в body
    while (stash.length) {
        let o = stash.pop();
        let template = document.querySelector('.template');
        template.appendChild(o.htmlObj);
        o.htmlObj.innerHTML = o.html;
        o.htmlObj.classList.add('hide');
    };
    overlay.classList.remove('active');
    let template = document.querySelector('.template');
    template.style.zIndex = '-1';


    if (shoppingCart.viewStatus != 'short') {
        shoppingCart.htmlObj = document.getElementById('basket');
        shoppingCart.viewStatus = 'short';
        shoppingCart.updateView();
    };
    event.stopPropagation();
};

function showModal(modalElem) {
    const overlay = document.querySelector('.js-overlay-modal');
    let template = document.querySelector('.template');
    template.style.zIndex = '1';
    //показать окно и отрисованную корзину
    overlay.classList.add('active');
    modalElem.classList.add('active');
}
