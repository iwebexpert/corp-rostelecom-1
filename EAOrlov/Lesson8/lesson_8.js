console.log('Домашняя работа к уроку 6');
console.log('Задание 1-2');
// Задание 1 и 2 (вместе)

// Функция создания одного элемента разметки
const makeElement = function (tagName, className, text, tagAttribute, valueAttribute) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
        element.textContent = text;
    };
    if (tagAttribute && valueAttribute) {
        element.setAttribute(tagAttribute, valueAttribute);
    }
    return element;
};

// Создаем класс "Товар" у которого есть св-ва и метод добавления товара в сущность Продукты
class Item {
    constructor(id, article, name, description, manufacturer, price, model) {
        this.id = id;
        this.article = article;
        this.name = name;
        this.description = description;
        this.price = price;
        this.manufacturer = manufacturer;
        this.model = model;
    }
    addProduct() {
        product.items.push({ id: this.id, article: this.article, name: this.name, description: this.description, price: this.price, manufacturer: this.manufacturer, model: this.model });
    }
};

// массив массивов со списками src картинок для каталога
const listphoto = [['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg']];

// Создаем объект-сущность Продукты, в которой есть массив объектов с классом "Товар"
const product = {
    items: [],
    // метод отображения на странице 1 товара из каталога
    createitem: function (item) {
        let listitem = makeElement('div', 'catalog__item');
        listitem.setAttribute("item_id", item.id);
        let descriptionitem = makeElement('div', 'catalog__description');
        listitem.appendChild(descriptionitem);
        link = makeElement('a', 'link_img');
        link.setAttribute('href', '#');
        descriptionitem.appendChild(link);
        img = makeElement('img', 'photo');
        link.appendChild(img);
        img.setAttribute('src', listphoto[item.id - 1][0]);
        link.addEventListener('click', function () {
            product.showimg(item.id);
        });
        descriptionitem.appendChild(makeElement('h3', 'catalog__heading', item.name + ' ' + item.manufacturer + ' ' + item.model));
        descriptionitem.appendChild(makeElement('p', 'catalog__price', 'Цена: ' + item.price));
        let btnitem = makeElement('div', 'catalog__btn');
        listitem.appendChild(btnitem);
        let catalog__btnadd = makeElement('a', 'catalog__btnadd', 'купить', "href", '#');
        catalog__btnadd.setAttribute("btn_id", item.id);
        catalog__btnadd.addEventListener('click', function () {
            basket.bntaddbasket(item.id);
        });
        btnitem.appendChild(catalog__btnadd);
        return listitem;
    },
    // метод отображения на странице всего каталога
    createcatalog: function () {
        let catalog = document.querySelector(".catalog");
        catalog.appendChild(makeElement('h2', 'catalog__head', 'Каталог товаров:'));
        for (let item of this.items) {
            catalog.appendChild(this.createitem(item));
        };
    },
    // метод добавления товара из каталога в корзину
    addbasket: function (id) {
        for (let item of this.items) {
            if (item.id == id) {
                basket.items.push({ id: id, count: 1, name: item.name, price: item.price });
            };
        };
    },
    // метод показа большого фото товара    
    showimg: function (newid) {
        let catalog = document.querySelector('.container');
        let img_item = makeElement('div', 'show');
        catalog.appendChild(img_item);
        let img = makeElement('img', 'img');
        img.setAttribute('src', listphoto[newid - 1][0]);
        img.setAttribute('number_photo', 1);
        img_item.appendChild(img);
        let imagemenu = makeElement('div', 'img__menu');
        img_item.appendChild(imagemenu);
        let backbtn = makeElement('a', 'backbtn', 'Назад');
        backbtn.setAttribute("href", '#');
        backbtn.addEventListener('click', function () {
            product.backimg(newid);
        });
        imagemenu.appendChild(backbtn);
        let btnclose = makeElement('a', 'btnclose', 'Закрыть');
        btnclose.setAttribute("href", '#');
        btnclose.addEventListener('click', function () {
            product.closeimg();
        });
        imagemenu.appendChild(btnclose);
        let fbtn = makeElement('a', 'fbtn', 'Вперед');
        fbtn.setAttribute("href", '#');
        fbtn.addEventListener('click', function () {
            product.forwardimg(newid);
        });
        imagemenu.appendChild(fbtn);
    },
    // метод работы кнопки "Закрыть" при перелистывании фото товара
    closeimg: function () {
        let catalog = document.querySelector('.container');
        let img_item = document.querySelector('.show');
        catalog.removeChild(img_item);
    },

    // метод работы кнопки "Вперед" при перелистывании фото товара
    forwardimg: function (i) {
        let img = document.querySelector('.img');
        let number_img = Number.parseInt(img.getAttribute('number_photo')) + 1;
        if (number_img <= listphoto[i - 1].length) {
            img.setAttribute('src', listphoto[i - 1][number_img - 1]);
            img.setAttribute('number_photo', number_img);
        }
    },

    // метод работы кнопки "Назад" при перелистывании фото товара
    backimg: function (i) {
        let img = document.querySelector('.img');
        let number_img = Number.parseInt(img.getAttribute('number_photo')) - 1;
        if (number_img > 0) {
            img.setAttribute('src', listphoto[i - 1][number_img - 1]);
            img.setAttribute('number_photo', number_img);
        }
    },
};
// Создаем объект-сущность Корзина, в которой есть массив объектов с классом "Товар"
const basket = {
    items: [],
    // метод создания корзины при загрузке страницы
    createbasket: function () {
        // Иконка "Корзины"
        let container = document.querySelector('.container');
        let link = makeElement('a', 'link_basket');
        link.setAttribute('href', '#');
        let img = makeElement('img', 'image_basket');
        img.setAttribute('src', 'basket.jpg');
        link.appendChild(img);
        container.appendChild(link);
        link.addEventListener('click', function () {
            basketmain.classList.add('basket__show');
            basketmain.classList.remove('basket__hidden');
        });
        //Начало корзины, изначально Коризна скрыта
        let basketmain = document.querySelector(".basket");
        basketmain.classList.add('basket__hidden');
        //кнопка Закрыть
        let basketclose = makeElement('a', 'basketclose', 'Закрыть', "href", '#');
        basketmain.appendChild(basketclose);
        basketclose.addEventListener('click', function () {
            basketmain.classList.remove('basket__show');
            basketmain.classList.add('basket__hidden');
        });
        //1 Заголовок 
        basketmain.appendChild(makeElement('h3', 'basket__head', 'Состав корзины:'));
        // Содержимое корзины
        let basketcont = makeElement('div', 'basketcont');
        basketmain.appendChild(basketcont);
        basketcont.appendChild(makeElement('p', 'basket__empty', 'Корзина пуста'));
        // Навигация корзины
        let basketnav = makeElement('div', 'basketnav');
        basketmain.appendChild(basketnav);
        let basketdelbtn = makeElement('a', 'basketdelbtn', 'Очистить корзину', "href", '#');
        basketnav.appendChild(basketdelbtn);
        basketdelbtn.addEventListener('click', function () {
            len = basket.items.length;
            for (let j = 1; j <= len; j++) {
                let item = basket.items[0];
                let count = item.count;
                for (let i = 1; i <= count; i++) {
                    basket.btndelbasket(item.id);
                }
            };
        });
        let basketfw = makeElement('a', 'commentexit', 'Далее', "href", '#');
        basketnav.appendChild(basketfw);
        basketfw.addEventListener('click', function () {
            basketcont.classList.add('d__hidden');
            basketnav.classList.add('d__hidden');
            adrcont.classList.remove('d__hidden');
            adrnav.classList.remove('d__hidden');
        });
        // 2 Заголовок
        basketmain.appendChild(makeElement('h3', 'basket__adress', 'Адрес доставки'));
        // Содержимое адреса
        let adrcont = makeElement('div', 'adrcont');
        basketmain.appendChild(adrcont);
        adrcont.classList.add('d__hidden');
        let formadr = makeElement('form', 'formadr');
        adrcont.appendChild(formadr);
        formadr.setAttribute('action', '#');
        textadr = makeElement('textarea', 'adr_text', '');
        formadr.appendChild(textadr);
        // Навигация адреса
        let adrnav = makeElement('div', 'adrnav');
        basketmain.appendChild(adrnav);
        adrnav.classList.add('d__hidden');
        let adrback = makeElement('a', 'adrback', 'Назад', "href", '#');
        adrnav.appendChild(adrback);
        adrback.addEventListener('click', function () {
            basketcont.classList.remove('d__hidden');
            basketnav.classList.remove('d__hidden');
            adrcont.classList.add('d__hidden');
            adrnav.classList.add('d__hidden');
        });
        let adrfw = makeElement('a', 'adrfw', 'Далее', "href", '#');
        adrnav.appendChild(adrfw);
        adrfw.addEventListener('click', function () {
            adrcont.classList.add('d__hidden');
            adrnav.classList.add('d__hidden');
            commentcont.classList.remove('d__hidden');
            commentnav.classList.remove('d__hidden');
        });
        // 3 Заголовок
        basketmain.appendChild(makeElement('h3', 'basket__comment', 'Комментарий'));
        // Содержимое комментариев
        let commentcont = makeElement('div', 'commentcont');
        basketmain.appendChild(commentcont);
        commentcont.classList.add('d__hidden');
        let formcomm = makeElement('form', 'formcomm');
        commentcont.appendChild(formcomm);
        formcomm.setAttribute('action', '#');
        textcomm = makeElement('textarea', 'textcomm', '');
        formcomm.appendChild(textcomm);
        // Навигация комментария
        let commentnav = makeElement('div', 'commentnav');
        commentnav.classList.add('d__hidden');
        basketmain.appendChild(commentnav);
        let commentback = makeElement('a', 'adrback', 'Назад', "href", '#');
        commentnav.appendChild(commentback);
        commentback.addEventListener('click', function () {
            adrcont.classList.remove('d__hidden');
            adrnav.classList.remove('d__hidden');
            commentcont.classList.add('d__hidden');
            commentnav.classList.add('d__hidden');
        });
        let commentexit = makeElement('a', 'commentexit', 'Оформить', "href", '#');
        commentnav.appendChild(commentexit);
        commentexit.addEventListener('click', function () {

        });
    },
    // метод добавления на странице нового элемента в Корзину
    addbasket: function (id) {
        for (let item of this.items) {
            if (item.id == id) {
                let basket = document.querySelector('.basketcont');
                basket.appendChild(this.displayitem(item));
            }
        };
    },
    // метод удаления на странице элемента из Корзины
    delbasket: function (id) {
        let basket = document.querySelector('.basketcont');
        let basketitem = document.querySelectorAll('.basket__item');
        for (itemb of basketitem) {
            if (itemb.getAttribute('item_id') == id) {
                basket.removeChild(itemb);
            };
        };
        for (let item of this.items) {
            if (item.id == id) {
                let indexdel = this.items.indexOf(item);
                this.items.splice(indexdel, 1);
            };
        };
    },
    // метод увеличения кол-ва товара, уже добавленного в Корзину
    addcountbasket: function (id) {
        var newcountadd = 0;
        for (let item of this.items) {
            if (item.id == id) {
                item.count += 1;
                newcountadd = item.count;
            };
        };
        let basketitem = document.querySelectorAll('.basket__count');
        for (let itemb of basketitem) {
            if (itemb.getAttribute('item_id') == id) {
                itemb.textContent = 'Количество: ' + newcountadd + ' шт.';
            };
        };
    },
    // метод уменьшения кол-ва товара, уже добавленного в Корзину
    delcountbasket: function (id) {
        var newcountdel = 0;
        for (let item of this.items) {
            if (item.id == id) {
                item.count -= 1;
                newcountdel = item.count;
            };
        };
        let basketitem = document.querySelectorAll('.basket__count');
        for (let itemb of basketitem) {
            if (itemb.getAttribute('item_id') == id) {
                itemb.textContent = 'Количество: ' + newcountdel + ' шт.';
            };
        };
    },
    // метод подсчета суммы товаров в корзине
    sumbasket: function () {
        let sumbasket = 0;
        for (let item of this.items) {
            sumbasket += (item.price * item.count);
        };
        return sumbasket;
    },
    // метод подсчета кол-ва товаров в корзине
    sumcountbasket: function () {
        let sumcountbasket = 0;
        for (let item of this.items) {
            sumcountbasket += item.count;
        };
        return sumcountbasket;
    },
    // метод удаления старой суммы товаров в корзине
    removesumbasket: function () {
        let basket = document.querySelector('.basketcont');
        let sumbasket = document.querySelector('.basket__sum');
        if (sumbasket) {
            basket.removeChild(sumbasket);
        };
    },
    // метод добавления новой суммы товаров в корзине
    displaysumbasket: function (id) {
        let basket = document.querySelector('.basketcont');
        let basket_itog = makeElement('p', 'basket__sum', 'Всего в корзине товаров: ' + this.sumcountbasket() + ' шт. на общую сумму: ' + this.sumbasket());
        basket.appendChild(basket_itog);
    },
    // метод добавления и убирания надписи Корзина Пуста
    emptybasket: function () {
        let basketcont = document.querySelector('.basketcont');
        let basketsearch = document.querySelector('.basket__item');
        if (basketsearch) {
            let emptyfind = document.querySelector('.basket__empty');
            if (emptyfind) {
                basketcont.removeChild(emptyfind);
            };
        }
        else {
            let basketcont = document.querySelector('.basketcont');
            basketcont.appendChild(makeElement('p', 'basket__empty', 'Корзина пуста'));


        };
    },
    displayitem: function (item) {
        let listitem = makeElement('div', 'basket__item');
        listitem.setAttribute("item_id", item.id);
        let descriptionitem = makeElement('div', 'basket__description');
        listitem.appendChild(descriptionitem);
        descriptionitem.appendChild(makeElement('h3', 'basket__heading', item.name));
        descriptionitem.appendChild(makeElement('p', 'basket__price', 'Цена: ' + item.price));
        descriptionitem.appendChild(makeElement('p', 'basket__count', 'Количество: ' + item.count + ' шт.', 'item_id', item.id));
        let btnitem = makeElement('div', 'basket__btn');
        listitem.appendChild(btnitem);
        let delinbasket = makeElement('a', 'basket__btndel', 'Удалить');
        delinbasket.setAttribute("btn_id", item.id);
        delinbasket.setAttribute("href", '#');
        btnitem.appendChild(delinbasket);
        delinbasket.addEventListener('click', function () {
            basket.btndelbasket(item.id);
        });
        return listitem;
    },
    // метод удаления товара из Корзины или удаления всей Корзины
    btndelbasket: function (newid) {
        for (let item of basket.items) {
            if (item.id == newid && item.count > 1) {
                basket.delcountbasket(newid);
                let basketitem = document.querySelector('.basket__item');
                if (basketitem) {
                    basket.removesumbasket();
                    basket.displaysumbasket();
                };
            } else {
                if (item.id == newid && item.count == 1) {
                    basket.delbasket(newid);
                    basket.emptybasket();
                    let basketall = document.querySelector('.basketcont');
                    let basketitem = document.querySelector('.basket__item');
                    let sumbasket = document.querySelector('.basket__sum');
                    if (basketitem) {
                        basket.removesumbasket();
                        basket.displaysumbasket();
                    } else {
                        basketall.removeChild(sumbasket);
                    };
                };
            };
        };
    },
    // метод добавления товара в Корзину или увеличения кол-ва
    bntaddbasket: function (newid) {
        let searchid = 0;
        for (let item of basket.items) {
            if (item.id == newid) {
                searchid = 1;
                basket.addcountbasket(newid);
                basket.removesumbasket();
                basket.displaysumbasket();
            }
        };
        if (searchid == 0) {
            product.addbasket(newid);
            basket.addbasket(newid);
            basket.emptybasket();
            let basketall = document.querySelector('.basketcont');
            let basketitem = document.querySelector('.basket__item');
            let sumbasket = document.querySelector('.basket__sum');
            if (basketitem) {
                basket.removesumbasket();
                basket.displaysumbasket();
            } else {
                basketall.removeChild(sumbasket);
            };
        };
    },
};

//Создаем несколько разных товаров и добавляем их в сущность "Продукты"
new Item(1, '000001', 'Компьютерная мышь', 'Супермышь', 'Logitech', 700, 'A100').addProduct();
new Item(2, '000002', 'Клавиатура', 'Суперклава', 'Logitech', 1000, 'A500').addProduct();
new Item(3, '000003', 'Монитор', 'Супермонитор', 'Philips', 5000, 'S350').addProduct();
new Item(4, '000004', 'Видеокарта', 'Супервидео', 'Nvidia', 8000, 'GTX560').addProduct();
new Item(5, '000005', 'Процессор', 'Суперпроц', 'AMD', 10000, 'Ryzen 3').addProduct();
new Item(6, '000006', 'Оперативная память', 'Суперпамять', 'Hynix', 2000, 'Q100').addProduct();

// Вывод стартовой страницы
product.createcatalog();
basket.createbasket();








