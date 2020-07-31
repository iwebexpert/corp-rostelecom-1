//Генерация корзины
class Product {
    constructor(name, price, quantity, id) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.id = id;
    }
    cost() {
        return this.price;
    }
}
const keyboard = new Product('Keyboard', 1000, 1, 'keyboard');
const mouse = new Product('Mouse', 700, 2, 'mouse');
const video = new Product('Videocard', 25000, 1, 'videocard');
const monitor = new Product('Monitor', 7000, 2, 'monitor');

const totalBasket = [keyboard, mouse, video, monitor];
const generateButton = document.querySelector('.generate-catalog__button');

// generateButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     formingCatalog();
// });

const catalog = document.querySelector('.catalog');
const formingCatalog = () => {
    for (let i = 0; i < totalBasket.length; i++) {
        const catalogItem = document.createElement('div');
        catalogItem.classList.add('catalog__item');
        catalogItem.setAttribute('data-id', totalBasket[i].id);
        const itemTitle = document.createElement('h3');
        itemTitle.classList.add('catalog__title');
        itemTitle.textContent = totalBasket[i].name;
        const itemPrice = document.createElement('p');
        itemPrice.classList.add('catalog__price');
        itemPrice.innerHTML = `Цена : <b>${totalBasket[i].price}</b>`;
        const itemButton = document.createElement('button');
        itemButton.classList.add('catalog__button');
        itemButton.textContent = 'добавить';
        catalogItem.appendChild(itemTitle);
        catalogItem.appendChild(itemPrice);
        catalogItem.appendChild(itemButton);
        catalog.appendChild(catalogItem);
    }
};
formingCatalog();
const myBasket = document.querySelector('.basket__title');
const totalBasketPrice = document.querySelector('.basket__text');
const basketList = document.querySelector('.basket-list');
let countClick = 0;
let countPrice = 0;

catalog.addEventListener('click', (e) => {
    let countItem = 1;
    e.preventDefault();

    const target = e.target;
    if (target.classList.contains('catalog__button')) {
        const price = target.previousElementSibling;
        const name = price.previousElementSibling;
        const itemId = price.parentNode.getAttribute('data-id');
        const substrPrice = parseInt(price.textContent.substr(7));
        totalBasketPrice.innerHTML = `В корзине: ${(countClick += 1)} товаров на сумму ${(countPrice += substrPrice)}`;
        const basketItem = document.createElement('li');
        basketItem.classList.add('basket-list__item');
        basketItem.setAttribute('id', itemId);
        const itemName = document.createElement('p');
        const itemPrice = document.createElement('p');
        const itemCount = document.createElement('p');
        const itemButton = document.createElement('button');
        const itemButtonQuantity = document.createElement('button');
        itemButton.textContent = 'Удалить';
        itemButton.classList.add('delete-button');
        itemButtonQuantity.textContent = 'Добавить';
        itemButtonQuantity.classList.add('add-button');
        itemName.textContent = `Название: ${name.textContent}`;
        itemPrice.textContent = `Цена: ${substrPrice}`;
        itemCount.textContent = `Количество: ${countItem}`;
        basketItem.appendChild(itemName);
        basketItem.appendChild(itemPrice);
        basketItem.appendChild(itemCount);
        basketItem.appendChild(itemButton);
        basketItem.appendChild(itemButtonQuantity);
        basketList.appendChild(basketItem);
        const basketListItem = document.querySelectorAll('.basket-list__item');
        for (let i = 0; i < basketListItem.length; i++) {
            if (basketList.contains(basketItem[i])) {
                console.log(123123);
            }
        }
        let itemPriceCount = substrPrice;
        itemButton.addEventListener('click', (e) => {
            e.preventDefault();
            itemCount.textContent = `Количество: ${(countItem -= 1)}`;
            itemPrice.textContent = `Цена: ${(itemPriceCount -= substrPrice)}`;
            totalBasketPrice.innerHTML = `В корзине: ${(countClick -= 1)} товаров на сумму ${(countPrice -= substrPrice)}`;
            if (countItem == 0) {
                basketItem.remove();
                countItem = 0;
                itemPriceCount = substrPrice;
            }
            if (!basketList.hasChildNodes()) {
                totalBasketPrice.textContent = 'коризна пуста';
            }
        });
        itemButtonQuantity.addEventListener('click', (e) => {
            e.preventDefault();
            itemCount.textContent = `Количество: ${(countItem += 1)}`;
            itemPrice.textContent = `Цена: ${(itemPriceCount += substrPrice)}`;
            totalBasketPrice.innerHTML = `В корзине: ${(countClick += 1)} товаров на сумму ${(countPrice += substrPrice)}`;
        });
    }
});
const basketButton = document.querySelector('.basket__button');
basketButton.addEventListener('click', (e) => {
    e.preventDefault();
    totalBasketPrice.textContent = 'коризна пуста';
    countClick = 0;
    countPrice = 0;
    const basketItem = document.querySelectorAll('.basket-list__item');
    for (let i = 0; i < basketItem.length; i++) {
        basketItem[i].remove();
    }
});
