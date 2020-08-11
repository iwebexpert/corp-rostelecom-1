// Task 10
// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.

'use strict'

// const containerDiv = document.querySelector('.container');
const catalogDiv = document.querySelector('.catalog');
const basketDiv = document.querySelector('.basket');
const modalDiv = document.querySelector('.modal');

class Product {
    constructor(name, price, quantity, image = [], currency = 'RUB') {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
        this.currency = currency;
    }
}


class Catalog {
    constructor(items) {
        this.items = items || [];
    }

    init() {
        this.showGoods();
    }

    // Инициализация обработчиков событий
    initBasket() {
        window.addEventListener('click', event => this.clickHandler(event));
    }

    // Обработка клика на кнопку
    clickHandler(event) {
        event.preventDefault();
        // if (event.target.classList.contains('btn-add') && shop.items[event.target.dataset.id].quantity !== 0) {
        if (event.target.classList.contains('btn-add')) {
            this.addGood(event.target.dataset.id);
            // console.log('previousSibling', event.target.previousSibling);
            // event.target.previousSibling.innerHTML = `<b>Кол-во:</b> ${--shop.items[event.target.dataset.id].quantity}`;
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

            const countCard = document.createElement('p');
            countCard.innerHTML = `<b>Кол-во:</b> ${items[i].quantity}`;
            countCard.dataset.quantity = `quantity-${i}`;
            containerCard.appendChild(countCard);

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

// const keyboard = new Product('Keyboard', 1250, 10, ['https://c.dns-shop.ru/thumb/st4/fit/320/250/b162eada74b2b75d159a908301802775/37ab7810c4ee7f91b21a0abf6d9741401d1c8093b3d651d71484517b929c36d0.jpg', 'https://c.dns-shop.ru/thumb/st4/fit/wm/2000/2000/97109bc36d8da53d6d1273f4eea2bdad/fefb1df74f0c66ace4e281f940e92bfddbb581e76e01f365903fb72e0024cc16.jpg', 'https://c.dns-shop.ru/thumb/st4/fit/wm/2000/2000/b27f07192dad243c939c4d7230a25acc/6965a0b6c3704878432c9171da95c6ed86fb30897f589cdd4e67abe43e9c8bff.jpg']);
// const mouse = new Product('Mouse', 720, 10, ['https://c.dns-shop.ru/thumb/st1/fit/wm/2000/1500/8fe42a7ddfdfef68efc63f8b41fd8eb6/4973b10d1d26ba298b7d7dfad7cabac6671ba1b9cd54f28aec56ba18fd933b1d.jpg', 'https://c.dns-shop.ru/thumb/st1/fit/wm/2000/1727/7ea89fef88456f1738e9ebac4b616949/64371e7340681ab2575c938cf02ec9688edd530bbfc92f937ab321ed9eee976f.jpg', 'https://c.dns-shop.ru/thumb/st1/fit/wm/2000/1500/938de87a7f222338986e7035e4dfc030/87f1a9e6b02a297793241604694ebf78dec1b54f4d197c49485752bd51819e5b.jpg']);
// const speaker = new Product('Speaker', 2200, 10, ['https://c.dns-shop.ru/thumb/st4/fit/190/190/05f384d5f53d7e60c05d33d853a32ad4/215a31ad152639079e3b1aa61d7615b12bdc7b5148bcbee1671e32550f8d6a7f.jpg.webp', 'https://c.dns-shop.ru/thumb/st1/fit/wm/2000/1500/0b4e06a50aa1fe992d0b08cf73260c8f/a6bad08c831e477bbcdffaffc96195b97723403d4509430f82aafc2b5d927b4c.jpg', 'https://c.dns-shop.ru/thumb/st1/fit/wm/2000/1500/e7d94183d758c5fe4c401d68e6b3383d/469dcd10a2bc5adf18dd08cc58b009ddfd766d08524d81d1a889da4b8e394f04.jpg']);
// const monitor = new Product('Monitor', 7800, 10, ['https://c.dns-shop.ru/thumb/st1/fit/190/190/10c138b562fdf6b96402de347311a8ea/80af3c7a05eaa24919060758c1f1f4b80e0d32b29e8ee2ed33d0e11a57603a68.jpg.webp', 'https://c.dns-shop.ru/thumb/st4/fit/wm/2000/2000/d082abced587f0178259f5c1769dcb3a/022f859d3df71ffad3a553ffe97569c05f347c5bb4a735197797fd2ee4e9830b.jpg', 'https://c.dns-shop.ru/thumb/st4/fit/wm/2000/2000/3a8eb86deb5f3890e02f6b372e3a651a/1a2de033358c3a8384c314ded6cc6ebcc5468a728bfb6e44aa0abb687a344115.jpg']);
// const flash = new Product('Flash USB', 440, 10, ['https://c.dns-shop.ru/thumb/st1/fit/190/190/f05d18d082a54ef24f9b44b8c0866918/f55ad21d2e23d53a3a37ea6964a94bedb84b325df1caf2708f36d3f4cb739b91.jpg.webp', 'https://c.dns-shop.ru/thumb/st1/fit/wm/2000/2000/6bbb134d672eb9330051a471ff8951df/18ffde1e4c9630bc67d7e583aee130a0b43c01eb9d5d783e5f6f35a7726f8510.jpg', 'https://c.dns-shop.ru/thumb/st1/fit/190/190/f05d18d082a54ef24f9b44b8c0866918/f55ad21d2e23d53a3a37ea6964a94bedb84b325df1caf2708f36d3f4cb739b91.jpg.webp']);

// const items = [keyboard, mouse, speaker, monitor, flash];
// const shop = new Catalog(items);
const shop = new Catalog();

const userBasket = new Catalog();
const modal = new Modal();

shop.init();
userBasket.initBasket();

