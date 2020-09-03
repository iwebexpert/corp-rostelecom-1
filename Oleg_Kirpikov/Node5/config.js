const mongoose = require('mongoose')
const connectDb = function (username = 'root', password = '1234', port = 27017, server = 'localhost', db = 'todolist') {
    mongoose.connect(`mongodb://${username}:${password}@${server}:${port}/${db}?authSource=admin&w=1`, { useNewUrlParser: true, useUnifiedTopology: true })
    return mongoose.connection
}

module.exports.connectDb = connectDb