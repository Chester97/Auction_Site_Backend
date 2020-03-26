const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../schemas/User");
const loginValidate = require('../validation/Login');
const registerValidate = require('../validation/Register');
const userDetailsValidate = require('../validation/UserDetails');

router.get('/', (req,res) => {
  res.json({
    message: 'Hello!!!'
  })
});


router.post('/login', async (req,res) => {
  const result = loginValidate(req.body);
  if(result.error !== null) {
    return res.status(400).send(result.error);
  }
  const { username, password } = req.body;

  const userFromDB = await User.findOne({ username });
  if(!userFromDB) return res.status(404).json({ message: "User doesnt exist!" });

  const isPasswordMatch = await bcrypt.compare(password, userFromDB.password);
  if(!isPasswordMatch) return res.status(404).json({ message: "Wrong Password" });

  const jwtToken = await jwt.sign({_id: userFromDB._id}, process.env.TOKEN_SECRET);
  if(!jwtToken) return res.status(404).json({ message: "Something went wrong!" });

  return res.status(200).json({ token: jwtToken });
});


router.post('/register', async (req,res) => {
  const result = registerValidate(req.body);
  if(result.error !== null) {
    return res.status(400).json({ message: result.error.details[0].message });
  }
  const { username, email, password, } = req.body;

  const isUserExist = await User.findOne({ username });
  if(isUserExist) return res.status(400).json({ message: "User already exist!" });

  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new User({ username, email, password: hashedPassword,});
  newUser.save();

  return res.status(200).json(newUser);
});


router.post('/details', async (req,res) => {
  console.log(req.loggedUser);
  if(!req.loggedUser) return res.status(400).json({ message: "User is unauthorized!" });

  const { username, name, surname } = req.body;
  const validateFields = userDetailsValidate({ name,surname });

  if(!validateFields.error) {
    const updatedUser = await User.findOneAndUpdate({username}, { userDetails: { name, surname } });
    if(!updatedUser) return res.status(200).json({ message: "User not found" });
  
    return res.status(200).json(updatedUser);
  }

  return res.status(400).json({ message: validateFields.error.details[0].message });
});

module.exports = router;