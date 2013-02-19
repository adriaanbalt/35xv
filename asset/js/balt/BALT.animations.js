
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
		//	return ( (startAt - scrollTopTweened) / (startAt - endAt) );
		};
		root.calcDegrees2Radians = function( degrees ) {
			return ( degrees * Math.PI / 180 );
		};
	};

	$.BALT.animation.parallax = function( o ) {

		// PARALLAX the clouds!!

		var root = this,
		scrollTop = 0,
		$body = $('body'),
		valX, valY, limitX, limitY,
		settings = null;

		root.scroll = function( scrollY ) {
			scrollTop = scrollY;
			console.log ( 'scroll: ', calculations.calcBgY( 0, windowHeight, scrollY, 500, .5 ) );


			// limitX = (root.settings.itemWidth - endX + 130 );
			// limitY = (endY - root.settings.itemHeight);
			// if ( scrollY < root.settings.endAt && scrollY > root.settings.startAt ){
			// 	endX = root.settings.totalImagesWidth;
			// 	endY = $target.height();

			// 	cur_time = ( scrollY - root.settings.startAt ) ;
			// 	tot_time = ( root.settings.endAt - root.settings.startAt );

			// 	valX = getTweenedValue( startX, endX, cur_time, tot_time ) * -1;
			// 	valY = getTweenedValue( startY, endY, cur_time, tot_time );

			// 	if ( valX < limitX ){
			// 		valX = limitX;
			// 	}
			// 	if ( valY > limitY ){
			// 		valY = limitY;
			// 	}

			// } else if ( scrollY < root.settings.startAt ) {
			// 	valX = 0;
			// 	valY = 0;
			// } else if ( scrollY > root.settings.endAt ) {
			// 	valX = limitX;
			// 	valY = limitY;
			// }

			var properties = {
				// top: valY + "px",
				// left: valX + "px"
				'background-position': calculations.calcBgY( 0, windowHeight, scrollY, 500, .5 )
				// ,
				// transition : 'all .01s ease'
			};

			//$body.css ( properties );


			// if ( scrollY >= settings.startAt && scrollY <= settings.endAt ) {
			
			// } else {

			// }
		}

	};

	$.BALT.animation.spinner = function( o ) {

		var root = this,
		started = false,
		scrollTop = 0,
		scrollTopTweened = 0,
		progress = 0,
		currentIndex = -1,
		raf = null,
		cancelAnimation = false,
		settings = null;

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
			progress = (settings.startAt - scrollTopTweened) / (settings.startAt - settings.endAt);
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
		$document = $(document),
		$scrubber = $('#scrubber'),
		$scroller = $('#scroller'),
		$main = $('#main'),
		lastY = 0,
		currentScrollTop = 0,
		gotoScrollTop = 0,
		autoScrollInterval = 0,
		firstTime = true,
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
			var y = ( scrollY / settings.maxScroll ) * ( windowHeight - 122 );
		//	console.log ( "scrollY: ", scrollY, y );
			$main.css({
				transform : 'translate( 0px, ' + (scrollY*-1) + 'px)'
			});
			$scrubber.css({
				transform: 'translateY(' + y + 'px)'
			});
		};

		var wheelHandler = function(e, delta, deltaX, deltaY) {
			e.preventDefault();
			scrollTop -= delta * settings.scrollSpeed;
			checkScrollExtents();
			dispatch();
		};

		var mousedown = function( e ) {
			lastY = e.pageY;
			$window.on( 'mousemove', mousemove );
		};
		var mouseup = function( e ) {
			$window.off( 'mousemove', mousemove );
		};
		var mousemove = function( e ) {
			var delta = e.pageY - lastY;
			scrollTop += delta;
			checkScrollExtents();
			console.log ( $main.position().top, e.pageY, lastY, delta );
			//scrollTop = (e.pageY - e.offsetY) * settings.maxScroll /  ( windowHeight - 122 );
			dispatch();
		};

		var checkScrollExtents = function() {
			if (scrollTop < 0) scrollTop = 0;
			else if (scrollTop > settings.maxScroll) scrollTop = settings.maxScroll;
		}

		root.scrollTo = function( scroll ) {
			scrollTop = scroll;
			dispatch();
		};

		root.autoScroll = function( scroll ) {
			currentScrollTop = scrollTop;
			gotoScrollTop = scroll;
			autoScrollInterval = setInterval( aScroll, 100  );
		};

		var aScroll = function() {
			if ( scrollTop == gotoScrollTop ) clearTimeout( autoScrollInterval );
			checkScrollExtents();
			dispatch();
		}

		root.init = function() {
			$document.on('mousewheel', wheelHandler);
			$scrubber.on ( 'mousedown', mousedown );
			$window.on ( 'mouseup', mouseup );

			resize();

			scrollTo ( settings.startAt );
		}

		var resize = function() {
			$scroller.height( windowHeight - 4 );
		};

		var getTweenedValue = function(start, end, currentTime, totalTime, tweener) {
			var delta = end - start;
			var percentComplete = currentTime/totalTime;
			if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;
			return tweener(percentComplete) * delta + start;
		}

	};

})(jQuery);

