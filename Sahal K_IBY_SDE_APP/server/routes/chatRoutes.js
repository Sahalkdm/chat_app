// server/routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../Model/User'); 
const Group = require('../Model/Group'); 
const Message = require('../Model/Message'); 
require("dotenv").config();
const axios = require('axios');
OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY

const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: OPENAI_SECRET_KEY
});

const runPromt=async(message)=>{
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": message}],
    max_tokens:30,
    
  });
  //console.log(chatCompletion.choices[0].message);
    return(chatCompletion.choices[0].message)
}

router.get('/userslist', async (req, res) => {
  try {
    const userId=req.query?.id; 

    // Fetch all users and groups
    const allUsers = await User.find() || [];
    const allGroups = await Group.find({ type: 'group' }) || [];

    const chattedUsers = await Group.find({ members: { $in: [userId] }, type: 'private' }) || [];

    const chattedGroups = await Group.find({ members: { $in: [userId] }, type: 'group' }) || [];

    // Send the data to the client
    res.json({
      allUsers,
      allGroups,
      chattedUsers,
      chattedGroups,
    });
  } catch (error) {
    console.error('Error fetching chat info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/createChat', async (req, res) => {
    try {
      const { rec_name, send_name, rec_id, send_id } = req.body;
      const name = rec_name + '_' + send_name

      let group = await Group.findOne({
        type:'private',
        members: { $all: [rec_id, send_id] },
      });      

      if (!group || group.type=='group' || group.members.length !== 2){
        
      // Create a new user instance
      const newChatter = new Group({ name:name, members:[rec_id,send_id]  });
  
      // Save the user to the database
      group = await newChatter.save();
      }

        res.status(201).json(group);
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: 'An error occurred while saving the user' });
    }
  });

  router.get('/group/:groupId/messages', async (req, res) => {
    const { groupId } = req.params;
  
    try {
        const messages = await Message.find({ groupId: groupId })
        .populate('senderId', 'name') 
        .sort({ timestamp: 1 }) 
        .exec();
  
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Error fetching messages' });
    }
  });

  router.post('/send', async (req, res) => {
    const { message, groupId, senderId } = req.body;
    
    try {
      // Create a new message document
      const newMessage = new Message({
        senderId,
        message,
        groupId
      });
  
      // Save the message in the database
      const savedMessage = await newMessage.save();
    
      res.status(201).json(savedMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  });

  router.post('/createGroup', async (req, res) => {
    const { gpName, members } = req.body;
    
    try {
      // Create a new message document
      const newGroup = new Group({
        name:gpName,
        members,
        type:'group'
      });
  
      // Save the message in the database
      const savedGroup = await newGroup.save();
  
      res.status(201).json(savedGroup);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  });

  router.post('/joinGroup', async (req, res) => {
    const { userId, groupId } = req.body;
  
    try {
      // Check if group exists
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      // Check if the user is already a member
      if (group.members.includes(userId)) {
        return res.status(400).json({ message: 'User is already a member of this group' });
      }
  
      // Add the user to the group
      group.members.push(userId);
      await group.save();
  
      res.status(200).json({ message: 'User added to group successfully', group });
    } catch (error) {
      console.error('Error joining group:', error);
      res.status(500).json({ message: 'An error occurred while joining the group' });
    }
  })

  router.post("/aichat", async (req, res) => {
    const { message, id } = req.body;
    try {
      const response = runPromt(message)
      res.json(response);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }  
    
});

module.exports = router;
