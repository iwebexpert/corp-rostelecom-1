const { Schema, model } = require('mongoose')

const schema = new Schema({
    todo: { type: String, required: true },
    checked: { type: Boolean, required: true },
    create_date: {
        type: Date,
        required: false,
        default: new Date()
    }
})

module.exports = model('Todos', schema)