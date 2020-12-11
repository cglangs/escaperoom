import World from './World'
import Avatar from './Avatar'
import Player from './Player'
import Input from './Input'
import io from "socket.io-client"
import { useHistory } from "react-router-dom";



export default class IO {
    
    static init() {
            IO.currentRoomId = null

            IO.socket = io("http://localhost:3001/", {reconnectionDelayMax: 10000})

            //IO.socket=io()

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
                console.log(data)
                switch(data.command) {
                case "playerGone":
                    Player.remove(data);
                    break;
                case "playerMoved":
                    Player.move(data);
                    break;
                }
            })

            /*IO.socket.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })*/



        }

     static login (username, roomId) {
           IO.socket.emit('login', {username: username, roomId: roomId})
     }

}

        /*Socket.ws.onmessage = (msg) => {
            switch(msg.data) {
                case "playerGone":
                    Player.remove(json.data);
                    break;
                case "playerMoved":
                    Player.move(json.data);
                    break;
            }
        };*/

        /*Socket.ws.onclose = () => {
            alert("Connection closed");
        };
        Socket.ws.onerror = (e) => {
            console.log("Error");
        };
    }*/


