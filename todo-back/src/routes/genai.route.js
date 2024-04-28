const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAIRoute = express.Router();
const dotenv = require("dotenv");
const GenAI = require("./../schemas/genai.schema");
dotenv.config();

genAIRoute.use(express.json());

const apiKey = process.env.GEN_AI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

function fileToGenerativePart(base64, mimeType) {
    return {
      inlineData: {
        data: base64,
        mimeType
      },
    };
  }

genAIRoute.post("/text2text", async (req,res)=>{
    try {
        // console.log(req.body, "req . body")
        const userId = req.query.userId;
        const prompt = req.body.prompt;
        const file = req.body.file;
        console.log(file,'--file--');
        
        const modelName = file ? "gemini-pro-vision" : "gemini-pro"
        console.log(modelName,'model name');
        const model = genAI.getGenerativeModel({model: modelName});
        const input = file ? [prompt, fileToGenerativePart(file.base64,file.mimeType)] : prompt
        const result = await model.generateContent(input);
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