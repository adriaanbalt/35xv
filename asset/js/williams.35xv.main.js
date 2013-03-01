
/*
@client WILLIAMS NEW YORK
@project 35XV

@author BALT | Adriaan Scholvinck | adriaan@BALT.us
@description kick off the project
@date JANUARY 2013
*/


;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$window = $(window);

	$window.on('resize', resize);
	windowWidth = $window.height();
	windowHeight = $window.height();
	windowCenter = { left: $window.width()/2, top: $window.height()/2 };
	gotoSection = {};
	imageSequences = {};
	gallerySequences = {};

	var loader = new $.BALT.loader( $('#loader'), {
		onComplete : function() {
			var prop = {
				filter: ' alpha(opacity=' + 100 + ')',
				opacity: 1
				//, /* For IE8 and earlier */
				//transition: 'all 1s'
			};
			// $('#main').css( prop );
			// $('nav').css( prop );
			$('#main').animate( prop, 1000 );
			$('nav').animate( prop, 1000 );
			$('#scroller').css( {display: 'block' } );
		}
	});

	loadProgress = new LoadProgress({
		onUpdate: function( val ) {
			loader.update( val * 100 );
		},
		onComplete: function() {

			var clone;
			for ( var i = 1; i < 8; i++ ){
				clone = $('#cloud0').clone();
				clone.attr('id', 'cloud' + i );
				$('#background').append( clone );
			}

		// catch 22 w the galleries, need to call start twice =(
			gallerySequences['residences-gallery'].start({
				startAt : gotoSection[ 'residences' ]
			});
			gallerySequences['amenities-gallery'].start({
				startAt : gotoSection[ 'services-amenities' ]
			});

		//build gotoSection
			var accumulator = 0;
			$('section').each( function() {
				var h = 0;
				if ( $(this).css('display') != 'none' ) h = $(this).height() + 200; // 200 for the distance between sectiosn (<section> margin-top + margin-bottom)
				gotoSection[ $(this).context.className.split(' ')[0]  ] = accumulator;
				accumulator +=h;
			});


			animation = new $.BALT.animation.keyframes();

		// catch 22 w the galleries, need to call start twice =(
			gallerySequences['residences-gallery'].start({
				startAt : gotoSection[ 'residences' ] + 100
			});
			gallerySequences['amenities-gallery'].start({
				startAt : gotoSection[ 'services-amenities' ] + 150
			});
			scroller.start({
				startAt : gotoSection[ window.location.hash ],
				maxScroll: gotoSection['address'],
				animation : animation
			});

			nav = new $.BALT.nav( $('nav'), {scroller: scroller} );
		}
	});

	imageSequences['building-large'] = new $.BALT.imageSequence({
		filesPath:'asset/img/building-large/highres/35XV_2013-02-19_000{index}.gif',
		imageCount: 100,
		skipImages: 3,
		container: $('#building-large'),
		className: '',
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});
	// imageSequences['clouds'] = new $.BALT.imageSequence({
	// 	filesPath:'asset/img/clouds/cloud-{index}.png',
	// 	imageCount: 0,
	// 	skipImages: 1,
	// 	container: $('#background'),
	// 	id: 'cloud{index}',
	// 	className: 'cloud show',
	// 	onProgress: function() {
	// 		//console.log ( "progress clouds" );
	// 		loadProgress.update( this.skipImages );
	// 	}
	// });

	$('.floorplan-modal').each( function() {
		new $.BALT.modal( $(this) );
	});

	$('.text-slant').each( function() {
		new TextSlant( $(this), $(this).css('line-height'), $(this).data('textwidth'), $(this).data('boxwidth'), $(this).data('increment') );
	});

	$('.shape').each( function() {
		var rgb = hexToRgb( $(this).data('color') );
		var c = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + $(this).data('transparency') + ")";
		new DrawShape( $(this).attr('id'), c, $(this).attr('width'), $(this).attr('height'), $(this).data('shape'), $(this).data('overhang') );
	});

	var i = 0;
	$('.contact .control-group').each( function() {
		$(this).width( 100 - i + "%");
		i++;
	});

	i = 0;
	$('.press .content-box ul li').each( function() {
		$(this).width( 100 - (2 * i) + "%");
		i++;
	});
	$('.address').height( $window.height() )

	$('.equalize').equalize();

	calculations = new $.BALT.animation.calculations();
	gallerySequences['residences-gallery'] = new $.BALT.galleryScroll( $('#residences-gallery'), {
		onProgress: function() {
			loadProgress.update();
		}
	});
	gallerySequences['amenities-gallery'] = new $.BALT.galleryScroll( $('#amenities-gallery'), {
		onProgress: function() {
			loadProgress.update();
		}
	});
	var scroller = new $.BALT.animation.scroller({
		register : [ gallerySequences['residences-gallery'], gallerySequences['amenities-gallery'] ]
	});

	loadProgress.register( gallerySequences['residences-gallery'].settings.slideCount );
	loadProgress.register( gallerySequences['amenities-gallery'].settings.slideCount );

	for (i in imageSequences) {
		loadProgress.register( Math.ceil((imageSequences[i].imageCount+1)/imageSequences[i].skipImages) );
		imageSequences[i].load();
	}

	$("#availability").tablesorter({
		// make the table header unselectable to enchance button feel
		cancelSelection: true,
		sortInitialOrder: 'desc',
		headers: {

			// Unit Number Column 
			0: {
				// Disable sorting, as it is not logical
				sorter: false
			},
			3: {
				// Force square footage sorter to use digits, despite commas being in the string 
				sorter: 'digit'
			},
			// Price Column 
			4: {
				// Force sorter to use numbers, despite 'sold out' etc 
				sorter: 'currency',
				string: 'bottom'
			},
			// Floorplan View / Download Column 
			5: {
				// Disable sorting, as all values are the same! 
				sorter: false
			}
		},
		sortList: [[4,1]],
		cssAsc: 'availability-asc',
		cssDesc: 'availability-desc',
		cssHeader: 'availability-header'
	});

	$('.availability-header').find('.tablesorter-header-inner').append('<span class="arrow"></span>');
	$('.availability-asc').find('.arrow').removeClass('down').addClass('up');
	$('.availability-desc').find('.arrow').removeClass('up').addClass('down');
	$("#availability").bind("sortStart",function() {
		$('.availability-header').find('.arrow').removeClass('up').removeClass('down');
	}).bind("sortEnd",function() {
		$('.availability-asc').find('.arrow').removeClass('down').addClass('up');
		$('.availability-desc').find('.arrow').removeClass('up').addClass('down');
	});

	resize();
	function resize(){
		windowWidth = $window.height();
		windowHeight = $window.height();
		windowCenter = { left: $window.width()/2, top: $window.height()/2 };

		var accumulator = 0;
		$('section').each( function() {
			var h = 0;
			if ( $(this).css('display') != 'none' ) h = $(this).height() + 200; // 200 for the distance between sectiosn (<section> margin-top + margin-bottom)
			gotoSection[ $(this).context.className.split(' ')[0]  ] = accumulator;
			accumulator +=h;
		});

		gallerySequences['residences-gallery'].start({
			startAt : gotoSection[ 'residences' ] + 100
		});
		gallerySequences['amenities-gallery'].start({
			startAt : gotoSection[ 'services-amenities' ] + 150
		});
	}

})(jQuery);