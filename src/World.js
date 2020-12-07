import Avatar from './Avatar'
//import Chat from './Chat'
import {FreeCamera, Vector3, StandardMaterial,HemisphericLight, Texture, MeshBuilder, Engine, Scene, Mesh, Tools} from '@babylonjs/core';


export default class World {
    static init() {
        World.canvas = document.getElementById("canvas");
        var engine = new Engine(World.canvas, true);

        
        World.scene = new Scene(engine);
        World.setupCamera();        
        World.setupLights();
        World.setupGround();
        World.setupWalls();
        //Chat.init()

        engine.runRenderLoop(() => {
            World.scene.render();
            Avatar.update();
            World.updateCamera();
        });        
        
        //Resize event
        window.addEventListener("resize", () => {
            engine.resize();
        });
    }
    
    static setupCamera() {
        World.camera = new FreeCamera("thirdPersonCam", Vector3.Zero(), World.scene);
        World.camera.position.x -= Math.sin(-Math.PI/2) * -1 * World.cameraDistance;
        World.camera.position.y = Avatar.height + Avatar.height/2;
        World.camera.position.z -= Math.cos(-Math.PI/2) * -1 * World.cameraDistance;
        var lookAt = Vector3.Zero();
        lookAt.y = Avatar.height + Avatar.height/2;
        World.camera.setTarget(lookAt);
        World.scene.activeCameras.push(World.camera);
    }
    
    static setupGround() {
        var ground = MeshBuilder.CreateGround("ground", {height: 3, width: 3, subdivisions: 4}, World.scene);
        ground.position = Vector3.Zero();
        ground.material = new StandardMaterial("matGround", World.scene);
        ground.material.diffuseTexture = new Texture("ground.jpg", World.scene);
    }


    static setupWalls(){
        var wall1 = MeshBuilder.CreatePlane("wall1", {width: 3, height: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall1.material = new StandardMaterial(""); 
        wall1.position = new Vector3(1.5,1,0);
        wall1.rotation = new Vector3(0,Tools.ToRadians(90),0);
        var wall2 = MeshBuilder.CreatePlane("wall2", {width: 3, height: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall2.position = new Vector3(0,1,-1.5);
        wall2.material = new StandardMaterial("");
        var wall3 = MeshBuilder.CreatePlane("wall3", {width: 3, height: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall3.material = new StandardMaterial(""); 
        wall3.position = new Vector3(-1.5,1,0);
        wall3.rotation = new Vector3(0,Tools.ToRadians(90),0);
        var wall4 = MeshBuilder.CreatePlane("wall4", {width: 3, height: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4.position = new Vector3(0,1,1.5);
        wall4.material = new StandardMaterial("");

    }
    
    static setupLights() {
        var light = new HemisphericLight("light1", new Vector3(1, 1, 0.5), World.scene);
        light.intensity = 0.5;        
    }
    
    static updateCamera() {
        if (typeof Avatar.mesh !== "undefined" && typeof World.camera !== "undefined" && Avatar.mesh !== null) {
            World.camera.position.x = Avatar.mesh.position.x;
            World.camera.position.y = Avatar.mesh.position.y + Avatar.height;
            World.camera.position.z = Avatar.mesh.position.z;
            World.camera.position.z -= Math.sin(Avatar.absoluteRotation - Math.PI) * -1 * World.cameraDistance;
            World.camera.position.x -= Math.cos(Avatar.absoluteRotation - Math.PI) * -1 * World.cameraDistance;
            var lookAt = new Vector3(Avatar.mesh.position.x, Avatar.mesh.position.y + Avatar.height, Avatar.mesh.position.z);
            World.camera.setTarget(lookAt);
        }
    }
}

World.cameraDistance = 1.5;