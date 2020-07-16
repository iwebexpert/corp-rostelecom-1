// зад1
console.log('-_-Задание 1-_-');

let i = 1;
next:
while (++i <= 100) {
    let j = 1;
    while (++j < i) {
        if (i % j == 0) {
            continue next;
        }
    }
    console.log(i);
}

// зад2
console.log('-_-Задание 2-_-');

// структура вложенного массива ["Что", почем, сколько]
let basket = [["Яблоки", 98, 39], ["Черешня", 348, 53], ["Пельмени", 320, 5], ["Шаурма", 165, 2]];
console.log(`${basket[0]}/${basket[1]}/${basket[2]}/${basket[3]}`);
// Функция подстчета корзины
function countBasketPrice(baskets) {
    let sum = 0;
    for (let i = 0; i < baskets.length; i++) {
        sum += baskets[i][1] * baskets[i][2];
    }
    console.log(`Сумма корзины: ${sum} RUB`);
}
countBasketPrice(basket);
// зад3
console.log('-_-Задание 3-_-');

for (let i = 0; i <= 9; console.log(i++)) { }
// зад4
console.log('-_-Задание 4-_-');

for (let i = 'x'; i.length <= 20; i += 'x') {
    console.log(i);
    if (i.length == 20) console.log(`можешь не считать тут их ${i.length}`);
}
//