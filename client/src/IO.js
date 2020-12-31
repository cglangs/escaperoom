import World from './World'
import Avatar from './Avatar'
import Player from './Player'
import Input from './Input'
import io from "socket.io-client"
import { useHistory } from "react-router-dom";



export default class IO {
    
    static init() {
            IO.currentRoomId = null
            //if(process.env.NODE_ENV === 'development'){
                IO.socket = io("http://localhost:3001/", {reconnectionDelayMax: 10000})                
            //} else{
            //    IO.socket=io()                
            //}

            IO.socket.on("auth", function(data){
                if(data.success){
                   IO.currentRoomId = data.roomId
                   World.init()
                   Player.init()
                   Avatar.init(data.username);
                   Input.init();
                    //Avatar.send();
                }

                else {
                    console.log("THAT ROOM DOESN'T EXIST")
                }
            })

            IO.socket.on("transform", function(data){
                switch(data.command) {
                case "playerGone":
                    Player.remove(data);
                    break;
                case "playerMoved":
                    Player.move(data);
                    break;
                }
            })



            IO.socket.on("room modified", function(data){
                World.roomModification(data.actionCode)
            })

        }

     static login (username, roomId) {
           IO.socket.emit('login', {username: username, roomId: roomId})
     }

}




