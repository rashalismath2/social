//for raw queries
const sequelize=require("../db/db_connection").sequelize;

const Messages = require("../models/PMMessages").Message;

const Sequelize=require('sequelize');
const Op = Sequelize.Op;


const dotenv = require("dotenv");
dotenv.config();


var Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret:process.env.PUSHER_APP_SECRET,
  cluster:process.env.PUSHER_APP_CLUSTER
});




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
        console.log(pusher);
        pusher.trigger(`dm-${req.body.msgTo}`, "new-dm", {
          "message": "hi"
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

