const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const messagesSchema = new Schema({
    text : {type : String, required: true},
    author: {type: String, required: false},
    chat : {type : Schema.Types.ObjectId, ref : "Chats"}
})

module.exports = mongoose.model('messages', messagesSchema, 'messages')
