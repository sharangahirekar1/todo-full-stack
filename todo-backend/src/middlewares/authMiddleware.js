const authMiddleware = (req,res,next)=>{
    console.log(req.url,"auth middleware");
    next();
}

module.exports = authMiddleware;
