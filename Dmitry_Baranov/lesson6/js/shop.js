// Task 6-1
// 1. Продолжаем реализовывать модуль корзины:
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.

// 2. * У товара может быть несколько изображений. Нужно:
// a. Реализовать функционал показа полноразмерных картинок товара в модальном окне;
// b. Реализовать функционал перехода между картинками внутри модального окна.

'use strict'

const containerDiv = document.querySelector('.container');
const basketDiv = document.querySelector('.basket');
const catalogDiv = document.querySelector('.catalog');
const modalDiv = document.querySelector('.modal');

class Product {
    constructor(name, price, quantity, image = '', currency = 'RUB') {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
        this.currency = currency;
    }

    show() {
        return `На складе: ${this.name}, Цена: ${this.price}, Валюта: ${this.currency}, Кол-во: ${this.quantity}`;
    }
}


class Catalog {
    constructor(items) {
        this.items = items;
        this.items = [];
        this.sum = 0;
    }

    init() {
        this.showGoods();
        this.initHandlers();
    }

    // Инициализация обработчиков событий
    initHandlers() {
        catalogDiv.addEventListener('click', event => this.clickHandler(event));
    }

    // Обработка клика на кнопку
    clickHandler(event) {
        if (event.target.classList.contains('btn-add') && this.items[event.target.dataset.id].quantity !== 0) {
            this.addGood(event.target.dataset.id);
            // console.log('previousSibling', event.target.previousSibling);
            event.target.previousSibling.innerHTML = `<b>Кол-во:</b> ${--this.items[event.target.dataset.id].quantity}`;
        }
        if (event.target.classList.contains('btn-modal')) {
            this.addModal();
        }
    }

    // Вывод имеющихся товаров
    showGoods() {
        basketDiv.textContent = 'Корзина пуста';
        basketDiv.classList.add('basket-empty');

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

        const modalBtn = document.createElement('button');
        modalBtn.textContent = 'Купить';
        modalBtn.className = 'btn btn-modal';
        catalogDiv.appendChild(modalBtn);
    }

    addGood(id) {
        const tradeGoods = {
            name: this.items[id].name,
            price: this.items[id].price,
            quantity: 1,
        };
        this.items.push(tradeGoods);
        this.sum += this.items[id].price;
        basketDiv.textContent = `В корзине: ${this.items.length} товаров на сумму ${this.sum} рублей`;
        basketDiv.classList.remove('basket-empty');
    }

    // Модальное окно
    addModal() {
        let totalSum = 0;
        const modalItems = document.createElement('div');
        modalItems.textContent = 'Корзина:';
        modalItems.className = 'modal__items';
        for (let i = 0; i < this.items.length; i++) {
            const modalItemsName = document.createElement('p');
            modalItemsName.innerHTML = `<b>Наименование:</b> ${this.items[i].name}`;
            modalItems.appendChild(modalItemsName);

            const modalItemsPrice = document.createElement('p');
            modalItemsPrice.innerHTML = `<b>Цена:</b> ${this.items[i].price}`;
            modalItems.appendChild(modalItemsPrice);

            totalSum+= this.items[i].price;
        }
        const modalTotalCoast = document.createElement('p')
        modalTotalCoast.innerHTML = `<b> Полная стоимость корзины:</b> ${totalSum}`;
        modalItems.appendChild(modalTotalCoast);
        modalDiv.className = 'modal';

        modalDiv.appendChild(modalItems);
    }
}

const keyboard = new Product("Keyboard", 1250, 10, 'https://c.dns-shop.ru/thumb/st4/fit/320/250/b162eada74b2b75d159a908301802775/37ab7810c4ee7f91b21a0abf6d9741401d1c8093b3d651d71484517b929c36d0.jpg');
const mouse = new Product("Mouse", 720, 10, 'https://c.dns-shop.ru/thumb/st1/fit/190/190/f298582eb4fda0ec698a6cc435d8d1f9/8d90790d759192ab12372c552abb03107538abce9c282bb63bfa34ae023fc98a.jpg.webp');
const speaker = new Product("Speaker", 2200, 10, 'https://c.dns-shop.ru/thumb/st4/fit/190/190/05f384d5f53d7e60c05d33d853a32ad4/215a31ad152639079e3b1aa61d7615b12bdc7b5148bcbee1671e32550f8d6a7f.jpg.webp');
const monitor = new Product("Monitor", 7800, 10, 'https://c.dns-shop.ru/thumb/st1/fit/190/190/10c138b562fdf6b96402de347311a8ea/80af3c7a05eaa24919060758c1f1f4b80e0d32b29e8ee2ed33d0e11a57603a68.jpg.webp');
const flash = new Product("Flash USB", 440, 10, 'https://c.dns-shop.ru/thumb/st1/fit/190/190/f05d18d082a54ef24f9b44b8c0866918/f55ad21d2e23d53a3a37ea6964a94bedb84b325df1caf2708f36d3f4cb739b91.jpg.webp');
// console.log(keyboard.show());

const items = [keyboard, mouse, speaker, monitor, flash];
const shop = new Catalog(items);

// const userBasket = new Catalog([]);
// const userBasket = [];

shop.init();
