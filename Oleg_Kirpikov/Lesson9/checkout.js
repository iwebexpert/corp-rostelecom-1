
const stepsCheckout = ['.listBasket', '.adress_delivery', '.comment'];

// начать процедуру  оформления заказа
function checkoutBegin() {
    //переключить отрисовку корзины на подробный вид
    shoppingCart.switchToFullView();
    let modalElem = createModal();
    //сохранить певоначальное состояние шаблона
    stash.push({ htmlObj: shoppingCart.htmlObj, html: shoppingCart.htmlObj.innerHTML });
    //подробный вид корзины в модальное окно и отрисовать
    modalElem.appendChild(shoppingCart.htmlObj);
    shoppingCart.updateView();
    //копка Далее в атрибут step этап оплаты
    let btnNext = document.createElement('button');
    btnNext.classList.add('nextButton');
    btnNext.setAttribute('step', 1);
    btnNext.textContent = 'Далее >>';
    btnNext.addEventListener('click', checkoutNextStep);
    modalElem.appendChild(btnNext);

    showModal(modalElem);
    shoppingCart.htmlObj.classList.remove('hide');
};

//обработчик этапов оформления на кнопке Далее
function checkoutNextStep(event) {
    //взять контейнеры для текущего предидущего и следующего этапов
    let step = event.target.attributes.step.value;
    if (+step < stepsCheckout.length) {
        let prevStepPage = document.querySelector(stepsCheckout[+step - 1]);
        let nextStepPage = document.querySelector(stepsCheckout[+step]);

        //убрать контейнер предидущего из модального окна
        document.body.appendChild(prevStepPage);

        //добавить  контейнер след этапа в модальное окно
        stash.push({ htmlObj: nextStepPage, html: nextStepPage.innerHTML });
        const modalElem = document.querySelector('.modal');
        event.target.insertAdjacentElement('beforebegin', nextStepPage);
        event.target.setAttribute('step', +step + 1);
        //скрыть предидущий и показать следующий
        prevStepPage.classList.add('hide');
        nextStepPage.classList.remove('hide');

    } else {
        event.target.setAttribute('step', 99);
        event.target.textContent = 'Оформить заказ';
    };

};