import Avatar from './Avatar'
import Input from './Input'
import io from "socket.io-client"

export default class IO {
    
    static init() {
            IO.socket = io("http://localhost:3001/", {
              reconnectionDelayMax: 10000
            })

            IO.socket.on("auth", function(data){
                    Avatar.init();
                    Input.init();     
                    Avatar.send();
            })
        }

     static login (username) {
           IO.socket.emit('message', {type: "username", data: username}, () => {Avatar.username = username;})
     }

}

        /*Socket.ws.onmessage = (msg) => {
            switch(msg.data) {
                case "auth":
                if (json.data === "true") {
                    console.log("Authenticated by server");
                    Avatar.init();
                    Input.init();     
                    Avatar.send();
                }
                break;
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


