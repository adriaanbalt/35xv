/*
@project Helper

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Image Sequence
*/

var ImageSequence = function( opts ) {
	var defaults = {
			skipImages: 1,
			recheckDelay: 500,			// delay before checking for current image if not present
			loadInterval: 100			// delay to wait until loading next image if busy
		},
		sequence = [],
		currentIndex = -1,
		currentLowres,
		loaded = 0,
		loadTimeout, recheckTimeout, timeout,
		filesize = 0,
		settings = $.extend( defaults, opts );

// PRIVATE
	var imageOnloadHandler = function() {
		if (loaded == 0) {
			showImageAt(0);
		};

		if (settings.onProgress && typeof settings.onProgress === 'function') {
			settings.onProgress();
		};

		if (loaded == settings.imageCount ) {
			if( settings.onComplete && typeof settings.onComplete === 'function' ) {
				settings.onComplete();
			}
			return false;
		}
		
		// not yet, go again
		//clearTimeout( loadTimeout );
		if (!loadTimeout) {
			loadTimeout = setTimeout( imageOnloadHandler, settings.loadInterval);
		} else {
			clearTimeout( loadTimeout );
			loadTimeout = null;
		}

		loaded += settings.skipImages;
	};
	
	var hideImageAt = function( index ) {
		var image = settings.container.children()[ index ];
		//if (image) image.style.display = 'none';	
	};

	// to get the images file size run a XHR
	// - not sure if this will actually cause the image to download, which is counter intuitive
	var getImgFileSize = function( image ) {
		var xhr = new XMLHttpRequest();
		xhr.open('HEAD', image, true);
		xhr.onreadystatechange = function(){
		  if ( xhr.readyState == 4 ) {
		    if ( xhr.status == 200 ) {
				filesize += parseFloat( xhr.getResponseHeader('Content-Length') );
				console.log( 'filesize : ', filesize );
		    } else {
		    	console.log ( "ERROR - image sequence file: ", image );
		    	filesize += 0;
		    }
		  }
		};
		xhr.send(null);
	}

// PUBLIC
	var showImageAt = function( index ) {
		if (index == currentIndex) return false;
		
		var image = settings.container.children()[ index ];
		clearTimeout( timeout );

		if (image) {
			hideImageAt( currentIndex );
			currentIndex = index;
			image.style.display = 'block';
		} else {
			clearTimeout(recheckTimeout);
			recheckTimeout = setTimeout(showImageAt, settings.recheckDelay, index);
		}
	};

	var load = function() {
		for ( var i = 0; i <= settings.imageCount; i=i+settings.skipImages) {
			var image = new Image();
			image.src = settings.filesPath.replace('{index}', i)
	//		image.style.display = 'none';
			settings.container.append( image );
		//	sequence.push(image);

			if (image.complete) {
				imageOnloadHandler();
			} else {
				image.onload = imageOnloadHandler;
			}
		};
	};

	return {
		load: load,
		showImageAt: showImageAt,
		imageCount: settings.imageCount,
		skipImages: settings.skipImages
	}
}

