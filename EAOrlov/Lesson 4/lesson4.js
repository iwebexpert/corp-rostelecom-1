console.log('Домашняя работа к уроку 4');
// Задание 1
console.log('Задание 1');
function EnterNumber(num) {
    itog = {};
    if (num < 999) {
        let hundred = Math.trunc(num / 100);
        let num2 = (num - hundred * 100);
        let decade = Math.trunc(num2 / 10);
        let units = (num2 % 10);
        const itog = { 'единицы': units, 'десятки': decade, 'сотни': hundred };
        return itog;
    }
    else {
        console.log('Число больше 999');
        return itog;
    }
};
// Проверка работы функции на двухзначном числе
console.log('Проверка работы функции на числе 76');
console.log(EnterNumber(76));

// Проверка работы функции на трехзначном числе
console.log('Проверка работы функции на числе 456');
console.log(EnterNumber(456));

// Проверка работы функции на четырехзначном числе
console.log('Проверка работы функции на числе 6076');
console.log(EnterNumber(6076));

// Задание 2 и 3 (вместе)
console.log('Задание 2 и 3 (вместе)');


// Создаем класс "Товар" у которого есть св-ва: id, артикул, наименование, описание, производитель,  цена) и метод добавдения товара в сущность Продукты
class Item {
    constructor(id, article, name, description, manufacturer, price) {
        this.id = id;
        this.article = article;
        this.name = name;
        this.description = description;
        this.price = price;
        this.manufacturer = manufacturer;
    }
    addProduct() {
        let newitem = { id: this.id, article: this.article, name: this.name, description: this.description, price: this.price };
        product.items.push(newitem);
    }
}

// Создаем объект-сущность Продукты, в которой есть массив объектов с классом "Товар" и метод добавления товара в корзину по id
const product = {
    items: [],
    addbasket: function (id, count) {
        for (let item of this.items) {
            if (item.id == id) {
                let newitem = { id: id, count: count, name: item.name, price: item.price };
                basket.items.push(newitem);
            }
        };
    },
};

// Создаем объект-сущность Корзина, в которой есть массив объектов с классом "Товар"
// И методы подсчета суммы товаров и вывода содержимого корзины в консоль и на html-страницу (для наглядности)
const basket = {
    items: [],
    countBasketPrice: function () {
        let sumbasket = 0;
        for (let item of this.items) {
            sumbasket += (item.price * item.count);
        };
        return sumbasket;
    },
    displaybasket: function () {
        console.log('Содержимое Корзины:');
        document.write('<h1>Содержимое Корзины:</h1>');
        for (let item of this.items) {
            console.log(item.name + ' (цена: ' + item.price + ') в количестве: ' + item.count + ' шт.');
            document.write('<p>' + item.name + ' (цена: ' + item.price + ') в количестве: ' + item.count + ' шт.</p>');
        };
        console.log('Общая сумма покупки: ' + this.countBasketPrice());
        document.write('<p>Общая сумма покупки: ' + this.countBasketPrice() + '</p>');
    },
};

// Создаем несколько разных товаров и добавляем их в сущность "Продукты"
let newitem = new Item(1, '000001', 'Компьютерная мышь', 'Супермышь', 'Logitech', 700);
newitem.addProduct();
newitem = new Item(2, '000002', 'Компьютерная клавиатура', 'Суперклава', 'Logitech', 1000);
newitem.addProduct();
newitem = new Item(3, '000003', 'Монитор', 'Супермонитор', 'Philips', 5000);
newitem.addProduct();
newitem = new Item(4, '000004', 'Видеокарта', 'Супервидео', 'Nvidia', 8000);
newitem.addProduct();
newitem = new Item(5, '000005', 'Процессор', 'Суперпроц', 'AMD', 10000);
newitem.addProduct();
newitem = new Item(6, '000006', 'Оперативная память', 'Суперпамять', 'Patriot', 2000);
newitem.addProduct();

// Добавим немного товаров в корзину
product.addbasket(1, 2);
product.addbasket(3, 1);
product.addbasket(4, 1);
product.addbasket(6, 4);

// Вывод корзины
basket.displaybasket();

// Что еще можно улучшить:
// 1) Расширить класс Товар, добавив такие параметры товара как: марка, модель, кол-во на складе
// 2) Улучшить функцию добавления товара в сущность Продукт сделав проверку при добавлении на уникальность id и артикула
// 3) Улучшить функцию добавления товара в сущность Корзина сделав проверку при добавлении на наличие на складе и кол-во на складе
