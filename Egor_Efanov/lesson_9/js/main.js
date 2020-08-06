class Сontent {
    constructor(name, price, calories) {
        this.nameIn = name;
        this.priceIn = price;
        this.caloriesIn = calories;
    }

    get name() {
        return this.nameIn;
    }

    get price() {
        return this.priceIn;
    }

    get calories() {
        return this.caloriesIn;
    }
}


class Сontents {
    constructor(contents) {
        this.contentsIn = contents || [];
    }


    get price() {
        let price = 0;
        for (let i = 0; i < this.contentsIn.length; i++) {
            price += this.contentsIn[i].price;
        }

        return price;
    }

    get calories() {
        let calories = 0;
        for (let i = 0; i < this.contentsIn.length; i++) {
            calories += this.contentsIn[i].calories;
        }

        return calories;
    }
}

class Hamburger {
    constructor(size, stuffing, toppings) {
        this.sizeIn = this.addSize(size);
        this.stuffingIn = this.addStuffing(stuffing);
        this.toppingsIn = this.getToppings(toppings || []);
    }

    addSize(size) {
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

    addStuffing(stuffing) {
        switch (stuffing) {
            case "cheese":
                return new Сontent("сыр", 10, 20);
                break;
            case "salat":
                return new Сontent("салат", 20, 5);
                break;
            case "potato":
                return new Сontent("картофель", 15, 10);
                break;
            default:
                return new Сontent("null", 0, 0);
        }
    }

    addTopping(topping) {
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

    getToppings(toppings) {
        let toppingsIn = [];
        for (let i = 0; i < toppings.length; i++) {
            toppingsIn.push(this.addTopping(toppings[i]));
        }


        return new Сontents(toppingsIn);
    }


    calculatePrice() {
        return this.sizeIn.price + this.stuffingIn.price + this.toppingsIn.price;
    }

    calculateCalories() {
        return this.sizeIn.calories + this.stuffingIn.calories + this.toppingsIn.calories;
    }
}





function getCheck(name) {
    return document.querySelectorAll('input[name="' + name + '"]:checked');
}

function getCheckValue(name) {
    return getCheck(name)[0] ? getCheck(name)[0].value : null;
}

function getCheckValues(name) {
    let el = getCheck(name);
    let values = [];
    for (let i = 0; i < el.length; i++)
        values.push(el[i].value);
    return values;

}

function calculate() {
    let hamburger = new Hamburger(getCheckValue("size"), getCheckValue("stuffing"), getCheckValues("toppings"));
    console.log(hamburger);
    console.log(`price: ${hamburger.calculatePrice()} calories: ${hamburger.calculateCalories()}`);

    document.getElementById("total").textContent = `price: ${hamburger.calculatePrice()} calories: ${hamburger.calculateCalories()}`;

}
