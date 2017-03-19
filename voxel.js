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
		console.log( intersect.point.x + " " + intersect.point.y + " " + intersect.point.z );
		
		var drawDot = true;
		for ( i = 0; i < app.voxel.dots.length; i++ ) {
			if( app.voxel.dots[i].vector3.distanceTo( intersect.point ) == 0) {
				drawDot = false;
				break;
			}
		}

		if ( drawDot && app.voxel.dots.length == 2 ) {
			
			var planeGeometry = new THREE.Geometry();
			
			for ( i = 0; i < 2; i++ ) {
				var tempDot = app.voxel.dots[i];
				planeGeometry.vertices.push( tempDot.vector3 );
				app.scene.remove( tempDot.points );
			}
			planeGeometry.vertices.push( intersect.point );

			app.voxel.dots.splice( 0, 2 );

			var planeFace = new THREE.Face3( 0, 1, 2 );
			
			planeGeometry.faces.push( planeFace );
			
			planeGeometry.computeFaceNormals();
			planeGeometry.computeVertexNormals();
			
			var planeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
			
			var planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
			//planeMesh.position.y = 8;
			app.scene.add( planeMesh );
			
			drawDot = false;
		}

		if ( drawDot ) {
			var dotGeometry = new THREE.Geometry();
			dotGeometry.vertices.push( intersect.point );
			var dotMaterial = new THREE.PointsMaterial( { size: 20, sizeAttenuation: false } );
			var dot = new THREE.Points( dotGeometry, dotMaterial );
			app.scene.add( dot );

			app.voxel.dots.push( { points: dot, vector3: intersect.point } );
		}
		/*voxel = new THREE.Mesh( app.voxel.geometry, app.voxel.material );
		voxel.position.copy( intersect.point ).add( intersect.face.normal );
		voxel.position
			.divideScalar( app.voxel.size )
			.floor()
			.multiplyScalar( app.voxel.size )
			.addScalar( app.voxel.size / 2 );
		app.scene.add( voxel );
		
		app.objects.push( voxel );*/
	}
};
