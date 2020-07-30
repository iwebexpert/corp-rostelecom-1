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
        //Если есть товар с таким названием, то прибавим к количеству
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === item.name) {
                this.items[i].count += item_count;
                return;
            }
        }
        this.items.push({ "name": item.name, "cost": item.cost, "curr": item.curr, "count": item_count });
    },
    deleteItem: function (item) {
        this.items.splice(item, 1);
    },
    countBasketPrice: function () {
        let amount = 0;
        for (let i = 0; i < this.items.length; i++)
            amount += this.items[i].cost * this.items[i].count;
        return amount;
    },
    countBasketItems: function () {
        return this.items.length;
    },
    catalogDiv: document.querySelector('#catalog'),

    basketDiv: document.querySelector('.basket-container'),

    divBasket: document.createElement('div'),
    divOrder: document.createElement('div'),
    divComment: document.createElement('div'),
    divSendOrder: document.createElement('div'),
    order: {},

    drawBasket() {
        this.divBasket.innerHTML = '';

        this.divBasket.classList.add('basket');
        //Сгенирируем заголовок
        const divH3 = document.createElement('h3');
        divH3.classList.add('h3-basket');
        divH3.innerHTML = 'Состав корзины';
        //Сгенерируем сообщение 
        const divMessage = document.createElement('div');
        divMessage.classList.add('message');
        divMessage.innerHTML = this.countBasketItems() > 0 ?
            `В корзине:  ${this.countBasketItems()} товаров на сумму ${this.countBasketPrice()} рублей` : 'Корзина пуста';
        this.divBasket.appendChild(divH3);
        this.divBasket.appendChild(divMessage);
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
            this.divBasket.appendChild(divItem);
        };
        if (this.countBasketItems() > 0) { //если пусто не рисуем кнопку Далее            
            this.divBasket.appendChild(this.drawBtnNext('basket'));
        }
        //Добавляем элементы в DOM
        this.basketDiv.appendChild(this.divBasket);


    },
    drawBtnNext(pageName) {
        const divBtnNext = document.createElement('div');
        divBtnNext.classList.add('block-next');
        const btnNext = document.createElement('button');
        btnNext.innerHTML = 'Далее';
        btnNext.classList.add('button-next');
        btnNext.addEventListener('click', function () {
            basket.nextBtnClick(pageName);
        });
        divBtnNext.appendChild(btnNext);

        return divBtnNext;

    },

    nextBtnClick(pageName) {
        if (pageName === 'basket') {
            this.order.goods = basket.items;
            this.divBasket.classList.add('basket-close');
            this.divBasket.innerHTML = '';
            this.catalogDiv.classList.add('basket-close');
            this.catalogDiv.innerHTML = '';
            this.drawFormOrder();
        }
        if (pageName === 'order') {
            const deliveryAddress = document.getElementsByName('deliveryAddress');
            if (deliveryAddress[0].value.length < 5) {
                const message = document.querySelector('.message');
                message.classList.add('err');
                message.innerHTML = 'Введите не менее 5-ти символов';
            }
            else {
                this.order.address = deliveryAddress[0].value;
                this.divOrder.classList.add('basket-close');
                this.divOrder.innerHTML = '';
                this.drawComment();
            }
        }
        if (pageName === 'comment') {
            const comment = document.getElementsByName('commentOrder');
            this.order.comment = comment[0].value;
            this.divComment.classList.add('basket-close');
            this.divComment.innerHTML = '';
            this.drawSendOrder();
        }
        return;
    },
    drawFormOrder() {

        this.divOrder.innerHTML = '';

        this.divOrder.classList.add('basket');
        //Сгенирируем заголовок
        const divH3 = document.createElement('h3');
        divH3.classList.add('h3-basket');
        divH3.innerHTML = 'Адрес доставки';
        //Сгенерируем сообщение 
        const divMessage = document.createElement('div');
        divMessage.classList.add('message');
        divMessage.innerHTML = 'Заполните поля формы';
        const formAddress = document.createElement('form');
        formAddress.action = '#';
        const inputAddress = document.createElement('input');
        inputAddress.type = 'text';
        inputAddress.placeholder = 'Введите адрес';
        inputAddress.classList.add('input-text');
        inputAddress.name = 'deliveryAddress';
        formAddress.appendChild(inputAddress);

        this.divOrder.appendChild(divH3);
        this.divOrder.appendChild(divMessage);
        this.divOrder.appendChild(formAddress);

        this.divOrder.appendChild(this.drawBtnNext('order'));

        this.basketDiv.appendChild(this.divOrder);

    },
    drawComment() {
        this.divComment.innerHTML = '';

        this.divComment.classList.add('basket');
        //Сгенирируем заголовок
        const divH3 = document.createElement('h3');
        divH3.classList.add('h3-basket');
        divH3.innerHTML = 'Комментарий к заказу';
        const formAddress = document.createElement('form');
        formAddress.action = '#';
        const inputComment = document.createElement('textarea');
        inputComment.placeholder = 'Введите комментарий';
        inputComment.classList.add('input-text');
        inputComment.classList.add('text-area');
        inputComment.name = 'commentOrder';
        formAddress.appendChild(inputComment);

        this.divComment.appendChild(divH3);

        this.divComment.appendChild(formAddress);

        this.divComment.appendChild(this.drawBtnNext('comment'));

        this.basketDiv.appendChild(this.divComment);

    },
    drawSendOrder() {
        this.divSendOrder.innerHTML = '';
        this.divSendOrder.classList.add('basket');
        const divH3 = document.createElement('h3');
        divH3.classList.add('h3-basket');
        divH3.innerHTML = 'Данные о заказе';
        const divMessage = document.createElement('div');
        divMessage.classList.add('message');
        divMessage.innerHTML = JSON.stringify(this.order);

        this.divSendOrder.appendChild(divH3);
        this.divSendOrder.appendChild(divMessage);

        this.basketDiv.appendChild(this.divSendOrder);

    },

}





//Закомментировать следующие 5 строк для проверки корзины на пустое состояние 
basket.addItem(product.getItem(0), 1);
basket.addItem(product.getItem(1), 2);
basket.addItem(product.getItem(2), 4);
basket.addItem(product.getItem(3), 2);
basket.addItem(product.getItem(5), 1);

basket.drawBasket();


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
        divBtnAdd.addEventListener('click', function () {
            basket.addItem(product.getItem(this.dataset.id), 1);
            basket.drawBasket(basket);
        });
        divItem.appendChild(divBtnAdd);
        divCatalog.appendChild(divItem);
    };

    body.appendChild(divCatalog);
}

drawCatalog(product);