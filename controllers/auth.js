const User = require("../models/User").User;
const Consultant = require("../models/Consultant").Consultant;
const bcrypt = require("bcryptjs");
const jsontoken=require("jsonwebtoken");
const dotenv = require("dotenv");


const pusher=require("../Middlewares/pusher").pusher;


dotenv.config();

//TODO- Oauth dont send api key on url?

function signupUser(userType,req,res){
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    if (error) {
      return res.json({
        error: error
      });
    } else {
      userType.findAll({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user.length == 0) {
          userType.create({
            email: req.body.email,
            password: hash,
            first_name:req.body.firstName,
            last_name:req.body.lastName,
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
}

module.exports.signup = function(req, res) {
       
  if(req.body.consultantCheck){
    return signupUser(Consultant,req,res)
  }
  else{
    return signupUser(User,req,res)
  }
  
  };


function loginUser(userType,req,res){
  userType.findAll({
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
          id:user[0].id,
          last_name:user[0].last_name,
          first_name:user[0].first_name
        },process.env.JWT_PASSWORD,
        { //1 hour
          expiresIn:60*60*60})

          res.status(200).json({
              message:'auth successful',
              user:{
                email:user[0].email,
                name:user[0].first_name+" "+user[0].last_name,
                id:user[0].id,
                location_id:user[0].location_id
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

module.exports.login=function (req,res) {
 
  if(req.body.consultantCheck){
    return loginUser(Consultant,req,res)
  }
  else{
    return loginUser(User,req,res)
  }
  
}


