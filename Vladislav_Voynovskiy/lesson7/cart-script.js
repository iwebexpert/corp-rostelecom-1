class item {
  constructor(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  get itemName() {
    return this.name;
  }

  get itemPrice() {
    return this.price;
  }

  get itemCount() {
    return this.count;
  }

  get cost() {
    return this.price * this.count;
  }

  itemReduceCount() {
    this.count = this.count - 1;
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

  basketUniqueItems() {
    let count = 0;
    for (let i = 0; i < this.basketItem.length; i++) {
      count++
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

const drawCatalog = () => {
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

const drawCart = () => {
    const base = document.getElementById('cart-container');
    const cartState = document.createElement("div");
    cartState.className = "cart-state";
    base.appendChild(cartState);
    const cartStateHeader = document.createElement("h3");
    cartStateHeader.innerHTML = 'Состав корзины';
    cartState.appendChild(cartStateHeader);

    let items = new basket([
      new item('Манган', 8000, 6),
      new item('Байман', 12000, 3),
      new item('Якуман', 32000, 1),
    ]);
    console.log(items);

    const cartContent = document.createElement("div");
    cartContent.className = 'cart-content';
    cartState.appendChild(cartContent);
    for (let i = 0; i < items.basketUniqueItems(); i++) {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';

      const itemName = document.createElement('div');
      itemName.className = 'item-name';
      itemName.innerHTML = `${items.basketItem[i].itemName}`
      cartItem.appendChild(itemName);

      const itemCount = document.createElement('div');
      itemCount.className = 'item-count';
      itemCount.innerHTML = `x${items.basketItem[i].itemCount}`
      cartItem.appendChild(itemCount);

      const itemPrice = document.createElement('div');
      itemPrice.className = 'item-price';
      itemPrice.innerHTML = `${items.basketItem[i].itemPrice} рублей`
      cartItem.appendChild(itemPrice);

      const itemRemoveButton = document.createElement("button");
      itemRemoveButton.className = 'item-button';
      itemRemoveButton.innerHTML = 'Удалить';
      itemRemoveButton.addEventListener("click", () => {
        updateCountNumber = () => {
          itemCount.innerHTML = `x${items.basketItem[i].itemCount}`
        }
        if (items.basketItem[i].itemCount > 1) {
          items.basketItem[i].itemReduceCount();

          updateCartSummary();
          updateCountNumber();
          console.log(items);
        } else {
          items.basketItem[i].itemReduceCount();
          updateCartSummary();
          console.log(items);
          cartItem.remove()
        }
      })
      cartItem.appendChild(itemRemoveButton);
      cartContent.appendChild(cartItem);
    }

    const cartSummary = document.createElement("div");
    cartSummary.className = 'cart-summary';
    cartState.appendChild(cartSummary);
    updateCartSummary = () => {
      if (items.basketItemCount() !== 0) {
        cartSummary.innerHTML = `В корзине ${items.basketItemCount()} товаров на сумму ${items.basketSum()} рублей.`;
      } else {
        cartSummary.innerHTML = 'Корзина пуста';
      }
    }
    updateCartSummary();


    const cartNextButton = document.createElement("button");
    cartNextButton.innerHTML = "Далее"
    cartNextButton.addEventListener("click", () => {
      cartState.className = "cart-state hidden";
      addressField.className = "address-field";
    })
    cartState.appendChild(cartNextButton);

    const addressField = document.createElement("div");
    addressField.className = "address-field hidden";
    base.appendChild(addressField);

    const addressFieldHeader = document.createElement("h3");
    addressFieldHeader.innerHTML = 'Адрес';
    addressField.appendChild(addressFieldHeader);

    const addressNextButton = document.createElement("button");
    addressNextButton.innerHTML = "Далее"
    addressNextButton.addEventListener("click", () => {
      addressField.className = "address-field hidden";
      commentField.className = "comment-field";
    })
    addressField.appendChild(addressNextButton);

    const addressTextField = document.createElement("textarea");
    addressTextField.rows = "10";
    addressTextField.cols = "20";
    addressField.appendChild(addressTextField);

    const commentField = document.createElement("div");
    commentField.className = "comment-field hidden";
    base.appendChild(commentField);

    const commentFieldHeader = document.createElement("h3");
    commentFieldHeader.innerHTML = 'Комментарии';
    commentField.appendChild(commentFieldHeader);

    const commentTextField = document.createElement("textarea");
    commentField.appendChild(commentTextField);
    commentTextField.rows = "10";
    commentTextField.cols = "20";
}