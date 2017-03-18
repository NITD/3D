(function () {
	var geometry = new THREE.PlaneGeometry( 0.02, 0.02 );
	var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	var mesh = new THREE.Mesh( geometry, material );
	app.camera.add( mesh );
	mesh.position.set( 0, 0, -2 );
}());
