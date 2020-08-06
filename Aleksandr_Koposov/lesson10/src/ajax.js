/*
https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
    /catalogData.json – получить список товаров;
    /getBasket.json – получить содержимое корзины;
    /addToBasket.json – добавить товар в корзину;
    /deleteFromBasket.json – удалить товар из корзины.
*/

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const query = (method, url, data = null) => {
    return new Promise((resolve, reject) => {
        const loader = document.getElementById('loader');
        const setLoaderVisible = (show) => {
            if (loader) {
                loader.classList[show ? 'add' : 'remove']('visible');
            }
        }
        setLoaderVisible(true);
        const m = (method || 'get').toUpperCase();
        let xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            throw new Error('Ваш браузер не поддерживает AJAX');
        }
        xhr.open(m, `${API_URL}/${url}`);
        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.error(xhr.responseText);
                setLoaderVisible(false);
                return resolve([]);
            }
            resolve(JSON.parse(xhr.responseText || ''));
            setLoaderVisible(false);
        }
        xhr.onerror = () => {
            console.error(xhr.statusText);
            resolve([]);
            setLoaderVisible(false);
        }
        xhr.send(m === 'POST' ? JSON.stringify(data || '') : '');
    });
}

const ajax = {
    GET: url => query('GET', url),
    POST: (url, data) => query('GET', url, data) // тут надо бы POST, но API так не умеет
};
