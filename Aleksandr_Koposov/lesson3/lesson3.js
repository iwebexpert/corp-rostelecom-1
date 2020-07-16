/**
 * ДЗ №3:
 */

const isPrime = (num = 0) => {
    if (num < 2) {
        return false
    }
    let i = 2
    const limit = Math.sqrt(num)
    while (i <= limit) {
        if (num % i === 0) {
            return false
        }
        i++
    }
    return true
}

const primeNumbers = (from = 0, to = 100) => {
    let num = from || 0
    const numbers = []
    while (num <= to) {
        if (isPrime(num)) {
            numbers.push(num)
        }
        num++
    }
    return numbers
}

const numbersWithoutForBody = (from = 0, to = 9) => {
    const numbers = []
    for (let i = from; i <= to; numbers.push(i), i++) { }
    return numbers
}

const countBasketPrice = (products = []) => {
    return (products || [])
        .reduce((sum, item) => sum += item.price || 0, 0)
}

const http = require('https')
const httpRequest = (url = '') => {
    return new Promise((resolve, reject) => {
        const req = http.request(url, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            let data = ''
            res.on('data', (chunk) => {
                data += chunk
            });
            res.on('end', () => {
                try {
                    data = JSON.parse(data)
                } catch (e) {
                    reject(e)
                }
                resolve(data)
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        req.end();
    });
}

const advancedCartCost = async (products = [], toCurrency = 'RUB', consoleGroupName = '') => {
    if (!products || !products.length) {
        return 0
    }
    await httpRequest(
        `https://api.exchangeratesapi.io/latest?base=${toCurrency}`
    ).then((data) => {
        console.group(consoleGroupName)
    
        const cost = products.reduce((sum, item) => {
            const currencyRate = (data.rates || {})[item.cur] || 0
            if (!currencyRate) {
                return sum
            }
            return sum + (item.price / currencyRate)
        }, 0)
        console.log(`${(cost).toFixed(2)} ${toCurrency}`)
    
        console.groupEnd()
    })
}

const printPyramid = (rows = 20) => {
    for (let i = 1; i <= rows; i++) {
        console.log([...Array(i)].map(i => 'x').join(''))
    }
}

/* Вывод результатов в консоль */
console.group('1. Простые числа через while:');
console.log('2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97', ' <= Должно быть');
console.log(primeNumbers(0, 100).join(', '));
console.groupEnd();


console.group('4. Вывод чисел без тела for:');
console.log(numbersWithoutForBody(0, 9).join(', '));
console.groupEnd();


console.group('5. Вывод пирамиды:');
printPyramid(20);
console.groupEnd();


console.group('3.1. Простая стоимость корзины:');
console.log(countBasketPrice([
    { name: 'Product 1', price: 10},
    { name: 'Product 1', price: 10},
    { name: 'Product 2', price: 20},
    { name: 'Product 3', price: 300},
    { name: 'Product 3', price: 300}
]));
console.groupEnd();

const products = [
    { name: 'Product 1', price: 10, cur: 'USD' },
    { name: 'Product 2', price: 10, cur: 'EUR' },
    { name: 'Product 4', price: 10, cur: 'RUB' }
];
advancedCartCost(products, 'RUB', '3.2. Стоимость корзины в RUB:')
advancedCartCost(products, 'USD', '3.3. Стоимость корзины в USD:')
