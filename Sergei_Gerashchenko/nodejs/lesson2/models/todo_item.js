const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoitemSchema = new Schema({
    author: {type: String, required: true},
    title : {type : String, required: true},
    text: {type: String, required: false},
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
    doneAt: {type: Date, required : false},
})

module.exports = mongoose.model('todo_items', todoitemSchema, 'todo_items')
