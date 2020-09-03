const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    // title: {type: String, required: true},
    text: {type: String, required: true},
    isDone: {type: Boolean, required:false, default: false},
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
})

module.exports = mongoose.model('Todo', todoSchema, 'todo')
