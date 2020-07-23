function getChess() {
    let tableEl = document.createElement('table');
    let tbodyEl = document.createElement('tbody');

    let classList = {
        whiteCell: 'white',
        blackCell: 'black',
        mainBoard: 'board',
        numEl: 'num',
        letterEl: 'letter',
        cellEl: 'cell',
    }

    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    tbodyEl.setAttribute('id', classList.mainBoard);

    for (let i = 9; i >= 0; i--) {

        let trEl = document.createElement('tr');

        if (i == 0 || i == 9) {
            trEl.classList.add(classList.letterEl);
        }
        for (let j = 0; j <= 9; j++) {
            let tdEl = document.createElement('td');
            if ((j == 0 || j == 9) && (i > 0 && i < 9)) {
                tdEl.textContent = i;
            } else {
                tdEl.classList.add(classList.cellEl)
            }
            if (((i + j) % 2 == 0) && (i > 0 && i < 9) && (j > 0 && j < 9)) {
                tdEl.classList.add(classList.blackCell)
            }
            if ((i > 0 && i < 9) && (j > 0 && j < 9)) {
                tdEl.setAttribute('id', letters[j - 1] + i)
            }
            if ((trEl.classList.contains('letter') == true)) {
                tdEl.textContent = letters[j - 1];
            }
            trEl.append(tdEl);
        }
        tbodyEl.append(trEl);
    }

    document.body.append(tableEl);
    tableEl.append(tbodyEl);

}

getChess();






//Корзина

const basket = [];

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;

    }
}

const product1 = new Product('Super keyboard', 10000);
const product2 = new Product('Super mouse', 7500);
const product3 = new Product('Red pen', 37);



const basketBox = document.createElement('div');
const addProductBtn = document.createElement('button');
const basketContent = document.createElement('p');


basketBox.className = 'basket';
addProductBtn.className = 'btn';
document.body.append(basketBox);
document.body.append(addProductBtn);
addProductBtn.textContent = 'Добавить товар';
basketBox.append(basketContent);
basketContent.textContent = 'Корзина пуста!';

// Суммируем стоимость товаров в корзине
function sumPrice() {
    let sum = 0;
    for (i = 0; i < basket.length; i++) {
        sum += basket[i].price;
    }
    return sum;
};


// Для проверки функции checkBasket
// basket.push({
//     name: product2.name,
//     price: product2.price,
//     count: 1,
// });


// По нажатию на кнопку добавляем в массив корзины элемент и меняем textContent у basketContent
addProductBtn.addEventListener('click', function addInBasket() {
    basket.push({
        name: product1.name,
        price: product1.price,
        count: 1,
    });
    basketContent.textContent = `В корзине: ${basket.length} товаров на сумму ${sumPrice()} рублей`;

});
// Проверяем заполненность корзины
document.addEventListener("DOMContentLoaded", function checkBasket() {
    if (basket.length == 0) {
        basketContent.textContent = `Корзина пуста!`;
    } else {
        basketContent.textContent = `В корзине: ${basket.length} товаров на сумму ${sumPrice()} рублей`;
    }
});
