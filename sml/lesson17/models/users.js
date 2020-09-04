const mongoose = require('mongoose')      // библиотека работа с MongoDB  
const bcrypt = require('bcryptjs')        // библиотека шифрования

const Schema = mongoose.Schema

const SALT_ROUNDS = 12  // количество раундов для генерирования salt

const usersSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true },
})
// срабатывает когда изменяется password значение пароля
// middleware смотрим в документации к мангусту https://mongoosejs.com/docs/middleware.html#pre
// next = это следующий middleWare, указывать надо объязатено иначе не будет дальнейшего движения
usersSchema.pre('save', function (next) {
    // проверка isModified если документ был изменен
    if (this.isModified('password')) {   //Сработает и при создании новой записи
        const salt = bcrypt.genSaltSync(SALT_ROUNDS)   // генерирует соль
        this.password = bcrypt.hashSync(this.password, salt)   // шифруем пароль, к паролю подмешиваем соль для безопасности.
    }
    next()
})
// добавляем метод в модель
// candidatePassword - пароль который придет
// если validatePassword false 
usersSchema.methods.validatePassword = function (candidatePassword) {
    // сравним хэши с текущим паролем введенный
    return bcrypt.compareSync(candidatePassword, this.password)  // кандидат и хэш зашифрованного пароля
}
// и все это экспортируем
// 'Users' - это название модели, она пока не используется но понадобится на следующих занятиях
// нужно для связи с другими моделями как ПР в моделе Messages: user: {type: schema.Types.ObjectId, ref: 'Users'}
// 'users' = это коллекция которая будет внутри базы mongoDB
module.exports = mongoose.model('Users', usersSchema, 'users')