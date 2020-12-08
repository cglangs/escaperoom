import React, { useEffect, useRef, useState } from "react";
import IO from './IO'
import './App.css';
import Peer from "simple-peer";


IO.init()


const AudioTag = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <audio autoPlay ref={ref} />
    );
}


const App = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userAudio = useRef();
  const peersRef = useRef([]);
  const [userName, setUsername] = useState('')
  //const roomID = "1";

   useEffect(() => {
        socketRef.current = IO.socket
        navigator.mediaDevices.getUserMedia({audio: true }).then(stream => {
            //userAudio.current.srcObject = stream;
            //socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
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
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })
        peer.signal(incomingSignal);

        return peer;
    }

  return (
    <div>
        <h1>Multiplayer Game</h1>
        <span>Username: </span><input onChange={e => setUsername(e.target.value)} type="text" id="username"/>
        {peers.map((peer, index) => {
                return (
                    <AudioTag key={index} peer={peer} />
                );
        })}
        <button id="login" onClick={() => IO.login(userName)}>Log-in</button>
        <canvas id="canvas" style={{"width": "100%", "height": "100%"}}/>
    </div>
  )

}

export default App