const sequelize=require('sequelize');
const Sequelize=require("../db/db_connection").sequelize;



const Customer = Sequelize.define('tblcustomers', {
    // attributes
   
    user_id: {
      type: sequelize.NUMBER,
      allowNull: false
    },
    customer_id: {
      type: sequelize.STRING,
      allowNull: false
    },
    created_at:{
        type:sequelize.DATE
    }
  }, {
    timestamps: false
  });



module.exports.Customer=Customer;