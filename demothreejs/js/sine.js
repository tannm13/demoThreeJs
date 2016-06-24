window.addEventListener('load', init, false);

var radius = 5;
var obj_resolution = 360;
var waves_amount = 12;
var wave_height = 0.1*radius;
var sine_pct = 0.5;
var counter = 0;

function init() {
  createScene();

  createCircle();

  loop();
}

function loop() {
  counter++;

  for (var i = 0; i < waves.length; i++) {
    waves[i].geometry.vertices = generatePoints(i);
    waves[i].geometry.verticesNeedUpdate = true;
  }

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

function createScene() {
  var _w = 500;
  var _h = 500;
  var aspect = _w/_h;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(65, _w/_h, 0.1, 1000);
  camera.position.z = 10;
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(new THREE.Color(0x221f26));
  renderer.setSize(_w, _h);
  document.body.appendChild(renderer.domElement);
}

function createCircle() {

  var colors = [0x379392,0x2E4952,0x0BC9C7];
  group = new THREE.Object3D();
  waves = [];

  for (var i = 0; i < colors.length; i++) {
    var color = colors[i];
    var obj = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial({color: colors[i]}));
    group.add(obj);
    waves.push(obj);
  }

  // obj = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial({color: 0xf9f9f9}));

  // for (var i = 0; i <= obj_resolution ; i++) {
  //   var angle = Math.PI/180*i;
  //   var radius_addon = 0;
  //   if (i < sine_pct*obj_resolution) {
  //     radius_addon = wave_height*Math.sin(angle*waves_amount);
  //   }
  //   var x = (radius+radius_addon)*Math.cos(angle);
  //   var y = (radius+radius_addon)*Math.sin(angle);
  //   var z = 0;
  //   obj.geometry.vertices.push(new THREE.Vector3(x, y, z));
  // }

  scene.add(group);
}

function generatePoints(wave_type) {
  var newPositions = [];
  for (var i = 0; i <= obj_resolution; i++) {
    var angle = Math.PI/180*i;
    var radius_addon = 0;
    var speed_incrementer = counter/50;
    if (i < sine_pct*obj_resolution || i == obj_resolution) {
      var smoothing_amount = 0.14;
      var smooth_pct = 1;
      if (i<sine_pct*obj_resolution*smoothing_amount) {
        smooth_pct = i/(sine_pct*obj_resolution*smoothing_amount);
      }
       if (i > sine_pct*obj_resolution*(1-smoothing_amount) && i <= sine_pct*obj_resolution) {
        smooth_pct = (sine_pct*obj_resolution-i)/(sine_pct*obj_resolution*smoothing_amount);
      }
      if (i == obj_resolution) {
        smooth_pct = 0;
      }

      switch (wave_type) {
        case 0:
          radius_addon = wave_height*smooth_pct*Math.sin((angle+speed_incrementer)*waves_amount);
          break;
        case 1:
          radius_addon = wave_height*smooth_pct*Math.cos((angle+speed_incrementer)*waves_amount);
          break;
        case 2:
          radius_addon = wave_height*smooth_pct*Math.cos((angle+Math.PI/180*45+speed_incrementer)*waves_amount);
          break;
      }

    }
    var x = (radius+radius_addon)*Math.cos(angle+speed_incrementer);
    var y = (radius+radius_addon)*Math.sin(angle+speed_incrementer);
    var z = 0;
    newPositions.push(new THREE.Vector3(x, y, z));
  }
  return newPositions;
}
