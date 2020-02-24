const Questions=require("../models/Questions").Questions;
const { Op } = require("sequelize");

module.exports.getAllQuestions=function(req,res){
    
    if(req.query.code){
        Questions.findAll({
        attributes:['id','category','description','question'],
        where:{
            category:{
                [Op.substring]:req.query.code
            }
        }
        })
        .then(questions => {

            return res.json({
                questions:questions
            }).status(200);
        
        })
        .catch(e=>{
            return res.json({
                message:e.messag
            })
            .status(500)
        });
    }
    else{
        Questions.findAll({
            attributes:['id','category','description','question']
        })
        .then(questions => {
            return res.json({
                questions:questions
            }).status(200);
        
        })
        .catch(e=>{
            return res.json({
                message:e.messag
            })
            .status(500)
        });
    }
}

// module.exports.getQuestion=function(req,res){
    // Questions.findAll({
    //     attributes:['id','category','description','question']
    // },{
    //     where:{
    //         category:{
    //             $like:req.params.code
    //         }
    //     }
    // })
    // .then(questions => {
    //     console.log(questions)
    //     res.json({
    //         questions
    //     }).status(200);
    
    // })
    // .catch(e=>{
    //     res.json({
    //         message:e.messag
    //     })
    //     .status(500)
    // });
// }

