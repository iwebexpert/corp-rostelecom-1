const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema({
    list: { type: Number, required: false, default: 1 },
    del: { type: String, required: false, default: 0 },
    check: { type: String, required: true, default: 0 },
    todo: { type: String, required: true },
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
})

module.exports = mongoose.model('items', listSchema, 'items')
