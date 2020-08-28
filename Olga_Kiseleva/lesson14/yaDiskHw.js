// https://cloud-api.yandex.net/v1/disk/public/resources?public_key=https://yadi.sk/d/Sbjmcqfgl4wZZQ
//node yaDiskHw.js --file https://yadi.sk/d/Sbjmcqfgl4wZZQ
const request = require('request')
const minimist = require('minimist')
const chalk = require('chalk')

const argv = minimist(process.argv.slice(2))
let source = "https://cloud-api.yandex.net/v1/disk/public/resources?public_key=" + argv.file
request(source, (err, response, body) => {
    if (!err && response.statusCode === 200) {
        let data = JSON.parse(body)
        console.log(chalk.bgBlueBright('Имя файла: '), data.name)
        console.log(chalk.bgBlueBright('Полный путь для скачивания: '), data.file)
        console.log(chalk.bgBlueBright('ID автора: '), data.owner.uid)
    }
})
