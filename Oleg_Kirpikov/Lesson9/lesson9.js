//создать продукты
product1 = new classProduct(1, 'Item1', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed ipsam voluptates aut, laboriosam omnis voluptatibus aliquam modi fugiat facere tempore voluptate in vitae quasi iusto amet ipsum veritatis facilis similique?', 100, 'RUB');
product2 = new classProduct(2, 'Item2', 'Описание Item1', 200, 'RUB');
product3 = new classProduct(3, 'Item3', 'Описание Item1', 250, 'RUB');

//url'ы картинок для каждого продукта
product1.imgUrls.push('https://cdn.pixabay.com/photo/2018/07/06/08/49/tomato-3520004_960_720.jpg');
product1.imgUrls.push('https://cdn.pixabay.com/photo/2015/03/07/13/55/tomato-663097_960_720.jpg');
product1.imgUrls.push('https://cdn.pixabay.com/photo/2016/03/26/16/44/tomatoes-1280859_960_720.jpg');

product2.imgUrls.push('https://cdn.pixabay.com/photo/2018/06/04/23/42/raspberry-3454504_960_720.jpg');
product2.imgUrls.push('https://cdn.pixabay.com/photo/2010/12/13/10/05/raspberry-2276_960_720.jpg');
product2.imgUrls.push('https://cdn.pixabay.com/photo/2010/12/13/10/05/berry-2270_960_720.jpg');

product3.imgUrls.push('https://cdn.pixabay.com/photo/2016/01/02/01/59/oranges-1117628_960_720.jpg');
product3.imgUrls.push('https://cdn.pixabay.com/photo/2017/02/26/12/27/oranges-2100108_960_720.jpg');
product3.imgUrls.push('https://cdn.pixabay.com/photo/2016/01/02/02/03/orange-1117645_960_720.jpg');


//привязывает Корзину к HTML эл-ту
shoppingCart = new classBasket(document.getElementById('basket'), checkoutBegin);

//создаем экземпляр глобального каталога и привязываем к HTML эл-ту и привязываем к нему Корзину
catalog = new classCatalog(document.getElementById('catalog'), shoppingCart);


//добавим продукты в каталог
catalog.addItem(product1);
catalog.addItem(product2);
catalog.addItem(product3);

//отрисуем каталог и корзину
catalog.updateView();
catalog.shoppingCart.updateView();

console.log(catalog.getProductById(1));
console.log(catalog.htmlObj.querySelectorAll('.buyButton'));

//очистка корзины
let clearButton = document.getElementById('clearBasketButton');
clearButton.addEventListener('click', catalog.shoppingCart.clearBasket.bind(catalog.shoppingCart));



