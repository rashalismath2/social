//for raw queries
const sequelize = require("../db/db_connection").sequelize;

const Consultant = require("../models/Consultant").Consultant;

const ConsMessage = require("../models/consPMMessages").ConsMessage;

const ConsultantHas_Users = require("../models/Consultant_has_User")
  .ConsultantHas_Users;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const dotenv = require("dotenv");
dotenv.config();

const pusher = require("../Middlewares/pusher").pusher;

module.exports.getAllConsultant = function(req, res) {
  Consultant.findAll({
    attributes: [
      "first_name",
      "last_name",
      "email",
      "profile_pic_id",
      "profile_pic_id",
      "id"
    ]
  })
    .then(data => {
      res.status(200).json({
        list: data
      });
    })
    .catch(e => {
      res.status(500).json({
        error: e
      });
    });
};

module.exports.addNewClient = function(req, res) {
  //send instant notification to old consultant
  //send instant notification to new consultant
  if(req.body.prev_cons_id){
      
      ConsMessage.create({
        cons_id:req.body.prev_cons_id,
        user_id:parseInt(req.userId),
        fromId: req.userId,
        toId: parseInt(req.body.prev_cons_id),
        message: `User has left the conversation !`,
        createdAt: Date.now(),
        type:"End"
      })
        .then(message => {
          //dm-to
          //since this message adding to local variable in front end we have to add these extra info
          var msg = {
            ...message.dataValues,
            first_name:req.userFirstName,
            last_name:req.userLastName,
            user_id:req.userId,
            sender:req.userFirstName+" "+req.userLastName,
          };
          pusher.trigger(`private-toCons-${req.body.prev_cons_id}`, "new-to-cons-dm", {
            message: msg
          });

          createNew(req,res)

        })
        .catch(e => {
          return res.status(200).json({
            message: e
          });
        });
  }
  else{
    createNew(req,res)
  }

};

function createNew(req,res){
     
  ConsultantHas_Users.update(
    { status: false },
    {
      where: {
        user_id: req.userId
      }
    })
    .then(() => {
      ConsultantHas_Users.create({
        user_id: req.userId,
        consultant_id: req.body.cons_id,
        status: true,
        createdAt: new Date().toISOString()
      })
        .then(rec => {
          return res.status(200).json({
            message: "record created"
          });
        })
        .catch(e => {
          return res.status(500).json({
            error: e,
            message: "record inserting error"
          });
        });
        //TODO - add notifications to new consultant when user added
    })
    .catch(e => {
      return res.status(500).json({
        message: "error in adding new consultant"
      });
    });
}





module.exports.getMyConsultant = function(req, res) {
  ConsultantHas_Users.findAll({
    where: {
      user_id: req.userId,
      status: true
    }
  }).then(rec => {

    if(rec.length!=0){
        Consultant.findAll({
            attributes: [
              "first_name",
              "last_name",
              "email",
              "profile_pic_id",
              "profile_pic_id",
              "id"
            ],
            where: {
              id: rec[0].consultant_id
            }
          })
            .then(data => {
              return res.status(200).json({
                myConsultant: data
              });
            })
            .catch(e => {
              return res.status(500).json({
                error: e
              })
          })
        }
        else{
            return res.status(200).json({
                myConsultant: []
              });
        }
    }).catch(e => {
      return res.status(500).json({
        error: e,
        message: "record inserting error"
      });
    });
};


module.exports.leaveconsultant=function(req,res){

  ConsMessage.create({
    cons_id:req.body.cons_id,
    user_id:parseInt(req.userId),
    fromId: req.userId,
    toId: parseInt(req.body.cons_id),
    message: `User has left the conversation !`,
    createdAt: Date.now(),
    type:"End"
  })
    .then(message => {
      //dm-to
      //since this message adding to local variable in front end we have to add these extra info
      var msg = {
        ...message.dataValues,
        first_name:req.userFirstName,
        last_name:req.userLastName,
        user_id:req.userId,
        sender:req.userFirstName+" "+req.userLastName,
      };


      ConsultantHas_Users.update(
        { status: false },
        {
          where: {
            user_id: req.userId,
            consultant_id:req.body.cons_id
          }
        })
        .then(() => {
    
          pusher.trigger(`private-toCons-${req.body.cons_id}`, "new-to-cons-dm", {
            message: msg
          });
    
          return res.status(200).json({
            message:"left consultant",
            status:true
          })
    
        })
        .catch(e=>{
          return res.status(200).json({
            message:"error in leaving consultant"
          })
        })

    })
    .catch(e=>{
      return res.status(200).json({
        message:"error in leaving consultant"
      })
    })

}