// Task 5-2
// Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
// Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// a. Пустая корзина должна выводить строку «Корзина пуста»;
// b. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
'use strict'

class Product {
    constructor(name, price, currency = 'RUB', quantity) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.quantity = quantity;
    }

    show() {
        return `На складе: ${this.name}, Цена: ${this.price}, Валюта: ${this.currency}, Кол-во: ${this.quantity}`;
    }
}

class Basket {
    constructor(items) {
        this.items = items;
    }

    add(items) {
        this.items.push(items);
    }

    show() {
        for (let i = 0; i < this.items.length; i++) {
            console.log(`Наименование: ${this.items[i].name}, Цена: ${this.items[i].price}, Валюта: ${this.items[i].currency}, Кол-во: ${this.items[i].quantity}`);
        }
    }

    get count() {
        let count = 0;
        for (let i = 0; i < this.items.length; i++)
            count += this.items[i].quantity;
        return count;
    }

    get countBasketPrice() {
        let ammount = 0;
        for (let i = 0; i < this.items.length; i++) {
            ammount += this.items[i].price * this.items[i].quantity;
        }
        return ammount;
    }
}

// userBasket.show();
// console.log(`Общая стоимость товаров в корзине: ${userBasket.countBasketPrice}`);

const keyboard = new Product("Keyboard", 1250, "RUB", 10);
const mouse = new Product("Mouse", 720, "RUB", 10);
const speaker = new Product("Speaker", 2200, "RUB", 10);
const monitor = new Product("Monitor", 7800, "RUB", 10);
const flash = new Product("Flash USB", 440, "RUB", 10);
// console.log(keyboard.show());

const products = [keyboard, mouse, speaker, monitor, flash];

const container = document.querySelector('.container');
const basket = document.querySelector('.basket');
const catalog = document.querySelector('.catalog');

let userBasket = new Basket([]);

function showGood(items) {
    console.log(items.name);

    const containerCard = document.createElement('div');
    containerCard.className = 'card';

    const nameCard = document.createElement('p');
    nameCard.innerHTML = `<b>Наименование:</b> ${items.name}`;
    containerCard.appendChild(nameCard);

    const priceCard = document.createElement('p');
    priceCard.innerHTML = `<b>Цена:</b> ${items.price}`;
    containerCard.appendChild(priceCard);

    const countCard = document.createElement('p');
    countCard.innerHTML = `<b>Кол-во:</b> ${items.quantity}`;
    containerCard.appendChild(countCard);

    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'добавить';
    btnAdd.className = 'btn btn-add';
    btnAdd.addEventListener('click', function () {
        const basket = document.querySelector('.basket');
        if (items.quantity <= 0) {
            return;
        }
        console.log('userBasket: ', userBasket);
        userBasket.add(new Product(items.name, items.price, undefined, 1));
        countCard.innerHTML = `<b>Кол-во:</b> ${--items.quantity}`;
        basket.textContent = `В корзине: ${userBasket.count} товаров на сумму ${userBasket.countBasketPrice} рублей`;
        basket.classList.remove('basket-empty');
    });
    containerCard.appendChild(btnAdd);

    catalog.appendChild(containerCard);
}

function createBasket() {
    clearBasket();
    // basket.textContent = 'Корзина пуста';
    // basket.classList.add('basket-empty');
    for (let i = 0; i < products.length; i++) {
        showGood(products[i]);
    }

    const btnClear = document.createElement('button');
    btnClear.className = 'btn btn-clear';
    btnClear.textContent = 'Очистить';
    btnClear.addEventListener('click', function () {
        clearBasket();
    });
    container.appendChild(btnClear);
}

function clearBasket() {
    userBasket = new Basket([]);
    basket.textContent = 'Корзина пуста';
    basket.classList.add('basket-empty');
    for (let i = 0; i < products.length; i++) {
        products[i].quantity = 10;
    }
}

createBasket();
