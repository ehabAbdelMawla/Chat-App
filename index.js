const express = require('express');
const socket = require('socket.io');

// App Setup
const app = express();
const port = 5500;
const server = app.listen(port, function () {
  console.log(`Listen On Port ${port}`)
});


// Static Files

app.use(express.static('public'))


// Socket Setup
const io = socket(server);

// Each Clinet Has Its Own Socket 
io.on('connection', function (socket) {
  console.log('Made Socket Connection', socket.id);
  socket.on('chat', function (data) {
    //  get All Sockets 
    io.sockets.emit('chat', data);
  })
  socket.on('typing', function (data) {
    //  get All another Sockets  
    socket.broadcast.emit('typing', data)
  })
})