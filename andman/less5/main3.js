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
    getCatalog: function () {
        return this.items;
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
    //Сгенирируем заголовок
    const divH3 = document.createElement('h3');
    divH3.classList.add('h3-basket');
    divH3.innerHTML = 'Корзина';
    //Сгенерируем сообщение 
    const divMessage = document.createElement('div');
    divMessage.classList.add('message');
    divMessage.innerHTML = basket.countBasketItems() > 0 ? `В корзине:  ${basket.countBasketItems()} товаров на сумму ${basket.countBasketPrice()} рублей` : 'Корзина пуста';

    divBasket.appendChild(divH3);
    divBasket.appendChild(divMessage);
    //Добавляем элементы в DOM
    body.appendChild(divBasket);
}

//Закомментировать следующие 5 строк для проверки корзины на пустое состояние 
basket.addItem(product.getItem(0), 1);
basket.addItem(product.getItem(1), 2);
basket.addItem(product.getItem(2), 4);
basket.addItem(product.getItem(3), 2);
basket.addItem(product.getItem(5), 1);

drawBasket(basket);


/* Для 3-го задания */
function drawCatalog(product) {

    const body = document.querySelector('#catalog');
    body.classList.add('catalog');
    const divCatalog = document.createElement('div');
    divCatalog.classList.add('price-list');
    const divH3 = document.createElement('h3');
    divH3.classList.add('h3-catalog');
    divH3.innerHTML = 'Каталог';
    divCatalog.appendChild(divH3);
    //Получим данные для каталога из объекта product
    let catalog = product.getCatalog();
    for (let i = 0; i < catalog.length; i++) {
        for (let key in catalog[i]) { //пробегаем по объекту со свойствами товара 
            const divPrice = document.createElement('div');
            divPrice.classList.add('price-item');
            divPrice.classList.add('price-' + key);//стили для разных свойств будут отличаться
            divPrice.innerHTML = catalog[i][key];
            divCatalog.appendChild(divPrice);
        };
    };

    body.appendChild(divCatalog);
}

drawCatalog(product);