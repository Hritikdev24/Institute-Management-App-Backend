const express=require("express");
const{userSigning,useraLogin,allDetails}=require("../controller/userController.js");
const{upload}=require("../middleware/uplaodImage.js")
const{auth}=require("../middleware/authenticate.js")
const  userRouter=express.Router();


userRouter.post("/sign",upload,userSigning);
userRouter.post("/login",useraLogin)
userRouter.get("/home-detail",auth,allDetails)




module.exports={userRouter};