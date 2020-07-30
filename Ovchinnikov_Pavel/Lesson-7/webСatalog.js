// Класс отвечает за вывод каталога товаров в браузер

class WebСatalog {
    constructor(listProduct, webBasket, webModal) {
        this._listProduct = listProduct != null ? listProduct : [];
        this._webBasket = webBasket;
        this._webModal = webModal;
    }

    addProduct(webBasket, webModal, name, price, images = []) {
        const contentProduct = document.createElement('div');
        contentProduct.className = "product";
        contentProduct.id = "product-" + name;

        const nameProduct = document.createElement('h3');
        //nameProduct.textContent = "Название товара: " + name;
        nameProduct.innerHTML = "Название товара: " + name + "<span id = 'span-" + name + "' class = 'span'> - товар в корзине</span>";
        _AppendChild(contentProduct, nameProduct);

        const priceProduct = document.createElement('h4');
        priceProduct.textContent = "Цена на единицу товара: " + price + " руб.";
        _AppendChild(contentProduct, priceProduct);

        const productListImg = document.createElement('div');
        productListImg.className = "productListImg";
        productListImg.id = "productImg-" + name;
        _AppendChild(contentProduct, productListImg);

        for (let i = 0; i < images.length; i++) {
            let productImg = document.createElement('img');
            productImg.className = "productImg";
            productImg.src = images[i];
            productImg.alt = "img";
            productImg.onclick = function (event) {
                webModal.Prepare(images, i);
                webModal.Open();
            }
            _AppendChild(productListImg, productImg);
        }

        //** кнопка "Добавить в корзину"
        const btnAdd = document.createElement('button');
        btnAdd.textContent = "Добавить в корзину";
        btnAdd.className = "button";
        btnAdd.onclick = function (event) {
            webBasket.Basket.add(new Products(new Product(name, price), 1));
            //webBasket.Show();
            webBasket.Refresh();

            // let spanProductInBasket = document.evaluate("//h3[contains(text(), 'Клавиатура')]/span", document, null, XPathResult.ANY_TYPE, null);
            let span = document.getElementById("span-" + name);
            if (span != null)
                span.classList.add("visible");

        }
        _AppendChild(contentProduct, btnAdd);

        //** кнопка "Убрать из корзины"
        const btnClear = document.createElement('button');
        btnClear.textContent = "Убрать из корзины";
        btnClear.className = "button button-clear";
        btnClear.onclick = function (event) {
            webBasket.Basket.clearProduct(name);
            //webBasket.Show();
            webBasket.Refresh();

            let span = document.getElementById("span-" + name);
            if (span != null)
                span.classList.remove("visible");
        };
        _AppendChild(contentProduct, btnClear);

        _AppendChild(document.getElementById('catalog-container'), contentProduct);
    }

    Show() {
        for (let i = 0; i < this._listProduct.length; i++) {
            this.addProduct(this._webBasket, this._webModal, this._listProduct[i].Name, this._listProduct[i].Price, this._listProduct[i].Images);
        }
    }
}