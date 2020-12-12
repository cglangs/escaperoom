import Avatar from './Avatar'
//import Chat from './Chat'
import '@babylonjs/loaders';
import 'babylonjs-loaders';
//import BoomBox from './BoomBox'
import * as GUI from '@babylonjs/gui'
import {ExecuteCodeAction,SetValueAction,InterpolateValueAction,SceneLoader, FreeCamera,ArcRotateCamera, ActionManager, UniversalCamera,Color3, Vector3, StandardMaterial,HemisphericLight,DirectionalLight,PointLight, Texture, MeshBuilder, Engine, Scene, Mesh, Tools} from '@babylonjs/core';


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
        World.camera = new FreeCamera("FreeCamera", new Vector3(-5,2,-5), World.scene);
        World.camera.attachControl(World.canvas, true);
        //World.scene.activeCameras.push(World.camera);
        World.scene.activeCamera = World.camera
        World.camera.checkCollisions = true;
        World.camera.applyGravity = true;
        World.camera.ellipsoid = new Vector3(1.0, 0.66, 1.0);
        World.camera.speed = 0.1
        World.camera.keysUp.push(87);
        World.camera.keysDown.push(83)
        World.camera.keysRight.push(68)
        World.camera.keysLeft.push(65)

        World.arcCamera = new ArcRotateCamera("ArcCamera", 3 * Math.PI / 2, 3 * Math.PI / 8, 3, new Vector3(0, 0, 0), World.scene);
        World.arcCamera.layerMask = 0x10000000;
    }
    
    static setupGround() {
        /*var ground = MeshBuilder.CreateGround("ground", {height: 3, width: 3, subdivisions: 4}, World.scene);
        ground.checkCollisions = true;
        ground.position = Vector3.Zero();
        ground.material = new StandardMaterial("matGround", World.scene);
        ground.material.diffuseTexture = new Texture("ground.jpg", World.scene);*/
        var ground = Mesh.CreatePlane("ground", 20.0, World.scene);
        ground.material = new StandardMaterial("groundMat", World.scene);
        ground.material.diffuseTexture = new Texture("wood_floor_texture.jpg", World.scene);
        ground.position = new Vector3(0,0,0);
        ground.rotation = new Vector3(Math.PI / 2, 0, 0);
        ground.checkCollisions = true;

    }


    static openDrawer(){
        var boxSize = 1;
        var myPath = [
                 new Vector3(0, 0.0, 0),
                new Vector3(0, boxSize/2, 0)
        ];
        var currentDrawer = MeshBuilder.CreateTube("currentDrawer", {path: myPath, tessellation:4, cap: 1, radius: boxSize, sideOrientation: Mesh.DOUBLESIDE, updatable: true}, World.scene);
        currentDrawer.material = new StandardMaterial("", World.scene);
        currentDrawer.material.diffuseTexture = new Texture("desk_texture.png", World.scene);
        currentDrawer.layerMask = 0x10000000;

        var box = MeshBuilder.CreateBox("clue", {width: 0.1, height: 0.1, depth: 0.1, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        box.position.y = 0.05;
        //box.position = new Vector3(40.0, 0.0, 40.0);
        box.parent =  currentDrawer
        box.layerMask = 0x10000000;



        World.scene.activeCamera = World.arcCamera
        World.arcCamera.attachControl(World.canvas, true);
        var light = new HemisphericLight("light1", new Vector3(1, 1, 0.5), World.scene);




        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.layer.layerMask = 0x10000000;

        var button = GUI.Button.CreateImageButton("but", "Return", "");
        button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.width = 0.1;
        button.height = "40px";
        button.color = "white";
        button.background = "green";
        button.onPointerUpObservable.add(function() {
            World.closeDrawer(currentDrawer,light)
        });
        advancedTexture.addControl(button);


    }

    static closeDrawer(currentDrawer,light){
        currentDrawer.dispose();
        World.scene.activeCamera = World.camera
        light.dispose()
    }


    static setupWalls(){
        var wall1 = MeshBuilder.CreateBox("wall1", {width: 20, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall1.checkCollisions = true;
        wall1.material = new StandardMaterial(""); 
        wall1.position = new Vector3(0,1,11);
        wall1.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);


        var wall2 = MeshBuilder.CreateBox("wall2", {width: 20, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall2.checkCollisions = true;
        wall2.position = new Vector3(11,1,0);
        wall2.material = new StandardMaterial("");
        wall2.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall2.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        var wall3 = MeshBuilder.CreateBox("wall3", {width: 20, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall3.checkCollisions = true;
        wall3.material = new StandardMaterial(""); 
        wall3.position = new Vector3(0,1,-11);
        wall3.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);


        var wall4Left = MeshBuilder.CreateBox("wall4Left", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Left.checkCollisions = true;
        wall4Left.position = new Vector3(-11,1,-6);
        wall4Left.material = new StandardMaterial("");
        wall4Left.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Left.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        var wall4Right = MeshBuilder.CreateBox("wall4Right", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Right.checkCollisions = true;
        wall4Right.position = new Vector3(-11,1,6);
        wall4Right.material = new StandardMaterial("");
        wall4Right.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Right.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        var wall4Arch = MeshBuilder.CreateBox("wall4Arch", {width: 4, height: 2, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Arch.checkCollisions = true;
        wall4Arch.position = new Vector3(-11,5,0);
        wall4Arch.material = new StandardMaterial("");
        wall4Arch.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Arch.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        var wall4Door = MeshBuilder.CreateBox("wall4Door", {width: 4, height: 4, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Door.checkCollisions = true;
        wall4Door.position = new Vector3(-11,2,0);
        wall4Door.material = new StandardMaterial("");
        wall4Door.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Door.material.diffuseTexture = new Texture("double_door_texture.jpg", World.scene);



        var roof = MeshBuilder.CreateBox("roof", {width: 20, height: 2, depth: 20, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        roof.position = new Vector3(0,7,0);
        roof.material = new StandardMaterial("");
        roof.material.diffuseTexture = new Texture("wall_texture.jpg", World.scene);

        SceneLoader.ImportMesh("","","plant_with_color.babylon", World.scene, function(newMeshes){
            newMeshes.forEach((mesh) => {
            mesh.scaling = new Vector3(0.4, 0.4, 0.4);
            //mesh.checkCollisions = true;
            //console.log(mesh)
            //mesh.showBoundingBox = true
            })
            //console.log(newMeshes[1].getBoundingInfo().boundingBox.extendSize.scale(2))
            var box = MeshBuilder.CreateBox("myBox", {height: 13, width: 3, depth: 3}, World.scene);
            box.isVisible = false;    
            box.parent =  newMeshes[1];
            box.checkCollisions = true;



    
            //do nothing
        })

        SceneLoader.ImportMesh("","","chair.glb", World.scene, function(newMeshes){
            newMeshes.forEach((mesh) => {
            //mesh.scaling = new Vector3(10, 10, 10);
            mesh.scaling = new Vector3(1.5, 1.5, 1.5);

            mesh.position = new Vector3(6,0,-5)
            //mesh.checkCollisions = true;
            //mesh.showBoundingBox = true

            })
            //newMeshes[1].checkCollisions = true;
            console.log(newMeshes[1].getBoundingInfo().boundingBox.extendSize.scale(2))
            var box = MeshBuilder.CreateBox("myBox", {height: 2, width: 0.55, depth: 0.7}, World.scene);
            box.isVisible = false;    
            //box.setPositionWithLocalVector(new Vector3(0, 1, 0))
            box.parent =  newMeshes[1];
            box.checkCollisions = true;
            //do nothing
        })

        SceneLoader.ImportMesh("","","desk.glb", World.scene, function(newMeshes){
            newMeshes.forEach((mesh) => {
            //mesh.scaling = new Vector3(10, 10, 10);
            mesh.scaling = new Vector3(1.5, 1.5, 1.5);

            mesh.position = new Vector3(10,0,-10)

            //mesh.checkCollisions = true;
            //console.log(newMeshes[1].getBoundingInfo().boundingBox.extendSize.scale(2))
            //mesh.showBoundingBox = true
            //console.log(mesh)
            })

            var box = MeshBuilder.CreateBox("myBox", {height: 2, width: 1.5, depth: 1}, World.scene);
            box.isVisible = false;    
            //box.setPositionWithLocalVector(new Vector3(0, 1, 0))
            box.parent =  newMeshes[1];
            box.checkCollisions = true;

         })


        var drawer1 = MeshBuilder.CreatePlane("plane1", {height:0.3, width: 1}, World.scene)
        drawer1.position = new Vector3(-5.8,1.34,4.3)
        drawer1.material = new StandardMaterial("", World.scene);
        drawer1.material.diffuseColor = new Color3.Blue();

        drawer1.actionManager = new ActionManager(World.scene);
        drawer1.actionManager.registerAction(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                wall4Door,
                'visibility',
                0
            )).then(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                wall4Door,
                'visibility',
                1.0
            )
       )

        var drawer2 = MeshBuilder.CreatePlane("plane2", {height:0.3, width: 1}, World.scene)
        drawer2.position = new Vector3(-5.8,1,4.3)
        drawer2.material = new StandardMaterial("", World.scene);
        drawer2.material.diffuseColor = new Color3.Green(); 


        drawer2.actionManager = new ActionManager(World.scene);
        drawer2.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                    //parameter: 'r'
                },
                function () { World.scene.activeCamera == World.camera ? World.openDrawer() : World.closeDrawer()}
            )
        );

        var drawer3 = MeshBuilder.CreatePlane("plane3", {height:0.3, width: 1}, World.scene)
        drawer3.position = new Vector3(-5.8,0.66,4.3)
        drawer3.material = new StandardMaterial("", World.scene);
        drawer3.material.diffuseColor = new Color3.Red();

        var drawer4 = MeshBuilder.CreatePlane("plane4", {height:0.3, width: 1}, World.scene)
        drawer4.position = new Vector3(-5.8,0.32,4.3)
        drawer4.material = new StandardMaterial("", World.scene);
        drawer4.material.diffuseColor = new Color3.Purple();         
   









        /*var box = Mesh.CreateBox("crate", 2, World.scene);
        box.material = new StandardMaterial("Mat", World.scene);
        box.position = new Vector3(0,1,5);
        box.checkCollisions = true;
        box.actionManager = new ActionManager(World.scene);
        box.actionManager.registerAction(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                wall4Door,
                'visibility',
                0
            )).then(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                wall4Door,
                'visibility',
                1.0
            )
       )*/

    }
    
    static setupLights() {
        //light.intensity = 0.5;
        var light0 = new DirectionalLight("Omni", new Vector3(-7,5,17), World.scene);
        var light1 = new PointLight("Omni", new Vector3(-3,5,13), World.scene);        
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