/* ДЗ 4 */
const numberToObject = (number = null) => {
    if (!number && number !== 0) {
        console.error('Ошибка! Не передано число')
        return {}
    }
    if (number < 0 || number > 999) {
        console.error('Ошибка! Число должно быть от 0 до 999 включительно')
        return {}
    }
    const parts = `${number}`.padStart(3, '0').split('')
    return {
        'единицы': parts[2],
        'десятки': parts[1],
        'сотни': parts[0]
    }
};

class Product {
    constructor(name, price = 1, currency = 'RUB') {
        this._name = name || ''
        this._price = price || 1
        this._currency = currency || 'RUB'
    }
    get name() { return this._name }
    get price() { return this._price }
    get currency() { return this._currency }
    toString() { return `${this._name} стоит ${this._price} ${this._currency}` }
}

class Cart {
    constructor(items, baseCurrency = 'RUB') {
        this._products = items || [];
        this._currencies = {
            "CAD": 0.0190321818, "HKD": 0.1090175, "ISK": 1.9707151725, "PHP": 0.6958964783, "DKK": 0.0917023038, "HUF": 4.3611926768, "CZK": 0.3287768756, "GBP": 0.0111930463, "RON": 0.05965478, "SEK": 0.1274806377, "IDR": 205.6069310053, "INR": 1.0574796031, "BRL": 0.0753231973, "RUB": 1.0, "HRK": 0.0928157578, "JPY": 1.5056263918, "THB": 0.4452338254, "CHF": 0.0132863154, "EUR": 0.0123169698, "MYR": 0.0600513864, "BGN": 0.0240895296, "TRY": 0.0964665077, "CNY": 0.0983645527, "NOK": 0.1307421713, "NZD": 0.0214795637, "ZAR": 0.2342453639, "USD": 0.0140585894, "MXN": 0.3141455472, "SGD": 0.0195692017, "AUD": 0.0201234653, "ILS": 0.0482911436, "KRW": 16.920314132, "PLN": 0.055337682
        }
        this._baseCurrency = baseCurrency || 'RUB'
    }
    get baseCurrency() { return this._baseCurrency || 'RUB' }
    get products() { return this._products || [] }
    get currencies() { return null }
    add(product = {}) {
        if (product instanceof Product) {
            this._products.push(product);
            return true;
        } else {
            console.error('Ошибка! Товар должен быть экземпляром класса Product')
            return false;
        }
    }
    remove(name) {
        const index = this.products.findIndex(p => p.name === name) || -1
        if (index < 0) {
            console.error(`Нет товара с именем «${name}»`);
            return null;
        }
        return this.products.splice(index, 1);
    }
    cost() {
        const cost = this.products.reduce((sum, item) => {
            const rate = this._currencies[item.currency] || 0
            if (!rate) {
                return sum
            }
            return sum + (item.price / rate)
        }, 0)
        return `${(cost).toFixed(2)} ${this._baseCurrency}`
    }
    print(withCost = false) {
        console.group('Товары в корзине')
        this.products.forEach((item) => {
            console.log(`${item}`);
        })
        if (withCost) {
            console.log('Итого', this.cost())
        }
        console.groupEnd();
    }
    toString() {
        this.print()
        return ''
    }
}

class HtmlProduct extends Product {
    html() {
        return `<div class="product">${this.toString()}</div>`
    }
    toString() {
        return this.html()
    }
}
class CatalogProduct extends HtmlProduct {
    html() {
        return `<div class="product card">
            <div class="product__name">${this._name}</div>
            <div class="product__price">
                <div class="price__text">${this._price}</div>
                <div class="price__currency">${this._currency}</div>
            </div>
        </div>`
    }
}
class CartProduct extends HtmlProduct {
    html() {
        return '<div class="product row">' +
            `<b>${this._name}</b> стоит ` +
            `<span class="price__text">${this._price}</span>` +
            `<span class="price__currency">${this._currency}</span>` +
            '</div>'
    }
}

/* Вывод результатов в консоль */

// Задание 1
console.group('1. Число в объект');
console.group('1.1. Нет числа:');
console.log(numberToObject());
console.groupEnd();
console.group('1.2. 0:');
console.log(numberToObject(0));
console.groupEnd();
console.group('1.3. 99:');
console.log(numberToObject(99));
console.groupEnd();
console.group('1.4. 529:');
console.log(numberToObject(529));
console.groupEnd();
console.group('1.5. 245:');
console.log(numberToObject(245));
console.groupEnd();
console.group('1.6. 999:');
console.log(numberToObject(999));
console.groupEnd();
console.group('1.7. 1000:');
console.log(numberToObject(1000));
console.groupEnd();
console.groupEnd();
console.log('\n\n')

// Задание 2
console.group('2. Корзина на ООП');
const cart = new Cart([
    new Product('Product 1', 1, 'USD'),
    new Product('Product 2', 20, 'USD'),
    new Product('Product 3', 30, 'USD'),
]);
const product = new Product('Product 4')

console.group('2.1. Добавляем правильный товар');
console.log(cart.add(product) ? 'Добавлен' : 'Не добавлен');
console.groupEnd();
console.group('2.2. Добавляем неправильный товар');
console.log(cart.add({}) ? 'Добавлен' : 'Не добавлен');
console.groupEnd();

console.group('2.3. Удаляем товар');
console.log('Существующий', cart.remove('Product 2'));
console.log('Несуществующий', cart.remove('Product 5'));
console.groupEnd();

console.group('2.5. Выводим товары корзины');
cart.print();
console.groupEnd();

console.group('2.6. Выводим стоимость корзины');
console.log(cart.cost());
console.groupEnd();

console.groupEnd();
console.log('\n\n')

// Задание 3
console.group('3. Глобальные сущности (через наследование)');
console.group('3.1. Товар в корзине');
const cartProduct = new CartProduct('Product 5', 1, 'EUR')
console.log(cartProduct.html());
console.groupEnd();

console.group('3.2. Товар в каталоге');
const catalogProduct = new CatalogProduct('Product 6')
console.log(`${catalogProduct}`);
console.groupEnd();

console.groupEnd();
console.groupEnd();