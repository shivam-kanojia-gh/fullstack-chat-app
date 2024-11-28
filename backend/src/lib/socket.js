import { Server } from "socket.io";
import http from "http";
import express from "express";
import { log } from "console";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    // handling cors error
    cors: {
        origin: ["http://localhost:5173"],
    },
});

// helper function - pass user id & get socket id of that user
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

// listen for incoming connections
io.on("connection", (socket) => {
    // socket - user that has connected
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    // update the user socket map
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // put the event name, sending the user ids of online users
 
    // listen for disconnections
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        // when someone disconnects we can delete him from user socket map and call io.emit to let everyone know this user has just became offline
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
