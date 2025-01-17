const jwt = require("jsonwebtoken");
const secrete_key = "Hritik@11";

function auth(req, res, next) {
   
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, secrete_key, function (err, decoded) {
      if (err) {
        res.status(400).json({ success: false, message: "invalide token" });
      } else {
        req.body.userId = decoded.id;
        
        next();
      }
    });
  } else {
    res.status(400).json({ success: false, message: "something went wrong" });
  }
}



module.exports={auth};