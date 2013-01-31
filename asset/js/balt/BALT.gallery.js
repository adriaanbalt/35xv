/*
@project Helper

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Gallery with endless scroll and clones
*/

(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.gallery = function( target, o ) {
		var root = this,
		$target = target,
		$container = $target.find('.gallery-container');
		settings = {
			loader : false
		},
		animating = false,
		itemWidth = $container.width(),
		imageCount = $container.find('img').length,
		loadCounter = 0,
		newTop = 0,
		origHeighttext = 0,
		origToptext = 0,
		direction = 1,
		ratio = 0;

		root.init = function() {

			if ( settings.loader ){
				var images = $target.find('img');
				images.each(function(){
					registerImgFileSize( this.src );
					if ( $(this)[0].complete || $(this)[0].readyState == 4 ) {
						imageLoaded();
					}
					$(this).load( imageLoaded );
				});
			} else {
				preloadComplete();
			}

			// $container.prepend( $('.slide').last() );
			// $container.css( 'left', -itemWidth );
			// $( '.slide' ).first().css('z-index','1');
			// $( '.slide' ).last().css('z-index','2');
			// $( '.slide:eq(1)' ).css('z-index','0');
			
			ratio = $container.find('img:eq(0)').height() / $container.find('img:eq(0)').width();
			console.log ( 'ratio : ', ratio );

			bindEvents();
		};

		var bindEvents = function() {
			$(window).resize( resize );
			resize();

			$('.next').click( function( e ) {
				e.preventDefault();
				// gotoIterativeIndex( 1 );
			});
			$('.previous').click( function( e ) {
				e.preventDefault();
				// gotoIterativeIndex( -1 );
			});

            $(document).keydown( keyboardHandler );
		};

		var imageLoaded = function( e ) {
			try {
				loadCounter++;
				if (loadCounter == (imageCount-1) )  {
					preloadComplete();
					resize();
				}
			} catch( err ) {
				// console.log ( "ERROR!!! ", err );
			}
		};

		var preloadComplete = function() {
			$('.slide').each( function() {
				// apply some post loaded features to each slide
			});
			// origHeighttext = parseInt($(this).find(".text").css('height'));
			// origToptext = getAttributeAsNumber( $(".text"), 'top' );
		};

		var imageResize = function( img, w, h ) {
			img.width( w );
			img.height( Math.round ( w * ratio ) );
			if ( img.height() < h ) {
				img.height( h );
				img.width( Math.round ( h / ratio ) );
			}
		};

		var resize = function () {

			totalImagesWidth = imageCount * $target.width();

			itemWidth = $target.width();

			$container.width( totalImagesWidth );
			$container.css( 'left', -itemWidth );
			
			$container.find('img').each( function() {
				//$(this).css( {'width':$(window).width(), 'height':$(window).height()} );
				//$(this).width( $target.width() ).height( $target.height() );

			//	imageResize ( $(this), $target.width(), $target.height() )
console.log ( "this: ",  $(this).width(), $(this).height(), ratio, $target.width()* ratio );

				$(this).width( $target.width() );
				$(this).height( Math.round ( $target.width() * ratio ) );
				if ( $(this).height() < $target.height() ) {
					$(this).height( $target.height() );
					$(this).width( Math.round ( $target.height() / ratio ) );
				}
				

				// if ( $(window).height() < 800 ) {
					// begin scaling the  text  down by ratio relative to the height
					// move the aboutBox upward relative to the height
					// var eq = 1 - parseInt($(this).find(".text").css('height')) / $(window).height();
					// if ( eq > 0 ) {
					// 	var newH = origHeighttext * eq;
					// 	$(this).find(".text").height( newH );
					// 	var newTop = origToptext * (eq / 2 );
					// 	$(this).find(".text").css( 'top', newTop )
					// }
				// } else {
					// $(this).find(".text").height( origHeighttext );
					// $(this).find(".text").css('top', origToptext );
				// }

				//$(this).find(".text").css( 'left', (( $(window).width() - $(this).find(".text").width() ) / 2) );
			});
//			$container.width( $(window).width() );
		};

		var gotoIterativeIndex = function( dir ) {
			console.log( 'gotoIterativeIndex ', dir );

			if ( !animating ) {
				direction = dir;
				animating = true;
				if ( dir == 1 ) {
					$container.find( 'img' ).first().remove().css('z-index','1').appendTo( $container );
					$container.css({ left: 0 });
				} else if ( dir == -1 ) {
					$container.find( 'img' ).last().remove().css('z-index','2').prependTo( $container );
					$container.css({ left: (itemWidth * -2) });
				}
				$container.find( 'img:eq(1)' ).css('z-index','0');
				move ( itemWidth * (-1), animationComplete );
			}
		};
		var animationComplete = function() {
			animating = false;
			show();
		};
		var move = function ( newLeft, callback ) {
			$container.animate({
				left: newLeft
			},{ duration: 500, complete:callback });
		};

		var show = function() {
			$( '.slide:eq(1)' ).find( '.slideLinks' ).fadeIn();
		};

		var hide = function() {
			$( '.slide:eq(1)' ).find( '.slideLinks' ).fadeOut();
		};

		var keyboardHandler = function(e) {
			if (e.keyCode == 37) {
				console.log ( "nxt" );
				gotoIterativeIndex( 1 );
				return false;
			}
			if (e.keyCode == 39) {
				console.log ( "prev" );
				gotoIterativeIndex( -1 );
				return false;
			}
		};

		var getAttributeAsNumber = function( target, attribute ){
			return parseInt(target.css(attribute).replace('px', ''));
		};
	}

})(jQuery);
