
/*
@client BALT
@project

@author Adriaan Scholvinck | adriaan@BALT.us
@description Smooth Scrolling with Animation logic
@date November 2012
*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};
	if ( !$.BALT.animation ) {
		$.BALT.animation = {};
	}

	$.BALT.animation.calculations = function() {

		var root = this;

		root.calcBgY = function(x, windowHeight, pos, adjuster, inertia){
			return x + "px " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
		};

		root.calcBgX = function(y, windowHeight, pos, adjuster, inertia){
			return (-((windowHeight + pos) - adjuster) * inertia)  + "px " + y + "px";
		};

		root.calcXY = function(windowHeight, pos, adjusterX, inertiaX, adjusterY, inertiaY){
			return (-((windowHeight + pos) - adjusterX) * inertiaX)  + "px " + (-((windowHeight + pos) - adjusterY) * inertiaY) + "px";
		};

		root.calcPos = function(windowHeight, pos, adjuster, inertia) {
			return (((windowHeight + pos) - adjuster) * inertia)  + "px";
		};

		root.calcRot = function( r, windowHeight, pos, adjuster, inertia ){
			return (r + -(((windowHeight + pos) - adjuster ) * inertia));
		};

		root.calcProgress = function( startAt, endAt ) {
			return ( (startAt - scrollTopTweened) / (startAt - endAt) );
		};

		root.calcDegrees2Radians = function( degrees ) {
			return ( degrees * Math.PI / 180 );
		};

	};

	$.BALT.animation.spinner = function( o ) {

		var $window = $(window);
		root = this,
		started = false,
		scrollTop = 0,
		scrollTopTweened = 0,
		progress = 0,
		currentIndex = -1;

		var spin = function() {
			requestAnimFrame(spin);

			scrollTopTweened += settings.tweenSpeed * ($window.scrollTop() - scrollTopTweened);
			progress = calculations.calcProgress( settings.startAt, settings.endAt );
			if ( progress <= 1 ) {
				var endFrame = (settings.imageCount/settings.skipImages) * settings.frameSpeed,
				toFrame = Math.floor(progress*endFrame) % settings.imageCount;

				settings.sequence.showImageAt( toFrame );
			//	console.log ( "progress ", toFrame, " | ", progress, " | ", scrollTopTweened, " | " );
			}
			//console.log( 'toFrame: ', toFrame, settings.imageCount, settings.skipImages, settings.frameSpeed, endFrame, progress, settings.startAt, settings.endAt );
		};

		var resize = function() {
			// onResize
			if (settings.onResize && typeof settings.onResize === 'function') settings.onResize();
		};

		// --------------------------------------------------
		// PUBLIC
		// --------------------------------------------------
		root.init = function( opts ) {
			var defaults = {
				tickSpeed: 30,
				useRAF: true,
				tweenSpeed: .3
			};

			settings = $.extend( defaults, opts );

			window.requestAnimFrame = (function(){
				if (settings.useRAF) {
					return  window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					function( callback ){
						window.setTimeout(callback, settings.tickSpeed);
					};
				} else {
					return function( callback ){
						window.setTimeout( callback, settings.tickSpeed);
					}
				};
			})();

			console.log ( "spinner init" );

			resize();
			spin();

			return this;
		};

	};

})(jQuery);

