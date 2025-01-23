const express = require("express");
const { ChatMistralAI } = require("@langchain/mistralai");
const Chat = require("../schemas/chat.schema");

const chatRoute = express.Router();

const llm = new ChatMistralAI({
    model: "mistral-large-latest",
    temperature: 0
  });

chatRoute.use(express.json());

chatRoute.post("/chat", async (req,res)=>{
    try {
        const userId = req.user.id;
        const userChat = await Chat.findOne({userId});
        let chatHistory = [];
        let chat;
        if(userChat) {
            chatHistory = [...userChat.chats, {role: "user", content: req.body.query}]
            await Chat.findOneAndUpdate({userId},{chats: chatHistory});
        }else {
            chatHistory = [{role: "user", content: req.body.query}]
            chat = new Chat({
                userId,
                chats: chatHistory
            })
            await chat.save();
        }
    
        const response = await llm.invoke(chatHistory);
    
        chatHistory.push({role: "assistant", content: response.content ? response.content : "I didn't understand that"});
        await Chat.findOneAndUpdate({userId},{chats: chatHistory});
    
        res.send({success: true, data: chatHistory})
    }catch(err) {
        console.log(err, "err");
        res.status(500).send({success: false, message: "Internal Server Error"})
    }
})

module.exports = chatRoute;

