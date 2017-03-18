app.updateMovement = function () {
	var time, delta, moveSpeed, camera, intersects, onObject;

	camera = app.controls.getObject();

	time = performance.now();
	delta = ( time - app.time ) / 1000;

	app.move.velocity.x -= app.move.velocity.x * 10.0 * delta;
	app.move.velocity.z -= app.move.velocity.z * 10.0 * delta;
	app.move.velocity.y -= 9.8 * 100.0 * delta;

	moveSpeed = 400.0;
	if ( app.move.forward  ) app.move.velocity.z -= moveSpeed * delta;
	if ( app.move.backward ) app.move.velocity.z += moveSpeed * delta;
	if ( app.move.left     ) app.move.velocity.x -= moveSpeed * delta;
	if ( app.move.right    ) app.move.velocity.x += moveSpeed * delta;

	app.raycaster.bottom.ray.origin.copy( camera.position );
	app.raycaster.bottom.ray.origin.y -= 5;
	intersects = app.raycaster.bottom.intersectObjects( app.objects );
	onObject = intersects.length > 0;
	if ( onObject ) {
		app.move.velocity.y = Math.max( app.move.velocity.y, 0 );
		if ( app.move.velocity.y === 0 ) camera.position.y = intersects[0].point.y + 10;
		app.move.jump = true;
	}

	camera.translateX( app.move.velocity.x * delta );
	camera.translateY( app.move.velocity.y * delta );
	camera.translateZ( app.move.velocity.z * delta );

	if ( camera.position.y < 10 ) {
		camera.position.y = 10;
		app.move.velocity.y = 0;
		app.move.jump = true;
	}

	app.time = time;
}
