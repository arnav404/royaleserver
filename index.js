var PORT = process.env.PORT || 5000
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uuid = require('uuid');
var https = require('https')

var numberOfMembers = [0, 0, 4, 3];
var rooms = []
var peopleLeft = {}

server.listen(5000);
rooms[0] = uuid.v4()
rooms[1] = uuid.v4()
rooms[2] = uuid.v4()
rooms[3] = uuid.v4()
// WARNING: app.listen(80) will NOT work here!

io.on('connection', function (socket) {
  console.log("CONNECTED")
  var thing = 0
  socket.on("winorloss", (change) => {
    console.log(peopleLeft)
    peopleLeft[change[1]]+=change[0]
    console.log(peopleLeft[change[1]])
    io.sockets.in(change[1]).emit("update", peopleLeft[change[1]])
  })

  //When a client connects to lobby
  socket.on('getCategory', (data123) => {
    if(data123 == "26") {
      thing = 0
    }
    if(data123 == "21") {
      thing = 3
    }
    if(data123 == "17") {
      thing = 2
    }
    if(data123 == "23") {
      thing = 1
    }

    socket.join(rooms[thing])
    numberOfMembers[thing]++;
    io.to(rooms[thing]).emit("join"+data123, [numberOfMembers[thing]])
    if(numberOfMembers[thing] === 5) {
      https.get(`https://opentdb.com/api.php?amount=5&category=${data123}&type=multiple`, (resp) => {
        let data = '';
  
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          peopleLeft[rooms[thing]] = 5
          io.emit('room'+data123, rooms[thing])
          io.emit('transition'+data123, JSON.parse(data).results)
          numberOfMembers[thing] = 0
          rooms[thing] = uuid.v4()
        });
  
      })
    }
  });

  //DISCONNECT
  socket.on('disconnect', function(data) {
    console.log("DISCONNECTED")
    var data123 = 0
    if(thing === 0) {
      data123 = "26"
    }
    if(thing === 3) {
      data123 = "21"
    }
    if(thing === 2) {
      data123 = "17"
    }
    if(thing === 1) {
      data123 = "23"
    }
    if(numberOfMembers[thing] > 0) {
      socket.leave(rooms[thing])
      numberOfMembers[thing]--;
    }
    io.to(rooms[thing]).emit("join"+data123, [numberOfMembers[thing]])
  })


});