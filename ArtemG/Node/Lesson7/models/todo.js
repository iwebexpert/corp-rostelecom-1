const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
    user: {type: Schema.Types.ObjectId, ref: 'Users'},
    })

module.exports = mongoose.model('Todo', todoSchema, 'deals')