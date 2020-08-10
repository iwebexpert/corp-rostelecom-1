window.onload = function () {
    // Создание каталога товаров
    class GoodsItem {
        constructor(id, title, price) {
            this.id = id;
            this.title = title;
            this.price = price;
        }
        render() {
            return `<div
        class="goods-item"><h3> ${ this.title} </h3><p> ${this.price} </p></div>`;
        }
    }
    class GoodsList {
        constructor() {
            this.goods = [];
        }
        fetchGoods() {
            function sendRequest(url) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status !== 200) {
                                reject();
                            }
                            resolve(JSON.parse(xhr.responseText));
                        }
                    };
                    xhr.send();
                });
            }

            const btn1 = document.querySelector('#btn1');



            btn1.addEventListener('click', function () {
                sendRequest('/fetchGoods').then((goods) => {
                    //resolve()
                    let listHtml = '';
                    goods.forEach(function (good) {

                        const goodItem = new GoodsItem(good.id, good.title, good.price);
                        listHtml += goodItem.render();

                        document.querySelector('.goods-list').innerHTML = listHtml;
                    });
                }, () => {
                    //reject()
                });
            });

        }

    }
    const list = new GoodsList();
    list.fetchGoods();

    // Создание корзины товаров
    class ElementBasket {
        constructor(id, title, price, amount) {
            this.id = id;
            this.title = title;
            this.price = price;
            this.amount = amount;
        }
        render() {
            return `<div
        class="goods-item"><h3> ${ this.title} </h3><p> ${this.amount} </p></div>`;
        }
    }
    class Basket {
        constructor() {
            this.elements = [];
        }
        fetchBasket() {
            function sendRequest(url) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status !== 200) {
                                reject();
                            }
                            resolve(JSON.parse(xhr.responseText));
                        }
                    };
                    xhr.send();
                });
            }

            const btn2 = document.querySelector('#btn2');

            btn2.addEventListener('click', function () {
                sendRequest('/fetchBasket').then((elements) => {
                    //resolve()
                    let listHtml = '';
                    let amount = 0;
                    let count = 0;
                    elements.forEach(function (element) {

                        const g = new ElementBasket(element.id, element.title, element.price, element.amount);

                        listHtml += g.render();
                        amount += element.price * element.amount;
                        count += element.amount;
                        return (count, amount);
                    });
                    document.querySelector('.basket').innerHTML = listHtml;
                    document.querySelector('.count').textContent = "В корзине " + count + " товар(ов) на сумму " + amount;
                }, () => {
                    //reject()
                });
            });

        }

    }
    const l = new Basket();
    l.fetchBasket();

}