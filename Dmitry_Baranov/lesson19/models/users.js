const mongoose = require('./mongodb')
const bcrypt = require('bcryptjs')

const SALT_ROUNDS = 12

//** установка схемы
const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
})

userSchema.pre('save', function (next) {
    if (this.isModified('password')) { //Сработает и при создании новой записи
        const salt = bcrypt.genSaltSync(SALT_ROUNDS)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

userSchema.methods.validatePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

module.exports = mongoose.model('Users', userSchema, 'users')
