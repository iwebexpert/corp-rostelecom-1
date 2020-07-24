/**
 * ДЗ №6:
 */

class DomElement {
    constructor(element) {
        this._el = element;
    }
    appendTo(element) {
        let domEl = null;
        if (typeof element === 'string') {
            domEl = document.getElementById(element);
        } else {
            domEl = element;
        }
        domEl.appendChild(this._el);
    }
}

class Image extends DomElement {
    constructor(src) {
        const image = document.createElement('img');
        image.className = 'image__mini';
        image.setAttribute('src', src);
        image.addEventListener('click', () => {
            this._click();
        });
        super(image);
        this._src = src || '';
        this._clickCallback = null;
    }
    get src() { return this._src || ''; }
    _click() {
        if (this._clickCallback) {
            this._clickCallback(this, this._src);
        }
    }
    onclick(callback = null) {
        if (callback) {
            this._clickCallback = callback;
        }
    }
}

class Gallery extends DomElement {
    constructor(images, imageClickCallback = null) {
        const gallery = document.createElement('div');
        gallery.className = 'product__images';
        images.forEach((src, index) => {
            if (typeof src !== 'string') {
                return;
            }
            const image = new Image(src);
            if (imageClickCallback) {
                image.onclick((img) => {
                    imageClickCallback(img, index, images);
                });
            }
            image.appendTo(gallery);
        });
        super(gallery);
    }
}

class Modal extends DomElement {
    constructor() {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const container = document.createElement('div');
        container.className = 'modal__container';

        const closeButton = document.createElement('a');
        closeButton.className = 'modal__close';
        closeButton.innerHTML = 'X';
        closeButton.addEventListener('click', () => {
            this.hide();
        });
        container.appendChild(closeButton);

        const content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = '<p>Пустое модальное окно</p>';
        container.appendChild(content);

        modal.appendChild(container);

        super(modal);
        this._content = content;
        this._container = container;
    }
    _setBodyScroll(fix = false) {
        const body = document.getElementsByTagName('body')[0];
        body.className = fix ? 'body__fixed' : '';
    }
    show() {
        this._setBodyScroll(true);
        this._el.className = 'modal visible';
    }
    hide() {
        this._el.className = 'modal';
        this._setBodyScroll(false);
    }
    setContent(content) {
        this._content.innerHTML = content;
    }
}

class GalleryModal extends Modal {
    setContent(index, images) {
        const current = images[index];
        this._content.innerHTML = `<img class="image" src="${current}" alt="Картинка ${index + 1}">`;

        if (index > 0) {
            const contentPrev = document.createElement('div');
            contentPrev.className = 'content__prev';
            contentPrev.addEventListener('click', () => {
                this.setContent(index - 1, images);
            });
            this._content.appendChild(contentPrev);
        }

        if (index < (images.length - 1)) {
            const contentNext = document.createElement('div');
            contentNext.className = 'content__next';
            contentNext.addEventListener('click', () => {
                this.setContent(index + 1, images);
            });
            this._content.appendChild(contentNext);
        }
    }
}

class Product {
    constructor(
        name,
        price = 1,
        currency = 'RUB',
        images = [],
        imageClickCallback = null
    ) {
        this._name = name || '';
        this._price = price || 1;
        this._currency = currency || 'RUB';
        this._images = images || [];
        this._imageClickCallback = imageClickCallback || null;
    }
    get name() { return this._name; }
    get price() { return this._price; }
    get currency() { return this._currency || 'RUB'; }
    get images() { return this._images || []; }
    dom(withImages = true) {
        const product = document.createElement('div');
        product.className = 'product';

        const name = document.createElement('div');
        name.className = 'product__name';
        name.innerHTML = this._name;
        product.appendChild(name);

        const price = document.createElement('div');
        price.className = 'product__price';
        const priceText = document.createElement('div');
        priceText.className = 'price__text';
        priceText.innerHTML = this._price;
        price.appendChild(priceText);
        const priceCur = document.createElement('div');
        priceCur.className = 'price__currency';
        priceCur.innerHTML = this._currency;
        price.appendChild(priceCur);
        product.appendChild(price);

        if (withImages && this.images.length > 0) {
            const gallery = new Gallery(this.images, this._imageClickCallback);
            gallery.appendTo(product);
        }

        return product;
    }
}

