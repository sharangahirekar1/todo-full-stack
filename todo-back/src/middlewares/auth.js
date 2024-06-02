const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()


const token_Secret = process.env.jwt_token_secret;
const refresh_token_secret = process.env.jwt_refresh_token_secret ;



const auth = (req,res,next)=>{
    try{
        console.log(req.url,'req url', req.url.includes("users") || req.url.includes("converter"))
        if (req.url.includes("users") || req.url.includes("converter") || req.url == "/"){
            next()
            return
        }
        const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
        if(token){
            const valid = jwt.verify(token,token_Secret);
            if(valid) {
                req.user = valid;
                console.log("valid : --- ",valid);
                next();
            }
        }
        else throw Error("Authorization error")
    }catch(err){
        console.log("Auth middleware error",err,req.url);
        res.send({msg:"Token expired error"})
    }
}

module.exports = auth;