import Avatar from './Avatar'
//import Chat from './Chat'
import '@babylonjs/loaders';
import 'babylonjs-loaders';
//import BoomBox from './BoomBox'
import * as GUI from '@babylonjs/gui'
import IO from './IO'
import {DefaultLoadingScreen, DynamicTexture, Vector4,ExecuteCodeAction,SetValueAction,InterpolateValueAction,SceneLoader, FreeCamera,ArcRotateCamera, ActionManager, UniversalCamera,Color3, Vector3, StandardMaterial,HemisphericLight,DirectionalLight,PointLight, Texture, MeshBuilder, Engine, Scene, Mesh, Tools} from '@babylonjs/core';


DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    if (document.getElementById("customLoadingScreenDiv")) {
        // Do not add a loading screen if there is already one
        document.getElementById("customLoadingScreenDiv").style.display = "initial";
        return;
    }
    this._loadingDiv = document.createElement("div");
    this._loadingDiv.id = "customLoadingScreenDiv";
    this._loadingDiv.innerHTML = "Preparing room...";
    let customLoadingScreenCss = document.createElement('style');
    customLoadingScreenCss.type = 'text/css';
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: lightBlue;
        color: white;
        font-size:50px;
        text-align:center;
        padding-top: 20%;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
    this._resizeLoadingUI();
    window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(this._loadingDiv);
};

export default class World {
    static init() {
        World.canvas = document.getElementById("canvas");
        let engine = new Engine(World.canvas, true);
        //World.is_loaded = false
        World.booksClicked = 0;

        
        World.scene = new Scene(engine);
        World.scene.gravity = new Vector3(0, -0.9, 0);
        World.scene.collisionsEnabled = true;



        World.setupCamera();        
        World.setupLights();
        World.setupGround();
        World.setupWalls();

        engine.runRenderLoop(() => {
                World.scene.render();
                Avatar.update(World.camera.position, World.camera.cameraRotation);
        });    

        engine.displayLoadingUI();
    
        World.scene.executeWhenReady(function() {
            //engine.hideLoadingUI();
            let myobj = document.getElementById("customLoadingScreenDiv");
            myobj.remove();
        }) 
        
        //Resize event
        window.addEventListener("resize", () => {
            engine.resize();
        });

    }

    static roomModification(actionCode){
        switch (actionCode) {
          case 1:
            World.scene.getMeshByName("safeFront").dispose()
            World.scene.getMeshByName("safeFrontBorder").dispose()
            break;

        }


    }
    
    static setupCamera() {
        World.camera = new FreeCamera("FreeCamera", new Vector3(-5,2,-5), World.scene);
        World.camera.attachControl(World.canvas, true);

        World.scene.activeCamera = World.camera
        World.camera.checkCollisions = true;
        World.camera.applyGravity = true;
        World.camera.ellipsoid = new Vector3(1.3, 1.3, 1.3);
        World.camera.speed = 0.1
        World.camera.keysUp.push(87);
        World.camera.keysDown.push(83)
        World.camera.keysRight.push(68)
        World.camera.keysLeft.push(65)

        World.arcCamera = new ArcRotateCamera("ArcCamera", 3 * Math.PI / 2, 3 * Math.PI / 8, 3, new Vector3(0, 0, 0), World.scene);
        World.arcCamera.layerMask = 0x10000000;
    }
    
