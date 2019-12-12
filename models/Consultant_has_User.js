const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const ConsultantHas_Users = Sequelize.define('tblconsultants_has_tblusers', {
    // attributes
    user_id: {
      type: sequelize.NUMBER
    },
    consultant_id: {
      type: sequelize.NUMBER
    },
    createdAt:{
        type:sequelize.DATE
    },
    updatedAt:{
        type:sequelize.DATE
    },
    status:{
      type:sequelize.BOOLEAN
    }

  }, {
    timestamps: false
  });



module.exports.ConsultantHas_Users=ConsultantHas_Users;