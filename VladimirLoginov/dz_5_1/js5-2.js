// сумма покупки
let priceSum = 0;

// кол-во товаров
let priceCount = 0;

const basket = {
    // вычисляем  количество товара и сумму в корзине
    basketSum: function (price) {
        priceCount++;
        priceSum += parseInt(price.innerHTML);
        this.basketShow();
    },

    // печатаем на странице количество товара и сумму в корзине
    basketShow: function(){

        let sumInBasket = document.getElementById("sum_in_basket");
        sumInBasket.innerHTML = priceSum;
        let countInBasket = document.getElementById("count_in_basket");
        countInBasket.innerHTML = priceCount;
    }
}

const product = {
    // img|name|count|price
    prBase: [
        ['1.jpg', 'product-1', '2', '100'],
        ['2.jpg', 'product-2', '3', '120'],
        ['3.jpg', 'product-3', '2', '190'],
        ['4.jpg', 'product-4', '8', '10']
    ],

    // печатаем карточки товара
    productShow: function () {
        for (let i = 0; i < this.prBase.length; i++) {

            let newDiv = document.createElement('div');
            newDiv.className = "card";
            newDiv.innerHTML = '<div><img src="img/' + this.prBase[i][0] + '" alt="' + this.prBase[i][1] + '"></div><div>' + this.prBase[i][1] + '</div><div>Цена:<span id="price_' + i + '">' + this.prBase[i][3] + '</span></div><div><button id = "basket__add_' + i + '">добавть в корзину</button></div>';

            conteiner__card.appendChild(newDiv);
        }
    },
}


window.onload = function () {

    alert("OK");
    product.productShow();
    basket.basketShow();

    // обработка нажатий на кнопку ДОБАВИТЬ В КОРЗИНУ
    basket__add_0.addEventListener('click', function () {

        basket.basketSum(document.getElementById("price_0"));

    });
    basket__add_1.addEventListener('click', function () {

        basket.basketSum(document.getElementById("price_1"));

    });
    basket__add_2.addEventListener('click', function () {

        basket.basketSum(document.getElementById("price_2"));

    });
    basket__add_3.addEventListener('click', function () {

        basket.basketSum(document.getElementById("price_3"));
    });
}


