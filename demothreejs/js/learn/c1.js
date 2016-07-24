var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);
$("#WebGL-output").append(renderer.domElement);
var axes = new THREE.AxisHelper(20);
scene.add(axes);

var planeGeom = new THREE.PlaneGeometry(60, 20, 1, 1);
var planeMat = new THREE.MeshBasicMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeom, planeMat);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

var cubeGeom = new THREE.CubeGeometry(4, 4, 4);
var cubeMat = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
var cube = new THREE.Mesh(cubeGeom, cubeMat);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

var sphereGeom = new THREE.SphereGeometry(4, 20, 20);
var sphereMat = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
var sphere = new THREE.Mesh(sphereGeom, sphereMat);
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
scene.add(sphere);

renderer.render(scene, camera);