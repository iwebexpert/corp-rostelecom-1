// https://cloud-api.yandex.net/v1/disk/public/resources?public_key=https://yadi.sk/d/Sbjmcqfgl4wZZQ
const minimist = require('minimist')
const request = require('request')
const chalk = require('chalk')

const log = (paramName, paramData) => console.log(`${chalk.yellow.bold(paramName)}:${chalk.green(paramData)}`)

const apiUrl = 'https://cloud-api.yandex.net/v1/disk/public/resources?public_key='

const argv = minimist(process.argv.slice(2))

if (!argv.file) {
    console.log(chalk.red.bgWhite('Передайте путь к файлу на YandexDisk через параметр --file URL'))
}
else {
    //console.log(argv.file)
    const request = require('request')
    request(apiUrl + argv.file,
        (err, res, body) => {
            if (!err && res.statusCode === 200) {
                const fileInfo = JSON.parse(body)
                //console.log(fileInfo)
                log('Публичная ссылка на файл', fileInfo.public_url)
                log('Автор', fileInfo.owner.display_name)
                log('Название файла', fileInfo.name)
                log('Тип файла', fileInfo.media_type)
                log('Дата изменения', fileInfo.modified)
                log('Ссылка для скачивания', fileInfo.file)
            }
            else {
                console.log(chalk.red.bgWhite('Данные не найдены. Проверьте передаваемую ссылку'))
            }

        })
}