const basket__parent = document.querySelector('.basket__parent');
const addBtn1 = document.querySelector('#item1');
const addBtn2 = document.querySelector('#item2');
const addBtn3 = document.querySelector('#item3');
const resetBtn = document.querySelector('.reset');
const basket = document.querySelector('.basket__parent');
const text = document.querySelector('#default__text');
const summary = document.createElement('div');
summary.className = 'summary';

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

const item1 = new Basket('chair', 100, 2);
const item2 = new Basket('table', 400, 1);
const item3 = new Basket('lamp', 200, 1);


addBtn1.addEventListener('click', function(){
    let basket__item = document.createElement('div');
    basket__item.className = 'basket__item';
    basket__item.textContent = item1.name + " " + item1.price;

    if (text.textContent == 'Корзина пуста'){
        text.remove();
        text.textContent = "В корзине товары:";
        console.log(text);
        basket.appendChild(text);
    }
    
    basket.appendChild(basket__item);    
    sum += item1.price;
    summary.textContent = "На сумму " + sum;;
    basket.appendChild(summary);
    return (sum);
});

addBtn2.addEventListener('click', function(){
    let basket__item = document.createElement('div');
    basket__item.className = 'basket__item';
    basket__item.textContent = item2.name + " " + item2.price;
    basket.appendChild(basket__item);

    if (text.textContent == 'Корзина пуста'){
        text.remove();
        text.textContent = "В корзине товары:";
        console.log(text);
        basket.appendChild(text);
    }
    
    basket.appendChild(basket__item);    
    sum += item2.price;
    summary.textContent = "На сумму " + sum;;
    basket.appendChild(summary);
    return (sum);
});

addBtn3.addEventListener('click', function(){
    let basket__item = document.createElement('div');
    basket__item.className = 'basket__item';
    basket__item.textContent = item3.name + " " + item2.price;
    basket.appendChild(basket__item);

    if (text.textContent == 'Корзина пуста'){
        text.remove();
        text.textContent = "В корзине товары:";
        console.log(text);
        basket.appendChild(text);
    }
    
    basket.appendChild(basket__item);    
    sum += item3.price;
    summary.textContent = "На сумму " + sum;;
    basket.appendChild(summary);
    return (sum);
});