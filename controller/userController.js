const { Mongoose } = require("mongoose");
const { userModel } = require("../model/userModel.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const secrete_key = "Hritik@11";
const{courseModel}=require("../model/courseModel.js");
const{feeModel}=require("../model/feesModel.js");
const{studentModel}=require("../model/studentModel.js")
// user registration

async function userSigning(req, res) {
  const { instituteName, email, phone, password } = req.body;
  if (!instituteName || !email || !phone || !password) {
    res
      .status(400)
      .json({ success: false, message: "all fields are compulsory" });
  } else {
    try {
      const user = await userModel.findOne({ email: email });
      if (user) {
        res
          .status(400)
          .json({ success: false, message: "email is already present" });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            res.status(500).json({
              success: false,
              message: "something went wrong",
            });
          } else {
            bcrypt.hash(password, salt, async function (err, hash) {
              const newUser = await userModel.create({
                name: instituteName,
                email: email,
                password: hash,
                phone: phone,
                image: req.file.filename,
              });

              const token = jwt.sign({ id: newUser._id }, secrete_key);

              res.status(201).json({
                success: true,
                message: "user is created",
                token: token,
              });

              const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "hritikgangadhar90@gmail.com",
                  pass: "tvzd ovpm zuag bmrv",
                },
              });

              const time = new Date();

              let message = {
                from: "hritikgangadhar90@gmail.com",
                to: email,
                subject: "Registration On Manage App",
                text: `Hello, ${instituteName} You have Sign On The Manage App  On ${time.toLocaleDateString()} At ${time.toLocaleTimeString()} Thank You So Much!`,
              };

              transporter.sendMail(message, (error, info) => {
                if (error) {
                  console.error("Error sending email:", error);
                }
              });
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, message: "something went wrong" });
    }
  }
}

// user Login

async function useraLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "all fields are compulsory" });
  } else {
    try {
      const user = await userModel.findOne({ email: email });

      if (!user) {
        res.status(400).json({ success: false, message: "not valid user" });
      } else {
        try {
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return res
              .status(401)
              .json({ success: false, message: "Invalid credentials" });
          }

          const token = jwt.sign({ id: user._id }, secrete_key);

          res.status(200).json({ success: true, token: token,message:user });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            message: "An error occurred while verifying the password",
          });
        }
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  }
}

async function allDetails(req,res){
  const{userId}=req.body;
  try{

    const newCourse=await courseModel.find({userId:userId}).sort({$natural:-1}).limit(5);
    const newStudent=await studentModel.find({userId:userId}).sort({$natural:-1}).limit(5);
    const totalCourse = await courseModel.countDocuments({ userId: userId });
    const totalStudent = await studentModel.countDocuments({ userId: userId });
    const totalTrasctionAmount = await feeModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    
    res.status(200).json({success:true,message:{
        newCourse:newCourse,
        newStudent:newStudent,
        totalCourses:totalCourse,
        totalStudent:totalStudent,
        totalAmount:totalTrasctionAmount[0]
     }});

  }catch(err){
    console.log(err);
    res.status(500).json({success:true,message:"something went wrong"});
  }




}

module.exports = { userSigning, useraLogin,allDetails };
