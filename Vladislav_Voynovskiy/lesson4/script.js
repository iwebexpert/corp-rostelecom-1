//Task 1
console.log('Task 1');

const splitNum = {
  units: 0,
  tens: 0,
  hundreds: 0,

  split(num) {

    this.units = 0;
    this.tens = 0;
    this.hundreds = 0;

    if (num < 0 || num > 999) {
      console.log('number is not between 0 and 999');
      return {};
    } else {
      this.units = Math.floor(num % 10);
      this.tens = Math.floor(num / 10 % 10);
      this.hundreds = Math.floor(num / 100 % 10);
      return splitNum;
    }
  }
}

console.log(splitNum.split(0)); //{units: 0, tens: 0, hundreds: 0, split: ƒ}
console.log(splitNum.split(6));  //{units: 6, tens: 0, hundreds: 0, split: ƒ}
console.log(splitNum.split(53)); //{units: 3, tens: 5, hundreds: 0, split: ƒ}
console.log(splitNum.split(135)); //{units: 5, tens: 3, hundreds: 1, split: ƒ}
console.log(splitNum.split(182423)); // error, {}
console.log(splitNum.split(-10)); // error, {}

//Task 2
console.log('Task 2');

class item {
  constructor(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  get cost() {
    return this.price * this.count;
  }
}

class basket {
  constructor(basketItem) {
    this.basketItem = basketItem;
  }

  basketSum() {
    let sum = 0;
    for (let i = 0; i < this.basketItem.length; i++) {
      sum += this.basketItem[i].cost;
    }
    return sum;
  }
}

let items = new basket([
  new item('Item1', 500, 3),
  new item('Item2', 1000, 2),
  new item('Item3', 5000, 1),

]);

console.log(`Basket price: ${items.basketSum()}`);