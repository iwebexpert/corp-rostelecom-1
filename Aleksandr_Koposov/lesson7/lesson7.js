/**
 * ДЗ №7:
 */

// Компонент для работы с localStorage как с массивом объектов
class StorageArray {
    constructor(key, targetClass = null, ...defaultValues) {
        if (!key || typeof key !== 'string') {
            throw new Error('Не передан ключ хранилища');
        }
        this._key = key;
        this._class = targetClass;
        this._default = defaultValues;
    }
    get items() {
        const items = JSON.parse(localStorage.getItem(this._key)) || [];
        if (this._class) {
            return items.map(item => Object.assign(new this._class(...this._default), item));
        }
        return items;
    }
    set items(items) {
        localStorage.setItem(this._key, JSON.stringify(items || []));
    }
    add(item) {
        const items = this.items;
        items.push(item);
        this.items = items;
    }
    remove(index) {
        const items = this.items;
        const removed = items.splice(index, 1);
        this.items = items;
        return removed;
    }
}

// Примесь/интерфейс для классов с событиями
// (универсальный метод проверки наличия колбэка и его вызов)
class WithEvents {
    _on(callbackName, ...params) {
        if (this[`_${callbackName}`]) {
            this[`_${callbackName}`](...params);
        }
    }
}

// DOM-элемент (для упрощения работы с DOM)
class Dom {
    constructor(tagOrId = null, className = null, html = null) {
        if (!tagOrId) {
            return this;
        }
        if (tagOrId[0] === '#') {
            this.from(tagOrId.substr(1));
        } else {
            this.create(tagOrId, className, html);
        }
    }
    get el() { return this._el; }
    get outer() { return (this.el || {}).outerHTML || ''; }
    get inner() { return (this.el || {}).innerHTML || ''; }
    get classes() { return ((this.el || {}).className || '').split(' '); }
    set classes(arr) { return (this.el || {}).className = arr.join(' '); }
    from(id) {
        if (!id) {
            throw new Error('Не передан ID DOM');
        }
        const el = document.getElementById(id);
        if (!el) {
            throw new Error(`Элемент с указанным ID «${id}» не существует`);
        }
        this._el = el;
        return this;
    }
    create(tag, className = null, html = null) {
        const el = document.createElement(tag);
        el.className = className || '';
        el.innerHTML = html || '';
        this._el = el;
        return this;
    }
    html(content) {
        this._el.innerHTML = content;
        return this;
    }
    clear() {
        this.html('');
        return this;
    }
    attr(name, value) {
        this._el.setAttribute(name, value);
        return this;
    }

    css(name, value) {
        if (this._el.style[name]) {
            this._el.style[name] = value;
        }
        return this;
    }
    addClass(newClass) {
        this._el.classList.add(newClass);
    }
    removeClass(targetClass) {
        this._el.classList.remove(targetClass);
    }
    toggleClass(targetClass) {
        this._el.classList.toggle(targetClass);
    }
    hasClass(className) {
        return this._el.classList.contains(className);
    }

    appendTo(el) {
        if (el instanceof Dom) {
            el.el.appendChild(this._el);
        } else if (el instanceof HTMLElement) {
            el.appendChild(this._el);
        }
        return this;
    }
    addChild(el) {
        if (el instanceof HTMLElement) {
            this._el.appendChild(el);
        } else if (el instanceof Dom) {
            this._el.appendChild(el.el);
        }
        return this;
    }
    child(selector) {
        return this.el.querySelector(selector);
    }

    on(eventName, event) {
        this.el.addEventListener(eventName, event);
        return this;
    }
}

// Товар
class Product {
    constructor(uniqueId, name, price = 1, currency = 'RUB', images = []) {
        if (uniqueId === undefined || uniqueId === null) {
            throw new Error('Товар должен иметь уникальный ID/код');
        }
        this._uid = uniqueId;
        this._name = name || '';
        this._price = price || 1;
        this._currency = currency || 'RUB';
        this._images = images || [];
    }
    get uid() { return this._uid; }
    get name() { return this._name; }
    get price() { return this._price; }
    get currency() { return this._currency || 'RUB'; }
    get images() { return this._images || []; }
}

// Набор/группа товаров
class ProductStack extends Product {
    constructor(product) {
        if (!product || !product instanceof Product) {
            throw new Error('Не передан товар для формирования группы');
        }
        super(product.uid, product.name, product.price, product.currency, product.images);
        this._count = 0;
    }
    get count() { return this._count || 0; }
    set count(count) { return this._count = count; }
}

