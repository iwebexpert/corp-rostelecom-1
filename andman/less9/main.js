class Product {
    constructor() {
        this.items = [
            { "name": "Cofe", "cost": 150, "curr": "RUR" },
            { "name": "Cake", "cost": 50, "curr": "RUR" },
            { "name": "Sugar", "cost": 15, "curr": "RUR" },
            { "name": "Milk", "cost": 25, "curr": "RUR" },
            { "name": "Tea", "cost": 130, "curr": "RUR" },
            { "name": "GreenTea", "cost": 200, "curr": "RUR" },
        ];
        this.body = document.querySelector('#catalog');
    }


    showProducts() { //Показать прейскурант (вывести в лог)
        console.log('Прейскурант:');
        for (let i = 0; i < this.items.length; i++)
            console.log(this.items[i].name, ' - ', this.items[i].cost, this.items[i].curr);
    }
    getCatalog() { //Получит все элементы каталога
        return this.items;
    }
    getItem(item_num) { //Получить конкретный товар
        return this.items[item_num] ? this.items[item_num] : {};
    }
    drawCatalog() { //Рендер каталога
        this.body.classList.add('catalog');
        const divCatalog = document.createElement('div');
        divCatalog.classList.add('price-list');
        const divH3 = document.createElement('h3');
        divH3.classList.add('h3-catalog');
        divH3.innerHTML = 'Каталог';
        divCatalog.appendChild(divH3);
        //Получим данные для каталога из объекта product
        let catalog = this.getCatalog();
        for (let i = 0; i < catalog.length; i++) {
            const divItem = document.createElement('div');
            divItem.classList.add('item-list');
            for (let key in catalog[i]) { //пробегаем по объекту со свойствами товара 
                const divPrice = document.createElement('div');
                divPrice.classList.add('price-item');
                divPrice.classList.add('price-' + key);//стили для разных свойств будут отличаться
                divPrice.innerHTML = catalog[i][key];
                divItem.appendChild(divPrice);
            };
            const divBtnAdd = document.createElement('button');
            divBtnAdd.classList.add('button-add');
            divBtnAdd.classList.add('price-item');
            divBtnAdd.innerHTML = 'Купить';
            divBtnAdd.dataset.id = i;
            divBtnAdd.addEventListener("click", (event) => {
                basket.addItem(this.getItem(event.target.dataset.id), 1);
                basket.drawBasket(basket);
            });
            divItem.appendChild(divBtnAdd);
            divCatalog.appendChild(divItem);
        };

        this.body.appendChild(divCatalog);
    }
}

class Basket {
    constructor() {
        this.items = [];
        this.basketDiv = document.querySelector('.basket-container');
    }

    addItem(item, item_count) { //Добавление товара в корзину
        //Если есть товар с таким названием, то прибавим к количеству
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === item.name) {
                this.items[i].count += item_count;
                return;
            }
        }
        this.items.push({ "name": item.name, "cost": item.cost, "curr": item.curr, "count": item_count });
    }
    deleteItem(item) { //Удалить товар из корзины
        this.items.splice(item, 1);
    }
    countBasketPrice() { //Подсчет стоимости 
        let amount = 0;
        for (let i = 0; i < this.items.length; i++)
            amount += this.items[i].cost * this.items[i].count;
        return amount;
    }
    countBasketItems() { //Подсчет количества товаров
        return this.items.length;
    }

    drawBasket() { //Рендер корзины
        this.basketDiv.innerHTML = '';
        const divBasket = document.createElement('div');
        divBasket.classList.add('basket');
        //Сгенирируем заголовок
        const divH3 = document.createElement('h3');
        divH3.classList.add('h3-basket');
        divH3.innerHTML = 'Корзина';
        //Сгенерируем сообщение 
        const divMessage = document.createElement('div');
        divMessage.classList.add('message');
        divMessage.innerHTML = this.countBasketItems() > 0 ?
            `В корзине:  ${this.countBasketItems()} товаров на сумму ${this.countBasketPrice()} рублей` : 'Корзина пуста';
        divBasket.appendChild(divH3);
        divBasket.appendChild(divMessage);
        //Рисуем содержимое корзины
        for (let i = 0; i < this.items.length; i++) {
            const divItem = document.createElement('div');
            divItem.classList.add('item-list');
            for (let key in this.items[i]) { //пробегаем по объекту со свойствами товара 
                const divPrice = document.createElement('div');
                divPrice.classList.add('basket-item');
                divPrice.classList.add('price-' + key);//стили для разных свойств будут отличаться
                divPrice.innerHTML = (key === 'count') ? this.items[i][key] + ' шт' : this.items[i][key];
                divItem.appendChild(divPrice);
            };
            const divBtnDel = document.createElement('button');
            divBtnDel.classList.add('button-del');
            divBtnDel.classList.add('price-item');
            divBtnDel.innerHTML = 'Удалить';
            divBtnDel.dataset.id = i;
            divBtnDel.addEventListener("click", function () {
                basket.deleteItem(this.dataset.id);
                basket.drawBasket(basket);
            });
            divItem.appendChild(divBtnDel);
            divBasket.appendChild(divItem);
        }
        //Добавляем элементы в DOM
        this.basketDiv.appendChild(divBasket);
    }
}


// MAIN часть 
basket = new Basket();
product = new Product();



//Закомментировать следующие 5 строк для проверки корзины на пустое состояние 
basket.addItem(product.getItem(0), 1);
basket.addItem(product.getItem(1), 2);
basket.addItem(product.getItem(2), 4);
basket.addItem(product.getItem(3), 2);
basket.addItem(product.getItem(5), 1);

//Рендер корзины
basket.drawBasket();

//Рендер каталога
product.drawCatalog();