// Task 7
// 1. Реализовать страницу корзины:
//     Добавить возможность не только смотреть состав корзины, но и редактировать его, обновляя общую стоимость или выводя сообщение «Корзина пуста».
// 2. На странице корзины:
//     Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
//     Сделать эти поля сворачиваемыми;
//     Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого есть кнопка «Далее».
//     Если нажать ее, сворачивается «Состав корзины» и открывается «Адрес доставки» и так далее.

'use strict'

// const containerDiv = document.querySelector('.container');
const catalogDiv = document.querySelector('.catalog');
const basketDiv = document.querySelector('.basket');
const modalDiv = document.querySelector('.modal');

class Product {
    constructor(name, price, quantity, image = '', currency = 'RUB') {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
        this.currency = currency;
    }
}


class Catalog {
    constructor(items) {
        this.items = items;
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
        if (event.target.classList.contains('btn-add') && shop.items[event.target.dataset.id].quantity !== 0) {
            this.addGood(event.target.dataset.id);
            // console.log('previousSibling', event.target.previousSibling);
            event.target.previousSibling.innerHTML = `<b>Кол-во:</b> ${--shop.items[event.target.dataset.id].quantity}`;
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

        if (event.target.classList.contains('image')) {
            this.addModal();
        }

        if (event.target.classList.contains('btn-modal-close') || event.target.classList.contains('modal')) {
            this.closeModal();
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
    showGoods() {
        for (let i = 0; i < this.items.length; i++) {
            const containerCard = document.createElement('div');
            containerCard.dataset.id = `${i}`;
            containerCard.className = 'card';

            const nameCard = document.createElement('p');
            nameCard.innerHTML = `<b>Наименование:</b> ${this.items[i].name}`;
            containerCard.appendChild(nameCard);

            const imgCard = document.createElement('img');
            imgCard.className = 'image';
            imgCard.src = `${this.items[i].image}`;
            containerCard.appendChild(imgCard);

            const priceCard = document.createElement('p');
            priceCard.innerHTML = `<b>Цена:</b> ${this.items[i].price}`;
            containerCard.appendChild(priceCard);

            const countCard = document.createElement('p');
            countCard.innerHTML = `<b>Кол-во:</b> ${this.items[i].quantity}`;
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


        const basket_address = document.createElement('div');
        basket_address.className = 'basket-tab basket-address';
        basket_address.id = 'basket-address';

        const basketAddressTitle = document.createElement('h3');
        basketAddressTitle.textContent = 'Адрес доставки';
        basket_address.appendChild(basketAddressTitle);

        const basketAddressText = document.createElement('textarea');
        basketAddressText.className = 'basket-address-text';
        basketAddressText.id = 'basket-address-text';
        basketAddressText.cols = 50;
        basketAddressText.rows = 5;
        basketAddressText.placeholder = 'Введите адрес доставки';
        basket_address.appendChild(basketAddressText);

        const basketBtnNext2 = document.createElement('button');
        basketBtnNext2.textContent = 'Далее';
        basketBtnNext2.className = 'btn btn-next';
        basketBtnNext2.id = 'btn-next';

        basket_address.appendChild(basketBtnNext2);

        basketDiv.appendChild(basket_address);


        const basketComment = document.createElement('div');
        // basketComment.textContent = '';
        basketComment.className = 'basket-tab basket-comment';
        basketComment.id = 'basket-comment';
        basketComment.dataset.link = 'basket-comment';


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

        basketDiv.appendChild(basketComment);

    }

    addGood(id) {
        const tradeGoods = {
            name: shop.items[id].name,
            price: shop.items[id].price,
            quantity: 1,
        };

        if (this.checkGoods(shop.items[id].name) === false) {
            this.items.push(tradeGoods);
        } else {
            this.items[this.checkGoods(shop.items[id].name)].quantity++;
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

    basketLink(el) {
        const links = document.querySelectorAll('.basket-link');
        const link = el.getAttribute('href').slice(1);

        for (let i = 0; i < links.length; i++) {

            let linkAtr = links[i].getAttribute('href').slice(1);
            let basketAtr = document.getElementById(link).getAttribute('id');

            document.getElementById(linkAtr).style.display = (basketAtr == linkAtr) ? 'block' : 'none';
        }
    }

    nextLink(e) {
        if (e.previousElementSibling.getAttribute('id') == 'btn-clear') {
            e.parentElement.nextElementSibling.style.display = 'block';
            e.parentElement.style.display = 'none';
        } else {
            e.parentElement.style.display = 'none';
            e.parentElement.nextElementSibling.style.display = 'block';
            e.parentElement.previousElementSibling.style.display = 'none';
        }
    }

    // Модальное окно
    addModal() {
        modalDiv.innerHTML = '';
        const modalContent = document.createElement('div');
        modalContent.className = 'modal__content';
        modalContent.textContent = 'Тут должен быть слайдер';

        const modalClose = document.createElement('button');
        modalClose.className = 'btn-modal-close';
        modalClose.textContent = 'X';
        modalContent.appendChild(modalClose);

        modalDiv.className = 'modal';
        modalDiv.appendChild(modalContent);
    }

    closeModal() {
        modalDiv.className = 'modal modal-hide';
    }
}

const keyboard = new Product('Keyboard', 1250, 10, 'https://c.dns-shop.ru/thumb/st4/fit/320/250/b162eada74b2b75d159a908301802775/37ab7810c4ee7f91b21a0abf6d9741401d1c8093b3d651d71484517b929c36d0.jpg');
const mouse = new Product('Mouse', 720, 10, 'https://c.dns-shop.ru/thumb/st1/fit/190/190/f298582eb4fda0ec698a6cc435d8d1f9/8d90790d759192ab12372c552abb03107538abce9c282bb63bfa34ae023fc98a.jpg.webp');
const speaker = new Product('Speaker', 2200, 10, 'https://c.dns-shop.ru/thumb/st4/fit/190/190/05f384d5f53d7e60c05d33d853a32ad4/215a31ad152639079e3b1aa61d7615b12bdc7b5148bcbee1671e32550f8d6a7f.jpg.webp');
const monitor = new Product('Monitor', 7800, 10, 'https://c.dns-shop.ru/thumb/st1/fit/190/190/10c138b562fdf6b96402de347311a8ea/80af3c7a05eaa24919060758c1f1f4b80e0d32b29e8ee2ed33d0e11a57603a68.jpg.webp');
const flash = new Product('Flash USB', 440, 10, 'https://c.dns-shop.ru/thumb/st1/fit/190/190/f05d18d082a54ef24f9b44b8c0866918/f55ad21d2e23d53a3a37ea6964a94bedb84b325df1caf2708f36d3f4cb739b91.jpg.webp');

const items = [keyboard, mouse, speaker, monitor, flash];
const shop = new Catalog(items);

const userBasket = new Catalog([]);


shop.init();
userBasket.initBasket();
