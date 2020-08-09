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


class Goods {
    constructor(name, price){
        this._name = name;
        this._price = price;
        this._quantity = 0;
    }
    add(){
        this._quantity += 1;
    }
    remove(){
        if (this._quantity > 0) {
            this._quantity -= 1;
        }
    }
    get name(){
        return this._name;
    }
    get price() {
        return this._price;
    }
    get quantity() {
        return this._quantity;
    }
    set name(x) {
        this._name = x;;
    }
    set price(x) {
        this._price = x;        
    }
    set quantity(x) {
        if (x > 0 && !(x % 1))
        this._quantity = x;        
    }
}

class GoodsList{
    constructor(){
        this.arr = [];
    }
    fill(mas){
        let i;
        for (i = 0; i< mas.length; i++){
            let temp = new Goods(mas[i][0],mas[i][1]);
            this.arr.push(temp);
        }
    }

    show(){
        let i;
        for (i = 0; i < this.arr.length; i++) {
            console.log(this.arr[i]);
        }
    }
    summary(){
        let i;
        let sum = 0;
        for (i = 0; i < this.arr.length; i++){
            if (this.arr[i].quantity > 0){
                sum += this.arr[i].quantity * this.arr[i].price;
            }
        }
        return sum;
    }
}

const basketMas = new GoodsList();
basketMas.fill([['table', 400],['chair', 100],['lamp', 200]]);
basketMas.show();

function clkBuy(){
    let basket__item = document.createElement('div');
    basket__item.className = 'basket__item';;
    basketMas.arr[this.dataset.item].add();
    sum = basketMas.summary();
    getSum(sum);

}

//рендеринг страницы Корзины
function basketPage(basketMas) {
    mainPage.className = 'hide';
    basketContainer.innerHTML = '';
    for (let i = 0; i < basketMas.arr.length; i++)
    {
        if (basketMas.arr[i].quantity > 0) {
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
    basketAdd.addEventListener('click', function(){addItem(item)});
    let basketRem = document.createElement('button');
    basketRem.className = 'basket__remove';
    basketRem.innerHTML = '-';
    basket__item.appendChild(basketRem);
    basketRem.addEventListener('click', function(){remItem(item)});
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






