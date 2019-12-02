const express=require('express');
const router=express.Router();
const pusherController=require("../controllers/pusher");

router.post("/auth",pusherController.auth)



module.exports=router;
