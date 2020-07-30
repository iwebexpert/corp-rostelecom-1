class Item {
    constructor(name, price, currency) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        
    }
}
class Basket {
    constructor(numOfItems, sumOfItems) {
        this.numOfItems = numOfItems;
        this.sumOfItems = sumOfItems;
    }
}

const item1 = new Item('Keyboard', 1000, 'RUB');
const item2 = new Item('Mouse', 700, 'RUB');
const item3 = new Item('Videocard', 25000, 'RUB');
const item4 = new Item('Monitor', 7000, 'RUB');
const shop = [item1, item2, item3, item4];
const basket1 = new Basket(0, 0);

window.addEventListener('DOMContentLoaded', function () {
    let content = document.getElementById('content');
    let basket = document.createElement('div');
    basket.className = 'basket';
    if (basket1.numOfItems === 0 || basket1.sumOfItems === 0) {
        basket.textContent = 'Корзина пуста!';
    }
    else {
        basket.textContent = 'В корзине товаров: ' + basket1.numOfItems + ', на общую сумму ' + basket1.sumOfItems + ' рублей.';
    }
    content.appendChild(basket);

    let listOfItems= document.createElement('div');
    listOfItems.className = 'listOfItems';
    listOfItems.innerText = 'Список товаров: ' + ' \n';
    content.appendChild(listOfItems);

    let basketClear = document.createElement('button');
    basketClear.textContent = 'Очистить корзину'
    basketClear.className = 'basketClear';
    content.appendChild(basketClear);

    
    for (let i = 0; i < shop.length; i++) {
        let block = document.createElement('div');
        block.className = 'block';
        block.innerText = shop[i].name + ' \n' + shop[i].price + ' ' + shop[i].currency;
        content.appendChild(block);

        let btnAdd = document.createElement('button');
        btnAdd.textContent = 'Добавить в корзину';
        btnAdd.className = 'add' + shop[i].name;
        content.appendChild(btnAdd);
    }

    let btnKeyboard = document.querySelector('.addKeyboard');
    btnKeyboard.addEventListener('click', function(event){
        basket1.numOfItems += 1;
        basket1.sumOfItems += 1000;
        basket.textContent = 'В корзине товаров: ' + basket1.numOfItems + ', на общую сумму ' + basket1.sumOfItems + ' рублей.';
        listOfItems.innerText += 'Keyboard' + ' \n';
    });
    let btnMouse = document.querySelector('.addMouse');
    btnMouse.addEventListener('click', function(event){
        basket1.numOfItems += 1;
        basket1.sumOfItems += 700;
        basket.textContent = 'В корзине товаров: ' + basket1.numOfItems + ', на общую сумму ' + basket1.sumOfItems + ' рублей.';
        listOfItems.innerText += 'Mouse' + ' \n';
    });
    let btnVideocard = document.querySelector('.addVideocard');
    btnVideocard.addEventListener('click', function(event){
        basket1.numOfItems += 1;
        basket1.sumOfItems += 25000;
        basket.textContent = 'В корзине товаров: ' + basket1.numOfItems + ', на общую сумму ' + basket1.sumOfItems + ' рублей.';
        listOfItems.innerText += 'Videocard' + ' \n';
    });
    let btnMonitor = document.querySelector('.addMonitor');
    btnMonitor.addEventListener('click', function(event){
        basket1.numOfItems += 1;
        basket1.sumOfItems += 7000;
        basket.textContent = 'В корзине товаров: ' + basket1.numOfItems + ', на общую сумму ' + basket1.sumOfItems + ' рублей.';
        listOfItems.innerText += 'Monitor' + ' \n';
    });

    let btnClearBasket = document.querySelector('.basketClear');
    btnClearBasket.addEventListener('click', function(event){
        basket1.numOfItems = 0;
        basket1.sumOfItems = 0;
        basket.textContent = 'Корзина пуста!';
        listOfItems.textContent = '';
    });

});

