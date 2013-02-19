
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
		currentIndex = -1,
		raf = null,
		cancelAnimation = false;

		root.scroll = function( scrollY ) {
			scrollTop = scrollY;
			if ( scrollY >= settings.startAt && scrollY <= settings.endAt ) {
				cancelAnimation = false;
				raf = requestAnimationFrame(spin);
			} else {
				if ( !cancelAnimation ) cancelAnimationFrame( raf );
				cancelAnimation = true;
			}
		}

		var spin = function() {
			if ( !cancelAnimation ){
				requestAnimationFrame(spin);
			}
			scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
			progress = calculations.calcProgress( settings.startAt, settings.endAt );
			if ( progress <= 1 ) {
				var endFrame = (settings.imageCount/settings.skipImages) * settings.frameSpeed,
				toFrame = Math.floor(progress*endFrame) % settings.imageCount;
				settings.sequence.showImageAt( toFrame );
			}
		};

		root.init = function( opts ) {
			var defaults = {
				tickSpeed: 30,
				useRAF: true,
				tweenSpeed: .3
			};

			settings = $.extend( defaults, opts );

			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame =
				window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
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

			return this;
		};

	};

	$.BALT.animation.scroller = function( o ) {
		var root = this,
		scrollTop = 0,
		$window = $(window),
		$document = $(document),
		firstTime = true,
		windowHeight,
		defaults = {
			scrollSpeed : 40
		};

		var settings = $.extend( defaults, o );

		var dispatch = function() {
			var i = settings.register.length;
			while ( i-- ){
				scroll( scrollTop );
				settings.register[i].scroll( scrollTop );
			}
		};

		var scroll = function( scrollY ) {
			var y = ( scrollY / settings.maxScroll ) * ( $('#scroller').height() - $('#scrubber').height() );
			$('#main').css( {
				transition: 'all 0ms',
				transform : 'translate( 0px, ' + (scrollY*-1) + 'px)'
			});
			$('#scrubber').css( {
				transform: 'translateY(' + y + 'px)'
			});
		};

		var wheelHandler = function(e, delta, deltaX, deltaY) {
			e.preventDefault();
			scrollTop -= delta * settings.scrollSpeed;
			if ( scrollTop < 0) scrollTop = 0;
			checkScrollExtents();
			dispatch();
		};

		var mousedown = function( e ) {
			console.log ( "y: ", e.offsetY, e.pageY );
		};

		var mouseup = function( e ) {
			//$(e.currentTarget).height() - e.offsetY
			console.log ( "y: ", e.offsetY, e.pageY, $(e.currentTarget).height() );
		};

		var checkScrollExtents = function() {
			if (scrollTop < 0) scrollTop = 0;
			else if (scrollTop > settings.maxScroll) scrollTop = settings.maxScroll;
		}

		var scrollTo = function( scroll ) {
			scrollTop = scroll;
		};

		root.init = function() {
			$document.on('mousewheel', wheelHandler);
			$window.on('resize', resize);

			$('#scrubber').on ( 'mousedown', mouseup );
			$('#scrubber').on ( 'mouseup', mousedown );

			console.log ( $('#main') );
			console.log ( $('#scroller') );
			console.log ( $('#scrubber') );
			console.log ( $('body').find('#scroller') );
			resize();
		}

		var resize = function() {
			windowHeight = $window.height();
			$('#scroller').height( windowHeight -4 );
		};

		var goingDown = function( e ) {
			if ( e !== undefined && firstTime ){
				//$window.off('scroll', root.goingDown);
				firstTime = false;
				scrollTo( $window.scrollTop() );
			}
		}
	};

})(jQuery);

