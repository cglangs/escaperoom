import Avatar from './Avatar'
import Player from './Player'
import Input from './Input'
import io from "socket.io-client"

export default class IO {
    
    static init() {
            IO.socket = io("http://localhost:3001/", {
              reconnectionDelayMax: 10000
            })

            IO.socket.on("auth", function(data){
                    Avatar.init(data.username);
                    Input.init();     
                    Avatar.send();
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
        }

     static login (username) {
           IO.socket.emit('login', {username: username})
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


