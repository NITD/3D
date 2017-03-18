if ( app.havePointerLock ) {
	app.controls = new THREE.PointerLockControls( app.camera );
	app.controlsType = 'pointerlock';
	app.scene.add( app.controls.getObject() );
	app.enablePointerLock();
	app.enableKeyboardEvents();
}

app.renderer = new THREE.WebGLRenderer();
app.renderer.setClearColor( 0xddddff );
app.renderer.setPixelRatio( window.devicePixelRatio );
app.renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( app.renderer.domElement );

window.addEventListener( 'resize', function () {
	app.camera.aspect = window.innerWidth / window.innerHeight;
	app.camera.updateProjectionMatrix();
	app.renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

app.animate();
