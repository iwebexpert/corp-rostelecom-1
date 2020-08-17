const eventOnClick = {
    
    cardConteiner: document.querySelector('#conteiner__card'),
    sliderConteiner: document.querySelector('#sliderconteiner'),
    modalConteiner: document.querySelector('#modal'),
    basketMoveSlider: document.querySelector('#conteiner__basket'),

    c1: document.querySelector("#conteiner-on-1"),
    c2: document.querySelector("#conteiner-on-2"),
    c3: document.querySelector("#conteiner-on-3"),

    temp: false,

    // инициализация обработчиков событий
    init() {
        // alert("init");
        this.cardConteiner.addEventListener('click', e => this.clickAddInBasket(e));
        this.sliderConteiner.addEventListener('click', e => this.clickDelInBasket(e));
        this.cardConteiner.addEventListener('click', e => this.clickModalOpen(e));
        this.modalConteiner.addEventListener('click', e => this.clickModalClosed(e));
        this.basketMoveSlider.addEventListener('click', e => this.clickMoveSlider(e));

        document.querySelector('#go-basket').addEventListener('click', e => this.goBasket(e));
        document.querySelector('#go-address').addEventListener('click', e => this.goAddress(e));
        document.querySelector('#go-comment').addEventListener('click', e => this.goComment(e));

    },

    // обработка нажатий на кнопку ДОБАВИТЬ В КОРЗИНУ
    clickAddInBasket(e) {

        //Проверка правильности области клика
        if (!e.target.dataset.id) {
            return;
        }
        let id = e.target.dataset.id;

        const basket = new Basket();

        if (document.querySelector(`.slider-card div button[data-id="${id}"]`)){

            let newCount = document.querySelector(`.slider-card div button[data-id="${id}"]`).getAttribute('data-count');
            newCount++;
            
            //увеличиваем кол-во товара на 1шт, пересобираем корзину
            basket.update(id, newCount);
            basket.getBasket().then(() => {
                //console.log(basket.localBasket());
                //пересобираем корзину
                document.querySelector('#sum_in_basket').textContent = basket.total();
                document.querySelector('#count_in_basket').textContent = basket.count();
                document.querySelector('#slider_items').innerHTML = basket.slider();
            });

            return;
        }

        basket.add(e.target.dataset);
        basket.getBasket().then(() => {
            console.log(basket.localBasket());
            //пересобираем корзину
            document.querySelector('#sum_in_basket').textContent = basket.total();
            document.querySelector('#count_in_basket').textContent = basket.count();
            document.querySelector('#slider_items').innerHTML = basket.slider();
        });

    },
    clickDelInBasket(e){

        //Проверка правильности области клика
        if (!e.target.dataset.id) {
            return;
        }

        const basket = new Basket();

        // удаляем товар, пересобираем корзину
        basket.del(e.target.dataset.id);
        basket.getBasket().then(() => {
            //console.log(basket.localBasket());
            //пересобираем корзину
            document.querySelector('#sum_in_basket').textContent = basket.total();
            document.querySelector('#count_in_basket').textContent = basket.count();
            document.querySelector('#slider_items').innerHTML = basket.slider();
            if (!basket.localBasket().length){
                document.querySelector("#sliderconteiner").classList.toggle("slider-on");
            }
        });
        
    },

    // обработка нажатий на изобоажение для открытия МОДАЛЬНОГО ОКНА
    clickModalOpen(e) {
        
        //Проверка правильности области клика
        if (!e.target.dataset.modalOpen) {
            // alert("111111");
            // this.clickModalClosed();
            return;
        }
        // удаляем модальное окно УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
        if (this.ModalClosed()) {
            return;
        };
        // alert("clickModalOpen");
        let imgBig = e.target.src.replace(/items\/m/g, "items\/b")
        let div = document.createElement('div');
        div.className = "modal__card";
        div.id = "modal__card";

        div.innerHTML = `<div><img src="${imgBig}" alt="${e.target.alt}" data-modal-open="true"></div>`;

        modal__content.prepend(div);

        document.querySelector("#modal").classList.toggle("closed");

    },

    // закрываем модальное окно УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
    clickModalClosed(e) {

        if (!event.target.dataset.modalClosed) {
            return;
        }
        // удаляем модальное окно УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
        this.ModalClosed();
    },

    ModalClosed(){
        // удаляем модальное окно УВЕЛИЧЕННОГО ИЗОБРАЖЕНИЯ
        if (document.querySelector("#modal__card")) {
            document.querySelector("#modal__card").remove();
            document.querySelector("#modal").classList.toggle("closed");
            return true;
        }
    },
    clickMoveSlider(e){
        // если элемент не создан, т.е. корзина пуста (слайд без тоаров), слайд не открывается
        if (!document.querySelector("#slider__basket")) {
            alert("Корзина пуста");
            return;
        }
        if (!e.target.getAttribute("id") == "slide__button") {
            return;
        }

        const basket = new Basket();

        basket.getBasket().then(() => {
            //console.log(basket.localBasket());
            if (!basket.localBasket().length) {
                alert("Корзина пуста");
            }else{
                //двигаем слайдер
                document.querySelector("#sliderconteiner").classList.toggle("slider-on");
            }
        });
    },
    goBasket(e) {

        if (this.c1.classList.contains("off")) {
            this.c1.classList.toggle("off");
        }
        if (!this.c2.classList.contains("off")) {
            this.c2.classList.toggle("off");
        }
        if (!this.c3.classList.contains("off")) {
            this.c3.classList.toggle("off");
        }
    },
    goAddress(e) {

        //alert("goAddress");
        if (!this.c1.classList.contains("off")) {
            this.c1.classList.toggle("off");
        }
        if (this.c2.classList.contains("off")) {
            this.c2.classList.toggle("off");
        }
        if (!this.c3.classList.contains("off")) {
            this.c3.classList.toggle("off");
        }
    },
    goComment(e) {
        //alert("goAddress");
        if (!this.c1.classList.contains("off")) {
            this.c1.classList.toggle("off");
        }
        if (!this.c2.classList.contains("off")) {
            this.c2.classList.toggle("off");
        }
        if (this.c3.classList.contains("off")) {
            this.c3.classList.toggle("off");
        }

    },
}

function init() {

    // печатаем карточки товаров
    const items = new Catalog();
    items.getCatalog().then(() => {
        document.querySelector('#conteiner__card').innerHTML = items.showCatalog();
    }).catch((error) => {
        console.error(error);
    });

    const basket = new Basket();

    // печатаем краткое состояние корзины
    basket.getBasket().then(() => {
        document.querySelector('#sum_in_basket').textContent = basket.total();
        document.querySelector('#count_in_basket').textContent = basket.count();
        document.querySelector('#slider_items').innerHTML = basket.slider();
    }).catch((error) => {
        console.error(error);
    });
    
    // запускаем обработчики событий
    eventOnClick.init();

}

window.onload = function () {

    init();

}
