const Messages = require("../models/PMMessages").Message;

const Sequelize=require('sequelize');
const Op = Sequelize.Op;

const dotenv = require("dotenv");


dotenv.config();


module.exports.getAllMessages = function(req, res) {

    Messages.findAll({
        where: {
          [Op.or]: [{msgTo: req.userId}, {msgFrom: req.userId}]
        }
      })
      .then(m=>{
        return res.status(200).json({
          messages:m,
          count:m.length
        })
      })
      .catch(e=>{
        return res.status(500).json({
          message:"retrieving messages error",
          error:e
        })
      });
  
}

module.exports.writeMessage = function(req, res) {

   Messages.create({
        msgFrom: req.userId,
        msgTo: parseInt(req.body.msgTo),
        message:req.body.message,
        createdAt:Date.now()
      }).then(message => {
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

