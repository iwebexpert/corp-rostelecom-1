/**
 * ДЗ №5:
 */

class Product {
    constructor(name, price = 1, currency = 'RUB') {
        this._name = name || '';
        this._price = price || 1;
        this._currency = currency || 'RUB';
    }
    get name() { return this._name }
    get price() { return this._price }
    get currency() { return this._currency }
    html() {
        return `<div class="product">
            <div class="product__name">${this._name}</div>
            <div class="product__price">
                <div class="price__text">${this._price}</div>
                <div class="price__currency">${this._currency}</div>
            </div>
        </div>`
    }
    toString() {
        return this.html()
    }
}

class Cart {
    constructor(items, baseCurrency = 'RUB') {
        this._products = items || [];
        this._currencies = {
            "CAD": 0.0190321818, "HKD": 0.1090175, "ISK": 1.9707151725, "PHP": 0.6958964783, "DKK": 0.0917023038, "HUF": 4.3611926768, "CZK": 0.3287768756, "GBP": 0.0111930463, "RON": 0.05965478, "SEK": 0.1274806377, "IDR": 205.6069310053, "INR": 1.0574796031, "BRL": 0.0753231973, "RUB": 1.0, "HRK": 0.0928157578, "JPY": 1.5056263918, "THB": 0.4452338254, "CHF": 0.0132863154, "EUR": 0.0123169698, "MYR": 0.0600513864, "BGN": 0.0240895296, "TRY": 0.0964665077, "CNY": 0.0983645527, "NOK": 0.1307421713, "NZD": 0.0214795637, "ZAR": 0.2342453639, "USD": 0.0140585894, "MXN": 0.3141455472, "SGD": 0.0195692017, "AUD": 0.0201234653, "ILS": 0.0482911436, "KRW": 16.920314132, "PLN": 0.055337682
        };
        this._baseCurrency = baseCurrency || 'RUB';
    }
    get baseCurrency() { return this._baseCurrency || 'RUB' }
    get products() { return this._products || [] }
    get currencies() { return this._currencies || [] }
    add(product = {}) {
        if (product instanceof Product) {
            this._products.push(product);
            return true;
        }
        throw Error('Ошибка! Товар должен быть экземпляром класса Product')
    }
    remove(index) {
        return this.products.splice(index, 1);
    }
    cost() {
        const baseCurrencyRate = this.currencies[this.baseCurrency] || 0
        const cost = this.products.reduce((sum, item) => {
            const rate = (this.currencies[item.currency] || 0) / baseCurrencyRate;
            if (!rate) {
                return sum
            }
            return sum + (item.price / rate)
        }, 0)
        return `${(cost).toFixed(2)} ${this._baseCurrency}`
    }
    summary() {
        return `В корзине: ${this.products.length} товаров на сумму ${this.cost()}`
    }
    toString() {
        this.summary()
        return ''
    }
    setCurrency(currency) {
        this._baseCurrency = currency || 'RUB'
    }
}

class Printer {
    constructor(prop, source) {
        this[prop] = source || null
        return this;
    }
    to(domId) {
        if (!domId) {
            throw Error('Не передан ID элемента')
        }
        this._domElement = document.getElementById(domId);
        return this;
    }
}

