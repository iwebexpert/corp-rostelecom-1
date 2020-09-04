const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const SALT_ROUNDS = 12

const usersSchema = new Schema({
    email: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String, required: true},
})

usersSchema.pre('save',  function(next) {
    if(this.isModified('password')){
        const salt = bcrypt.genSaltSync(SALT_ROUNDS)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

usersSchema.methods.validatePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

module.exports = mongoose.model('Users', usersSchema, 'users')