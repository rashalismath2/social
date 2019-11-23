const express=require('express');
const router=express.Router();
const videochatController=require("../controllers/videochat");


router.post("/sendinitoffer",videochatController.sendinitoffer);
router.post("/declinedinitoffer",videochatController.declinedinitoffer);
router.post("/sendAnswerSDP",videochatController.sendAnswerSDP);

router.post("/videochatinit",videochatController.videochatinit);
router.post("/getinitoffer",videochatController.getinitoffer);
router.post("/sendicecandidate",videochatController.sendicecandidate);
router.post("/videocallgotdisconnected",videochatController.videocallgotdisconnected);



module.exports=router;