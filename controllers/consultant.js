//for raw queries
const sequelize = require("../db/db_connection").sequelize;

const Consultant = require("../models/Consultant").Consultant;
const ConsultantHas_Users = require("../models/Consultant_has_User")
  .ConsultantHas_Users;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const dotenv = require("dotenv");
dotenv.config();

const pusher = require("../Middlewares/pusher").pusher;

module.exports.getAllConsultant = function(req, res) {
  Consultant.findAll({
    attributes: [
      "first_name",
      "last_name",
      "email",
      "profile_pic_id",
      "profile_pic_id",
      "id"
    ]
  })
    .then(data => {
      res.status(200).json({
        list: data
      });
    })
    .catch(e => {
      res.status(500).json({
        error: e
      });
    });
};

module.exports.addNewClient = function(req, res) {
  ConsultantHas_Users.update(
    { status: false },
    {
      where: {
        user_id: req.userId
      }
    })
    .then(() => {
      ConsultantHas_Users.create({
        user_id: req.userId,
        consultant_id: req.body.cons_id,
        status: true,
        createdAt: new Date().toISOString()
      })
        .then(rec => {
          return res.status(200).json({
            message: "record created"
          });
        })
        .catch(e => {
          return res.status(500).json({
            error: e,
            message: "record inserting error"
          });
        });
    })
    .catch(e => {
      return res.status(500).json({
        message: "error in adding new consultant"
      });
    });
};

module.exports.getMyConsultant = function(req, res) {
  ConsultantHas_Users.findAll({
    where: {
      user_id: req.userId,
      status: true
    }
  }).then(rec => {

    if(rec.length!=0){
        Consultant.findAll({
            attributes: [
              "first_name",
              "last_name",
              "email",
              "profile_pic_id",
              "profile_pic_id",
              "id"
            ],
            where: {
              id: rec[0].consultant_id
            }
          })
            .then(data => {
              return res.status(200).json({
                myConsultant: data
              });
            })
            .catch(e => {
              return res.status(500).json({
                error: e
              })
          })
        }
        else{
            return res.status(200).json({
                myConsultant: []
              });
        }
    }).catch(e => {
      return res.status(500).json({
        error: e,
        message: "record inserting error"
      });
    });
};
