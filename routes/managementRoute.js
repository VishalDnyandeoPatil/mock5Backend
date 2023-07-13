const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel} = require('../models/user')


router.post('/signup', async(req,res)=>{
    try {
        const { email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

      const userPresent = await userModel.findOne({ email });
      if (userPresent) {
        return res.status(400).json({ message: 'New User already exists' });
      }
      const hashPass = await bcrypt.hash(password, 8);

      const userNew = new userModel({
        email,
        password: hashPass,
      });

      await userNew.save();

      res.status(201).json({ message: 'New User registered successfully' });
    } 
    catch (error) {
        console.error(error);
      res.status(500).json({ message: 'Server error Please try after sometime' });
    }
});

router.post('/login', async(req,res)=>{
    try {
        const { email, password } = req.body;

      const userLogin = await userModel.findOne({ email });
      if (!userLogin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, userLogin.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: userLogin._id },  process.env.secret);

      res.status(200).json({ token });
    }
     catch (error) {
        console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

module.exports={router}
