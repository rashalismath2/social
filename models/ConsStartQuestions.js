const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;

const StartQuestions = Sequelize.define('tblconsstartquestion', {
    // attributes
    question: {
      type: sequelize.STRING
    },
    priority: {
      type: sequelize.NUMBER
    },
    tblconsultants_id: {
      type: sequelize.NUMBER
    },

  }, {
    timestamps: false
  });



module.exports.StartQuestions=StartQuestions;