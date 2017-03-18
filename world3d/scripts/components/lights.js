(function () {
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 1 );
	light.position.set( 0.5, 1, 0.75 );
	app.scene.add(light);
}());
