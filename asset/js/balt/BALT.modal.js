/*
@project Helper

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Gallery with endless scroll and clones
*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.modal = function( target, o ) {
		var root = this,
		$target = target,
		image = undefined,
		settings = {
			loader : true,
			appended : false,
			ratio : 0,
			tWidth : 0,
			tHeight : 0,
			$template : $("<div class='modal'><div class='inner'><a href='javascript:void(0);' class='close'>X</a></div></div>")
		};
		settings = $.extend( settings, o );

		var click = function( e ) {
			e.preventDefault();
			root.show();
		};

		root.show = function( o ) {
			settings = $.extend( settings, o );
			$window.resize( resize );
			resize();
			// load image, unless already loaded
			image = new Image();
			image.src = $target.data('image');
			if ( image.complete ) {
				imageLoaded();
			} else {
				image.onload = imageLoaded;
			}
		};
		var imageLoaded = function( e ) {
			// append to dom
			if ( !settings.appended ) {
				settings.$template.find('.inner').append( image );
				settings.appended = true;
				settings.ratio = image.height / image.width;
				resize();
				imageResize( $(image), settings.tWidth, settings.tHeight );
			}
			$('body').append( settings.$template );
			reveal();
		};
		var reveal = function() {
			settings.$template.removeClass('hidden');
			settings.$template.animate( {
				opacity: 1,
			}, 500 );
		}

		root.hide = function() {
			settings.$template.animate( {
				opacity: 0,
			}, 500, function() {
				settings.$template.addClass('hidden');
			} );
		}

		var imageResize = function( img, w, h ) {
			img.width( w );
			img.height( Math.round ( w * settings.ratio ) );
			if ( img.height() > h ) {
				img.height( h );
				img.width( Math.round ( h / settings.ratio ) );
			}
		};

		var resize = function () {
			settings.tWidth = ( $window.width() * .8 );
			settings.tHeight = ( $window.height() * .8 );
			imageResize( $(image), settings.tWidth, settings.tHeight );
		};

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};

		var getTweenedValue = function(start, end, currentTime, totalTime, tweener) {
			var delta = end - start;
			var percentComplete = currentTime/totalTime;
			if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;
			return tweener(percentComplete) * delta + start;
		}

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};

		$target.on( 'click', click );
		settings.$template.on( 'click', root.hide );
	};


})(jQuery);
