var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var playerAmount = 0;
var usernames = [];
app.use(express.static(__dirname + '/client'));



io.on('connection', function(socket){
  if(playerAmount == 5){
    socket.emit('noGame');
    socket.disconnect();
  }
  console.log('a user connected');
  socket.emit('getUserName');
  socket.on('username', function(username){
     if(!usernames.includes(username)){
        socket.username = username;
        usernames.push(username);
        socket.emit('userNameAccepted', username);
     }
     else{
        socket.emit('userNameTaken');
     }
  });
  socket.on('ready',function(data){
      playerAmount++;
      if(playerAmount == 5){
          io.emit('gameStarting');
      }
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    