const ConsStartQuestions = require("../models/ConsStartQuestions")
  .StartQuestions;
const ConsStartAnswers = require("../models/ConsStartAnswers").StartAnswers;
const StartMessage = require("../models/ConsStartMessage").StartMessage;
const Consultant = require("../models/Consultant").Consultant;


const sequelize = require("../db/db_connection").sequelize;

const Sequelize=require('sequelize');
const Op = Sequelize.Op;

const dotenv = require("dotenv");

dotenv.config();

module.exports.createQuestions = function(req, res) {
  for (let i = 0; i < req.body.payload.length; i++) {
    ConsStartQuestions.create({
      question: req.body.payload[i].question,
      priority: req.body.payload[i].priority,
      tblconsultants_id: req.userId
    })
      .then(ques => {
        for (let j = 0; j < req.body.payload[i].answers.length; j++) {
          ConsStartAnswers.create({
            answer: req.body.payload[i].answers[j].answer,
            tblconsstartquestions_id: ques.id
          })
            .then(ans => {})
            .catch(e => {
              return res.status(500).json({
                message: "adding questions failed"
              });
            });
        }
      })
      .catch(e => {
        return res.status(500).json({
          message: "adding questions failed"
        });
      });
  }

  return res.status(200).json({
    message: "questions added",
    status: "ok"
  });
};

module.exports.getMessage = (req, res) => {
  StartMessage.findAll({
    where: {
      tblconsultants_id: req.userId
    }
  })
    .then(data => {
      res.status(200).json({
        data: data[0]
      });
    })
    .catch(e => {
      res.status(500).json({
        message: "retrieveing consultant start message error"
      });
    });
};

module.exports.getQuestions=(req,res)=>{
  //TODO- better data structures
  var query=`select tblconsstartquestions .id qid,tblconsstartquestions.question,
  tblconsstartquestions .priority,tblconsstartquestions.tblconsultants_id,
  tblconsstartanswers .id aid,tblconsstartanswers.tblconsstartquestions_id,
  tblconsstartanswers.answer   from tblconsstartquestions inner join tblconsstartanswers
   on tblconsstartquestions.id=tblconsstartanswers.tblconsstartquestions_id
   where tblconsstartquestions.tblconsultants_id=${req.userId}  order by
    tblconsstartquestions.priority;`

  sequelize
  .query(query, { type: sequelize.QueryTypes.SELECT })
    .then(data=>{
          
        var newData=[]
        for(i in data){
          var found=false;
          for(j in newData){
            if(newData[j].question_id==data[i].qid){
              newData[j].answers.push({
                aid:data[i].aid,
                tblconsstartquestion_id:data[i].tblconsstartquestions_id,
                answer:data[i].answer,
              })
              found=true;
              break;
            }
          }
          if(!found){
            newData.push({
              question_id:data[i].qid,
              question:data[i].question,
              priority:data[i].priority,
              tblconsultant_id:data[i].tblconsultants_id,
              answers:new Array({
                aid:data[i].aid,
                tblconsstartquestion_id:data[i].tblconsstartquestions_id,
                answer:data[i].answer,
              })
            })
          }
         
        }
        
        return res.status(200).json({
          data:newData
      })
      
    })
    .catch(e=>{

        return res.status(500).json({
            message:"retrieving consultant questions error"
        })
    })
}

module.exports.getItemsById=(req,res)=>{
  //TODO- better data structures
  var query=`select tblconsstartquestions .id qid,tblconsstartquestions.question,
  tblconsstartquestions .priority,tblconsstartquestions.tblconsultants_id,
  tblconsstartanswers .id aid,tblconsstartanswers.tblconsstartquestions_id,
  tblconsstartanswers.answer   from tblconsstartquestions inner join tblconsstartanswers
   on tblconsstartquestions.id=tblconsstartanswers.tblconsstartquestions_id
   where tblconsstartquestions.tblconsultants_id=${req.params.id}  order by
    tblconsstartquestions.priority;`

  sequelize
  .query(query, { type: sequelize.QueryTypes.SELECT })
    .then(data=>{
          
        var newData=[]
        for(i in data){
          var found=false;
          for(j in newData){
            if(newData[j].question_id==data[i].qid){
              newData[j].answers.push({
                aid:data[i].aid,
                tblconsstartquestion_id:data[i].tblconsstartquestions_id,
                answer:data[i].answer,
              })
              found=true;
              break;
            }
          }
          if(!found){
            newData.push({
              question_id:data[i].qid,
              question:data[i].question,
              priority:data[i].priority,
              tblconsultant_id:data[i].tblconsultants_id,
              answers:new Array({
                aid:data[i].aid,
                tblconsstartquestion_id:data[i].tblconsstartquestions_id,
                answer:data[i].answer,
              })
            })
          }
         
        }
        StartMessage.findAll({
          where:{
            tblconsultants_id:req.params.id
          }
        })
        .then(msg=>{
          
          return res.status(200).json({
            questions:newData,
            message:msg[0]
          })
        })
        .catch(e=>{
            return res.status(500).json({
              message:"retrieving consultant questions error"
            })
        })
      
    })
    .catch(e=>{
        return res.status(500).json({
            message:"retrieving consultant questions error"
        })
    })
}

module.exports.createMessage = (req, res) => {
  StartMessage.findAll({
    where: {
      tblconsultants_id: req.userId
    }
  })
    .then(rec => {
      console.log(rec);
      if (rec.length==0) {
        StartMessage.create({
          message: req.body.payload,
          tblconsultants_id: req.userId
        })
          .then(data => {
            return res.status(200).json({
              message: "saved to the db"
            });
          })
          .catch(e => {
            return res.status(500).json({
              message: "creating consultant start message error"
            });
          });
      } else {
        StartMessage.update(
          {
            message: req.body.payload
          },
          {
            where: {
              tblconsultants_id: req.userId
            }
          }
        )
          .then(() => {
            return res.status(200).json({
              message: "saved to the db"
            });
          })
          .catch(e => {
            return res.status(500).json({
              message: "creating consultant start message error"
            });
          });
      }
    })
    .catch(e => {
      return res.status(500).json({
        message: "creating consultant start message error"
      });
    });
};