    static setupGround() {

        let ground = Mesh.CreatePlane("ground", 20.0, World.scene);
        ground.material = new StandardMaterial("groundMat", World.scene);
        ground.material.diffuseTexture = new Texture("wood_floor_texture.jpg", World.scene);
        ground.position = new Vector3(0,0,0);
        ground.rotation = new Vector3(Math.PI / 2, 0, 0);
        ground.checkCollisions = true;

        let hallway = MeshBuilder.CreatePlane("hallway", {width: 4, height: 10, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        hallway.position = new Vector3(5,0,15)
        hallway.rotation = new Vector3(Math.PI / 2, 0, 0);
        hallway.checkCollisions = true;

        let turn = MeshBuilder.CreatePlane("turn", {width: 8, height: 4, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        turn.position = new Vector3(7,0,20)
        turn.rotation = new Vector3(Math.PI / 2, 0, 0);
        turn.checkCollisions = true;





        let secretRoom = MeshBuilder.CreatePlane("secretRoom", {width: 8, height: 10, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        secretRoom.position = new Vector3(15,0,20)
        secretRoom.rotation = new Vector3(Math.PI / 2, 0, 0);
        secretRoom.checkCollisions = true;


    }


    static openDrawer(drawerNumber){
        let boxSize = 1;
        let myPath = [
                 new Vector3(0, 0.0, 0),
                new Vector3(0, boxSize/2, 0)
        ];
        let currentDrawer = MeshBuilder.CreateTube("currentDrawer", {path: myPath, tessellation:4, cap: 1, radius: boxSize, sideOrientation: Mesh.DOUBLESIDE, updatable: true}, World.scene);
        currentDrawer.material = new StandardMaterial("", World.scene);
        currentDrawer.material.diffuseTexture = new Texture("desk_texture.png", World.scene);
        currentDrawer.layerMask = 0x10000000;
        let boxColor, drawerText
        switch (drawerNumber) {
          case 1:
            boxColor =  new Color3.Blue() 
            drawerText = "I"
            break;
          case 2:
            boxColor =  new Color3(0, 206/255, 209/255)
            drawerText = "II"
            break;
          case 3:
            boxColor = new Color3.Green()
            drawerText = "III"
            break;
          case 4:
            boxColor = new Color3.Red()
            drawerText = "IV"
            break;

        }

        let box = MeshBuilder.CreateBox("clue", {width: 0.1, height: 0.1, depth: 0.1, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        box.position.y = 0.051;
        box.material = new StandardMaterial("", World.scene);
        box.material.diffuseColor = boxColor;
        box.parent =  currentDrawer
        box.layerMask = 0x10000000;


        let drawerLabel = MeshBuilder.CreatePlane("drawerLabel", {width: 1, height: 1, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        drawerLabel.position.y = -0.001;
        drawerLabel.material = new StandardMaterial("", World.scene);
        drawerLabel.material.diffuseTexture = new DynamicTexture("dynamic texture", {width:512, height:256}, World.scene); 
        drawerLabel.material.diffuseTexture.drawText(drawerText, 100, 100, "bold 70px Segoe UI", "black", "transparent", true, true);
        drawerLabel.material.diffuseTexture.hasAlpha = true;
        drawerLabel.rotation = new Vector3(Tools.ToRadians(90),0,0);
        drawerLabel.parent =  currentDrawer
        drawerLabel.layerMask = 0x10000000;






        World.scene.activeCamera = World.arcCamera
        World.arcCamera.attachControl(World.canvas, true);
        let light = new HemisphericLight("light1", new Vector3(1, 1, 0.5), World.scene);




        let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.layer.layerMask = 0x10000000;

        let button = GUI.Button.CreateImageButton("but", "Return", "");
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


    static openNumPad(mesh1,mesh2){
        let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let input = new GUI.InputText();
        input.width = 0.05;
        input.maxWidth = 0.05;
        input.height = "40px";
        input.color = "white";
        input.background = "black";
        advancedTexture.addControl(input);


        let button = GUI.Button.CreateImageButton("SubmitButton", "Submit", "");
        button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        button.width = 0.1;
        button.height = "40px";
        button.color = "white";
        button.background = "black";
        advancedTexture.addControl(button);

        let keyboard = new GUI.VirtualKeyboard();
        keyboard.addKeysRow([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "0",
          "\u2190"
        ]);
        keyboard.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(keyboard);
        keyboard.connect(input);
        advancedTexture.moveFocusToControl(input)

        input.onBlurObservable.add(function() {
            if (1===1) {
                mesh1.dispose()
                mesh2.dispose()
                input.dispose()
                button.dispose()
                IO.socket.emit('room modified', {actionCode: 1})
           }
        });

    }


    static setupWalls(){
        let wall1Left = MeshBuilder.CreateBox("wall1Left", {width: 13, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall1Left.checkCollisions = true;
        wall1Left.material = new StandardMaterial(""); 
        wall1Left.position = new Vector3(-3.5,1,11);
        wall1Left.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        let wall1HiddenDoor = MeshBuilder.CreateBox("wall1HiddenDoor", {width: 4, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall1HiddenDoor.checkCollisions = true;
        wall1HiddenDoor.material = new StandardMaterial(""); 
        wall1HiddenDoor.position = new Vector3(5,1,11);
        wall1HiddenDoor.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        let wall1Right = MeshBuilder.CreateBox("wall1Right", {width: 3, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall1Right.checkCollisions = true;
        wall1Right.material = new StandardMaterial(""); 
        wall1Right.position = new Vector3(8.5,1,11);
        wall1Right.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);
        /*let wall2 = MeshBuilder.CreateBox("wall2", {width: 20, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall2.checkCollisions = true;
        wall2.position = new Vector3(11,1,0);
        wall2.material = new StandardMaterial("");
        wall2.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall2.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);*/

        let wall2Left = MeshBuilder.CreateBox("wall2Left", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall2Left.checkCollisions = true;
        wall2Left.position = new Vector3(11,1,-6);
        wall2Left.material = new StandardMaterial("");
        wall2Left.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall2Left.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        let wall2Right = MeshBuilder.CreateBox("wall2Right", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall2Right.checkCollisions = true;
        wall2Right.position = new Vector3(11,1,6);
        wall2Right.material = new StandardMaterial("");
        wall2Right.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall2Right.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        let wall2Arch = MeshBuilder.CreateBox("wall2Arch", {width: 4, height: 4, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall2Arch.checkCollisions = true;
        wall2Arch.position = new Vector3(11,4,0);
        wall2Arch.material = new StandardMaterial("");
        wall2Arch.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall2Arch.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        let wall2Base = MeshBuilder.CreateBox("wall2Base", {width: 4, height: 2, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall2Base.checkCollisions = true;
        wall2Base.position = new Vector3(11,-1,0);
        wall2Base.material = new StandardMaterial("");
        wall2Base.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall2Base.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);


        let safeBack = MeshBuilder.CreatePlane("safeBack", {height:5, width: 4}, World.scene)
        safeBack.position = new Vector3(12, 1, 0)
        safeBack.material = new StandardMaterial("", World.scene);
        safeBack.rotation = new Vector3(0,Tools.ToRadians(90),0);
        safeBack.checkCollisions = true

        let safeBackBorder = MeshBuilder.CreatePlane("safeBackBorder", {height:5, width: 4}, World.scene)
        safeBackBorder.position = new Vector3(11.5, 1, 0)
        safeBackBorder.rotation = new Vector3(0,Tools.ToRadians(90),0);
        safeBackBorder.checkCollisions = true
        safeBackBorder.isVisible = false; 


        let safeFront = MeshBuilder.CreatePlane("safeFront", {height:2, width: 4}, World.scene)
        safeFront.position = new Vector3(10, 1, 0)
        safeFront.material = new StandardMaterial("", World.scene);
        safeFront.rotation = new Vector3(0,Tools.ToRadians(90),0);
        safeFront.material.diffuseTexture = new Texture("safe_texture.png", World.scene);
        safeBack.checkCollisions = true

        safeFront.actionManager = new ActionManager(World.scene);
        safeFront.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                    //parameter: 'r'
                },
                function () { World.openNumPad(safeFront, safeFrontBorder)}
            )
        );



        let safeFrontBorder = MeshBuilder.CreatePlane("safeFrontBorder", {height:2, width: 4}, World.scene)
        safeFrontBorder.position = new Vector3(9.5, 1, 0);
        safeFrontBorder.rotation = new Vector3(0,Tools.ToRadians(90),0);
        safeFrontBorder.checkCollisions = true;
        safeFrontBorder.isVisible = false; 





        let wall3 = MeshBuilder.CreateBox("wall3", {width: 20, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall3.checkCollisions = true;
        wall3.material = new StandardMaterial(""); 
        wall3.position = new Vector3(0,1,-11);
        wall3.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);


        let wall4Left = MeshBuilder.CreateBox("wall4Left", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Left.checkCollisions = true;
        wall4Left.position = new Vector3(-11,1,-6);
        wall4Left.material = new StandardMaterial("");
        wall4Left.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Left.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        let wall4Right = MeshBuilder.CreateBox("wall4Right", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Right.checkCollisions = true;
        wall4Right.position = new Vector3(-11,1,6);
        wall4Right.material = new StandardMaterial("");
        wall4Right.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Right.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        let wall4Arch = MeshBuilder.CreateBox("wall4Arch", {width: 4, height: 2, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Arch.checkCollisions = true;
        wall4Arch.position = new Vector3(-11,5,0);
        wall4Arch.material = new StandardMaterial("");
        wall4Arch.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Arch.material.diffuseTexture = new Texture("office_wall_texture.jpg", World.scene);

        let wall4Door = MeshBuilder.CreateBox("wall4Door", {width: 4, height: 4, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        wall4Door.checkCollisions = true;
        wall4Door.position = new Vector3(-11,2,0);
        wall4Door.material = new StandardMaterial("");
        wall4Door.rotation = new Vector3(0,Tools.ToRadians(90),0);
        wall4Door.material.diffuseTexture = new Texture("double_door_texture.jpg", World.scene);


        let hallwayLeft = MeshBuilder.CreateBox("hallwayLeft", {width: 12, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        hallwayLeft.checkCollisions = true;
        hallwayLeft.position = new Vector3(2,0,18)
        hallwayLeft.material = new StandardMaterial("");
        hallwayLeft.rotation = new Vector3(0,Tools.ToRadians(90),0);
        hallwayLeft.material.diffuseTexture = new Texture("dungeon_texture.png", World.scene);


        let hallwayTurnLeft = MeshBuilder.CreateBox("hallwayTurnLeft", {width: 8, height: 10, depth: 4, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        hallwayTurnLeft.checkCollisions = true;
        hallwayTurnLeft.position =  new Vector3(7,0,24)
        hallwayTurnLeft.material = new StandardMaterial("");
        hallwayTurnLeft.material.diffuseTexture = new Texture("dungeon_texture.png", World.scene);


        let secretRoomWall1 = MeshBuilder.CreateBox("secretRoomWall1", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        secretRoomWall1.checkCollisions = true;
        secretRoomWall1.position = new Vector3(15,0,25)
        secretRoomWall1.material = new StandardMaterial("");
        secretRoomWall1.material.diffuseTexture = new Texture("dungeon_texture.png", World.scene);

        let secretRoomWall2 = MeshBuilder.CreateBox("secretRoomWall2", {width: 10, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        secretRoomWall2.checkCollisions = true;
        secretRoomWall2.position = new Vector3(20,0,20)
        secretRoomWall2.material = new StandardMaterial("");
        secretRoomWall2.rotation = new Vector3(0,Tools.ToRadians(90),0);
        secretRoomWall2.material.diffuseTexture = new Texture("dungeon_texture.png", World.scene);

        let secretRoomWall3 = MeshBuilder.CreateBox("secretRoomWall3", {width: 8, height: 10, depth: 2, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        secretRoomWall3.checkCollisions = true;
        secretRoomWall3.position = new Vector3(15,0,15)
        secretRoomWall3.material = new StandardMaterial("");
        secretRoomWall3.material.diffuseTexture = new Texture("dungeon_texture.png", World.scene);

        let secretRoomWall4 = MeshBuilder.CreateBox("secretRoomWall4", {width: 7, height: 10, depth: 4, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        secretRoomWall4.checkCollisions = true;
        secretRoomWall4.position = new Vector3(9,0,15.5)
        secretRoomWall4.material = new StandardMaterial("");
        secretRoomWall4.rotation = new Vector3(0,Tools.ToRadians(90),0);
        secretRoomWall4.material.diffuseTexture = new Texture("dungeon_texture.png", World.scene);

        let roof = MeshBuilder.CreateBox("roof", {width: 20, height: 2, depth: 20, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        roof.position = new Vector3(0,7,0);
        roof.material = new StandardMaterial("");
        roof.material.diffuseTexture = new Texture("wall_texture.jpg", World.scene);

        SceneLoader.ImportMesh("","","plant_with_color.babylon", World.scene, function(newMeshes){
            newMeshes.forEach((mesh) => {
            mesh.position = mesh.position.add(new Vector3(-3,0,-3))
            mesh.scaling = new Vector3(0.4, 0.4, 0.4);
            })
            let box = MeshBuilder.CreateBox("myBox", {height: 13, width: 3, depth: 3}, World.scene);
            box.isVisible = false;    
            box.parent =  newMeshes[1];
            box.checkCollisions = true;



    
            //do nothing
        })

         SceneLoader.ImportMesh("","","bookshelfFrida.babylon", World.scene, function(newMeshes){
            console.log(newMeshes)
            newMeshes.forEach((mesh) => {
            mesh.parent = wall1Left

            mesh.scaling = new Vector3(0.45, 0.45, 0.45);
            mesh.rotation = new Vector3(Tools.ToRadians(-90),Tools.ToRadians(180),0);
            mesh.position = mesh.position.add(new Vector3(8,1,-2))
            })
            let box = MeshBuilder.CreateBox("fridaBox", {height: 10, width: 6, depth: 5}, World.scene);
            box.position = box.position.add(new Vector3(3,0,-2))
            box.rotation = new Vector3(Tools.ToRadians(-90),0,0);

            box.isVisible = false;   
            box.parent =  newMeshes[0];
            box.checkCollisions = true;
            World.setUpBooks(newMeshes[0], wall1HiddenDoor)



    
            //do nothing
        })

        SceneLoader.ImportMesh("","","chair.glb", World.scene, function(newMeshes){
            newMeshes.forEach((mesh) => {
            mesh.scaling = new Vector3(1.5, 1.5, 1.5);
            mesh.position = new Vector3(6,0,-5)

            })
            let box = MeshBuilder.CreateBox("chairBox", {height: 2, width: 0.55, depth: 0.7}, World.scene);
            box.isVisible = false;    
            box.parent =  newMeshes[1];
            box.checkCollisions = true;
        })

        SceneLoader.ImportMesh("","","desk.glb", World.scene, function(newMeshes){
            newMeshes.forEach((mesh) => {
            mesh.scaling = new Vector3(1.5, 1.5, 1.5);
            mesh.position = new Vector3(10,0,-10)
            })

            let box = MeshBuilder.CreateBox("deskBox", {height: 2, width: 1.5, depth: 1}, World.scene);
            box.isVisible = false;    
            box.parent =  newMeshes[1];
            box.checkCollisions = true;
            World.setUpDrawers(newMeshes[1])

         })

        SceneLoader.ImportMesh("","","clock.glb", World.scene, function(newMeshes){
            newMeshes.forEach((mesh) => {
            mesh.parent = wall1Left
            mesh.position = mesh.position.add(new Vector3(-2,2,-1))
            mesh.rotation = new Vector3(Tools.ToRadians(-90),0,0);
            mesh.scaling = new Vector3(3.5, 3.5, 3.5)
            })

         })

        SceneLoader.ImportMesh("","","Clock1.babylon", World.scene, function(newMeshes){
            /*const clockRadius = 0.85;
            const clockPath = [
                new Vector3(0.0, 0.0, 0.0),
                new Vector3(0.0, 0.01, 0.0)
            ];*/
            newMeshes.forEach((mesh) => {
            mesh.parent = wall3
            mesh.position = mesh.position.add(new Vector3(2,2,1))
            mesh.rotation = new Vector3(Tools.ToRadians(90),0,0);
            mesh.scaling = new Vector3(0.6, 0.6, 0.6)
            //let clockFace = MeshBuilder.CreateTube("box", {path: clockPath, tessellation:100, cap: 1, radius: clockRadius, sideOrientation: Mesh.DOUBLESIDE, updatable: true}, World.scene);
            let clockFace = MeshBuilder.CreatePlane("clockFace", {width: 1.65, height: 1.65, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
            clockFace.position = clockFace.position.add(new Vector3(0,0.2,0))
            clockFace.rotation = new Vector3(Tools.ToRadians(90),0,Tools.ToRadians(180));
            clockFace.parent = mesh
            clockFace.material = new StandardMaterial("");
            clockFace.material.diffuseTexture = new Texture("oldclocktexture.png", World.scene);
            clockFace.material.diffuseTexture.hasAlpha = true;
            })

         })



        let clockLabel = MeshBuilder.CreatePlane("clockLabel", {width: 1, height: 1, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        clockLabel.parent = wall1Left
        clockLabel.position = clockLabel.position.add(new Vector3(-2,1.7,-1.1))
        clockLabel.material = new StandardMaterial("", World.scene);
        clockLabel.material.diffuseTexture = new DynamicTexture("dynamic texture", {width:512, height:256}, World.scene); 
        clockLabel.material.diffuseTexture.drawText("X", 100, 100, "bold 70px Segoe UI", "green", "transparent", true, true);
        clockLabel.material.diffuseTexture.hasAlpha = true;


        let clockLabel2 = MeshBuilder.CreatePlane("clockLabel", {width: 1, height: 1, sideOrientation: Mesh.DOUBLESIDE}, World.scene);
        clockLabel2.parent = wall1Left
        clockLabel2.position = clockLabel2.position.add(new Vector3(7,2,-2))
        clockLabel2.material = new StandardMaterial("", World.scene);
        clockLabel2.material.diffuseTexture = new DynamicTexture("dynamic texture", {width:512, height:256}, World.scene); 
        clockLabel2.material.diffuseTexture.drawText("X", 100, 100, "bold 70px Segoe UI", "green", "transparent", true, true);
        clockLabel2.material.diffuseTexture.hasAlpha = true;
    }

    static clickBook(bookNumber,wall1HiddenDoor){
        if(bookNumber === 1){
            World.booksClicked = 1
        }
        else if(bookNumber === World.booksClicked + 1){
            World.booksClicked += 1
        }
        if(World.booksClicked === 4){
            wall1HiddenDoor.dispose()
        }

    }

    static setUpBooks(bookShelfMesh,wall1HiddenDoor){

        let mat = new StandardMaterial("invisible", World.scene);
        mat.alpha = 0;

        let book1 = MeshBuilder.CreatePlane("book1", {height:0.9, width: 0.14, sideOrientation: Mesh.DOUBLESIDE}, World.scene)
        book1.parent = bookShelfMesh
        //book1.position = new Vector3(0.355,0.595,0.30)
        book1.position = book1.position.add(new Vector3(3.2,-1.2,-5.2))
        book1.rotation = new Vector3(Tools.ToRadians(90),0,0);
        book1.material = new StandardMaterial("", World.scene);
        book1.material.diffuseColor = new Color3.Green();
        book1.material = mat;

        book1.actionManager = new ActionManager(World.scene);
        book1.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                    //parameter: 'r'
                },
                function () {World.clickBook(3,wall1HiddenDoor) }
            )
        );

        let book2 = MeshBuilder.CreatePlane("book2", {height:0.9, width: 0.14, sideOrientation: Mesh.DOUBLESIDE}, World.scene)
        book2.parent = bookShelfMesh
        book2.position = book2.position.add(new Vector3(3.04,-1.2,-5.2))
        book2.rotation = new Vector3(Tools.ToRadians(90),0,0);
        book2.material = new StandardMaterial("", World.scene);
        book2.material.diffuseColor = new Color3.Red();
        book2.material = mat;


        book2.actionManager = new ActionManager(World.scene);
        book2.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                },
                function () {World.clickBook(4,wall1HiddenDoor) }
            )
        );

        let book3 = MeshBuilder.CreatePlane("book3", {height:0.9, width: 0.14, sideOrientation: Mesh.DOUBLESIDE}, World.scene)
        book3.parent = bookShelfMesh
        //book1.position = new Vector3(0.355,0.595,0.30)
        book3.position = book3.position.add(new Vector3(2.86,-1.2,-5.2))
        book3.rotation = new Vector3(Tools.ToRadians(90),0,0);
        book3.material = new StandardMaterial("", World.scene);
        book3.material.diffuseColor = new Color3.Blue();
        book3.material = mat;
        //book3.isVisible = false


        book3.actionManager = new ActionManager(World.scene);
        book3.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                },
                function () {World.clickBook(1,wall1HiddenDoor) }
            )
        );

        let book4 = MeshBuilder.CreatePlane("book4", {height:0.9, width: 0.14, sideOrientation: Mesh.DOUBLESIDE}, World.scene)
        book4.parent = bookShelfMesh
        //book1.position = new Vector3(0.355,0.595,0.30)
        book4.position = book4.position.add(new Vector3(2.68,-1.2,-5.2))
        book4.rotation = new Vector3(Tools.ToRadians(90),0,0);
        book4.material = new StandardMaterial("", World.scene);
        book4.material.diffuseColor = new Color3(0, 206/255, 209/255)
        book4.material = mat;
        //book4.isVisible = false

        book4.actionManager = new ActionManager(World.scene);
        book4.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                },
                function () {World.clickBook(2,wall1HiddenDoor) }
            )
        );
    }

    static setUpDrawers(deskMesh) {
        let drawer1 = MeshBuilder.CreatePlane("plane1", {height:0.14, width: 0.46, sideOrientation: Mesh.DOUBLESIDE}, World.scene)
        drawer1.parent = deskMesh
        drawer1.position = new Vector3(0.355,0.595,0.30)
        drawer1.material = new StandardMaterial("", World.scene);
        drawer1.material.diffuseColor = new Color3.Green();

        drawer1.actionManager = new ActionManager(World.scene);
        drawer1.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                },
                function () { World.scene.activeCamera == World.camera ? World.openDrawer(1) : World.closeDrawer()}
            )
        );
  

        let drawer2 = MeshBuilder.CreatePlane("plane2", {height:0.14, width: 0.46, sideOrientation: Mesh.DOUBLESIDE}, World.scene)
        drawer2.parent = deskMesh
        drawer2.position = new Vector3(0.355,0.445,0.30)
        drawer2.material = new StandardMaterial("", World.scene);
        drawer2.material.diffuseColor = new Color3.Red(); 


        drawer2.actionManager = new ActionManager(World.scene);
        drawer2.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                    //parameter: 'r'
                },
                function () { World.scene.activeCamera == World.camera ? World.openDrawer(2) : World.closeDrawer()}
            )
        );

        let drawer3 = MeshBuilder.CreatePlane("plane3", {height:0.14, width: 0.46, sideOrientation: Mesh.DOUBLESIDE}, World.scene)
        drawer3.parent = deskMesh
        drawer3.position = new Vector3(0.355,0.295,0.30)
        drawer3.material = new StandardMaterial("", World.scene);
        drawer3.material.diffuseColor = new Color3.Blue();

        drawer3.actionManager = new ActionManager(World.scene);
        drawer3.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                },
                function () { World.scene.activeCamera == World.camera ? World.openDrawer(3) : World.closeDrawer()}
            )
        );

        let drawer4 = MeshBuilder.CreatePlane("plane4", {height:0.14, width: 0.46, sideOrientation: Mesh.DOUBLESIDE}, World.scene)
        drawer4.parent = deskMesh
        drawer4.position = new Vector3(0.355,0.15,0.30)
        drawer4.material = new StandardMaterial("", World.scene);
        drawer4.material.diffuseColor = new Color3(0, 206/255, 209/255)
        drawer4.actionManager = new ActionManager(World.scene);
        drawer4.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger
                },
                function () { World.scene.activeCamera == World.camera ? World.openDrawer(4) : World.closeDrawer()}
            )
        );         

    }
    
    static setupLights() {
        let light0 = new DirectionalLight("Omni", new Vector3(-7,5,17), World.scene);
        let light1 = new PointLight("Omni", new Vector3(-3,5,13), World.scene); 
  
    }
    

}

World.cameraDistance = 1.5;