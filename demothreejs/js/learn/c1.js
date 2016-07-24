var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
$("#WebGL-output").append(renderer.domElement);
var axes = new THREE.AxisHelper(20);
scene.add(axes);
var stats = initStats();
var controls = new function() {
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.03;
}
var gui = new DAT.GUI();
gui.add(controls, "rotationSpeed", 0, 0.5);
gui.add(controls, "bouncingSpeed", 0, 0.5);


var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);

var planeGeom = new THREE.PlaneGeometry(60, 20, 1, 1);
var planeMat = new THREE.MeshLambertMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeom, planeMat);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;
scene.add(plane);

var cubeGeom = new THREE.CubeGeometry(4, 4, 4);
var cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000});
var cube = new THREE.Mesh(cubeGeom, cubeMat);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
cube.castShadow = true;
scene.add(cube);

var sphereGeom = new THREE.SphereGeometry(4, 20, 20);
var sphereMat = new THREE.MeshLambertMaterial({color: 0x7777ff});
var sphere = new THREE.Mesh(sphereGeom, sphereMat);
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow = true;
scene.add(sphere);

renderScene();

var step = 0;
function renderScene() {
  requestAnimationFrame(renderScene);
  stats.update();
  rotateCube();
  bounceSphere();
  renderer.render(scene, camera);
}

function initStats() {
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.left = "0px";
  stats.domElement.top = "0px";
  $("#Stats-output").append(stats.domElement);
  return stats;
}

function rotateCube() {
  cube.rotation.x += controls.rotationSpeed;
  cube.rotation.y += controls.rotationSpeed;
  cube.rotation.z += controls.rotationSpeed;
}

function bounceSphere() {
  step += controls.bouncingSpeed;
  sphere.position.x = 20 + 10*Math.cos(step);
  sphere.position.y = 2 + 10*Math.abs(Math.sin(step));
}