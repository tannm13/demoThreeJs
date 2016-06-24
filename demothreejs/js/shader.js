var container;
var camera, renderer, scene;
var uniforms;

init();
loop();

function init() {
  container = document.getElementById('container');

  camera = new THREE.Camera();
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  uniforms = {
    u_time: {type: "f", value: 1.0},
    u_resolution: {type: "v2", value: new THREE.Vector2()},
    u_mouse: {type: "v2", value: new THREE.Vector2()}
  };

  var geom = new THREE.PlaneBufferGeometry(2,2);
  var mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });
  var mesh = new THREE.Mesh(geom, mat);
  scene.add(mesh);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);
}

function onWindowResize(e) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function onMouseMove(e) {
  uniforms.u_mouse.value.x = e.pageX;
  uniforms.u_mouse.value.y = e.pageY;
}

function loop() {
  uniforms.u_time.value += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
