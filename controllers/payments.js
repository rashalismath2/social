//for raw queries
const sequelize=require("../db/db_connection").sequelize;

const Sequelize=require('sequelize');
const Op = Sequelize.Op;

const Customer=require("../models/Customer").Customer;

const dotenv = require("dotenv");
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const pusher=require("../Middlewares/pusher").pusher;

module.exports.createCustomer=(req,res)=>{


// This creates a new Customer and attaches the PaymentMethod in one API call.
createCus(req).then(customer=>{

    Customer.findAll({
        where:{  
            user_id:req.userId,
            consultant_id:req.body.consultant_id,
            status:"created",
            type:req.body.type,
        }
    })
    .then(c=>{
        if(c.length==0){
            console.log("1")
            Customer.create({
                customer_id:customer.id,
                created_at:new Date().toISOString(),
                user_id:req.userId,
                consultant_id:req.body.consultant_id,
                status:"created"
            })
            .then(result=>{
                subscribe(customer,req.body.type)
                .then(subscription=>{
                    Customer.update({
                        subscription_id:subscription.id,
                        status:subscription.status
                      }, {
                        where: {
                            user_id:req.userId,
                            consultant_id:req.body.consultant_id,
                            status:"created"
                        }
                      }).then(() => {
                        return  res.status(200).json({
                            customer:subscription
                        })
                      }).catch(e=>{
                        return  res.status(500).json({
                            message:"error updating the customer",
                            error:e
                        })
                      });
              
                })
                .catch(e=>{
                    return  res.status(500).json({
                        message:"error subscribing customer",
                        error:e
                    })
                }) 
            })
            .catch(e=>{
                return  res.status(500).json({
                    message:"error updating customer",
                    error:e
                })
            })
        }
        else{
            console.log("2")
            Customer.update({
                customer_id:customer.id,
                updated_at:new Date().toISOString(),
                type:req.body.type,
            },{
                where:{
                    user_id:req.userId,
                    consultant_id:req.body.consultant_id,
                    status:"created"
                }
            })
            .then(result=>{
                subscribe(customer,req.body.type)
                .then(subscription=>{
    
                    Customer.update({
                        subscription_id:subscription.id,
                        status:subscription.status
                      }, {
                        where: {
                            user_id:req.userId,
                            consultant_id:req.body.consultant_id,
                            status:"created"
                        }
                      }).then(() => {
                        return  res.status(200).json({
                            customer:subscription
                        })
                      }).catch(e=>{
                        return  res.status(500).json({
                            message:"error updating the customer",
                            error:e
                        })
                      });
              
                })
                .catch(e=>{
                    return  res.status(500).json({
                        message:"error subscribing customer",
                        error:e
                    })
                }) 
            })
            .catch(e=>{
                return  res.status(500).json({
                    message:"error updating customer",
                    error:e
                })
            })
        }
    })
    .catch(e=>{
        return  res.status(500).json({
            message:"error creating customer",
            error:e
        })
    })
   
}).catch(e=>{
    return  res.status(500).json({
        message:"error creating customer",
        error:e
    })
})
   
}

async function createCus(req){
    const customer=await stripe.customers.create({
        payment_method: req.body.payment_method,
        email: req.body.email,
        invoice_settings: {
            default_payment_method: req.body.payment_method
        }
        });
    return customer
  
}

async function subscribe(customer,type){
    if(type=="unlimited_text"){
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: process.env.STRIPE_UNLIMITED_TEXT_MESSAGING_PLAN }],
            expand: ["latest_invoice.payment_intent"]
          });
        return subscription
    }
}

module.exports.checkForTextSubs=(req,res)=>{
    Customer.findAll({
        where:{
            user_id:req.userId,
            consultant_id:req.body.consultant_id,
            type:"unlimited_text",
            status:"active"
        }
    })
    .then(result=>{
        if(result.length!=0){
            return res.status(200).json({
                message:"subscription already recorded",
                status:result[0].status
            })
        }else{
            if(req.body.command=="start"){
                Customer.create({
                    user_id:req.userId,
                    status:"created",
                    created_at:new Date().toISOString(),
                    consultant_id:req.body.consultant_id,
                    type:"unlimited_text"
                })
                .then(customer=>{
                    return res.status(200).json({
                        message:"customer created",
                        status:"created"
                    })
                })
                .catch(e=>{
                    return res.status(500).json({
                        message:"customer creating error"
                    })
                })
            }
            else{
                return res.status(200).json({
                    message:"subscription not found",
                    status:"notfound"
                })
            }

        }
    })
    .catch(e=>{
        console.log(e)
        return res.status(500).json({
            message:"subscription record finding error",
            error:e
        })
    })
}
