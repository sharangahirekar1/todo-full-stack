const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAIRoute = express.Router();
const dotenv = require("dotenv");
const GenAI = require("./../schemas/genai.schema");
dotenv.config();

genAIRoute.use(express.json());

const apiKey = process.env.GEN_AI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

genAIRoute.post("/text2text", async (req,res)=>{
    try {
        const userId = req.query.userId;
        const prompt = req.body.prompt;
        const modelName = "gemini-pro"
        const model = genAI.getGenerativeModel({model: modelName});
        const result = await model.generateContent(prompt);
        const response = result.response;
        console.log(response.text())
        const promptLog = new GenAI({prompt,response: response.text(), userId, modelName});
        await promptLog.save();
        res.send({response: response.text()})
    }catch(err){
        console.log("Error text2text ", err);
    }
})


module.exports = genAIRoute;