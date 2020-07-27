class Product {
    constructor(name, price, count) {
        this._name = name;
        this._price = price;
        this._count = count;
    }

    get Count() {
        return this._count;
    }

    get Сost() {
        return this.Count * this._price;
    }
}

class Products {
    constructor(products) {
        this._products = products;
    }

    get Counts() {
        let counts = 0;
        for (let i = 0; i < this._products.length; i++)
            counts += this._products[i].Count;
        return counts;
    }

    get Сosts() {
        let сosts = 0;
        for (let i = 0; i < this._products.length; i++)
            сosts += this._products[i].Сost;
        return сosts;
    }

    add(products) {
        this._products.push(products);
    }
}


let products = new Products([]);

function getCart() {
    return document.querySelector('#cart');
}

function getModal() {
    return document.querySelector('#modal');
}

function closeModal() {
    getModal().classList.remove("open");
}

function openModal() {
    getModal().classList.add("open");
}

function getListProductImg(name) {
    if (name.toUpperCase() == "Клавиатура".toUpperCase())
        return [
            "https://img.mvideo.ru/Pdb/50130903b.jpg",
            "https://img.mvideo.ru/Pdb/50130903b1.jpg",
            "https://img.mvideo.ru/Pdb/50130903b2.jpg"
        ];
    else
        if (name.toUpperCase() == "Мышка".toUpperCase())
            return [
                "https://img.mvideo.ru/Pdb/50130917b.jpg",
                "https://img.mvideo.ru/Pdb/50130917b1.jpg",
                "https://img.mvideo.ru/Pdb/50130917b2.jpg",
                "https://img.mvideo.ru/Pdb/50130917b3.jpg"

            ]
        else
            if (name.toUpperCase() == "коврик".toUpperCase())
                return [
                    "https://img.mvideo.ru/Pdb/50049282b.jpg",
                    "https://img.mvideo.ru/Pdb/50049282b1.jpg",
                    "https://img.mvideo.ru/Pdb/50049282b2.jpg",
                    "https://img.mvideo.ru/Pdb/50049282b3.jpg",
                    "https://img.mvideo.ru/Pdb/50049282b5.jpg"
                ]
            else
                return [];
}

function prepareModal(name, currentSrc) {
    let modal_productListImg = document.getElementById("modal_productListImg");
    let img_productFullImg = document.getElementById("img_productFullImg");
    let listProductImg = getListProductImg(name);

    img_productFullImg.src = currentSrc;

    modal_productListImg.innerHTML = "";
    for (let i = 0; i < listProductImg.length; i++) {
        let productImg = document.createElement('img');
        productImg.className = "productImg";
        productImg.src = listProductImg[i];
        productImg.alt = "img";
        productImg.onclick = function (event) {
            let clear = document.getElementsByClassName("productImg-current");
            for (let k = 0; k < clear.length; k++)
                clear[k].classList.remove("productImg-current");

            productImg.classList.add("productImg-current");
            img_productFullImg.src = listProductImg[i];
        }

        if (listProductImg[i] == currentSrc)
            productImg.classList.add("productImg-current");

        modal_productListImg.appendChild(productImg);
    }
}

function addProduct(name, price) {
    const contentProduct = document.createElement('div');
    contentProduct.className = "product";
    contentProduct.id = "product-" + name;

    const nameProduct = document.createElement('h3');
    nameProduct.textContent = "Название товара: " + name;
    contentProduct.appendChild(nameProduct);

    const priceProduct = document.createElement('h4');
    priceProduct.textContent = "Цена на единицу товара: " + price + " руб.";
    contentProduct.appendChild(priceProduct);

    const productListImg = document.createElement('div');
    productListImg.className = "productListImg";
    productListImg.id = "productImg-" + name;
    contentProduct.appendChild(productListImg);

    let listProductImg = getListProductImg(name);
    for (let i = 0; i < listProductImg.length; i++) {
        let productImg = document.createElement('img');
        productImg.className = "productImg";
        productImg.src = listProductImg[i];
        productImg.alt = "img";
        productImg.onclick = function (event) {
            prepareModal(name, listProductImg[i]);
            openModal();
        }
        productListImg.appendChild(productImg);
    }

    const btn = document.createElement('button');
    btn.textContent = "Добавить";
    btn.className = "button";
    btn.id = "button-" + name;
    btn.addEventListener('click', function () {
        products.add(new Product("name", price, 1));
        getCart().textContent = "Товаров в корзине " + products.Counts + " шт." + " на общую сумму " + products.Сosts + " руб.";
        getCart().classList.remove("cart-empty");
    });
    contentProduct.appendChild(btn);

    document.querySelector('#cart-container').appendChild(contentProduct);
}

function CreateCart() {
    const contentCart = document.createElement('div');
    contentCart.textContent = "Корзина пуста";
    contentCart.className = "cart cart-empty";
    contentCart.id = "cart";
    document.querySelector('#cart-container').appendChild(contentCart);

    addProduct("Клавиатура", 1000);
    addProduct("Мышка", 100);
    addProduct("Коврик", 10);

    const btn = document.createElement('button');
    btn.textContent = "Очистить корзину";
    btn.className = "button button-clear";
    btn.id = "button-clear"
    btn.addEventListener('click', function () {
        products = new Products([]);
        getCart().classList.add("cart-empty");
        getCart().textContent = "Корзина пуста";
    });
    document.querySelector('#cart-container').appendChild(btn);

}
