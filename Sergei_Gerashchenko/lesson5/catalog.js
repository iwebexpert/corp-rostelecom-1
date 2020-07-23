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
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

const basket = new Basket();

const catalog = [];

let catalogContainer=null;
let basketContainer=null;
function loadPage() {
    catalogContainer = document.getElementById('catalog');
    basketContainer = document.getElementById('basket');
    catalogContainer.innerText = 'Каталог';
    catalog.push(new Product('Мышка', 400));
    catalog.push(new Product('Клавиатура', 1400));
    catalog.push(new Product('Флешка 32г', 1800));
    catalog.push(new Product('Флешка 64г', 2400));
    catalog.push(new Product('Флешка 128г', 3300));
    loadBasket();
    loadCatalog();

}

function clearBusket() {
    basket.items.splice(0, basket.items.length);
    renderBasket();
}

function loadBasket() {
    let e = document.createElement('span');
    e.id = 'basket-empty';
    e.innerText='Корзина пуста';
    basketContainer.appendChild(e)
    e = document.createElement('span');
    e.id = 'basket-items';
    e.innerText='';
    basketContainer.appendChild(e)

    e = document.createElement('button');
    e.type='submit';
    e.innerText='Очистить';
    e.addEventListener('click', function () {
        clearBusket();
    })

    basketContainer.appendChild(e)
    renderBasket();
}


function loadCatalog() {
    let e = null;
    for(let i=0;i<catalog.length; i++){
        e = document.createElement('div');
        e.className='catalog-item';
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
            renderBasket();
            return;
        }
    basket.add(index, catalog[index].name, catalog[index].price, 'RUB', 1);
    renderBasket();

}
function renderBasket(){
    if(basket.items.length == 0){
        document.getElementById('basket-empty').style.visibility = 'visible';
        document.getElementById('basket-items').style.visibility = 'hidden ';
    }
    else{
        document.getElementById('basket-empty').style.visibility = 'hidden';
        document.getElementById('basket-items').style.visibility = 'visible ';
        document.getElementById('basket-items').innerText = 'В корзине '+basket.items.length+' товаров на сумму '+basket.total_cost;
    }
}
