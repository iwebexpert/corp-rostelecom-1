// Класс содержит описание корзины

class Basket {
    constructor(listProducts) {
        this._listProducts = listProducts != null ? listProducts : [];
    }

    get ListProducts() {
        return this._listProducts;
    }

    get Count() {
        let count = 0;
        for (let i = 0; i < this._listProducts.length; i++)
            count += this._listProducts[i].Count;
        return count;
    }

    get Cost() {
        let сost = 0;
        for (let i = 0; i < this._listProducts.length; i++)
            сost += this._listProducts[i].Cost;
        return сost;
    }

    clearAll() {
        this._listProducts = [];
    }

    add(products) {
        for (let i = 0; i < this._listProducts.length; i++) {
            if (this._listProducts[i].Name == products.Name) {
                this._listProducts[i].add(products.Count);
                return;
            }
        }

        this._listProducts.push(products);
    }

    add2(productName, count) {
        this.add(new Products(new Product(productName, 10, []), count));
    }

    remove(productName, count) {
        this.add2(productName, -1 * count);
    }

    clearProduct(productName) {
        for (let i = 0; i < this._listProducts.length; i++) {
            if (this._listProducts[i].Name == productName) {
                this._listProducts.splice(i, 1);
                return;
            }
        }
    }

    getText() {
        if (this.Count == 0)
            return "Корзина пуста";
        else
            return "Товаров в корзине " + this.Count + " шт." + " на общую сумму " + this.Cost + " руб.";
    }


    getListText() {
        if (this.Count == 0)
            return "Корзина пуста";
        else {
            let str = "";
            for (let i = 0; i < this._listProducts.length; i++) {
                str += this._listProducts[i].Name + "   - " + this._listProducts[i].Count + " шт. на сумму " + this._listProducts[i].Cost + " руб." + '\n';
            }
            return str;
        }
    }


}
