const express=require('express');
const router=express.Router();
const videochatController=require("../controllers/videochat");


router.post("/sendinitoffer",videochatController.sendinitoffer);
router.post("/sendinitofferforcons",videochatController.sendinitofferforcons);
router.post("/sendinitofferforuser",videochatController.sendinitofferforuser);


router.post("/declinedinitoffer",videochatController.declinedinitoffer);

router.post("/sendAnswerSDP",videochatController.sendAnswerSDP);
router.post("/sendAnswerSDPForUser",videochatController.sendAnswerSDPForUser);
router.post("/sendAnswerSDPForCons",videochatController.sendAnswerSDPForCons);


router.post("/videochatinit",videochatController.videochatinit);
router.post("/videochatinitwithcons",videochatController.videochatinitwithcons);
router.post("/videochatinitwithuser",videochatController.videochatinitwithuser);


router.post("/getinitoffer",videochatController.getinitoffer);
router.post("/getinitofferfromuser",videochatController.getinitofferfromuser);
router.post("/getinitofferfromcons",videochatController.getinitofferfromcons);


router.post("/sendicecandidate",videochatController.sendicecandidate);
router.post("/sendicecandidatetocons",videochatController.sendicecandidatetocons);
router.post("/sendicecandidatetouser",videochatController.sendicecandidatetouser);


router.post("/videocallgotdisconnected",videochatController.videocallgotdisconnected);
router.post("/videocallgotdisconnectedwithcons",videochatController.videocallgotdisconnectedwithcons);
router.post("/videocallgotdisconnectedwithuser",videochatController.videocallgotdisconnectedwithuser);



module.exports=router;