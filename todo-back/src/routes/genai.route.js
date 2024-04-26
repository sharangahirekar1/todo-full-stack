const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAIRoute = express.Router();

genAIRoute.use(express.json());

const apiKey = process.env.GEN_AI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

genAIRoute.post("/text2text", async (req,res)=>{
    try {
        const prompt = req.body.prompt;
        const model = genAI.getGenerativeModel({model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = result.response;
        console.log(response.text())
        res.send({response: response.text()})
    }catch(err){
        console.log("Error text2text ", err);
    }
})


module.exports = genAIRoute;