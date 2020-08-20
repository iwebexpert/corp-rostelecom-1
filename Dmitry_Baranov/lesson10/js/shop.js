// Task 10
// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.

'use strict'

// const containerDiv = document.querySelector('.container');
const catalogDiv = document.querySelector('.catalog');
const basketDiv = document.querySelector('.basket');
const modalDiv = document.querySelector('.modal');


class Catalog {
    constructor(items) {
        this.items = items || [];
    }

    init() {
        this.showGoods();
        window.addEventListener('click', event => this.clickHandler(event));
    }

    // Обработка клика на кнопку
    clickHandler(event) {
        event.preventDefault();
        if (event.target.classList.contains('btn-add')) {
            this.addGood(event.target.dataset.id);
        }

        if (event.target.classList.contains('btn-minus')) {
            this.changeBasket(event.target);
        }

        if (event.target.classList.contains('btn-clear')) {
            this.clearBasket(event.target);
        }

        if (event.target.classList.contains('basket-link')) {
            this.basketLink(event.target);
        }

        if (event.target.classList.contains('btn-next')) {
            this.nextLink(event.target);
        }

        if (event.target.classList.contains('btn-finish')) {
            this.showOrder(event.target);
        }

        if (event.target.classList.contains('image')) {
            modal.addModal(event.target);
        }

        if (event.target.classList.contains('btn-modal-prev')) {
            modal.imgPrev(event.target);
        }

        if (event.target.classList.contains('btn-modal-next')) {
            modal.imgNext(event.target);
        }

        if (event.target.classList.contains('btn-modal-close') || event.target.classList.contains('modal')) {
            modal.closeModal();
        }
    }

    get count() {
        let count = 0;
        for (let i = 0; i < this.items.length; i++)
            count += this.items[i].quantity;
        return count;
    }

    get cost() {
        let sum = 0;
        for (let i = 0; i < this.items.length; i++)
            sum += this.items[i].price * this.items[i].quantity;
        return sum;
    }

    checkGoods(items) {
        for (let i = 0; i < userBasket.items.length; i++) {
            if (items === userBasket.items[i].name) {
                return i;
            }
        }
        return false;
    }


