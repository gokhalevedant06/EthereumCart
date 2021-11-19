const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const isAuthenticated = async (req,res,next)=>{
const token = req.cookies.token;
if(!token) {
  return res.status(401).send("Access Denied, No token provided");
}
try{
  const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
  const rootUser = await User.findOne({_id:decoded._id})
  req.user = rootUser;
  next();
}catch(err){
  res.clearCookie("token");
  return res.status(400).send(err.message);
}
}

// api for creating user
router.post("/signup", async (req, res) => {
  var { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword)
    res.status(422).send("Enter all fields");
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).send("User with this email already exists");
    } else if (password !== cpassword) {
      res.status(422).send("Passwords do not match");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      const user = new User({ name, email, phone, password });
      const saveUser = await user.save();
      if (saveUser) res.status(200).send("User created successfully");
    }
  } catch (error) {
    console.log("Error", error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send("Email or password cannot be blank");
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isValid = await bcrypt.compare(password, userLogin.password);
      if (!isValid) {
        res.status(400).send("password does not match");
      } else {
        const token = jwt.sign(
          {
            _id: userLogin._id,
            name:userLogin.name 
          },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn:"15m"
          }
        );
        return res.cookie("token",token,{ httpOnly:true}).status(200).send("Login Successfull!");
      }
    } else {
      res.status(400).send("User does not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/home',isAuthenticated,(req,res)=>{
  res.send(req.user);
})

router.post('/logout',(req,res)=>{
  res.clearCookie("token");
  res.send({ success: true });
})


module.exports = router;