class Printer {
    bind(domId) {
        if (!domId) {
            throw new Error('Не передан ID элемента');
        }
        this._domElement = document.getElementById(domId);
        return this;
    }
}

class CartPrinter extends Printer {
    print(cart) {
        if (!cart || !cart instanceof Cart) {
            throw new Error('Не передана корзина');
        }
        const container = document.createElement('div');
        container.className = 'products cart';

        if (cart.products.length < 1) {
            container.innerHTML = '<p>Корзина пуста</p>';
            this._domElement.innerHTML = '';
            this._domElement.appendChild(container);
            return;
        }

        // Выводим строки товаров
        cart.products.forEach((product, index) => {
            const row = document.createElement('div');
            row.className = 'row';
            row.appendChild(product.dom(false));

            const actions = document.createElement('div');
            actions.className = 'row__actions';

            const removeButton = document.createElement('a');
            removeButton.className = 'btn btn-circle btn-red';
            removeButton.addEventListener('click', () => cart.remove(index));
            removeButton.innerHTML = '<b>&ndash;</b>';

            actions.appendChild(removeButton);
            row.appendChild(actions);
            container.appendChild(row);
        })

        // Выводим итоговую информацию
        const summary = document.createElement('div');
        summary.className = 'cart__summary';
        summary.innerHTML = cart.summary();
        container.appendChild(summary);

        // Выводим переключатели валют
        const currencies = document.createElement('div');
        currencies.className = 'cart__currency';
        const currenciesTitle = document.createElement('h4');
        currenciesTitle.innerHTML = 'Суммировать в';
        currencies.appendChild(currenciesTitle);
        Object.keys(cart.currencies).sort().forEach((item) => {
            const currency = document.createElement('a');
            currency.className = `btn btn-round ${cart.baseCurrency === item ? 'btn-accent' : ''}`;
            currency.innerHTML = item;
            currency.addEventListener('click', () => {
                cart.setCurrency(item);
                this.print(cart);
            })
            currencies.appendChild(currency);
        })
        container.appendChild(currencies);

        this._domElement.innerHTML = '';
        this._domElement.appendChild(container);
    }
}

class CatalogPrinter extends Printer {
    constructor(products, addToCartCallback = null) {
        super();
        if (!Array.isArray(products) || !products.length) {
            throw new Error('Не передан список товаров');
        }
        this._products = products;
        this._addCallback = addToCartCallback;
    }
    print() {
        const container = document.createElement('div');
        container.className = 'products';

        if (this._products.length < 1) {
            this._domElement.innerHTML = '<p>Каталог пуст</p>';
            return;
        }

        this._products.forEach((product) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.appendChild(product.dom());

            const cardActions = document.createElement('div');
            cardActions.className = 'card__actions';

            const toCart = document.createElement('a');
            toCart.className = 'btn btn-accent btn-block';
            if (this._addCallback) {
                toCart.addEventListener('click', () => this._addCallback(product));
            }
            toCart.innerHTML = 'В корзину';

            cardActions.appendChild(toCart);
            card.appendChild(cardActions);
            container.appendChild(card);
        });

        this._domElement.innerHTML = '';
        this._domElement.appendChild(container);
    }
}

