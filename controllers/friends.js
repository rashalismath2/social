//for raw queries
const sequelize=require("../db/db_connection").sequelize;

const Friends = require("../models/Friend").Friends;
const Users = require("../models/User").User;

const Sequelize=require('sequelize');
const Op = Sequelize.Op;


const dotenv = require("dotenv");
dotenv.config();

const pusher=require("../Middlewares/pusher").pusher;

module.exports.getAllFriends=function(req,res){

    var query1=`SELECT id,first_name,last_name,country,gender,birth_date,profile_pic_id,email from tblusers where  id in(select requestTo from tblfriends where accepted=1 and requestFrom=${req.userId})`
    var query2=`SELECT id,first_name,last_name,country,gender,birth_date,profile_pic_id,email from tblusers where  id in(select requestFrom from tblfriends where accepted=1 and requestTo=${req.userId})`

    sequelize.query(query1, { type: sequelize.QueryTypes.SELECT})
    .then(m1=>{

        sequelize.query(query2, { type: sequelize.QueryTypes.SELECT})
        .then(m2=>{
    
          return res.status(200).json({
              friends:m1.concat(m2)
          })
    
        })
        .catch(e2=>{
          return res.status(500).json({
            message:"retrieving friends error",
            error:e2
          })
        })

    })
    .catch(e1=>{
      return res.status(500).json({
        message:"retrieving friends error",
        error:e1
      })
    })
}

module.exports.sendFriendRequest=function(req,res){
  Friends.create({ requestTo: req.body.to, requestFrom: req.userId,accepted:0,createdAt:new Date().toISOString() })
  .then(rec => {
    res.status(200)
    .json({
      message:"record created"
    })
  })
  .catch(e=>{
    res
    .status(500)
    .json({
      message:"inserting request error",
      e:e
    })
  });

}
module.exports.cancelFriendRequest=function(req,res){
  Friends.destroy({
      where:{
        requestTo: req.body.to,
        requestFrom: req.userId,
        accepted:0
      }
    })
  .then(rec => {
    return res.status(200)
    .json({
      message:"record deleted"
    })
  })
  .catch(e=>{
    return res
    .status(500)
    .json({
      message:"inserting request error",
      e:e
    })
  });

}

module.exports.pendingFriendRequests=function(req,res){
  var query1=`select id,first_name,last_name,country,gender,birth_date,profile_pic_id,email from tblusers where id in (select requestFrom from tblfriends where requestTo=${req.userId} and accepted=0) `
  sequelize.query(query1, { type: sequelize.QueryTypes.SELECT})
  .then(friends=>{
    res.status(200)
    .json({
      data:friends
    })
  })
  .catch(e=>{
    res.status(500)
    .json({
      error:e
    })
  })
}

module.exports.acceptFriendRequest=function(req,res){
 Friends.update({accepted:1},{
   where:{
     requestFrom:req.body.from.id
   }
 })
  .then(()=>{
    res.status(200)
    .json({
      message:"record updated"
    })
  })
  .catch(e=>{
    res.status(500)
    .json({
      error:e
    })
  })
}

module.exports.declinePendingFriendRequest=function(req,res){
 Friends.destroy({
   where:{
     requestFrom:req.body.from
   }
 })
  .then(()=>{
    res.status(200)
    .json({
      message:"record deleted"
    })
  })
  .catch(e=>{
    res.status(500)
    .json({
      error:e
    })
  })
}
