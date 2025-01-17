const express=require("express");
const studentRouter=express.Router();
const{addStudent,deletStudent,findStudent, updateStudent,allStudent}=require("../controller/studentController.js");
const{auth}=require("../middleware/authenticate.js");
const{upload}=require("../middleware/uplaodImage.js");

studentRouter.post("/add-student",upload,auth,addStudent);
studentRouter.delete("/delete-student/:id",auth,deletStudent);
studentRouter.get("/:id",auth,findStudent);
studentRouter.post("/update-student/:id",upload,auth,updateStudent)
studentRouter.get("/",auth,allStudent);






module.exports={studentRouter};