    // Вывод имеющихся товаров и создание корзины
    async showGoods() {
        let response = await fetch('/goods');
        let items = await response.json();

        for (let i = 0; i < items.length; i++) {
            const containerCard = document.createElement('div');
            containerCard.dataset.id = `${i}`;
            containerCard.className = 'card';

            const nameCard = document.createElement('p');
            nameCard.innerHTML = `<b>Наименование:</b> ${items[i].name}`;
            containerCard.appendChild(nameCard);

            const imgWrap = document.createElement('div');
            imgWrap.className = 'productListImg';
            console.log('items[i].image', items[i].image);
            for (let j = 0; j < items[i].image.length; j++) {
                const imgCard = document.createElement('img');
                imgCard.className = 'image';
                console.log('items[i].image[j]', items[i].image[j]);
                imgCard.src = `${items[i].image[j]}`;
                imgWrap.appendChild(imgCard);
            }
            containerCard.appendChild(imgWrap);

            const priceCard = document.createElement('p');
            priceCard.innerHTML = `<b>Цена:</b> ${items[i].price}`;
            containerCard.appendChild(priceCard);

            const btnAdd = document.createElement('button');
            btnAdd.textContent = 'добавить';
            btnAdd.className = 'btn btn-add';
            btnAdd.dataset.id = `${i}`;
            containerCard.appendChild(btnAdd);
            catalogDiv.appendChild(containerCard);
        }


        const basketMenu = document.createElement('div');
        basketMenu.className = 'basket-menu';

        const basketMenuLink = document.createElement('a');
        basketMenuLink.href = '#basket-items';
        basketMenuLink.textContent = 'Состав корзины';
        basketMenuLink.className = 'basket-link basket-link-items';
        basketMenuLink.id = 'basket-link-items';
        basketMenu.appendChild(basketMenuLink);

        const basketMenuAddress = document.createElement('a');
        basketMenuAddress.href = '#basket-address';
        basketMenuAddress.textContent = 'Адрес доставки';
        basketMenuAddress.className = 'basket-link basket-link-address';
        basketMenuAddress.id = 'basket-link-address';
        basketMenu.appendChild(basketMenuAddress);

        const basketMenuComment = document.createElement('a');
        basketMenuComment.href = '#basket-comment';
        basketMenuComment.textContent = 'Комментарий';
        basketMenuComment.className = 'basket-link basket-link-comment';
        basketMenuComment.id = 'basket-link-comment';
        basketMenu.appendChild(basketMenuComment);

        const basketMenuOrder = document.createElement('a');
        basketMenuOrder.href = '#basket-order';
        basketMenuOrder.textContent = 'Заказ';
        basketMenuOrder.className = 'basket-link basket-link-order';
        basketMenuOrder.id = 'basket-link-order';
        basketMenuOrder.style.display = 'none';
        basketMenu.appendChild(basketMenuOrder);

        basketDiv.appendChild(basketMenu);


        const basketWrap = document.createElement('div');
        basketWrap.className = 'basket-tab basket-wrap basket-tab-active';
        basketWrap.id = 'basket-items';

        const basketContentTitle = document.createElement('div');
        basketContentTitle.textContent = 'Корзина пуста';
        basketContentTitle.className = 'basket-empty basket-content-title';
        basketContentTitle.id = 'basket-content-title';
        basketWrap.appendChild(basketContentTitle);

        const basketContentWrap = document.createElement('div');
        basketContentWrap.className = 'basket-content-wrap';
        basketContentWrap.id = 'basket-content-wrap';
        basketWrap.appendChild(basketContentWrap);

        const basketBtnClear = document.createElement('button');
        basketBtnClear.textContent = 'Очистить корзину';
        basketBtnClear.className = 'btn btn-clear';
        basketBtnClear.id = 'btn-clear';
        basketWrap.appendChild(basketBtnClear);

        const basketBtnNext = document.createElement('button');
        basketBtnNext.textContent = 'Далее';
        basketBtnNext.className = 'btn btn-next';
        basketBtnNext.id = 'btn-next';

        basketWrap.appendChild(basketBtnNext);

        basketDiv.appendChild(basketWrap);


        const basketAddress = document.createElement('div');
        basketAddress.className = 'basket-tab basket-address';
        basketAddress.id = 'basket-address';

        const basketAddressTitle = document.createElement('h3');
        basketAddressTitle.textContent = 'Адрес доставки';
        basketAddress.appendChild(basketAddressTitle);

        const basketAddressText = document.createElement('textarea');
        basketAddressText.className = 'basket-address-text';
        basketAddressText.id = 'basket-address-text';
        basketAddressText.cols = 50;
        basketAddressText.rows = 5;
        basketAddressText.placeholder = 'Введите адрес доставки';
        basketAddress.appendChild(basketAddressText);

        const basketBtnNext2 = document.createElement('button');
        basketBtnNext2.textContent = 'Далее';
        basketBtnNext2.className = 'btn btn-next';
        basketBtnNext2.id = 'btn-next';
        basketAddress.appendChild(basketBtnNext2);

        basketDiv.appendChild(basketAddress);


        const basketComment = document.createElement('div');
        basketComment.className = 'basket-tab basket-comment';
        basketComment.id = 'basket-comment';

        const basketCommentTitle = document.createElement('h3');
        basketCommentTitle.textContent = 'Комментарий';
        basketCommentTitle.className = 'basket-comment-title';
        basketCommentTitle.id = 'basket-comment-title';
        basketComment.appendChild(basketCommentTitle);

        const basketCommentText = document.createElement('textarea');
        basketCommentText.className = 'basket-comment-text';
        basketCommentText.id = 'basket-comment-text';
        basketCommentText.cols = 50;
        basketCommentText.rows = 5;
        basketCommentText.placeholder = 'Введите комментарий'
        basketComment.appendChild(basketCommentText);

        const basketBtnNext3 = document.createElement('button');
        basketBtnNext3.textContent = 'заказать';
        basketBtnNext3.className = 'btn btn-next btn-finish';
        basketBtnNext3.id = 'btn-finish';

        basketComment.appendChild(basketBtnNext3);

        basketDiv.appendChild(basketComment);


        const basketOrder = document.createElement('div');
        basketOrder.textContent = 'Итого:';
        basketOrder.className = 'basket-tab basket-order';
        basketOrder.id = 'basket-order';

        const basketOrderContent = document.createElement('div');
        basketOrderContent.className = 'basket-order-content';
        basketOrderContent.id = 'basket-order-content';
        basketOrder.appendChild(basketOrderContent);

        basketDiv.appendChild(basketOrder);
    }

