(this.webpackJsonpescapegame=this.webpackJsonpescapegame||[]).push([[0],{288:function(e,n,t){},319:function(e,n,t){},326:function(e,n){},328:function(e,n){},342:function(e,n,t){"use strict";t.r(n);var i=t(61),a=t(35),o=t.n(a),r=t(279),s=t.n(r),c=(t(288),t(282)),l=t(224),u=t(90),h=t(91),d=t(13),w=t(77),p=function(){function e(n,t){Object(u.a)(this,e),console.log(t),this.playerMesh=n,this.username=t,this.create()}return Object(h.a)(e,[{key:"create",value:function(){this.mesh=d.k.CreatePlane("billboard",{width:e.width,height:e.height},g.scene),this.mesh.position=d.s.Zero(),this.mesh.position.y=f.height-e.height;var n=w.a.CreateForMesh(this.mesh,1024,256);n.name="AvatarBillboard";var t=new w.e("container");t.thickness=0,t.height="100px",t.width="800px",n.addControl(t),this.text=new w.f,this.text.fontFamily="Arial",this.text.fontWeight="bold",this.text.color="white",this.text.outlineColor="black",this.text.outlineWidth=40,this.text.fontSize=100,t.addControl(this.text),this.text.text=this.username,this.mesh.billboardMode=d.j.BILLBOARDMODE_ALL,this.mesh.parent=this.playerMesh}}]),e}();p.height=1,p.width=3;var m=function(){function e(){Object(u.a)(this,e)}return Object(h.a)(e,null,[{key:"init",value:function(){window.addEventListener("keydown",this.keydownEvent),window.addEventListener("keyup",this.keyupEvent),window.addEventListener("blur",this.keyupEvent)}},{key:"keydownEvent",value:function(n){switch(n.keyCode){case 38:case 87:n.preventDefault(),e.key.up=!0;break;case 37:case 65:e.key.left=!0;break;case 39:case 68:e.key.right=!0;break;case 40:case 83:e.key.down=!0}}},{key:"keyupEvent",value:function(n){switch(n.keyCode){case 38:case 87:n.preventDefault(),e.key.up=!1;break;case 37:case 65:e.key.left=!1;break;case 39:case 68:e.key.right=!1;break;case 40:case 83:e.key.down=!1}}}]),e}();m.key={down:!1,up:!1,left:!1,right:!1};var f=function(){function e(){Object(u.a)(this,e)}return Object(h.a)(e,null,[{key:"init",value:function(n){e.mesh=d.k.CreateBox("avatar",{height:e.height,width:1,depth:1},g.scene),e.mesh.position=d.s.Zero(),e.mesh.position.y=e.height/2,e.mesh.isVisible=!1,e.username=n}},{key:"send",value:function(){var n=e.mesh.position.x,t=e.mesh.position.y,i=e.mesh.position.z,a=e.absoluteRotation;C.socket.emit("transform",{command:"playerMoved",x:n,y:t,z:i,rotation:a})}},{key:"update",value:function(n,t){null!==e.mesh&&(e.mesh.position=n,e.absoluteRotation+=t.y,e.send())}}]),e}();f.absoluteRotation=0,f.height=3,f.mesh=null,f.rotationSpeed=.01,f.walkSpeed=.007;t(341),t(289);d.d.prototype.displayLoadingUI=function(){if(document.getElementById("customLoadingScreenDiv"))document.getElementById("customLoadingScreenDiv").style.display="initial";else{this._loadingDiv=document.createElement("div"),this._loadingDiv.id="customLoadingScreenDiv",this._loadingDiv.innerHTML="Preparing room...";var e=document.createElement("style");e.type="text/css",e.innerHTML="\n    #customLoadingScreenDiv{\n        background-color: lightBlue;\n        color: white;\n        font-size:50px;\n        text-align:center;\n        padding-top: 20%;\n    }\n    ",document.getElementsByTagName("head")[0].appendChild(e),this._resizeLoadingUI(),window.addEventListener("resize",this._resizeLoadingUI),document.body.appendChild(this._loadingDiv)}};var g=function(){function e(){Object(u.a)(this,e)}return Object(h.a)(e,null,[{key:"init",value:function(){e.canvas=document.getElementById("canvas");var n=new d.f(e.canvas,!0);e.scene=new d.n(n),e.scene.gravity=new d.s(0,-.9,0),e.scene.collisionsEnabled=!0,e.setupCamera(),e.setupLights(),e.setupGround(),e.setupWalls(),n.runRenderLoop((function(){e.scene.render(),f.update(e.camera.position,e.camera.cameraRotation)})),n.displayLoadingUI(),e.scene.executeWhenReady((function(){document.getElementById("customLoadingScreenDiv").remove()})),window.addEventListener("resize",(function(){n.resize()}))}},{key:"roomModification",value:function(n){switch(n){case 1:e.scene.getMeshByName("safeFront").dispose(),e.scene.getMeshByName("safeFrontBorder").dispose()}}},{key:"setupCamera",value:function(){e.camera=new d.h("FreeCamera",new d.s(-5,2,-5),e.scene),e.camera.attachControl(e.canvas,!0),e.scene.activeCamera=e.camera,e.camera.checkCollisions=!0,e.camera.applyGravity=!0,e.camera.ellipsoid=new d.s(1,.66,1),e.camera.speed=.1,e.camera.keysUp.push(87),e.camera.keysDown.push(83),e.camera.keysRight.push(68),e.camera.keysLeft.push(65),e.arcCamera=new d.b("ArcCamera",3*Math.PI/2,3*Math.PI/8,3,new d.s(0,0,0),e.scene),e.arcCamera.layerMask=268435456}},{key:"setupGround",value:function(){var n=d.j.CreatePlane("ground",20,e.scene);n.material=new d.p("groundMat",e.scene),n.material.diffuseTexture=new d.q("wood_floor_texture.jpg",e.scene),n.position=new d.s(0,0,0),n.rotation=new d.s(Math.PI/2,0,0),n.checkCollisions=!0}},{key:"openDrawer",value:function(n){var t,i=[new d.s(0,0,0),new d.s(0,.5,0)],a=d.k.CreateTube("currentDrawer",{path:i,tessellation:4,cap:1,radius:1,sideOrientation:d.j.DOUBLESIDE,updatable:!0},e.scene);switch(a.material=new d.p("",e.scene),a.material.diffuseTexture=new d.q("desk_texture.png",e.scene),a.layerMask=268435456,n){case 1:t=new d.c.Blue;break;case 2:t=new d.c.Green;break;case 3:t=new d.c.Red;break;case 4:t=new d.c.Purple}var o=d.k.CreateBox("clue",{width:.1,height:.1,depth:.1,sideOrientation:d.j.DOUBLESIDE},e.scene);o.position.y=.051,o.material=new d.p("",e.scene),o.material.diffuseColor=t,o.parent=a,o.layerMask=268435456,e.scene.activeCamera=e.arcCamera,e.arcCamera.attachControl(e.canvas,!0);var r=new d.i("light1",new d.s(1,1,.5),e.scene),s=w.a.CreateFullscreenUI("UI");s.layer.layerMask=268435456;var c=w.b.CreateImageButton("but","Return","");c.horizontalAlignment=w.c.HORIZONTAL_ALIGNMENT_RIGHT,c.verticalAlignment=w.c.VERTICAL_ALIGNMENT_TOP,c.width=.1,c.height="40px",c.color="white",c.background="green",c.onPointerUpObservable.add((function(){e.closeDrawer(a,r)})),s.addControl(c)}},{key:"closeDrawer",value:function(n,t){n.dispose(),e.scene.activeCamera=e.camera,t.dispose()}},{key:"openNumPad",value:function(e,n){var t=w.a.CreateFullscreenUI("UI"),i=new w.d;i.width=.05,i.maxWidth=.05,i.height="40px",i.color="white",i.background="black",t.addControl(i);var a=w.b.CreateImageButton("SubmitButton","Submit","");a.horizontalAlignment=w.c.HORIZONTAL_ALIGNMENT_RIGHT,a.verticalAlignment=w.c.VERTICAL_ALIGNMENT_BOTTOM,a.width=.1,a.height="40px",a.color="white",a.background="black",t.addControl(a);var o=new w.g;o.addKeysRow(["1","2","3","4","5","6","7","8","9","0","\u2190"]),o.verticalAlignment=w.c.VERTICAL_ALIGNMENT_BOTTOM,t.addControl(o),o.connect(i),t.moveFocusToControl(i),i.onBlurObservable.add((function(){e.dispose(),n.dispose(),i.dispose(),a.dispose(),C.socket.emit("room modified",{actionCode:1})}))}},{key:"closeNumPad",value:function(){}},{key:"setupWalls",value:function(){var n=d.k.CreateBox("wall1",{width:20,height:10,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);n.checkCollisions=!0,n.material=new d.p(""),n.position=new d.s(0,1,11),n.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var t=d.k.CreateBox("wall2Left",{width:8,height:10,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);t.checkCollisions=!0,t.position=new d.s(11,1,-6),t.material=new d.p(""),t.rotation=new d.s(0,d.r.ToRadians(90),0),t.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var i=d.k.CreateBox("wall2Right",{width:8,height:10,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);i.checkCollisions=!0,i.position=new d.s(11,1,6),i.material=new d.p(""),i.rotation=new d.s(0,d.r.ToRadians(90),0),i.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var a=d.k.CreateBox("wall2Arch",{width:4,height:4,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);a.checkCollisions=!0,a.position=new d.s(11,4,0),a.material=new d.p(""),a.rotation=new d.s(0,d.r.ToRadians(90),0),a.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var o=d.k.CreateBox("wall2Base",{width:4,height:2,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);o.checkCollisions=!0,o.position=new d.s(11,-1,0),o.material=new d.p(""),o.rotation=new d.s(0,d.r.ToRadians(90),0),o.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var r=d.k.CreatePlane("safeBack",{height:5,width:4},e.scene);r.position=new d.s(12,1,0),r.material=new d.p("",e.scene),r.rotation=new d.s(0,d.r.ToRadians(90),0),r.checkCollisions=!0;var s=d.k.CreatePlane("safeBackBorder",{height:5,width:4},e.scene);s.position=new d.s(11.5,1,0),s.rotation=new d.s(0,d.r.ToRadians(90),0),s.checkCollisions=!0,s.isVisible=!1;var c=d.k.CreatePlane("safeFront",{height:2,width:4},e.scene);c.position=new d.s(10,1,0),c.material=new d.p("",e.scene),c.rotation=new d.s(0,d.r.ToRadians(90),0),c.material.diffuseTexture=new d.q("safe_texture.png",e.scene),r.checkCollisions=!0,c.actionManager=new d.a(e.scene),c.actionManager.registerAction(new d.g({trigger:d.a.OnPickTrigger},(function(){e.openNumPad(c,l)})));var l=d.k.CreatePlane("safeFrontBorder",{height:2,width:4},e.scene);l.position=new d.s(9.5,1,0),l.rotation=new d.s(0,d.r.ToRadians(90),0),l.checkCollisions=!0,l.isVisible=!1;var u=d.k.CreateBox("wall3",{width:20,height:10,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);u.checkCollisions=!0,u.material=new d.p(""),u.position=new d.s(0,1,-11),u.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var h=d.k.CreateBox("wall4Left",{width:8,height:10,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);h.checkCollisions=!0,h.position=new d.s(-11,1,-6),h.material=new d.p(""),h.rotation=new d.s(0,d.r.ToRadians(90),0),h.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var w=d.k.CreateBox("wall4Right",{width:8,height:10,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);w.checkCollisions=!0,w.position=new d.s(-11,1,6),w.material=new d.p(""),w.rotation=new d.s(0,d.r.ToRadians(90),0),w.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var p=d.k.CreateBox("wall4Arch",{width:4,height:2,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);p.checkCollisions=!0,p.position=new d.s(-11,5,0),p.material=new d.p(""),p.rotation=new d.s(0,d.r.ToRadians(90),0),p.material.diffuseTexture=new d.q("office_wall_texture.jpg",e.scene);var m=d.k.CreateBox("wall4Door",{width:4,height:4,depth:2,sideOrientation:d.j.DOUBLESIDE},e.scene);m.checkCollisions=!0,m.position=new d.s(-11,2,0),m.material=new d.p(""),m.rotation=new d.s(0,d.r.ToRadians(90),0),m.material.diffuseTexture=new d.q("double_door_texture.jpg",e.scene);var f=d.k.CreateBox("roof",{width:20,height:2,depth:20,sideOrientation:d.j.DOUBLESIDE},e.scene);f.position=new d.s(0,7,0),f.material=new d.p(""),f.material.diffuseTexture=new d.q("wall_texture.jpg",e.scene),d.o.ImportMesh("","","plant_with_color.babylon",e.scene,(function(n){n.forEach((function(e){e.scaling=new d.s(.4,.4,.4)}));var t=d.k.CreateBox("myBox",{height:13,width:3,depth:3},e.scene);t.isVisible=!1,t.parent=n[1],t.checkCollisions=!0})),d.o.ImportMesh("","","bookshelfFrida.babylon",e.scene,(function(e){e.forEach((function(e){e.parent=n,e.scaling=new d.s(.4,.4,.4),e.rotation=new d.s(d.r.ToRadians(-90),d.r.ToRadians(180),0),e.position=e.position.add(new d.s(6,0,-2))}))})),d.o.ImportMesh("","","chair.glb",e.scene,(function(n){n.forEach((function(e){e.scaling=new d.s(1.5,1.5,1.5),e.position=new d.s(6,0,-5)}));var t=d.k.CreateBox("myBox",{height:2,width:.55,depth:.7},e.scene);t.isVisible=!1,t.parent=n[1],t.checkCollisions=!0})),d.o.ImportMesh("","","desk.glb",e.scene,(function(n){n.forEach((function(e){e.scaling=new d.s(1.5,1.5,1.5),e.position=new d.s(10,0,-10)}));var t=d.k.CreateBox("myBox",{height:2,width:1.5,depth:1},e.scene);t.isVisible=!1,t.parent=n[1],t.checkCollisions=!0})),d.o.ImportMesh("","","clock.glb",e.scene,(function(e){console.log(e),e.forEach((function(e){e.parent=n,e.position=e.position.add(new d.s(-2,2,-1)),e.rotation=new d.s(d.r.ToRadians(-90),0,0),e.scaling=new d.s(3.5,3.5,3.5)}))}));var g=d.k.CreatePlane("plane1",{height:.3,width:1},e.scene);g.position=new d.s(-5.8,1.34,4.3),g.material=new d.p("",e.scene),g.material.diffuseColor=new d.c.Blue,g.actionManager=new d.a(e.scene),g.actionManager.registerAction(new d.g({trigger:d.a.OnPickTrigger},(function(){e.scene.activeCamera==e.camera?e.openDrawer(1):e.closeDrawer()})));var v=d.k.CreatePlane("plane2",{height:.3,width:1},e.scene);v.position=new d.s(-5.8,1,4.3),v.material=new d.p("",e.scene),v.material.diffuseColor=new d.c.Green,v.actionManager=new d.a(e.scene),v.actionManager.registerAction(new d.g({trigger:d.a.OnPickTrigger},(function(){e.scene.activeCamera==e.camera?e.openDrawer(2):e.closeDrawer()})));var k=d.k.CreatePlane("plane3",{height:.3,width:1},e.scene);k.position=new d.s(-5.8,.66,4.3),k.material=new d.p("",e.scene),k.material.diffuseColor=new d.c.Red,k.actionManager=new d.a(e.scene),k.actionManager.registerAction(new d.g({trigger:d.a.OnPickTrigger},(function(){e.scene.activeCamera==e.camera?e.openDrawer(3):e.closeDrawer()})));var b=d.k.CreatePlane("plane4",{height:.3,width:1},e.scene);b.position=new d.s(-5.8,.32,4.3),b.material=new d.p("",e.scene),b.material.diffuseColor=new d.c.Purple,b.actionManager=new d.a(e.scene),b.actionManager.registerAction(new d.g({trigger:d.a.OnPickTrigger},(function(){e.scene.activeCamera==e.camera?e.openDrawer(4):e.closeDrawer()})))}},{key:"setupLights",value:function(){new d.e("Omni",new d.s(-7,5,17),e.scene),new d.l("Omni",new d.s(-3,5,13),e.scene)}}]),e}();g.cameraDistance=1.5;var v=t(239),k=function(){function e(n,t){Object(u.a)(this,e);this.id=n,this.mesh=d.k.CreateBox("avatar",{height:3,width:1,depth:1},g.scene),this.mesh.position=d.s.Zero(),this.mesh.position.x=0,this.mesh.position.y=1.5,this.mesh.position.z=0,this.mesh.material=e.material,this.billboard=new p(this.mesh,t),e.all.push(this)}return Object(h.a)(e,[{key:"destroy",value:function(){this.billboard.mesh.dispose(),this.mesh.dispose()}},{key:"transform",value:function(e,n,t,i){this.mesh.position.x=e,this.mesh.position.y=n,this.mesh.position.z=t,this.mesh.rotationQuaternion=d.m.FromEulerAngles(0,-i,0)}}],[{key:"find",value:function(n,t){var i,a=Object(v.a)(e.all);try{for(a.s();!(i=a.n()).done;){var o=i.value;if(o.id===n)return o}}catch(r){a.e(r)}finally{a.f()}return console.log(n,t),new e(n,t)}},{key:"init",value:function(){e.material=new d.p("matPlayer",g.scene),e.material.diffuseColor=new d.c.Red}},{key:"move",value:function(n){var t=parseInt(n.id);e.find(t,n.username).transform(n.x,n.y,n.z,n.rotation)}},{key:"remove",value:function(n){var t,i=Object(v.a)(e.all);try{for(i.s();!(t=i.n()).done;){var a=t.value;if(a.id===n.id){a.destroy();break}}}catch(o){i.e(o)}finally{i.f()}e.all=e.all.filter((function(e){return e.id!==n.id}))}}]),e}();k.all=new Array;var b=t(280),y=t.n(b),C=function(){function e(){Object(u.a)(this,e)}return Object(h.a)(e,null,[{key:"init",value:function(){e.currentRoomId=null,console.log("production"),e.socket=y()(),e.socket.on("auth",(function(n){n.success?(e.currentRoomId=n.roomId,g.init(),k.init(),f.init(n.username),m.init()):console.log("THAT ROOM DOESN'T EXIST")})),e.socket.on("transform",(function(e){switch(e.command){case"playerGone":k.remove(e);break;case"playerMoved":k.move(e)}})),e.socket.on("room modified",(function(e){g.roomModification(e.actionCode)}))}},{key:"login",value:function(n,t){e.socket.emit("login",{username:n,roomId:t})}}]),e}(),O=function(e){var n=Object(a.useState)(""),t=Object(l.a)(n,2),o=t[0],r=t[1];return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Welcome"}),Object(i.jsx)("span",{children:"Username: "}),Object(i.jsx)("input",{onChange:function(e){return r(e.target.value)},type:"text",id:"username"}),Object(i.jsx)("button",{id:"login",onClick:function(){return C.login(o,e.roomId)},children:e.roomId?"Join Group":"Create Group"})]})},x=(t(319),t(240)),j=t.n(x),I=t(59);C.init();var E=function(e){var n=Object(a.useRef)();return Object(a.useEffect)((function(){e.peer.on("stream",(function(e){n.current.srcObject=e}))}),[]),Object(i.jsx)("audio",{autoPlay:!0,ref:n})},D=function(e){var n=Object(a.useState)([]),t=Object(l.a)(n,2),o=t[0],r=t[1],s=Object(a.useRef)(),u=(Object(a.useRef)(),Object(a.useRef)([])),h=Object(I.f)().roomId;return Object(a.useEffect)((function(){s.current=C.socket,navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){s.current.on("all users",(function(n){var t=[];n.forEach((function(n){var i=function(e,n,t){var i=new j.a({initiator:!0,trickle:!1,stream:t});return i.on("signal",(function(t){s.current.emit("sending signal",{userToSignal:e,callerID:n,signal:t})})),i}(n,s.current.id,e);u.current.push({peerID:n,peer:i}),t.push(i)})),r(t)})),s.current.on("user joined",(function(n){var t=function(e,n,t){var i=new j.a({initiator:!1,trickle:!1,stream:t});return i.on("signal",(function(e){s.current.emit("returning signal",{signal:e,callerID:n})})),i.signal(e),i}(n.signal,n.callerID,e);u.current.push({peerID:n.callerID,peer:t}),r((function(e){return[].concat(Object(c.a)(e),[t])}))})),s.current.on("receiving returned signal",(function(e){u.current.find((function(n){return n.peerID===e.id})).peer.signal(e.signal)}))}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)(O,{roomId:h}),o.map((function(e,n){return Object(i.jsx)(E,{peer:e},n)})),Object(i.jsx)("p",{children:C.currentRoomId&&"Share this link to invite others to your escape room: "+window.location.href+C.currentRoomId}),Object(i.jsx)("canvas",{id:"canvas",style:{width:"100%",height:"100%"}})]})},T=t(238),B=function(){return Object(i.jsx)(T.a,{children:Object(i.jsx)(I.c,{children:Object(i.jsx)(I.a,{path:"/:roomId?",children:Object(i.jsx)(D,{})})})})},L=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,343)).then((function(n){var t=n.getCLS,i=n.getFID,a=n.getFCP,o=n.getLCP,r=n.getTTFB;t(e),i(e),a(e),o(e),r(e)}))};s.a.render(Object(i.jsx)(o.a.StrictMode,{children:Object(i.jsx)(B,{})}),document.getElementById("root")),L()}},[[342,1,2]]]);
//# sourceMappingURL=main.58835664.chunk.js.map