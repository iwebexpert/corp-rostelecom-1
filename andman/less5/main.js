const product = {
    items: [
        { "name": "Cofe", "cost": 150, "curr": "RUR" },
        { "name": "Cake", "cost": 50, "curr": "RUR" },
        { "name": "Sugar", "cost": 15, "curr": "RUR" },
        { "name": "Milk", "cost": 25, "curr": "RUR" },
        { "name": "Tea", "cost": 130, "curr": "RUR" },
        { "name": "GreenTea", "cost": 200, "curr": "RUR" },

    ],
    showProducts: function () {
        console.log('Прейскурант:');
        for (let i = 0; i < this.items.length; i++)
            console.log(this.items[i].name, ' - ', this.items[i].cost, this.items[i].curr);
    },
    getItem: function (item_num) {
        return this.items[item_num] ? this.items[item_num] : {};
    }
}

const basket = {
    items: [],
    addItem: function (item, item_count) {
        this.items.push({ "goods": item, "count": item_count });
    },
    countBasketPrice: function () {
        let amount = 0;
        for (let i = 0; i < this.items.length; i++)
            amount += this.items[i].goods.cost * this.items[i].count;
        return amount;
    },
    countBasketItems: function () {
        return this.items.length;
    }

}

function drawBasket(basket) {

    const body = document.querySelector('.basket-container');
    const divBasket = document.createElement('div');
    divBasket.classList.add('basket');
    const divH3 = document.createElement('h3');
    divH3.classList.add('h3-basket');
    divH3.innerHTML = 'Корзина';
    const divMessage = document.createElement('div');
    divMessage.classList.add('message');

    divMessage.innerHTML = basket.countBasketItems() > 0 ? `В корзине:  ${basket.countBasketItems()} товаров на сумму ${basket.countBasketPrice()} рублей` : 'Корзина пуста';
    divBasket.appendChild(divH3);
    divBasket.appendChild(divMessage);

    body.appendChild(divBasket);
}

//Закомментировать следующие 5 строк для проверки корзины на пустое состояние 
basket.addItem(product.getItem(0), 1);
basket.addItem(product.getItem(1), 2);
basket.addItem(product.getItem(2), 4);
basket.addItem(product.getItem(3), 2);
basket.addItem(product.getItem(5), 1);

drawBasket(basket);