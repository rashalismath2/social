const express=require('express');
const router=express.Router();
const messageController=require("../controllers/consdmmessages");


router.get("/",messageController.getAllMessages);
router.post("/",messageController.writeMessage);




module.exports=router;
