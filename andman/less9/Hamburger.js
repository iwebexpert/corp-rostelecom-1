class Hamburger {

    constructor(size, stuffing) {
        if (size !== 'large' && size !== 'small')
            return;
        this.size = size;
        if (stuffing !== 'salat' && stuffing !== 'chiss' & stuffing !== 'potatos')
            return;
        this.stuffing = stuffing;
        this.arrayTopping = []; //массив добавок 
        this.fullCost = 0;
        this.fullKkal = 0;
    }
    addTopping(topping) {    // Добавить добавку 
        this.arrayTopping.push(topping);
    }

    getToppings(topping) {   // Получить список добавок 
        return this.arrayTopping;
    }

    getSize() {              // Узнать размер гамбургера 
        return this.size;
    }

    getStuffing() {          // Узнать начинку гамбургера 
        return this.stuffing;
    }
    calculate() {
        this.fullCost += (this.size == 'small') ? 50 : 100;
        this.fullKkal += (this.size == 'small') ? 20 : 40;
        switch (this.stuffing) {
            case 'salat':
                this.fullCost += 20;
                this.fullKkal += 5;
                break;
            case 'chiss':
                this.fullCost += 10;
                this.fullKkal += 20;
                break;
            case 'potatos':
                this.fullCost += 15;
                this.fullKkal += 10;
                break;
        }
        for (let i = 0; i < this.arrayTopping.length; i++) {
            this.fullCost += this.arrayTopping[i].cost;
            this.fullKkal += this.arrayTopping[i].kkal;
        }
        return { "price": this.fullCost, "kkal": this.fullKkal };
    }

}