class Hamburger {
  constructor(size, topping, spice, ketchup) {
    this.size = size || "";
    this.topping = topping || "";
    this.spice = spice || false;
    this.ketchup = ketchup || false;
    this.finalPrice = 0;
    this.finalCalories = 0;
  }
  getInfo() {
    console.log(myHamb.getStuffing());
    console.log(myHamb.calcPrice());
    console.log(myHamb.calcCalories());
  }
  getSpice() {
    return this.spice ? "да" : "нет";
  }
  getKetchup() {
    return this.ketchup ? "да" : "нет";
  }

  getStuffing() {
    return `Размер - ${this.size}, добавка - ${
      this.topping
    }, специи - ${this.getSpice()}, кетчуп - ${this.getKetchup()}.`;
  } // Узнать начинку гамбургера
  calcPrice() {
    switch (this.size) {
      case "большой":
        this.finalPrice += 100;
        break;
      case "маленький":
        this.finalPrice += 50;
        break;
      default:
        alert("Непонятный размер какой-то. Попробуйте еще раз.");
        return;
    }

    this.finalPrice += this.spice == true ? 15 : 0;
    this.finalPrice += this.ketchup == true ? 20 : 0;

    switch (this.topping) {
      case "сыр":
        this.finalPrice += 10;
        break;
      case "салат":
        this.finalPrice += 20;
        break;
      case "картофель":
        this.finalPrice += 15;
        break;
      default:
        alert("Непонятная добавка какая-то. Попробуйте еще раз.");
        return;
    }

    return `Цена за такой гамбургер составит - ${this.finalPrice} условных единиц.`;
  } // Узнать цену
  calcCalories() {
    switch (this.size) {
      case "большой":
        this.finalCalories += 40;
        break;
      case "маленький":
        this.finalCalories += 20;
        break;
    }

    this.finalCalories += this.spice == true ? 0 : 0;
    this.finalCalories += this.ketchup == true ? 5 : 0;

    switch (this.topping) {
      case "сыр":
        this.finalCalories += 20;
        break;
      case "салат":
        this.finalCalories += 5;
        break;
      case "картофель":
        this.finalCalories += 10;
        break;
      default:
        return;
    }

    return `В таком гамбургере будет ${this.finalCalories} калорий.`;
  }
}

const size = prompt(
  "Какой гамбургер - большой или маленький? (Выбери что-то одно)",
  "большой"
);
const topping = prompt("сыр, салат или картофель? (Выбери что-то одно)", "сыр");
const spice = confirm("Добавить приправу?");
const ketchup = confirm("Добавить кетчуп?");

const myHamb = new Hamburger(size, topping, spice, ketchup);
myHamb.getInfo();
