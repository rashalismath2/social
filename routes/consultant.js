const express=require('express');
const router=express.Router();
const consultantController=require("../controllers/consultant");
// const multer=require({dest:"/uploads"});

router.get("/",consultantController.getAllConsultants);
router.get("/:id",consultantController.getUser);

module.exports=router;