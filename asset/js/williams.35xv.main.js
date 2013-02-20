
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
	resize();

	var loader = new $.BALT.loader( $('#loader'), {
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
		'design' : 530,
		'design-team' : 1740,
		'residences' : 3620,
		'feature' : 5000,
		'availability' : 5880,
		'amenities-services' : 7800,
		'neighborhood' : 13380,
		'team' : 14000,
		'press' : 15600,
		'contact' : 15600,
		'ending' : 21000
	};

	imageSequences = {};

	loadProgress = new LoadProgress({
		onUpdate: function( val ) {
			loader.update( val * 100 );
		},
		onComplete: function() {
			residences_gallery.start();
			amenities_gallery.start();
			scroller.start();

			nav = new $.BALT.nav( $('nav') );
		}
	});

	imageSequences['building-large'] = new $.BALT.imageSequence({
		filesPath:'asset/img/building-large/35XV_2013-02-19_000{index}.gif',
		imageCount: 100,
		skipImages: 3,
		container: $('#building-large'),
		className: '',
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});
	imageSequences['clouds'] = new $.BALT.imageSequence({
		filesPath:'asset/img/clouds/cloud-{index}.png',
		imageCount: 9,
		skipImages: 1,
		container: $('#background'),
		className: 'cloud show cloud{index}',
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
	animation = new $.BALT.animation.keyframes();
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
	scroller = new $.BALT.animation.scroller({
		startAt : gotoSection[ window.location.hash ],
		maxScroll: gotoSection['ending'],
		animation: animation,
		register : [ residences_gallery, amenities_gallery ]
	});

	loadProgress.register( residences_gallery.settings.slideCount );
	loadProgress.register( amenities_gallery.settings.slideCount );

	for (i in imageSequences) {
		loadProgress.register( Math.ceil((imageSequences[i].imageCount+1)/imageSequences[i].skipImages) );
		imageSequences[i].load();
	}

	function resize(){
		windowWidth = $window.height();
		windowHeight = $window.height();
		windowCenter = { left: $window.width()/2, top: $window.height()/2 };
	}

})(jQuery);