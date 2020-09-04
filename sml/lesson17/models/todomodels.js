const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    task: { type: String, required: true },
    isOK: { type: Boolean, required: false, default: false },
})

module.exports = mongoose.model('TodoList', todoSchema, 'todo')
