

class Сontent {
    constructor(name, price, calories) {
        this._name = name;
        this._price = price;
        this._calories = calories;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get calories() {
        return this._calories;
    }
}


class Сontents {
    constructor(contents) {
        this._contents = contents || [];
    }

    get name() {
        let name = "";

        if (this._contents && this._contents.length > 0)
            name = this._contents[0].name;

        for (let i = 1; i < this._contents.length; i++)
            name += ", " + this._contents[i].name;

        return (name != "") ? name : "отсутствуют";
    }

    get price() {
        let price = 0;
        for (let i = 0; i < this._contents.length; i++)
            price += this._contents[i].price;
        return price;
    }

    get calories() {
        let calories = 0;
        for (let i = 0; i < this._contents.length; i++)
            calories += this._contents[i].calories;
        return calories;
    }
}

class Hamburger {
    constructor(size, stuffing, toppings) {
        this._size = this._getSize(size);
        this._stuffing = this._getStuffing(stuffing);
        this._toppings = this._getToppings(toppings || []);
    }

    _getSize(size) {
        switch (size) {
            case "small":
                return new Сontent("маленький", 50, 20);
                break;
            case "big":
                return new Сontent("большой", 100, 40);
                break;
            default:
                return new Сontent("null", 0, 0);
        }
    }

    _getStuffing(stuffing) {
        switch (stuffing) {
            case "cheese":
                return new Сontent("сыр", 10, 20);
                break;
            case "salad":
                return new Сontent("салат", 20, 5);
                break;
            case "potato":
                return new Сontent("картофель", 15, 10);
                break;
            default:
                return new Сontent("null", 0, 0);
        }
    }

    _getTopping(topping) {
        switch (topping) {
            case "spice":
                return new Сontent("приправа", 15, 0);
                break;
            case "mayonnaise":
                return new Сontent("майонез", 20, 5);
                break;
            default:
                return new Сontent("null", 0, 0);
        }
    }

    _getToppings(toppings) {
        let _toppings = [];
        for (let i = 0; i < toppings.length; i++)
            _toppings.push(this._getTopping(toppings[i]));

        return new Сontents(_toppings);
    }

    getToppings() {
        // Получить список добавок
        return this._toppings.name;
    }

    getSize() {
        // Узнать размер гамбургера
        return this._size.name;
    }

    getStuffing() {
        // Узнать начинку гамбургера
        return this._stuffing.name;
    }

    calculatePrice() {
        // Узнать цену
        return this._size.price + this._stuffing.price + this._toppings.price;
    }

    calculateCalories() {
        // Узнать калорийность
        return this._size.calories + this._stuffing.calories + this._toppings.calories;
    }
} 