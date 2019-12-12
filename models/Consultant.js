const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const Consultant = Sequelize.define('tblconsultant', {
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
    birth_date:{
        type:sequelize.DATEONLY
    },
    createdAt:{
        type:sequelize.DATE
    },
    updatedAt:{
        type:sequelize.DATE
    },
    country:{
        type:sequelize.STRING
    },
    profile_pic_id:{
        type:sequelize.STRING
    },
    email:{
      type:sequelize.STRING,
      allowNull: false
    },
    location_id:{
      type:sequelize.NUMBER
    }

  }, {
    // options
  });



module.exports.Consultant=Consultant;