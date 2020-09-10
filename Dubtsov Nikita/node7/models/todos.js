const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { text } = require('express')

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
    createdBy: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
})

module.exports = mongoose.model('Todos', todoSchema, 'todos')