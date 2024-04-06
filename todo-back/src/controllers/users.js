const User = require("../schemas/user.schema");


const controls = {};

controls.signup = async (req,res) => {
    // checking if user already exists
    const email = req.body.email;
    const userExists = await User.find({email});
    if(userExists){
        res.send("User exists!");
    }
    
    const user = new User(req.body);
    await user.save();
    res.send(user);
}

module.exports = controls;