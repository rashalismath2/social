const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const User = Sequelize.define('tbl_user', {
    // attributes
   
    first_name: {
      type: sequelize.STRING
    },
    last_name: {
      type: sequelize.STRING
    },
    password:{
        type:sequelize.STRING,
        allowNull: false
    },
    gender:{
        type:sequelize.STRING
    },
    city:{
        type:sequelize.STRING
    },
    profilepic_id:{
        type:sequelize.TEXT
    },
    email:{
      type:sequelize.STRING,
      allowNull: false
    }

  }, {
    timestamps:false
  });



module.exports.User=User;