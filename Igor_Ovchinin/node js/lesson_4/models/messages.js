const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messagesSchema = new Schema({
    chat: { type: Number, required: false, default: 1 },
    author: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
})

module.exports = mongoose.model('Messages', messagesSchema, 'chats')
