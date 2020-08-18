// Создать с помощью Node.js API консольную программу,
// которая будет выводить что-либо в консоль разными цветами.

const color = require('./_colors') // Модуль покраски текста

console.log('Ошибка:', color.err(new Error('Request error')))
console.log('Предупреждение:', color.warn('Warning: missing params'))
console.log('Информация:', color.info('Info: v2.1.2'))
console.log('Успешное действие:', color.ok('Successful'))
console.log('Лог:', color.log(JSON.stringify({ name: 'Ann', age: 29 })))
console.log('Случайный цвет букв:', color.rand('Не все консоли поддерживают все доступные цвета'))
