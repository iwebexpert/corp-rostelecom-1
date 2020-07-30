
class Product {
    constructor() {
        this.article = '';
        this.quantity = 0;
        this.cost = 0.0;
        this.measure = '';
        this.currency = 'RUR';
    }

    get productInfo() {
        return 'Товар: ' + this.article + ' в количестве ' + this.quantity + ' '
            + this.measure + ' стоимостью ' + this.cost + ' ' + this.currency;
    }

}

let items = new Array(5);

for (let i = 0; i < items.length; i++)
    items[i] = new Product();

//console.log(items);
items[0].article = 'Картошка';
items[0].quantity = 25;
items[0].cost = 25.0;
items[0].measure = 'кг';

items[1].article = 'Морковь';
items[1].quantity = 5;
items[1].cost = 30.0;
items[1].measure = 'кг';

items[2].article = 'Шоколад';
items[2].quantity = 10;
items[2].cost = 130.0;
items[2].measure = 'шт.';

items[3].article = 'Молоко';
items[3].quantity = 10;
items[3].cost = 95.5;
items[3].measure = 'литр';

items[4].article = 'Коньяк';
items[4].quantity = 4;
items[4].cost = 2350.5;
items[4].measure = 'бутылка 0,5 литра';

class Basket {
    constructor() {
        this.products = [];
    }

    //добавить продукт в корзину
    addProductToBasket(product) {
        this.products.push(product);
        console.log('В корзину добавлено: ', product);
    }

    //обработать корзину
    processBasket(isPrint = 1) {
        let num_products = this.products.length;
        let total_amount = 0.0;
        for (let i = 0; i < num_products; total_amount += (this.products[i].cost * this.products[i].quantity), i++);

        if (isPrint)
            console.log('Всего в корзине: ', num_products, 'товаров на сумму ', total_amount, ' ', this.products[0].currency);
        return Array(num_products, total_amount, this.products[0].currency);
    }

    //выдать содержимое продукта номер num
    getProductNum(num) {
        if ((num < 0) && (num > this.products.length))
            return null;
        else
            return this.products[num];
    }

}

let cart = new Basket();
//console.log(cart);
for (let i = 0; i < items.length; cart.addProductToBasket(items[i]), i++);
cart.processBasket();
console.log(cart);


// Выполнение ДЗ №2
/*
    ancestor - предок
    descendant - потомок

*/

//Кнопки
const loadСartBtn = document.querySelector('.load__cart');
const clearCartBtn = document.querySelector('.clear__cart');
const chessBoardBtn = document.querySelector('.chess__board__btn');


console.log(clearCartBtn);
console.log(chessBoardBtn);
console.log(loadСartBtn);

// Окно вывода продуктов
const productsBox = document.querySelector('.products');
// Окно вывода шахматной доски:
const chessBoard = document.querySelector('.chess__board');


loadСartBtn.addEventListener('click', function () {
    //alert('Нажата кнопка Загрузить корзину!');

    productsBox.innerHTML = '';

    //Выводим содержимое корзины через создание новых элементов
    let nextProductItem;
    let newProductElem;

    for (let i = 0; i < cart.products.length; i++) {
        nextProductItem = cart.getProductNum(i);
        newProductElem = document.createElement('p');
        newProductElem.innerHTML = nextProductItem.productInfo;
        productsBox.appendChild(newProductElem);
    }

    if (cart.products.length != 0) {
        //document.querySelector('.products')

        //Выводим ИТОГО
        let total = cart.processBasket(0);
        document.querySelector('.number__products__val').innerHTML = total[0];
        document.querySelector('.total__cost').innerHTML = total[1];
        document.querySelector('.total__cost__val').innerHTML = total[2];
    }

});

clearCartBtn.addEventListener('click', function () {
    //alert('Нажата кнопка Очистить корзину!');

    // получаем NodeList []
    let descendents = productsBox.querySelectorAll('*')
    //console.log(descendents);

    //Очищаем <div class="products"> ... </div>
    if (descendents.length != 0) {
        //проходимся по всем элементам-потомкам
        for (let i = 0; i < descendents.length; ++i) {
            descendents[i].parentNode.removeChild(descendents[i]);
        }
    }

    productsBox.innerHTML = 'Корзина пуста';

    document.querySelector('.number__products__val').innerHTML = '';
    document.querySelector('.total__cost').innerHTML = '';
    document.querySelector('.total__cost__val').innerHTML = '';
});

