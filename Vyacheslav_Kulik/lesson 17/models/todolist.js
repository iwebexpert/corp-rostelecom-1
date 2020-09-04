var mongoose = require('mongoose')
var Schema = mongoose.Schema

const toDoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ToDo', toDoSchema, 'todo')


