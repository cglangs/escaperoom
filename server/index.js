//Server
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


//Players
class Player {
    
    constructor(socket,io) {
        this.authenticated = false;
        this.id = Player.globalID++;
        //this.IPaddress = IPaddress;
        this.socket = socket;
        this.io = io;
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
       
       //this.socket.broadcast.emit(objPlayer.transformJSON()) 

        for (var objPlayer of Player.all) {
            if (objPlayer.id !== this.id) {
                //Get details from all other players
                //this.socket.emit(objPlayer.transformJSON());
                this.socket.emit("transform", {command: "playerMoved", id: objPlayer.id, username: objPlayer.username,  x: objPlayer.x, y: objPlayer.y, z: objPlayer.z, rotation:objPlayer.rotation})
            }
        };                      
    }


    login(username){
          //Player is authenticated
        this.username = username
        this.authenticated = true;
        console.log(`${new Date().toLocaleString()} - Player ${this.id} authenticaton passed with username ${this.username}`);
        this.socket.emit("auth",{"data":"true"})
        clearTimeout(this.authTimer);
        this.seeAll();

    }
    
    transform(transform) {
        this.x = transform.x;
        this.y = transform.y;
        this.z = transform.z;
        this.rotation = transform.rotation;
        this.socket.broadcast.emit("transform", {command: "playerMoved", id: this.id, username: this.username, x: this.x, y: this.y, z: this.z, rotation: this.rotation})

        //this.sendToEveryoneElse(this.transformJSON());
    }   
    
    static remove(socket) {
        //Tell all other players that we've gone
        var objPlayer = Player.all.find(x => x.socket === socket);
        //var json = `{"command":"playerGone","data":${objPlayer.id}}`;
        //objPlayer.sendToEveryoneElse(json);
        //console.log(`${new Date().toLocaleString()} - Player ${objPlayer.id} gone`);
        
        //Remove me from list of all players
        Player.all = Player.all.filter((obj) => {
            return obj.socket !== socket;
        });           
    }  
    
    //Send message to all other players
    /*sendToEveryoneElse(json) {
        this.socket.broadcast.emit(json)    
    }*/
    
    //Position and rotation details
    /*transformJSON() {
        var json = `{"command":"playerMoved","data":{"id":${this.id},"username":"${this.username}","x":${this.x},"y":${this.y},"z":${this.z},"rotation":${this.rotation}}}`; 
        return json;
    }*/
}

Player.all = new Array();
Player.globalID = 1;


  io.on('connection', (socket) => {
      console.log('a user connected');
      new Player(socket);

  socket.on('login', (data) => {
    //connectedUsers[userId]= socket.id
    var objPlayer = Player.find(socket.id);
    objPlayer.login(data.username);
  });


    socket.on('transform', (data) => {
    //connectedUsers[userId]= socket.id
    var objPlayer = Player.find(socket.id);
    objPlayer.transform(data);
  });

});



http.listen(3001, () => {
  console.log('listening on *:3001');
});


