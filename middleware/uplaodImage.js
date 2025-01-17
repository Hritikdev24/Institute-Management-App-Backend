const multer = require("multer");





function upload(req, res, next) {
  
   try{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads");
        },
        filename: function (req, file, cb) {
          cb(null, Date.now()+file.originalname);
        },
      });
    
       const uploadMiddleware= multer({ storage: storage }).single("image");
       uploadMiddleware(req, res, function (err) {
        if (err) {
          return res.status(500).json({ success: false, message: "File upload failed", error: err.message });
        }
        next();
      });
   }catch(err){
    res.status(400).json({success:false,message:"something went wrong"});
   }
}



module.exports = { upload };
