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
   
        Customer.create({
            user_id:req.userId,
            customer_id:customer.id,
            created_at:new Date().toISOString()
        })
        .then(result=>{
            subscribe(result)
            .then(subscription=>{
                return  res.status(200).json({
                    customer:subscription
                })
            })
            .catch(e=>{
                return  res.status(400).json({
                    message:"error subscribing customer",
                    error:e
                })
            }) 
        })
        .catch(e=>{
            return e
        })
   
}).catch(e=>{
    return  res.status(400).json({
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

async function subscribe(customer){
    const subscription = await stripe.subscriptions.create({
        customer: customer.customer_id,
        items: [{ plan: "plan_GR8f6uOteVHrEu" }],
        expand: ["latest_invoice.payment_intent"]
      });

    return subscription
}