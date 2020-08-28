const minimist = require('minimist')
const request = require('request')

const argv = minimist(process.argv.slice(2))

function getFileInfo(file){
    console.log(`Владелец файла: ${file.owner.login}`)
    console.log(`Тип файла: ${file.owner.type}`)
    console.log(`Время создания: ${file.created}`)
    console.log(`Ссылка для скачивания: ${file.file}`)
}

request('https://cloud-api.yandex.net/v1/disk/public/resources?public_key=' + argv.path, (err, res, body) => {
    
    if(!err && res.statusCode ==200) {
        let fileinfo = JSON.parse(body)
        getFileInfo(fileinfo)
    }

    if(err || res.statusCode != 200){
        console.log(err)
    }
})

