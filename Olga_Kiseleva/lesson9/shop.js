let count = 0;
let calcCost = 0;

class Product {
    constructor(name, price, volume = 0, currency = "RUB", picture = []) {
        this._name = name;
        this._price = price;
        this._currency = currency;
        this._volume = volume;
        this._picture = [];
    };
    cost() {
        return this._price * this._volume;
    };
};
class Catalog {
    constructor(products, productsBasket) {
        this.products = products;
        this.productsBasket = [];
    };

    renderCatalog() {
        let catalogItems = document.querySelector('.catalog_items');
        this.products.forEach(element => {

            let productContainer = document.createElement('div');
            productContainer.className = 'product';
            catalogItems.appendChild(productContainer);

            let productName = document.createElement('div');
            productName.setAttribute('data-action', 'picture');
            productName.className = 'product_name';
            productName.textContent = element._name;
            productContainer.appendChild(productName);

            let productPrice = document.createElement('div');
            productPrice.className = 'product_number';
            productPrice.textContent = element._price;
            productContainer.appendChild(productPrice);

            let productVolume = document.createElement('input');
            productVolume.className = 'product_number';
            productVolume.type = 'number';
            productVolume.value = '1';
            productVolume.min = '1';
            productContainer.appendChild(productVolume);

            const btnInput = document.createElement('button');
            btnInput.setAttribute('data-action', 'addBasket');
            btnInput.className = "btn";
            btnInput.textContent = 'купить';
            productContainer.appendChild(btnInput);
        });
    };
};
class Basket extends Product {
    constructor(name, price, volume = 0, currency = "RUB", productsBasket) {
        super(name, price, volume = 0, currency = "RUB");
        this.productsBasket = [];
    };
    count() {
        count += 1;
        return count;
    };
    getProduct() {
        let name = event.target.parentNode.querySelector('.product_name').textContent;
        let price = event.target.parentNode.querySelector('.product_number').textContent;
        let volume = event.target.parentNode.querySelector('input[type=number]').value;
        let product = new Product(name, price, volume);
        if (volume > 0) {
            this.productsBasket.push(product);
            this.count();
            this.addInModal();
        };
        return this.productsBasket;
    };
    addInModal() {
        let basketItems = document.querySelector('.basket_items');
        let productContainer = document.createElement('div');
        productContainer.className = 'product';
        basketItems.appendChild(productContainer);

        let productName = document.createElement('div');
        productName.className = 'product_name';
        productName.textContent = this.productsBasket[count - 1]._name;
        productContainer.appendChild(productName);

        let productPrice = document.createElement('div');
        productPrice.className = 'product_number';
        productPrice.textContent = this.productsBasket[count - 1]._price;
        productContainer.appendChild(productPrice);

        let productVolume = document.createElement('div');
        productVolume.className = 'product_number';
        productVolume.textContent = this.productsBasket[count - 1]._volume;
        productContainer.appendChild(productVolume);

        let productSum = document.createElement('div');
        productSum.className = 'product_number';
        productSum.textContent = this.productsBasket[count - 1].cost();
        productContainer.appendChild(productSum);

        const btnReset = document.createElement('button');
        btnReset.setAttribute('data-action', 'resBasket');
        btnReset.className = "btn";
        btnReset.textContent = 'удалить';
        productContainer.appendChild(btnReset);
    };
    calcCost() {
        calcCost = 0;
        for (let i = 0; i < this.productsBasket.length; i++) {
            calcCost += this.productsBasket[i].cost();
        }
        return calcCost;
    };
    message() {
        let basketTable = document.querySelector('.header_table');
        let basketMess = document.querySelector('.basket_message');
        let basketResult = document.querySelector('.basket_result');
        let btnAddress = document.querySelector('.btn_address');
        if (!this.productsBasket.length) {
            basketTable.style.display = "none";
            btnAddress.style.display = "none";
            basketMess.textContent = '0';
            basketResult.textContent = 'Корзина пуста';
        } else {
            basketTable.style.display = "flex";
            btnAddress.style.display = "block";
            basketMess.textContent = this.productsBasket.length;
            let message = 'В корзине: ' + this.productsBasket.length + ' товар(ов) на сумму: ' + calcCost + ' рублей';
            basketResult.textContent = message;
            return false;
        };
    };
    addBasket() {
        this.getProduct();
        this.calcCost();
        this.message();
    };
    indexBasket() {
        let basketItems = event.target.closest('.basket_items').querySelectorAll('.product');
        let product = event.target.closest('.product');
        for (let i = 0; i < basketItems.length; i++) {
            if (basketItems[i] == product) {
                count = i;
            };
        };
        return count;
    };
    resBasket() {
        this.indexBasket();
        this.productsBasket.splice(count, 1);
        event.target.parentElement.remove();
        this.calcCost();
        this.message();
    };
};
