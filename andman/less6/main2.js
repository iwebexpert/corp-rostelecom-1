const product = {
    items: [
        {
            "name": "Cofe", "cost": 150, "curr": "RUR",
            "images": ["cofe_img1.png", "cofe_img2.png", "cofe_img3.jpg"]
        },
        {
            "name": "Cake", "cost": 50, "curr": "RUR",
            "images": ["cake_img1.jpg", "cake_img2.jpg", "cake_img3.jpg", "cake_img4.jpg"]
        },
        {
            "name": "Sugar", "cost": 15, "curr": "RUR",
            "images": ["sugar_img1.jpg", "sugar_img2.jpg"]
        },
        {
            "name": "Milk", "cost": 25, "curr": "RUR",
            "images": ["milk_img1.jpg", "milk_img2.png", "milk_img3.png"]
        },
        {
            "name": "Tea", "cost": 130, "curr": "RUR",
            "images": ["tea_img1.png", "tea_img2.png", "tea_img3.jpg"]
        },
        {
            "name": "GreenTea", "cost": 200, "curr": "RUR",
            "images": ["gtea_img1.jpg", "gtea_img2.jpg"]
        }
    ],
    showProducts: function () {
        console.log('Прейскурант:');
        for (let i = 0; i < this.items.length; i++)
            console.log(this.items[i].name, ' - ', this.items[i].cost, this.items[i].curr);

    },
    getCatalog: function () {
        return this.items;
    },
    getItem: function (item_num) {
        return this.items[item_num] ? this.items[item_num] : {};
    },
    catalogDiv: document.querySelector('#catalog'),

    drawCatalog() {
        this.catalogDiv.classList.add('catalog');
        const divCatalog = document.createElement('div');
        divCatalog.classList.add('price-list');
        const divH3 = document.createElement('h3');
        divH3.classList.add('h3-catalog');
        divH3.innerHTML = 'Каталог';
        divCatalog.appendChild(divH3);

        for (let i = 0; i < this.items.length; i++) {
            const divItem = document.createElement('div');
            divItem.classList.add('item-list');
            for (let key in this.items[i]) { //пробегаем по объекту со свойствами товара 
                if (key != 'images') {
                    const divPrice = document.createElement('div');
                    divPrice.classList.add('price-item');
                    divPrice.classList.add('price-' + key);//стили для разных свойств будут отличаться
                    divPrice.innerHTML = this.items[i][key];
                    divItem.appendChild(divPrice);
                }
                else {
                    //divItem.dataset.images = catalog[i][key];
                    const divBtnSee = document.createElement('button');
                    divBtnSee.classList.add('button-see');
                    divBtnSee.classList.add('price-item');
                    divBtnSee.innerHTML = 'Посмотреть';
                    divBtnSee.dataset.images = this.items[i][key];
                    divBtnSee.dataset.nameItem = this.items[i].name;
                    divBtnSee.addEventListener('click', function (event) {
                        //Предварительно очистим блоки
                        modal.clearImages();

                        modal.editTitle(this.dataset.nameItem);

                        let imgArray = this.dataset.images.split(',');
                        console.log(imgArray);
                        for (let i = 0; i < imgArray.length; i++) {
                            modal.addImg(modal.imgFolder + imgArray[i], 'Миниатюра товара');
                            if (i === 0) { //Первую картинку показываем по-умолчанию
                                modal.curImg(modal.imgFolder + imgArray[i], 'Изображение товара');
                            }
                        }
                        //Покажем модальное окно
                        modal.openModal();
                    })
                    divItem.appendChild(divBtnSee);
                }
            };
            const divBtnAdd = document.createElement('button');
            divBtnAdd.classList.add('button-add');
            divBtnAdd.classList.add('price-item');
            divBtnAdd.innerHTML = 'Купить';
            divBtnAdd.dataset.id = i;
            divBtnAdd.addEventListener("click", function () {
                basket.addItem(product.getItem(this.dataset.id), 1);
                basket.drawBasket();
            });
            divItem.appendChild(divBtnAdd);
            divCatalog.appendChild(divItem);

        }

        this.catalogDiv.appendChild(divCatalog);
        //добавим на страницу модальное окно

        //Наполнение модального окна        

        this.catalogDiv.appendChild(modal.createModal());
    },
};

