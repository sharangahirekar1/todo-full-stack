const express = require("express");
const mongoose = require("mongoose");
const todoController = require("./routes/todo.route");
const cors = require("cors");

const app = express();
app.use(cors());
app.use("/todos",todoController);


app.listen(8000,async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/merntodo');
    console.log("server is running on port 8000");
})