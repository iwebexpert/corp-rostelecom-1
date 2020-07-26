//Генерация шахматной доски
const container = document.querySelector('.container');
const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const button = document.querySelector('.button');

const chessGenerate = () => {
    for (let i = 0; i < 9; i++) {
        const cage = document.createElement('div');
        cage.classList.add('content');
        i != 0 ? (cage.innerHTML += arr[i - 1]) : (cage.innerHTML = '');
        container.appendChild(cage);
    }
    for (let x = 1; x < 9; x++) {
        const cage = document.createElement('div');
        cage.classList.add('content');
        cage.innerHTML += x;
        container.appendChild(cage);
        for (let j = 0; j < 8; j++) {
            const cager = document.createElement('div');
            if (x % 2 != 0 && j % 2 == 0) {
                cager.classList.add('cages');
            } else if (x % 2 != 0 && j % 2 != 0) {
                cager.classList.add('cage_theme_brown');
            }
            if (x % 2 == 0 && j % 2 == 0) {
                cager.classList.add('cage_theme_brown');
            } else {
                cager.classList.add('cages');
            }
            container.appendChild(cager);
        }
    }
};
button.addEventListener('click', (e) => {
    e.preventDefault();
    chessGenerate();
});
//Генерация корзины
class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    cost() {
        return this.price;
    }
}
const keyboard = new Product('Keyboard', 1000, 1);
const mouse = new Product('Mouse', 700, 2);
const video = new Product('Videocard', 25000, 1);
const monitor = new Product('Monitor', 7000, 2);

const totalBasket = [keyboard, mouse, video, monitor];
const generateButton = document.querySelector('.generate-catalog__button');

generateButton.addEventListener('click', (e) => {
    e.preventDefault();
    formingCatalog();
});

const catalog = document.querySelector('.catalog');
const formingCatalog = () => {
    for (let i = 0; i < totalBasket.length; i++) {
        const catalogItem = document.createElement('div');
        catalogItem.classList.add('catalog__item');
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
const myBasket = document.querySelector('.basket__title');
const totalBasketPrice = document.querySelector('.basket__text');
let countClick = 0;
let countPrice = 0;
catalog.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('catalog__button')) {
        const price = target.previousElementSibling;
        const substrPrice = parseInt(price.textContent.substr(7));
        totalBasketPrice.innerHTML = `В корзине: ${(countClick += 1)} товаров на сумму ${(countPrice += substrPrice)}`;
    }
});
const basketButton = document.querySelector('.basket__button');
basketButton.addEventListener('click', (e) => {
    e.preventDefault();
    totalBasketPrice.textContent = 'коризна пуста';
    countClick = 0;
    countPrice = 0;
});
