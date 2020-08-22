const argv = require('minimist')(process.argv.slice(2));
const request = require('request')


function getFileInfo() {

    return new Promise((resolve,  reject) => {

        if (!argv.file) {
            console.log('Run with key --file="href"\nFor example: node getFileInfoYaDisk.js --file=https://yadi.sk/d/Sbjmcqfgl4wZZQ')
            return
        }

        const apiYandexForFileInfo = 'https://cloud-api.yandex.net/v1/disk/public/resources?public_key='

        request(apiYandexForFileInfo + argv.file, (error, result, body) => {
            if (!error && result.statusCode === 200) {
                resolve(JSON.parse(body))
            }
            if (!error && result.statusCode === 404) {
                reject(JSON.parse(body))
            }
            reject(error)
        })
    })

}


getFileInfo()
    .then(resolve => {
        console.log('Name:', resolve.name)
        console.log('Download: "', resolve.file, '"')
    },
        reject => {
            console.log('Error: ',reject.message)
        })
