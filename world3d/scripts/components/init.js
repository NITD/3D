var app = { };

app.blocker = document.getElementById( 'blocker' );

app.buttons = { };
app.buttons.start = document.getElementById( 'start-btn' );

app.scene = new THREE.Scene();

app.camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	1000
);

app.move = { };
app.move.velocity = new THREE.Vector3();
app.move.forward  = false;
app.move.backward = false;
app.move.left     = false;
app.move.right    = false;
app.move.jump     = true;

app.time = performance.now();

app.objects = [];
app.raycaster = { };
app.raycaster.bottom = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 10 );
app.raycaster.click = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, -1 ), 0, 100 );

app.voxel = { };
app.voxel.destroy = false;
app.voxel.size = 5;
app.voxel.geometry = new THREE.BoxGeometry( app.voxel.size, app.voxel.size, app.voxel.size );
app.voxel.materials = [
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'textures/brick.jpg' ) } ),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'textures/ground.jpg' ) } ),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'textures/stone.jpg' ) } ),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'textures/rock.jpg' ) } ),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'textures/cliff.png' ) } ),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'textures/gravel.png' ) } ),
	new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load( 'textures/marble.jpg' ) } ),
	new THREE.MeshLambertMaterial( { color: 0xefefef } ),
	new THREE.MeshLambertMaterial( { color: 0x444444 } ),
	new THREE.MeshLambertMaterial( { color: 0x0000ff, opacity: 0.2, transparent: true} )
];
app.voxel.material = app.voxel.materials[0];
