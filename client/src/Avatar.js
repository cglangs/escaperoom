import BillBoard from './BillBoard'
import IO from './IO'
import { Vector3, StandardMaterial, MeshBuilder, Axis, Space, Color3} from '@babylonjs/core';
import Input from './Input'
import World from './World'




export default class Avatar {
    
    static init(username) {
        Avatar.mesh = MeshBuilder.CreateBox("avatar", {height: Avatar.height, width: 1, depth: 1}, World.scene);
        Avatar.mesh.position = Vector3.Zero();
        Avatar.mesh.position.y = Avatar.height/2;
        Avatar.mesh.isVisible = false
        Avatar.username = username;
    }   

    
    static send() {
        let x = Avatar.mesh.position.x;
        let y = Avatar.mesh.position.y;
        let z = Avatar.mesh.position.z;
        let rotation = Avatar.absoluteRotation;
        IO.socket.emit('transform', {command: "playerMoved",  x, y, z, rotation})
    }   
    
    static update(position, cameraRotation) {
        if (Avatar.mesh !== null) {
            Avatar.mesh.position = position
            Avatar.absoluteRotation += cameraRotation.y
            Avatar.send();
        }
    }
}

Avatar.absoluteRotation = 0;
Avatar.height = 3;
Avatar.mesh = null;
Avatar.rotationSpeed = 0.01;
Avatar.walkSpeed = 0.007;