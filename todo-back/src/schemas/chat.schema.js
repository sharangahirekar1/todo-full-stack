const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    chats: {type: [Object]}
},{timestamps: true})

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat