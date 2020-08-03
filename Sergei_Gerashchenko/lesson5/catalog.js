
class BasketItem {
    constructor(id, name, price, currency, count){
        this.id=id;
        this.name=name;
        this.price = price;
        this.currency = currency;
        this.count = count;
    };

    get cost(){
        return this.price * this.count;
    }
}

class Basket{
    constructor(){
        this.items = [];
    }

    addItem(item) {

        this.items.push(item);
    }

    add(id, name, price, currency, count){
        this.addItem(new BasketItem(id, name, price, currency, count));
    }

    get total_cost(){
        let total = 0;
        for(let i=0;i<this.items.length;i++){
            total += this.items[i].cost;
        }
        return total;
    }
}

class Product {
    constructor(id,name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.images = [];
    }

    addImage(url){
        this.images.push(url);
    }
}

const basket = new Basket();

const catalog = [];

let catalogContainer=null;
let basketContainer=null;
function loadPage() {
    catalogContainer = document.getElementById('catalog');
    basketContainer = document.getElementById('basket');
    basketContainer.className = 'basket';
    catalogContainer.innerText = 'Каталог';
    let p=new Product(1,'Мышка', 400);
    p.addImage('img/m1.jpg');
    p.addImage('img/m2.jpg');
    p.addImage('img/m3.jpg');
    catalog.push(p);
    p = new Product(2,'Клавиатура', 1400);
    p.addImage('img/kb1.jpg');
    p.addImage('img/kb2.jpg');
    p.addImage('img/kb3.png');
    catalog.push(p);
    catalog.push(new Product(3,'Флешка 32г', 1800));
    catalog.push(new Product(4,'Флешка 64г', 2400));
    catalog.push(new Product(5,'Флешка 128г', 3300));
    loadBasket();
    loadCatalog();
    createModal();
}

function clearBusket() {
    basket.items.splice(0, basket.items.length);
    renderBasketCaption();
}

function loadBasket() {
    let b = document.createElement('div')
    b.className='basket-item-list';
    b.id='basket-item-list';
    basketContainer.appendChild(b);
    let e = document.createElement('span');
    e.id = 'basket-empty';
    e.innerText='Корзина пуста';
    basketContainer.appendChild(e)
    e = document.createElement('span');
    e.id = 'basket-items-total';
    e.innerText='';
    basketContainer.appendChild(e)

    e = document.createElement('button');
    e.type='submit';
    e.innerText='Очистить';
    e.addEventListener('click', function () {
        clearBusket();
    })

    basketContainer.appendChild(e);
    addBasketItemHeader();
    renderBasketCaption();
}


function loadCatalog() {
    let e = null;
    for(let i=0;i<catalog.length; i++){
        e = document.createElement('div');
        e.className='catalog-item';
        if(catalog[i].images.length>0){
            let a = document.createElement('a');
            a.addEventListener('click', function (event) {
                event.preventDefault();
                showImage(i);
            });
            a.className = 'img-link';
            let im = document.createElement('img');
            im.src = catalog[i].images[0];
            im.width=100;
            a.appendChild(im);
            e.appendChild(a);
        }
        let d = document.createElement('h3');
        d.className = 'item-name';
        d.innerText = catalog[i].name;
        e.appendChild(d);
        d = document.createElement('div');
        d.className = 'item-price';
        d.innerText = catalog[i].price;
        e.appendChild(d);
        d = document.createElement('button');
        d.type = 'submit';
        d.className = 'item-add';
        d.innerText = 'Добавить';
        d.addEventListener('click',function () {
            addItem(i);
        })
        e.appendChild(d);
        catalogContainer.appendChild(e);
    }

}

function addItem(index) {
    if(index>=catalog.length)
        return;
    for(let i=0;i<basket.items.length;i++)
        if(basket.items[i].id == index) {
            basket.items[i].count++;
            document.getElementById('basket-item-count'+index).value=basket.items[i].count;
            changeItemCount(index, basket.items[i].count)
            renderBasketCaption();
            return;
        }
    basket.add(index, catalog[index].name, catalog[index].price, 'RUB', 1);

    addBasketItem(index, catalog[index].name, catalog[index].price);
    renderBasketCaption();

}
function renderBasketCaption(){
    if(basket.items.length == 0){
        document.getElementById('basket-empty').style.visibility = 'visible';
        document.getElementById('basket-items-total').style.visibility = 'hidden';
        document.getElementById('basket-item-list').style.visibility = 'hidden';
    }
    else{
        document.getElementById('basket-empty').style.visibility = 'hidden';
        document.getElementById('basket-items-total').style.visibility = 'visible ';
        document.getElementById('basket-items-total').innerText = 'В корзине '+basket.items.length+' товаров на сумму '+basket.total_cost;
        document.getElementById('basket-item-list').style.visibility = 'visible';
    }
}
function showImage(id) {
    showModal(id);
}

