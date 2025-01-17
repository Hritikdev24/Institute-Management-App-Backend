const   mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
      
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    courseId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const studentModel=mongoose.model("student",studentSchema);


module.exports={studentModel};