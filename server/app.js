import express from "express";
import userRouter from "./routes/user.js";
import friendRouter from "./routes/friend.js";
import dbConnect from "./utils/dbConnect.js";
import messageRouter from "./routes/message.js";
import cookieParser from "cookie-parser";
import http from "http";
import cors from 'cors';
import dotenv from "dotenv";
import multer from "multer";
import { Server } from "socket.io";

// PORT
const PORT = process.env.PORT || 8000;
dotenv.config();
// App
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    }
});

// Middleware
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/friend', friendRouter);

// Database connect
dbConnect();

// Socket Connection
let users = {};

io.on('connection', (socket) => {
    console.log('user connected');
    const userId = socket.handshake.query.userId;
    
    if(userId) {
        if(!users[userId]) {
            users[userId] = { socketId: socket.id };
        }
        
        io.emit('getUsers', users);
        // const newUser = users.filter((u) => u.userId !== info.id);
        // const isUserAdd = true;
        // for(let i = 0; i < newUser.length; i++) {
        //     io.to(newUser[i].socketId).emit('newUserAdd', isUserAdd);
        // }
    }
    

    // Disconnect 
    socket.on("disconnect", () => {
        console.log('user disconnected');
        delete users[userId];
        io.emit("getUsers", users);
    });
    // send Message
    socket.on("sendMessage", (msg) => {
        if(users[msg.receiverId]) {
            socket.to(users[msg.receiverId].socketId).emit('getMessage', msg);
        }
    });

    socket.on("getMessage", (msg) => {
        console.log(msg);
    })
    // Typing Messege
    // socket.on("typingMessage", (messege) => {
    //     const userFind = users.find((u) => u.userId === messege.receverId);
    //     if(userFind) {
    //         socket.to(userFind.socketId).emit("getTypingMessege", {
    //             senderId: messege.senderId,
    //             receverId: messege.receverId,
    //             messege: messege.msg
    //         });
    //     }
    // });

    // Seen Message
    socket.on("seenMessage", (msg) => {
        if(users[msg.senderId]) {
            socket.to(users[msg.senderId].socketId).emit("getSeenMessage", msg);
        }
    }); 
    socket.on("deliveredMessage", (msg) => {
        if(users[msg.senderId]) {
            socket.to(users[msg.senderId].socketId).emit('getDeliveredMsg', msg);
        }
    });

    socket.on("initialSeenLastMessage", (msg) => {
        if(users[msg.senderId]) {
            socket.to(users[msg.senderId].socketId).emit('getInitialSeenLastMessage', msg);
        }
    });
    // Calling System implementation
    socket.on('createOffer', ({senderId, senderName, receiverId, offer}) => {
        if(users[receiverId]) {
            socket.to(users[receiverId].socketId).emit('receiveOffer', {senderId, senderName, receiverId, offer});
        }        
    });
    socket.on('createAnswer', ({senderId, receiverId, answer}) => {        
        if(users[receiverId]) {
            socket.to(users[receiverId].socketId).emit('receiveAnswer', {senderId, receiverId, answer});
        }      
    });
    socket.on('sendCandidate', ({senderId, receiverId, candidate}) => {        
        if(users[receiverId]) {
            console.log(candidate);
            
            socket.to(users[receiverId].socketId).emit('receiveCandidate', {senderId, receiverId, candidate});
        }      
    });

    // socket.on('logout', (userId) => {
    //     users = users.filter((u) => u.userId !== userId);
    //     io.emit("getUsers", users);
    // });
});


// Error Handle
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(500).json({error: "There was an upload error !"})
    }
    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error !!!!";
    res.status(statusCode).json({message})
});

// Server listen
server.listen(PORT, () => console.log(`Server Runnning Port ${PORT}`));