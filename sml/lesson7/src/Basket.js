/**
 * Домашнее задание #7
 * @author  Сорванов Михаил Леонидович [CorpRostelecom-1]
 */

/**
 * @class Basket - Класс корзины покупателя. Можно использовать как класс товаров на складе
 * @var  - массив объектов Продуктов
 */

class Basket {

  /**
   * Конструктор класса инициализирует массив товаров в корзине
   */
  constructor() {
    this.Goods = [];
    this.Address = '';
    this.Comment = '';
    this.Status = 'basket';
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
  * Генерирует каталог
  */
  creat() {
    let content = document.getElementById('content');
    let catalogBlock = document.querySelector('#catalog-block');

    let basketBlock = document.createElement('div');
    basketBlock.setAttribute("id", "basket-block");
    content.insertBefore(basketBlock, catalogBlock);

    let basketInfo = document.createElement('div');
    basketInfo.id = "basket-info";
    basketInfo.innerHTML = "Корзина пуста";
    basketBlock.append(basketInfo);

    let basketControl = document.createElement('div');
    basketControl.id = "basket-control";
    basketBlock.append(basketControl);

    let btnBasket = document.createElement('a');
    btnBasket.id = "ctrl-btn-basket";
    btnBasket.className = "ctrl-btn";
    btnBasket.setAttribute("href", "#");
    btnBasket.textContent = 'Состав корзины';
    basketControl.append(btnBasket);

    let btnAddress = document.createElement('a');
    btnAddress.id = "ctrl-btn-address";
    btnAddress.className = "ctrl-btn";
    btnAddress.setAttribute("href", "#");
    btnAddress.textContent = 'Адрес доставки';
    basketControl.append(btnAddress);

    let btnComment = document.createElement('a');
    btnComment.id = "ctrl-btn-comment";
    btnComment.className = "ctrl-btn";
    btnComment.setAttribute("href", "#");
    btnComment.textContent = 'Комментарий';
    basketControl.append(btnComment);

    let btnSend = document.createElement('a');
    btnSend.id = "ctrl-btn-send";
    btnSend.className = "ctrl-btn";
    btnSend.setAttribute("href", "#");
    btnSend.textContent = 'Доставка';
    basketControl.append(btnSend);


    let basket = document.createElement('div');
    basket.id = "basket";
    basketBlock.append(basket);
  }
  /**
   * Обнуление корзины
   */
  zeroing() {
    this.Goods = [];
    this.Address = '';
    this.Comment = '';
  }

  /**
   * Подсчитывает сумму корзины
   * @returns Возвращает сумму корзины
   */
  countBasketPrice() {
    let sumBasket = 0;
    for (let i = 0; i < this.Goods.length; i++) {
      sumBasket += Math.floor(this.Goods[i].price * this.Goods[i].quantity * 100) / 100;
    }
    return sumBasket.toFixed(2);
  }

  /**
   * Убирает одну единицу товара из корзины
   * @param idGood 
   */
  goodMinus(idGood) {
    for (let i = 0; i < this.Goods.length; i++) {
      if (this.Goods[i].id == idGood) {
        this.Goods[i].quantity -= 1;
        if (this.Goods[i].quantity < 1) {
          this.goodDel(idGood);
        } else {
          this.renderBasket();
        }
        break;
      }
    }
  }

  /**
   * Добавляет одну единицу товара в корзину
   * @param idGood 
   */
  goodPlus(idGood) {
    for (let i = 0; i < this.Goods.length; i++) {
      if (this.Goods[i].id == idGood) {
        this.Goods[i].quantity += 1;
        this.renderBasket();
        break;
      }
    }
  }

  /**
   * Удаляет товар из корзины
   * @param idGood 
   */
  goodDel(idGood) {
    for (let i = 0; i < this.Goods.length; i++) {
      if (this.Goods[i].id == idGood) {
        this.Goods.splice(i, 1);  // удаляем
        this.renderBasket();
        break;
      }
    }
  }

  /**
   * Перерисовывает всю корзину
   */
  renderBasket() {
    this.setStatus('basket');
    let msgBasket = 'Корзина пуста';
    if (this.Goods.length > 0) {
      msgBasket = "Сумма товаров в корзине составила: " + this.countBasketPrice() + " руб.";
    }
    let basketInfo = document.getElementById('basket-info');
    basketInfo.innerHTML = msgBasket;

    let basket = document.getElementById('basket');
    basket.innerHTML = "";

    for (let i = 0; i < this.Goods.length; i++) {
      this.showNewGoodBasket(this.Goods[i]);
    }
  }

  /**
   * Перерисовывает адресс доставки
   */
  renderAddress() {
    this.setStatus('adress');
    let msgBasket = 'Корзина пуста';
    if (this.Goods.length > 0) {
      msgBasket = "Сумма товаров в корзине составила: " + this.countBasketPrice() + " руб.";
    }
    let basketInfo = document.getElementById('basket-info');
    basketInfo.innerHTML = msgBasket;

    let basket = document.getElementById('basket');
    basket.innerHTML = "";

    let inpAddress = document.createElement('input');
    inpAddress.setAttribute("type", "text");
    inpAddress.id = "inp-address";
    inpAddress.setAttribute("placeholder", "Введите адрес доставки");
    inpAddress.value = this.Address;
    basket.append(inpAddress);

    let btnSaveAddress = document.createElement('a');
    btnSaveAddress.id = "save-btn-address";
    btnSaveAddress.className = "ctrl-btn";
    btnSaveAddress.setAttribute("href", "#");
    btnSaveAddress.textContent = 'Сохранить';
    basket.append(btnSaveAddress);
  }
  /**
   * Сохраняем адресс
   */
  saveAddress(address) {
    this.Address = address;
  }
  /**
   * Сохраняем комент
   */
  saveComment(comment) {
    this.Comment = comment;
  }

  /**
   * Перерисовывает коментарий
   */
  renderComment() {
    this.setStatus('comment');
    let msgBasket = 'Корзина пуста';
    if (this.Goods.length > 0) {
      msgBasket = "Сумма товаров в корзине составила: " + this.countBasketPrice() + " руб.";
    }
    let basketInfo = document.getElementById('basket-info');
    basketInfo.innerHTML = msgBasket;

    let basket = document.getElementById('basket');
    basket.innerHTML = "";

    let inpComment = document.createElement('input');
    inpComment.setAttribute("type", "text");
    inpComment.id = "inp-comment";
    inpComment.setAttribute("placeholder", "Введите коментарий");
    inpComment.value = this.Comment;
    basket.append(inpComment);

    let btnSaveComment = document.createElement('a');
    btnSaveComment.id = "save-btn-comment";
    btnSaveComment.className = "ctrl-btn";
    btnSaveComment.setAttribute("href", "#");
    btnSaveComment.textContent = 'Сохранить';
    basket.append(btnSaveComment);
  }

  /**
   * Перерисовывает доставку
   */
  renderSend() {
    this.setStatus('send');
    let msgBasket1 = 'Доставлять нечего. ';
    let msgBasket2 = 'Корзина пуста';
    if (this.Goods.length > 0) {
      msgBasket1 = 'Ваш товар отправлен на доставку. ';
      msgBasket2 = "Сумма товаров в корзине составила: " + this.countBasketPrice() + " руб.";
    }
    let basketInfo = document.getElementById('basket-info');
    basketInfo.innerHTML = msgBasket2;

    let basket = document.getElementById('basket');
    basket.innerHTML = "";

    let basketSend = document.createElement('div');
    basketSend.setAttribute("type", "text");
    basketSend.className = "text-send";
    basketSend.textContent = msgBasket1 + msgBasket2;
    basket.append(basketSend);
    this.zeroing();

  }
  /**
   * проверка статуса
   * send/comment/adress/basket
   */
  isStatus(status) {
    if (this.Status === status) {
      return true;
    }
    return false;
  }
  /**
   * установка статуса
   * send/comment/adress/basket
   */
  setStatus(status) {

    var arStatus = ['send', 'comment', 'adress', 'basket'];
    if (arStatus.indexOf(status) != -1) {
      this.Status = status;
    }
  }
  /**
   * получение статуса
   * send/comment/adress/basket
   */
  getStatus(status) {
    return this.Status;
  }

  /**
   * показывает новый товар в корзине
   * @param newGood - объект новый товар
   */
  showNewGoodBasket(newGood) {
    let basketInfo = document.getElementById('basket-info');
    let basket = document.getElementById('basket');
    basketInfo.innerHTML = "Сумма товаров в корзине составила: " + this.countBasketPrice() + " руб.";

    let selectGood = document.createElement('div');
    selectGood.className = "select-goods";
    basket.append(selectGood);

    let selectName = document.createElement('div');
    selectName.className = "select-name";
    selectName.innerHTML = newGood.name + " цена: " + newGood.price + " " + newGood.currency + " количество: ";
    selectGood.append(selectName);

    let selMinus = document.createElement('a');
    selMinus.setAttribute("href", "#");
    selMinus.className = "sel-btn-minus";
    selMinus.dataset.id = newGood.id;
    selMinus.textContent = '-';
    selectGood.append(selMinus);
    let selQuantity = document.createElement('div');
    selQuantity.className = "select-amount";
    selQuantity.textContent = newGood.quantity;
    selectGood.append(selQuantity);
    let selPlus = document.createElement('a');
    selPlus.setAttribute("href", "#");
    selPlus.className = "sel-btn-plus";
    selPlus.dataset.id = newGood.id;
    selPlus.textContent = '+';
    selectGood.append(selPlus);
    let selDel = document.createElement('a');
    selDel.setAttribute("href", "#");
    selDel.className = "sel-btn-del";
    selDel.dataset.id = newGood.id;
    selDel.textContent = 'x';
    selectGood.append(selDel);

    // newGood.quantity
  }

  /**
   * Проверяет есть ли такой товар в корзине
   * @param idGood - идентифтиикатор продукта
   */
  isGood(idGood) {
    for (let i = 0; i < this.Goods.length; i++) {
      if (this.Goods[i].id == idGood) {
        return true;
      }
    }
    return false;
  }

  /**
   * добавляет еще одну единицу в корзину
   * @param idGood - идентифтиикатор продукта
   */
  addGood(idGood) {
    for (let i = 0; i < this.Goods.length; i++) {
      if (this.Goods[i].id == idGood) {
        this.Goods[i].quantity += 1;
      }
    }
  }



  /**
  * Для отладки
  * Показывает товары в корзине
  */
  show() {
    for (let i = 0; i < this.Goods.length; i++) {
      console.log(this.Goods[i].id, this.Goods[i].name, this.Goods[i].price, this.Goods[i].currency, this.Goods[i].quantity, this.Goods[i].imgLink);
    }
  }
}
