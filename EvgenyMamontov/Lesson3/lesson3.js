/**
 * Практическое задание
 */

/**
 * 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
 */

console.log('Задание № 1:')

let i = 2;
while (i <= 100) {
    let j = 2;
    while (j <= i) {
        if (i == j) {
            console.log(i);
        }
        if (i % j == 0) {
            break;
        }
        j++;
    }
    i++;
}

/** 2. С этого урока начинаем работать с функционалом интернет-магазина.
 * Предположим, есть сущность корзины. Нужно реализовать функционал подсчета
 * стоимости корзины в зависимости от находящихся в ней товаров.
 */

console.log('Задание № 2:')

const shoppingCart = [
    ["Item1", 100, "RUB", 1],
    ["Item2", 200, "RUB", 3],
    ["Item3", 300, "RUB", 5],
]

let purchaseValue = 0;

for (let i = 0; i < shoppingCart.length; i++) {
    purchaseValue += shoppingCart[i][1] * shoppingCart[i][3];
}
console.log("В корзине товаров на сумму: ", purchaseValue);


/** 3. Товары в корзине хранятся в массиве. Задачи:
 * Организовать такой массив для хранения товаров в корзине;
 * Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
 *
 */

console.log('Задание № 3:')

function countBasketPrice (goods) {
    let purchaseValue = 0;

    for (let i = 0; i < goods.length; i++) {
        purchaseValue += goods[i][1] * goods[i][3];
    }
    return purchaseValue;
}

console.log("В корзине товаров на сумму: ", countBasketPrice(shoppingCart));

/**
 * Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
 *     for(...){// здесь пусто}
 */

console.log('Задание № 4:')

for (let i = 0; i <= 9; console.log(i++)) { }

/**
 * Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
 */

console.log('Задание № 5:')

for (let i = 0; i < 20; i++){
    let asterisk = "*"
    for (let j = 0; j < i; j++)
        asterisk += "*";
    console.log(asterisk)
}

