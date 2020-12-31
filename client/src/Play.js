import React, { useEffect, useRef, useState } from "react";
import IO from './IO'
import Login from './Login'
import './App.css';
import Peer from "simple-peer";
import { useParams } from "react-router";

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


const Play = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userAudio = useRef();
  const peersRef = useRef([]);
  
  const { roomId } = useParams();

  
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

        <Login roomId={roomId} />
        {peers.map((peer, index) => {
                return (
                    <AudioTag key={index} peer={peer} />
                );
        })}
        <p>{IO.currentRoomId && ("Share this link to invite others to your escape room: " + window.location.href +  IO.currentRoomId)}</p>
        <canvas id="canvas" style={{"width": "100%", "height": "100%"}}/>
    </div>
  )

}

export default Play