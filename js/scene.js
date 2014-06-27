
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
	camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,10000);
	camera.position.z = 300;

	// RENDERER
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);


	var attributes = {
	  displacement: {
	    type: 'f', // a float
	    value: [] // an empty array
	  }
	};

	// create the sphere's material
	var shaderMaterial = new THREE.ShaderMaterial(
	{
		attributes:attributes,
		vertexShader:   vertexShaderElement.textContent,
		fragmentShader: fragmentshaderElement.textContent	
	});
	
	// set up the sphere vars
	var radius = 50, segments = 16, rings = 16;
	
	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	var sphere = new THREE.Mesh(
	   new THREE.SphereGeometry(radius, segments, rings),
	   shaderMaterial);

	var verts = sphere.geometry.vertices;

	var values = attributes.displacement.value;

	for (var v = 0; v < verts.length; v++) 
	{
  		values.push(Math.random() * 30);
	}
	// add the sphere to the scene
	scene.add(sphere);
	renderer.render(scene,camera);

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
//animate();