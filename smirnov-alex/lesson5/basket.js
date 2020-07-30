class Item {
    constructor(name, price, currency, amount) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.amount = amount;
    }
}
const item1 = new Item('Keyboard', 1000, 'RUB', 1);
const item2 = new Item('Mouse', 700, 'RUB', 2);
const item3 = new Item('Videocard', 25000, 'RUB', 1);
const item4 = new Item('Monitor', 7000, 'RUB', 2);
const shop = [item1, item2, item3, item4];

let sumOfItems = 0;
let numOfItems = 0;
for (let i = 0; i < shop.length; i++) {
    numOfItems += shop[i].amount;
    sumOfItems += shop[i].amount * shop[i].price;
}
window.addEventListener('load', function () {
    let content = document.getElementById('content');
    let basket = document.createElement('div');
    if (numOfItems === 0 || sumOfItems === 0) {
        basket.className = 'basket empty-basket';
        basket.textContent = 'Корзина пуста!';
    }
    else {
        basket.className = 'basket';
        basket.textContent = 'В корзине товаров: ' + numOfItems + ', на общую сумму ' + sumOfItems + ' рублей.';
    }
    content.appendChild(basket);
    let basketClear = document.createElement('button');
    basketClear.textContent = 'Очистить корзину'
    basketClear.className = 'basketClear';
    content.appendChild(basketClear);

    let catalog = document.getElementById('catalog');
    for (let i = 0; i < shop.length; i++) {
        let block = document.createElement('div');
        block.className = 'block';
        block.innerText = shop[i].name + ' \n' + shop[i].price + ' ' + shop[i].currency;
        catalog.appendChild(block);

        let btnAdd = document.createElement('button');
        btnAdd.textContent = 'Добавить в корзину';
        btnAdd.className = 'add-' + shop[i].name;
        catalog.appendChild(btnAdd);
    }
    
});

