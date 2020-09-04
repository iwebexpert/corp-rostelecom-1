const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');

const Schema = mongoose.Schema

const Users = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

Users.virtual('url')
    .get(function () {
        return `/users/${this._id}`
    })

Users.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName
    })

Users.statics = {
    async checkUser(candidateEmail) {
        return this.findOne({'email': candidateEmail}).exec()
            .then(res => {
                if(res) throw new Error('A user with the same email address already exists')
            })
    },
    async checkUserPassword(candidateEmail, candidatePassword) {
        return this.findOne({'email': candidateEmail}).exec()
            .then(res => {
                if(!res.validatePassword(candidatePassword)){
                    throw new Error('Old password is not correct')
                }
            })
    },
    async checkUserForUpdate(candidateEmail, userId) {
        return this.findOne({'email': candidateEmail}).exec()
            .then(res => {
                if(res) {
                    if(res._id != userId) {
                        throw new Error('A user with the same email address already exists')
                    }
                }

            })
    },
    checkUserAuth(candidateEmail) {
        return this.findOne({'email': candidateEmail}).exec()
            .then(res => {
                if(!res) throw new Error('Invalid email or password')
            })
    }


}

Users.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(12);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next()
})

Users.pre('updateOne', async function (next) {// при смене пароля - кодируем его
    console.log(this.getUpdate())

    if (this._update.password) {
        const salt = bcrypt.genSaltSync(12);
        this._update.password = bcrypt.hashSync(this._update.password, salt);
    }
    next()
})


Users.methods.validatePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}
Users.methods.validatePasswordCheck = function(candidatePassword) {
    if(!bcrypt.compareSync(candidatePassword, this.password)) {
        throw new Error('Invalid email or password')
    }
}



module.exports = mongoose.model('Users', Users, 'Users')