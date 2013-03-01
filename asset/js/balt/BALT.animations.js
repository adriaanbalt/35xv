
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
		offsetY = 0,
		scrubbrerUpperLimit = 0,
		scrubberHeight = 122,
		started = false,
	//touch
		touchStart = {},
		scrollStart = 0,
	//settings
		defaults = {
			scrollSpeed : 40,
			tickSpeed: 30,
			useRAF: true,
			tweenSpeed: 0.3,
			startAt: 0
		},
		settings = $.extend( defaults, o );


	// start!
		root.start = function( o ) {
			console.log ( "start" );
			settings = $.extend( settings, o );
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
		};

		var setupAnimation = function() {

			for (var i in settings.animation) {
				var anim = settings.animation[i];

				// grab dom element
				if (anim._elem == undefined) {
					anim._elem = $(anim.id);
				}

				// iterate through keyframes
				for (var k in anim.keyframes) {
					var keyframe = anim.keyframes[k];

					// onInit callback
					if (typeof keyframe.onInit == 'function') keyframe.onInit( anim );

					// setup keyframe 0
					if (keyframe.position == 0) {
						var nKeyframe = anim.keyframes[Number(k)+1];	// next keyframe

						anim._elem.css( keyframe.properties );

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

//					console.log ( anim.id , k, keyframe.properties );

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

					// reorganize if relative
				}
			//	console.log ( ' ' );
			}
		}
		// resets animations
		var resetAnimation = function() {
			for (var i in settings.animation) {
				var anim = settings.animation[i];
				if (anim._started) {
					delete anim.startAt;
					delete anim.endAt;
					delete anim._elem;
					delete anim._started;
				}
			}
		}

	// animation
		var animationLoop = function() {
			requestAnimationFrame( animationLoop );
			if (Math.ceil(scrollTopTweened) !== Math.floor(scrollTop)) {
				// smooth out scrolling action
				scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);

				// run through animations
				for (var i in settings.animation) {
					var anim = settings.animation[i];

					// check if animation is in range
					if (scrollTopTweened >= anim.startAt && scrollTopTweened <= anim.endAt) {
						// startAnimatable( anim );
						render( anim );
					} else {
						// stopAnimatable( anim );
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
							properties[ property ] = Math.round( calculations.getTweenedValue( lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease ) );
						}
					}
				}
			}

			// apply styles
			anim._elem.css( properties );

			// console.log ( "anim._elem " , anim._elem, properties, anim._elem.position() );

			// onProgress callback
			if (anim.onProgress && typeof anim.onProgress === 'function') {
				anim.onProgress.call( anim, progress );
			}
		}

		/* run before animation starts when animation is in range */
		var startAnimatable = function( anim ) {
			// apply start properties
			if (!anim._started) {
				if (anim.onStartAnimate && typeof anim.onStartAnimate === 'function') {
					anim.onStartAnimate.call( anim );
				} else {
					anim._elem.css('display', 'block');
				}

			//	console.log('starting', anim.id);
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

			//	console.log('stopping', anim.id);
				anim._started = false;
			}
		}


	//notify listeners
		var dispatch = function() {
			var i = settings.register.length;
			while ( i-- ){
				scroll();
				settings.register[i].scroll( scrollTop );
			}
		};

	//move page and scrubber
		var scroll = function() {
			var y = calculations.calcScrubber( scrollTop, settings.maxScroll );
			$main.css({
				top: (scrollTop*-1) + 'px'
			});
			$scrubber.css({
				top: y + 'px'
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
			touchStart.x = e.originalEvent.touches[0].pageX;
			// Store the position of finger on swipe begin:
			touchStart.y = e.originalEvent.touches[0].pageY;
			// Store scroll val on swipe begin:
			scrollStart = scrollTop;
		};
		var touchEndHandler = function(e) {
		}
		var touchMoveHandler = function(e) {
			e.preventDefault();
			offset = {};
			offset.x = touchStart.x - e.originalEvent.touches[0].pageX;
			// Get distance finger has moved since swipe begin:
			offset.y = touchStart.y - e.originalEvent.touches[0].pageY;
			// Add finger move dist to original scroll value
			scrollTop = Math.max(0, scrollStart + offset.y);
			checkScrollExtents();
			dispatch();
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
			offsetY = e.offsetY;
			$window.on( 'mousemove', mousemove );
		};
		var mouseup = function( e ) {
			$window.off( 'mousemove', mousemove );
		};
		var mousemove = function( e ) {
			var scrubberPos,
			pos = ( e.pageY - offsetY ); // where the mouse is minus the offsetclicked on the scrubber
			scrubberPos = (pos < scrubbrerUpperLimit ? scrubbrerUpperLimit : pos);
			scrubberPos = (scrubberPos > (windowHeight-scrubberHeight) ? (windowHeight-scrubberHeight) : scrubberPos)

			// var delta = e.pageY - lastY;
			// scrollTop += delta;
			scrollTop = (( scrubberPos / (windowHeight-scrubberHeight) ) * settings.maxScroll ) ;
			checkScrollExtents();

			dispatch();

			$scrubber.css({
				top: scrubberPos + 'px',
				transform: 'translateY(' + scrubberPos + 'px)'
			});

		};

		var checkScrollExtents = function() {
			if (scrollTop < 0) scrollTop = 0;
			else if (scrollTop > settings.maxScroll) scrollTop = settings.maxScroll;
		}

		var resize = function() {
			$scroller.height( windowHeight - 4 );
			if (settings.onResize && typeof settings.onResize === 'function') settings.onResize();
			resetAnimation();
			setupAnimation();
		};

		var init = function() {
			$document.on('mousewheel', wheelHandler);
			$scrubber.on ( 'mousedown', mousedown );
			$window.on ( 'mouseup', mouseup );
			$window.resize ( 'resize', resize );

			if ( 'ontouchstart' in window ) {
				$window.on('touchstart', touchStartHandler);
				$window.on('touchmove', touchMoveHandler);
				$window.on('touchend', touchEndHandler);
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
			root.scrollTo ( settings.startAt );

		}

		init();

	};


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

		root.calcProgress = function( startAt, endAt, scrollTop ) {
			return ( (startAt - scrollTop) / (startAt - endAt) );
		};

		root.calcScrubber = function( scroll, maxScroll ) {
			return ( scroll / maxScroll ) * ( windowHeight - 122 );
		};

		root.calcDegrees2Radians = function( degrees ) {
			return ( degrees * Math.PI / 180 );
		};


		rootimageResize = function( img, w, h ) {
			img.width( w );
			img.height( Math.round ( w * root.settings.ratio ) );
			if ( img.height() < h ) {
				img.height( h );
				img.width( Math.round ( h / root.settings.ratio ) );
			}
			return img;
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

		root.bottomOutsideAnim = function( anim, opts) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['top'] = anim.endAt + settings.offset;
		};

		root.bottomInside = function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['top'] = windowHeight - settings.offset;
		};

		root.topOutside = function( anim, opts) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['top'] = -anim._elem.height() + settings.offset;
		};

		root.zeroTop = function( anim, opts) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['top'] = 0 + settings.offset;
		};

		root.zeroLeft = function( anim, opts) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['left'] = 0 + settings.offset;
		};

		root.gallery_translate = function( scrollY ) {
			limitX = (root.settings.itemWidth - endX + 130 );
			limitY = (endY - root.settings.itemHeight);
			if ( scrollY < root.settings.endAt && scrollY > root.settings.startAt ){
				endX = root.settings.totalImagesWidth;
				endY = $target.height();

				cur_time = ( scrollY - root.settings.startAt ) ;
				tot_time = ( root.settings.endAt - root.settings.startAt );

				valX = getTweenedValue( startX, endX, cur_time, tot_time ) * -1;
				valY = getTweenedValue( startY, endY, cur_time, tot_time );

				if ( valX < limitX ){
					valX = limitX;
				}
				if ( valY > limitY ){
					valY = limitY;
				}

			} else if ( scrollY < root.settings.startAt ) {
				valX = 0;
				valY = 0;
			} else if ( scrollY > root.settings.endAt ) {
				valX = limitX;
				valY = limitY;
			}

			this.properties['top'] = valY;
			this.properties['left'] = valX;

			// var properties = {
			// 	'transform': "translate("+valX+"px,"+valY+"px)",
			// 	'-ms-transform': "translate("+valX+"px,"+valY+"px)", /* IE 9 */
			// 	'-webkit-transform': "translate("+valX+"px,"+valY+"px)",  Safari and Chrome 
			// 	'-o-transform': "translate("+valX+"px,"+valY+"px)", /* Opera */
			// 	'-moz-transform': "translate("+valX+"px,"+valY+"px)" /* Firefox */
			// };

			// this.properties = properties;
		};

		root.sequence = function( is, progress ) {
			var endFrame = (is.imageCount/is.skipImages),
				toFrame = Math.floor(progress*endFrame) % is.imageCount;
			is.showImageAt( Math.floor(toFrame) );
		};

		$window.resize( resize );
		resize();

	};

	$.BALT.animation.keyframes = function( o ) {
		return [
		{
			'id' : '#building-large',
			'startAt' : gotoSection['home'],
			'endAt' : gotoSection['design'] + windowHeight,
			onProgress: function(progress) {
				calculations.sequence( imageSequences['building-large'], progress );
			},
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Quadratic.EaseIn,
					properties: {
						top: 0, left: 50
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Quadratic.EaseIn,
					properties: {
						top: 0, left: -200
					}
				}
			]
		},
		// {
		// 	'id' : '#building-small',
		// 	'startAt' : gotoSection['services-amenities'],
		// 	'endAt' : gotoSection['neighborhood'] - windowHeight,
		// 	keyframes :[
		// 		{
		// 			position: 0,
		// 			ease: TWEEN.Easing.Linear.EaseNone,
		// 			onInit: function( anim ) {
		// 				calculations.zeroTop.call( this, anim, { offset: 100 });
		// 				calculations.centerH.call( this, anim, { offset: 0 });
		// 			},
		// 			properties: {
		// 				top: 0, left: 0
		// 			}
		// 		},
		// 		{
		// 			position: 1,
		// 			ease: TWEEN.Easing.Linear.EaseNone,
		// 			onInit: function( anim ) {
		// 				calculations.bottomOutside.call( this, anim, { offset: $('.services-amenities').height() - windowHeight - anim._elem.height() - 500 });
		// 				calculations.centerH.call( this, anim, { offset: 0 });
		// 			},
		// 			properties: {
		// 				top: 0, left: 0
		// 			}
		// 		}
		// 	]
		// },
		// {
		// 	'id' : '#residences-gallery .gallery-container',
		// 	'startAt' : gotoSection['residences'],
		// 	'endAt' : gotoSection['featured-plan'] - windowHeight,
		// 	keyframes :[
		// 		{
		// 			position: 0,
		// 			ease: TWEEN.Easing.Linear.EaseNone,
		// 			onInit: function( anim ) {
		// 				calculations.zeroTop.call( this, anim, {});
		// 				calculations.zeroLeft.call( this, anim, {});
		// 			},
		// 			properties: {
		// 				top: 0, left: 0
		// 			}
		// 		},
		// 		{
		// 			position: 1,
		// 			ease: TWEEN.Easing.Linear.EaseNone,
		// 			onInit: function( anim ) {
		// 				calculations.zeroLeft.call( this, anim, { offset: gallerySequences['residences-gallery'].gWidth });
		// 				calculations.zeroTop.call( this, anim, { offset: gallerySequences['residences-gallery'].gHeight });
		// 			},
		// 			properties: {
		// 				top: 0, left: 0
		// 			}
		// 		}
		// 	]
		// },
		// {
		// 	'id' : '#amenities-gallery .gallery-container',
		// 	'startAt' : gotoSection['services-amenities'],
		// 	'endAt' : gotoSection['neighborhood'] - windowHeight,
		// 	keyframes :[
		// 		{
		// 			position: 0,
		// 			ease: TWEEN.Easing.Linear.EaseNone,
		// 			onInit: function( anim ) {
		// 				calculations.zeroTop.call( this, anim, {});
		// 				calculations.zeroLeft.call( this, anim, {});
		// 			},
		// 			properties: {
		// 				top: 0, left: 0
		// 			}
		// 		},
		// 		{
		// 			position: 1,
		// 			ease: TWEEN.Easing.Linear.EaseNone,
		// 			onInit: function( anim ) {
		// 				calculations.zeroLeft.call( this, anim, { offset: gallerySequences['amenities-gallery'].gWidth });
		// 				calculations.zeroTop.call( this, anim, { offset: gallerySequences['amenities-gallery'].gHeight });
		// 			},
		// 			properties: {
		// 				top: 0, left: 0
		// 			}
		// 		}
		// 	]
		// },
		{
			'id' : '#cloud0',
			'startAt' : gotoSection['design'],
			'endAt' : gotoSection['design-team'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: 1500 });
						calculations.centerH.call( this, anim, { offset: -400 });

					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.topOutside.call( this, anim, {});
						calculations.centerH.call( this, anim, { offset: -700 });
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : '#cloud1',
			'startAt' : gotoSection['home'],
			'endAt' : gotoSection['design-team'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: 300 });
						calculations.centerH.call( this, anim, { offset: 600 });
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.topOutside.call( this, anim, {});
						calculations.centerH.call( this, anim, { offset: 800 });
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : '#cloud2',
			'startAt' : gotoSection['floor-plans'],
			'endAt' : gotoSection['services-amenities'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt - 400 });
						calculations.rightOutside.call( this, anim, { offset: - 50 });
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.endAt });
						calculations.leftOutside.call( this, anim, { });
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		},
		{
			'id' : '#cloud3',
			'startAt' : gotoSection['team'],
			'endAt' : gotoSection['contact'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt });
						calculations.centerH.call( this, anim, { offset: -500 });
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.endAt - anim._elem.height() });
						calculations.centerH.call( this, anim, {});
						calculations.centerH.call( this, anim, { offset: -650 });
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		}
		,
		{
			'id' : '#cloud4',
			'startAt' : gotoSection['residences'],
			'endAt' : gotoSection['floor-plans'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt });
						calculations.centerH.call( this, anim, { offset: -500});
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt + 800 });
						calculations.rightOutside.call( this, anim, {});
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		}
		,
		{
			'id' : '#cloud5',
			'startAt' : gotoSection['residences'],
			'endAt' : gotoSection['floor-plans'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt+1200 });
						calculations.centerH.call( this, anim, { offset: 500});
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt + 1500 });
						calculations.leftOutside.call( this, anim, {});
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		}
		,
		{
			'id' : '#cloud6',
			'startAt' : gotoSection['residences'],
			'endAt' : gotoSection['floor-plans'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt+1800 });
						calculations.centerH.call( this, anim, { offset: -500});
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt + 2050 });
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		}
		,
		{
			'id' : '#cloud7',
			'startAt' : gotoSection['services-amenities'],
			'endAt' : gotoSection['neighborhood'],
			keyframes :[
				{
					position: 0,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt });
						calculations.leftOutside.call( this, anim, { offset: 150 });
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: .5,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt + 800 });
						calculations.centerH.call( this, anim, { offset: 0 });
					},
					properties: {
						top: 0, left: 0
					}
				},
				{
					position: 1,
					ease: TWEEN.Easing.Linear.EaseNone,
					onInit: function( anim ) {
						calculations.centerV.call( this, anim, { offset: anim.startAt + 1200 });
						calculations.leftOutside.call( this, anim, {});
					},
					properties: {
						top: 0, left: 0
					}
				}
			]
		}
		// ,
		// {
		// 	'id' : '#cloud8',
		// 	'startAt' : gotoSection['team'],
		// 	'endAt' : gotoSection['press'],
		// 	keyframes :[
		// 		{
		// 			position: 0,
		// 			ease: TWEEN.Easing.Linear.EaseNone,
		// 			onInit: function( anim ) {
		// 				calculations.centerV.call( this, anim, { offset: anim.startAt });
		// 				calculations.centerH.call( this, anim, {});
		// 			},
		// 			properties: {
		// 				top: 0, left: 0
		// 			}
		// 		},
		// 		{
		// 			position: 1,
		// 			ease: TWEEN.Easing.Linear.EaseNone,
		// 			onInit: function( anim ) {
		// 				calculations.topOutside.call( this, anim, {});
		// 				calculations.leftOutside.call( this, anim, {});
		// 			},
		// 			properties: {
		// 				top: 0, left: 0
		// 			}
		// 		}
		// 	]
		// }
		];
	};

})(jQuery);

