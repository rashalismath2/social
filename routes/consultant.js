const express=require('express');
const router=express.Router();
const consultantController=require("../controllers/consultant");

const upload=require("../Middlewares/multer").upload;

router.get("/",consultantController.getAllConsultant);
router.post("/addnewclient",consultantController.addNewClient);
router.get("/myconsultant",consultantController.getMyConsultant);
router.post("/leaveconsultant",consultantController.leaveconsultant);
// router.get("/:id",consultantController.getUser);
// router.post("/updatelocation",consultantController.updatelocation);

// router.post("/:id",upload.single("profilePic"),consultantController.uploadUserProfilePic);
// router.put("/:id",consultantController.updateUser);
// router.delete("/:id",consultantController.removeUser);




module.exports=router;