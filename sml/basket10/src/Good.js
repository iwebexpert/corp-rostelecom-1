/**
 * @class Good - Класс Продукт, описывает товары продаваемые в магазине
 * @var id - идентификатор продукта
 * @var quantity - количество в корзине или на складе
 * @var price - цена продукта
 * @var currency - валюта
 * @var name - наименование продукта
 * @var imgLink - ссылка на картинку продукта
 */

class Good {
  /**
   * конструктор класса Продукт, заполняет данные о продукте
   * @param id - идентифтиикатор продукта
   * @param quantity - количество в корзине или на складе
   * @param price - цена продукта
   * @param currency - валюта
   * @param name - наименование продукта
   * @param imgLink - ссылка на картинку
   */
  constructor(id, quantity, price, currency, name, imgLink) {
    this.id = id;
    this.quantity = quantity;
    this.price = price;
    this.currency = currency;
    this.name = name;
    this.imgLink = imgLink;
  }
}
