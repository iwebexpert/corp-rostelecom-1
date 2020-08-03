const basket = {

    // товары в корзине
    inBasket: [],

    //строка товара в массиве
    itemCount: 0,

    //цена в массиве
    itemPrice: 0,

    //описание товара в массиве
    itemDescription: '',

    // сумма покупки
    priceSum: 0,

    // кол-во товаров
    priceCount: 0,

    basketAdd(cardId, action) {
        // id|img|product description|count|price|big_img|
        console.log(parseInt(cardId));
        console.log(action);
        // проверяем, если в корзине добавляемый ID, тогда увеличиваем шт.
        for (let i = 0; i < this.inBasket.length; i++) {
            // alert("deletCardInSlider");
            if (this.inBasket[i][1] == cardId && action == "add") {

                let count = this.inBasket[i][4];
                this.inBasket[i].splice(4, 1, ++count);
                this.inBasket[i].splice(5, 1, this.inBasket[i][3] * count);
                console.log(this.inBasket);
                return;
            }
        }
        // пополняем корзину товаром id|description|price|multiCount|sumMultiCount
        console.log(this.inBasket);
        for (let j = 0; j < product.prBase.length; j++) {
            if (product.prBase[j][0] == parseInt(cardId)) {
                this.inBasket.push([this.itemCount]);
                this.inBasket[this.itemCount].push(parseInt(product.prBase[j][0]));// id
                this.inBasket[this.itemCount].push(product.prBase[j][2]);// description
                this.inBasket[this.itemCount].push(parseInt(product.prBase[j][4]));// price
                this.inBasket[this.itemCount].push(1);//кол-во товара одного именования
                this.inBasket[this.itemCount].push(product.prBase[j][4] * 1);//сумма товара одного именования
            }

        }

        this.itemCount++;
        console.log(this.inBasket);

    },
    // удаляем из массива корзины товар
    basketDelete(cardId, action) {
       
        // console.log("Выполняем basketDelete");
        // console.log(this.inBasket);
        // console.log("deletCardInSlider-" + 'action=' + action + 'cardId=' + cardId);
        for (let i = 0; i < this.inBasket.length; i++) {
           
            if (this.inBasket[i][1] == cardId) {
                this.inBasket.splice(i,1);
                // console.log("После удалени");
                // console.log(this.inBasket);
                this.cleanBasket();
                this.basketShow();
                this.slideBasketShow();
                if (!this.inBasket.length){
                    
                    //двигаем слайдер
                    document.querySelector("#sliderconteiner").classList.toggle("slider-on");
                }
                return;
            }
        }
    },
    // вычисляем  количество товара и сумму в корзине
    basketSum() {
        //id|description|price|multiCount|sumMultiCount
        // console.log("Длинна массива (кол-во товаров)-" + this.inBasket.length);
        // console.log("Содержание массива-" + this.inBasket);
        this.priceSum = 0;
        this.priceCount = 0;

        for (let i = 0; i < this.inBasket.length; i++) {
            // this.priceCount++;
            this.priceCount += this.inBasket[i][4];
            // console.log("inBasket[i][1]---" + this.inBasket[i][1]);
            this.priceSum += parseInt(this.inBasket[i][5]);
        }

        let basketSumCount = [this.priceSum, this.priceCount];

        return (basketSumCount);
    },
    
    // очистка сладера перед формированием нового HTML, перед открытием слайдера
    cleanBasket() {

        if (document.querySelector("#slider__basket")) {
            console.log("Выполнился cleanBasket");
            document.querySelector("#slider__basket").remove();
        }
    },
    // очистка массива корзины и закрытие слайдера по клику кнопки ОЧИСТИТЬ
    cleanBasketOffSlaider() {

        //снимаем обработчик на кнопку ОЧИСТИТЬ
        document.querySelector('#basket-clean').removeEventListener('click', event => this.cleanBasketOffSlaider());

        //снимаем обработчик на кнопку УДАЛИТЬ
        document.querySelector('#sliderconteiner').removeEventListener('click', event => this.deletCardInSlider(event));

        //снимаем обработчик на MENU
        menu.menuEventStop();

        this.cleanBasket();

        //двигаем слайдер
        document.querySelector("#sliderconteiner").classList.toggle("slider-on");

        //очищаем масив корзины, счетчик товаров
        this.inBasket = [];
        this.itemCount = 0;

        let sumInBasket = document.querySelector("#sum_in_basket");
        sumInBasket.innerHTML = 0;

        let countInBasket = document.querySelector("#count_in_basket");
        countInBasket.innerHTML = 0;
    },
    // удаляем карточку из слайдера
    deletCardInSlider() {

        //Проверка правильности области клика
        if (!(event.target.dataset.sliderCardId || event.target.dataset.sliderCardId)) {
            return;
        }

        let action = event.target.dataset.action;
        let cardId = +event.target.dataset.sliderCardId;

        //удаляем товар из слайдера
        basket.basketDelete(cardId, action);
    },
    // печатаем на странице количество товара и сумму в корзине
    basketShow() {

        this.cleanBasket();

        let basketSumCount = this.basketSum();

        let sumInBasket = document.querySelector("#sum_in_basket");
        sumInBasket.innerHTML = basketSumCount[0];

        let countInBasket = document.querySelector("#count_in_basket");
        countInBasket.innerHTML = basketSumCount[1];
    },
    // печать слайдера
    slideBasketShow() {
        
        //id|description|price|multiCount|sumMultiCount
        let allSum = 0;
        let html = '';
        let newDiv = document.createElement('div');
        newDiv.className = "slider__basket";
        newDiv.id = "slider__basket";
        html += '<div><div><button id="go-basket" class="go">Показать корзину</button></div></div>';
        html += '<div id="conteiner-on-1" class="conteiner-on-1">';
        html += '<div><button id="basket-clean" class="basket-clean">Очистить корзину</button></div>';

        for (let i = 0; i < this.inBasket.length; i++) {

            html += '<div class="slider-line">';
            html += '<div id="slider-pr_description_' + i + '">' + this.inBasket[i][2] + '</div>';
            html += '<div>Цена:<span id="slider-price_' + i + '">' + this.inBasket[i][3] + '</span></div>';
            html += '<div>' + this.inBasket[i][4] + 'шт.</div>';
            html += '<div><button id="slider-card-delete-' + i + '" data-action = "delete" data-slider-card-id = "' + this.inBasket[i][1] + '">удалить</button></div>';
            html += '</div>';

            allSum += this.inBasket[i][5];
        }
        html += '<div>Сумма покупки ' + allSum + '</div>';
        html += '</div>';

        html += '<div><button id="go-address">Указать адрес доставки</button></div>';
        html += '<div id="conteiner-on-2" class="conteiner-on-2 off"><div><div>';
        html += '<input type="text" placeholder="Ваше имя" size="22"></div>';
        html += '<div></div><input type="email" placeholder="Ваш емайл" size="22">';
        html += '<div></div><input type="text" placeholder="Контактный телефон" size="22">';
        html += '<div><textarea cols="30" rows="4" placeholder="Введите адрес доставки"></textarea></div>';
        html += '</div></div>';

        html += '<div><button id="go-comment">Добавить коментарий</button></div>';
        html += '<div id="conteiner-on-3" class="conteiner-on-3 off"><div>';
        html += '<div><textarea cols="30" rows="10" placeholder="Ваш комментарий"></textarea></div>';
        html += '</div></div>';
        html += '<div><button id="go-sale">Оформить заказ</button></div>';

        html += '</div>';

        newDiv.innerHTML = html;
        sliderconteiner.prepend(newDiv);

        if (document.querySelector('#basket-clean')) {

            //назначаем обработчик на кнопку ОЧИСТИТЬ
            document.querySelector('#basket-clean').addEventListener('click', event => this.cleanBasketOffSlaider(event));
        }
        if (document.querySelector('#sliderconteiner')) {

            //назначаем обработчик на кнопку УДАЛИТЬ
            document.querySelector('#sliderconteiner').addEventListener('click', event => this.deletCardInSlider(event));
        }
        if (document.querySelector('#slider__basket')) {

            //назначаем обработчик на MENU
            menu.menuEventStart();
        }
    },
}



