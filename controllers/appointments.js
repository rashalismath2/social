const Appointment = require("../models/Appointment").Appointment;

const sequelize = require("../db/db_connection").sequelize;

const Sequelize=require('sequelize');
const Op = Sequelize.Op;

module.exports.saveAppointment=(req,res)=>{
    Appointment.create({
        tblusers_id: req.userId,
        tblconsultants_id:req.body.consultant_id,
        date:req.body.date,
        title:req.body.title,
        status:"notpaid",
        created_at:new Date().toISOString(),
        updated_at:new Date().toISOString(),
        time:req.body.time,
        note:req.body.note
    })
    .then(appointment=>{
        return res.status(200).json({
            "message":"appointment created",
            "data":appointment
        })
    })
    .catch(e=>{
        return res.status(500).json({
            message:"couldnt create the appointment",
            error:e
        })
    })

}

module.exports.getAllAppointments=(req,res)=>{
   
    Appointment.findAll({
        where:{
            status:{
                [Op.or]:["notpaid","paid"]
            }
        }
    })
    .then(results=>{
        return res.status(200).json({
           data:results
        })
    })
    .catch(e=>{
        return res.status(500).json({
            message:"couldnt retrieve data appointment",
            e:e
        })
    })
   
}
