const express=require('express');
const router=express.Router();
const questionController=require("../controllers/questions");
// const multer=require({dest:"/uploads"});

router.get("/",questionController.getAllQuestions);
// router.get("/",userController.getAllUsers);


module.exports=router;