// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

SECRET_KEY=process.env.TOKEN_SECRET

router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(401).send({ success: false, message: 'Username already exists' });
        }

    const cr_password = await bcrypt.hash(password,10)

    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }

    const newUser = new User({ name, email, phone, username, password:cr_password });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: 'An error occurred while saving the user' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try{
    const user = await User.findOne({username:username});
    id=user?._id
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, username, id});
  } else {
    return res.status(401).send({ success: false, message: 'Invalid Credentials' });
  }
  }catch(err){
    console.error(err)
  }
});



const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    
    req.user = user;
    next();
  });
};

router.get('/chat', authenticateJWT, (req, res) => { 
  res.json({ username: req.user.username, id:req.user.id });
});


module.exports = router;
