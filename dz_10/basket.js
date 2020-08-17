//корзина
class Basket {
    constructor() {
        this.basket = [];
        this.element = null;
    }

    // запрос из базы данных из о корзине
    getBasket() {
        return fetch('http://localhost:3000/basket')
            .then(response => response.json())
            .then((items) => {
                this.basket = items;
                //console.log(this.basket);
            });
    }
    localBasket() {
        return this.basket;
    }
    // отправляем на сервер данные о добавлении к корзине
    add(item) {
        fetch('http://localhost:3000/basket', {
            method: 'POST',
            body: JSON.stringify({ ...item, count: 1 }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json());
    }

    // отправляем на сервер данные об удалении из корзины
    del(id) {

        fetch(`http://localhost:3000/basket/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json());

    }

    // отправляем на сервер данные об обновлении количества товара в корзине
    update(id, newCount) {

        fetch(`http://localhost:3000/basket/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ count: newCount }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json());

    }

    // вычисляем сумму в корзине
    total() {
        return this.basket.reduce((sum, item) => sum + item.price * item.count, 0);
    }

    // вычисляем количество товара
    count() {
        return this.basket.reduce((sum, item) => sum + item.count, 0);
    }

    // формируем список товаров в корзине-слайдере
    slider(){
        return this.basket.map((item) => new ItemSlider(item.id, item.description, item.price, item.count).htmlItemSlider()).join('');
    }

}

// формирум HTML товаров в корзине-слайдере
class ItemSlider {

    constructor(id, description, price, count) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.count = count;
    }

    htmlItemSlider() {
        return `
            <div class="slider-card">
                <div>${this.description}</div>
                <div>Цена:<span>${this.price}</span></div>
                <div >${this.count}шт.</div>
                <div>
                    <button id = "${this.id}" data-count = "${this.count}" data-id = "${this.id}">удалить</button>
                </div>
            </div>`
    }

}
