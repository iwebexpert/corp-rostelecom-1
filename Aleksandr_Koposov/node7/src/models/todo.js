const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: { type: String,  required: true, },
    desc: { type: String, default: '', required: false, },
    done: { type: Boolean, default: false, required: false, },
    important: { type: Boolean, default: false, required: false, },
    planned: { type: Date, default: null, required: false, },
    created: { type: Date, default: new Date(), required: false, },
    user: {type: Schema.Types.ObjectId, ref: 'Users'},
});

module.exports = mongoose.model('TodoItem', todoSchema, 'todoItem')
