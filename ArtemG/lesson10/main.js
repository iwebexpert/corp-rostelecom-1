const addBtn1 = document.querySelector('#item1');
const addBtn2 = document.querySelector('#item2');
const addBtn3 = document.querySelector('#item3');
const addBtn = document.querySelectorAll('.add');
const resetBtn = document.querySelector('.reset');
const basket = document.querySelector('.basket__parent');
const text = document.querySelector('#default__text');
const background = document.querySelector('.backgroud')
const summary = document.querySelector('.summary');
const basketBody = document.querySelector('.basket');
const basketBtn = document.querySelector('#basketBtn');
const backBtn = document.createElement('button');
const mainPage = document.querySelector('.main__page');
const basketContainer = document.querySelector('.basket__container')
let sum = 0;

function sendRequest(url){
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();
        http.onreadystatechange = function () {
        if (http.readyState === http.DONE) {
            if (http.status !== 200) {
                return reject(http.status);
            }
            resolve(JSON.parse(http.response));
        }
    }
    http.open('GET', url)
    http.send();
    });
}

//sendRequest('http://localhost:3000/goods').then((users) => {console.log(users)}, (status) => {console.log('error ' + status)});

class GoodsList {
    constructor() {
        this.arr = [];
    }
    getGoods() {
        sendRequest('http://localhost:3000/goods').then((goods) => {this.arr = goods}, (status) => {console.log('error ' + status)});
    }
    summary() {
        let i;
        let sum = 0;
        for (i = 0; i < this.arr.length; i++){
            if (+this.arr[i].quantity > 0){
                sum += +this.arr[i].quantity * +this.arr[i].price;
            }
        }
        return sum;
    }
    add(i) {
        this.arr[i].quantity = +this.arr[i].quantity + 1;
    }
    remove(i){
        if (this.arr[i].quantity > 0) {
            this.arr[i].quantity = +this.arr[i].quantity - 1;
        }
    }
}

const basketMas = new GoodsList();
basketMas.getGoods();

function clkBuy(){
    let basket__item = document.createElement('div');
    basket__item.className = 'basket__item';;
    //basketMas.arr[this.dataset.item].add();
    basketMas.add(this.dataset.item);
    sum = basketMas.summary();
    getSum(sum);

}

//рендеринг страницы Корзины
function basketPage(basketMas) {
    mainPage.className = 'hide';
    basketContainer.innerHTML = '';
    for (let i = 0; i < basketMas.arr.length; i++)
    {
        if (+basketMas.arr[i].quantity > 0) {
            renderItem(basketMas.arr[i], i);
        }
    }
    backBtn.innerHTML = "Закрыть корзину";
    backBtn.addEventListener('click', function(){
        mainPage.className = 'main__page';
        basketContainer.innerHTML = '';

    });
    basketContainer.appendChild(backBtn);

}

//addItem
function addItem(item) {
    item.add();
    basketPage(basketMas);
    sum += item.price;
    getSum(sum);
}

//remItem
function remItem(item) {
    item.remove();
    basketPage(basketMas);
    sum -= item.price;
    getSum(sum);
}

//update summary
function getSum(sum) {
    if (sum) {
        summary.innerHTML = "В корзине товаров на сумму " + sum;
    }
    else {
        summary.innerHTML = 'В корзине пусто';
    }
}

//render basket__item
function renderItem(item, i) {
    let basket__item = document.createElement('div');
    basket__item.className = 'basket__item';
    basket__item.id = i;
    basket__item.innerHTML = 'наименование: ' + item.name + ' цена: ' + item.price + ' количество: ' + item.quantity
    basketContainer.appendChild(basket__item);
    let basketAdd = document.createElement('button');
    basketAdd.className = 'basket__add';
    basketAdd.innerHTML = '+';
    basket__item.appendChild(basketAdd);
    basketAdd.addEventListener('click', function(){
        basketMas.add(i);
        basketPage(basketMas);
        sum = basketMas.summary();
        getSum(sum);
    });
    let basketRem = document.createElement('button');
    basketRem.className = 'basket__remove';
    basketRem.innerHTML = '-';
    basket__item.appendChild(basketRem);
    basketRem.addEventListener('click', function(){
        basketMas.remove(i);
        basketPage(basketMas);
        sum = basketMas.summary();
        getSum(sum);
    });
} 

function handlers() {
    for (let i=0; i<3; i++){
        if (document.querySelector('.add')) {
            addBtn[i].addEventListener('click', clkBuy);
        }
    }
    
    basketBtn.addEventListener('click', function() {basketPage(basketMas)});
}

function init() {
    getSum(sum);
    handlers();
}


init();






