/**
 * Домашнее задание #10
 * @author  Сорванов Михаил Леонидович [CorpRostelecom-1]
 */

/**
 * @class Catalog - Класс каталога товаров в магазине.
 * @Goods  - массив объектов товаров
 */

class Catalog {
  /**
    * Конструктор класса инициализирует массив товаров в каталоге
    */
  constructor() {
    this.Goods = [];
    this.Basket = new Basket();
  }
  /**
   * обработчик событий 
   */
  handlers() {
    const bodyEl = document.body;
    bodyEl.addEventListener('click', events => this.handlersClick(events));
  }
  /**
   * обработчик событий нажатия
   */
  handlersClick(events) {
    if (event.target.classList.contains('card-btn')) {
      this.toBasket(event.target.dataset.id);
    }
    if (event.target.classList.contains('sel-btn-minus')) {
      this.Basket.goodMinus(event.target.dataset.id);
    }
    if (event.target.classList.contains('sel-btn-plus')) {
      this.Basket.goodPlus(event.target.dataset.id);
    }
    if (event.target.classList.contains('sel-btn-del')) {
      this.Basket.goodDel(event.target.dataset.id);
    }
    if (event.target.classList.contains('sel-btn-del')) {
      this.Basket.goodDel(event.target.dataset.id);
    }
    if (event.target.id == 'ctrl-btn-basket') {
      this.Basket.renderBasket()
    }
    if (event.target.id == 'ctrl-btn-address') {
      this.Basket.renderAddress()
    }
    if (event.target.id == 'ctrl-btn-comment') {
      this.Basket.renderComment()
    }
    if (event.target.id == 'ctrl-btn-send') {
      this.Basket.renderSend()
    }
    if (event.target.id == 'save-btn-address') {
      this.Basket.saveAddress(document.getElementById('inp-address').value);
    }
    if (event.target.id == 'save-btn-comment') {
      this.Basket.saveComment(document.getElementById('inp-comment').value);
    }
  }
  /**
   * Заводит выбранный товар из каталога в корзину 
   * @param idGood - идентифтиикатор продукта
   */
  toBasket(idGood) {
    let good = this.getGood(idGood);
    if (good != null && !this.Basket.isGood(idGood) && this.Basket.isStatus('basket')) {
      this.Basket.add(idGood, good.quantity, good.price, good.currency, good.name);
      this.Basket.showNewGoodBasket(good);
    }
  }
  /**
   * по идентификатору продукта возвращает данные о товаре
   * @param idGood - идентифтиикатор продукта
   */
  getGood(idGood) {
    for (let i = 0; i < this.Goods.length; i++) {
      if (this.Goods[i].id == idGood) {
        return this.Goods[i];
      }
    }
    return null;
  }

  /**
   * Функция создает объект Продуктов, класса Good и добавляет его в каталог
   * @param id - идентифтиикатор продукта
   * @param quantity - количество в корзине или на складе
   * @param price - цена продукта
   * @param currency - валюта
   * @param name - наименование продукта
   * @param imgLink - ссылка на картинку*
   */
  add(id, quantity, price, currency = 'руб./шт', name = '', imgLink = '') {
    let newObj = new Good(id, quantity, price, currency, name, imgLink);
    this.Goods.push(newObj);
  }
  /**
  * Для отладки
  * Показывает товары в каталоге складе
  */
  show() {
    for (let i = 0; i < this.Goods.length; i++) {
      console.log(this.Goods[i].name, this.Goods[i].price, this.Goods[i].currency, this.Goods[i].quantity, this.Goods[i].imgLink);
    }
  }
  /**
  * Инициализация 
  */
  init() {
    this.Basket.creat();
    this.creat();
    this.handlers()
  }
  /**
  * Генерирует каталог
  */
  creat() {
    let content = document.getElementById('content');

    let catalogBlock = document.createElement('div');
    catalogBlock.setAttribute("id", "catalog-block");
    content.appendChild(catalogBlock);

    let catalogName = document.createElement('div');
    catalogName.setAttribute("id", "catalog-name");
    catalogName.innerHTML = "Каталог товаров";
    catalogBlock.appendChild(catalogName);

    let catalog = document.createElement('div');
    catalog.setAttribute("id", "catalog");
    catalogBlock.appendChild(catalog);

    for (let i = 0; i < this.Goods.length; i++) {
      let card = document.createElement('div');
      card.setAttribute("class", "card");
      catalog.appendChild(card);
      let cardName = document.createElement('div');
      cardName.setAttribute("class", "card-name");
      cardName.innerHTML = this.Goods[i].name;
      card.appendChild(cardName);
      let cardPrice = document.createElement('div');
      cardPrice.setAttribute("class", "card-price");
      cardPrice.innerHTML = `${this.Goods[i].price} ${this.Goods[i].currency}`;
      card.appendChild(cardPrice);
      let cardBtn = document.createElement('a');
      cardBtn.setAttribute("href", "#");
      cardBtn.setAttribute("class", "card-btn");
      // cardBtn.setAttribute("onclick", "return myChange(this);");
      cardBtn.setAttribute("data-id", this.Goods[i].id);
      cardBtn.innerHTML = "Купить";
      card.appendChild(cardBtn);
      let cardImg = document.createElement('img');
      cardImg.setAttribute("src", this.Goods[i].imgLink);
      cardImg.setAttribute("alt", this.Goods[i].name);
      cardImg.setAttribute("class", "card-img");
      cardImg.setAttribute("idcar", this.Goods[i].id);
      card.appendChild(cardImg);
    }
  }
  /**
   *  функция принимает JSON файл от JSON-servera
   *  http://localhost:3000/basket3.html
   *  @param - url адрес JSON-servera  http://localhost:3000/goods
   */
  makeGETRequest(url) {
    let catalog = this;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);  // настройка запросов

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {     // 4
        if (xhr.status !== 200) {
          return;
        }
        let goods2 = JSON.parse(xhr.responseText);      // принимает JSON файл от JSON-servera  
        goods2.forEach(function (good) {
          catalog.add(good.id, good.quantity, good.price, good.currency, good.name, good.imgLink);
        });
        catalog.init();
      }
    };
    xhr.send();  // отправк запроса
  }


  /**
   *  Promise
   *  функция принимает JSON файл от JSON-servera
   *  http://localhost:3000/basket3.html
   *  http://localhost:3000/goods
   *  @param - url адрес JSON-servera  http://localhost:3000/goods
   *  @returns Promise
   */
  makeGETRequestPromise(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);  // настройка запросов

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {     // 4
          if (xhr.status !== 200) {
            reject();
          }
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.send();  // отправк запроса
    });

  }
  /**
   * получает товары каталога 
   *  @param - url адрес JSON-servera  http://localhost:3000/goods
   */
  getCatalogPromise(url) {
    let catalog = this;
    this.makeGETRequestPromise(url).then((goods) => {
      //resolve()
      goods.forEach(function (good) {
        catalog.add(good.id, good.quantity, good.price, good.currency, good.name, good.imgLink);
      });
      catalog.init();
    }, () => {
      // reject()
      console.log(Error('Не получены данные с JSON-servera'));
    });
  }

}
