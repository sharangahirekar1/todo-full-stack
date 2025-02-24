
const express = require("express");
const mongoose = require("mongoose");
const todoSlice = require("./routes/todo.route");
const userSlice = require("./routes/user.route");
const genaiSlice = require("./routes/genai.route");
const cors = require("cors")
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const Sentry = require("@sentry/node");
const Contact = require("./schemas/contact.schema");
const auth = require("./middlewares/auth");
const blogSlice = require("./routes/blog.route");
const chatSlice = require("./routes/chat.route");
const converterSlice = require("./routes/converter.route");
dotenv.config();

const connStr = process.env.MONGODB_CONNECTION_STR;
const app = express();

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV == "production"){
    require("./instrument");
    require("./../mongo_backup");
}

app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json({limit: '50mb'})) // if not validation will fail
app.use(cors())

app.use(auth);

app.use("/todos",todoSlice);
app.use("/users",userSlice);
app.use("/genai",genaiSlice);
app.use("/blog", blogSlice);
app.use("/chat", chatSlice);
app.use("/converter", converterSlice)
app.post("/contact-form",async (req,res)=>{
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.send({msg:"Saved Successfully", data: contact});
    } catch(err) {
        console.log(err,"error post data")
    }
})
app.get("/contact-form",async (req,res)=>{
    try {
        const password = req.query.oq;
        if (password == "some_gibberish_text_5grty_1@3") {
            const contacts = await Contact.find({})
            res.send({msg:"Your contact forms", data: contacts})
        }else {
            res.send({msg:"Not allowed"})
        }
    } catch(err){
        console.log("error get contact form",err);
    }
})
if (NODE_ENV == "production"){
    app.get("/debug-sentry", function mainHandler(req, res) {
        throw new Error("My first Sentry error!");
      });
    Sentry.setupExpressErrorHandler(app)
    app.use(function onError(err, req,res, next){
        res.statusCode = 500;
        res.end(res.sentry + "\n");
    })
}

app.listen(8111,async()=>{
    await mongoose.connect(connStr);
    console.log("server started at port 8111")
})