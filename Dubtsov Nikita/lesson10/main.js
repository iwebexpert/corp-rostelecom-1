const basket = [];

class Catalog {
    constructor(products) {
        this.products = products || [];
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
        if (event.target.classList.contains('product-btn')) {
            this.addToBasket(event.target.dataset.id);

        };
        if (event.target.classList.contains('delete-btn')) {
            let delElId = event.target.dataset.id;
            event.target.parentNode.remove();
            this.basket.splice(delElId, 1);
            document.querySelector('.basket').innerHTML = `<p class="count">${this.basket.length}</p>`;
            document.querySelector('.modal').remove();
            this.basketList();


        };
        if (event.target.tagName === 'A' && !document.querySelector('.basket-list')) {
            this.basketList();
        }
        if (event.target.classList.value === 'close-btn') {
            document.querySelector('.modal').remove();
        }
        let basket = document.querySelector('.basket-list');
        let delivery = document.querySelector('.delivery');
        let comment = document.querySelector('.comment');
        if (event.target.classList.contains('dropdown-btn1')) {
            if (basket.classList.contains('hidden-dropdown')) {
                basket.classList.remove('hidden-dropdown');
                return;
            } else {
                basket.classList.add('hidden-dropdown');
            }
        }
        if (event.target.classList.contains('dropdown-btn2')) {
            if (delivery.classList.contains('hidden-dropdown')) {
                delivery.classList.remove('hidden-dropdown');
                return;
            } else {
                delivery.classList.add('hidden-dropdown');
            }
        }
        if (event.target.classList.contains('dropdown-btn3')) {
            if (comment.classList.contains('hidden-dropdown')) {
                comment.classList.remove('hidden-dropdown');
                return;
            } else {
                comment.classList.add('hidden-dropdown');
            }
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

        document.body.append(container);
        container.append(header);
        container.append(catalog);
        header.append(basketBox);

    }
    // Загружаем список продуктов на страницу
    async loadProducts() {
        let response = await fetch('/products');
        let products = await response.json();

        if (products.length == 0) {
            console.log('Нет продуктов для отображения на странице!');
        }
        for (let prElCount = 0; prElCount < products.length; prElCount++) {
            let product = document.createElement('div');
            product.classList.add('product');
            product.innerHTML = `<div class="product-image"></div>
                                 <div class="product-name">${products[prElCount].name}</div>
                                 <div class="product-price">
                                    <div class="price-text">${products[prElCount].price}</div>
                                    <div class="price-currency"><p>RUB</p></div>
                                 </div>
                                 <button class="product-btn" data-id="${prElCount + 1}">В корзину</button>`
            const catalog = document.querySelector('.catalog');
            catalog.append(product);
        }


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
    async addToBasket(id) {

        let response = await fetch('/products');
        let products = await response.json();

        this.basket.push(products[id - 1]);
        const basketEl = document.querySelector('.basket');
        basketEl.innerHTML = `<p class="count">${this.basket.length}</p>`;

    }
    // Создаем модальное окно корзины с товарами
    basketList() {
        const basketListModalEl = document.createElement('div');
        const modalBox = document.createElement('div');
        const basketListEl = document.createElement('div');
        const btnCloseList = document.createElement('div');
        basketListModalEl.classList.add('modal');
        modalBox.classList.add('modal-box')
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
                                       </div>
                                       <button class="delete-btn" data-id="${bElCount}">Убрать из корзины</button>
                                       `;
            basketListEl.append(basketProduct);

        }
        basketListModalEl.append(btnCloseList);
        const finalCost = document.createElement('div');
        finalCost.textContent = `Количество товаров - ${this.basket.length}. Сумма заказа ${this.finalPrice()} рублей.`;
        finalCost.classList.add('final-cost');
        const basketDropdown = document.createElement('p');
        const deliveryDropdown = document.createElement('p');
        const commentDropdown = document.createElement('p');
        const deliveryEl = document.createElement('div');
        const commentEL = document.createElement('div');
        deliveryEl.innerHTML = `<form action="#" class="delivery-form">
                                <input type="text" placeholder="Введите Ваше имя">
                                <input type="text" placeholder="Введите Ваш адрес">
                                <button class="delivery-btn">Оформить доставку</button>
                                </form>`;
        commentEL.innerHTML = `<form action="#" class="comment-form">
                               <textarea cols="30" rows="10"></textarea>
                               <button class="comment-btn">Оставить комментарий</button>
                               </form>`
        deliveryEl.classList.add('delivery', 'hidden-dropdown');
        commentEL.classList.add('comment', 'hidden-dropdown');
        commentDropdown.classList.add('dropdown-btn3', 'dropdown-btn');
        deliveryDropdown.classList.add('dropdown-btn2', 'dropdown-btn');
        basketDropdown.classList.add('dropdown-btn1', 'dropdown-btn');
        commentDropdown.textContent = `Комментарий:`;
        deliveryDropdown.textContent = `Доставка:`;
        basketDropdown.textContent = `Состав корзины:`;
        modalBox.append(basketDropdown);
        basketListEl.append(finalCost);
        modalBox.append(basketListEl);
        modalBox.append(deliveryDropdown);
        modalBox.append(deliveryEl);
        modalBox.append(commentDropdown);
        modalBox.append(commentEL);
        basketListModalEl.append(modalBox);
        document.body.append(basketListModalEl);

    }
}

let catalogPage = new Catalog();
catalogPage.init();




