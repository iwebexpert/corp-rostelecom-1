class Item {
    constructor(name, price, calories) {
        this.nameItem = name;
        this.priceItem = price;
        this.caloriesItem = calories;
    }

    get name() {
        return this.nameItem;
    }

    get price() {
        return this.priceItem;
    }

    get calories() {
        return this.caloriesItem;
    }
}


class ItemContents {
    constructor(contents) {
        this.itemContents = contents || [];
    }

    get price() {
        let price = 0;
        for (let i = 0; i < this.itemContents.length; i++)
            price += this.itemContents[i].price;
        return price;
    }

    get calories() {
        let calories = 0;
        for (let i = 0; i < this.itemContents.length; i++)
            calories += this.itemContents[i].calories;
        return calories;
    }
}


class Hamburger {
    constructor(size, stuffing, toppings) {
        this.size = this.hambSize(size);
        this.stuffing = this.hambStuffing(stuffing);
        this.toppings = this.getToppings(toppings || []);
    }

    hambSize(size) {
        switch (size) {
            case "size-min":
                return new Item("маленький", 50, 20);
                break;
            case "size-max":
                return new Item("большой", 100, 40);
                break;
            default:
                return new Item("null", 0, 0);
        }
    }

    hambStuffing(stuffing) {
        switch (stuffing) {
            case "cheese":
                return new Item("сыр", 10, 20);
                break;
            case "salad":
                return new Item("салат", 20, 5);
                break;
            case "potato":
                return new Item("картофель", 15, 10);
                break;
            default:
                return new Item("null", 0, 0);
        }
    }

    hambTopping(topping) {
        switch (topping) {
            case "spice":
                return new Item("приправа", 15, 0);
                break;
            case "mayonnaise":
                return new Item("майонез", 20, 5);
                break;
            default:
                return new Item("null", 0, 0);
        }
    }

    getToppings(toppings) {
        let toppingsItem = [];
        for (let i = 0; i < toppings.length; i++)
            toppingsItem.push(this.hambTopping(toppings[i]));

        return new ItemContents(toppingsItem);
    }

    price() {
        return this.size.price + this.stuffing.price + this.toppings.price;
    }

    calories() {
        return this.size.calories + this.stuffing.calories + this.toppings.calories;
    }
}