// Товар в виде DOM
class ProductDom {
    constructor(item) {
        if (!item) {
            throw new Error('Товар не передан');
        }
        if (!item instanceof Product) {
            throw new Error('Товар должен быть класса "Product"');
        }
        this._product = item;
    }
    dom() {
        const product = new Dom('div', 'product');
        (new Dom('div', 'product__name', this._product.name))
            .appendTo(product);
        if (this._product.count > 0) {
            (new Dom('div', 'product__count text--primary', `x<b>${this._product.count}</b>`))
                .appendTo(product);
        }
        (new Dom('div', 'product__price'))
            .addChild(new Dom('div', 'price__text', this._product.price))
            .addChild(new Dom('div', 'price__currency', this._product.currency))
            .appendTo(product);
        return product;
    }
}

// Картинка (в частности - для галереи)
class ImageDom extends Dom {
    constructor(src, cssClass = 'image__mini') {
        super('img', cssClass);
        this.attr('src', src).attr('alt', 'Картинка товара');
    }
}

// Карточка товара в виде DOM-элемента
class Card extends WithEvents {
    constructor(product, onImageClick = null, onAddBtnClick = null) {
        super();
        this._product = product;
        this._imageClick = onImageClick;
        this._addBtnClick = onAddBtnClick;
    }
    dom() {
        // Создаём карточку
        const card = new Dom('div', 'card');

        // Добавляем в неё товар в виде DOM-элемента
        (new ProductDom(this._product)).dom().appendTo(card);

        // Далее создаём галерею изображений товара и добавляем её в карточку
        const gallery = new Dom('div', 'product__images');
        this._product.images.forEach((src, index) => {
            (new ImageDom(src))
                .on('click', () => this._on('imageClick', index, this._product.images))
                .appendTo(gallery);
        });
        gallery.appendTo(card);

        // В конце добавляем в карточку блок кнопок и в него кнопку "В корзину"
        (new Dom('div', 'card__actions'))
            .addChild(
                (new Dom('a', 'btn btn-accent btn-block', 'В корзину'))
                    .on('click', () => this._on('addBtnClick', this._product))
            )
            .appendTo(card);

        // Возвращаем получившийся DOM-элемент
        return card;
    }
}

// Строка товара в корзине в виде DOM-элемента
class Row extends WithEvents {
    constructor(product, onRemove = null) {
        super();
        this._product = product;
        this._removeClick = onRemove;
    }
    dom() {
        // Создаём строку
        const card = new Dom('div', 'row');

        // Добавляем в неё товар в виде DOM-элемента
        (new ProductDom(this._product)).dom().appendTo(card);

        // В конце добавляем в карточку блок кнопок и в него кнопку удаления
        (new Dom('div', 'row__actions'))
            .addChild(
                (new Dom('a', 'btn btn-circle btn-red', '<b>&ndash;</b>'))
                    .on('click', () => this._on('removeClick', this._product))
            )
            .appendTo(card);

        // Возвращаем получившийся DOM-элемент
        return card;
    }
}

// Класс для "печати" контента content внутри привязанного элемента el
class Printer extends Dom {
    bind(el) {
        if (typeof el !== 'string' && !domElement instanceof HTMLElement) {
            throw new Error('Нужно передать или ID элемента DOM, или сам элемент Dom');
        }
        const isString = typeof el === 'string';
        if (isString) {
            this._el = document.getElementById(el);
        } else {
            this._el = el;
        }
        // Если не удалось найти DOM-элемент, то создаём его сами
        if (!this._el) {
            const div = new Dom('div');
            if (isString) {
                div.attr('id', el);
            }
            document.querySelector('body').appendChild(div.el);
            this._el = div.el;
        }
        return this;
    }
    mount(domElement) {
        this.el.innerHTML = '';
        if (domElement instanceof Dom) {
            domElement.appendTo(this._el);
        } else if (domElement instanceof HTMLElement) {
            this._el.appendChild(domElement);
        }
    }
}

