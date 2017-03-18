app.havePointerLock =       'pointerLockElement' in document
				   ||    'mozPointerLockElement' in document
				   || 'webkitPointerLockElement' in document;

app.enablePointerLock = function () {
	var element = document.body;
	element.requestPointerLock = element.requestPointerLock
							  || element.mozRequestPointerLock
							  || element.webkitRequestPointerLock;

	function pointerLockChange() {
		if ( document.pointerLockElement === element
		  || document.mozPointerLockElement === element
		  || document.webkitPointerLockElement === element ) {
			app.blocker.classList.add( 'hidden' );
			app.controls.enabled = true;
			app.enableMouseEvents();
		} else {
			app.blocker.classList.remove( 'hidden' );
			app.controls.enabled = false;
			app.disableMouseEvents();
		}
	}

	function pointerLockError() {
		console.log( 'Pointer Lock Error' );
	}

	document.addEventListener(       'pointerlockchange', pointerLockChange, false );
	document.addEventListener(    'mozpointerlockchange', pointerLockChange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerLockChange, false );

	document.addEventListener(       'pointerlockerror', pointerLockError, false );
	document.addEventListener(    'mozpointerlockerror', pointerLockError, false );
	document.addEventListener( 'webkitpointerlockerror', pointerLockError, false );

	app.buttons.start.addEventListener( 'click', function ( event ) {
		element.requestPointerLock();
	} );
};
