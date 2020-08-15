const listOfGoods = document.querySelector('.goods-list');
listOfGoods.addEventListener('click', function (event) {
    if (event.target.className == 'addBtn') {
        let goodName = event.target.previousElementSibling.previousElementSibling.textContent;
        let goodPrice = event.target.previousElementSibling.textContent;
        basketItems.addInBasket(goodName, goodPrice);
        basketItems.renderBasketSum();
    }
})

const listOfBasketGoods = document.querySelector('.basket-list');
listOfBasketGoods.addEventListener('click', function (event) {
    if (event.target.className == 'delBtn') {
        let goodName = event.target.previousElementSibling.previousElementSibling.textContent;
        basketItems.deleteFromBasket(goodName);
        event.target.parentElement.remove();
        basketItems.renderBasketSum();
    }
})

const basketSum = document.getElementById("basket");

class BasketItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="basket-item"><span>${this.title}</span><span>${this.price}</span><button class="delBtn">DELETE</button></div>`;
    }
}

class BasketList {
    constructor() {
        this.goods = [];
    }
    addInBasket(goodName, goodPrice) {
        let newGoodInBasket = new BasketItem(goodName, goodPrice);
        this.goods.push(newGoodInBasket);
        document.querySelector('.basket-list').innerHTML += newGoodInBasket.render();
    }
    deleteFromBasket(goodName) {
        for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].title == goodName) {
                this.goods.splice(i, 1);
                return;
            }
        }
    }
    basketSumm() {
        let sum = 0;
        for (let i = 0; i < this.goods.length; i++) {
            sum += +this.goods[i].price;
        }
        console.log(sum);
        return sum;

    }
    renderBasketSum() {
        basketSum.textContent = this.basketSumm();
    }
}

const basketItems = new BasketList;

