import express from "express";
import MainRouter from "./routes/0.index";
import http from "http";
import { findUserById } from "./services/user.service";
import cors from "cors";
import os from "os";
const socketio = require("socket.io");

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: '*' // Be cautious with this in production
}));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', MainRouter);

// Configuration and environment setup
require("./config/configs");
require('dotenv').config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

// View engine setup
app.set("view engine", "ejs");

// Socket.IO connection handling
io.on("connection", async (socket: any) => {
  console.log("driver connected");
  
  setTimeout(() => {
    console.log("set timeout");
    io.emit("sumit", "Hello arun how are you");
  }, 2000);

  socket.on("test", (data: any) => {
    console.log("test event" + data);
  });

  socket.on("truckDriversLocation", async (data: {
    longitude: number,
    latitude: number,
    userId: number,
  }) => {
    console.log("hello ");
    console.log(data);
    
    const user = await findUserById(data.userId);
    if (!user) return;
    
    if (user.roles.includes("VEHICLE_MANAGER")) {
      io.emit("userReceiveDriversLocation", {
        id: socket.id,
      });
    }
  });
});

// Function to get local IP address
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    
    if (iface) {
      for (const details of iface) {
        if (details.family === 'IPv4' && !details.internal) {
          return details.address;
        }
      }
    }
  }
  return 'localhost';
}

// Get local IP address
const localIP = getLocalIPAddress();

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Local Network Access:`);
  console.log(`- http://${localIP}:${PORT}`);
});