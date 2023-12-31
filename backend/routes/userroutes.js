const router = require("express").Router();
const User = require("../Models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddleware");
require("dotenv").config();

router.post("/register", async (req, res) => {
  // DB operations are async so we use async await here
  // console.log(req.body);
  const userexists = await User.findOne({ email: req.body.email });

  try {
    if (userexists) {
      return res.status(403).send({
        success: true,
        message: "User already Exists",
      });
    }

    // hash the password to protect outside intruder
    const salt = await bcrypt.genSalt(10);
    const hashit = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashit;

    const nayauser = new User(req.body);
    await nayauser.save();
    return res
      .status(200)
      .send({
        success: true,
        message: "User registered successfully Please Login",
      });
  } catch (err) {
    return res
      .status(403)
      .send({ success: true, message: "something went wrong" });
  }
});

router.post("/login", async function (req, res) {
  try {
    // console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) {
      return res.status(404).send({ success: true, message: "User not found" });
    }
    const verify = await bcrypt.compare(req.body.password, user.password);
    // console.log("verify",verify);
    if (!verify) {
      return res
        .status(401)
        .send({ success: true, message: "incorrect password" });
    } else {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.jwt_secretKey,
        { expiresIn: "1d" }
      );
      return res
        .status(200)
        .send({ success: true, message: "succesfully Logged In", token: token });
    }
  } catch (err) {
    // console.log(err);
    return res
      .status(403)
      .send({ success: true, message: "something went wrong" });
  }
});

router.get('/get-current-user', authMiddleware, async function(req, res) {
  try{
    const user = await User.findById( req.body.userId ).select("-password");
   return  res.status(200).send({
      success: true,
      message:"user detailes fetched successfully",
      data:user
    })
  }catch(err){
    return res.status(500).send({
      success:true,
      message:err.message
    })

  }

})
module.exports = router;
