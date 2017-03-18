app.editVoxel = function () {
	var intersects, intersect, voxel;

	app.raycaster.click.set( app.camera.getWorldPosition(), app.camera.getWorldDirection() );
	intersects = app.raycaster.click.intersectObjects( app.objects );
	if ( !( intersects.length > 0 ) ) return;

	intersect = intersects[0];
	if ( app.voxel.destroy ) {
		if ( intersect.object !== app.floor ) {
			app.scene.remove( intersect.object );
			app.objects.splice( app.objects.indexOf( intersect.object ), 1 );
		}
	} else {
		voxel = new THREE.Mesh( app.voxel.geometry, app.voxel.material );
		voxel.position.copy( intersect.point ).add( intersect.face.normal );
		voxel.position
			.divideScalar( app.voxel.size )
			.floor()
			.multiplyScalar( app.voxel.size )
			.addScalar( app.voxel.size / 2 );
		app.scene.add( voxel );

		app.objects.push( voxel );
	}
};
