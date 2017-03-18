app.enableKeyboardEvents = function() {
	function onKeyDown( event ) {
		switch ( event.keyCode ) {
			case 38:
			case 87:
				app.move.forward = true;
				break;
			case 37:
			case 65:
				app.move.left = true;
				break;
			case 40:
			case 83:
				app.move.backward = true;
				break;
			case 39:
			case 68:
				app.move.right = true;
				break;
			case 32:
				if (app.move.jump === true) app.move.velocity.y += 350;
				app.move.jump = false;
				break;
			case 16:
				app.voxel.destroy = true;
				break;
			case 49:
				app.voxel.material = app.voxel.materials[0];
				break;
			case 50:
				app.voxel.material = app.voxel.materials[1];
				break;
			case 51:
				app.voxel.material = app.voxel.materials[2];
				break;
			case 52:
				app.voxel.material = app.voxel.materials[3];
				break;
			case 53:
				app.voxel.material = app.voxel.materials[4];
				break;
			case 54:
				app.voxel.material = app.voxel.materials[5];
				break;
			case 55:
				app.voxel.material = app.voxel.materials[6];
				break;
			case 56:
				app.voxel.material = app.voxel.materials[7];
				break;
			case 57:
				app.voxel.material = app.voxel.materials[8];
				break;
			case 48:
				app.voxel.material = app.voxel.materials[9];
				break;
		}
	}

	function onKeyUp( event ) {
		switch ( event.keyCode ) {
			case 38:
			case 87:
				app.move.forward = false;
				break;
			case 37:
			case 65:
				app.move.left = false;
				break;
			case 40:
			case 83:
				app.move.backward = false;
				break;
			case 39:
			case 68:
				app.move.right = false;
				break;
			case 16:
				app.voxel.destroy = false;
				break;
		}
	}

	document.addEventListener('keydown', onKeyDown, false);
	document.addEventListener('keyup'  , onKeyUp  , false);
};
