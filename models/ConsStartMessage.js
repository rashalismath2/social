const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;

const StartMessage = Sequelize.define('tblconsstartmessages', {
    // attributes
    message: {
      type: sequelize.STRING
    },
    tblconsultants_id: {
      type: sequelize.NUMBER
    }
  }, {
    timestamps: false
  });



module.exports.StartMessage=StartMessage;