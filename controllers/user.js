const User = require("../models/User").User;
const Location = require("../models/UserLocation").Location;

const sequelize = require("../db/db_connection").sequelize;

module.exports.getUser = function(req, res) {
  User.findAll({
    where: {
      id: req.params.id
    },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "country",
      "birth_date",
      "createdAt",
      "gender"
    ]
  })
    .then(user => {
      res
        .json({
          message: "user by id",
          data: user
        })
        .status(200);
    })
    .catch(e => {
      res
        .json({
          message: e.message.parent.sqlMessage
        })
        .status(500);
    });
};

module.exports.getAllUsers = function(req, res) {
  User.findAll({
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "country",
      "birth_date",
      "createdAt",
      "gender"
    ]
  })
    .then(users => {
      //TODO-better data structure for filter users. and get it by location
      var query1 = `SELECT * from tblusers where id in(select requestTo from tblfriends where accepted='1' and requestFrom=${req.userId})`;
      var query2 = `SELECT * from tblusers where id in(select requestFrom from tblfriends where accepted='1' and requestTo=${req.userId})`;
      
      sequelize
        .query(query1, { type: sequelize.QueryTypes.SELECT })
        .then(m1 => {
          sequelize
            .query(query2, { type: sequelize.QueryTypes.SELECT })
            .then(m2 => {
              var allfriends = m1.concat(m2);
              var filtered = [];
              for (var i = 0; i < users.length; i++) {
                var foundUser = false;
                for (var j = 0; j < allfriends.length; j++) {
                  if (allfriends[j].id == users[i].id) {
                    foundUser = true;
                    break;
                  }
                }
                if (!foundUser) {
                  if(users[i].id!=req.userId){
                    filtered.push(users[i]);
                  }
                }
              }
             
              return res
                .status(200)
                .json({
                  message: "result for all users",
                  count: filtered.length,
                  data: filtered
                })
               
            })
            .catch(e2 => {
              return res
                .json({
                  message: e2
                })
                .status(500);
            });
        })
        .catch(e1 => {
          return res
            .json({
              message: e1
            })
            .status(500);
        });
    })
    .catch(e => {
      return res
        .json({
          message: e
        })
        .status(500);
    });
};

module.exports.updateUser = function(req, res) {
  User.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_date: req.body.birth_date,
      email: req.body.email,
      gender: req.body.gender,
      password: req.body.password,
      country: req.body.country,
      profile_pic_id: req.body.profile_pic_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(user => {
      res
        .json({
          message: "user updated successfully in the database",
          user: {
            id: user.id,
            email: user.email
          }
        })
        .status(200);
    })
    .catch(e => {
      res
        .json({
          message: e.message.parent.sqlMessage
        })
        .status(500);
    });
};

module.exports.removeUser = function(req, res) {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res
        .json({
          message: "user deleted successfully from the database"
        })
        .status(200);
    })
    .catch(e => {
      res
        .json({
          message: e.message.parent.sqlMessage
        })
        .status(500);
    });
};

module.exports.uploadUserProfilePic = function(req, res) {
  return res.status(200).json({
    message: "profile picture has been uploaded"
  });
};

module.exports.updatelocation = function(req, res) {
  Location.create({
    continentCode: req.body.continent_code,
    contryCode: req.body.country_code,
    countryName: req.body.country_name,
    city: req.body.city,
    ip: req.body.ip
  })
    .then(location => {
      User.update(
        {
          location_id: location.id
        },
        {
          where: {
            id: req.userId
          }
        }
      )
        .then(() => {
          return res.status(200).json({
            message: "location updated",
            location_id: location.id
          });
        })
        .catch(e => {
          return res.status(500).json({
            message: e
          });
        });
    })
    .catch(e => {
      return res.status(500).json({
        message: e
      });
    });
};
