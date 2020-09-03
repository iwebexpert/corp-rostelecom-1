const mongoose = require('mongoose')

const Schema = mongoose.Schema



const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        default: "обычное задание",
    },
    isDone: {
        type: Boolean,
        required: false,
        default: false,
    },

})

module.exports = mongoose.model('todoApp', todoSchema, 'tasks')