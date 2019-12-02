const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const Friends = Sequelize.define('tblfriends', {
    // attributes
   
    requestTo: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    requestFrom: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    createdAt:{
        type:sequelize.DATE
    }

  }, {
    timestamps: false
  });



module.exports.Friends=Friends;