const modal = {
    divImgBox: document.createElement('div'),
    divImgContainer: document.createElement('div'),
    divImgHi: document.createElement('div'),
    divTitleText: document.createElement('div'),
    imgCur: document.createElement('img'),
    imgFolder: 'img/',

    addImg(src, alt) {
        const imgItem = document.createElement('img');
        imgItem.classList.add('item-img');
        imgItem.src = src;
        imgItem.alt = alt;
        this.divImgContainer.appendChild(imgItem);
        imgItem.addEventListener('click', function () { //По клику на миниатюре выводим большое изображения
            modal.curImg(this.src, 'Изображение товара');
            console.log(this.src);
        });
    },
    curImg(src, alt) {
        this.divImgHi.innerHTML = '';
        this.imgCur.src = src;
        this.imgCur.alt = alt;
        this.imgCur.classList.add('img-cur');
        this.divImgHi.appendChild(this.imgCur);
    },

    closeModal() {
        this.divImgBox.classList.add('modal-close');
        this.divImgBox.classList.remove('modal-open');
    },
    openModal() {
        this.divImgBox.classList.remove('modal-close');
        this.divImgBox.classList.add('modal-open');
    },

    createModal() {
        this.divImgBox.classList.add('modal-img-box');
        this.closeModal();

        this.divImgBox.addEventListener('click', function (event) {
            //Проверим, что под нами необходимый класс 'modal-open'
            let classArray = event.target.className.split(' ');
            for (let cls = 0; cls < classArray.length; cls++)
                if (classArray[cls] === 'modal-open')
                    modal.closeModal();
        });
        const divImg = document.createElement('div');
        divImg.classList.add('modal-img');
        const divTitle = document.createElement('div');
        divTitle.classList.add('modal-title');

        this.divTitleText.classList.add('title');
        divTitle.appendChild(this.divTitleText);
        const btnClose = document.createElement('button');
        btnClose.classList.add('btn-close');
        btnClose.innerHTML = 'X';
        btnClose.addEventListener('click', function () {
            modal.closeModal();
        });

        divTitle.appendChild(btnClose);
        divImg.appendChild(divTitle);

        this.divImgContainer.classList.add('img-container');


        this.divImgHi.classList.add('img-hi-res');
        divImg.appendChild(this.divImgContainer);
        divImg.appendChild(this.divImgHi);
        this.divImgBox.appendChild(divImg);

        return this.divImgBox;
    },
    clearImages() {
        this.divImgContainer.innerHTML = '';
        this.divImgHi.innerHTML = '';
    },
    editTitle(title) {
        this.divTitleText.innerHTML = title;
    },
};


const basket = {
    items: [],
    addItem: function (item, item_count) {
        this.items.push({ "goods": item, "count": item_count });
    },
    countBasketPrice: function () {
        let amount = 0;
        for (let i = 0; i < this.items.length; i++)
            amount += this.items[i].goods.cost * this.items[i].count;
        return amount;
    },
    countBasketItems: function () {
        return this.items.length;
    },

    basketDiv: document.querySelector('.basket-container'),

    drawBasket() {
        this.basketDiv.innerHTML = '';
        const divBasket = document.createElement('div');
        divBasket.classList.add('basket');
        //Сгенирируем заголовок
        const divH3 = document.createElement('h3');
        divH3.classList.add('h3-basket');
        divH3.innerHTML = 'Корзина';
        //Сгенерируем сообщение 
        const divMessage = document.createElement('div');
        divMessage.classList.add('message');
        divMessage.innerHTML = this.countBasketItems() > 0 ?
            `В корзине:  ${this.countBasketItems()} товаров на сумму ${this.countBasketPrice()} рублей` : 'Корзина пуста';
        divBasket.appendChild(divH3);
        divBasket.appendChild(divMessage);
        //Добавляем элементы в DOM
        this.basketDiv.appendChild(divBasket);
    },
}

basket.drawBasket();

product.drawCatalog();