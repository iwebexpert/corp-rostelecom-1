
class Basket {
    constructor(listProducts) {
        this.listProducts = listProducts || [];
    }

    get ListProducts() {
        return this.listProducts;
    }

    get Count() {
        let count = 0;
        for (let i = 0; i < this.listProducts.length; i++)
            count += this.listProducts[i].Count;
        return count;
    }

    get Cost() {
        let сost = 0;
        for (let i = 0; i < this.listProducts.length; i++)
            сost += this.listProducts[i].Cost;
        return сost;
    }

    clearAll() {
        this.listProducts = [];
    }

    add(products) {
        for (let i = 0; i < this.listProducts.length; i++) {
            if (this.listProducts[i].Name == products.Name) {
                this.listProducts[i].add(products.Count);
                return;
            }
        }

        this.listProducts.push(products);
    }

    add2(productName, count) {
        this.add(new Products(new Product(productName, 10, []), count));
    }

    remove(productName, count) {
        this.add2(productName, -1 * count);
    }

    clearProduct(productName) {
        for (let i = 0; i < this.listProducts.length; i++) {
            if (this.listProducts[i].Name == productName) {
                this.listProducts.splice(i, 1);
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
            for (let i = 0; i < this.listProducts.length; i++) {
                str += this.listProducts[i].Name + "   - " + this.listProducts[i].Count + " шт. на сумму " + this.listProducts[i].Cost + " руб." + '\n';
            }
            return str;
        }
    }


}