// Модальное окно
class Modal extends Printer {
    constructor(elementOrId, isPersistent = false) {
        super();
        this.bind(elementOrId);

        this._modal = new Dom('div', 'modal');

        if (!isPersistent) {
            // Закрытие окна щелчком по серой области
            this._modal.on('click', ({ target }) => {
                if (target.className === 'modal visible') {
                    this.hide();
                }
            })
        }
        this._content = new Dom('div', 'modal__content');
        (new Dom('div', 'modal__container'))
            .addChild((new Dom('div', 'modal__close', 'X'))
                .on('click', () => this.hide())
            )
            .addChild(this._content)
            .appendTo(this._modal);
        this.print();
    }
    print() {
        this.mount(this._modal);
    }
    _setBodyFixed(fix = false) {
        (document.querySelector('body') || {}).className = fix ? 'body__fixed' : '';
    }
    show() {
        this._setBodyFixed(true);
        this._modal.addClass('visible');
    }
    hide() {
        this._modal.removeClass('visible');
        this._setBodyFixed(false);
    }
    setContent(content) {
        this._content.innerHTML = content;
    }
}

// Модальное окно с галереей и соответствующими элементами управления
class GalleryModal extends Modal {
    constructor(elementOrId) {
        super(elementOrId);
    }
    get visible() {
        return this._modal.hasClass('visible');
    }
    setContent(index, images) {
        // Устанавливаем выбранную картинку
        this._content.html(
            (new ImageDom(images[index], 'image')).outer
        );

        // Добавляем элементы управления, если они нужны
        if (index > 0) {
            this._setArrow(true, index - 1, images);
        }
        if (index < (images.length - 1)) {
            this._setArrow(false, index + 1, images);
        }
        this.show();
    }
    _setArrow(isLeft, index, images) {
        this._content.addChild(
            (new Dom('div', `image__${isLeft ? 'prev' : 'next'}`))
                .on('click', () => {
                    this.setContent(index, images);
                })
        );
    }
}

// Ярлычок, показывающий некоторый контент в селекторе :after некоторого элемента
class Badge {
    constructor(domId) {
        const el = new Dom(`#${domId}`);
        this._el = el;
    }
    show(content) {
        this._el.attr('data-after', content);
    }
}

// Каталог товаров
class Catalog extends Printer {
    constructor(
        elementOrId,
        items,
        imageClickCallback = null,
        addCallback = null
    ) {
        super();
        this.bind(elementOrId);
        this._items = items || [];
        this._onImageClick = imageClickCallback;
        this._onAdd = addCallback;
    }
    print() {
        const container = new Dom('div', 'products');
        if (this._items.length < 1) {
            container.html('<p>Каталог пуст</p>');
            return this;
        }

        this._items.forEach((product) => {
            const card = new Card(product, this._onImageClick, this._onAdd);
            card.dom().appendTo(container);
        });

        this.mount(container);
    }
}

// Корзина товаров
class Cart extends Printer {
    constructor(
        elementOrId,
        items,
        baseCurrency = 'RUB',
        removeCallback = null
    ) {
        super();
        this.bind(elementOrId);
        this._items = items || [];
        this._onRemove = removeCallback;
        this._currencies = {
            "CAD": 0.0190321818, "HKD": 0.1090175, "ISK": 1.9707151725, "PHP": 0.6958964783, "DKK": 0.0917023038, "HUF": 4.3611926768, "CZK": 0.3287768756, "GBP": 0.0111930463, "RON": 0.05965478, "SEK": 0.1274806377, "IDR": 205.6069310053, "INR": 1.0574796031, "BRL": 0.0753231973, "RUB": 1.0, "HRK": 0.0928157578, "JPY": 1.5056263918, "THB": 0.4452338254, "CHF": 0.0132863154, "EUR": 0.0123169698, "MYR": 0.0600513864, "BGN": 0.0240895296, "TRY": 0.0964665077, "CNY": 0.0983645527, "NOK": 0.1307421713, "NZD": 0.0214795637, "ZAR": 0.2342453639, "USD": 0.0140585894, "MXN": 0.3141455472, "SGD": 0.0195692017, "AUD": 0.0201234653, "ILS": 0.0482911436, "KRW": 16.920314132, "PLN": 0.055337682
        };
        this._baseCurrency = baseCurrency || 'RUB';
    }
    get currencies() { return this._currencies || []; }

    get currency() { return this._baseCurrency || 'RUB'; }
    set currency(currency) { return this._baseCurrency = currency || 'RUB'; }

    get products() { return this._items || []; }
    set products(products) { return this._items = products || []; }

