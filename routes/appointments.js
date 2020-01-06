const express=require('express');
const router=express.Router();
const appointmentController=require("../controllers/appointments");


router.post("/",appointmentController.saveAppointment);
router.get("/user",appointmentController.getAllAppointments);


module.exports=router;
