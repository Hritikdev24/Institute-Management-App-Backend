const express=require("express");

const env=require("dotenv");
const cors=require("cors");
const{dbConnect}=require('./connection/dbConnect.js')
const{userRouter}=require('./routes/userRoute.js')
const{courseRouter}=require("./routes/courseRoute.js")
const{studentRouter}=require('./routes/studentRoute.js');
const{fessRouter}=require("./routes/feesRoute.js")
//consfiguring the dotenv file
env.config();
const port=9090; 




//consfiguring the server for app

const app=express();





//consfiguring the cors middlware

app.use(cors({
    origin:"*",
    credentials:false
}))






// database connection
  dbConnect();




//configuring the middleware

app.use(express.urlencoded({extended:true}));
app.use(express.json());



//serveing the static folder to server

app.use("/image",express.static("uploads"));




//end points of the application

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/student",studentRouter);
app.use("/fees",fessRouter);


//listing the server


app.listen(port,()=>{
    console.log(`server has been started at post number:${port}`);
})