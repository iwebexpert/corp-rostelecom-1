
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p><button class="addBtn">BUY</button></div>`;
    }
}


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
    })
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods(cb) {
        sendRequest('http://localhost:3000/goods').then((goods) => {
            this.goods = goods;
            console.log(this.goods);
            cb();
        })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
})

