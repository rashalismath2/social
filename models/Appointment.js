const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;


const Appointment = Sequelize.define('tblappointments', {
    // attributes
    tblusers_id: {
      type: sequelize.NUMBER
    },
    tblconsultants_id: {
      type: sequelize.NUMBER
    },
    date:{
        type:sequelize.DATEONLY
    },
    title:{
      type:sequelize.STRING
    },
    note:{
      type:sequelize.TEXT
    },
    status:{
        //closed,notpaid,paid
      type:sequelize.STRING
    },
    created_at:{
        type:sequelize.DATE
    },
    updated_at:{
        type:sequelize.DATE
    },
    time:{
      type:sequelize.TIME
    }

  }, {
    timestamps: false
  });



module.exports.Appointment=Appointment;