const mongoose = require("mongoose");

// Schema and  Model
const UserSchema = new mongoose.Schema({name: String});
const blogSchema = new mongoose.Schema({
    author: {type: String, required: true, validate:()=>{}},
    title: String,
    createAt: Date,
    content: String,
    tags: [String],
    person: UserSchema
})

const Blog = mongoose.model("blog",blogSchema);

async function main(){
    const connection = await mongoose.connect("mongodb://localhost:27017/website");
    console.log("connected");
    const blog = new Blog({
        author:"John Doe",
        title:"Learn React",
        createAt: new Date(),
        content: "React is good...",
        tags:["tech","react"]
    })

    await blog.save();

    const abc = await Blog.find();
    console.log(abc);

    connection.disconnect();
}

main();