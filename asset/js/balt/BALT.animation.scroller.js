
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

			if (settings.useRAF) {
				if ( !window.requestAnimationFrame ){
					var lastTime = 0;
					var vendors = ['ms', 'moz', 'webkit', 'o'];
					for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
						window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
						window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
						|| window[vendors[x]+'CancelRequestAnimationFrame'];
					}

					if (!window.requestAnimationFrame)
						window.requestAnimationFrame = function(callback, element) {
							var currTime = new Date().getTime();
							var timeToCall = Math.max(0, 16 - (currTime - lastTime));
							var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
							timeToCall);
							lastTime = currTime + timeToCall;
							return id;
						};

					if (!window.cancelAnimationFrame)
						window.cancelAnimationFrame = function(id) {
						clearTimeout(id);
					};
				} else {
					window.requestAnimFrame = (function(){
						return  window.requestAnimationFrame       ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame    ||
						window.oRequestAnimationFrame      ||
						window.msRequestAnimationFrame     ||
						function( callback ){
							window.setTimeout(callback, settings.tickSpeed);
						};
					})();
				}
			} else {
				return function( callback ){
					window.setTimeout( callback, settings.tickSpeed);
				}
			};
			

			resize();
			spin();

			return this;
		};

	};



	$.BALT.animation.scroller = function( o ) {

		var root = this,
		progress = 0;

		registrations = o.register;

		var scrolling = function() {
			var i = registrations.length;
			while ( i-- ){
				registrations[i].scroll( $window.scrollTop() );
			}
			//console.log( 'toFrame: ', toFrame, settings.imageCount, settings.skipImages, settings.frameSpeed, endFrame, progress, settings.startAt, settings.endAt );
		};

		// --------------------------------------------------
		// PUBLIC
		// --------------------------------------------------
		$window.bind('scroll', scrolling);

	};



})(jQuery);

