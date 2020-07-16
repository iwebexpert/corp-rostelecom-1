//1) С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
let i = 1;

let filterArray = [];
while (i < 100) {
    i++;
    let isDigit = true;
    for (let x = 2; x < i; x++) {
        if (i % x === 0 || i == 2) {
            isDigit = false;
        }
    }
    if (isDigit) {
        filterArray.push(i);
    }
}
console.log(filterArray);

//2) Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.

const product = [
    { name: 'Mouse', price: 500 },
    { name: 'Keyboard', price: 1300 },
    { name: 'SSD', price: 1500 },
];
const countBasketPrice = () => {
    let countPrice = 0;
    for (let i = 0; i < product.length; i++) {
        countPrice += product[i].price;
    }
    return countPrice;
};
console.log(countBasketPrice(product));

//3) Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
for (let i = 0; i <= 9; console.log(i++));

//4) Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
let star = 'x';
let starPiramids = (i) => {
    let newStar = '';
    for (let y = 1; y <= i; y++) {
        console.log((newStar = newStar + star));
    }
};
starPiramids(5);
