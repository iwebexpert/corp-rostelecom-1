window.addEventListener('DOMContentLoaded', function () {
    // Карточка товара
    class GoodsItem {
        constructor(id, img_item, img_arr, title, price, amount) {
            this.id = id;
            this.img_item = img_item;
            this.img_arr = img_arr;
            this.title = title;
            this.price = price;
            this.amount = amount;
        }
        render() {
            return `<div class="a">
            <div class="windows">
                <a href="#" class="pages">Закрыть</a>
                <div id="gallery">
                <div class="photos">
                <img src=${this.img_arr[0]} alt="Товар на фотосессии">
            </div>
            <div style="display: none;" class="photos">
                <img src=${this.img_arr[1]} alt="Товар на фотосессии">
            </div>
            <div style="display: none;" class="photos">
                <img src=${this.img_arr[2]} alt="Товар на фотосессии">
            </div>
                    <div class="buttons">
                        <button class="next">>></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="b"></div>
        <div class="card">
            <a href="#" class="icon"><img src=${this.img_item} alt="Товар на фотосессии"></a>
            <h4 class="card_head">${ this.title}</h4>
            <p class="text card_text">Цена: ${this.price} рублей</p>
            <button data-id="${this.id}"
            data-price="${this.price}" class="basket_link">В корзину</button>
        </div>`;
        }
        // Передача данных в корзину
        addBasket(item_id, newCount) {
            fetch(`/fetchGoods/${item_id}`, {
                method: 'PATCH',
                body: JSON.stringify({ amount: newCount }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
    }
    // Вывод каталога
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

            const btn1 = document.querySelector('#btn');

            btn1.addEventListener('click', function () {
                $("#product").slideToggle(1500);

                sendRequest('/fetchGoods').then((goods) => {
                    //resolve()
                    let listHtml = '';
                    goods.forEach(function (good) {

                        const goodItem = new GoodsItem(good.id, good.img_item, good.img_arr, good.title, good.price, good.amount);
                        listHtml += goodItem.render();

                        document.querySelector('#catalog').innerHTML = listHtml;
                        // Подсчет товаров в корзине
                        const addBtns = document.getElementsByClassName("basket_link");
                        let count = [];
                        let r = [];
                        for (let i = 0; i < addBtns.length; i++) {
                            count[i] = 0;
                            r[i] = 0;
                            addBtns[i].addEventListener('click', function () {
                                count[i] += 1;
                                r[i] += Number(addBtns[i].dataset.price);
                                goodItem.addBasket(addBtns[i].dataset.id, count[i]);
                                const lab = document.querySelector("#message");
                                let sum = 0;
                                let sum_price = 0;
                                for (let l = 0; l < addBtns.length; l++) {
                                    sum += count[l];
                                    sum_price += r[l];
                                }
                                lab.textContent = "Добавлено " + sum + " товар(ов) на сумму " + sum_price + " рублей";
                            });
                        };
                    });
                    // Модальное окно
                    const a = document.getElementsByClassName("a");
                    const b = document.getElementsByClassName("b");
                    const cl = document.getElementsByClassName("icon");
                    const close = document.getElementsByClassName("pages");

                    for (let i = 0; i < a.length; i++) {
                        cl[i].addEventListener("click", function () {

                            b[i].style.opacity = 0.8;
                            b[i].style.display = "block";

                            a[i].style.display = "block";
                            a[i].style.top = "10px";
                        })
                        close[i].addEventListener("click", function () {
                            b[i].style.display = "none";
                            a[i].style.display = "none";
                        })
                    }
                    // Карусель
                    const btn_next = document.getElementsByClassName("next");
                    const images = document.getElementsByClassName("photos");

                    for (let k = 0; k < btn_next.length; k++) {
                        let h = 0;
                        btn_next[k].onclick = function () {
                            if (h === 2) {
                                images[3 * k + h].style.display = 'none';
                                images[3 * k].style.display = 'block';
                                h = 0;
                            } else {
                                images[3 * k + h].style.display = 'none';
                                images[3 * k + h + 1].style.display = 'block';
                                h = h + 1;
                            };
                        };
                    };

                    const c = document.querySelector("#message");
                    c.textContent = "Корзина пуста";

                }, () => {
                    //reject()
                    document.querySelector('#catalog').innerHTML = `<p class="red">Ошибка загрузки. Сервер временно недоступен.</p>`;
                });
            });
        }
    }
    const list = new GoodsList();
    list.fetchGoods();
}