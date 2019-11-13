const jwt=require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports=(req,res,next)=>{

    try{
        const token=req.query.api_token;
        const decode=jwt.verify(token,process.env.JWT_PASSWORD);
        req.userId=decode.id;
        next();
    }
    catch(error){
        return res.json({
            message:"authentication failed"
        }).status(404);
    }

}