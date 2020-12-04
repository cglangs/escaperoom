import Avatar from './Avatar'
import World from './World'
import {MeshBuilder, Vector3, Mesh} from '@babylonjs/core';
import * as GUI from '@babylonjs/gui'



export default class Billboard {

    constructor(playerMesh, username) {
        console.log(username)

        this.playerMesh = playerMesh;
        this.username = username;
        this.create();
    }
    
    create() {
        this.mesh = MeshBuilder.CreatePlane("billboard", {width: Billboard.width, height: Billboard.height}, World.scene);
        this.mesh.position = Vector3.Zero();
        this.mesh.position.y = Avatar.height - Billboard.height;
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.mesh, 1024, 256);
        advancedTexture.name = "AvatarBillboard";
        var containerUI = new GUI.Rectangle("container");
        containerUI.thickness = 0;
        containerUI.height = "100px";
        containerUI.width = "800px";
        advancedTexture.addControl(containerUI);
        this.text = new GUI.TextBlock();
        this.text.fontFamily = "Arial";
        this.text.fontWeight = "bold";
        this.text.color = "white";
        this.text.outlineColor = "black";
        this.text.outlineWidth = 4;
        this.text.fontSize = 90;
        containerUI.addControl(this.text);
        this.text.text = this.username;
        this.mesh.billboardMode = Mesh.BILLBOARDMODE_ALL;
        this.mesh.parent = this.playerMesh;
    }
}

Billboard.height = 0.1;
Billboard.width = 0.3;