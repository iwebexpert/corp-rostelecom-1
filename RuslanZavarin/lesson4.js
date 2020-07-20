// 1)Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 надо получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.

class Num {
    constructor(number) {
        if (number > 999 || number < 0) {
            console.log('Введенное чисто не входит в заданный диапазон');
        } else {
            number += '';
            this.units = number[2];
            this.dozens = number[1];
            this.hundreds = number[0];
            console.log(this.Num);
        }
    }
}
new Num(245);

// 2) Продолжить работу с интернет-магазином:
//В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
//Реализуйте такие объекты.
//Перенести функционал подсчета корзины на объектно-ориентированную базу.

class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    cost() {
        return this.price * this.quantity;
    }
}
const keyboard = new Product('Keyboard', 1000, 1);
const mouse = new Product('Mouse', 700, 2);
const video = new Product('Videocard', 25000, 1);
const monitor = new Product('Monitor', 7000, 2);

const totalBasket = [keyboard, mouse, video, monitor];

const countPrice = (baskets) => {
    let totalPrice = 0;
    for (let i of baskets) {
        totalPrice += i.cost();
    }
    return totalPrice;
};
console.log(countPrice(totalBasket));
