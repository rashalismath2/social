const express=require('express');
const router=express.Router();
const messageController=require("../controllers/messages");


router.get("/",messageController.getAllMessages);
router.get("/getconsmessages/:id",messageController.getConsMessages);
router.post("/",messageController.writeMessage);
router.post("/sendmessagetocons",messageController.writeMessageToCons);




module.exports=router;
