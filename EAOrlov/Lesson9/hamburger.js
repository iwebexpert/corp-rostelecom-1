class Hamburger {
    constructor() {
        this.size = null;
        this.type = null;
        this.topping = [];
        this.pricelist = [{ item: 'small', price: 50 }, { item: 'big', price: 100 }, { item: 'cheese', price: 10 }, { item: 'salat', price: 20 }, { item: 'potato', price: 15 }, { item: 'spice', price: 15 }, { item: 'mayo', price: 20 }]
        this.calorylist = [{ item: 'small', calory: 20 }, { item: 'big', calory: 40 }, { item: 'cheese', calory: 20 }, { item: 'salat', calory: 5 }, { item: 'potato', calory: 10 }, { item: 'spice', calory: 0 }, { item: 'mayo', calory: 5 }]
    }
    addTopping(topping) {    // Добавить добавку 
        let _ham = this;
        if (_ham.topping.indexOf(topping) === -1) {
            _ham.topping.push(topping);
        };
        console.log(_ham.topping);
    }
    removeTopping(topping) { // Убрать добавку 
        let _ham = this;
        let index = _ham.topping.indexOf(topping);
        console.log(index);
        if (index != -1) {
            _ham.topping.splice(index, 1);
        };
        console.log(_ham.topping);
    }
    getToppings() {   // Получить список добавок 
        return this.topping.length;
    }
    getSize(size) {              // Узнать размер гамбургера 
        this.size = size;
        console.log(this.size);
    }
    getType(type) {          // Узнать начинку гамбургера 
        this.type = type;
        console.log(this.type);
    }
    calculatePrice() {       // Узнать цену 
        let _ham = this;
        let sum = 0;
        this.pricelist.forEach(element => {
            if (element.item == _ham.size) {
                sum += element.price;
            };
            if (element.item == _ham.type) {
                sum += element.price;
            };
            let len = _ham.getToppings();
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    if (element.item == _ham.topping[i]) {
                        sum += element.price;
                    };

                }
            }
        });
        return sum;
    }
    calculateCalories() {    // Узнать калорийность 
        let _ham = this;
        let sum = 0;
        this.calorylist.forEach(element => {
            if (element.item == _ham.size) {
                sum += element.calory;
            }
            if (element.item == _ham.type) {
                sum += element.calory;
            }
            let len = _ham.getToppings();
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    if (element.item == _ham.topping[i]) {
                        sum += element.calory;
                    };

                }
            }
        });
        return sum;
    }
    newChoice() {
        this.size = null;
        this.type = null;
        this.topping = [];
    }
    render() {               // создаем html
        let listHtml = '<div class="level level1 active"><h3 class="heading">Выбери свой гамбургер!</h3><div class="item"><div class="block smallham"><p>Маленький</p><p>Гамбургер</p><br><p>Цена: 50</p></div><div class="block bigham"><p>Большой</p><p>Гамбургер</p><br><p>Цена: 100</p></div></div><div class="nav"><a href="#" class="l1f">Далее</a></div></div><div class="level level2 right"><h3 class="heading">Выбери начинку!</h3><div class="item"><div class="block cheese"><p>Сыр</p><br><p>Цена: 10</p></div><div class="block salat"><p>Салат</p><br><p>Цена: 20</p></div><div class="block potato"><p>Картофель</p><br><p>Цена: 15</p></div></div><div class="nav"><a href="#" class="l2b">Назад</a><a href="#" class="l2f">Далее</a></div></div><div class="level level3 right"><h3 class="heading">Выбери топпинги!</h3><div class="item"><div class="block spice"><p>Приправа</p><br><p>Цена: 15</p></div><div class="block mayo"><p>Майонез</p><br><p>Цена: 20</p></div></div><div class="nav"><a href="#" class="l3b">Назад</a><a href="#" class="l3f">Оформить</a></div></div>';
        let cont = document.querySelector('.container');
        cont.innerHTML = listHtml;
    }
    handler() {              // вешаем обработчики
        let _ham = this;
        let l1f = document.querySelector('.l1f');
        let l2f = document.querySelector('.l2f');
        let l3f = document.querySelector('.l3f');
        let l2b = document.querySelector('.l2b');
        let l3b = document.querySelector('.l3b');
        let smallham = document.querySelector('.smallham');
        let bigham = document.querySelector('.bigham');
        let cheese = document.querySelector('.cheese');
        let salat = document.querySelector('.salat');
        let potato = document.querySelector('.potato');
        let spice = document.querySelector('.spice');
        let mayo = document.querySelector('.mayo');
        let level1 = document.querySelector('.level1');
        let level2 = document.querySelector('.level2');
        let level3 = document.querySelector('.level3');
        smallham.addEventListener('click', function () {
            let choice = document.querySelector('.level1 .choice');
            if (choice) {
                choice.classList.toggle('choice');
            }
            smallham.classList.toggle('choice');
            _ham.getSize('small');

        });
        bigham.addEventListener('click', function () {
            let choice = document.querySelector('.choice');
            if (choice) {
                choice.classList.toggle('choice');
            }
            bigham.classList.toggle('choice');
            _ham.getSize('big');
        });
        cheese.addEventListener('click', function () {
            let choice = document.querySelector('.level2 .choice');
            if (choice) {
                choice.classList.toggle('choice');
            }
            cheese.classList.toggle('choice');
            _ham.getType('cheese');
        });
        salat.addEventListener('click', function () {
            let choice = document.querySelector('.level2 .choice');
            if (choice) {
                choice.classList.toggle('choice');
            }
            salat.classList.toggle('choice');
            _ham.getType('salat');
        });
        potato.addEventListener('click', function () {
            let choice = document.querySelector('.level2 .choice');
            if (choice) {
                choice.classList.toggle('choice');
            }
            potato.classList.toggle('choice');
            _ham.getType('potato');
        });
        spice.addEventListener('click', function () {
            let choice = document.querySelector('.spice');
            if (choice.classList.contains('choice')) {
                _ham.removeTopping('spice');
            } else {
                _ham.addTopping('spice');
            }
            choice.classList.toggle('choice');
        });
        mayo.addEventListener('click', function () {
            let choice = document.querySelector('.mayo');
            if (choice.classList.contains('choice')) {
                _ham.removeTopping('mayo');
            } else {
                _ham.addTopping('mayo');
            }
            choice.classList.toggle('choice');
        });
        l1f.addEventListener('click', function () {
            if (_ham.size) {
                level1.classList.remove('active');
                level1.classList.add('left');
                level2.classList.add('active');
                level2.classList.remove('right');
            } else {
                alert('Вы не выбрали гамбургер!');
            }

        });
        l2f.addEventListener('click', function () {
            if (_ham.type) {
                level2.classList.remove('active');
                level2.classList.add('left');
                level3.classList.add('active');
                level3.classList.remove('right');
            } else {
                alert('Вы не выбрали начинку для гамбургера!');
            }
        });
        l3b.addEventListener('click', function () {
            level3.classList.remove('active');
            level3.classList.add('right');
            level2.classList.add('active');
            level2.classList.remove('left');
        });
        l3f.addEventListener('click', function () {
            alert('Цена гамбургера: ' + _ham.calculatePrice() + ' Кол-во калорий: ' + _ham.calculateCalories());
            _ham.newChoice();
            level3.classList.remove('active');
            level3.classList.add('right');
            level1.classList.add('active');
            level1.classList.remove('left');
            level2.classList.add('right');
            level2.classList.remove('left');
            let choice = document.querySelectorAll('.choice');
            for (let item of choice) {
                item.classList.remove('choice');
            }
        });
        l2b.addEventListener('click', function () {
            level2.classList.remove('active');
            level2.classList.add('right');
            level1.classList.add('active');
            level1.classList.remove('left');
        });
    }
}


const ham = new Hamburger();
ham.render();
ham.handler();
