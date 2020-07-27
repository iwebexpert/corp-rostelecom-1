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
    basketShow: function () {

        let sumInBasket = document.getElementById("sum_in_basket");
        sumInBasket.innerHTML = priceSum;
        let countInBasket = document.getElementById("count_in_basket");
        countInBasket.innerHTML = priceCount;
    }
}

const product = {
    // img|name|count|price|big_img
    prBase: [
        ['https://velik-tlt.ru/upload/iblock/d98/d98d51c812f96b1bd2ad5df1803fc014.jpg',
        'product description', '2', '100','https://velik-tlt.ru/upload/iblock/539/53991ba5ee76170522cef22effd8d83f.jpg'],
        ['https://velik-tlt.ru/upload/iblock/481/4810ab93d019d519a01f8492c18577dc.jpg', 'produc description', '3', '120','https://velik-tlt.ru/upload/iblock/5b6/5b6fac38de2109f9bfc1c524f8a30461.jpg'],
        ['https://velik-tlt.ru/upload/iblock/c9b/c9bf34ea0bc9db0d569c11a3584aab3e.jpeg', 'product description', '2', '190','https://velik-tlt.ru/upload/iblock/bb3/bb327d28aa67309e1eef8f0a070c175c.jpeg'],
        ['https://velik-tlt.ru/upload/iblock/3a2/3a250bdf8ba8dbd76a1295263b182fcc.jpg', 'product description', '8', '10','https://velik-tlt.ru/upload/iblock/4aa/4aa4ad510619af969a300f66ddae7631.jpg']
    ],
    cardConteiner: document.getElementById('conteiner__card'),
    modalConteiner: document.getElementById('modal'),


    // печатаем карточки товара
    productShow: function () {
        for (let i = 0; i < this.prBase.length; i++) {

            let newDiv = document.createElement('div');
            newDiv.className = "card";
            newDiv.dataset.card = i;
            newDiv.innerHTML = '<div><img src="' + this.prBase[i][0] + '" alt="' + this.prBase[i][1] + '" data-modalopen="true"  data-card="' + i + '" id="modal_img_' + i + '"></div><div>' + this.prBase[i][1] + '</div><div>Цена:<span id="price_' + i + '">' + this.prBase[i][3] + '</span></div><div><button data-addinbasket = "true" data-card="' + i + '">добавть в корзину</button></div>';

            conteiner__card.appendChild(newDiv);
        }
    },
    // инициализация обработчиков событий
    initHandlers() {
        this.cardConteiner.addEventListener('click', event => this.clickHandler(event));
        this.cardConteiner.addEventListener('click', event => this.clickModalOpen(event));
        this.modalConteiner.addEventListener('click', event => this.clickModalClosed(event));
    },

    // обработка нажатий на кнопку ДОБАВИТЬ В КОРЗИНУ
    clickHandler(event) {

        if (!this.isClickByButton(event)) {

            return;
        }

        let card_data = +event.target.dataset.card;
        basket.basketSum(document.getElementById("price_" + card_data));
    },

    //Проверка правильности области клика
    isClickByButton(event) {

        return event.target.dataset.addinbasket === 'true';
    },

    // обработка нажатий на изобоажение для открытия МОДАЛЬНОГО ОКНА
    clickModalOpen(event) {
        if (!this.isClickByImg(event)) {

            return;
        }
        let i = +event.target.dataset.card;

        let newDiv = document.createElement('div');
        newDiv.className = "modal__card";
        newDiv.id = "modal__card";
        newDiv.dataset.card = i;
        newDiv.innerHTML = '<div><img src="' + this.prBase[i][4] + '" alt="' + this.prBase[i][1] + '" data-modalopen="true"  data-card="' + i + '" id="modal_img_' + i + '"></div>';

        modal__content.appendChild(newDiv);

        document.querySelector("#modal").classList.toggle("closed");

    },
    isClickByImg(event) {

        return event.target.dataset.modalopen === 'true';

    },
    // закрываем МОДАЛЬНОЕ ОКНО
    clickModalClosed(event) {

        if (!this.isClickByClosed(event)) {

            return;
        }
        document.getElementById('modal__content').removeChild(document.getElementById('modal__card'));
        document.querySelector("#modal").classList.toggle("closed");
    },
    isClickByClosed(event) {

        return event.target.dataset.closed === 'true';

    },
}


window.onload = function () {

    basket.basketShow();
    product.productShow();
    product.initHandlers();
}
