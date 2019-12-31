const express=require('express');
const router=express.Router();
const consQuestionsController=require("../controllers/consquestions");


router.post("/questions",consQuestionsController.createQuestions);
router.get("/questions",consQuestionsController.getQuestions);
router.post("/message",consQuestionsController.createMessage);
router.get("/message",consQuestionsController.getMessage);

router.get("/:id",consQuestionsController.getItemsById);


module.exports=router;