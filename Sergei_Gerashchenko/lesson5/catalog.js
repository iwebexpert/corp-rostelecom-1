
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
        for(let i=0;i<this.items.length;i++)
            if(this.items[i].id == id) {
                this.items[i].count += count;
                return;
            }
        this.addItem(new BasketItem(id, name, price, currency, count));
    }

    changeItemCount(id, newCount){
        for(let i=0;i<this.items.length;i++)
            if(this.items[i].id == id) {
                this.items[i].count = count;
                return;
            }
    }

    removeItem(item){
        this.remove(item.id)
    }
    remove(id){
        for(let i=0;i<this.items.length;i++)
            if(this.items[i].id == id) {
                this.items.splice(i, 1);
            }

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


function sendRequest(url) {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange=function () {
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status != 200){
                    reject();
                }

                resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    });
}

function addCatalogItems(items) {
    console.log(items);
    items.forEach((item)=>{
        let p = new Product(item.id, item.name, item.price);
        item.images.forEach((img)=>{p.addImage(img.url)});
        catalog.push(p);
    });
    loadCatalog();
}

function loadPage() {
    catalogContainer = document.getElementById('catalog');
    basketContainer = document.getElementById('basket');
    basketContainer.className = 'basket';
    catalogContainer.innerText = 'Каталог';
    sendRequest("/items?_embed=images").then((items)=>{addCatalogItems(items)}, ()=>{});
    // let p=new Product(1,'Мышка', 400);
    // p.addImage('img/m1.jpg');
    // p.addImage('img/m2.jpg');
    // p.addImage('img/m3.jpg');
    // catalog.push(p);
    // p = new Product(2,'Клавиатура', 1400);
    // p.addImage('img/kb1.jpg');
    // p.addImage('img/kb2.jpg');
    // p.addImage('img/kb3.png');
    // catalog.push(p);
    // catalog.push(new Product(3,'Флешка 32г', 1800));
    // catalog.push(new Product(4,'Флешка 64г', 2400));
    // catalog.push(new Product(5,'Флешка 128г', 3300));
    loadBasket();
    //loadCatalog();
    createModal();
}

function clearBusket() {
    basket.items.splice(0, basket.items.length);
    renderBasketCaption();
}

function loadBasket() {
    let basketContent = document.createElement('div');
    basketContent.className = 'basket-content';
    basketContent.id = 'basket-content';
    let b = document.createElement('table');
    b.className='basket-item-list';
    b.id='basket-item-list';
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.colSpan=4;
    tr.appendChild(td);
    b.appendChild(tr);
    basketContent.appendChild(b);
    basketContainer.appendChild(basketContent);

    basketContainer.appendChild(createAddrDiv());
    basketContainer.appendChild(createCommentDiv());
    basketContainer.appendChild(createBasketNav());

    let e = document.createElement('span');
    e.id = 'basket-empty';
    e.innerText='Корзина пуста';
    td.appendChild(e)
    e = document.createElement('span');
    e.id = 'basket-items-total';
    e.innerText='';
    td.appendChild(e)

    // e = document.createElement('button');
    // e.type='submit';
    // e.innerText='Очистить';
    // e.addEventListener('click', function () {
    //     clearBusket();
    // })

    //basketContainer.appendChild(e);
    addBasketItemHeader();
    renderBasketCaption();
}

function createAddrDiv() {
    let basketAddrDiv = document.createElement('div');
    basketAddrDiv.id='basket-addr-container';
    let lb = document.createElement('label');
    lb.textContent = 'Введите адрес доставки';
    basketAddrDiv.appendChild(lb);
    basketAddrDiv.appendChild(document.createElement('br'));
    let txt = document.createElement('textarea');
    txt.cols = 50;
    txt.rows = 10;
    txt.id = 'address-text';
    basketAddrDiv.appendChild(txt);
    return basketAddrDiv;
}

function createCommentDiv() {
    let basketCommentDiv = document.createElement('div');
    basketCommentDiv.id='basket-comment-container';
    let lb = document.createElement('label');
    lb.textContent = 'Введите комментарий';
    basketCommentDiv.appendChild(lb);
    basketCommentDiv.appendChild(document.createElement('br'));
    let txt = document.createElement('textarea');
    txt.cols = 50;
    txt.rows = 10;
    txt.id = 'comment-text';
    basketCommentDiv.appendChild(txt);
    return basketCommentDiv;
}

function sendOrder(){
    console.log(document.getElementById('address-text').value);
    console.log(document.getElementById('comment-text').value);
}

let basketStep = 0;
function gotoStep(step) {
    if(step == 3){
        sendOrder();
        basketStep=0;
    }
    else
        basketStep=step;
    setNavigatorVisibility(true);
}

