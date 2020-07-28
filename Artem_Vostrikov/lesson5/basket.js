const message = document.createElement('div')
const basket_tag = document.querySelector('.basket')

const basket = [{ product: 'Гитара', price: 15000, amount: 1 },
{ product: 'Медиатор', price: 35, amount: 5 },
{ product: 'Струны', price: 600, amount: 2 }]
console.log(basket.length)

function basketItog(basket) {
    if (basket.length === 0) {
        message.className = "basket-msg-1"
        message.innerHTML = ["<span>Корзина пуста</span>"]
        basket_tag.appendChild(message)
    } else {
        let sumBasket = 0
        let amountBasket = 0
        message.className = "basket-msg-2"
        for (i = 0; i < basket.length; i++) {
            amountBasket += basket[i].amount
            sumBasket += basket[i].price * basket[i].amount

        }
        message.innerHTML = "<span>В корзине " + amountBasket + " шт товара на сумму " + sumBasket + " руб </span>"
        basket_tag.appendChild(message)
    }


}
console.log(basketItog(basket))


