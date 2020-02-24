const User = require("../models/User").User;
const UserLanguage = require("../models/UserLangs").UserLanguage;
const bcrypt = require("bcrypt");
const jsontoken=require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

module.exports.signup = function(req, res) {
       
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
          return res.status(500).json({
            error: error
          });
        } else {
          User.findAll({
            where: {
              email: req.body.email
            }
          }).then(user => {
            if (user.length == 0) {
                User.create({
                email: req.body.email,
                password: hash,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
              })
                .then(user => {
                  res
                    .status(200)
                    .json({
                      message: "user successfuly added to the database",
                      user: {
                        id: user.id,
                      }
                    })
                    ;
                })
                .catch(e => {
                  res
                    .status(500)
                    .json({
                        error: e.message
                    })
                    ;
                });
            } else {
              res.status(409).json({ message: "email already exists" });
            }
          });
        }
      });

  
};



module.exports.login=function (req,res) {
 
    User.findAll({
        where: {
          email: req.body.email
        }
      })
      .then((user)=>{
        bcrypt.compare(req.body.password,user[0].password,(error,response)=>{
          if(!response){
            return res.status(409).json({
              message:"auth failed.try again"
            })
          }
          else{
            const jwt=jsontoken.sign({
              id:user[0].id,
              last_name:user[0].last_name,
              first_name:user[0].first_name
            },process.env.JWT_PASSWORD,
            { //1 hour
              expiresIn:60*60*60})
    

              UserLanguage.findAll({
                where:{
                  tbl_users_id:user[0].id,
                  selected:1
                }
              })
              .then(lang=>{
                return res.status(200).json({
                  message:'auth successful',
                  user:{
                    first_name:user[0].first_name,
                    last_name:user[0].last_name,
                    id:user[0].id,
                    selected_language:lang[0].language,
                    api_token:jwt,
                    code:user[0].code,
                    profilepic_id:user[0].profilepic_id
                  }
                  
              })
              })
              .catch(e=>{
                  return  res.status(409).json({
                    message:"auth failed"
                  })
              })

          }
        })
      })
      .catch(e=>{
        res.status(409).json({
          message:"auth failed"
        })
      })
}