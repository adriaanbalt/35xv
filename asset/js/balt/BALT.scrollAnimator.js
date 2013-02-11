/* Author: 

*/

var ScrollAnimator = function() {
	var settings = {},
		page,
		started = false;

	// counters etc
	var	w = $(window),
		d = $(document),
		touch = false,					// is touch device
		touchStart = { x: 0, y: 0 },	// vars for touch
		scrollStart = 0,				// vars for scroll
		scrollTopTweened = scrollTop = 0;
		
	
	// --------------------------------------------------
	// ANIMATION
	// --------------------------------------------------
	function animationLoop() {
		requestAnimFrame(animationLoop);

		if (Math.ceil(scrollTopTweened) !== Math.floor(scrollTop)) {
			// smooth out scrolling action
			//scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
			scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);

			// update status
			$('#status').html( scrollTop );


			// run through animations
			for (var i in animation) {
				var anim = animation[i];

				// check if animation is in range
				if (scrollTopTweened >= anim.startAt && scrollTopTweened <= anim.endAt) {
					startAnimatable( anim );
					render( anim );
				} else {

					stopAnimatable( anim );
				}
			}

			// onAnimate callback
			//if (typeof settings.onUpdate === 'function') settings.onUpdate();
		};	
	};


	function render( anim ) {
		// figure out where we are within the scroll
		var progress = (anim.startAt - scrollTopTweened) / (anim.startAt - anim.endAt);

		var properties = {};

		// check and run keyframes within scroll range
		if (anim.onProgress && typeof anim.onProgress === 'function') {
			//console.log(keyframe.position, progress, keyframe);
			anim.onProgress( progress );
		};

		// for ( property in anim.properties ) {
		// 	properties[ property ] = getTweenedValue( lastkeyframe.properties[property], keyframe.properties[property], progress, 1, anim.ease );
		// }

		// apply styles
		//anim._elem.css( properties );
	}

	/* run before animation starts when animation is in range */
	function startAnimatable( anim ) {
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
	function stopAnimatable( anim ) {
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
	function setAnimatable() {
		for (var i in animation) {
			var anim = animation[i];

			// grab dom element
			if (anim._elem == undefined) {
				anim._elem = $('#'+anim.id);
			}
		}
	}
	
	function resize() {
		// onResize
		if (settings.onResize && typeof settings.onResize === 'function') settings.onResize();
			
		var container = settings.container;

		page = {
			wWidth:  settings.container.width(),
			wHeight: settings.container.height(),
			wCenter: { left: settings.container.width()/2, top: settings.container.height()/2 }
		};


		
		resetAnimatable();
		setAnimatable();
		start();
	}
	
	// resets animations
	function resetAnimatable() {
		for (var i in animation) {
			var anim = animation[i];
		
			if (anim._started) {
				delete anim._elem;
				delete anim._started;
			}
		}
	}


	// --------------------------------------------------
	// EVENT HANDLERS
	// --------------------------------------------------

	// window resize 
	function resizeHandler(e) {
		resize();
	}

	
	// touch
	function touchStartHandler(e) {
		//e.preventDefault();
		touchStart.x = e.touches[0].pageX;

		// Store the position of finger on swipe begin:
		touchStart.y = e.touches[0].pageY;

		// Store scroll val on swipe begin:
		scrollStart = scrollTop;
	};

	function touchEndHandler(e) {
		
	}

	function touchMoveHandler(e) {

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
	function wheelHandler(e, delta, deltaX, deltaY) {
		scrollTop -= delta * settings.scrollSpeed;
		if ( scrollTop < 0) scrollTop = 0;
		checkScrollExtents();
	};

	function checkScrollExtents() {
		if (scrollTop < 0) scrollTop = 0;
		else if (scrollTop > settings.maxScroll) scrollTop = settings.maxScroll;
	}


	// clicks
	// keyboard
	// touch
	// orientation
	// mouse
	// intro
	// loading
	// app loop

	
	// --------------------------------------------------
	// HELPERS
	// --------------------------------------------------
	

	// get tweened values
	function getTweenedValue(start, end, currentTime, totalTime, tweener) {
	    var delta = end - start;
	    var percentComplete = currentTime/totalTime;
	    if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;

	    return tweener(percentComplete) * delta + start
	}
	
	// dected if touch events
	function isTouch() {
		return 'ontouchstart' in window;
	}

	

	// --------------------------------------------------
	// PUBLIC
	// --------------------------------------------------
	function init( opts ) {
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
		touch = isTouch();


		
		if (touch) {
			
			var container = settings.container[0];
			container.addEventListener('touchstart', touchStartHandler, true);
			container.addEventListener('touchmove', touchMoveHandler, true);
			container.addEventListener('touchend', touchEndHandler, true);
			/*
			document.body.addEventListener('touchstart', touchStartHandler, true);
			document.body.addEventListener('touchmove', touchMoveHandler, true);
			document.body.addEventListener('touchend', touchEndHandler, true);
			*/
		}
		d.on('mousewheel', wheelHandler);
		w.on('resize', resizeHandler);

		// animation loop
		window.requestAnimFrame = (function(){
			console.log ( "REQUEST ANIME FRAME" );
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
	
	// start
	function start() {
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

	function getPageInfo() {
		return page;
	};

	function getScrollTop() {
		return scrollTopTweened;
	};

	function getMaxScroll() {
		return settings.maxScroll;
	};

	function scrollTo( scroll ) {
		scrollTop = scroll;
	};

	function autoScroll() {
		setInterval( aScroll, 100  );
	}

	function aScroll() {
		scrollTop+= 5;
		if (scrollTop > settings.maxScroll) scrollTop = scrollTopTweened = 0;
	}

	function stopScroll() {
		scrollTopTweened = scrollTop;
	}

	function freezeTouchScroll() {
		settings.freezeTouchScroll = true;
	}

	function unfreezeTouchScroll() {
		settings.freezeTouchScroll = false;
	}

	function toggleDebug() {
		if (settings.debugId == false || settings.debugId == undefined) {
			console.log('debug on');
			settings.debugId=true;
			$('#status2').show();
			$('#status').show();
		} else {
			console.log('debug off');
			settings.debugId=false;
			$('#status2').hide();
			$('#status').hide();
		}
		
		for (var i in animation) {
			var anim = animation[i];

			if (settings.debugId == true) {
				anim._elem.css('border', '1px dashed red');
				anim._elem.prepend('<div class="debugid">'+anim.id+'</div>');
			} else {
				anim._elem.css('border', '');
				$('body').find('.debugid').remove();
			}
		}
	};

	function isDebug() {
		return settings.debug;
	};

	return {
		init: init,
		start: start,
		getPageInfo: getPageInfo,
		getScrollTop: getScrollTop,
		getMaxScroll: getMaxScroll,
		autoScroll: autoScroll,
		stopScroll: stopScroll,
		scrollTo: scrollTo,
		freezeTouchScroll: freezeTouchScroll,
		unfreezeTouchScroll: unfreezeTouchScroll,
		isDebug: isDebug,
		toggleDebug: toggleDebug
	}
};

	