class CartPrinter extends Printer {
    constructor(cart) {
        if (!cart instanceof Cart) {
            throw new Error('Не передана корзина');
        }
        super('_cart', cart || (new Cart([])));
    }
    print() {
        const container = document.createElement('div')
        container.className = 'products cart'
        if (this._cart.products.length < 1) {
            container.innerHTML = '<p>Корзина пуста</p>'
            this._domElement.innerHTML = '';
            this._domElement.appendChild(container);
            return;
        }
        this._cart.products.forEach((product, index) => {
            const row = document.createElement('div');
            row.className = 'row';
            row.innerHTML = product.html();

            const actions = document.createElement('div');
            actions.className = 'row__actions';

            const remove = document.createElement('a');
            remove.className = 'btn btn-circle btn-red';
            remove.addEventListener('click', () => {
                initCart();
                window.cart.remove(index);
                generateCart();
            })
            remove.innerHTML = '<b>&ndash;</b>';

            actions.appendChild(remove);
            row.appendChild(actions);
            container.appendChild(row);
        })

        const summary = document.createElement('div');
        summary.className = 'cart__summary';
        summary.innerHTML = this._cart.summary();
        container.appendChild(summary);

        const currencies = document.createElement('div')
        currencies.className = 'cart__currency';
        const currenciesTitle = document.createElement('h4');
        currenciesTitle.innerHTML = 'Суммировать в';
        currencies.appendChild(currenciesTitle);
        Object.keys(this._cart.currencies).sort().forEach((item) => {
            const currency = document.createElement('a');
            currency.className = `btn btn-round ${this._cart.baseCurrency === item ? 'btn-orange' : ''}`;
            currency.innerHTML = item;
            currency.addEventListener('click', () => {
                this._cart.setCurrency(item)
                generateCart();
            })
            currencies.appendChild(currency);
        })
        container.appendChild(currencies);

        this._domElement.innerHTML = '';
        this._domElement.appendChild(container);
    }
}

class CatalogPrinter extends Printer {
    constructor(products) {
        if (!Array.isArray(products)) {
            throw new Error('Не передан список товаров');
        }
        super('_products', products || []);
    }
    print() {
        const container = document.createElement('div');
        container.className = 'products';
        if (this._products.length < 1) {
            container.innerHTML = '<p>Каталог пуст</p>'
        } else {
            this._products.forEach((product) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = product.html();

                const cardActions = document.createElement('div');
                cardActions.className = 'card__actions';

                const toCart = document.createElement('a');
                toCart.className = 'btn btn-orange btn-block';
                toCart.addEventListener('click', () => {
                    initCart();
                    window.cart.add(product);
                    generateCart();
                })
                toCart.innerHTML = 'В корзину';

                cardActions.appendChild(toCart);
                card.appendChild(cardActions);
                container.appendChild(card);
            });
        }
        this._domElement.innerHTML = '';
        this._domElement.appendChild(container);
    }
}

const generateChessBoard = () => {
    const el = document.getElementById('chess-board');

    const board = document.createElement('table');
    board.className = 'chess-table'
    const tbody = document.createElement('tbody');
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let col = 8; col > 0; col--) {
        const tr = document.createElement('tr');
        const firstTd = document.createElement('td');
        firstTd.innerHTML = `${col}`;
        tr.appendChild(firstTd)
        for (let row = 0; row < 8; row++) {
            const td = document.createElement('td');
            td.className = (col + row) % 2 ? 'black' : 'white';
            td.innerHTML = `${col}${chars[row]}`;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    const charsTr = document.createElement('tr')
    charsTr.appendChild(document.createElement('td'))
    chars.forEach((char) => {
        const charTd = document.createElement('td')
        charTd.innerHTML = `${char}`
        charsTr.appendChild(charTd)
    })
    tbody.appendChild(charsTr)
    board.appendChild(tbody);
    el.innerHTML = board.outerHTML
}

const initCart = () => {
    if (!window.products) {
        window['cart'] = new Cart([
            new Product('Product 3', 30, 'RUB'),
            new Product('Product 3', 30, 'RUB'),
            new Product('Product 3', 30, 'RUB'),
            new Product('Product 1', 1, 'USD'),
            new Product('Product 2', 20, 'EUR'),
        ], 'RUB');
    }
}

const initProducts = () => {
    if (!window.products) {
        window['products'] = [
            new Product('Product 1', 1, 'USD'),
            new Product('Product 2', 20, 'EUR'),
            new Product('Product 3', 30, 'RUB'),
        ];
    }
}

const generateCart = () => {
    (new CartPrinter(window.cart)).to('cart').print();
}

const generateCatalog = () => {
    (new CatalogPrinter(window.products)).to('catalog').print();
}
