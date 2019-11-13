const express=require('express');
const router=express.Router();
const messageController=require("../controllers/messages");


router.get("/",messageController.getAllMessages);
router.post("/",messageController.writeMessage);



/**
 * get /messages
 * get /messages/:fromId or toId
 * post /messages/  :Toid
 * put /messages/    :msgId
 * delete /messages/  :msgId
 * 
 */


module.exports=router;
