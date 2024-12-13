import express from "express";
import MainRouter from "./routes/0.index";
import http from "http";
import { findUserById } from "./services/user.service";
import cors from "cors";

const socketio = require("socket.io");



const app = express();
app.use(express.json());    
app.use(
	cors({
		origin: '*'
	})
);
app.use(express.urlencoded({extended:true}));
app.use('/api', MainRouter);

require("./config/configs");

require('dotenv').config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);


const server = http.createServer(app);
const io = socketio(server, {
  cors : {
    origin : "*"
  }
})


app.set("view engine","ejs");

io.on("connection", async (socket:any)=> {
  console.log("driver connected");
  socket.on("test",(data :any)=> {
    console.log(data)
  })
  socket.on("truckDriversLocation",async (data : {
    longitude : number,
    latitude : number,
    userId : number,
  })=> {
    //verify if the user is Driver
    console.log("hello bitch whast up");
    console.log(data);
    const user = await findUserById(data.userId);
    if(!user) return;

    if(user.roles.includes("VEHICLE_MANAGER")) {
      io.emit("userReceiveDriversLocation",{
        id:socket.id,
      })
    }
  })
})

server.listen(PORT,"0.0.0.0",() => {
  console.log(`Server is running on port ${PORT}`);
});
