const express = require("express")
const cors = require("cors");
const mongoose = require('mongoose');
const User = require('./Model/User')
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const http = require('http');
const { Server } = require('socket.io');
const Group = require('./Model/Group'); 

require('dotenv').config();

const app = express()

const server = http.createServer(app);
//const io = new Server(server);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
//app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const PORT=8080

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        // Optional: Exit the process with a failure code
        process.exit(1);
    }
}

connectToDatabase();

const onlineUsers = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('userOnline', (userId) => {
      onlineUsers[userId] = socket.id;
      io.emit('updateUserStatus', onlineUsers); // Broadcast to all clients
  });
  
    // Join a group room
    socket.on('joinGroup', async ({ groupId }) => {
      socket.join(groupId);
      console.log(`User joined group: ${groupId}`);
    });
  
    // Handle incoming messages for a group
    socket.on('sendMessage', async ({ groupId, senderId, message }) => {
      try {
  
        // Broadcast the message to the group
        io.to(groupId).emit('receiveMessage', {
          groupId,
          senderId,
          message,
        });

        const groupMembers = await Group.findById(groupId).select('members');
    groupMembers.members.forEach((memberId) => {
        if (memberId !== senderId && onlineUsers[memberId]) {
            io.to(onlineUsers[memberId]).emit('newMessageNotification', {
                groupId,
                message: message
            });
        }
    });

      } catch (error) {
        console.error('Error sending message:', error);
      }
    });
  
    socket.on('disconnect', () => {
      const userId = Object.keys(onlineUsers).find(id => onlineUsers[id] === socket.id);
        if (userId) delete onlineUsers[userId];
        io.emit('updateUserStatus', onlineUsers); // Broadcast the updated status
      console.log('User disconnected:', socket.id);
    });
  });

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.get('/api/home', (req,res)=>{
    res.json({message:'hello all'})
});

server.listen(PORT, ()=>{
    console.log('Server started on port 8080')
})