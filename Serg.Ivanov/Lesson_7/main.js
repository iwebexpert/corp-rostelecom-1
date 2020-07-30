// const noMessageContainer = document.querySelector('.error-empty');
// const messagesContainer = document.querySelector('.messages');
// // const errorInputEl = document.querySelector('.error-input');
// const sendBtn = document.getElementsByClassName('send');
// const clearBtn = document.querySelector('.clear');
// const options = {
//     messageClassName: 'message',
// };
// const count = [0, 0, 0, 0];
// const price = [200, 150, 380, 598];

// for (var j = 0; j < sendBtn.length; j++) {
//     sendBtn_a = sendBtn[j];
//     sendBtn_a.addEventListener('click', function () {
//         for (var i = 1; i <= count.length; i++) {
//             const inputEl = document.getElementById(String(i));
//             if (inputEl.value != '' && Number(inputEl.value) > 0 && (Number(inputEl.value) % 1 === 0)) {
//                 count[i - 1] = Number(inputEl.value);
//             } else { count[i - 1] = 0 }
//         };
//         hideBlockNoText();

//         const messagesAll = document.querySelectorAll(`.${options.messageClassName}`);
//         messagesAll.forEach(function (message) {
//             message.remove();
//         });

//         const newMessage = getMessageMarkup(count, price, 0);
//         messagesContainer.appendChild(newMessage);
//     });
// }

// clearBtn.addEventListener('click', function () {
//     showBlockNoText();
//     for (var i = 1; i <= count.length; i++) {
//         const inputEl = document.getElementById(String(i));
//         inputEl.value = '';
//         count[i - 1] = 0;
//     };
//     const messagesAll = document.querySelectorAll(`.${options.messageClassName}`);
//     messagesAll.forEach(function (message) {
//         message.remove();
//     });
// });

// //Функции
// function hideBlockNoText() {
//     noMessageContainer.style.display = 'none';
// }

// function showBlockNoText() {
//     noMessageContainer.style.display = 'block';
// }

// function getMessageMarkup(name, ch, countBasket) {
//     tovar = 0;
//     for (var i = 0; i < name.length; i++) {
//         countBasket += name[i] * ch[i];
//         tovar = tovar + name[i];
//     }
//     const message = document.createElement('div');
//     message.classList.add(options.messageClassName);

//     const messageCount = document.createElement('div');
//     messageCount.textContent = `Стоимость выбранных товаров: ${countBasket} , Единиц товара: ${tovar} `;

//     message.appendChild(messageCount);

//     return message;
// }
//Создание набора товаров
class product {
    constructor(photo_array, name, price, specification, article, stock, amount) {
        this.photo_array = photo_array;
        this.name = name;
        this.price = price;
        this.specification = specification;
        this.article = article;
        this.stock = stock;
        this.amount = amount;
    }
}
const product1 = new product([], 'table', 200, 'green', '301018700', 24, 2);
const product2 = new product([], 'chair', 150, 'black', '301017484', 254, 6);
const product3 = new product([], 'bed', 380, 'white', '301018570', 37, 2);
const product4 = new product([], 'cupboard', 598, 'brown', '301016889', 82, 3);

var zero = new product('', 0, '', '', 0, 0);

const catalog = [
    product1,
    product2,
    product3,
    product4
];
// console.log("Товар без сортировки.");
// for (let i = 0; i < catalog.length; i++) {
//     console.log("Наименование товара -", catalog[i].name, "Цена -", catalog[i].price, "Описание товара -", catalog[i].specification, "Артикул -", catalog[i].article, "Наличие товара -", catalog[i].stock, "Товара в корзине -", catalog[i].amount);
// }
// //Сортировка товаров по цене
// console.log("Товар отсортирован по цене.");
// for (let j = 1; j < catalog.length - 1; j++) {

//     for (let i = 0; i < catalog.length - 1 - j; i++) {
//         if (catalog[i].price > catalog[i + 1].price) {
//             zero = catalog[i];
//             catalog[i] = catalog[i + 1];
//             catalog[i + 1] = zero;

//         }
//     }

