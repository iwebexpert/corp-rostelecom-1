class BurgerTopping {
    constructor(price, calories) {
        this._price = price;
        this._calories = calories;
        this._src = '';
        this._title = '';
    }
    get price() { return this._price; }
    get calories() { return this._calories; }
    get src() { return this._src; }
    get title() { return this._title; }
}

class MeetTopping extends BurgerTopping {
    constructor() {
        super(0, 0);
        this._title = 'Котлета';
        this._src = 'https://krolikbro.ru/source/catalogUnit/miniatures/coutlet-gov.png';
    }
}
class CheeseTopping extends BurgerTopping {
    constructor() {
        super(10, 20);
        this._title = 'Сыр';
        this._src = 'https://krolikbro.ru/source/catalogUnit/miniatures/cheese-ched.png';
    }
}
class SaladTopping extends BurgerTopping {
    constructor() {
        super(20, 5);
        this._title = 'Салат';
        this._src = 'https://krolikbro.ru/source/catalogUnit/miniatures/ing-lolo.png';
    }
}
class PotatoTopping extends BurgerTopping {
    constructor() {
        super(15, 10);
        this._title = 'Картофель';
        this._src = 'https://krolikbro.ru/source/catalogUnit/miniatures/ing-pay.png';
    }
}
class OnionTopping extends BurgerTopping {
    constructor() {
        super(15, 0);
        this._title = 'Лук';
        this._src = 'https://krolikbro.ru/source/catalogUnit/miniatures/ing-luk.png';
    }
}
class MayonnaiseTopping extends BurgerTopping {
    constructor() {
        super(20, 5);
        this._title = 'Майонез';
        this._src = './img/souse.png';
    }
}
