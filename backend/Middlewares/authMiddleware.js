const jwt = require("jsonwebtoken");
module.exports=function (req, res, next) {
   
  try {

   
    const token = req.headers.authorization.split(" ")[1];
    // console.log(req.headers.authorization)
    
    const verifytoken = jwt.verify(token, process.env.jwt_secretKey);
    req.body.userId = verifytoken.userId;
    next();
  } catch (err) {
    res.status(404).send({
      success: true,
      message: "Invalid token",
    });
  }
}

