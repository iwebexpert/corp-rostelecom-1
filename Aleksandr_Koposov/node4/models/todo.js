const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        default: '',
        required: false,
    },
    done: {
        type: Boolean,
        default: false,
        required: false,
    },
    important: {
        type: Boolean,
        default: false,
        required: false,
    },
    planned: {
        type: Date,
        default: null,
        required: false,
    },
    created: {
        type: Date,
        default: new Date(),
        required: false,
    },
})

module.exports = mongoose.model('Todo', todoSchema, 'todo')
