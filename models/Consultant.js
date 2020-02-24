const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const Consultant = Sequelize.define('tbl_consultant', {
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
    email:{
        type:sequelize.STRING
    },
    language:{
        type:sequelize.TEXT
    },
    category:{
        type:sequelize.STRING
    },
    profilepic_id:{
        type:sequelize.TEXT
    },


  }, {
    timestamps:false
  });



module.exports.Consultant=Consultant;