const User=require("../models/User").User;

module.exports.getAllUsers=function(req,res){
    User.findAll({
        attributes:['id','first_name','last_name','email','country','birth_date','createdAt',"gender"]
    })
    .then(users => {
        res.json({
            message:"list of all user",
            count:users.length,
            data:users
        }).status(200);
    
    })
    .catch(e=>{
        res.json({
            message:e.message.parent.sqlMessage
        })
        .status(500)
    });
}

module.exports.getUser=function(req,res){
    User.findOne({
        where:{
            id:req.params.id
        },
        attributes:['id','first_name','last_name','email','country','birth_date','createdAt',"gender"]
    })
    .then(users => {
        res.json({
            message:"result user by id",
            count:users.length,
            data:users,
        }).status(200);
    
    })
    .catch(e=>{
        res.json({
            message:e.message.parent.sqlMessage
        })
        .status(500)
    });
}


module.exports.createUser = function(req, res) {

  User.create({
       email: req.body.email, 
       password: req.body.password,
     })
    .then(user => {
      res
        .json({
          message: "user successfuly added to the database",
          user:{
              id:user.id,
              email:user.email
          }
        })
        .status(200);
    })
    .catch(e => {
      res
        .json({
          message: e.message.parent.sqlMessage
        })
        .status(500);
    });
};

module.exports.updateUser = function(req, res) {

    User.update({ 
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        birth_date:req.body.birth_date,
        email:req.body.email,
        gender:req.body.gender,
        password:req.body.password,
        country:req.body.country,
        profile_pic_id:req.body.profile_pic_id
    }, {
        where: {
          id: req.body.userId
        }
      })
    .then(user => {
      res
        .json({
          message: "user updated successfully in the database",
          user:{
              id:user.id,
              email:user.email
          }
        })
        .status(200);
    })
    .catch(e => {
      res
        .json({
          message: e.message.parent.sqlMessage
        })
        .status(500);
    });
};


module.exports.removeUser = function(req, res) {

    User.destroy({
        where: {
          id: req.body.userId
        }
      })
    .then(() => {
      res
        .json({
          message: "user deleted successfully from the database"          
        })
        .status(200);
    })
    .catch(e => {
      res
        .json({
          message: e.message.parent.sqlMessage
        })
        .status(500);
    });
};
