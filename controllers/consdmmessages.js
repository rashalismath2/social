//for raw queries
const sequelize = require("../db/db_connection").sequelize;

const ConsMessage = require("../models/consPMMessages").ConsMessage;
const User = require("../models/User").User;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const dotenv = require("dotenv");
dotenv.config();

const pusher = require("../Middlewares/pusher").pusher;

module.exports.getAllMessages = function(req, res) {
    
    var query="select u.email, u.first_name,u.last_name,d.createdAt,d.fromId,d.toId,d.message,d.user_id "+ 
    `from tblusers u inner join tblconsdmmessages d on d.user_id=u.id where d.cons_id=${req.userId} `+
    "order by user_id ASC, d.createdAt DESC"

    sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(result=>{
        //TODO- better data structure
            var msgArr=[]
            for(var i=0;i<result.length;i++){
                var found=false;
                for(var j=0;j<msgArr.length;j++){
                    if(msgArr[j].user_id==result[i].user_id){
                        if(result[i].fromId==req.userId){
                            result[i].first_name=req.userFirstName;
                            result[i].last_name=req.userLastName;
                        }
                        msgArr[j].messages.push(result[i])
                        found=true;
                        break;
                    }
                }
                if(!found){
                    var fName=result[i].first_name
                    var lName=result[i].last_name
                    if(result[i].fromId==req.userId){
                        result[i].first_name=req.userFirstName;
                        result[i].last_name=req.userLastName;
                    }
                    msgArr.push({
                        user_id:result[i].user_id,
                        first_name:fName,
                        last_name:lName,
                        messages:Array(result[i])
                    })
                }
            }

            return res.status(200)
                .json({
                    result:msgArr
                })
    })
    .catch(e=>{
        console.log(e)
        return res.status(500)
        .json({
            message:"error in retrieving messages",
            error:e
        })
    })

};

module.exports.writeMessage = function(req, res) {
    ConsMessage.create({
    cons_id:req.userId,
    user_id:parseInt(req.body.msgTo),
    fromId: req.userId,
    toId: parseInt(req.body.msgTo),
    message: req.body.message,
    createdAt: Date.now()
  })
    .then(message => {
      //dm-to
      //since this message adding to local variable in front end we have to add these extra info
      var msg = {
        ...message.dataValues,
        first_name: req.userFirstName,
        last_name: req.userLastName,
        user_id: req.body.msgTo,
        sender:req.userFirstName+" "+req.userLastName
      };
      pusher.trigger(`private-fromCons-${req.body.msgTo}`, "new-cons-dm", {
        message: msg
      });
      return res.status(200).json({
        message: message
      });
    })
    .catch(e => {
      return res.status(200).json({
        message: e
      });
    });
};