function createBasketNav() {
    let navDiv = document.createElement('div');
    navDiv.id = 'basket-navigator';
    let prevStep = document.createElement('input');
    prevStep.id = 'prev-step';
    prevStep.type = 'button';
    prevStep.value = 'Назад';
    prevStep.addEventListener('click', function () {
        gotoStep(basketStep-1);
    });
    navDiv.appendChild(prevStep);
    let nextStep = document.createElement('input');
    nextStep.id = 'next-step';
    nextStep.type = 'button';
    nextStep.value = 'Вперед';
    nextStep.addEventListener('click', function () {
        gotoStep(basketStep+1);
    });
    navDiv.appendChild(nextStep);
    return navDiv;
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

function setNavigatorVisibility(val) {
    if(!val){
        document.getElementById('basket-navigator').style.visibility = 'hidden';
        document.getElementById('prev-step').style.visibility = 'hidden';
        document.getElementById('next-step').style.visibility = 'hidden';
        return;
    }
    document.getElementById('basket-navigator').style.visibility = 'visible';
    if(basketStep>0)
        document.getElementById('prev-step').style.visibility = 'visible';
    else
        document.getElementById('prev-step').style.visibility = 'hidden';
    if(basketStep<3)
        document.getElementById('next-step').style.visibility = 'visible';
    else
        document.getElementById('next-step').style.visibility = 'hidden';
    if(basketStep == 0){
        document.getElementById('basket-content').style.display='flex';
        document.getElementById('basket-addr-container').style.display='none';
        document.getElementById('basket-comment-container').style.display='none';
    }
    else if(basketStep == 1){
        document.getElementById('basket-content').style.display='none';
        document.getElementById('basket-addr-container').style.display='block';
        document.getElementById('basket-comment-container').style.display='none';
    }
    else if(basketStep == 2){
        document.getElementById('basket-content').style.display='none';
        document.getElementById('basket-addr-container').style.display='none';
        document.getElementById('basket-comment-container').style.display='block';
    }

}
function renderBasketCaption(){
    if(basket.items.length == 0){
        document.getElementById('basket-empty').style.visibility = 'visible';
        document.getElementById('basket-items-total').style.visibility = 'hidden';
        document.getElementById('basket-item-list').style.visibility = 'hidden';
        setNavigatorVisibility(false);
    }
    else{
        document.getElementById('basket-empty').style.visibility = 'hidden';
        document.getElementById('basket-items-total').style.visibility = 'visible ';
        document.getElementById('basket-items-total').innerText = 'В корзине '+basket.items.length+' товаров на сумму '+basket.total_cost;
        document.getElementById('basket-item-list').style.visibility = 'visible';
        setNavigatorVisibility(true);
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
    let itemContainer = document.createElement("tr");
    itemContainer.className = 'basket-header';
    let itemName = document.createElement('td');
    itemName.className = 'basket-header-name';
    itemName.textContent = 'Название';
    itemContainer.appendChild(itemName);
    let itemPrice = document.createElement('td');
    itemPrice.className = 'basket-header-price';
    itemPrice.textContent = 'Цена за шт.';
    itemContainer.appendChild(itemPrice);

    let itemCount = document.createElement('td');
    itemCount.textContent = 'Количество';
    itemContainer.appendChild(itemCount);

    let itemCost = document.createElement('td');
    itemCost.className = 'basket-header-cost';
    itemCost.textContent = 'Стоимость';
    itemContainer.appendChild(itemCost);
    document.getElementById('basket-item-list').appendChild(itemContainer);

}
function addBasketItem(index, name, price){
    // Создаем контейнер для строки корзины
    let itemContainer = document.createElement("tr")
    itemContainer.className = 'basket-item';
    itemContainer.id = 'basket-item-'+index;
    // Добавляем название товара
    let itemName = document.createElement('td');
    itemName.className = 'basket-item-name';
    itemName.textContent = name;
    itemContainer.appendChild(itemName);
    // Добваляем цену товара
    let itemPrice = document.createElement('td');
    itemPrice.className = 'basket-item-price';
    itemPrice.textContent = price;
    itemContainer.appendChild(itemPrice);

    //Добавляем поле ввода с количеством товара
    let inputCell = document.createElement('td');
    let itemCount = document.createElement('input');
    itemCount.id='basket-item-count'+index;
    itemCount.type = 'number';
    itemCount.className = 'basket-item-input';
    itemCount.value = '1';
    itemCount.width = 5;
    itemCount.addEventListener('change', onItemCountChange)
    itemCount.dataset.id = index;
    inputCell.appendChild(itemCount)
    itemContainer.appendChild(inputCell);

    let itemCost = document.createElement('td');
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