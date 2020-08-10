
//привязывает Корзину к HTML эл-ту
const shoppingCart = new classBasket(document.getElementById('basket'), checkoutBegin);

//создаем экземпляр глобального каталога и привязываем к HTML эл-ту и привязываем к нему Корзину
const catalog = new classCatalog(document.getElementById('catalog'), shoppingCart);


const list = new GoodsList();
list.fetchGoods('/goods').then((goods) => {
    goods.forEach(good => {
        let goodItem = new classProduct();
        goodItem = Object.assign(goodItem, good);
        catalog.addItem(goodItem);
    });
    catalog.updateView();
});


//отрисуем каталог и корзину
catalog.updateView();
catalog.shoppingCart.updateView();


//очистка корзины
let clearButton = document.getElementById('clearBasketButton');
clearButton.addEventListener('click', catalog.shoppingCart.clearBasket.bind(catalog.shoppingCart));



