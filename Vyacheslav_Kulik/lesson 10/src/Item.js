class Item {
    constructor(type, price, currency, photo = []) {
        this.type = type;
        this.price = price;
        this.currency = currency;
        this.photo = photo;
    }
    show() {
        return this.type + '\t' + this.price + '\t' + this.currency;
    }
}