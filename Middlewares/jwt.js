const jwt=require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports=(req,res,next)=>{

    try{
        const token = req.headers['x-access-token'] || req.headers['authorization'];
        
        const decode=jwt.verify(token,process.env.JWT_PASSWORD);
        req.userId=decode.id;
        next();
    }
    catch(error){
        return res.status(404).json({
            error:"authentication failed"
        });
    }

}