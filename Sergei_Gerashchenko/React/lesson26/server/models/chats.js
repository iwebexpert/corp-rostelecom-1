const mongoose = require('mongoose')

const Schema = mongoose.Schema


const chatsSchema = new Schema({
    name: {type: String, required: true},
    messages: [{type : Schema.Types.ObjectId, ref : "messages"}]
})


module.exports = mongoose.model('Chats', chatsSchema, 'chats')