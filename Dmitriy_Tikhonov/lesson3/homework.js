/*
С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/

let i = 0;
while (i < 100) {
	i++;
	if (i % 2) {
		console.log(i);
	}
}

/*
Корзина магазина
*/

let products = [
	["Keyboard", 3000, "RUB", 2],
	["Mouse", 700, "RUB", 2],
	["Iphone", 14000, "RUB", 1]
];

function countBasketPrice(items) {
	let ammount = 0;

	for (i = 0; i < items.length; i++)
		ammount += items[i][1] * items[i][3];

	return ammount;
}

console.log('Общая стоимость товаров: ', countBasketPrice(products));

/*
Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
*/

for (i = 0; i < 10; console.log(i++)) {

};

/*
Пирамида
*/

let pyramids = 'x';
let text = '';
for (i = 0; i < 20; i++) {
	text = text + pyramids;
	console.log(text);
}
