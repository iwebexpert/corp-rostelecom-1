class classCatalog {
    constructor(htmlObj, basket) {
        this.htmlObj = htmlObj;
        this.products = [];
        this.shoppingCart = basket;
    };

    updateView() {
        //отрисовываем каталог 
        this.htmlObj.innerHTML = "";

        for (let product of this.products) {
            let productView = product.renderProduct();

            //Добавляем кнопку "Добавить в корзину" к продукту
            let buttonBuy = document.createElement('button');
            buttonBuy.classList.add('buyButton');
            //id продукта зашиваем в  кнопку покупки
            buttonBuy.setAttribute('product_id', product.id);
            buttonBuy.textContent = 'Добавить в корзину';
            buttonBuy.addEventListener('click', this.buyProductHandler.bind(this));
            productView.appendChild(buttonBuy);
            //обработчик на картинку
            productView.querySelector('.thumbnail').addEventListener('click', this.showModalProductImgs.bind(this));

            this.htmlObj.appendChild(productView);
        };
    };

    //функция показывает модальное окно с картинками продукта
    showModalProductImgs(event) {
        //получаем id продукта из строки каталога
        const id = event.target.parentElement.attributes.product_id.value;
        const product = this.getProductById(id);

        const modalElem = createModal();

        //const imgContainer = document.createElement('div');
        //imgContainer.classList.add('imgContainer');

        const imgContainer = document.querySelector('.imgContainer');
        stash.push({ htmlObj: imgContainer, html: imgContainer.innerHTML });
        imgContainer.innerHTML = '';
        const overlay = document.querySelector('.js-overlay-modal');
        //overlay.classList.add('active');

        //добавляем в окно все картинки из продукта
        //все скрываем кроме первого
        for (let i = 0; i < product.imgUrls.length; i++) {
            const img = document.createElement('img');
            img.alt = 'Image_' + i;
            img.id = 'img_' + i;
            img.classList.add('imgModal');
            img.src = product.imgUrls[i];
            img.classList.add('hide');
            if (i === 0) {
                img.classList.remove('hide');
            };
            imgContainer.appendChild(img);
        };

        modalElem.appendChild(imgContainer);
        //карусель картинок продукта
        modalElem.addEventListener('click', this.nextImg);
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
        imgContainer.classList.remove('hide');
        //modalElem.classList.add('active');
        showModal(modalElem);
    };

    pressKeyHandler(event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.nextImg();
                break;
            case 'ArrowRight':
                this.nextImg();
                break;
        };
    };

    //по щелчку мыши циклический показ картинок в окне
    nextImg() {
        const imgs = document.querySelectorAll('.imgModal');
        console.log(imgs);
        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            console.log(img.style.visibility);
            if (!img.classList.contains('hide')) {
                let id = img.id.split('_')[1];
                let nextId = (+id + 1) % imgs.length;
                console.log(nextId);
                img.classList.add('hide');
                imgs[nextId].classList.remove('hide');
                break;
            };
        };
    };

    //обработчик кнопок Добавить в корзину
    buyProductHandler(event) {
        const btn = event.target;
        //вытаскиваем из кнопки зашитый id продукта
        const id = btn.attributes.product_id.value;
        console.log(id);
        if (id) {
            let product = this.getProductById(id);
            if (product) {
                //добавляем продукт в корзину
                this.shoppingCart.addItem(product, 1);
                this.shoppingCart.updateView();
            } else {
                console.log('Id продукта не найден в каталоге');
            };
        } else {
            console.log('Id продукта не может быть пустым');
        };
        event.stopPropagation();
    };

    addItem(item) {
        this.products.push(item);
    };

    getProductById(id) {
        for (let item of this.products) {
            if (item.id == id) {
                return item;
            };
        };
    };
};