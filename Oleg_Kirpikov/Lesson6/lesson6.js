const shoppingCart = {
    items: [],
    htmlObj: null,
    getItems: function () {
        return this.items
    },

    addItem: function (product, count) {
        let item = {
            product: product,
            count: count,
        };
        this.items.push(item)
    },
    updateView: function () {
        if (this.htmlObj.firstChild) {
            this.htmlObj.removeChild(this.htmlObj.firstChild);
        };
        if (this.items.length < 1) {
            let p = document.createElement('p');
            p.className = 'errorMessage';
            p.textContent = 'Корзина пуста';
            this.htmlObj.appendChild(p);
        } else {
            let p = document.createElement('p');
            p.className = 'Message';
            let total = this.countBasketPrice();
            p.textContent = 'В корзине: ' + total.count + ' товаров на сумму ' + total.sum + ' рублей';
            this.htmlObj.appendChild(p);
        }
    },

    countBasketPrice: function () {
        let totalSum = 0;
        let totalItems = 0;
        for (let item of this.items) {
            totalSum += item.count * item.product.price;
            totalItems += item.count;
        };
        return { sum: totalSum, count: totalItems };
    },
};

function productClass(id, name, price, currency) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.imgUrls = [];
};

function catalogClass(htmlObj) {
    this.htmlObj = htmlObj;
    this.products = [];
    this.updateView = function () {
        //отрисовываем каталог в виде таблицы
        this.htmlObj.innerHTML = "";
        let catalogTable = document.createElement('table');
        let titleRow = document.createElement('tr');
        titleRow.id = 'titleCatalog';
        let thd1 = document.createElement('th');
        thd1.textContent = 'id';
        let thd2 = document.createElement('th');
        thd2.textContent = 'Наименование';
        let thd3 = document.createElement('th');
        thd3.textContent = 'Цена';
        let thd4 = document.createElement('th');
        thd4.textContent = '';

        titleRow.appendChild(thd1);
        titleRow.appendChild(thd2);
        titleRow.appendChild(thd3);
        titleRow.appendChild(thd4);
        catalogTable.appendChild(titleRow);
        let count = 0;
        for (let product of this.products) {
            let productRow = document.createElement('tr');
            if (count % 2 == 0) {
                productRow.classList.add('evenRow')
            } else {
                productRow.classList.add('oddRow')
            };
            count++;
            productRow.id = 'rowCatalog';
            let td1 = document.createElement('td');
            td1.textContent = product.id;
            let td2 = document.createElement('td');
            td2.textContent = product.name;
            let td3 = document.createElement('td');
            td3.textContent = product.price;
            let td4 = document.createElement('td');
            let buttonBuy = document.createElement('button');
            //id продукта зашиваем в  кнопку покупки
            buttonBuy.setAttribute('product_id', product.id);
            buttonBuy.textContent = 'Купить';

            td4.appendChild(buttonBuy);

            productRow.appendChild(td1);
            productRow.appendChild(td2);
            productRow.appendChild(td3);
            productRow.appendChild(td4);
            catalogTable.appendChild(productRow);
        };
        this.htmlObj.appendChild(catalogTable);
    };
    this.addItem = function (item) {
        this.products.push(item)
    };
    this.getProductById = function (id) {
        for (let item of this.products) {
            if (item.id == id) {
                return item
            }
        }
    };
};

//обработчик кнопок Купить
function buyProduct(event) {
    const btn = event.target;
    //вытаскиваем из кнопки зашитый id продукта
    const id = btn.attributes.product_id.value;
    console.log(id);
    let alert = document.getElementById('alert');
    alert.className = 'errorMessage';
    if (id) {
        let product = catalog.getProductById(id);
        if (product) {
            //добавляем продукт в корзину
            alert.display = 'none';
            alert.textContent = '';
            id.value = '';
            shoppingCart.addItem(product, 1)
            shoppingCart.updateView();
        } else {
            alert.textContent = 'Id продукта не найден в каталоге';
            alert.display = 'block';
            id.value = '';
        }
    } else {
        alert.textContent = 'Id продукта не может быть пустым';
        alert.display = 'block';
    };
    event.stopPropagation()
};
//функция показывает модальное окно с картинками продукта
function showModalProductImgs(event) {
    //получаем id продукта из строки каталога
    const id = event.target.parentElement.firstChild.textContent;
    const product = catalog.getProductById(id);

    const modalElem = document.querySelector('.modal');
    const imgContainer = document.querySelector('.imgContainer');
    imgContainer.innerHTML = '';
    const overlay = document.querySelector('.js-overlay-modal');

    //добавляем в окно все картинки из продукта
    //все скрываем кроме первого
    for (let i = 0; i < product.imgUrls.length; i++) {
        const img = document.createElement('img');
        img.alt = 'Image_' + i;
        img.id = 'img_' + i;
        img.classList.add('imgModal');
        img.src = product.imgUrls[i];
        img.classList.add('imgHide');
        if (i === 0) {
            img.classList.remove('imgHide');
        };
        imgContainer.appendChild(img);
    };

    modalElem.classList.add('active');
    overlay.classList.add('active');
};

