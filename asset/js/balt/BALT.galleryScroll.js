/*
@project Helper

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Gallery with endless scroll and clones
*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.galleryScroll = function( target, o ) {
		var root = this,
		$target = target,
		$container = $target.find('.gallery-container');
		root.settings = {
			loader : false,
			ratioResize : true,
			animating : false,
			itemWidth : $container.width(),
			slideCount : $container.find('.slide').length,
			loadCounter : 0,
			direction : 1,
			ratio : 0
		};
		root.settings = $.extend( root.settings, o );

		root.init = function() {

			if ( root.settings.loader ){
				var images = $target.find('.slide');
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
			// console.log ( "target ", $target );
			// console.log ( "ratioResize ", root.settings.ratioResize );

			bindEvents();
		};

		var bindEvents = function() {
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

		var onUpdate = function( progress ) {
			$target
		};

		var resize = function () {

			$container.find('.slide').each( function() {
				//$(this).css( {'width':$(window).width(), 'height':$(window).height()} );
				//$(this).width( $target.width() ).height( $target.height() );

			//	imageResize ( $(this), $target.width(), $target.height() )

				// $(this).width( $target.width() );

				// if ( root.settings.ratioResize ){
				// 	$(this).height( Math.round ( $target.width() * root.settings.ratio ) );
				// 	if ( $(this).height() < $target.height() ) {
				// 		$(this).height( $target.height() );
				// 		$(this).width( Math.round ( $target.height() / root.settings.ratio ) );
				// 	}
				// }

			});

			root.settings.itemWidth = $container.find('.slide:eq(0)').width();
			totalImagesWidth = root.settings.slideCount * root.settings.itemWidth;

			$container.width( totalImagesWidth );
			$target.height( totalImagesWidth-root.settings.itemWidth );
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

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};

		root.scroll = function( scrollY ) {

			var p = 0, start, end, cur, tot, val;
			if ( scrollY < root.settings.endAt && scrollY > root.settings.startAt ){
				p = ( scrollY - root.settings.startAt ) / ( settings.endAt - root.settings.startAt );

				start = typeof $container.css('left') == 'string' ? 0 : $container.css('left');
				end = totalImagesWidth;
				cur = ( scrollY - root.settings.startAt ) ;
				tot = ( settings.endAt - root.settings.startAt );
				val = getTweenedValue( start, end, cur, tot );

			} else if ( scrollY < root.settings.startAt ) {
				val = 0;
			} else if ( scrollY > root.settings.endAt ) {
				val = 0;
			}

			console.log ( "val ", val);

			var properties = {
				left : val,
				top : val * -1
			};
			// console.log ( 'properties: ', properties );

			$container.css ( properties );
		};

		var getTweenedValue = function(start, end, currentTime, totalTime, tweener) {
			var delta = end - start;
			var percentComplete = currentTime/totalTime;
			if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;

			return tweener(percentComplete) * delta + start
		}
	};


})(jQuery);
