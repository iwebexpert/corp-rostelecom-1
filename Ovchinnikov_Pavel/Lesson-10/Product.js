// Класс содержит описание товара

class Product {
    constructor(name, price = 0, images = []) {
        this._name = name;
        this._price = price;
        this._images = images;
    }

    get Name() {
        return this._name;
    }

    get Price() {
        return this._price;
    }

    get Images() {
        return this._images;
    }

}