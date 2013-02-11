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
			ratio : 0,
			startAt : 0,
			endAt : 0
		};
		root.settings = $.extend( root.settings, o );

		root.init = function() {
			if ( root.settings.onProgress ){
				var images = $target.find('.slide img');
				images.each(function(){
					if ( $(this)[0].complete || $(this)[0].readyState == 4 ) {
						imageLoaded();
					}
					$(this).load( imageLoaded );
				});
			}

			root.settings.ratio = $container.find('.slide:eq(0)').height() / $container.find('.slide:eq(0)').width();
		};
		var imageLoaded = function( e ) {
			if ( root.settings.onProgress && typeof root.settings.onProgress == 'function' ) {
				root.settings.onProgress();
			}
		};

		root.start = function() {
			$(window).resize( resize );
			resize();
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
			totalImagesWidth = root.settings.slideCount * (root.settings.itemWidth+getAttributeAsNumber($container.find('.slide:eq(0)'), 'margin-right') );

			$container.width( totalImagesWidth );
			$target.height( totalImagesWidth-root.settings.itemWidth );

			root.settings.startAt = ($target.offset().top - 100 );
			root.settings.endAt = Math.round( root.settings.startAt + $target.height() );
		};

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};

		root.scroll = function( scrollY ) {

			var startX, endX, startY, endY, cur_time, tot_time, valX, valY;
			if ( scrollY < root.settings.endAt && scrollY > root.settings.startAt ){
				startX = typeof $container.css('left') == 'string' ? 0 : $container.css('left');
				endX = totalImagesWidth;
				startY = typeof $container.css('top') == 'string' ? 0 : $container.css('top');
				endY = $target.height();
				
				cur_time = ( scrollY - root.settings.startAt ) ;
				tot_time = ( root.settings.endAt - root.settings.startAt );
				
				valX = Math.round( getTweenedValue( startX, endX, cur_time, tot_time ) * -1 );
				valY = Math.round( getTweenedValue( startY, endY, cur_time, tot_time ) );

			} else if ( scrollY < root.settings.startAt ) {
				valX = 0;
				valY = 0;
			} else if ( scrollY > root.settings.endAt ) {
				valX = 0;
				valY = 0;
			}

			if ( cur_time != undefined ) {
			//	console.log ( "val: ", scrollY, " | " , valX, " | " , valY, " | " , cur_time, " | " , tot_time );
			}
			var properties = {
				transform : "translate("+valX+"px,"+valY+"px)",
				transition : 'all 0s ease'
			};

			$container.css ( properties );
		};

		var getTweenedValue = function(start, end, currentTime, totalTime, tweener) {
			var delta = end - start;
			var percentComplete = currentTime/totalTime;
			if (!tweener) tweener = TWEEN.Easing.Linear.EaseNone;
			return tweener(percentComplete) * delta + start;
		}

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};

		root.init();
	};


})(jQuery);
