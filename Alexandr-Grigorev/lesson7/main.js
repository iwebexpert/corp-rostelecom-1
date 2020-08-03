

const basket = document.querySelector('.error-empty');
const btn = document.querySelector('.showBasket');
const products = document.querySelector('.products');
const inBasketProducts = document.querySelector('.inBasketProducts');
const gotoBasket = document.querySelector('.gotoBasket');
const container = document.querySelector('.container');
let korzina = 0;


const productsSkad = [];   //Массив товаров на складе, заполняется при добавлении элементов через addNewProduct (склад бесконечный)
let productsBasket = [];                //Корзина, заполняется при клике на кнопку ADD в списке товаров

btn.onclick = function () {  //очистка корзины
    korzina = 0;
    productsBasket = [];
    basket.textContent = 'Корзина пуста';
    while (inBasketProducts.firstChild) {
        inBasketProducts.removeChild(inBasketProducts.lastChild);
    }
    while (gotoBasket.nextElementSibling) {
        gotoBasket.nextElementSibling.remove();
    }
};

gotoBasket.onclick = function () {
    if ((korzina != 0) && (!gotoBasket.nextElementSibling)) {
        const address = document.createElement('span');
        address.className = 'error-empty';
        address.textContent = 'Введите адрес доставки';
        container.appendChild(address);
        const addressInput = document.createElement('input');
        addressInput.className = 'addressInput';
        addressInput.setAttribute = ('type', 'text');
        container.appendChild(addressInput);
        const btnSendAddress = document.createElement('button');
        btnSendAddress.textContent = 'Далее';
        btnSendAddress.className = 'btnSendAddress';
        container.appendChild(btnSendAddress);
        btnSendAddress.onclick = function () {
            if ((addressInput.value) && (!btnSendAddress.nextElementSibling)) {
                const commentTitle = document.createElement('span');
                commentTitle.className = 'error-empty';
                commentTitle.textContent = 'Ваш комментарий';
                container.appendChild(commentTitle);
                const commentArea = document.createElement('textarea');
                commentArea.className = 'commentArea';
                container.appendChild(commentArea);
                const btnBuy = document.createElement('button');
                btnBuy.setAttribute = ('type', 'submit');
                btnBuy.textContent = 'Купить';
                btnBuy.className = 'btnBuy';
                container.appendChild(btnBuy);

                btnBuy.onclick = function () {
                    alert('Заказ успешно оформлен!');
                }
            }
        }


    }
}



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
        this.addInBasket = function () {
            const oneProduct = document.createElement('div');
            oneProduct.className = 'oneProductInBasket';
            inBasketProducts.appendChild(oneProduct);
            const oneProductName = document.createElement('span');
            oneProductName.className = 'oneProductName';
            oneProductName.textContent = this.name;
            oneProduct.appendChild(oneProductName);
            const oneProductPrice = document.createElement('span');
            oneProductPrice.className = 'oneProductPrice';
            oneProductPrice.textContent = this.price;
            oneProduct.appendChild(oneProductPrice);
            const dellbtn = document.createElement('button');
            dellbtn.className = 'dellbtn';
            dellbtn.textContent = 'Delete';
            oneProduct.appendChild(dellbtn);
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
                productsSkad[i].addInBasket(); // появляется запись в корзине
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

function deleteOneElementFromBasket(tovar) {  //удаление товара из массива корзины
    for (let i = 0; i < productsBasket.length; i++) {  //поиск этого товара в корзине по имени
        if (productsBasket[i].name == tovar) {
            productsBasket.splice(i, 1); //удаление из массива, а потом сразу выход, чтобы не удалять все одноименные
            return; //конечно, лучше бы было искать товары по артикулу или какому-то id, чем по имени, поэтому при совпадении имен удаляется первый совпавший
        }
    }
}

inBasketProducts.addEventListener('click', function (event) {   //удаление товара из корзины при клике
    if (event.target.className == 'dellbtn') {
        let tovar = event.target.previousElementSibling.previousElementSibling.textContent; //здесь находится имя товара
        let delProd = event.target.parentElement;
        delProd.remove();
        deleteOneElementFromBasket(tovar);
        console.log(productsBasket);
        korzina = 0;
        for (let i = 0; i < productsBasket.length; i++) {              //подсчет суммы товаров в корзине
            korzina = korzina + productsBasket[i].price;
        }
        basket.textContent = 'Товаров на сумму ' + korzina + ' рублей';
        if (korzina == 0) {
            while (gotoBasket.nextElementSibling) {
                gotoBasket.nextElementSibling.remove();
            }
        }
    }

});





