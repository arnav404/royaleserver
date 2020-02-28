var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var numberOfMembers = [0, 0, 0, 0];

server.listen(5000);
// WARNING: app.listen(80) will NOT work here!

io.of('/26').on('connection', function (socket) {
  numberOfMembers[0]++;
  console.log("Number of People:" + numberOfMembers[0])
  io.of('/26').emit("join", [numberOfMembers[0]])
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function(data) {
    numberOfMembers[0]--;
    io.of('/26').emit("join", [numberOfMembers[0]])
  })
});

io.of('/23').on('connection', function (socket) {
  numberOfMembers[1]++;
  console.log("Number of People:" + numberOfMembers[1])
  io.of('/23').emit("join", [numberOfMembers[1]])
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function(data) {
    numberOfMembers[1]--;
    io.of('/23').emit("join", [numberOfMembers[1]])
  })
});

io.of('/17').on('connection', function (socket) {
  numberOfMembers[2]++;
  console.log("Number of People:" + numberOfMembers[2])
  io.of('/17').emit("join", [numberOfMembers[2]])
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function(data) {
    numberOfMembers[2]--;
    io.of('/17').emit("join", [numberOfMembers[2]])
  })
});

io.of('/21').on('connection', function (socket) {
  numberOfMembers[3]++;
  console.log("Number of People:" + numberOfMembers[3])
  io.of('/21').emit("join", [numberOfMembers[3]])
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function(data) {
    numberOfMembers[3]--;
    io.of('/21').emit("join", [numberOfMembers[3]])
  })
});