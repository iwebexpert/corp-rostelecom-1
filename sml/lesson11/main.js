/**
 * класс группы товаров
 * @var items - массив товаров
 * @var afterFilterItems - массив товаров после поиска
 * @var loaded - флаг, грузятся ли товары
 */
class ItemsList {
    constructor() {
        this.items = [];
        this.afterFilterItems = [];
        this.loaded = false;   // не загружено
    }

    /**
     * Выполняет фильтрацию доступных товаров
     * @param query Строка для поиска товаров
     * @returns флаг удовлетворяет ли регулярному выражению поиска
     */
    filter(query) {
        this.afterFilterItems = this.items.filter((item) => {
            const regExp = new RegExp(query, 'i');
            return regExp.test(item.title);  //проверим на соответствие
        });
    }
    /**
     * Получение товара
     * @returns promise
     */
    fetchItems() {
        // fetch создает промис, преобразуем json и устанавливаем свойства класса
        return fetch('/goods')
            .then(response => response.json())
            .then((items) => {
                this.loaded = true;
                this.items = items;
                this.afterFilterItems = items;
            });
    }
    /**
     * Проверяет, загружен товар или нет
     * @returns string возвращаем информацию о загруженных товарах
     */
    render() {
        if (this.loaded && this.afterFilterItems.length === 0) {
            // если не загружен
            return '<div>Товары не найдены</div>';
        }
        // если товар загружен, то перебираем массив afterFilterItems для отрисовки
        // и создаем объекты товаров
        // map() обходит все элементы массива
        // join('') склейка html блоков товаров по пустой строке
        return this.afterFilterItems.map((item) => new Item(item.id, item.title, item.price).render()).join('');
    }
}
/**
 * Класс товара
 * @var id - идентификатор товара
 * @var title - название товара
 * @var price - цена товара
 */
class Item {
    /**
     * @param id - идентификатор товара
     * @param title - название товара
     * @param price - цена товара
     */
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    /**
     * Возвращает блок информации о товаре
     * @returns string html блок информации о товаре с кнопкой Купить
     */
    render() {
        return `<div class="item">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button
            data-id="${this.id}"
            data-title="${this.title}"
            data-price="${this.price}"
            class="buy"
        >Купить</button>
        </div>`;
    }
}
/**
 * Класс корзины
 * @var items - массив товаров в корзине
 * @var element - WEB элемент корзины
 */
class Cart {
    /**
     * Конструктор, инициализация свойств
     */
    constructor() {
        this.items = [];
        this.element = null;
    }
    /**
     * пробует получить товары в корзинe из JSON корзины
     * @returns 
     */
    fetchItems() {
        // fetch создает промис, преобразуем json и устанавливаем свойства класса
        return fetch('/cart')
            .then(response => response.json())
            .then((items) => {
                this.items = items;
            });
    }
    /**
     * Отображает данные в карзине
     * @param item - товар в корзине
     * @returns - string html блок товара в корзине 
     */
    renderItem(item) {
        return `<li data-id="${item.id}">
            <b>${item.title}</b><br>
            <input class="count" type="number" value="${item.count}">
        </li>`;
    }
    /**
     * Добавление нового товара на сервер в JSON
     * @param item новый товар который нужно добавить в корзину
     */
    add(item) {
        fetch('/cart', {
            method: 'POST',
            body: JSON.stringify({ ...item, count: 1 }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((item) => {
                this.element.insertAdjacentHTML('beforeend', this.renderItem(item));

            });
        this.items.push({ ...item, count: 1 });
    }
    /**
     * обновляет товары в корзине (удаляет, обновляет)
     * @param id - идентификатор товара
     * @param newCount - новое количество
     * @returns флаг обновления
     */
    update(id, newCount) {
        if (newCount < 1) {
            if (confirm('Вы действительно хотите удалить товар?')) {
                // удаляем товар
                fetch(`/cart/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then((item) => {
                        const itemEl = document.querySelector(`.cart li[data-id="${id}"]`);
                        if (itemEl) {
                            itemEl.remove();
                        }
                    });
                // удаляем товар из массива
                const indexRemove = this.items.findIndex(obj => obj.id === id);
                this.items.splice(indexRemove, 1);
            } else {
                return false;
            }
        } else {
            // обновляем данные
            fetch(`/cart/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ count: newCount }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((item) => {
                    console.log('Количество товара в корзине обновлено!')
                });
            // меняем у элемента массива количество
            const indexUpdate = this.items.findIndex(obj => obj.id === id);
            this.items[indexUpdate].count = newCount;
        }

        return true;
    }
    /**
     * Если web элемент корзины не создан, создает web элемент корзины
     * @returns возвращает web элемент корзины
     */
    render() {
        if (!this.element) {
            this.element = document.createElement('ul');

            this.element.innerHTML = this.items.map(this.renderItem).join('');
        }

        return this.element;
    }
    /**
     * Расчет стоимости корзины
     * @returns стоимость корзины
     */
    total() {
        return this.items.reduce((sum, item) => sum + item.price * item.count, 0);
    }
}

//Работа с элементами
// создаем список элементов
const items = new ItemsList();
items.fetchItems().then(() => {
    document.querySelector('.catalog').innerHTML = items.render();
}).catch((error) => {
    // если ничего не вернется сработает ошибка catch
    console.error(error);
});

// создаем корзину
const cart = new Cart();
cart.fetchItems().then(() => {
    document.querySelector('.cart').appendChild(cart.render());
    document.querySelector('.total').innerHTML = cart.total();
});


// обработчики событий

// навешываем обработчик на родителя всю корзину
// срабатывает при измененнии количества
document.querySelector('.cart').addEventListener('change', (event) => {
    if (event.target.classList.contains('count')) {
        const parent = event.target.parentElement;
        if (!cart.update(parent.dataset.id, +event.target.value)) {
            event.target.value = 1;
        }
        document.querySelector('.total').innerHTML = cart.total(); // обновляем сумму
    }
});
// обрабатываем нажатие кнопки "Купить"
document.querySelector('.catalog').addEventListener('click', (event) => {
    if (event.target.classList.contains('buy')) {
        const id = event.target.dataset.id;
        const itemEl = document.querySelector(`.cart li[data-id="${id}"]`);
        if (itemEl) {
            const currentCountEl = itemEl.querySelector('.count');
            currentCountEl.value = +currentCountEl.value + 1;
            cart.update(id, +currentCountEl.value);
        } else {
            cart.add(event.target.dataset);
        }
        document.querySelector('.total').innerHTML = cart.total();
    }
});
// обработчик поиска
document.querySelector('[name="query"]').addEventListener('input', (event) => {
    const query = event.target.value;
    items.filter(query);
    document.querySelector('.catalog').innerHTML = items.render();
});
