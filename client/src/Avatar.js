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
        //Avatar.mesh.material = new StandardMaterial("matAvatar", World.scene);
        //Avatar.mesh.material.diffuseColor = new Color3.Green();
        Avatar.username = username;
        //new BillBoard(Avatar.mesh, Avatar.username);
    }   
    
    /*static rotate(isLeft) {
        //Turning left
        if (isLeft) {
            Avatar.absoluteRotation -= Avatar.rotationSpeed;
            Avatar.mesh.rotate(Axis.Y, Avatar.rotationSpeed, Space.WORLD);
        //Turning right
        } else {
            Avatar.absoluteRotation += Avatar.rotationSpeed;            
            Avatar.mesh.rotate(Axis.Y, -Avatar.rotationSpeed, Space.WORLD);
        }
    }*/
    
    static send() {
        var x = Avatar.mesh.position.x;
        var y = Avatar.mesh.position.y;
        var z = Avatar.mesh.position.z;
        var rotation = Avatar.absoluteRotation;
        IO.socket.emit('transform', {command: "playerMoved",  x, y, z, rotation})
    }   
    
    static update(position, cameraRotation) {
        if (Avatar.mesh !== null) {
            //console.log(position)
            Avatar.mesh.position = position
            Avatar.absoluteRotation += cameraRotation.y
            //console.log(rotation)
            //console.log(cameraRotation)
            //console.log(cameraDirection)
            Avatar.send();


            //Moving forward
            /*if (Input.key.up) {
        		const forward = new Vector3(Avatar.walkSpeed * Math.cos(Avatar.absoluteRotation), 0, Avatar.walkSpeed * Math.sin(Avatar.absoluteRotation));
                Avatar.mesh.moveWithCollisions(forward);

                Avatar.send();

            } else if(Input.key.down){
                const backward = new Vector3(Avatar.walkSpeed * ( -1 * Math.cos(Avatar.absoluteRotation)), 0, Avatar.walkSpeed * ( -1 * Math.sin(Avatar.absoluteRotation)));

                Avatar.mesh.moveWithCollisions(backward);
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
            }*/
        }
    }
}

Avatar.absoluteRotation = 0;
Avatar.height = 3;
Avatar.mesh = null;
Avatar.rotationSpeed = 0.01;
Avatar.walkSpeed = 0.007;