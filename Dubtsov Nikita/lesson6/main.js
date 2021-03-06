let products = [];
const basket = [];

class Catalog {
    constructor(products) {
        this.products = products;
        this.basket = [];
    }
    // Инициация
    init() {
        this.loadElements();
        this.loadProducts();
        this.handlers();
    }
    // Обработка событий
    handlers() {
        const bodyEl = document.body;
        bodyEl.addEventListener('click', event => this.handlersClick());

    }
    // Обработка событий нажатия
    handlersClick() {
        if (event.target.tagName === 'BUTTON') {
            this.addToBasket(event.target.dataset.id);
        };
        if (event.target.tagName === 'A' && !document.querySelector('.basket-list')) {
            this.basketList();
        }
        if (event.target.classList.value === 'close-btn') {
            document.querySelector('.modal').remove();
        }
    }
    // Загружаем основные элементы на страницу
    loadElements() {
        const container = document.createElement('div');
        container.classList.add('container');
        const header = document.createElement('div');
        header.classList.add('header');
        const catalog = document.createElement('div');
        catalog.classList.add('catalog');

        const basketBox = document.createElement('a');
        basketBox.classList.add('basket');
        // const addProductBtn = document.createElement('button');
        // addProductBtn.classList.add('btn');

        document.body.append(container);
        container.append(header);
        container.append(catalog);
        header.append(basketBox);
        // addProductBtn.textContent = 'Добавить товар';
        // basketBox.append(basketContent);
        // basketContent.textContent = '0';
        //document.body.append(basketBox);
        //document.body.append(addProductBtn);

    }
    // Загружаем список продуктов на страницу
    loadProducts() {
        if (this.products.length == 0) {
            console.log('Нет продуктов для отображения на странице!');
        }
        // console.log(this.products);
        for (let prElCount = 0; prElCount < this.products.length; prElCount++) {
            let product = document.createElement('div');
            product.classList.add('product');
            product.innerHTML = `<div class="product-image"></div>
                                <div class="product-name">${this.products[prElCount].name}</div>
                                <div class="product-price">
                                    <div class="price-text">${this.products[prElCount].price}</div>
                                    <div class="price-currency"><p>RUB</p></div>
                                </div>
                                <button class="product-btn" data-id="${prElCount + 1}">В корзину</button>`
            const catalog = document.querySelector('.catalog');
            catalog.append(product);
        }

        // `<div class="product">
        //     
        // </div>`
    }
    // считаем итоговую стоимость
    finalPrice(basket) {
        let sum = 0;
        for (let i = 0; i < this.basket.length; i++) {
            sum += this.basket[i].price;
        }
        return sum;
    }
    // добавляем в корзину
    addToBasket(id) {
        // if (basket === undefined) {
        //     const basket = []
        // }
        this.basket.push(this.products[id - 1]);
        const basketEl = document.querySelector('.basket');
        basketEl.innerHTML = `<p class="count">${this.basket.length}</p>`;

    }
    // Создаем модальное окно корзины с товарами
    basketList() {
        const basketListModalEl = document.createElement('div');
        const basketListEl = document.createElement('div');
        const btnCloseList = document.createElement('div')
        basketListModalEl.classList.add('modal');
        basketListEl.classList.add('basket-list');
        btnCloseList.classList.add('close-btn');
        btnCloseList.textContent = 'X';
        for (let bElCount = 0; bElCount < this.basket.length; bElCount++) {
            let basketProduct = document.createElement('div');
            basketProduct.classList.add('basket-product');
            basketProduct.innerHTML = `<div class="product-name">${this.basket[bElCount].name}</div>
                                       <div class="product-price">
                                            <div class="price-text">${this.basket[bElCount].price}</div>
                                            <div class="price-currency"><p>RUB</p></div>
                                       </div>`;
            basketListEl.append(basketProduct);

        }
        basketListModalEl.append(btnCloseList);
        const finalCost = document.createElement('div');
        finalCost.textContent = `Количество товаров - ${this.basket.length}. Сумма заказа ${this.finalPrice()} рублей.`;
        finalCost.classList.add('final-cost');
        basketListEl.append(finalCost);
        basketListModalEl.append(basketListEl);
        document.body.append(basketListModalEl);

    }


    // <p class="final-price">${this.finalPrice(basket)}</p>


}
// Класс продукта
class Product {
    constructor(name, price, images) {
        this.name = name;
        this.price = price;
        this.images = images;

    }
}

const productKeyboard = new Product('Super keyboard', 10000);
const productMouse = new Product('Super mouse', 7500);
const productMousePad = new Product('Mouse pad 30x40', 490);
const productMotherbroad = new Product('Motherboard NEW', 15000);
const productNotebook = new Product('Notebook 17', 37500);
const productCable = new Product('USB cable 2m', 328);
const productRouter = new Product('Router 5 ch', 4530);


products = [productKeyboard, productMouse, productMousePad, productMotherbroad, productNotebook, productCable, productRouter];

let catalogPage = new Catalog(products);
catalogPage.init();