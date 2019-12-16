//for raw queries
const sequelize=require("../db/db_connection").sequelize;

const Messages = require("../models/PMMessages").Message;
const ConsMessage = require("../models/consPMMessages").ConsMessage;
const Consultant = require("../models/Consultant").Consultant;

const Sequelize=require('sequelize');
const Op = Sequelize.Op;


const dotenv = require("dotenv");
dotenv.config();

const pusher=require("../Middlewares/pusher").pusher;




module.exports.getAllMessages = function(req, res) {

  var query1="SELECT tblusers.id as user_id,tblusers.profile_pic_id,tblusers.first_name,tblusers.last_name,";
  query1+="tbldmmessages.msgTo,tbldmmessages.msgFrom,tbldmmessages.id as message_id,"
  query1+="tbldmmessages.message,tbldmmessages.createdAt FROM `tblusers` inner join "
  query1+="tbldmmessages on tbldmmessages.msgFrom=tblusers.id where tbldmmessages.msgTo="
  query1+=`${req.userId}`

  var query2="SELECT tblusers.id as user_id,tblusers.profile_pic_id,tblusers.first_name,tblusers.last_name,";
  query2+="tbldmmessages.msgTo,tbldmmessages.msgFrom,tbldmmessages.id as message_id,"
  query2+="tbldmmessages.message,tbldmmessages.createdAt FROM `tblusers` inner join "
  query2+="tbldmmessages on tbldmmessages.msgTo=tblusers.id where "
  query2+=`tbldmmessages.msgFrom=${req.userId}`

  sequelize.query(query1, { type: sequelize.QueryTypes.SELECT})
  .then(m1=>{

    sequelize.query(query2, { type: sequelize.QueryTypes.SELECT})
      .then(m2=>{

        var c=m1.concat(m2)

        return res.status(200).json({
          messages:c,
          count:c.length
        })

      })
      .catch(e2=>{
        return res.status(500).json({
          message:"retrieving messages error",
          error:e2
        })
      })
  })
  .catch(e1=>{
    return res.status(500).json({
              message:"retrieving messages error",
              error:e1
            })
  })

  
}

module.exports.writeMessage = function(req, res) {

   Messages.create({
        msgFrom: req.userId,
        msgTo: parseInt(req.body.msgTo),
        message:req.body.message,
        createdAt:Date.now()
      }).then(message => {
        //dm-to
        //since this message adding to local variable in front end we have to add these extra info
        var msg={
          ...message.dataValues,
          first_name:req.userFirstName,
          last_name:req.userLastName,
          user_id:req.body.msgTo
        }

        pusher.trigger(`dm-${req.body.msgTo}`, "new-dm", {
          "message": msg
        });    
        return res.status(200).json({
          message:message
        })
      })
      .catch(e=>{
        return res.status(200).json({
          message:e
        })
      });
  
}

module.exports.writeMessageToCons = function(req, res) {

  ConsMessage.create({
      cons_id:req.body.toId,
      user_id:req.userId,
      createdAt:new Date().toISOString(),
      message:req.body.message,
      fromId:req.userId,
      toId:req.body.toId,

      }).then(message => {
        //dm-to
        //since this message adding to local variable in front end we have to add these extra info
        var msg={
          ...message.dataValues,
          first_name:req.userFirstName,
          last_name:req.userLastName,
          user_id:req.body.msgTo,
          sender:req.userFirstName+" "+req.userLastName
        }

        pusher.trigger(`private-toCons-${req.body.toId}`, "new-to-cons-dm", {
          "message": msg
        });    
        return res.status(200).json({
          message:"message sent"
        })
      })
      .catch(e=>{
        return res.status(200).json({
          message:e
        })
      });
  
}

module.exports.getConsMessages=function(req,res){
  
  //TODO -better datastructuresz

  ConsMessage.findAll({
    where:{
      cons_id:req.params.id,
      user_id:req.userId
    }
  })
  .then(rec=>{
    Consultant.findAll({
      attributes:["first_name","last_name"],
      where:{
        id:req.params.id
      }
    })
      .then(cons=>{
        var name=cons[0].first_name+" "+cons[0].last_name
        var messages=[]
        for(var i=0;i<rec.length;i++){
            if(rec[i].fromId==req.userId){
              var message={
                id:rec[i].id,
                cons_id:rec[i].cons_id,
                user_id:rec[i].user_id,
                createdAt:rec[i].createdAt,
                updatedAt:rec[i].updatedAt,
                message:rec[i].message,
                fromId:rec[i].fromId,
                toId:rec[i].toId,
                sender:req.userFirstName+" "+req.userLirstName
              }
             messages.push(message)
            }
            else{
                var message={
                  id:rec[i].id,
                  cons_id:rec[i].cons_id,
                  user_id:rec[i].user_id,
                  createdAt:rec[i].createdAt,
                  updatedAt:rec[i].updatedAt,
                  message:rec[i].message,
                  fromId:rec[i].fromId,
                  toId:rec[i].toId,
                  sender:name
  
              }
             messages.push(message)
            }
        }


       return res.status(200).json({
          messages:messages
        })
      })
      .catch(e=>{
        return res.status(200).json({
          message:"retriving messages error"
        })
      })
     
  })
  .catch(e=>{
    return res.status(200).json({
      message:"retriving messages error"
    })
  })


}