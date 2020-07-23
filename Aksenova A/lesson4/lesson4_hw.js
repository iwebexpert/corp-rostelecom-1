// Задание 1.

function numberToObject(number) {
    if (number > 999  || number < 0) {
        console.log("Введите число от 0 до 999")
        return new Object
    }

    this.hundreds = Math.floor(number / 100);
    this.dozens = Math.floor(number / 10 % 10);
    this.units = Math.floor(number % 10);

    console.log(this.hundreds, this.dozens, this.units)

    return this;
}

const number = new numberToObject(24);


// Задание 2.

class Item {
    constructor(name, price, currency, amount) {
        this.__name = name;
        this.__price = price;
        this.__currency = currency;
        this.__amount = amount;
    }
  
     cost() {
        return this.__price * this.__amount;
    }
}
const potato = new Item("Картошка", 30, "RUB", 6);
const carrot = new Item("Морковка", 20, "RUB", 4);
const egg = new Item("Яйца", 70, "RUB", 5);
const peas = new Item("Горошек", 60, "RUB", 2);

const basket = [potato, carrot, egg, peas];

const countBasketPrice = (items) => {
    let totalAmount = 0;
    for (let i of items) {
        totalAmount += i.cost();
    }
    return totalAmount;
};

console.log(countBasketPrice(basket));
