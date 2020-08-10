class Item {
  constructor(name, price, currency = 'P') {
    this.name = name;
    this.price = price;
    this.currency = currency;
  }
}

class Catalog {
  constructor() {
    this.itemList = [];
    this.body = document.querySelector('#catalog');
  }

  async fetchItems() {
    let response = await fetch('http://localhost:3000/goods');
    let items = await response.json();
    for (let i = 0; i < items.length; i++) {
      this.itemList.push(items[i])
    }
    console.log(this.itemList)
    this.drawCatalog();
  }

  getCatalog() {
    return this.itemList;
  }

  getItem(itemNum) {
    return this.itemList[itemNum] ? this.itemList[itemNum] : {};
  }

  drawCatalog() {
    const catalogContainer = document.createElement('div');
    catalogContainer.className = 'catalog-container';
    const catalogHeader = document.createElement('h3');
    catalogHeader.className = 'catalog-header';
    catalogHeader.innerHTML = 'Каталог';
    catalogContainer.appendChild(catalogHeader);

    let itemList = this.getCatalog();
    for (let i = 0; i < itemList.length; i++) {
      const item = document.createElement('div');
      item.className = 'item';
      for (let key in itemList[i]) {
        if (key === "id") {
          continue;
        } else {
          const itemProperty = document.createElement('div');
          itemProperty.classList.add('item-property');
          itemProperty.classList.add(`item-${key}`);
          itemProperty.innerHTML = itemList[i][key];
          item.appendChild(itemProperty);
        }
      }
      const addItemButton = document.createElement('button');
      addItemButton.className = 'add-item-button';
      addItemButton.classList.add('item-property');
      addItemButton.innerHTML = 'Добавить товар'
      item.appendChild(addItemButton);
      addItemButton.dataset.id = i;
      addItemButton.addEventListener("click", (event) => {
        basket.addItem(this.getItem(event.target.dataset.id), 1);
        basket.drawBasket(basket);
      });
      catalogContainer.appendChild(item);
    }

    this.body.appendChild(catalogContainer);
  }

}

class Basket {
  constructor() {
    this.itemList = [];
    this.body = document.querySelector('#basket');
  }

  addItem(item, itemCount) {
    for (let i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].name === item.name) {
        this.itemList[i].count += itemCount;
        return;
      }
    }
    this.itemList.push({ 'name': item.name, 'price': item.price, 'currency': item.currency, 'count': itemCount });


  }
  deleteItem(item) {
    this.itemList.splice(item, 1);
  }

  basketSum() {
    let sum = 0;
    for (let i = 0; i < this.itemList.length; i++) {
      sum += this.itemList[i].price * this.itemList[i].count;
    }
    return sum;
  }

  basketItemCount() {
    let count = 0;
    for (let i = 0; i < this.itemList.length; i++) {
      count += this.itemList[i].count;
    }
    return count;
  }

  drawBasket() {
    this.body.innerHTML = ''
    const basketContainer = document.createElement('div');
    basketContainer.className = 'basket-container';
    const basketHeader = document.createElement('h3');
    basketHeader.className = 'basket-header';
    basketHeader.innerHTML = 'Корзина';
    basketContainer.appendChild(basketHeader);

    const basketState = document.createElement('div');
    basketState.className = 'basket-state';
    basketState.innerHTML = this.basketItemCount() > 0 ?
      `В корзине:  ${this.basketItemCount()} товаров на сумму ${this.basketSum()} рублей` : 'Корзина пуста';
    basketContainer.appendChild(basketState);
    for (let i = 0; i < this.itemList.length; i++) {
      const item = document.createElement('div');
      item.className = 'item';
      for (let key in this.itemList[i]) {
        const itemProperty = document.createElement('div');
        itemProperty.classList.add('item-property');
        itemProperty.classList.add(`item-${key}`);
        itemProperty.innerHTML = (key === 'count') ? `${this.itemList[i][key]} шт.` : this.itemList[i][key];
        item.appendChild(itemProperty);
      }
      const delItemButton = document.createElement('button');
      delItemButton.className = 'del-item-button';
      delItemButton.classList.add('item-property');
      delItemButton.innerHTML = 'Убрать товар'
      delItemButton.dataset.id = i;
      delItemButton.addEventListener("click", function () {
        basket.deleteItem(this.dataset.id);
        basket.drawBasket(basket);
      });
      item.appendChild(delItemButton);
      basketContainer.appendChild(item);
    }
    this.body.appendChild(basketContainer);
  }

}

const catalog = new Catalog();
const basket = new Basket();