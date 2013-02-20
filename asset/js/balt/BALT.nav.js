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
			$.history.init(parseHash);
			$target.on( 'click', 'a', navigate );
			
		};

		var navigate = function( e, target ) {
		//	e.preventDefault();
			console.log ( 'navigate', $(e.currentTarget).attr('href').split('#')[1] );
		//	parseHash( $(e.currentTarget).attr('href').split('#')[1] );
		};

		var parseHash = function(hash) {
			if ( gotoSection[hash] !== undefined ) {
				scroller.scrollTo( gotoSection[hash] );
			} else {
				scroller.scrollTo( 0 );
			}
		};

		init();
	};

})(jQuery);
