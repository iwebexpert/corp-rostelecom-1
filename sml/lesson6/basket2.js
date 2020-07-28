/**
 * Домашнее задание #6
 * @author  Сорванов Михаил Леонидович [CorpRostelecom-1]
 */

/**
1.  Продолжаем реализовывать модуль корзины:
a.  Добавлять  в  объект  корзины  выбранные  товары  по  клику  на  кнопке  «Купить» без перезагрузки страницы;
b.  Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
*/

/**
 * @class Good - Класс Продукт, описывает товары продаваемые в магазине
 * @var id - идентификатор продукта
 * @var name - наименование продукта
 * @var price - цена продукта
 * @var currency - валюта
 * @var quantity - количество в корзине или на складе
 * @var imgLink - ссылка на картинку продукта
 */
class Good {
  /**
   * конструктор класса Продукт, заполняет данные о продукте
   * @param id - идентифтиикатор продукта
   * @param name - наименование продукта
   * @param price - цена продукта
   * @param currency - валюта
   * @param quantity - количество в корзине или на складе
   * @param imgLink - ссылка на картинку
   */
  constructor(id, name, price, currency, quantity, imgLink) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.quantity = quantity;
    this.imgLink = imgLink;
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
   * @param id - идентифтиикатор продукта
   * @param name - наименование продукта
   * @param price - цена продукта
   * @param currency - валюта
   * @param quantity - количество в корзине или на складе
   * @param imgLink - ссылка на картинку
   */
  add(id, name, price, currency, quantity, imgLink) {
    const newObj = new Good(id, name, price, currency, quantity, imgLink);
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
      console.log(this.items[i].name, this.items[i].price, this.items[i].currency, this.items[i].quantity, this.items[i].imgLink);
    }
  }

  creatBascket() {
    let content = document.getElementById('content');
    let catalogBlock = document.querySelector('#catalog-block');

    let basketBlock = document.createElement('div');
    basketBlock.setAttribute("id", "basket-block");
    content.insertBefore(basketBlock, catalogBlock);

    let basketInfo = document.createElement('div');
    basketInfo.setAttribute("id", "basket-info");
    basketInfo.innerHTML = "Корзина пуста";
    basketBlock.appendChild(basketInfo);

    let basket = document.createElement('div');
    basket.setAttribute("id", "basket");
    basketBlock.appendChild(basket);
  }
  /**
   * Получить данные о покупке
   */
  getGoods(id) {
    // TODO
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        return this.items[i];
      }
    }
    return null;
  }
  /**
   * показывает корзину
   */
  showBasket(newGood) {
    this.addGood(newGood);
    let basketInfo = document.getElementById('basket-info');
    let basket = document.getElementById('basket');
    basketInfo.innerHTML = "Сумма аренды выбранных машин составила: " + this.countBasketPrice() + " руб.";

    let selectName = document.createElement('div');
    selectName.setAttribute("class", "select-name");
    selectName.innerHTML = "Аренда " + newGood.name + " " + newGood.price + " " + newGood.currency + " дней аренды:" + newGood.quantity;
    basket.appendChild(selectName);


  }
}
/**
 *  @class Catalog - Класс каталог товаров на складе
 *  @var items - массив объектов Продуктов, класса Good
 */

class Catalog extends Basket {
  /**
  * Генерирует каталог машин
  */
  creatCatalog() {
    let content = document.getElementById('content');

    let catalogBlock = document.createElement('div');
    catalogBlock.setAttribute("id", "catalog-block");
    content.appendChild(catalogBlock);

    let catalogName = document.createElement('div');
    catalogName.setAttribute("id", "catalog-name");
    catalogName.innerHTML = "Каталог арендуемых машин";
    catalogBlock.appendChild(catalogName);

    let catalog = document.createElement('div');
    catalog.setAttribute("id", "catalog");
    catalogBlock.appendChild(catalog);

    for (let i = 0; i < this.items.length; i++) {
      let card = document.createElement('div');
      card.setAttribute("class", "card");
      catalog.appendChild(card);
      let cardName = document.createElement('div');
      cardName.setAttribute("class", "card-name");
      cardName.innerHTML = this.items[i].name;
      card.appendChild(cardName);
      let cardPrice = document.createElement('div');
      cardPrice.setAttribute("class", "card-price");
      cardPrice.innerHTML = `${this.items[i].price} ${this.items[i].currency} /в сутки`;
      card.appendChild(cardPrice);
      let cardBtn = document.createElement('a');
      cardBtn.setAttribute("href", "#");
      cardBtn.setAttribute("class", "card-btn");
      cardBtn.setAttribute("onclick", "return myChange(this);");
      cardBtn.setAttribute("car-id", this.items[i].id);
      cardBtn.innerHTML = "Купить";
      card.appendChild(cardBtn);
      let cardImg = document.createElement('img');
      cardImg.setAttribute("src", this.items[i].imgLink);
      cardImg.setAttribute("alt", this.items[i].name);
      cardImg.setAttribute("class", "card-img");
      cardImg.setAttribute("idcar", this.items[i].id);
      card.appendChild(cardImg);
    }
  }
}


/**
 * @example  Пример использования класса Basket, наполнение корзины, вывод корзины и подсчет суммы
 */
const myCatalog = new Catalog();
myCatalog.add(1, "RENAULT LOGAN", 1000, "RUB", 1, 'https://avtoarenda29.ru/images/gallery/a02_renaultloganm.jpg');
myCatalog.add(2, "SOLARIS ACTIV PLUS", 1300, "RUB", 1, 'https://avtoarenda29.ru/images/gallery/a07_hyundaisolaris.jpg');
myCatalog.add(3, "LARGUS CROSS", 1300, "RUB", 1, 'https://avtoarenda29.ru/images/gallery/a16_ladalargus.jpg');
myCatalog.add(4, "VOLKSWAGEN POLO", 1400, "RUB", 1, 'https://avtoarenda29.ru/images/gallery/a17_volkswagenpolo.jpg');

myCatalog.creatCatalog();

const myBasket = new Basket();
myBasket.creatBascket();


function myChange(myButton) {
  myBasket.showBasket(myCatalog.getGoods(myButton.getAttribute('car-id')));
  // myBasket.show();

}