const eventOnClick = {

    cardConteiner: document.querySelector('#conteiner__card'),
    modalConteiner: document.querySelector('#modal'),
    sliderButton: document.querySelector('#slider__button'),


    // инициализация обработчиков событий
    init() {
        this.cardConteiner.addEventListener('click', event => this.clickAddInBasket(event));
        this.cardConteiner.addEventListener('click', event => this.clickModalOpen(event));

        this.modalConteiner.addEventListener('click', event => this.clickModalClosed(event));

        this.sliderButton.addEventListener('click', e => this.clickSliderBasket(e));
    },

    // обработка нажатий на кнопку ДОБАВИТЬ В КОРЗИНУ
    clickAddInBasket(event) {

        //Проверка правильности области клика
        if (!event.target.dataset.action) {
            return;
        }

        let action = event.target.dataset.action;
        let cardId = +event.target.dataset.cardId;

        //добавляем товар
        basket.basketAdd(cardId, action);

        // пересобираем корзину
        basket.basketShow();
        basket.slideBasketShow();


    },

    // обработка нажатий на изобоажение для открытия МОДАЛЬНОГО ОКНА
    clickModalOpen(event) {

        //Проверка правильности области клика
        if (!event.target.dataset.modalopen) {
            return;
        }
        // удаляем модальное окно УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
        if (this.modalClosed()) {
            return;
        };

        let i = +event.target.dataset.card;

        let newDiv = document.createElement('div');
        newDiv.className = "modal__card";
        newDiv.id = "modal__card";
        newDiv.dataset.card = i;
        newDiv.innerHTML = '<div><img src="' + product.prBase[i][4] + '" alt="' + product.prBase[i][1] + '" data-modalopen="true"  data-card="' + i + '" id="modal_img_' + i + '"></div>';

        modal__content.prepend(newDiv);

        document.querySelector("#modal").classList.toggle("closed");

    },

    // закрываем модальное окно УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
    clickModalClosed(event) {

        if (!event.target.dataset.modalclosed) {
            return;
        }

        this.modalClosed();
    },

    // удаляем модальное окно УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
    modalClosed() {

        if (document.querySelector("#modal__card")) {
            document.querySelector("#modal__card").remove();
            document.querySelector("#modal").classList.toggle("closed");
            return true;
        }
    },
    // показать/спрятать слайд корзины
    clickSliderBasket(e) {

        let sliderBasket = document.querySelector("#slider__basket");

        if (!e.target.getAttribute("id") == "slide__button") {
            return;
        }
        // если в корзина пуста (слайд без тоаров), слайд не открывается
        if (!sliderBasket) {
            return;
        }

        //двигаем слайдер
        document.querySelector("#sliderconteiner").classList.toggle("slider-on");

    },

}

