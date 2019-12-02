//for raw queries
const sequelize=require("../db/db_connection").sequelize;

const Friends = require("../models/Friend").Friends;

const Sequelize=require('sequelize');
const Op = Sequelize.Op;


const dotenv = require("dotenv");
dotenv.config();

const pusher=require("../Middlewares/pusher").pusher;

module.exports.getAllFriends=function(req,res){

    var query1=`SELECT * from tblusers where id in(select requestTo from tblfriends where requestFrom=${req.userId})`
    var query2=`SELECT * from tblusers where id in(select requestFrom from tblfriends where requestTo=${req.userId})`

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
