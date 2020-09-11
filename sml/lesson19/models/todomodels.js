const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const todoSchema = new Schema({
//     task: { type: String, required: true },
//     isOK: { type: Boolean, required: false, default: false },
// })

const todoSchemaRest = new Schema({
    task: { type: String, required: true },
    isOK: { type: Boolean, required: false, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
})

module.exports = mongoose.model('TodoList', todoSchemaRest, 'todoRest')