//по щелчку мыши циклический показ картинок в окне
function nextImg() {
    const imgs = document.querySelectorAll('.imgModal');
    console.log(imgs);
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        console.log(img.style.visibility);
        if (!img.classList.contains('imgHide')) {
            let id = img.id.split('_')[1];
            let nextId = (+id + 1) % imgs.length;
            console.log(nextId);
            img.classList.add('imgHide');
            imgs[nextId].classList.remove('imgHide');
            break;
        }
    }

};

//закрытие модального окна при нажатии на кнопку Закрыть
function closeModal(event) {
    const parentModal = this.closest('.modal');
    const overlay = document.querySelector('.js-overlay-modal');

    parentModal.classList.remove('active');
    overlay.classList.remove('active');
    event.stopPropagation()
};


//глобальный каталог
window['catalog'] = null;

//создать продукты
product1 = new productClass(1, 'Item1', 100, 'RUB');
product2 = new productClass(2, 'Item2', 200, 'RUB');
product3 = new productClass(3, 'Item3', 250, 'RUB');

//url'ы картинок для кадого продукта
product1.imgUrls.push('https://cdn.pixabay.com/photo/2018/07/06/08/49/tomato-3520004_960_720.jpg');
product1.imgUrls.push('https://cdn.pixabay.com/photo/2015/03/07/13/55/tomato-663097_960_720.jpg');
product1.imgUrls.push('https://cdn.pixabay.com/photo/2016/03/26/16/44/tomatoes-1280859_960_720.jpg');

product2.imgUrls.push('https://cdn.pixabay.com/photo/2018/06/04/23/42/raspberry-3454504_960_720.jpg');
product2.imgUrls.push('https://cdn.pixabay.com/photo/2010/12/13/10/05/raspberry-2276_960_720.jpg');
product2.imgUrls.push('https://cdn.pixabay.com/photo/2010/12/13/10/05/berry-2270_960_720.jpg');

product3.imgUrls.push('https://cdn.pixabay.com/photo/2016/01/02/01/59/oranges-1117628_960_720.jpg');
product3.imgUrls.push('https://cdn.pixabay.com/photo/2017/02/26/12/27/oranges-2100108_960_720.jpg');
product3.imgUrls.push('https://cdn.pixabay.com/photo/2016/01/02/02/03/orange-1117645_960_720.jpg');

//создаем эзмепляр глобального каталога и привязываем к HTML эл-ту
catalog = new catalogClass(document.getElementById('catalog'));

//привязывает Корзину к HTML эл-ту
shoppingCart.htmlObj = document.getElementById('basket');

//добавим продукты в каталог
catalog.addItem(product1);
catalog.addItem(product2);
catalog.addItem(product3);

//отрисуем каталог и корзину
catalog.updateView();
shoppingCart.updateView();

console.log(catalog.getProductById(1));
console.log(catalog.htmlObj.querySelectorAll('#rowCatalog > td > button'));

//все кнопки Купить
let buyButtons = catalog.htmlObj.querySelectorAll('#rowCatalog > td > button');
//все строки каталога
let rowsCatalog = catalog.htmlObj.querySelectorAll('#rowCatalog');
//модальное окно
let modal = document.querySelector('.modal');

//на все кнопки один обработчик
for (const btn of buyButtons) {
    btn.addEventListener('click', buyProduct);
};
//на все строки каталога один обработчик открытия модального окна
for (const row of rowsCatalog) {
    row.addEventListener('click', showModalProductImgs);
};
//обработчик закрытия модального окна
let closeModalButton = document.querySelector('.js-modal-close');
closeModalButton.addEventListener('click', closeModal);

//карусель картинок продукта
modal.addEventListener('click', nextImg);


//очистка корзины
let clearButton = document.getElementById('clearBasketButton');
clearButton.onclick = function () {
    shoppingCart.items = [];
    let alert = document.getElementById('alert');
    alert.display = 'none';
    alert.textContent = '';
    shoppingCart.updateView();
};