// Генерим и "стираем" шахматную доску:
chessBoardBtn.addEventListener('click', function () {

    if (this.innerHTML == 'Сгенерировать шахматную доску') {

        //console.log(this.innerHTML);
        //alert('Генерим доску!');

        //Меняем название на "Убрать шахматную доску"
        this.innerHTML = 'Убрать шахматную доску';

        //Создаем элементы доски:
        //Верхняя подпись колонки и стили
        let topHeaderDiv = document.createElement('div');
        /*
        display: flex;
        width: 807px;
        height: 20px;*/
        topHeaderDiv.style.display = 'flex';
        topHeaderDiv.style.width = '807px';
        topHeaderDiv.style.height = '20px';
        topHeaderDiv.classList.add('main__col__title');

        //Боковая подпись строки
        let rowTitleDiv = []
        for (let i = 0; i < 9; i++) {
            rowTitleDiv[i] = document.createElement('div');
            /*
            background-color: #fff;
            width: 20px;
            align-self: center;
            text-align: center;*/
            rowTitleDiv[i].style.backgroundColor = '#fff';
            rowTitleDiv[i].style.width = '20px';
            rowTitleDiv[i].style.alignSelf = 'center';
            rowTitleDiv[i].style.textAlign = 'center';
        }

        //Вертикальная подпись колонки
        let colTitleDiv = [];
        for (let i = 0; i < 8; i++) {
            colTitleDiv[i] = document.createElement('div');

            /*
            background-color: #fff;
            width: 100px;
            text-align: center;*/
            colTitleDiv[i].style.backgroundColor = '#fff';
            colTitleDiv[i].style.width = '100px';
            colTitleDiv[i].style.textAlign = 'center';
        }

        // добавляем в DOM заголовок - верхнюю подпись
        chessBoard.appendChild(topHeaderDiv);
        topHeaderDiv.appendChild(rowTitleDiv[0]);
        let j = 'ABCDEFGH';
        for (let i = 0; i < 8; i++) {
            topHeaderDiv.appendChild(colTitleDiv[i]).innerHTML = j[i];
        }

        // Рисуем доску
        // массив строк
        let rowBoard = [];
        let cell = [];

        for (row = 0; row < 8; row++) {
            //
            rowBoard[row] = document.createElement('div');
            /*
                display: flex;
                width: 807px;
                height: 100px;
            */
            // прописываем стили
            rowBoard[row].style.display = 'flex';
            rowBoard[row].style.width = '807px';
            rowBoard[row].style.height = '100px';

            //Добавляем в DOM строку
            chessBoard.appendChild(rowBoard[row]);
            rowBoard[row].appendChild(rowTitleDiv[row + 1]);
            rowTitleDiv[row + 1].innerHTML = (row + 1).toString();


            cell = [];

            for (col = 0; col < 8; col++) {

                //создаем клетки для очередной строки
                cell[col] = document.createElement('div');
                /*
                .white {
                    background-color: #fff;
                    width: 100px;
                    border: 1px solid #aaa;
                }
                
                .black {
                    background-color: #000;
                    width: 100px;
                    border: 1px solid #aaa;
                }*/
                if (row % 2 != 0) {
                    if ((col % 2 != 0) && (row % 2 != 0)) {
                        cell[col].style.backgroundColor = '#fff';
                    }
                    else {
                        cell[col].style.backgroundColor = '#000';
                    }
                }
                else {
                    if ((col % 2 == 0) && (row % 2 == 0)) {
                        cell[col].style.backgroundColor = '#fff';
                    }
                    else {
                        cell[col].style.backgroundColor = '#000';
                    }
                }
                cell[col].style.width = '100px';
                cell[col].style.border = '1px solid #aaa';

                //Добавляем в DOM клетки
                rowBoard[row].appendChild(cell[col]);
            }

        }
    }
    else {
        //Убираем доску:
        this.innerHTML = 'Сгенерировать шахматную доску';

        //Очищаем <div class="chess__board"> ... </div>
        // получаем NodeList []
        let descendents = chessBoard.querySelectorAll('*')
        //console.log(descendents);

        //Очищаем <div class="products"> ... </div>
        if (descendents.length != 0) {
            //проходимся по всем элементам-потомкам
            for (let i = 0; i < descendents.length; ++i) {
                descendents[i].parentNode.removeChild(descendents[i]);
            }
        }
    }

});
