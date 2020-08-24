const nodemailer = require('nodemailer')

const  smtpTransport = nodemailer.createTransport({
    host: 'localhost',
    port: 32800,
    secure: false,
    auth: {
        user: 'username@mail.localdomain',
        pass: '1234',
    },
})

smtpTransport.sendMail({
    from: 'User <username@mail.localdomain>',
    to: 'anna-ivanova@mail.localdomain',
    subject: 'Тестовое письмо, отправленное с помощью Node.js',
    text: 'Текст письма. Проверка',
    html: '<h1>Текст письма. Проверка</h1>',
}, (err, info) => {
    if(err){
        throw  err;
    }

    console.log('Письмо успешно отправлено', info)
    smtpTransport.close()
})