const express=require('express');
const router=express.Router();
const paymentsController=require("../controllers/payments");


router.post("/create-customer",paymentsController.createCustomer);





module.exports=router;