/**
 * Практическое задание
 */

/**
 * Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, надо получить на выходе объект,
 * в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 надо получить
 * следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать
 * соответствующее сообщение с помощью console.log и вернуть пустой объект.
 */

console.log('Задание № 1:')

function IntToObject(int) {
    if (int > 999  || int < 0) {
        console.log("The number must be between 0 and 999")
        return new Object
    }

    this.hundreds = Math.floor(int / 100);
    this.tens = Math.floor(int / 10 % 10);
    this.units = Math.floor(int % 10);

    console.log(this.hundreds, this.tens, this.units)

    return this;
}

let intObject = new IntToObject(11111);

console.log(intObject)


/**
 * Продолжить работу с интернет-магазином:
 * В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
 * Реализуйте такие объекты.
 * Перенести функционал подсчета корзины на объектно-ориентированную базу.
 */

console.log('Задание № 2:')

class Item {
    Item(name, amount, currency, price) {
        this.name = name;
        this.amount = amount;
        this.currency = currency;
        this.price = price;
    }
}

const shoppingCart = {
    items: [],
    countBasketPrice : function() {
    let purchaseValue = 0;

    for (let i = 0; i < this.items.length; i++) {
        purchaseValue += this.items[i].price * this.items[i].amount;
    }
    return purchaseValue;
}

}

    /**
 * Подумать над глобальными сущностями. К примеру, сущность «Продукт» в интернет-магазине актуальна не только для
 * корзины, но и для каталога. Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для различных
 * модулей сайта, но в разных местах давал возможность вызывать разные методы.
 */

console.log('Задание № 3:')