/**
 * Домашнее задание #5
 * @author  Сорванов Михаил Леонидович [CorpRostelecom-1]
 */

/**
2.  Сделать  генерацию  корзины  динамической:  верстка  корзины  не  должна  находиться  в  HTML-
структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на 
базе JS: 
a.  Пустая корзина должна выводить строку «Корзина пуста»; 
b.  Наполненная должна выводить «В корзине: n товаров на сумму m рублей». 
*/

var basketSum = 0;
var basketCount = 0;

function basket() {

  let content = document.getElementById('content');

  let bs_info = document.createElement('div');
  bs_info.setAttribute("class", "basket-info");
  bs_info.innerHTML = "Корзина пуста";
  content.appendChild(bs_info);
  let goods = document.createElement('input');
  goods.setAttribute("type", "text");
  goods.setAttribute("id", "goods");
  goods.setAttribute("required", '');
  goods.setAttribute("placeholder", "Ведите название товара");
  content.appendChild(goods);
  let quantity = document.createElement('input');
  quantity.setAttribute("type", "number");
  quantity.setAttribute("required", '');
  quantity.setAttribute("id", "quantity");
  quantity.setAttribute("placeholder", "Ведите количество");
  content.appendChild(quantity);
  let price = document.createElement('input');
  price.setAttribute("type", "number");
  price.setAttribute("required", '');
  price.setAttribute("id", "price");
  price.setAttribute("placeholder", "Ведите цену");
  content.appendChild(price);
  let sendBnt = document.createElement('button');
  sendBnt.setAttribute("class", "send");
  sendBnt.innerHTML = "Добавить товар";
  content.appendChild(sendBnt);
  let clearBnt = document.createElement('button');
  clearBnt.setAttribute("class", "clear");
  clearBnt.innerHTML = "Очистить корзину";
  content.appendChild(clearBnt);
  let br = document.createElement('br');
  content.appendChild(br);
  let bs_goods = document.createElement('div');
  bs_goods.setAttribute("class", "basket-good");
  bs_goods.innerHTML = "";
  content.appendChild(bs_goods);

}

window.onload = basket();

const sendBnt = document.querySelector('.send');
const clearBnt = document.querySelector('.clear');
const goods = document.querySelector('input#goods');
const quantity = document.querySelector('input#quantity');
const price = document.querySelector('input#price');
const bs_info = document.querySelector('.basket-info');
const bs_goods = document.querySelector('.basket-good');


sendBnt.addEventListener('click', function () {
  let msgGood = '';
  let sumGoods = 0;

  if (price.value === "" || quantity.value === "") {
    console.log('Данные не заполнены');
  } else {
    sumGoods = price.value * quantity.value * 1;
    basketSum += sumGoods * 1;
    basketCount += 1;
    msgGood = basketCount + '.' + goods.value + ', количество:' + quantity.value + ' по цене ' + price.value + ' руб. на сумму ' + sumGoods + " руб.";
    bs_info.textContent = `В корзине: ${basketCount} товаров на сумму ${basketSum} рублей`;
    const message = document.createElement('div');
    message.setAttribute("class", "good");
    message.innerHTML = msgGood;
    bs_goods.appendChild(message);
  }

});

clearBnt.addEventListener('click', function () {
  bs_info.textContent = "Корзина пуста";
  bs_goods.textContent = "";
  basketSum = 0;
  basketCount = 0;
  price.value = "";
  quantity.value = "";
  goods.value = "";
});
