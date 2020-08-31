const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dateFormatter = require('../public/js/dateHandler')

const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
})

module.exports = mongoose.model('todos_base', todoSchema, 'todos')