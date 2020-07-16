//Task 1
console.log('Task 1');

const isPrime = (num) => {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= num / 2; i += 1) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const primeNumbersTo100 = () => {
  let min = 2;
  let max = 100;
  let i = min;
  const primeNumbers = [];
  while (i <= max) {
    if (isPrime(i)) {
      primeNumbers.push(i);
    }
    i += 1;
  }
  return primeNumbers;
};

console.log(primeNumbersTo100());

//Task 3
console.log('Task 3');

//["Товар", цена, количество]
const basket = [
  ['Item1', 500, 3],
  ['Item2', 1000, 2],
  ['Item3', 5000, 1]
]

const basketPrice = (basket) => {
  let price = 0;
  for (let i = 0; i < basket.length; i++) {
    price += basket[i][1] * basket[i][2];
  }
  return price;
}

console.log(basketPrice(basket));

//Task 4
console.log('Task 4');

const numbersBodyless = () => {
  for (let i = 0; i <= 9; console.log(i++));
};

console.log(numbersBodyless());

//Task 5
console.log('Task 5');

const printPyramid = (num) => {
  for (let i = 'x'; i.length <= num; i += 'x') {
    console.log(i);
  }
}

console.log(printPyramid(20));