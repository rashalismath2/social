const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const UserLanguage = Sequelize.define('tbl_userlang', {
    // attributes
   
    language: {
      type: sequelize.STRING
    },
    selected: {
      type: sequelize.BOOLEAN
    },
    tbl_users_id:{
        type:sequelize.NUMBER,
    }


  }, {
    timestamps:false
  });



module.exports.UserLanguage=UserLanguage;