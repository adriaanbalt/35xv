
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

		var windowWidth, windowHeight, windowCenter;

		var resize = function() {
			windowWidth = $window.width();
			windowHeight = $window.height();
			windowCenter = { left: $window.width()/2, top: $window.height()/2 };
		};

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

		root.calcScrubber = function( scroll, maxScroll ) {
			return ( scroll / maxScroll ) * ( windowHeight - 122 );
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
		};

		root.absPosition = function(opts) {
			var defaults = {startLeft: 0,
							startTop: 0,
							endLeft: 0,
							endTop: 0},
			settings = $.extend(defaults, opts);
			this.startProperties['left'] = settings.startLeft;
			this.startProperties['top'] = settings.startTop;
			this.endProperties['left'] = settings.endLeft;
			this.endProperties['top'] = settings.endTop;
			this.startProperties['display'] = 'block';
			this.endProperties['display'] = 'none';
		};
			
		root.bottomLeftOutside = function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			resize();
			var portrait = false, //windowHeight > windowWidth ? true : false,
				elemHalfWidth = anim._elem.width()/2,
				elemHalfHeight = anim._elem.height()/2,
				adj = portrait ? windowWidth/2 + elemHalfWidth : adj = windowHeight/2 + elemHalfHeight,
				tan = Math.sqrt( Math.pow( adj, 2) + Math.pow( adj, 2) );
			
			this.properties['top'] = windowCenter.top + adj - elemHalfHeight + (portrait ? settings.offset : 0);
			this.properties['left'] = windowCenter.left - adj - elemHalfWidth + (portrait ? 0 : settings.offset);
		};
		
		root.topRightOutside =function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			var portrait = false, //windowHeight > windowWidth ? true : false,
				elemHalfWidth = anim._elem.width()/2,
				elemHalfHeight = anim._elem.height()/2,
				adj = portrait ? windowWidth/2 + elemHalfWidth : adj = windowHeight/2 + elemHalfHeight,
				tan = Math.sqrt( Math.pow( adj, 2) + Math.pow( adj, 2) );

			this.properties['top'] = windowCenter.top - adj - elemHalfHeight + (portrait ? settings.offset : 0);
			this.properties['left'] = windowCenter.left + adj - elemHalfWidth + (portrait ? 0 : settings.offset);
		};
		
		root.leftOutside = function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['left'] = -anim._elem.width() + settings.offset;
		};

		root.rightOutside = function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['left'] = windowWidth + settings.offset;
		};

		root.centerV = function( anim, opts ) {
			resize();
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			var elemHalfHeight = anim._elem.height()/2;
			this.properties['top'] = windowCenter.top - elemHalfHeight + settings.offset;

			console.log ( 'this.properties : ', this.properties );
		};

		root.centerH = function( anim, opts ) {
			resize();
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			
			var elemHalfWidth = anim._elem.width()/2;
			
			this.properties['left'] = windowCenter.left - elemHalfWidth + settings.offset;
		};

		root.bottomOutside = function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['top'] = windowHeight + settings.offset;
		};

		root.topOutside = function( anim, opts) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['top'] = -anim._elem.height() + settings.offset;
		};

		$window.resize( resize );
		resize();

	};

	$.BALT.animation.keyframes = function( o ) {
		return [
		{
			'id' : 'cloud0',
			'startAt' : gotoSection['home'],
			'endAt' : gotoSection['design'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerH.call( this, anim, {});
						calculations.centerV.call( this, anim, {});
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerH.call( this, anim, {});
						calculations.bottomOutside.call( this, anim, {});
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : 'building-large',
			'startAt' : gotoSection['design'],
			'endAt' : gotoSection['design-team'],
			onProgress: function(progress) {
				var is = imageSequences['building-large'];
				var endFrame = (is.imageCount/is.skipImages),
					toFrame = Math.floor(progress*endFrame) % is.imageCount;
				is.showImageAt( Math.floor(toFrame) );
			}
		},
		{
			'id' : 'building-small',
			'startAt' : gotoSection['amenities-services'],
			'endAt' : gotoSection['neighborhood'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
					//	calculations.centerV.call( this, anim, {});
					},
					properties: {
						top: 250
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						//calculations.bottomOutside.call( this, anim, {});
					},
					properties: {
						top: 5650
					}
				}
			]
		},
		{
			'id' : 'cloud1',
			'startAt' : gotoSection['design'],
			'endAt' : gotoSection['design-team'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						console.log ( anim );
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : 'cloud2',
			'startAt' : gotoSection['design-team'],
			'endAt' : gotoSection['residences'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
						
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : 'cloud3',
			'startAt' : gotoSection['residences'],
			'endAt' : gotoSection['feature'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
						
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : 'cloud4',
			'startAt' : gotoSection['feature'],
			'endAt' : gotoSection['availability'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
						
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : 'cloud5',
			'startAt' : gotoSection['availability'],
			'endAt' : gotoSection['amenities-services'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
						
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : 'cloud6',
			'startAt' : gotoSection['amenities-services'],
			'endAt' : gotoSection['neighborhood'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
						
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : 'cloud7',
			'startAt' : gotoSection['neighborhood'],
			'endAt' : gotoSection['team'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
						
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : 'cloud8',
			'startAt' : gotoSection['team'],
			'endAt' : gotoSection['press'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
						
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		}
		];
	};

	$.BALT.animation.scroller = function( o ) {
	//public
		var root = this,
	//dom
		$document = $(document),
		$scrubber = $('#scrubber'),
		$scroller = $('#scroller'),
		$main = $('#main'),
	//scroll
		scrollTop = 0,
		scrollTopTweened = 0,
	//autoplay
		currentScrollTop = 0,
		gotoScrollTop = 0,
		autoScrollInterval = 0,
	//scrubber
		lastY = 0,
		started = false,
	//settings
		defaults = {
			scrollSpeed : 40,
			tickSpeed: 30,
			useRAF: true,
			tweenSpeed: .3
		},
		settings = $.extend( defaults, o );

	//notify listeners
		var dispatch = function() {
			var i = settings.register.length;
			while ( i-- ){
				scroll();
				settings.register[i].scroll( scrollTop );
			}
		};

		var setupAnimation = function() {

			for (var i in settings.animation) {
				var anim = settings.animation[i];

				// grab dom element
				if (anim._elem == undefined) {
					anim._elem = $("#" + anim.id);
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

	// animation
		var animationLoop = function() {
			requestAnimationFrame( animationLoop );
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
				anim.onProgress.call( anim, progress );
			}			
		}
		
	//move page and scrubber
		var scroll = function() {
			var y = calculations.calcScrubber( scrollTop, settings.maxScroll );
			$main.css({
				transform : 'translate( 0px, ' + (scrollTop*-1) + 'px)'
			});
			$scrubber.css({
				transform: 'translateY(' + y + 'px)'
			});
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

	// generic
		root.start = function() {
			setupAnimation();

			//console.log('start', settings.startAt);
			if (!started && settings.startAt) scrollTopTweened = scrollTop = settings.startAt;
			
			scrollTop++;

			if (!started) {
				animationLoop();
				started=true;
			};

			if (settings.onStart && typeof settings.onStart === 'function') {
				settings.onStart();
			}
		}

		var resize = function() {
			$scroller.height( windowHeight - 4 );
		};

		var init = function() {
			$document.on('mousewheel', wheelHandler);
			$scrubber.on ( 'mousedown', mousedown );
			$window.on ( 'mouseup', mouseup );

			if ( 'ontouchstart' in window ) {
				var container = settings.container[0];
				container.on('touchstart', touchStartHandler);
				container.on('touchmove', touchMoveHandler);
				container.on('touchend', touchEndHandler);
			}

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

			resize();
			scrollTo ( settings.startAt );
		}


		init();

	};

})(jQuery);

