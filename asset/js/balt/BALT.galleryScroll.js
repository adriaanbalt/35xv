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
		$container = $target.find('.gallery-container'),
		startX = 0, endX, startY = 0, endY, cur_time, tot_time, valX, valY;
		root.settings = {
			loader : false,
			ratioResize : true,
			animating : false,
			itemWidth : $container.width(),
			itemHeight : 0,
			totalImagesWidth : 0,
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

			// $container.find('.slide').each( function() {
			// 	$(this).css( {'width':$(window).width(), 'height':$(window).height()} );
			// 	$(this).width( $target.width() ).height( $target.height() );

			// 	imageResize ( $(this), $target.width(), $target.height() )

			// 	$(this).width( $target.width() );

			// 	if ( root.settings.ratioResize ){
			// 		$(this).height( Math.round ( $target.width() * root.settings.ratio ) );
			// 		if ( $(this).height() < $target.height() ) {
			// 			$(this).height( $target.height() );
			// 			$(this).width( Math.round ( $target.height() / root.settings.ratio ) );
			// 		}
			// 	}

			// });

			root.settings.itemWidth = $container.find('.slide:eq(0)').width();
			root.settings.itemHeight = $container.find('.slide:eq(0)').height();
			root.settings.totalImagesWidth = root.settings.slideCount * (root.settings.itemWidth+getAttributeAsNumber($container.find('.slide:eq(0)'), 'margin-right') );

			$container.width( root.settings.totalImagesWidth );
			$target.height( root.settings.totalImagesWidth - root.settings.itemWidth );

			root.settings.startAt = ($target.offset().top - 100 );
			root.settings.endAt = root.settings.startAt + $target.height();
		};

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};

		root.scroll = function( scrollY ) {
			console.log ( '' );
			console.log( '$container ' , $container.selector );
			console.log ( "scroll: ", scrollY, root.settings.endAt,root.settings.startAt)
			// if ( cur_time != undefined ) {
			//	console.log ( "val: ", scrollY, " | " , valX, " | " , valY, " | " , cur_time, " | " , tot_time );
			//}
			//
			if ( scrollY < root.settings.endAt && scrollY > root.settings.startAt ){
				endX = root.settings.totalImagesWidth;
				endY = $target.height();

				cur_time = ( scrollY - root.settings.startAt ) ;
				tot_time = ( root.settings.endAt - root.settings.startAt );
			console.log ( "root.settings.endAt : ", tot_time );

				valX = getTweenedValue( startX, endX, cur_time, tot_time ) * -1;
				valY = getTweenedValue( startY, endY, cur_time, tot_time );

				if ( valX < (root.settings.itemWidth - endX) ){
					valX = (root.settings.itemWidth - endX);
				}
				if ( valY > (endY - root.settings.itemHeight) ){
					valY = (endY - root.settings.itemHeight);
				}

			} else if ( scrollY < root.settings.startAt ) {
				valX = 0;
				valY = 0;
			} else if ( scrollY > root.settings.endAt ) {
				valX = (root.settings.itemWidth - endX);
				valY = (root.settings.itemWidth - endY);
			}

			var properties = {
				transform : "translate("+valX+"px,"+valY+"px)"
				// ,
				// transition : 'all .01s ease'
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
