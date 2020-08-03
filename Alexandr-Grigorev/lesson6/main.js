

const basket = document.querySelector('.error-empty');
const btn = document.querySelector('.showBasket');
const products = document.querySelector('.products');
let korzina = 0;


const productsSkad = [];   //Массив товаров на складе, заполняется при добавлении элементов через addNewProduct (склад бесконечный)
let productsBasket = [];                //Корзина, заполняется при клике на кнопку ADD в списке товаров

btn.onclick = function () {
    korzina = 0;
    productsBasket = [];
    basket.textContent = 'Корзина пуста';
};

class product {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        this.addNewProduct = function () {
            const oneProduct = document.createElement('div');
            oneProduct.className = 'oneProduct';
            products.appendChild(oneProduct);
            const oneProductName = document.createElement('span');
            oneProductName.className = 'oneProductName';
            oneProductName.textContent = this.name;
            oneProduct.appendChild(oneProductName);
            const oneProductPrice = document.createElement('span');
            oneProductPrice.className = 'oneProductPrice';
            oneProductPrice.textContent = this.price;
            oneProduct.appendChild(oneProductPrice);
            const addbtn = document.createElement('button');
            addbtn.className = 'addbtn';
            addbtn.textContent = 'ADD';
            oneProduct.appendChild(addbtn);
            productsSkad.push(this);
        }

    }
}

const product1 = new product('Keyboard', 1000);
product1.addNewProduct();
const product2 = new product('Mouse', 700);
product2.addNewProduct();
const product3 = new product('Phone', 12000);
product3.addNewProduct();
const product4 = new product('USB camera', 5000);
product4.addNewProduct();

console.log(productsSkad);

products.addEventListener('click', function (event) {   //добавление товара в корзину при клике
    if (event.target.className == 'addbtn') {
        console.log(event.target);
        let tovar = event.target.previousElementSibling.previousElementSibling.textContent; //здесь находится имя товара
        console.log(tovar);
        for (let i = 0; i < productsSkad.length; i++) {  //поиск этого товара на складе по имени
            if (productsSkad[i].name == tovar) {
                productsBasket.push(productsSkad[i]); //занесение товара в корзину
            }
        }
        console.log(productsBasket);
        korzina = 0;
        for (let i = 0; i < productsBasket.length; i++) {              //подсчет суммы товаров в корзине
            korzina = korzina + productsBasket[i].price;
        }
        basket.textContent = 'Товаров на сумму ' + korzina + ' рублей';
    }

});





