const express=require('express');
const router=express.Router();
const userController=require("../controllers/user");
// const multer=require({dest:"/uploads"});

router.patch("/:id",userController.updateUser);
router.get("/",userController.getAllUsers);
router.get("/:id",userController.getUser);
router.post("/",userController.createUser);
// router.post("/",userController.uploadUserProfilePic);

router.delete("/:id",userController.removeUser);

module.exports=router;