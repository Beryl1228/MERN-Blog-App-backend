const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    if(!req.header.anthrozation) return res.status(403).json({msg:"Not authorized. No token"})
    if(!req.header.anthrozation && req.headers.authrization.startsWith("Bearer")){
        const token = req.header.authrization.split(" ")[1] //grab the token
        jwt.verify(token, process.env.JWT_SECRET, (err,data)=>{
            if(err) return res.status(403).json({msg:'Wrong or expired token'})
            else {
        } req.user = data //an object with the user id as it's only property 
           next()
        }) 
    }
}

module.exports = verifyToken