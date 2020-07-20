/**
 * Домашнее задание #4
 * @author  Сорванов Михаил Леонидович [CorpRostelecom-1]
 */

/**
 Написать  функцию,  преобразующую  число  в  объект.  Передавая  на  вход  число  от  0  до  999,  надо
получить  на  выходе  объект,  в  котором  в  соответствующих  свойствах  описаны  единицы,  десятки  и
сотни.  Например,  для  числа  245  надо  получить  следующий  объект:  {‘единицы’:  5,  ‘десятки’:  4,
‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью
console.log и вернуть пустой объект.
 */

/**
 * @class Num2obj Класс разбивает число от 0 до 999 на состовные части: единицы, десятки, сотни.
 * @var one - количество единиц
 * @var ten - количество десятков
 * @var hundred - количество сотен
 */
class Num2obj {
  /**
   * Конструктор разбивает число на состовные части: единицы, десятки, сотни.
   * @param num3 - число от 0 до 999
   */
  constructor(num3) {
    num3 += '';
    if (num3.length == 1) {
      this.one = num3[0] * 1;
      this.ten = 0;
      this.hundred = 0;
    } else if (num3.length == 2) {
      this.one = num3[1] * 1;
      this.ten = num3[0] * 1;
      this.hundred = 0;
    } else {
      this.one = num3[2] * 1;
      this.ten = num3[1] * 1;
      this.hundred = num3[0] * 1;
    }
  }
}

/**
 * Функция преобразует число в объект класса Num2obj
 * @param inNum - число от 0 до 999
 * @return Объект класса Num2obj, если число больше 999 возвращает пустой объект.
 */
function numberToObject(inNum) {
  if (inNum > 999) {
    console.log('Число ' + inNum + ' больше 999. Объект не создан.');
    return {};
  }
  const myNum = new Num2obj(inNum);
  return myNum;
}

/**
 * @example  Пример использования функции numberToObject
 */
console.log(numberToObject(789))



/**

2.Продолжить работу с интернет-магазином:
 a.  В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
 b.  Реализуйте такие объекты.
 c.  Перенести функционал подсчета корзины на объектно-ориентированную базу.
 3.* Подумать  над  глобальными  сущностями.  К  примеру,  сущность  «Продукт»  в  интернет-магазине
актуальна  не  только  для  корзины,  но  и  для  каталога.  Стремиться  нужно  к  тому,  чтобы  объект
«Продукт»  имел  единую  структуру  для  различных  модулей  сайта,  но  в  разных  местах  давал
возможность вызывать разные методы.

 */

/**
 * @class Good - Класс Продукт, описывает товары продаваемые в магазине
 * @var name - наименование продукта
 * @var price - цена продукта
 * @var currency - валюта
 * @var quantity - количество в корзине или на складе
 */
class Good {
  /**
   * конструктор класса Продукт, заполняет данные о продукте
   * @param {*} name - наименование продукта
   * @param {*} price - цена продукта
   * @param {*} currency - валюта
   * @param {*} quantity - количество в корзине или на складе
   */
  constructor(name, price, currency, quantity) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.quantity = quantity;
  }
}

/**
 * @class Basket - Класс корзины покупателя. Можно использовать как класс товаров на складе
 * @var items - массив объектов Продуктов, класса Good
 */
class Basket {
  /**
   * Конструктор класса инициализирует массив объектов Продуктов
   */
  constructor() {
    this.items = [];
  }
  /**
   * Функция добавляет в массив объект Продуктов класса Good
   * @param Good 
   */
  addGood(Good) {
    this.items.push(Good);
  }
  /**
   * Функция создает объект Продуктов, класса Good и добавляет его в массив объектов Продукты Корзины
   * @param name - наименование продукта
   * @param price - цена продукта
   * @param currency - валюта
   * @param quantity - количество в корзине или на складе
   */
  add(name, price, currency, quantity) {
    const newObj = new Good(name, price, currency, quantity);
    this.items.push(newObj)
  }
  /**
   * Подсчитывает сумму корзины / сумму товаров на складе
   * @returns Возвращает сумму корзины
   */
  countBasketPrice() {
    let sumBasket = 0;
    for (let i = 0; i < this.items.length; i++) {
      sumBasket += Math.floor(this.items[i].price * this.items[i].quantity * 100) / 100;
    }
    return sumBasket.toFixed(2);
  }
  /**
   * Показывает товары в корзины / товары на складе
   */
  show() {
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i].name, this.items[i].price, this.items[i].currency, this.items[i].quantity);
    }
  }
}

/**
 * @example  Пример использования класса Basket, наполнение корзины, вывод корзины и подсчет суммы
 */

const myBacket = new Basket();
myBacket.add("Apple", 179, "RUB", 0.5);
myBacket.add("Egg", 79, "RUB", 1);
myBacket.add("Carro", 49, "RUB", 0.3);
myBacket.add("Bread", 35, "RUB", 1);
myBacket.add("Milk", 52, "RUB", 1);


const myGood = new Good("Meat", 399, "RUB", 0.8);
myBacket.addGood(myGood);

myBacket.show();
console.log('Стоимость выбранной корзины:', myBacket.countBasketPrice());
