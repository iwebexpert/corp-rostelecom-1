const basket__parent = document.querySelector('.basket__parent');
const addBtn1 = document.querySelector('#item1');
const addBtn2 = document.querySelector('#item2');
const addBtn3 = document.querySelector('#item3');
const addBtn = document.querySelectorAll('.add');
const resetBtn = document.querySelector('.reset');
const basket = document.querySelector('.basket__parent');
const text = document.querySelector('#default__text');
const summary = document.createElement('div');


class Basket{
    constructor(nameitem, price, quantity){
    this.name = nameitem;
    this.price = price;
    this.quantity = quantity;
    }
    show(){
    console.log(this.name, this.price, this.quantity);
    }
}

let sum = 0;
const item1 = new Basket('table', 400, 1);
const item2 = new Basket('chair', 100, 2);
const item3 = new Basket('lamp', 200, 1);
basketMas = [item1, item2, item3];


function clkfunc(event){
    let basket__item = document.createElement('div');
    basket__item.className = 'basket__item';
    basket__item.textContent = basketMas[this.dataset.item].name + ' ' + basketMas[this.dataset.item].price;
    text.innerHTML = "В корзине товары:";
    basket.appendChild(basket__item);
    sum += basketMas[this.dataset.item].price;
    summary.innerHTML = "На сумму " + sum;
    summary.className = 'summary';
    basket.appendChild(summary);
}

for (let i=0; i<3; i++){
    addBtn[i].addEventListener('click', clkfunc);
    //console.log(addBtn[2]);
}


