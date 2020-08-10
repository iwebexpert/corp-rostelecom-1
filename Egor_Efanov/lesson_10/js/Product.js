class Product {
    constructor(name, price = 0, images = []) {
        this.name = name;
        this.price = price;
        this.images = images;
    }

    get Name() {
        return this.name;
    }

    get Price() {
        return this.price;
    }

    get Images() {
        return this.images;
    }

} 