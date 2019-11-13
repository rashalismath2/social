const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const Message = Sequelize.define('tbldmmessage', {
 
    msgTo: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    msgFrom: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    createdAt:{
        type:sequelize.DATE
    },
    message:{
        type:sequelize.STRING,
        allowNull: false
    },
   

  }, {
    timestamps: false
  });


module.exports.Message=Message;