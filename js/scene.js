
// STANDARD GLOBAL VARIABLE

var scene,camera,renderer;

var vertexShaderElement = document.getElementById("vertexshader");
var fragmentshaderElement = document.getElementById("fragmentshader");
var sphere;
var uniforms;

function init()
{
	console.log("init called");
	// SCENE
	scene = new THREE.Scene();

	// CAMERA
	camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,10000);
	camera.position.z = 300;

	// STATS
	stats = new Stats();
	stats.setMode(1);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	document.body.appendChild(stats.domElement); 

	// RENDERER
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	uniforms = {
	  amplitude: {
	    type: 'f', // a float
	    value: 0
	  }
	};
	var attributes = {
	  displacement: {
	    type: 'f', // a float
	    value: [] // an empty array
	  }
	};

	// create the sphere's material
	var shaderMaterial = new THREE.ShaderMaterial(
	{
		uniforms:uniforms,
		attributes:attributes,
		vertexShader:   vertexShaderElement.textContent,
		fragmentShader: fragmentshaderElement.textContent	
	});
	
	// set up the sphere vars
	var radius = 50, segments = 16, rings = 16;
	
	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	sphere = new THREE.Mesh(
	   new THREE.SphereGeometry(radius, segments, rings),
	   shaderMaterial);

	var verts = sphere.geometry.vertices;

	var values = attributes.displacement.value;

	for (var v = 0; v < verts.length; v++) 
	{
		if(v%2 == 0)
  			values.push(8);
  		else
  			values.push(2);
	}
	// add the sphere to the scene
	scene.add(sphere);

}

function animate()
{
	requestAnimationFrame(animate);
	stats.update();
	render();
}


function render()
{
	 //var theta = (Date.now() * vitesse_angulaire) + angle_initial;
	uniforms.amplitude.value = Math.cos(Date.now()*0.001);
	//sphere.rotation.y += 0.01;
	renderer.render(scene,camera);
}

init();
animate();