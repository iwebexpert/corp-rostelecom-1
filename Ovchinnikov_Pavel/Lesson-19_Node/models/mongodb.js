const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

//** подключение к БД mongodb
function connectDB() {
    if (Mongoose.connection.readyState != 1)
        Mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
}

module.exports = {
    Mongoose,
    Schema: Schema,
    model: Mongoose.model,
    connection: Mongoose.connection,
    connectDB: function () { connectDB() }
}
