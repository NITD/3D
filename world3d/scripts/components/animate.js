app.animate = function () {
	function render() {
		app.renderer.render( app.scene, app.camera );
	}
	render();
	requestAnimationFrame( app.animate );

	app.updateMovement();
};
