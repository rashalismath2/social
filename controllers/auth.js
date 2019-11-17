const User = require("../models/User").User;
const bcrypt = require("bcryptjs");
const jsontoken=require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();


module.exports.signup = function(req, res) {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        return res.json({
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
              password: hash
            })
              .then(user => {
                res
                  .status(200)
                  .json({
                    message: "user successfuly added to the database",
                    user: {
                      id: user.id,
                      email: user.email
                    }
                  })
                  ;
              })
              .catch(e => {
                res
                  .status(500)
                  .json({
                    message: e.message.parent.sqlMessage
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
            email:user[0].email,
            id:user[0].id
          },process.env.JWT_PASSWORD,
          { //1 hour
            expiresIn:60*60*60})

            res.status(200).json({
                message:'auth successful',
                user:{
                  email:user[0].email,
                  name:user[0].first_name+" "+user[0].last_name,
                  id:user[0].id
                },
                api_token:jwt
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