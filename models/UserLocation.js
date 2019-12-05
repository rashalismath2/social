const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const Location = Sequelize.define('tbluserlocations', {
  
    continentCode: {
      type: sequelize.STRING,
      allowNull: false
    },
    contryCode: {
      type: sequelize.STRING,
      allowNull: false
    },
    countryName:{
        type:sequelize.STRING
    },
    city:{
        type:sequelize.STRING
    },
    ip:{
        type:sequelize.STRING
    },

  }, {
    timestamps: false
  });



module.exports.Location=Location;