    get cost() {
        const baseCurrencyRate = this.currencies[this.currency] || 0;
        const cost = this.products.reduce((sum, item) => {
            const rate = (this.currencies[item.currency] || 0) / baseCurrencyRate;
            if (!rate) {
                return sum;
            }
            return sum + (item.price / rate);
        }, 0);
        return `${(cost).toFixed(2)} ${this.currency}`;
    }
    summary() {
        return `В корзине: ${this.products.length} товаров на сумму <b>${this.cost}</b>`;
    }
    print() {
        const container = new Dom('div', 'products cart');
        if (this._items.length < 1) {
            container.html('<p>Корзина пуста</p>');
            this.mount(container);
            return this;
        }

        // Сперва формируем массив наборов товаров (группировка одинаковых)
        const items = [];
        this._items.forEach((product) => {
            let index = items.map(item => item.uid).indexOf(product.uid);
            if (index < 0) {
                index = items.length;
                items.push(new ProductStack(product));
            }
            items[index].count++;
        });

        // Затем формируем строки наборов
        items.forEach((product) => {
            const row = new Row(product, this._onRemove);
            row.dom().appendTo(container);
        });

        // Дополняем корзину тоговой суммой и переключателями валют
        (new Dom('div', 'cart__summary', this.summary()))
            .appendTo(container);

        const currencies = (new Dom('div', 'cart__currency'))
            .addChild((new Dom('h4', '', 'Суммировать в')));

        Object.keys(this.currencies)
            .sort()
            .forEach((item) => {
                (new Dom(
                    'a',
                    `btn btn-round ${this.currency === item ? 'btn-accent' : ''}`,
                    item
                )).on('click', () => {
                    this.currency = item;
                    this.print();
                }).appendTo(currencies);
            });
        currencies.appendTo(container);

        // Выводим корзину
        this.mount(container);
    }
}

// Инициализируем каталог
const initCatalog = () => {

    // Инициализируем хранилища товаров и товаров корзины
    const cartStorage = new StorageArray('cart', Product, 0, '');
    const productsStorage = new StorageArray('products', Product, 0, '');
    if (!productsStorage.items.length) {
        productsStorage.items = [
            new Product(1, 'Монитор', 10, 'USD', [
                'https://i.simpalsmedia.com/999.md/BoardImages/900x900/9723c55b4896178b0b396cdb7d45c009.jpg',
                'https://www.bhphotovideo.com/images/images2500x2500/nec_ea193mi_bk_19_led_backlit_1009576.jpg',
                'https://goodzone23.ru/image/cache/products/monitori_komputeri_i_perefiriya_31/p134344_6310236_monitor_philips_243s7eymb00_cherniy-1200x800.jpg',
            ]),
            new Product(2, 'Мышь', 1, 'EUR', [
                'https://potrebitel.ru/thumbnails/canvas/products_1200x630/0be/0be7a9387edb2f439d59df4be92b61f2.jpeg',
                'https://famt.ru/wp-content/uploads/2019/05/ubit-mysh-vo-sne.jpg',
            ]),
            new Product(3, 'Варенье', 30, 'RUB', [
                'https://img.7dach.ru/image/1200/44/42/48/2019/01/24/5dbbe4-nomark.jpg',
            ]),
        ];
    }

    // Инициализируем модальное окно
    const modal = new GalleryModal('modal-container');
    document.addEventListener('keyup', ({ key }) => {
        if (modal.visible) {
            const left = modal.child('.image__prev');
            if (key === 'ArrowLeft' && left) {
                left.click();
            }
            const right = modal.child('.image__next');
            if (key === 'ArrowRight' && right) {
                right.click();
            }
            const close = modal.child('.modal__close');
            if (key === 'Escape' && close) {
                close.click();
            }
        }
    });

    // Создаём индикатор товаров в корзине
    const badge = new Badge('to-cart-btn');
    badge.show(cartStorage.items.length);

    // Задаём функции реакции на нажатие на картинку в галерее товара и на нажатие кнопки "в корзину"
    const imageClickCallback = (...props) => modal.setContent(...props);
    const addToCartCallback = (product) => {
        cartStorage.add(product);
        badge.show(cartStorage.items.length);
    };

    // А затем инициализируем каталог
    (new Catalog('catalog-container', productsStorage.items,
        imageClickCallback,
        addToCartCallback
    )).print();
};

// Инициализируем корзину
const initCart = () => {
    const cartStorage = new StorageArray('cart', Product, 0, '');
    const cart = new Cart('cart-container', cartStorage.items, 'RUB', (product) => {
        const index = cartStorage.items.map(i => i.uid).indexOf(product.uid);
        if (index < 0) {
            throw new Error('Указанный товар не найден среди товаров корзины');
        }
        cartStorage.remove(index);
        cart.products = cartStorage.items;
        cart.print();
    });
    cart.print();
};
