var mongoose = require('mongoose')
var Schema = mongoose.Schema

const toDoSchema = new Schema({
    text: [],
    user: {
        type: Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ToDo', toDoSchema, 'todo')


