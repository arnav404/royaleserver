var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uuid = require('uuid');
var https = require('https')

var numberOfMembers = [4, 4, 4, 4];
var rooms = []

server.listen(5000);
rooms[0] = uuid.v4()
rooms[1] = uuid.v4()
rooms[2] = uuid.v4()
rooms[3] = uuid.v4()
// WARNING: app.listen(80) will NOT work here!

io.of('/26').on('connection', function (socket) {
  socket.join(rooms[0])
  numberOfMembers[0]++;
  console.log("Number of People:" + numberOfMembers[0])
  io.of('/26').emit("join", [numberOfMembers[0]])
  if(numberOfMembers[0] === 5) {
    https.get('https://opentdb.com/api.php?amount=5&category=26&type=multiple', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(rooms[0])
        io.of('/26').emit('transition', JSON.parse(data).results)
        numberOfMembers[0] = 4
        rooms[0] = uuid.v4()
      });

    })
  }
  socket.on('disconnect', function(data) {
    numberOfMembers[0]--;
    io.of('/26').emit("join", [numberOfMembers[2]])
  })
});

io.of('/23').on('connection', function (socket) {
  socket.join(rooms[1])
  numberOfMembers[1]++;
  console.log("Number of People:" + numberOfMembers[1])
  io.of('/23').emit("join", [numberOfMembers[1]])
  if(numberOfMembers[1] === 5) {
    https.get('https://opentdb.com/api.php?amount=5&category=23&type=multiple', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(rooms[1])
        io.of('/23').emit('transition', JSON.parse(data).results)
        numberOfMembers[1] = 4
        rooms[1] = uuid.v4()
      });

    })
  }
  socket.on('disconnect', function(data) {
    numberOfMembers[1]--;
    io.of('/23').emit("join", [numberOfMembers[2]])
  })
});

io.of('/17').on('connection', function (socket) {
  socket.join(rooms[2])
  numberOfMembers[2]++;
  console.log("Number of People:" + numberOfMembers[2])
  io.of('/17').emit("join", [numberOfMembers[2]])
  if(numberOfMembers[2] === 5) {
    https.get('https://opentdb.com/api.php?amount=5&category=17&type=multiple', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(rooms[2])
        io.of('/17').emit('transition', JSON.parse(data).results)
        numberOfMembers[2] = 4
        rooms[2] = uuid.v4()
      });

    })
  }
  socket.on('disconnect', function(data) {
    numberOfMembers[2]--;
    io.of('/17').emit("join", [numberOfMembers[2]])
  })
});

io.of('/21').on('connection', function (socket) {
  socket.join(rooms[3])
  numberOfMembers[3]++;
  io.of('/21').emit("join", [numberOfMembers[3]])
  if(numberOfMembers[3] === 5) {
    https.get('https://opentdb.com/api.php?amount=5&category=21&type=multiple', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(rooms[3])
        io.of('/21').emit('transition', JSON.parse(data).results)
        numberOfMembers[3] = 4
        rooms[3] = uuid.v4()
      });

    })
  }
  socket.on('disconnect', function(data) {
    numberOfMembers[3]--;
    io.of('/21').emit("join", [numberOfMembers[2]])
  })
});