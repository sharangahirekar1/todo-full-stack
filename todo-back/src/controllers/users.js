const User = require("../schemas/user.schema");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const token_Secret = "alert123";
const refresh_token_secret = "alert321";

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
    res.send("User created successfully");
}

controls.login = async (req,res) => {
    console.log(req.cookie, 'cookie parssed')
    const userdata = req.body
    console.log(userdata, 'login userdata');
    const hash = createHash(userdata.password, salt);
    console.log('hash', hash);

    const user = await User.find({email:userdata.email, hash});
    console.log(user,' user login')
    if(user.length === 1){
        console.log("inside")
        const token = jwt.sign({id:user[0]._id, username:user[0].username},token_Secret,{expiresIn:"7 days"})
        const refresh_token = jwt.sign({id:user[0]._id, username:user[0].username}, refresh_token_secret, {expiresIn: "30 days"})
        // res.append("Set-Cookie",`user=${user[0].username}; userId=${user[0]._id}; Path=/; Secure; HTTPOnly;`)
        
        res.send({msg: "Login Success", token,refresh_token})
    }else res.send("User doesn't exist");
}

controls.forgotPassword = async(req,res) => {
    const newPassword = req.body.password;
    const email = req.body.email;
    console.log(email,'email from forgot password');
    const hash = createHash(newPassword, salt);

    const user = await User.findOneAndUpdate({email},{hash});
    res.send({message: "Successfully updated the password",user});

}

module.exports = controls;