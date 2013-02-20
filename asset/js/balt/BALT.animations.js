
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
			return x + "px, " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
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
		// get tweened values
		root.getTweenedValue = function(start, end, currentTime, totalTime, tweener) {
		    var delta = end - start;
		    var percentComplete = currentTime/totalTime;
		    if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;
		    return tweener(percentComplete) * delta + start
		}
	};


	$.BALT.animation.parallax = function( o ) {

		// PARALLAX the clouds!!

		var root = this,
		scrollTopTweened = 0,
		scrollTop = 0,
		$body = $('body'),
		valX, valY, limitX, limitY,
		defaults = {
		},
		settings = $.extend( defaults, o );

		root.scroll = function( scrollY ) {
			scrollTop = scrollY;
		}
		
		root.init = function() {
					
			for (var i in settings.animation) {
				var anim = settings.animation[i];


				// grab dom element
				if (anim._elem == undefined) {
					anim._elem = $('.'+anim.id);
				}

				// iterate through keyframes
				for (var k in anim.keyframes) {
					var keyframe = anim.keyframes[k];


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
							properties[ property ] = calculations.getTweenedValue( lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease );
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

		root.animationLoop = function() {
			if (Math.ceil(scrollTopTweened) !== Math.floor(scrollTop)) {
				// smooth out scrolling action
				//scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
				scrollTopTweened += .3 * (scrollTop - scrollTopTweened);

				// run through animations
				for (var i in animation) {
					var anim = animation[i];
					
					// check if animation is in range
					if (scrollTopTweened >= anim.startAt && scrollTopTweened <= anim.endAt) {
				//		startAnimatable( anim );
						render( anim );
					} else {
				//		stopAnimatable( anim );
					}
				}

				// onAnimate callback
				//if (typeof settings.onUpdate === 'function') settings.onUpdate();
			};
		}

		// root.scroll = function( scrollY ) {
		// 	scrollTop = scrollY;
		// 	console.log ( 'scrollTop: ', scrollTop );
		// 	var i = 0;
		// 	while ( i < keyframes.length ) {
		// 		if ( keyframes[i].startAt < scrollTop && scrollTop < keyframes[i].endAt  ) {
		// 			if ( keyframes[i].onProgress && typeof keyframes[i].onProgress == 'function' ) keyframes[i].onProgress( scrollTop );
		// 		}
		// 		i++;
		// 	}
		// }

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
			// if ( scrollY >= settings.startAt && scrollY <= settings.endAt ) {
			// 	cancelAnimation = false;
			// 	raf = requestAnimationFrame(spin);
			// } else {
			// 	if ( !cancelAnimation ) cancelAnimationFrame( raf );
			// 	cancelAnimation = true;
			// }
		}

		var spin = function() {
			//if ( !cancelAnimation ){
				requestAnimationFrame(spin);
			//
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

			spin();

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

	//notify listeners
		var dispatch = function() {
			var i = settings.register.length;
			while ( i-- ){
				scroll( scrollTop );
				settings.register[i].scroll( scrollTop );
			}
		};

	//move page and scrubber
		var scroll = function( scrollY ) {
			var y = ( scrollY / settings.maxScroll ) * ( windowHeight - 122 );
			$main.css({
				transform : 'translate( 0px, ' + (scrollY*-1) + 'px)'
			});
			$scrubber.css({
				transform: 'translateY(' + y + 'px)'
			});
		};
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
			e.preventDefault();
			offset = {};
			offset.x = touchStart.x - e.touches[0].pageX;
			// Get distance finger has moved since swipe begin:
			offset.y = touchStart.y - e.touches[0].pageY;	
			// Add finger move dist to original scroll value
			scrollTop = Math.max(0, scrollStart + offset.y);
			checkScrollExtents();
		}

	//wheel
		var wheelHandler = function(e, delta, deltaX, deltaY) {
			e.preventDefault();
			scrollTop -= delta * settings.scrollSpeed;
			checkScrollExtents();
			dispatch();
		};

	//scrubber
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

		root.init = function() {
			$document.on('mousewheel', wheelHandler);
			$scrubber.on ( 'mousedown', mousedown );
			$window.on ( 'mouseup', mouseup );

			if ( 'ontouchstart' in window ) {
				var container = settings.container[0];
				container.on('touchstart', touchStartHandler);
				container.on('touchmove', touchMoveHandler);
				container.on('touchend', touchEndHandler);
			}

			resize();
			scrollTo ( settings.startAt );
		}

		var resize = function() {
			$scroller.height( windowHeight - 4 );
		};

	};

})(jQuery);

