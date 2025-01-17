const express=require("express");
const{payment,paymentHistory,history}=require("../controller/feesController.js");
const{auth}=require('../middleware/authenticate.js')
const fessRouter=express.Router();


fessRouter.post('/payment',auth,payment);
fessRouter.post("/payment-history",auth,paymentHistory);
fessRouter.get("/all-payment",auth,history);




module.exports={fessRouter};