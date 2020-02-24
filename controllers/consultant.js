const Consultant=require("../models/Consultant").Consultant;
const { Op } = require("sequelize");


module.exports.getAllConsultants=function(req,res){
    // laguage:{
    //     $like:req.query.language
    // }
    if(req.query.category && req.query.language){

        Consultant.findAll({
            attributes:['id','first_name','last_name','email',"language","education","category","profilepic_id"],
            where:{
                category:req.query.category,
                language:{
                    [Op.substring]:req.query.language
                }
            }
        })
        .then(consultant => {
            return res.status(200).json({
                message:"list of all consultants",
                data:consultant
            });
        
        })
        .catch(e=>{
            res.status(500).json({
                message:e.message
            })
            
        });
    

    }
    else{
        Consultant.findAll({
            attributes:['id','first_name','last_name','email',"education","category","profilepic_id"]
        })
        .then(consultant => {
            return res.status(200).json({
                message:"list of all consultants",
                data:consultant
            });
        
        })
        .catch(e=>{
            res.status(500).json({
                message:e.message
            })
            
        });
    }
}

module.exports.getUser=function(req,res){
    User.findOne({
        where:{
            id:req.params.id
        },
        attributes:['id','first_name','last_name','email',"category","profilepic_id"]
    })
    .then(users => {
        res.status(200).json({
            message:"result consultant by id",
            count:users.length,
            data:users,
        });
    
    })
    .catch(e=>{
        res.status(500).json({
            message:e.message
        })
        
    });
}