function changeItemCount(index, newCount) {
    if(newCount<0){
        console.log('Количество товара не может быть отрицательным');
        return;
    }
    let  itemContainer= document.getElementById('basket-item-'+index);
    if(newCount==0){
        document.getElementById('basket-item-list').removeChild(itemContainer);
        for(let i=0;i<basket.items.length;i++)
            if(basket.items[i].id == index) {
                basket.items.splice(i, 1);
            }
        renderBasketCaption();
        return;
    }
    console.log(itemContainer);
    if(itemContainer) {
        let cost = itemContainer.querySelector('.basket-item-cost');
        console.log(cost);
        cost.textContent = ''+catalog[index].price*newCount;
    }
    for(let i=0;i<basket.items.length;i++)
        if(basket.items[i].id == index) {
            basket.items[i].count = newCount;
            break;
        }
    renderBasketCaption();
}
function addBasketItemHeader(index, name, price){
    // Создаем контейнер для строки корзины
    let itemContainer = document.createElement("div")
    itemContainer.className = 'basket-header';
    let itemName = document.createElement('div');
    itemName.className = 'basket-header-name';
    itemName.textContent = 'Название';
    itemContainer.appendChild(itemName);
    let itemPrice = document.createElement('div');
    itemPrice.className = 'basket-header-price';
    itemPrice.textContent = 'Цена за шт.';
    itemContainer.appendChild(itemPrice);

    let itemCount = document.createElement('div');
    itemCount.textContent = 'Количество';
    itemContainer.appendChild(itemCount);

    let itemCost = document.createElement('div');
    itemCost.className = 'basket-header-cost';
    itemCost.textContent = 'Стоимость';
    itemContainer.appendChild(itemCost);
    document.getElementById('basket-item-list').appendChild(itemContainer);

}
function addBasketItem(index, name, price){
    // Создаем контейнер для строки корзины
    let itemContainer = document.createElement("div")
    itemContainer.className = 'basket-item';
    itemContainer.id = 'basket-item-'+index;
    // Добавляем название товара
    let itemName = document.createElement('div');
    itemName.className = 'basket-item-name';
    itemName.textContent = name;
    itemContainer.appendChild(itemName);
    // Добваляем цену товара
    let itemPrice = document.createElement('div');
    itemPrice.className = 'basket-item-price';
    itemPrice.textContent = price;
    itemContainer.appendChild(itemPrice);

    //Добавляем поле ввода с количеством товара
    let itemCount = document.createElement('input');
    itemCount.id='basket-item-count'+index;
    itemCount.type = 'number';
    itemCount.value = '1';
    itemCount.width = 5;
    itemCount.addEventListener('change', onItemCountChange)
    itemCount.dataset.id = index;
    itemContainer.appendChild(itemCount);

    let itemCost = document.createElement('div');
    itemCost.className = 'basket-item-cost';
    itemCost.textContent = price;
    itemContainer.appendChild(itemCost);
    document.getElementById('basket-item-list').appendChild(itemContainer);

}
function onItemCountChange(event){
    changeItemCount(event.target.dataset.id, event.target.value);
}
// function renderBasketItem(parent, item) {
//     let d = document.createElement('div');
//
//     if(item.images.length>0){
//         let a = document.createElement('a');
//         a.addEventListener('click', function (event) {
//             event.preventDefault();
//             showImage(i);
//         });
//         a.className = 'img-link';
//         d.appendChild(a);
//         let im = document.createElement('img');
//         im.src = catalog[i].images[0];
//         im.width=100;
//         a.appendChild(im);
//         d.appendChild(a);
//     }
//     let h1 = document.createElement('h3')
//     h1.textContent = item.name;
//     parent.appendChild(h1);
// }
function createBasket(container) {
    // Формируем корзину внутри контейнера
    let caption = document.createElement('div');
    caption.className = 'basket-caption';

}