const express = require("express");
const mongoose = require("mongoose");
const todoSlice = require("./routes/todo.route");
const userSlice = require("./routes/user.route");
const genaiSlice = require("./routes/genai.route");
const cors = require("cors")
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config();

const connStr = process.env.MONGODB_CONNECTION_STR;
console.log(connStr, 'connection string');
const app = express();
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json({limit: '50mb'})) // if not validation will fail
app.use(cors())
app.use("/todos",todoSlice);
app.use("/users",userSlice);
app.use("/genai",genaiSlice);

app.listen(8111,async()=>{
    await mongoose.connect(connStr);
    console.log("server started at port 8111")
})