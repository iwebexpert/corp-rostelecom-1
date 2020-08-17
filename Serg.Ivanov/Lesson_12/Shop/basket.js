window.addEventListener('DOMContentLoaded', function () {
    // Валидация формы сообщений
    const sendBtn = document.querySelector('.send');
    const clearBtn = document.querySelector('.clear');

    sendBtn.addEventListener('click', function () {
        const inName = document.querySelector('#name');
        const inPhone = document.querySelector('#phone');
        const inMail = document.querySelector('#mail');
        const inText = document.querySelector('#text');

        const regExpName = /^[a-z]+$/i;
        const regExpPhone = /^\+7\([\d]{3}\)[\d]{3}-[\d]{4}$/;
        const regExpMail = /^[\w-\.]+\@mail.ru$/i;

        if (!regExpName.test(inName.value)) {
            red(inName);
        } else {
            inName.value = null;
        };
        if (!regExpPhone.test(inPhone.value)) {
            red(inPhone);
        } else {
            inPhone.value = null;
        };
        if (!regExpMail.test(inMail.value)) {
            red(inMail);
        } else {
            inMail.value = null;
        };
        inText.value = null;
    });

    function red(a) {
        a.className = 'red';
        a.value = 'Ошибочный ввод';
    }

    clearBtn.addEventListener('click', function () {
        const inName = document.querySelector('#name');
        const inPhone = document.querySelector('#phone');
        const inMail = document.querySelector('#mail');
        const inText = document.querySelector('#text');
        inName.className = 'input_text';
        inName.value = null;
        inPhone.className = 'input_text';
        inPhone.value = null;
        inMail.className = 'input_text';
        inMail.value = null;
        inText.className = 'input_area';
        inText.value = null;
    });


    // Создание корзины товаров
    class ElementBasket {
        constructor(id, img_item, img_arr, title, price, amount) {
            this.id = id;
            this.img_item = img_item;
            this.img_arr = img_arr;
            this.title = title;
            this.price = price;
            this.amount = amount;
        }
        render() {
            return `<div id="${this.id}" class="card">
            <img class="img_card" src=${this.img_item} alt="Товар на фотосессии">
                <h4 class="card_head">${ this.title}</h4>
                <p class="text card_text">Цена: ${this.price} рублей</p>
                <p id="${this.id}" class="text card_text">Количество: ${this.amount}</p>
                <button data-id="${this.id}" data-price="${this.price}"
                data-amount="${this.amount}" class="card_link">Удалить</button>
                                    </div>`;
        }
        // Обновление базы данных
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
            // Вывод состава корзины
            btn2.addEventListener('click', function () {
                $("#basket").slideToggle(1500);
                sendRequest('/fetchGoods').then((elements) => {
                    //resolve()
                    let listHtml = '';
                    let amount = 0;
                    let count = 0;
                    elements.forEach(function countBasketPrice(element) {

                        const g = new ElementBasket(element.id, element.img_item, element.img_arr, element.title, element.price, element.amount);
                        if (g.amount > 0) {
                            listHtml += g.render();
                        };
                        amount += element.price * element.amount;
                        count += element.amount;
                        document.querySelector('.block_card').innerHTML = listHtml;
                        if (count > 0) {
                            document.querySelector('.heading').style.display = "block";
                            document.querySelector('.button_b').style.display = "block";

                        };
                        document.querySelector('.contact_text').textContent = count + " товар(ов) на сумму " + amount + " рублей";
                        // Удаление товаров из корзины
                        const addBtns = document.getElementsByClassName("card_link");

                        let count_del = [];
                        let r_del = [];
                        for (let i = 0; i < addBtns.length; i++) {

                            count_del[i] = addBtns[i].dataset.amount;
                            r_del[i] = addBtns[i].dataset.price * addBtns[i].dataset.amount;
                            addBtns[i].addEventListener('click', function () {
                                count_del[i] -= 1;
                                if (count_del[i] === 0) {
                                    const card_d = document.querySelectorAll(".card ");
                                    let card_del = null;
                                    for (let j = 0; j < addBtns.length; j++) {
                                        if (card_d[j].id === addBtns[i].dataset.id) { card_del = card_d[j] };
                                    };
                                    card_del.style.display = "none";
                                    document.querySelector('.heading').style.display = "none";
                                    document.querySelector('.button_b').style.display = "none";
                                };
                                const card_p = document.querySelectorAll(".card_text");
                                console.log(card_p);
                                for (let j = 0; j < 2 * addBtns.length; j++) {
                                    if (card_p[j].id === addBtns[i].dataset.id) { card_p[j].textContent = "Количество: " + count_del[i]; };
                                };

                                r_del[i] -= Number(addBtns[i].dataset.price);
                                g.addBasket(addBtns[i].dataset.id, count_del[i]);

                                let sum = 0;
                                let sum_price = 0;
                                for (let l = 0; l < addBtns.length; l++) {
                                    sum += Number(count_del[l]);
                                    sum_price += r_del[l];
                                }
                                document.querySelector('.contact_text').textContent = "В корзине " + sum + " товар(ов) на сумму " + sum_price + " рублей";
                            });
                        };
                        // Оформление заказа
                        const doc = document.querySelector(".button_b");
                        doc.onclick = function () {
                            document.querySelector('.heading').style.display = "none";
                            document.querySelector('.button_b').style.display = "none";
                            document.querySelector('.block_card').style.display = "none";
                        }

                    });

                }, () => {
                    //reject()
                    document.querySelector('.block_card').innerHTML = `<p class="red">Ошибка загрузки. Сервер временно недоступен.</p>`;
                });
            });

        }

    }
    const l = new Basket();
    l.fetchBasket();

}