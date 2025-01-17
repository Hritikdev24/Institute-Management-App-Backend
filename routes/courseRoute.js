const express=require("express");
const courseRouter=express.Router();
const{auth}=require("../middleware/authenticate.js");
const{upload}=require("../middleware/uplaodImage.js")
const {addCourse,allCourses,perticularCourse,delteCourse,editeCourse}=require('../controller/courseController.js')
const {courseDetail}=require("../controller/studentController.js")
courseRouter.post("/add-course",upload,auth,addCourse);

courseRouter.get("/all-courses",auth,allCourses);
courseRouter.get("/course-detail/:id",auth,courseDetail)
courseRouter.get("/:id",auth,perticularCourse);
courseRouter.delete("/delete-course/:id",auth,delteCourse);
courseRouter.post("/edit-course/:id",upload,auth,editeCourse);







module.exports={courseRouter}