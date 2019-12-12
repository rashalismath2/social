const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const ConsMessage = Sequelize.define('tblconsdmmessage', {
 
    cons_id: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    fromId: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    toId: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    user_id: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    createdAt:{
        type:sequelize.DATE
    },
    updatedAt:{
        type:sequelize.DATE
    },
    message:{
        type:sequelize.STRING,
        allowNull: false
    },

  }, {
    timestamps: false
  });


module.exports.ConsMessage=ConsMessage;