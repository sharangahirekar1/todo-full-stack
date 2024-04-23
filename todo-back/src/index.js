const express = require("express");
const mongoose = require("mongoose");
const todoSlice = require("./routes/todo.route");
const userSlice = require("./routes/user.route");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();

const connStr = process.env.MONGODB_CONNECTION_STR;
console.log(connStr, 'connection string');
const app = express();
app.use(express.json()) // if not validation will fail
app.use(cors())
app.use("/todos",todoSlice);
app.use("/users",userSlice);

app.listen(8111,async()=>{
    await mongoose.connect(connStr);
    console.log("server started at port 8111")
})