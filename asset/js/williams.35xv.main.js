
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


	loader = new $.BALT.loader( $('#loader'), {
		onComplete : function() {
			var prop = {
				opacity: 1,
				filter: 'alpha(opacity=' + 100 + ')', /* For IE8 and earlier */
				transition: 'all 1s'
			};
//			$('#main').css( prop );
//			$('nav').css( prop );
			$('#main').animate( prop,1000 );
			$('nav').animate( prop,1000 );
		}
	});

	gotoSection = {
		'' : 0,
		'home' : 0,
		'design' : 360,
		'design-team' : 1740,
		'residences' : 3530,
		'feature' : 5000,
		'availability' : 5880,
		'amenities-services' : 7470,
		'neighborhood' : 9960,
		'team' : 8490,
		'press' : 8680,
		'contact' : 8960
	};

	var imageSequences = {};

	loadProgress = new LoadProgress({
		onUpdate: function( val ) {
			loader.update( val * 100 );
		},
		onComplete: function() {
			residences_gallery.start();
			amenities_gallery.start();
			spinner.init({
				useRAF : true,				// set requestAnimationFrame
				debug: false,				// turn on debug
				tweenSpeed: .3,				// scrollTop tween speed
				skipImages: 1,
				frameSpeed: 1,
				startAt: gotoSection['design'],	// scrollTop where the experience starts
				endAt: gotoSection['design-team'],
				container: $('#container'),		// main container
				imageCount: $('#building-large img').length,
				sequence: imageSequences['building-large']
			});
			scroller.init();
			nav = new $.BALT.nav( $('nav') );
		}
	});

	imageSequences['building-large'] = new $.BALT.imageSequence({
		filesPath:'asset/img/building-large/35XV_2013-02-13_000{index}.gif',
		imageCount: 100,
		skipImages: 3,
		container: $('#building-large'),
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});
	imageSequences['clouds'] = new $.BALT.imageSequence({
		filesPath:'asset/img/clouds/cloud-{index}.png',
		imageCount: 6,
		skipImages: 1,
		container: $('#clouds .wrapper'),
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});

	$('.text-slant').each( function() {
		new TextSlant( $(this), $(this).css('line-height'), 230, 300, 5 );
	});
	$('.shape').each( function() {
		var rgb = hexToRgb( $(this).data('color') );
		var c = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + $(this).data('transparency') + ")";
		new DrawShape( $(this).attr('id'), c, $(this).attr('width'), $(this).attr('height'), $(this).data('shape'), $(this).data('overhang') );
	});

	$('.equalize').equalize();

	calculations = new $.BALT.animation.calculations();

	spinner = new $.BALT.animation.spinner();

	residences_gallery = new $.BALT.galleryScroll( $('#residences-gallery'), {
		startAt : gotoSection['residences'],
		onProgress: function() {
			loadProgress.update();
		}
	});
	amenities_gallery = new $.BALT.galleryScroll( $('#amenities-gallery'), {
		startAt : gotoSection['amenities-services'],
		onProgress: function() {
			loadProgress.update();
		}
	});
		
		console.log ( 'gotoSection[ window.location.hash ]: ', gotoSection[ window.location.hash ] );

	scroller = new $.BALT.animation.scroller({
		maxScroll: 16621,
		startAt : gotoSection[ window.location.hash ],
		register : [ residences_gallery, amenities_gallery, spinner ]
	});

	loadProgress.register( residences_gallery.settings.slideCount );
	loadProgress.register( amenities_gallery.settings.slideCount );

	for (i in imageSequences) {
		loadProgress.register( Math.ceil((imageSequences[i].imageCount+1)/imageSequences[i].skipImages) );
		imageSequences[i].load();
	}


})(jQuery);