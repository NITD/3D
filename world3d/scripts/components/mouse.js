app.enableMouseEvents = function () {
	document.addEventListener( 'mousedown', app.editVoxel, false );
};

app.disableMouseEvents = function () {
	document.removeEventListener( 'mousedown', app.editVoxel, false );
};
