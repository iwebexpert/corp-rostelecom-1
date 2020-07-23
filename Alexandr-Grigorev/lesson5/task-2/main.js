/*
class product {
    constructor(name, price, currency) {
        this.name = name;
        this.price = price;
        this.currency = currency;
    }
}
const product1 = new product('Keyboard', 1000, 'RUB');
const product2 = new product('Mouse', 700, 'RUB');
const product3 = new product('Phone', 15000, 'RUB');
const product4 = new product('USB-cable', 200, 'RUB');
const product5 = new product('camera', 800, 'RUB');


const basket = {
    items: [],                                                
    countBasketPrice: function () {                            
        let sum = 0;
        for (let i = 0; i < this.items.length; i++) {
            sum += this.items[i][0].price * this.items[i][1];
        }
        return sum;
    },
    addItem: function (item, kolvo) {                          
        this.items.push([item, kolvo]);
    },
}
basket.addItem(product1, 2);
basket.addItem(product2, 3);
basket.addItem(product3, 1);
basket.addItem(product4, 5);
basket.addItem(product5, 1);
console.log('Стоимость корзины: ', basket.countBasketPrice());




!!!!!!!!!!!!!!!!!!----------------------Здесь считается по-простому, при нажатии кнопки выводится сумма и количество-----------------!!!!!!!!!!!!!!!!!!



const knopka = document.getElementById("btn");
const korzina = document.querySelector('.error-empty');

knopka.addEventListener('click', function () {
    korzina.textContent = 'В корзине ' + (basket.items.length) + ' товаров на сумму ' + basket.countBasketPrice() + ' RUB';
});
*/


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!----------попытался сделать так, чтобы при нажатии на кнопку
//-----------------------------------------добавлялись товары в корзину
//-----------------------------------------но не хватило времени и знаний, чтобы понять,
//-----------------------------------------как привязать конкретную цену к конкретной кнопке

//-----------------------------------------Здесь только добавляются товары на страницу

const basket = document.querySelector('.error-empty');
const btn = document.querySelector('.showBasket');
const products = document.querySelector('.products');



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
            addbtn.innerText = 'ADD';
            oneProduct.appendChild(addbtn);
        }
    }
}

const product1 = new product('Keyboard', 1000);
product1.addNewProduct();
const product2 = new product('Mouse', 700);
product2.addNewProduct();

let buttons = document.querySelectorAll('div [class="oneProduct"] button');
console.log(buttons);

//---здесь застрял, возможно, нужно использовать forEach, но я не уверен, что это правильно вообще в целом




