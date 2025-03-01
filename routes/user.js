const express=require('express');
const router=express.Router();
const userController=require("../controllers/user");

const upload=require("../Middlewares/multer").upload;

router.get("/",userController.getAllUsers);
router.get("/:id",userController.getUser);
router.post("/updatelocation",userController.updatelocation);

router.post("/:id",upload.single("profilePic"),userController.uploadUserProfilePic);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.removeUser);




module.exports=router;