var username;
var socket = io();
socket.on('getUserName',function(data){
    socket.emit('username',prompt("Enter username:"));
});
socket.on('userNameAccepted',function(data){
   username = data; 
});
socket.on('userNameTaken',function(data){
    socket.emit('username',prompt("Username Taken. Enter a different username: "));
});
socket.on('noGame',function(data){
    alert('No games available. Disconnecting.');
});
