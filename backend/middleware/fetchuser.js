const jwt = require('jsonwebtoken');
const JWT_SECRET='Ka$mkarchupchap$';

const fetchUser=(req,res,next)=>{
    // Get User from JWT token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid token"});
        console.log(error);
    }
}
module.exports=fetchUser;