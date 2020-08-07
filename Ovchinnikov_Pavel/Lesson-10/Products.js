// Класс содержит описание товара

class Products {
    constructor(product, count) {
        this._product = product;
        this._count = count;
    }

    get Name() {
        return this._product.Name;
    }

    get Count() {
        return this._count;
    }

    get Cost() {
        return this._product.Price * this.Count;
    }

    get Images() {
        return this._product.Images;
    }

    add(count) {
        if (this._count + count < 0)
            this._count = 0;
        else
            this._count += count;
    }

    remove(count) {
        add(-1 * count);
    }

}