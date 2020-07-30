//Задание 1
const chessTable = document.querySelector(".chess-table");

const chessBoard = document.createElement("div");
chessBoard.className = "chess-board";

const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const nums = [1, 2, 3, 4, 5, 6, 7, 8];

for (let i = 0; i < 8; i++) {

    const line = document.createElement('div');

    for (let j = 0; j < 8; j++) {
        const cell = document.createElement('div');
        if (i % 2 == j % 2) {
            cell.className = "chess-board__white";
            cell.textContent = `${chars[j]}${nums[i]}`;

        } else {
            cell.className = "chess-board__black";
            cell.textContent = `${chars[j]}${nums[i]}`;


        };
        line.appendChild(cell);
    };
    chessBoard.appendChild(line);
};
chessTable.appendChild(chessBoard);

//Задание 2

class Item {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    };
};

class Basket {
    constructor(items) {
        this.items = items;
    };

    add(items) {
        this.items.push(items);
    };

    get countQuantity() {
        let quantity = 0;
        for (let i = 0; i < this.items.length; i++)
            quantity += this.items[i].quantity;
        return quantity;
    };

    get countBasketPrice() {
        let ammount = 0;
        for (let i = 0; i < this.items.length; i++) {
            ammount += this.items[i].price * this.items[i].quantity;
        }
        return ammount;
    };
};

const shop = document.querySelector('.shop');
const shopcatalog = document.querySelector('.shop__catalog');
const shopBasket = document.querySelector('.shop__basket');

const potato = new Item("Картошка", 30, 0);
const carrot = new Item("Морковка", 20, 0);
const egg = new Item("Яйца", 70, 0);
const peas = new Item("Горошек", 60, 0);


const products = [potato, carrot, egg, peas];

let basket = new Basket([]);

function shopItemsList(items) {

    const shopList = document.createElement('div');
    shopList.className = 'shop__list';

    const itemName = document.createElement('div');
    itemName.textContent = `Наименование: ${items.name}`;
    shopList.appendChild(itemName);

    const itemPrice = document.createElement('div');
    itemPrice.textContent = `Цена: ${items.price} рублей`;
    shopList.appendChild(itemPrice);

    const itemQuantity = document.createElement('div');
    itemQuantity.textContent = `Кол-во: ${items.quantity}`;
    shopList.appendChild(itemQuantity);

    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Добавить в корзину';
    btnAdd.className = 'btn btn__add';

    btnAdd.addEventListener('click', function () {

        basket.add(new Item(items.name, items.price, 1));
        itemQuantity.textContent = `Кол-во: ${items.quantity++}`;
        shopBasket.textContent = `В корзину добавлено: ${basket.countQuantity} товаров. 
        Общая сумма: ${basket.countBasketPrice} рублей`;
        shopBasket.classList.remove('basket-empty');
    });
    shopList.appendChild(btnAdd);

    shopcatalog.appendChild(shopList);
};

function userBasket() {
    clearBasket();
    shopBasket.textContent = 'Ваша корзина пуста';
    for (let i = 0; i < products.length; i++) {
        shopItemsList(products[i]);
    }

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn__delete';
    btnDelete.textContent = 'Очистить корзину';
    shop.appendChild(btnDelete);


    btnDelete.addEventListener('click', function () {
        clearBasket();
    });
}

function clearBasket() {
    basket = new Basket([]);
    shopBasket.textContent = 'Ваша корзина пуста';

    for (let i = 0; i < products.length; i++) {
        products[i].quantity = 1;
    }
}

userBasket();
