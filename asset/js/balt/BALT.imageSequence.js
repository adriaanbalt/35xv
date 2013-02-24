/*
@project Helper

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Image Sequence
*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.imageSequence = function( opts ) {
		var defaults = {
				skipImages: 1,
				recheckDelay: 500,			// delay before checking for current image if not present
				loadInterval: 100,			// delay to wait until loading next image if busy
				frameSpeed: 1
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
				//console.log ( "seq load complete ", settings );
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

		var getImageAt = function( index ) {
			return sequence[index];
		}

		var showImageAt = function( index ) {
			if (index == currentIndex) return false;

			var image = sequence[ index ];
			clearTimeout( timeout );

			if (image) {
				hideImageAt( currentIndex );
				currentIndex = index;
				$(image).removeClass('hidden').addClass( 'show' );
			} else {
				clearTimeout(recheckTimeout);
				recheckTimeout = setTimeout(showImageAt, settings.recheckDelay, index);
			}
		};

		var hideImageAt = function( index ) {
			var image = sequence[ index ];
			if (image) {
				$(image).removeClass( 'show' ).addClass('hidden');
			}
		};

		var load = function() {
			var className;
			for ( var i = 0; i <= settings.imageCount; i=i+settings.skipImages) {
				var image = new Image();
				image.src = settings.filesPath.replace('{index}', i);
				if ( settings.className ){
					image.className = settings.className.indexOf("{index}") >= 0 ? settings.className.replace( "{index}", i ) : settings.className;
				}
				if ( settings.id ){
					image.id = settings.id.indexOf("{index}") >= 0 ? settings.id.replace( "{index}", i ) : settings.id;
				}
				settings.container.append( image );
				sequence.push(image);
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
			getImageAt: getImageAt,
			imageCount: settings.imageCount,
			skipImages: settings.skipImages,
			frameSpeed: settings.frameSpeed
		}
	}


})(jQuery);
