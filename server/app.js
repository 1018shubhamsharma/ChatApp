const path     = require("path");
const express  = require("express");
const socketIo = require("socket.io");
const http     = require("http");
let app        = express();
let server     = http.createServer(app);
let io         = socketIo(server);


var pathPublic = path.join(__dirname , "/../public");
app.use(express.static(pathPublic));

const {generateMessage,generateLocation} = require("./message.js");


io.on('connection' , (socket) => {
  console.log("A new user is connected");

  socket.emit('newMessage' ,generateMessage("Admin", "Welcome to the chat app."));

  socket.broadcast.emit('newMessage' ,generateMessage("Admin", "New user is added."));

  socket.on('createdMessage', function(message){
    io.emit('newMessage',message);
  });

  socket.on('createLoaction' , function(pos){
    io.emit('newLocationMessage', generateLocation("user",pos.lan,pos.log));
  });


  socket.on('disconnect' , () => {
    console.log("A user is disconnected.");
  });
});

server.listen(3000, () => {
  console.log("Server is running");
});
