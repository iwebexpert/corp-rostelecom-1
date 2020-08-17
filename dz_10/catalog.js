class Catalog {

    constructor() {

        this.catalog = [];
        this.loaded = false;

    }

    getCatalog() {
        return fetch('http://localhost:3000/catalog')
            .then(response => response.json())
            .then((items) => {
                this.loaded = true;
                this.catalog = items;
                //console.log(this.catalog);
            });
    }

    localCatalog() {
        return this.catalog;
    }
    showCatalog() {
        if (!this.loaded) {
            return '<div>Товары не найдены</div>';
        }

        return this.catalog.map((item) => new Item(item.id, item.description, item.price, item.img).showItem()).join('');
    }

}

class Item {

    constructor(id, description, price, img) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.img = img;
    }

    // печатаем карточки товара  id|product description|price|img
    showItem() {

        return `
        <div class = "card" data-card = "${this.id}">
            <div>
                <img src="${this.img}" alt="${this.description}" data-modal-open="true"  data-card=""${this.id}" id="modal_img_"${this.id}">
            </div>
            <div id="pr_description_"${this.id}">${this.description}</div>
            <div>Цена:<span id="price_"${this.id}">${this.price}</span></div>
            <div>
                <button data-id="${this.id}" data-price="${this.price}" data-description="${this.description}">добавть в корзину</button>
            </div>
        </div>`;

    }
}
