var camera, scene, renderer;
var clock, deltaTime;
var cubeMesh;
var particleSystem;

init();
animate();

function init() {
    clock = new THREE.Clock(true);
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 50;
    
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, -1, 1).normalize();
    scene.add(light);
    
    var geom = new THREE.CubeGeometry(10, 10, 10);
    var mat = new THREE.MeshPhongMaterial({color: 0x0033ff, specular: 0x555555, shininess: 30});
    cubeMesh = new THREE.Mesh(geom, mat);
    cubeMesh.position.z = -30;
    scene.add(cubeMesh);
    
    particleSystem = createParticleSystem();
    scene.add(particleSystem);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    window.addEventListener('resize', onWindowResize, false);
}

function createParticleSystem() {
    var particleCount = 2000;
    
    var particles = new THREE.Geometry();
    
    for (var p = 0; p < particleCount; p++) {
        var x = Math.random()*400-200;
        var y = Math.random()*400-200;
        var z = Math.random()*400-200;
        
        var particle = new THREE.Vector3(x, y, z);
        
        particles.vertices.push(particle);
    }
    
    var particleMaterial = new THREE.PointsMaterial(
            {   color: 0xffffff,
                size: 4,
                transparent: true,
            });
    
    particleSystem = new THREE.Points(particles, particleMaterial);
    
    return particleSystem;
}

function animateParticles() {
    var verts = particleSystem.geometry.vertices;
    for (var i = 0; i < verts.length; i++) {
        var vert = verts[i];
        if (vert.y < -200) {
            vert.y = Math.random()*400-200;
        }
        vert.y = vert.y-(10*deltaTime);
    }
    particleSystem.geometry.verticesNeedUpdate = true;
}

function animate() {
    deltaTime = clock.getDelta();
    
    cubeMesh.rotation.x += 1*deltaTime;
    cubeMesh.rotation.y += 2*deltaTime;
    
    animateParticles();
    particleSystem.rotation.y -= .1*deltaTime;
    
    renderer.render(scene, camera);
    
    requestAnimationFrame(animate);
}

function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}