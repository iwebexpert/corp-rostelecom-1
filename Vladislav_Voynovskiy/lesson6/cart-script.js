class item {
  constructor(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  get itemCount() {
    return this.count;
  }

  get cost() {
    return this.price * this.count;
  }
}

class basket {
  constructor(basketItem) {
    this.basketItem = basketItem;
  }

  basketSum() {
    let sum = 0;
    for (let i = 0; i < this.basketItem.length; i++) {
      sum += this.basketItem[i].cost;
    }
    return sum;
  }

  basketItemCount() {
    let count = 0;
    for (let i = 0; i < this.basketItem.length; i++) {
      count += this.basketItem[i].itemCount;
    }
    return count;
  }

  addBasketItem(basketItem) {
    this.basketItem.push(basketItem)
  }
}

let items = new basket([]);

const drawItems = (name, price) => {
  const itemCard = document.createElement('div');
  itemCard.className = 'item-card';
  const itemHeading = document.createElement('h3');
  itemHeading.className = 'item-heading';
  itemHeading.innerHTML = `${name}`;
  itemCard.appendChild(itemHeading);

  const itemPrice = document.createElement('h4');
  itemPrice.className = 'item-price';
  itemPrice.innerHTML = `Цена: ${price} руб.`
  itemCard.appendChild(itemPrice);

  const addItemButton = document.createElement('button');
  addItemButton.className = 'item-button';
  addItemButton.innerHTML = 'Добавить товар'
  itemCard.appendChild(addItemButton);

  addItemButton.addEventListener('click', () => {
    items.addBasketItem(new item(name, price, 1));
    checkIfEmpty();
  })

  document.querySelector('#cart-container').appendChild(itemCard);
}

const drawCart = () => {
  const base = document.getElementById('cart-container');
  const contentCart = document.createElement('div');
  contentCart.textContent = "Корзина пуста";
  contentCart.className = "cart cart-empty";
  base.appendChild(contentCart);

  checkIfEmpty = () => {
    if (items.basketItemCount() !== 0) {
      contentCart.textContent = `В корзине ${items.basketItemCount()} товаров на сумму ${items.basketSum()} рублей.`
      contentCart.className = 'cart';
    }
  }
  checkIfEmpty();
  drawItems('Манган', 8000);
  drawItems('Байман', 12000);
  drawItems('Якуман', 32000);

  const clearButton = document.createElement('button');
  clearButton.textContent = 'Очистить корзину';
  clearButton.className = 'button clear-button';
  clearButton.addEventListener('click', clearBasket = () => {
    contentCart.textContent = "Корзина пуста";
    contentCart.className = "cart cart-empty";
    items = new basket([]);
  })
  base.appendChild(clearButton);
}