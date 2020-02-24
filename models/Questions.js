const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const Questions = Sequelize.define('tbl_question', {
    // attributes
   
    question: {
      type: sequelize.TEXT
    },
    description: {
      type: sequelize.TEXT
    },
    category:{
        type:sequelize.STRING,
    },


  }, {
    timestamps:false
  });



module.exports.Questions=Questions;