//Server
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


app.use(express.static('public'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



//Players
class Player {
    
    constructor(socket,roomId) {
        this.authenticated = false;
        this.id = Player.globalID++;
        //this.IPaddress = IPaddress;
        this.socket = socket;
        this.roomId = roomId
        Player.all.push(this);
        //console.log(`${new Date().toLocaleString()} - Player ${this.id} with IP address ${this.IPaddress} created`);
        
        //Player needs to be authenticated within 2 seconds
        /*this.authTimer = setTimeout(() => {
            if (!this.authenticated) {
                console.log(`${new Date().toLocaleString()} - Player ${this.id} authentication failed`);
                this.socket.close();
            }
        },2000);*/
    }
    
    static find(socketId) {
        return(Player.all.find(x => x.socket.id === socketId));        
    }  
    
    seeAll() {
        var otherUsersInThisRoom = []
        for (var objPlayer of Player.all) {
            if (objPlayer.id !== this.id && objPlayer.roomId === this.roomId) {
                otherUsersInThisRoom.push(objPlayer.socket.id)
                this.socket.emit("transform", {command: "playerMoved", id: objPlayer.id, username: objPlayer.username,  x: objPlayer.x, y: objPlayer.y, z: objPlayer.z, rotation:objPlayer.rotation})
            }
        };
        this.socket.emit("all users", otherUsersInThisRoom)
    }


    login(username,roomId){
          //Player is authenticated
        this.username = username
        this.authenticated = true;
        console.log(`${new Date().toLocaleString()} - Player ${this.id} authenticaton passed with username ${this.username}`);
        this.socket.emit("auth",{username: username})
        this.seeAll();
        
    }
    
    transform(transform) {
        this.x = transform.x;
        this.y = transform.y;
        this.z = transform.z;
        this.rotation = transform.rotation;
        this.socket.to("1").emit("transform", {command: "playerMoved", id: this.id, username: this.username, x: this.x, y: this.y, z: this.z, rotation: this.rotation})

        //this.sendToEveryoneElse(this.transformJSON());
    }   
    
    static remove(socket) {
        var objPlayer = Player.all.find(x => x.socket.id === socket.id);
        if(objPlayer){
            socket.to("1").emit("transform", {command: "playerGone", id: objPlayer.id})
            Player.all = Player.all.filter((obj) => {
                return obj.socket.id !== socket.id;
            });  
        }

    }  
   
}

Player.all = new Array();
Player.globalID = 1;


  io.on('connection', (socket) => {
      console.log('a user connected');

  socket.on('login', (data) => {
    socket.join("1")
    var objPlayer = new Player(socket,"1");
    objPlayer.login(data.username);
  });


  socket.on('transform', (data) => {
    var objPlayer = Player.find(socket.id);
    objPlayer.transform(data);
  });

  socket.on("sending signal", payload => {
      console.log(payload.userToSignal)
       io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
   });

   socket.on("returning signal", payload => {
       io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });



  socket.on('disconnect', () => {
    Player.remove(socket)
    console.log('user disconnected');
  });

});



http.listen(3001, () => {
  console.log('listening on *:3001');
});


