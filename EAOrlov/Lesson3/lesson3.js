console.log('Домашняя работа к уроку 3');
// Задание 1
// Здесь масса вариантов, через for выглядит проще, также множно сделать с continue/next. 
// Я сделал самый стандартный вариант
console.log('Задание 1');
let count = 0;
let i = 2;
let j = 2;                              // задаем счетчики 
while (i <= 100) {                      // перебираем числа от 2 до 100
    while (j < i) {                     // перебираем числа от 2 до i
        if (i % j == 0) {               // если i делится на j - увеличиваем счетчик count 
            count++;
        }
        j++;
    };
    if (count === 0) {                  // проверяем, если счетчик = 0, то число простое
        console.log(i + ' - простое число');
    };
    count = 0;                          // обнуляем счетчик count для каждого i
    i++;
    j = 2;
};

// Задание 2-3
console.log('Задание 2-3');
const shop = [
    ["Keyboard", 1000, "RUB", 1],   // Наименование, цена, валюта, количество в корзине
    ["Mouse", 700, "RUB", 2],
    ["VideoCard", 5000, "RUB", 1],
    ["Ram", 3000, "RUB", 2],
    ["Game", 300, "RUB", 3]
];

// Подсчет суммы стоимости товаров
function countBasketPrice(items) {
    let amount = 0;
    for (item of items) {
        amount = amount + item[1] * item[3];
    }
    return amount;
};

// Подсчет кол-ва товаров
function countBasketItem(items) {
    let count_item = 0;             // Кол-во товаров
    for (item of items) {
        count_item = count_item + item[3];
    }
    return count_item;
};

// Вывод результата
console.log('Вы выбрали ' + countBasketItem(shop) + ' товаров, на общую стоимость: ', countBasketPrice(shop));

// Задание 4
console.log('Задание 4');
for (i = 0; i < 10; console.log(i), i++);


// Задание 5
console.log('Задание 5');
let star = '*';
let text = '';
for (i = 0; i < 20; i++) {
    text = text + star;
    console.log(text);
}
