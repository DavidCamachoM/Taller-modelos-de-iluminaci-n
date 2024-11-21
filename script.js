const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x1e1e1e);
document.body.appendChild(renderer.domElement);

camera.position.z = 7;

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5); 
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(lightHelper);

const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cubeLambert = new THREE.Mesh(geometry, lambertMaterial);
cubeLambert.position.x = -2.5; 
scene.add(cubeLambert);

const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 150 });
const cubePhong = new THREE.Mesh(geometry, phongMaterial);
cubePhong.position.x = 2.5; 
scene.add(cubePhong);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; 
plane.position.y = -2;
plane.receiveShadow = true;
scene.add(plane);

renderer.shadowMap.enabled = true;
pointLight.castShadow = true;
cubeLambert.castShadow = true;
cubePhong.castShadow = true;

function animate() {
    requestAnimationFrame(animate);

    cubeLambert.rotation.x += 0.01;
    cubeLambert.rotation.y += 0.01;

    cubePhong.rotation.x += 0.01;
    cubePhong.rotation.y += 0.01;

    const time = Date.now() * 0.002;
    pointLight.position.x = Math.sin(time) * 5;
    pointLight.position.z = Math.cos(time) * 5;

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
