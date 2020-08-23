// https://cloud-api.yandex.net/v1/disk/public/resources?public_key=https://yadi.sk/d/Sbjmcqfgl4wZZQ

const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))

console.log(process.argv)
console.log(process.argv[3])

console.log(argv)

console.log(argv.file) //node yaDisk.js --file http://file.test

// JSON.parse()