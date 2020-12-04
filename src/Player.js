import World from './World'
import {MeshBuilder, Vector3, StandardMaterial, Color3, Quaternion} from '@babylonjs/core';
import BillBoard from './BillBoard'


export default class Player {
    
    constructor(id, username) {
        var height = 0.3;
        this.id = id;
        this.mesh = MeshBuilder.CreateBox("avatar", {height: height, width: 0.1, depth: 0.1}, World.scene);
        this.mesh.position = Vector3.Zero();
        this.mesh.position.x = 0;
        this.mesh.position.y = height/2;
        this.mesh.position.z = 0;
        this.mesh.material = Player.material;
        this.billboard = new BillBoard(this.mesh, username);
        Player.all.push(this);
    }
    
    //Destroy player meshes
    destroy() {
        this.billboard.mesh.dispose();
        this.mesh.dispose();
    }
    
    //Find existing player or create if not exists
    static find(playerID, username) {       
        //Check if player is in our list
        for (var objPlayer of Player.all) {
            if (objPlayer.id === playerID) {
                //Found player, so lets return it
                return(objPlayer);
            }
        };                
        //Player doesn't exist, so lets create a new one
        console.log(playerID, username)
        return(new Player(playerID, username));
    }
    
    static init() {
        Player.material = new StandardMaterial("matPlayer", World.scene);
        Player.material.diffuseColor = new Color3.Red();        
    }
    
    //Find player and move them
    static move(data) {
   
        var playerID = parseInt(data.id);
        var objPlayer = Player.find(playerID, data.username);
        objPlayer.transform(data.x, data.y, data.z, data.rotation);
    }
    
    //Remove player from world
    static remove(data) {
        for (var objPlayer of Player.all) {
            if (objPlayer.id === data.id) {
                objPlayer.destroy();
                break;
            }
        }
        
        //Remove me from list of all players
        Player.all = Player.all.filter((obj) => {
            return obj.id !== data.id;
        });
    }
    
    //Change position and rotation
    transform(x, y, z, rotation) {
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
        this.mesh.rotationQuaternion = Quaternion.FromEulerAngles(0, -rotation, 0);
    }
}

Player.all = new Array();