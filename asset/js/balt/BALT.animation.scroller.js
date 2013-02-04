
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

	$.BALT.animation.scroller = function( o ) {

		var $window = $(window);
		root = this,
		started = false,
		scrollTop = 0,
		scrollTopTweened = 0,
		progress = 0,
		currentIndex = -1;

		var defaults = {
			maxScroll: 1000,
			tickSpeed: 30,
			useRAF: true,
			scrollSpeed: 20,
			tweenSpeed: .3,
			skipImages: 1,
			frameSpeed: 1
		};

		settings = $.extend( defaults, o );

		var spin = function() {
			requestAnimFrame(spin);

			scrollTopTweened += settings.tweenSpeed * ($window.scrollTop() - scrollTopTweened);
			progress = calculations.calcProgress( settings.startAt, settings.endAt );
			if ( progress <= 1 ) {
				var endFrame = (settings.imageCount/settings.skipImages) * settings.frameSpeed,
				toFrame = Math.floor(progress*endFrame) % settings.imageCount;

				showImageAt( toFrame );
			//	console.log ( "progress ", toFrame, " | ", progress, " | ", scrollTopTweened, " | " );
			}
			//console.log( 'toFrame: ', toFrame, settings.imageCount, settings.skipImages, settings.frameSpeed, endFrame, progress, settings.startAt, settings.endAt );
		};
		var showImageAt = function( index ) {
			if (index == currentIndex) return false;

			var image = settings.images[ index ];

			if (image) {
				hideImageAt( currentIndex );
				currentIndex = index;
				image.style.display = 'block';
			} else {
			}
		};
		var hideImageAt = function( index ) {
			var image = settings.images[ index ];
			if (image) image.style.display = 'none';
		};

		var animationLoop = function() {
			requestAnimFrame(animationLoop);

			scrollTopTweened += settings.tweenSpeed * ($window.scrollTop() - scrollTopTweened);
			calcProgress( settings.startAt, settings.endAt );

			var endFrame = (settings.imageCount/settings.skipImages) * settings.frameSpeed,
			toFrame = Math.floor(progress*endFrame) % settings.imageCount;

			showImageAt( toFrame );
			//console.log ( "progress ", toFrame, " | ", progress, " | ", scrollTopTweened, " | ", pos );

			// if (Math.ceil(scrollTopTweened) !== Math.floor(scrollTop)) {
			// 	// smooth out scrolling action
			// 	//scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
			// 	scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);

			// 	// run through animations
			// 	for (var i in animation) {
			// 		var anim = animation[i];

			// 		// check if animation is in range
			// 		if (scrollTopTweened >= anim.startAt && scrollTopTweened <= anim.endAt) {
			// 			startAnimatable( anim );
			// 			render( anim );
			// 		} else {
			// 			stopAnimatable( anim );
			// 		}
			// 	}

			// 	// onAnimate callback
			// 	if (typeof settings.onUpdate === 'function') settings.onUpdate();
			// };
		};

		/* run before animation starts when animation is in range */
		var startAnimatable = function( anim ) {
			// apply start properties
			if (!anim._started) {
				if (anim.onStartAnimate && typeof anim.onStartAnimate === 'function') {
					anim.onStartAnimate.call( anim );
				} else {
					anim._elem.css('display', 'block');
				}

				//console.log('starting', anim.id);
				anim._started = true;

			}
		}

		/* run after animation is out of range  */
		var stopAnimatable = function( anim ) {
			// apply end properties
			if (anim._started && anim.endAt < scrollTopTweened || anim._started && anim.startAt > scrollTopTweened ) {
				if (anim.onEndAnimate && typeof anim.onEndAnimate === 'function') {
					anim.onEndAnimate.call( anim );
				} else {
					anim._elem.css('display', 'none');
				}
				//console.log('stopping', anim.id);
				anim._started = false;

			}
		}

		/*
		sets up all the start and end parameters for each animation
		this will run when our page is loaded and on resizing
		*/
		var setAnimatable = function() {
			for (var i in animation) {
				var anim = animation[i];

				// grab dom element
				if (anim._elem == undefined) {
					anim._elem = $('#'+anim.id);
				}

				// iterate through keyframes
				for (var k in anim.keyframes) {
					var keyframe = anim.keyframes[k];

					/*	// default starting properties
						startProperties = {
							display: 'none',
							position: 'absolute'
						};

					// apply starting properties
					if (keyframe.position == 0) {
						anim._elem.css( $.extend( startProperties, keyframe.properties ) );
					};*/

					// setup keyframe 0
					if (keyframe.position == 0) {
						var nKeyframe = anim.keyframes[Number(k)+1];	// next keyframe
						for (property in nKeyframe.properties) {
							if (keyframe.properties[ property ] == undefined) {
								// grab current offset and load into properties for keyframe 0
								if (/left|top/.test(property)) {
									keyframe.properties[ property ] = anim._elem.position()[ property ];
								}

								// todo: width & height
							}
						}
					}

					// fill in properties from current element
					// find missing properties from last occurance of property
					var bIndex = Number(k); // start 1 back from current

					while (bIndex > 0) {
						var bKeyframe = anim.keyframes[ bIndex ];

						for (var property in bKeyframe.properties) {
							if ( keyframe.properties[ property ] == undefined) {
								keyframe.properties[ property ] = bKeyframe.properties[ property ];
							}
						}

						bIndex--;
					};

					// onInit callback
					if (typeof keyframe.onInit == 'function') keyframe.onInit( anim );

					// reorganize if relative
				}
			}
		}

		var render = function( anim ) {
			// figure out where we are within the scroll
			var progress = (anim.startAt - scrollTopTweened) / (anim.startAt - anim.endAt);

			var properties = {};

			// check and run keyframes within scroll range
			if (anim.keyframes) {
				for ( i = 1; i < anim.keyframes.length; i++ ) {
					var keyframe = anim.keyframes[ i ],
						lastkeyframe = anim.keyframes[ i - 1 ],
						keyframeProgress = ( lastkeyframe.position - progress ) / ( lastkeyframe.position - keyframe.position );

					if ( keyframeProgress > 0 && keyframeProgress < 1 ) {
						if (keyframe.onProgress && typeof keyframe.onProgress === 'function') {
							//console.log(keyframe.position, keyframeProgress, keyframe);
							keyframe.onProgress( keyframeProgress );
						};

						for ( property in keyframe.properties ) {
							properties[ property ] = getTweenedValue( lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease );
						}
					}
				}
			}

			// apply styles
			anim._elem.css( properties );

			// onProgress callback
			if (anim.onProgress && typeof anim.onProgress === 'function') {
				anim.onProgress.call(anim, progress );
			}
		}

		var resize = function() {

			// onResize
			if (settings.onResize && typeof settings.onResize === 'function') settings.onResize();

			var container = settings.container;

			page = {
				wWidth:  settings.container.width(),
				wHeight: settings.container.height(),
				wCenter: { left: settings.container.width()/2, top: settings.container.height()/2 }
			};

//			resetAnimatable();
			setAnimatable();
			start();
		};

		var start = function() {
			//console.log('start', settings.startAt);
			if (!started && settings.startAt) scrollTopTweened = scrollTop = settings.startAt;

			scrollTop++;

			if (!started) {
				spin();
				started=true;
			};

			if (settings.onStart && typeof settings.onStart === 'function') {
				settings.onStart();
			}
		};

		// touch
		var touchStartHandler = function(e) {
			//e.preventDefault();
			touchStart.x = e.touches[0].pageX;

			// Store the position of finger on swipe begin:
			touchStart.y = e.touches[0].pageY;

			// Store scroll val on swipe begin:
			scrollStart = scrollTop;
		};

		var touchEndHandler = function(e) {

		}

		var touchMoveHandler = function(e) {

			/*if (settings.freezeTouchScroll == true) {
				$('#status2').html('freezin');
				return false;
			};
			$('#status2').html('moovin');
			*/

			e.preventDefault();
			offset = {};
			offset.x = touchStart.x - e.touches[0].pageX;

			// Get distance finger has moved since swipe begin:
			offset.y = touchStart.y - e.touches[0].pageY;

			// Add finger move dist to original scroll value
			scrollTop = Math.max(0, scrollStart + offset.y);
			checkScrollExtents();
		}

		// scrollwheel
		var wheelHandler = function(e, delta, deltaX, deltaY) {
			scrollTop -= delta * settings.scrollSpeed;
			if ( scrollTop < 0) scrollTop = 0;
			checkScrollExtents();
		};

		var checkScrollExtents = function() {
			if (scrollTop < 0) scrollTop = 0;
			else if (scrollTop > settings.maxScroll) scrollTop = settings.maxScroll;
		};



	// --------------------------------------------------
	// HELPERS
	// --------------------------------------------------


		// get tweened values
		var getTweenedValue = function(start, end, currentTime, totalTime, tweener) {
			var delta = end - start;
			var percentComplete = currentTime/totalTime;
			if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;

			return tweener(percentComplete) * delta + start
		}

		// dected if touch events
		var isTouch = function() {
			return 'ontouchstart' in window;
		}

		// --------------------------------------------------
		// PUBLIC
		// --------------------------------------------------
		root.init = function( opts ) {
			var defaults = {
					maxScroll: 1000,
					tickSpeed: 30,
					scrollSpeed: 20,
					useRAF: true,
					tweenSpeed: .3,
					freezeTouchScroll: false
				};

			settings = $.extend( defaults, opts );

			animation = settings.animation;
			// touch = isTouch();

			// if (touch) {
			// 	var container = settings.container[0];
			// 	container.addEventListener('touchstart', touchStartHandler, true);
			// 	container.addEventListener('touchmove', touchMoveHandler, true);
			// 	container.addEventListener('touchend', touchEndHandler, true);
			// 	/*
			// 	document.body.addEventListener('touchstart', touchStartHandler, true);
			// 	document.body.addEventListener('touchmove', touchMoveHandler, true);
			// 	document.body.addEventListener('touchend', touchEndHandler, true);
			// 	*/
			// }
			// d.on('mousewheel', wheelHandler);
			// w.on('resize', resizeHandler);

			// animation loop
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

			resize();

			return this;
		};

	};

})(jQuery);

