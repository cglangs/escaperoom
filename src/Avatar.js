import BillBoard from './BillBoard'
import IO from './IO'
import { Vector3, StandardMaterial, MeshBuilder, Axis, Space, Color3} from '@babylonjs/core';
import Input from './Input'
import World from './World'

export default class Avatar {
    
    static init(username) {
        Avatar.mesh = MeshBuilder.CreateBox("avatar", {height: Avatar.height, width: 0.1, depth: 0.1}, World.scene);
        Avatar.mesh.position = Vector3.Zero();
        Avatar.mesh.position.y = Avatar.height/2;
        Avatar.mesh.material = new StandardMaterial("matAvatar", World.scene);
        Avatar.mesh.material.diffuseColor = new Color3.Green();
        Avatar.username = username;
        console.log(Avatar.username)
        new BillBoard(Avatar.mesh, Avatar.username);
    }   
    
    static rotate(isLeft) {
        //Turning left
        if (isLeft) {
            Avatar.absoluteRotation -= Avatar.rotationSpeed;
            Avatar.mesh.rotate(Axis.Y, Avatar.rotationSpeed, Space.WORLD);
        //Turning right
        } else {
            Avatar.absoluteRotation += Avatar.rotationSpeed;            
            Avatar.mesh.rotate(Axis.Y, -Avatar.rotationSpeed, Space.WORLD);
        }
    }    
    
    static send() {
        var x = Avatar.mesh.position.x;
        var y = Avatar.mesh.position.y;
        var z = Avatar.mesh.position.z;
        var rotation = Avatar.absoluteRotation;
        IO.socket.emit('transform', {command: "playerMoved",  x, y, z, rotation})
    }   
    
    static update() {
        if (Avatar.mesh !== null) {
            //Moving forward
            if (Input.key.up) {
		var forward = new Vector3(Avatar.walkSpeed * Math.cos(Avatar.absoluteRotation), 0, Avatar.walkSpeed * Math.sin(Avatar.absoluteRotation));
		Avatar.mesh.moveWithCollisions(forward);
                Avatar.send();
            }
            //Turning left
            if (Input.key.left) {
                Avatar.rotate(false);
                Avatar.send();
            //Turning right
            } else if (Input.key.right) {
                Avatar.rotate(true);
                Avatar.send();
            }
        }
    }
}

Avatar.absoluteRotation = 0;
Avatar.height = 0.3;
Avatar.mesh = null;
Avatar.rotationSpeed = 0.01;
Avatar.walkSpeed = 0.007;