class Products {
    constructor(product, count) {
        this.product = product;
        this.count = count;
    }

    get Name() {
        return this.product.Name;
    }

    get Count() {
        return this.count;
    }

    get Cost() {
        return this.product.Price * this.Count;
    }

    get Images() {
        return this.product.Images;
    }

    add(count) {
        if (this.count + count < 0)
            this.count = 0;
        else
            this.count += count;
    }

    remove(count) {
        add(-1 * count);
    }

} 