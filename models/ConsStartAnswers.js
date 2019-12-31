const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;

const StartAnswers = Sequelize.define('tblconsstartanswers', {
    // attributes
    answer: {
      type: sequelize.STRING
    },
    tblconsstartquestions_id: {
      type: sequelize.NUMBER
    }
  }, {
    timestamps: false
  });



module.exports.StartAnswers=StartAnswers;