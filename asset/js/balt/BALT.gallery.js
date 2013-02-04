/*
@project Helper

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Gallery with endless scroll and clones
*/

;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.gallery = function( target, o ) {
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
			newTop : 0,
			origHeighttext : 0,
			origToptext : 0,
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
				preloadComplete();
			}

			// $container.prepend( $('.slide').last() );
			// $container.css( 'left', -root.settings.itemWidth );
			// $( '.slide' ).first().css('z-index','1');
			// $( '.slide' ).last().css('z-index','2');
			// $( '.slide:eq(1)' ).css('z-index','0');

			root.settings.ratio = $container.find('.slide:eq(0)').height() / $container.find('.slide:eq(0)').width();

			// console.log ( '' );
			// console.log ( "target ", $target );
			// console.log ( "ratioResize ", root.settings.ratioResize );

			bindEvents();
		};

		var bindEvents = function() {
			$(window).resize( resize );
			resize();

			$('.next').click( function( e ) {
				e.preventDefault();
				// root.gotoIterativeIndex( 1 );
			});
			$('.previous').click( function( e ) {
				e.preventDefault();
				// root.gotoIterativeIndex( -1 );
			});

			$(document).keydown( keyboardHandler );
		};

		var imageLoaded = function( e ) {
			try {
				root.settings.loadCounter++;
				if (root.settings.loadCounter == (root.settings.slideCount-1) )  {
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

				$(this).width( $target.width() );

				if ( root.settings.ratioResize ){
					$(this).height( Math.round ( $target.width() * root.settings.ratio ) );
					if ( $(this).height() < $target.height() ) {
						$(this).height( $target.height() );
						$(this).width( Math.round ( $target.height() / root.settings.ratio ) );
					}
				}


				// if ( $(window).height() < 800 ) {
					// begin scaling the  text  down by root.settings.ratio relative to the height
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

			root.settings.itemWidth = $container.find('.slide:eq(0)').width();
			totalImagesWidth = root.settings.slideCount * root.settings.itemWidth;


			$container.width( totalImagesWidth );
			$container.css( 'left', -root.settings.itemWidth );

//			$container.width( $(window).width() );
		};

		root.gotoIterativeIndex = function( dir ) {
			//console.log( 'gotoIterativeIndex ', dir );
			//console.log( 'gotoIterativeIndex ', root.settings.itemWidth, root.settings.animating );

			if ( !root.settings.animating ) {
				root.settings.direction = dir;
				root.settings.animating = true;
				if ( dir == 1 ) {
					console.log ( "$container.find( '.slide' ).first(): ", $container.find( '.slide' ).first() );
					$container.find( '.slide' ).first().remove().css('z-index','1').appendTo( $container );
					$container.css({ left: 0 });
				} else if ( dir == -1 ) {
					$container.find( '.slide' ).last().remove().css('z-index','2').prependTo( $container );
					$container.css({ left: (root.settings.itemWidth * -2) });
				}
				$container.find( '.slide:eq(1)' ).css('z-index','0');
				move ( root.settings.itemWidth * (-1), animationComplete );
			}
		};

		root.next = function() {
			root.gotoIterativeIndex( 1 );
		};
		root.previous = function() {
			root.gotoIterativeIndex( -1 );
		};

		var animationComplete = function() {
			root.settings.animating = false;
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
	};


	$.BALT.controls = function( target, o ) {
		var root = this,
		$target = target,
		settings = {
		};
		settings = $.extend( settings, o );

		var init = function() {
			// $(window).resize( resize );
			// resize();
			$target.on( "click", '.next', next );
			$target.on( "click", '.previous', previous );
		};

		var next = function( e ) {
			e.preventDefault();
			for ( var i = 0; i < settings.toControl.length; i++ ){
				settings.toControl[i].next();
			}
		};
		var previous = function( e ) {
			e.preventDefault();
			for ( var i = 0; i < settings.toControl.length; i++ ){
				settings.toControl[i].previous();
				console.log ( "settings.toControl[i]: ", settings.toControl[i] );
			}
		};
		init();
	};


})(jQuery);
