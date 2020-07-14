// HW-1
// С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

console.log('HW-1:');
let prime = 1;
while (prime <= 100) {
    if (prime === 1) {
        console.log('простое число: ', prime);
    } else {
        let div = 2;
        while (div !== prime) {
            if (prime % div === 0) {
                break;
            }
            div++;
            if (prime === div) {
                console.log('простое число: ', prime);
            }
        }
    }
    prime++;
}


// HW-2
// Организовать такой массив для хранения товаров в корзине;
// Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

console.log('HW-2:');
const shop = [
    ["Keyboard", 1000, "RUB", 1],
    ["Mouse", 700, "RUB", 2],
    ["Speaker", 1500, "RUB", 1],
    ["Monitor", 15500, "RUB", 1],
    ["Flash USB", 500, "RUB", 3],
];

function countBasketPrice(items) {
    let ammount = 0;
    for (let i = 0; i < items.length; i++) {
        ammount += items[i][1] * items[i][3];
    }
    return ammount;
}

console.log('Общая стоимость товаров: ', countBasketPrice(shop), shop[0][2]);


// HW-3
// Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.

console.log('HW-3:');
for (let i = 0; i < 10; console.log(i++)) {
}


// HW-4
// Нарисовать пирамиду из 20 рядов с помощью console.log

console.log('HW-4:');
let str = '*';
console.log(str);
for (let i = 1; i < 20; i++) {
    console.log(str += '*');
}

