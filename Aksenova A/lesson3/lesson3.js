// Задание 1

let numb = 1;
let result = [];

while (numb <= 100) {
    if (numb == 1) {
        result.push(1)
    } else {
        let i = 2;
        let j = 2;
        while (numb % i !== 0) {
            i += 1;
            j += 1;
        }
        if (j == numb) {
            result.push(j);
        }
    }
    numb += 1;
}

console.log('Простые числа:', result);


// Задание 2

const shop = [
    ["Картошка", 30, "RUB", 3],
    ["Морковка", 20, "RUB", 1],
    ["Курочка", 300, "RUB", 1],
    ["Яйца", 70, "RUB", 2],
    ["Горошек", 60, "RUB", 2]
];

function countBasketPrice(items) {
    let ammount = 0;

    for (let i = 0; i < basket.length; i++) {
        ammount = ammount + basket[i][1] * basket[i][3];
    }

    return ammount;
}

console.log('Общая стоимость продуктов для салата:', countBasketPrice(basket));

// Задание 3

for (let i = 0; i <= 9; console.log(i++)) {};

// Задание 4

let star = '*';

for (let i = 0; i <= 20; i++) {
    console.log(star);
    star = star + '*';
};
