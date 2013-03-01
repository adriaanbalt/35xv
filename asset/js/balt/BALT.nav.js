/*
@project Navigation

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Navigation history deep link
*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.nav = function( target, o ) {
		var root = this,
		$target = target,
		defaults = {
		};
		var settings = $.extend( defaults, o );

		var init = function(){
			$.history.init(root.navigate);
		};

		root.navigate = function( hash ) {
			if ( hash.indexOf('modal') ==-1 ){
				if ( gotoSection[hash] !== undefined ) {
					settings.scroller.scrollTo( gotoSection[hash] );
					settings.scroller.scrollTo( gotoSection[hash] );
				} else {
					settings.scroller.scrollTo( 0 );
				}
			} else {
			}

		};

		init();
	};

})(jQuery);
