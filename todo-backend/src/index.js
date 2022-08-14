//import
const express = require("express");
const mongoose = require("mongoose");
const userController = require("./route/user.route");
const blogController = require("./route/blog.route");
const authMiddleware = require("./middlewares/authMiddleware");

//create
const app = express();
//connect instead of create and start
app.use(express.json());

//middlewares
app.use("/users",userController);
app.use("/blogs",authMiddleware,blogController);

//start
app.listen(8000,async ()=>{
    //db connect should be only once
    await mongoose.connect("mongodb://127.0.0.1:27017/blogsT");
    console.log("server running at port 8000");
})