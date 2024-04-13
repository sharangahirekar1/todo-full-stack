const User = require("../schemas/user.schema");
const crypto = require("crypto");

const createHash = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
}

const salt = "0123456789";

const controls = {};

controls.signup = async (req,res) => {
    // checking if user already exists
    const userData = req.body;
    const email = userData.email;
    const hash = createHash(userData.password, salt);
    delete userData.password;
    delete userData.confirm_password;
    userData.hash = hash;


    console.log(userData, 'form data');

    const userExists = await User.find({email});
    console.log(userExists,'existing user data from mongo');
    if(userExists.length > 0){

        return res.send("User exists!");
    }

    const user = new User(userData);
    await user.save();
    res.send(user);
}

module.exports = controls;