/*
@project Helper

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Gallery with endless scroll and clones
*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.galleryScroll = function( container, o ) {
		var root = this,
		$container = container;
		root.settings = {
			loader : false,
			ratioResize : true,
			animating : false,
			itemWidth : $container.width(),
			slideCount : $container.find('.slide').length,
			containerWidth : ($container.width() * $container.find('.slide').length),
			loadCounter : 0,
			direction : 1,
			ratio : 0
		},
		root.settings = $.extend( root.settings, o );

		root.init = function() {

			if ( root.settings.loader ){
				var images = $container.find('.slide');
				images.each(function(){
					registerImgFileSize( this.src );
					if ( $(this)[0].complete || $(this)[0].readyState == 4 ) {
						imageLoaded();
					}
					$(this).load( imageLoaded );
				});
			} else {
				//preloadComplete();
			}

			root.settings.ratio = $container.find('.slide:eq(0)').height() / $container.find('.slide:eq(0)').width();

			// console.log ( '' );
			// console.log ( "target ", $container );
			// console.log ( "ratioResize ", root.settings.ratioResize );

			$(window).resize( resize );
			resize();
		};

		var imageLoaded = function( e ) {
			try {
				root.settings.loadCounter++;
				if (root.settings.loadCounter == (root.settings.slideCount-1) )  {
					//preloadComplete();
					resize();
				}
			} catch( err ) {
				// console.log ( "ERROR!!! ", err );
			}
		};

		var imageResize = function( img, w, h ) {
			img.width( w );
			img.height( Math.round ( w * root.settings.ratio ) );
			if ( img.height() < h ) {
				img.height( h );
				img.width( Math.round ( h / root.settings.ratio ) );
			}
		};


		var resize = function () {

			$container.find('.slide').each( function() {
				//$(this).css( {'width':$(window).width(), 'height':$(window).height()} );
				//$(this).width( $container.width() ).height( $container.height() );

			//	imageResize ( $(this), $container.width(), $container.height() )

				// $(this).width( $container.width() );

				// if ( root.settings.ratioResize ){
				// 	$(this).height( Math.round ( $container.width() * root.settings.ratio ) );
				// 	if ( $(this).height() < $container.height() ) {
				// 		$(this).height( $container.height() );
				// 		$(this).width( Math.round ( $container.height() / root.settings.ratio ) );
				// 	}
				// }

			});

			root.itemWidth = root.settings.itemWidth = $container.find('.slide:eq(0)').width();

			totalImagesWidth = root.settings.slideCount * root.settings.itemWidth;

			root.containerWidth = totalImagesWidth;

			$container.width( totalImagesWidth );
		};

		var keyboardHandler = function(e) {
			if (e.keyCode == 37) {
				console.log ( "nxt" );
				root.gotoIterativeIndex( 1 );
				return false;
			}
			if (e.keyCode == 39) {
				console.log ( "prev" );
				root.gotoIterativeIndex( -1 );
				return false;
			}
		};

		function getTweenedValue(start, end, currentTime, totalTime, tweener) {
			var delta = end - start;
			var percentComplete = currentTime/totalTime;
			if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;

			return tweener(percentComplete) * delta + start
		}

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};
	};


})(jQuery);
