// Task 4-1
// Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, надо получить на выходе объект,
// в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 надо получить следующий объект:
// {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с
// помощью console.log и вернуть пустой объект.

console.log('Task 4-1')
const numObj = {
    unit: 0,
    ten: 0,
    hundred: 0
};

function numberToObject(num) {
    if (num > 1000 || num < 0) {
        console.log('Некорректное число! Введите число от 0 до 999');
        return {};
    }
    numObj.unit = num % 10;
    numObj.ten = parseInt(num / 10 % 10);
    numObj.hundred = parseInt(num / 100);
    return numObj;
}

console.log(numberToObject(183));
console.log(numberToObject(1234));


//Task 4-2
// 2.	Продолжить работу с интернет-магазином:
// a.	В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// b.	Реализуйте такие объекты.
// c.	Перенести функционал подсчета корзины на объектно-ориентированную базу.

console.log('Task 4-2')

class Good {
    constructor(name, price, currency, quantity) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.quantity = quantity;
    }
    show() {
        return `На складе: ${this.name}, Цена: ${this.price}, Валюта: ${this.currency}, Кол-во: ${this.quantity}`;
    }
}

class Basket {
    constructor() {
        this.items = [];
    }

    addBasket(name, price, currency, quantity) {
        const addGood = new Good(name, price, currency, quantity);
        this.items.push(addGood);
    }

    show() {
        for (let i = 0; i < this.items.length; i++) {
            console.log(`Наименование: ${this.items[i].name}, Цена: ${this.items[i].price}, Валюта: ${this.items[i].currency}, Кол-во: ${this.items[i].quantity}`);
        }
    }

    countBasketPrice() {
        let ammount = 0;
        for (let i = 0; i < this.items.length; i++) {
            ammount += this.items[i].price * this.items[i].quantity;
        }
        return ammount;
    }
}


const userBasket = new Basket();
userBasket.addBasket("Keyboard", 1250, "RUB", 1);
userBasket.addBasket("Mouse", 720, "RUB", 1);
userBasket.addBasket("Speaker", 2200, "RUB", 1);
userBasket.addBasket("Monitor", 7800, "RUB", 1);
userBasket.addBasket("Flash USB", 440, "RUB", 2);

userBasket.show();
console.log(`Общая стоимость товаров в корзине: ${userBasket.countBasketPrice()}`);


const keyboard = new Good("Keyboard", 1500, "RUB", 10);
console.log(keyboard.show());

