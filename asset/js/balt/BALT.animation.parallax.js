/*
@client BALT
@project Parallax Plugin

@author Adriaan Scholvinck | adriaan@BALT.us
@description Original Prototype
@date September 2012

MAKE DYNAMIC:
pass in an object that contains the following:

- reference to dom element
- functions to apply to element
- threshold for animation

*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};
	if ( !$.BALT.animation ) {
		$.BALT.animation = {};
	}

	$.BALT.animation.parallax = function( el, o ) {

		//save selectors as variables to increase performance
		var $window = $(window);
		windowHeight = 700; //get the height of a section
		var pos = scrollTopTweened = $window.scrollTop(); //position of the scrollbar

		var defaults = {
			maxScroll: 1000,
			tickSpeed: 30,
			useRAF: true,
			scrollSpeed: 20,
			tweenSpeed: .3,
			skipImages: 1,
			frameSpeed: 1
		},
		gotoSection = {
			'#shop': windowHeight * 0,
			'#accessories': windowHeight * 1,
			'#share': windowHeight * 2,
			'#display': windowHeight * 3,
			'#performance': windowHeight * 4,
			'#reviws': windowHeight * 5
		},
		$shop = $('#shop'),
		$accessories = $('#accessories'),
		$share = $('#share'),
		$display = $('#display'),
		$performance = $('#performance'),
		$reviews = $('#reviews'),
		$cart = $('#cart'),
		$spin = $('#spin'),
		rotate = 0,
		bottomOnce = false,
		currentIndex = -1;

		settings = $.extend( defaults, o );

		var hash = (window.location.hash==''?'#shop':window.location.hash);
		settings.startAt = gotoSection[ hash ];
		settings.endAt = $shop.height() + $accessories.height() + $share.height() + $display.height() + $performance.height() + $reviews.height();
		
		
		//var scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);

		var init = function () {
			bindEvents();
			resize();
		}

		/*
		@description
			function that is called for every pixel the user scrolls. Determines the position of the background
		@param 
			x = horizontal position of background
			windowHeight = height of the viewport
			pos = position of the scrollbar
			adjuster = adjust the position of the background
			inertia = how fast the background moves in relation to scrolling
		*/

		var calculations = {
			calcBgY : function(x, windowHeight, pos, adjuster, inertia){
				return x + " " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
			},
			calcBgX : function(y, windowHeight, pos, adjuster, inertia){
				return (-((windowHeight + pos) - adjuster) * inertia)  + "px " + y;
			},
			calcXY : function(windowHeight, pos, adjusterX, inertiaX, adjusterY, inertiaY){
				return (-((windowHeight + pos) - adjusterX) * inertiaX)  + "px " + (-((windowHeight + pos) - adjusterY) * inertiaY) + "px";
			},
			calcPos : function(windowHeight, pos, adjuster, inertia) {
				return (((windowHeight + pos) - adjuster) * inertia)  + "px ";
			},
			calcRot : function( r, windowHeight, pos, adjuster, inertia ){
				return (r + -(((windowHeight + pos) - adjuster ) * inertia));
			},
			calcProgress : function( startAt, endAt ) {
				progress = (startAt - scrollTopTweened) / (startAt - endAt);
				return progress;
			},
			calcDegrees2Radians : function( degrees ) {
				return ( degrees * Math.PI / 180 );
			}
		};

		var spin = function() {
			requestAnimFrame(spin);

			scrollTopTweened += settings.tweenSpeed * ($window.scrollTop() - scrollTopTweened);
			calcProgress( 10, settings.endAt );

			var endFrame = (settings.imageCount/settings.skipImages) * settings.frameSpeed,
			toFrame = Math.floor(progress*endFrame);
			toFrame = (toFrame < 0 ? 0 : toFrame);
			showImageAt( toFrame );

			move();
		};
		
		var showImageAt = function( index ) {
			if (index == currentIndex) return false;
			
			var image = settings.images.children()[ index ];

			if (image) {
				hideImageAt( currentIndex );
				currentIndex = index;
				image.style.display = 'block';
			} else {
			}
			
		};

		var hideImageAt = function( index ) {
			var image = settings.images.children()[ index ];
			if (image) image.style.display = 'none';	
		};

		var move = function(){
			if ( ){
				$spin.animate({
					opacity : 1,
					top: '10%'
					}, 800, function() {
				});
				$shop.find('.copy-left').delay(250).animate({
					opacity : 1,
					top: '50px'
					}, 500, function() {
				});
				$shop.find('.copy-right').delay(250).animate({
					opacity : 1,
					top: '50px'
					}, 500, function() {
					// done
				});
			}
			
			if($accessories.hasClass("inview")){
				if ( pos < 700 ){
					$accessories.find('.accessory-one').css({'background-position': calcBgX('65%', windowHeight, pos, 550, -0.3)});

					$accessories.find('.accessory-two').css({'background-position': calcBgX('50%', windowHeight, pos, 3150, 0.5)});

					$accessories.find('.accessory-three').css({'background-position': calcBgX('15%', windowHeight, pos, 2850, 0.7)});
				}
			}
			
			if( $share.hasClass("inview") && pos >= 850 && pos <= 1730 ){
				$share.find('.wheel').css({ 'top': calcPos(windowHeight, pos, 1500, 0.2) });
				$share.find('.wheel').css({ 'display': 'block' });
				rotate = calcRot(55, windowHeight, pos, 1970, 0.5);
				$share.find('.wheel').css(
					{ 
					'-ms-transform': 'rotate('+rotate+'deg)',
					'-webkit-transform': 'rotate('+rotate+'deg)',
					'transform': 'rotate('+rotate+'deg)',
					'-o-transform': 'rotate('+rotate+'deg)',
					'-moz-transform': 'rotate('+rotate+'deg)',
					'filter': 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ calcDegrees2Radians(rotate) +')'
					}
				);
			} else {
				$share.find('.wheel').css({ 'display': 'none' });
			}

			if($display.hasClass("inview")){
				var center = 1800 - ( $window.width() );
				$display.find('.phone').css({'background-position': calcBgX('50%', windowHeight, pos, center, -0.3)});
				$display.find('.image').css({'background-position': calcBgX('50%', windowHeight, pos, 1200, -0.3)});
			}

			if($performance.hasClass("inview")){
				var center = 4400 + ( $window.width() );
				if ( pos < 2800 ) $performance.find('.copy-left').css({'background-position': calcBgX('65%', windowHeight, pos, 2900, -0.4)});
				if ( pos < 2800 ) $performance.find('.copy-right').css({'background-position': calcBgX('50%', windowHeight, pos, 4000, 0.45)});
			}

			if ( pos > 600 ) {
				$('body').addClass('is-sticky');
			} else {
				$('body').removeClass('is-sticky');
			}

			if ( pos <= 3500 ) {
				// at the bottom
				if ( bottomOnce == true ) {
					bottomOnce = false;
					showImageAt( settings.imageCount );
					$reviews.find('.header').clearQueue();
					$reviews.find('.header').animate( {
						opacity : 0,
						right : '0px'
					}, 250 );
					$reviews.find('#spin-stopped').clearQueue();
					$reviews.find('#spin-stopped').animate({
						left: '37%'
						}, 250, function() {
							$('body').removeClass('is-bottom');
						} );
				}
			} else {
				bottomOnce = true;
				$('body').addClass('is-bottom');
				$reviews.find('.header').clearQueue();
				$reviews.find('.header').animate({
					opacity : 1,
					right: '-40px'
					}, 250 );
				$reviews.find('#spin-stopped').clearQueue();
				$reviews.find('#spin-stopped').animate({
					left: '21%'
					}, 250 );

			}
		};

		var scrolling = function() {
			pos = $window.scrollTop();
			move();	
		};

		var resize = function() {
			move();
		};
		
		var bindEvents = function(){
			$cart.click( function(e){
				if ( $(this).hasClass('is-open') ){
					$(this).removeClass('is-open').addClass('is-closed');
				} else if ( $(this).hasClass('is-closed') ){
					$(this).removeClass('is-closed').addClass('is-open');
				}
			});
			//apply the class "inview" to a section that is in the viewport
			$('.section').bind('inview', function (event, visible) { 
				if (visible == true) {
					$(this).addClass("inview");
				} else {
					$(this).removeClass("inview");
				}
			});
			$window.resize(resize);		
			$window.bind('scroll', scrolling);
			scrolling();
			spin();
		};

		// animation loop
		window.requestAnimFrame = (function(){
			if (settings.useRAF) {
				return  window.requestAnimationFrame || 
				window.webkitRequestAnimationFrame   || 
				window.mozRequestAnimationFrame      || 
				window.oRequestAnimationFrame        || 
				window.msRequestAnimationFrame       || 
				function( callback ){
					window.setTimeout(callback, settings.tickSpeed);
				};
			} else {
				return function( callback ){
					window.setTimeout( callback, settings.tickSpeed);
				}
			};
		})();

		init();
	};

})(jQuery);