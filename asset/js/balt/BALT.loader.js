/*
@project Loader

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Gallery with endless scroll and clones
*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.loader = function( target, o ) {
		var root = this,
		$target = target,
		firstTime = false,
		defaults = {
		};
		var settings = $.extend( defaults, o );

		// root.update = function( val ) {
		// 	var w = $target.find( '.progress' ).width() * val;
		// 	var properties = {
		// 		width: w,
		// 		transition: 'width 2s'
		// 	};
		// 	$target.find( '.bar' ).css( properties );
		// 	if ( val == 1 ) {
		// 		complete();
		// 	}
		// };

		root.update = function( val ) {
			if ( val > 100 ) val = 100;
			$target.find( '.bar' ).css( { width: val + '%', transition: 'width .2s' } );
			if ( val == 100 ) {
				complete();
			}
		};

		var complete = function() {
			if ( !firstTime ){
				firstTime = true;
				var properties = {
					opacity: 0,
					filter: 'alpha(opacity=' + 0 + ')', /* For IE8 and earlier */
					transition: 'all 1s'
				}
				$target.css( properties );

				if (settings.onComplete && typeof settings.onComplete === 'function') var timeoutID = window.setTimeout(settings.onComplete, 700 );
			}
		};

	};

})(jQuery);
