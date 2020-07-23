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

  addBasketItem() {
    this.basketItem.push(basketItem)
  }
}

let items = new basket([
  new item('Item1', 500, 3),
  new item('Item2', 1000, 2),
  new item('Item3', 5000, 1),
]);

const drawCart = () => {
  const base = document.getElementById('cart-container');
  const contentCart = document.createElement('div');
  contentCart.textContent = "Корзина пуста";
  contentCart.className = "cart cart-empty";
  base.appendChild(contentCart);

  if (items.basketItemCount() !== 0) {
    contentCart.textContent = `В корзине ${items.basketItemCount()} товаров на сумму ${items.basketSum()} рублей.`
    contentCart.className = 'cart';
  }

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