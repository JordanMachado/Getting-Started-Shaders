
// STANDARD GLOBAL VARIABLE

var scene,camera,renderer;

var vertexShaderElement = document.getElementById("vertexshader");
var fragmentshaderElement = document.getElementById("fragmentshader");


function init()
{
	console.log("init called");
	// SCENE
	scene = new THREE.Scene();

	// CAMERA
	camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,10000);
	camera.position.z = 300;

	// RENDERER
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	console.log(vertexShader.textContent);
	// create the sphere's material
	var shaderMaterial = new THREE.ShaderMaterial({
		vertexShader:   vertexShaderElement.textContent,
		fragmentShader: fragmentshaderElement.textContent	});


	//uniforms = { time: { type: "f", value: 1.0 }, resolution: { type: "v2", value: new THREE.Vector2() } };
	

	
	// set up the sphere vars
	var radius = 50, segments = 16, rings = 16;
	
	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	var sphere = new THREE.Mesh(
	   new THREE.Sphere(radius, segments, rings),
	   shaderMaterial);
	
	// add the sphere to the scene
	scene.add(sphere);

}
function animate()
{
	requestAnimationFrame(animate);
	render();
}
function render()
{
	renderer.render(scene,camera);
}

init();
animate();