    async addGood(id) {
        let response = await fetch('/goods');
        let item = await response.json();

        const tradeGoods = {
            name: item[id].name,
            price: item[id].price,
            quantity: 1,
        };

        if (this.checkGoods(item[id].name) === false) {
            this.items.push(tradeGoods);
        } else {
            this.items[this.checkGoods(item[id].name)].quantity++;
        }
        this.showBasket();
    }

    changeBasket(el) {
        const basketId = +el.dataset.basketId;

        if (this.items[basketId].quantity === 1) {
            this.items.splice(basketId, 1);
        } else {
            this.items[basketId].quantity--;
        }
        this.showBasket();
    }

    showBasket() {
        const basketWrap = document.getElementById('basket-content-wrap');
        const basketContentTitle = document.getElementById('basket-content-title');

        basketContentTitle.innerHTML = `<b>В корзине:</b> ${this.count} товаров на сумму ${this.cost} рублей`;

        if (basketWrap != null) {
            basketWrap.innerHTML = '';
            basketContentTitle.className = 'basket-content-title';
        }

        for (let i = 0; i < this.items.length; i++) {

            const basketItemsWrap = document.createElement('div');
            basketItemsWrap.className = 'basket-items-wrap';

            const basketItems = document.createElement('p');
            basketItems.textContent = `${this.items[i].name} : ${this.items[i].quantity}`;
            basketItems.className = 'basket-items';
            basketItemsWrap.appendChild(basketItems);

            const basketItemsBtn = document.createElement('button');
            basketItemsBtn.textContent = '-';
            basketItemsBtn.className = 'btn btn-minus';
            basketItemsBtn.dataset.basketId = `${i}`;
            basketItemsWrap.appendChild(basketItemsBtn);

            basketWrap.appendChild(basketItemsWrap);
        }

        if (!this.items.length) {
            basketContentTitle.className = 'basket-empty';
            basketContentTitle.textContent = 'Корзина пуста';
        }
    }

    clearBasket() {
        this.items = [];
        this.showBasket();
    }

    basketLocalStorage() {
        if (document.getElementById('basket-address-text')) {
            localStorage.address = document.getElementById('basket-address-text').value;
        }
        if (document.getElementById('basket-comment-text')) {
            localStorage.comment = document.getElementById('basket-comment-text').value;
        }
    }

    basketLink(el) {
        const links = document.querySelectorAll('.basket-link');
        const link = el.getAttribute('href').slice(1);

        for (let i = 0; i < links.length; i++) {

            let linkAtr = links[i].getAttribute('href').slice(1);
            let basketAtr = document.getElementById(link).getAttribute('id');

            document.getElementById(linkAtr).style.display = (basketAtr == linkAtr) ? 'block' : 'none';

            this.basketLocalStorage();
        }
    }

    nextLink(e) {
        this.basketLocalStorage();

        if (e.previousElementSibling.getAttribute('id') == 'btn-clear') {
            e.parentElement.nextElementSibling.style.display = 'block';
            e.parentElement.style.display = 'none';
        } else {
            e.parentElement.style.display = 'none';
            e.parentElement.nextElementSibling.style.display = 'block';
            e.parentElement.previousElementSibling.style.display = 'none';
        }
    }

    showOrder() {
        const order = document.getElementById('basket-order');
        order.innerHTML = `<p><b>В корзине:</b> ${this.count} товаров <b>на сумму</b> ${this.cost} рублей</p><p><b>Адрес доставки:</b> ${localStorage.address}</p><p><b>Комментарий:</b> ${localStorage.comment}</p>`;
    }
}

const userBasket = new Catalog();
const modal = new Modal();

userBasket.init();
