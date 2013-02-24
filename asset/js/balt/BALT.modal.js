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
		$template = $("<div class='modal'><div class='inner'><a href='javascript:void(0);' class='close'>X</a></div></div>"),
		image = undefined,
		settings = {
			loader : true
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
			console.log ( "image.complete : ", image.complete );
			if ( image.complete ) {
				reveal();
			} else {
				image.onload = imageLoaded;
			}
		};
		var imageLoaded = function( e ) {
			// append to dom
			$template.find('.inner').append( image );
			$('body').append( $template );
			reveal();
		};
		var reveal = function() {
			$template.removeClass('hidden');
			$template.animate( {
				opacity: 1,
			}, 500 );
		}

		root.hide = function() {
			$template.animate( {
				opacity: 0,
			}, 500, function() {
				$template.addClass('hidden');
			} );
		}

		var imageResize = function( img, w, h ) {
			img.width( w );
			img.height( Math.round ( w * root.settings.ratio ) );
			if ( img.height() < h ) {
				img.height( h );
				img.width( Math.round ( h / root.settings.ratio ) );
			}
		};

		var resize = function () {
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
		$template.on( 'click', root.hide );
	};


})(jQuery);
