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
        const files = req.body.files;
        console.log(files,'--file--');
        
        const modelName = files.length > 0 ? "gemini-pro-vision" : "gemini-pro"
        console.log(modelName,'model name');
        const model = genAI.getGenerativeModel({model: modelName});
        const genParts = [];
        for(let i = 0; i < files.length; i++){
            genParts.push(fileToGenerativePart(files[i].base64, files[i].mimeType))
        }
        const input = files.length > 0 ? [prompt, ...genParts] : prompt
        const result = await model.generateContent(input);
        const response = result.response;
        console.log(response.text())
        const promptLog = new GenAI({prompt,response: response.text(), userId, modelName});
        await promptLog.save();
        res.send({response: response.text()})
    }catch(err){
        console.log("Error text2text ", err, err.message);
        if(err.message.includes("Text not available. Response was blocked due to OTHER")) {
            res.send({response: null, error: "Text not available. Response was blocked due to OTHER"});
        }else if(err.message.includes("fetch failed")){
            res.send({response: null, error: "fetch failed"})
        }
    }
})


module.exports = genAIRoute;