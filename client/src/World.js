import Avatar from './Avatar'
//import Chat from './Chat'
import {FreeCamera, UniversalCamera,Color3, Vector3, StandardMaterial,HemisphericLight,DirectionalLight,PointLight, Texture, MeshBuilder, Engine, Scene, Mesh, Tools} from '@babylonjs/core';


export default class World {
    static init() {
        World.canvas = document.getElementById("canvas");
        var engine = new Engine(World.canvas, true);

        
        World.scene = new Scene(engine);
        World.scene.gravity = new Vector3(0, -0.9, 0);
        World.scene.collisionsEnabled = true;



        World.setupCamera();        
        World.setupLights();
        World.setupGround();
        World.setupWalls();
        //Chat.init()

        engine.runRenderLoop(() => {
            World.scene.render();
            Avatar.update(World.camera.position);
            //World.updateCamera();
        });        
        
        //Resize event
        window.addEventListener("resize", () => {
            engine.resize();
        });
    }
    
    static setupCamera() {
        /*World.camera = new FreeCamera("firstPersonCam", Vector3.Zero(), World.scene);
        World.camera.ellipsoid = new Vector3(0.1, 0.1, 0.1);
        World.camera.checkCollisions = true;
        World.camera.speed = 0.1
        World.camera.applyGravity = true;

        //World.camera.position.x -= Math.sin(-Math.PI/2) * -1 * World.cameraDistance;
        World.camera.position.y = 0.7;
        World.camera.attachControl(World.canvas, true)
        //World.camera.position.z -= Math.cos(-Math.PI/2) * -1 * World.cameraDistance;
        //var lookAt = Vector3.Zero();
        //lookAt.y = Avatar.height + Avatar.height/2;
        //World.camera.setTarget(lookAt);*/
        World.camera = new FreeCamera("FreeCamera", new Vector3(0, -8, -20), World.scene);
        World.camera.attachControl(World.canvas, true);
        World.scene.activeCameras.push(World.camera);
        World.camera.checkCollisions = true;
        World.camera.applyGravity = true;
        World.camera.ellipsoid = new Vector3(1.5, 1, 1.5);
        World.camera.speed = 0.1
        World.camera.keysUp.push(87);
        World.camera.keysDown.push(83)
        World.camera.keysRight.push(68)
        World.camera.keysLeft.push(65)
    }
    
    static setupGround() {
        /*var ground = MeshBuilder.CreateGround("ground", {height: 3, width: 3, subdivisions: 4}, World.scene);
        ground.checkCollisions = true;
        ground.position = Vector3.Zero();
        ground.material = new StandardMaterial("matGround", World.scene);
        ground.material.diffuseTexture = new Texture("ground.jpg", World.scene);*/
        var ground = Mesh.CreatePlane("ground", 20.0, World.scene);
        console.log(ground.width)
        ground.material = new StandardMaterial("groundMat", World.scene);
        ground.material.diffuseTexture = new Texture("ground.jpg", World.scene);
        ground.position = new Vector3(5, -10, -15);
        ground.rotation = new Vector3(Math.PI / 2, 0, 0);
        ground.checkCollisions = true;

    }


    static setupWalls(){
        var wall1 = MeshBuilder.CreateBox("wall1", {width: 20, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall1.checkCollisions = true;
        wall1.material = new StandardMaterial(""); 
        wall1.position = new Vector3(5, -9, -4);
        var wall2 = MeshBuilder.CreateBox("wall2", {width: 20, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall2.checkCollisions = true;
        wall2.position = new Vector3(16,-9,-15);
        wall2.material = new StandardMaterial("");
        wall2.rotation = new Vector3(0,Tools.ToRadians(90),0);
        var wall3 = MeshBuilder.CreateBox("wall3", {width: 20, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall3.checkCollisions = true;
        wall3.material = new StandardMaterial(""); 
        wall3.position = new Vector3(5, -9, -26);
        var wall4Left = MeshBuilder.CreateBox("wall4Left", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Left.checkCollisions = true;
        wall4Left.position = new Vector3(-6, -9, -21);
        wall4Left.material = new StandardMaterial("");
        wall4Left.rotation = new Vector3(0,Tools.ToRadians(90),0);
        var wall4Right = MeshBuilder.CreateBox("wall4Right", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Right.checkCollisions = true;
        wall4Right.position = new Vector3(-6, -9, -9);
        wall4Right.material = new StandardMaterial("");
        wall4Right.rotation = new Vector3(0,Tools.ToRadians(90),0);
        var wall4Arch = MeshBuilder.CreateBox("wall4Arch", {width: 4, height: 2, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Arch.checkCollisions = true;
        wall4Arch.position = new Vector3(-6, -5, -15);
        wall4Arch.material = new StandardMaterial("");
        wall4Arch.rotation = new Vector3(0,Tools.ToRadians(90),0);
        var wall4Door = MeshBuilder.CreateBox("wall4Door", {width: 4, height: 8, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Door.checkCollisions = true;
        wall4Door.position = new Vector3(-6, -10, -15);
        wall4Door.material = new StandardMaterial("");
        wall4Door.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Door.material.diffuseColor = new Color3.Black();   
        var box = Mesh.CreateBox("crate", 2, World.scene);
        box.material = new StandardMaterial("Mat", World.scene);
        box.position = new Vector3(5, -9, -10);
        box.checkCollisions = true;
    }
    
    static setupLights() {
        //var light = new HemisphericLight("light1", new Vector3(1, 1, 0.5), World.scene);
        //light.intensity = 0.5;
        var light0 = new DirectionalLight("Omni", new Vector3(-2, -5, 2), World.scene);
        var light1 = new PointLight("Omni", new Vector3(2, -5, -2), World.scene);        
    }
    
    /*static updateCamera() {
        if (typeof Avatar.mesh !== "undefined" && typeof World.camera !== "undefined" && Avatar.mesh !== null) {
            World.camera.position.x = Avatar.mesh.position.x;
            World.camera.position.y = Avatar.mesh.position.y + Avatar.height;
            World.camera.position.z = Avatar.mesh.position.z;
            World.camera.position.z -= Math.sin(Avatar.absoluteRotation - Math.PI) * -1 * World.cameraDistance;
            World.camera.position.x -= Math.cos(Avatar.absoluteRotation - Math.PI) * -1 * World.cameraDistance;
            var lookAt = new Vector3(Avatar.mesh.position.x, Avatar.mesh.position.y + Avatar.height, Avatar.mesh.position.z);
            World.camera.setTarget(lookAt);
        }
    }*/
}

World.cameraDistance = 1.5;