const menu = {

    menuEventStart() {

        document.querySelector('#go-basket').addEventListener('click', event => this.goBasket(event));
        document.querySelector('#go-address').addEventListener('click', event => this.goAddress(event));
        document.querySelector('#go-comment').addEventListener('click', event => this.goComment(event));
    },
    menuEventStop() {

        document.querySelector('#go-basket').removeEventListener('click', event => this.goBasket(event));
        document.querySelector('#go-address').removeEventListener('click', event => this.goAddress(event));
        document.querySelector('#go-comment').removeEventListener('click', event => this.goComment(event));
    },
    goBasket(event) {

        if (document.querySelector("#conteiner-on-1").classList.contains("off")) {
            document.querySelector("#conteiner-on-1").classList.toggle("off");
        }
        if (!document.querySelector("#conteiner-on-2").classList.contains("off")) {
            document.querySelector("#conteiner-on-2").classList.toggle("off");
        }
        if (!document.querySelector("#conteiner-on-3").classList.contains("off")) {
            document.querySelector("#conteiner-on-3").classList.toggle("off");
        }
    },
    goAddress(event) {

        //alert("goAddress");
        if (!document.querySelector("#conteiner-on-1").classList.contains("off")) {
            document.querySelector("#conteiner-on-1").classList.toggle("off");
        }
        if (document.querySelector("#conteiner-on-2").classList.contains("off")) {
            document.querySelector("#conteiner-on-2").classList.toggle("off");
        }
        if (!document.querySelector("#conteiner-on-3").classList.contains("off")) {
            document.querySelector("#conteiner-on-3").classList.toggle("off");
        }
    },
    goComment(event) {
        //alert("goAddress");
        if (!document.querySelector("#conteiner-on-1").classList.contains("off")) {
            document.querySelector("#conteiner-on-1").classList.toggle("off");
        }
        if (!document.querySelector("#conteiner-on-2").classList.contains("off")) {
            document.querySelector("#conteiner-on-2").classList.toggle("off");
        }
        if (document.querySelector("#conteiner-on-3").classList.contains("off")) {
            document.querySelector("#conteiner-on-3").classList.toggle("off");
        }

    },
}

const product = {
    // id|img|product description|count|price|big_img|
    prBase: [
        ['22', 'https://velik-tlt.ru/upload/iblock/d98/d98d51c812f96b1bd2ad5df1803fc014.jpg',
            'product description 1', '2', '100', 'https://velik-tlt.ru/upload/iblock/539/53991ba5ee76170522cef22effd8d83f.jpg'],
        ['29', 'https://velik-tlt.ru/upload/iblock/481/4810ab93d019d519a01f8492c18577dc.jpg', 'produc description 2', '3', '120', 'https://velik-tlt.ru/upload/iblock/5b6/5b6fac38de2109f9bfc1c524f8a30461.jpg'],
        ['34', 'https://velik-tlt.ru/upload/iblock/c9b/c9bf34ea0bc9db0d569c11a3584aab3e.jpeg', 'product description 3', '2', '190', 'https://velik-tlt.ru/upload/iblock/bb3/bb327d28aa67309e1eef8f0a070c175c.jpeg'],
        ['121', 'https://velik-tlt.ru/upload/iblock/3a2/3a250bdf8ba8dbd76a1295263b182fcc.jpg', 'product description 4', '8', '10', 'https://velik-tlt.ru/upload/iblock/4aa/4aa4ad510619af969a300f66ddae7631.jpg']
    ],

    // печатаем карточки товара
    productShow() {
        for (let i = 0; i < this.prBase.length; i++) {

            let newDiv = document.createElement('div');
            newDiv.className = "card";
            newDiv.dataset.card = i;
            newDiv.innerHTML = '<div><img src="' + this.prBase[i][1] + '" alt="' + this.prBase[i][2] + '" data-modalopen="true"  data-card="' + i + '" id="modal_img_' + i + '"></div><div id="pr_description_' + i + '">' + this.prBase[i][2] + '</div><div>Цена:<span id="price_' + i + '">' + this.prBase[i][4] + '</span></div><div><button data-action = "add" data-card-id="' + this.prBase[i][0] + '">добавть в корзину</button></div>';

            conteiner__card.append(newDiv);
        }
    },
}

function init() {

    product.productShow();
    eventOnClick.init();

}

window.onload = function () {

    init();
}
