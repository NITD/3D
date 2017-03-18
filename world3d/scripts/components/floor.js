(function () {
	var geometry, mesh, material, texture;

	geometry = new THREE.PlaneGeometry( 2000, 2000 );
	geometry.rotateX( - Math.PI / 2 );

	texture = new THREE.TextureLoader().load(' textures/grass.jpg' );
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 100, 100 );

	material = new THREE.MeshLambertMaterial( {
		map: texture
	} );

	var mesh = new THREE.Mesh( geometry, material );
	app.scene.add( mesh );

	app.objects.push( mesh );
	app.floor = mesh;
}());
