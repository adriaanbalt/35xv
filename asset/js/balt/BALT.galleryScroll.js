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
		startX = 0, endX, startY = 0, endY, cur_time, tot_time, valX, valY, limitX, limitY;
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

		//	root.settings.ratio = $container.find('.slide:eq(0)').height() / $container.find('.slide:eq(0)').width();
		};
		var imageLoaded = function( e ) {
			if ( root.settings.onProgress && typeof root.settings.onProgress == 'function' ) {
				root.settings.onProgress();
			}
		};

		root.start = function( o ) {
			root.settings = $.extend( root.settings, o );
			$window.resize( resize );
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
			root.settings.itemWidth = $container.find('.slide:eq(0)').width();
			root.settings.itemHeight = $container.find('.slide:eq(0)').height();
			root.settings.totalImagesWidth = root.settings.slideCount * (root.settings.itemWidth+130 );

			$container.width( root.settings.totalImagesWidth );
			$target.height( root.settings.totalImagesWidth - root.settings.itemWidth );

			root.settings.endAt = root.settings.startAt + $target.height();
		};

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};

		root.scroll = function( scrollY ) {
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


			var properties = {
				'transform': "translate("+valX+"px,"+valY+"px)",
				'-ms-transform': "translate("+valX+"px,"+valY+"px)", /* IE 9 */
				'-webkit-transform': "translate("+valX+"px,"+valY+"px)", /* Safari and Chrome */
				'-o-transform': "translate("+valX+"px,"+valY+"px)", /* Opera */
				'-moz-transform': "translate("+valX+"px,"+valY+"px)" /* Firefox */
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