class Cart {
    constructor(items, baseCurrency = 'RUB', printer = null) {
        this._products = items || [];
        this._currencies = {
            "CAD": 0.0190321818, "HKD": 0.1090175, "ISK": 1.9707151725, "PHP": 0.6958964783, "DKK": 0.0917023038, "HUF": 4.3611926768, "CZK": 0.3287768756, "GBP": 0.0111930463, "RON": 0.05965478, "SEK": 0.1274806377, "IDR": 205.6069310053, "INR": 1.0574796031, "BRL": 0.0753231973, "RUB": 1.0, "HRK": 0.0928157578, "JPY": 1.5056263918, "THB": 0.4452338254, "CHF": 0.0132863154, "EUR": 0.0123169698, "MYR": 0.0600513864, "BGN": 0.0240895296, "TRY": 0.0964665077, "CNY": 0.0983645527, "NOK": 0.1307421713, "NZD": 0.0214795637, "ZAR": 0.2342453639, "USD": 0.0140585894, "MXN": 0.3141455472, "SGD": 0.0195692017, "AUD": 0.0201234653, "ILS": 0.0482911436, "KRW": 16.920314132, "PLN": 0.055337682
        };
        this._baseCurrency = baseCurrency || 'RUB';
        this._printer = printer || null;
    }
    get baseCurrency() { return this._baseCurrency || 'RUB'; }
    get products() { return this._products || []; }
    get currencies() { return this._currencies || []; }
    add(product = {}) {
        if (!product instanceof Product) {
            throw new Error('Ошибка! Товар должен быть экземпляром класса Product');
        }
        this._products.push(product);
        this.print();
        return true;
    }
    remove(index) {
        const removed = this.products.splice(index, 1);
        this.print();
        return removed;
    }
    cost() {
        const baseCurrencyRate = this.currencies[this.baseCurrency] || 0;
        const cost = this.products.reduce((sum, item) => {
            const rate = (this.currencies[item.currency] || 0) / baseCurrencyRate;
            if (!rate) {
                return sum;
            }
            return sum + (item.price / rate);
        }, 0);
        return `${(cost).toFixed(2)} ${this._baseCurrency}`;
    }
    summary() {
        return `В корзине: ${this.products.length} товаров на сумму ${this.cost()}`;
    }
    toString() {
        this.summary();
        return '';
    }
    setCurrency(currency) {
        this._baseCurrency = currency || 'RUB';
    }
    print() {
        if (this._printer && this._printer instanceof Printer) {
            this._printer.print(this);
        }
    }
}

const _initModal = () => {
    if (!window.modal) {
        const m = new GalleryModal();
        m.appendTo('modal-container');
        window['modal'] = m;
    }
};
const _initProducts = () => {
    if (!window.products) {
        const imageClickCallback = (image, index, images) => {
            window.modal.setContent(index, images);
            window.modal.show();
        };
        window['products'] = [
            new Product('Монитор', 10, 'USD', [
                'https://i.simpalsmedia.com/999.md/BoardImages/900x900/9723c55b4896178b0b396cdb7d45c009.jpg',
                'https://www.bhphotovideo.com/images/images2500x2500/nec_ea193mi_bk_19_led_backlit_1009576.jpg',
                'https://goodzone23.ru/image/cache/products/monitori_komputeri_i_perefiriya_31/p134344_6310236_monitor_philips_243s7eymb00_cherniy-1200x800.jpg',
            ], imageClickCallback),
            new Product('Мышь', 1, 'EUR', [
                'https://potrebitel.ru/thumbnails/canvas/products_1200x630/0be/0be7a9387edb2f439d59df4be92b61f2.jpeg',
                'https://famt.ru/wp-content/uploads/2019/05/ubit-mysh-vo-sne.jpg',
            ], imageClickCallback),
            new Product('Варенье', 30, 'RUB', [
                'https://img.7dach.ru/image/1200/44/42/48/2019/01/24/5dbbe4-nomark.jpg',
            ], imageClickCallback),
        ];
    }
};
const _initCart = () => {
    if (!window.cart) {
        const cartPrinter = new CartPrinter();
        cartPrinter.bind('cart-container');
        window['cart'] = new Cart([], 'RUB', cartPrinter);
        window.cart.print();
    }
};

const init = () => {
    _initModal();
    _initProducts();
    _initCart();

    const catalogPrinter = new CatalogPrinter(window.products, (item) => {
        _initCart();
        window.cart.add(item);
    });
    catalogPrinter.bind('catalog-container').print();
};
