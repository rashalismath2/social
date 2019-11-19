const express=require('express');
const router=express.Router();
const videochatController=require("../controllers/videochat");


router.post("/initoffer",videochatController.initoffer);
router.post("/declinedinitoffer",videochatController.declinedinitoffer);



module.exports=router;