// };
// for (let i = 0; i < catalog.length; i++) {
//     console.log("Наименование товара -", catalog[i].name, "Цена -", catalog[i].price, "Описание товара -", catalog[i].specification, "Артикул -", catalog[i].article, "Наличие товара -", catalog[i].stock, "Товара в корзине -", catalog[i].amount);
// }
// //Вывод каталога
// for (let j = 0; j < catalog.length; j++) {
//     var create = function (c) {
//         var a = document.getElementById("catalog");
//         var div = document.createElement("div");
//         div.className = "card";
//         a.appendChild(div);
//         var head = document.createElement("h4");
//         head.className = "card_head";
//         head.innerText = c.name
//         div.appendChild(head);
//         {/* <img class="img_card" src="img / img1.jpg" alt="товар на фотосессии">
//                  < h4 class="card_head" > table</h4 >
//                      <p class="text card_text">green</p>
//                      <p class="text card_text">200$</p>
//                      <input id="1" type="text" placeholder="Количество">
//                          <button id="button_1" class="send">Добавить</button>"; */}

//     }
//     create(catalog[j]);
// }
// Сворачивание полей страницы Корзина 
// $(document).ready(function () {
//     $("#pointer_1").click(function () {
//         $("#content_1").slideToggle(500);
//     });
// });
// $(document).ready(function () {
//     $("#pointer_2").click(function () {
//         $("#content_2").slideToggle(500);
//     });
// });
// $(document).ready(function () {
//     $("#pointer_3").click(function () {
//         $("#content_3").slideToggle(500);
//     });
// });
const countBtn = document.querySelector('.count_basket');

$(document).ready(function () {
    $("#basket_1").click(function () {
        $("#content_1").slideToggle(500);
        // $("#pointer_1").slideToggle("slow").siblings(".pointer > .slideT").slideUp("slow");
        $("#content_2").slideToggle(500);
    });
})
$(document).ready(function () {
    $("#basket_2").click(function () {
        $("#content_2").slideToggle(500);
        // $("#pointer_1").slideToggle("slow").siblings(".pointer > .slideT").slideUp("slow");
        $("#content_3").slideToggle(500);
    });
})
$(document).ready(function () {
    // $(".count").
});
for (let j = 0; j < catalog.length; j++) {
    var create = function () {
        var a = document.getElementById("basket");
        var div = document.createElement("div");
        div.className = "text";
        div.id = "d" + j;
        div.innerText = "Наименование товара - " + catalog[j].name + " Цена - " + catalog[j].price + " Товара в корзине - " + catalog[j].amount + " Сумма = " + catalog[j].price * catalog[j].amount;
        a.appendChild(div);
        var inp = document.createElement("input");
        inp.id = j;
        div.append(inp);

    }
    create(catalog[j]);
}
let s_b = 0;
let c_b = 0;
for (let j = 0; j < catalog.length; j++) {
    s_b += catalog[j].price * catalog[j].amount;
    c_b += catalog[j].amount;
}
var a = document.getElementById("basket");
var sum_basket = document.createElement("div");
sum_basket.className = "text";
sum_basket.id = "sum_basket";
sum_basket.innerText = "В корзине " + c_b + " товар(ов) на сумму " + s_b;
a.appendChild(sum_basket);


countBtn.addEventListener('click', function () {
    for (var i = 0; i < catalog.length; i++) {
        const inputEl = document.getElementById(String(i));
        if (inputEl.value != '' && Number(inputEl.value) > 0 && (Number(inputEl.value) % 1 === 0)) {
            catalog[i].amount = Number(inputEl.value);
        };
        if (inputEl.value === '') { catalog[i].amount = 0 }
    };

    for (let j = 0; j < catalog.length; j++) {
        var div = document.getElementById("d" + j);
        div.innerText = "Наименование товара - " + catalog[j].name + " Цена - " + catalog[j].price + " Товара в корзине - " + catalog[j].amount + " Сумма = " + catalog[j].price * catalog[j].amount;
        var inp = document.createElement("input");
        inp.id = j;
        div.append(inp);
    }
    let s_b = 0;
    let c_b = 0;
    for (let j = 0; j < catalog.length; j++) {
        s_b += catalog[j].price * catalog[j].amount;
        c_b += catalog[j].amount;
    }
    var sum_basket = document.getElementById("sum_basket");
    sum_basket.innerText = "В корзине " + c_b + " товар(ов) на сумму " + s_b;

});
