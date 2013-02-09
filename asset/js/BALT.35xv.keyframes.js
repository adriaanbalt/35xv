
;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$.BALT.keyframes = function() {

		var animationSections =
			{
				'shop': 0,
				'accessories': 200,
				'share': 1600,
				'display': 3500,
				'performance': 5000,
				'reviews': 5000
			};

		var animationFunctions = {

			spin : function( progress , is, startFrameRatio, endFrameRatio) {
				var startFrame = (is.imageCount/is.skipImages) * startFrameRatio,
					endFrame = (is.imageCount/is.skipImages) * is.frameSpeed,
					//toFrame = Math.floor(progress*endFrame);
					toFrame = Math.floor( startFrame - (progress*(startFrame-endFrame)) );
					//toFrame = Math.floor(progress*endFrame) % is.imageCount;

				is.showImageAt( Math.floor(toFrame) );

				// var is = imageSequences['building-large'];

				// var endFrame = (is.imageCount/is.skipImages) * is.frameSpeed,
				// toFrame = Math.floor(progress*endFrame) % is.imageCount;

				// is.showImageAt( Math.floor(toFrame) );
			},
			calcBgY : function(x, windowHeight, pos, adjuster, inertia){
				return x + " " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
			},
			calcBgX : function(y, windowHeight, pos, adjuster, inertia){
				return (-((windowHeight + pos) - adjuster) * inertia)  + "px " + y;
			},
			calcXY : function(windowHeight, pos, adjusterX, inertiaX, adjusterY, inertiaY){
				return (-((windowHeight + pos) - adjusterX) * inertiaX)  + "px " + (-((windowHeight + pos) - adjusterY) * inertiaY) + "px";
			},
			calcPos : function(windowHeight, pos, adjuster, inertia) {
				return (((windowHeight + pos) - adjuster) * inertia)  + "px ";
			},
			calcRot : function( r, windowHeight, pos, adjuster, inertia ){
				return (r + -(((windowHeight + pos) - adjuster ) * inertia));
			},
			calcProgress : function( startAt, endAt ) {
				progress = (startAt - scrollTopTweened) / (startAt - endAt);
				return progress;
			},
			calcDegrees2Radians : function( degrees ) {
				return ( degrees * Math.PI / 180 );
			}
		};

		// var animationFunctions = {
		// 	spin : function( progress , is, startFrameRatio, endFrameRatio) {
		// 		var startFrame = (is.imageCount/is.skipImages) * startFrameRatio,
		// 			endFrame = (is.imageCount/is.skipImages) * endFrameRatio,
		// 			//toFrame = Math.floor(progress*endFrame);
		// 			toFrame = Math.floor( startFrame - (progress*(startFrame-endFrame)) );

		// 		is.showImageAt( Math.floor(toFrame) );
		// 	},

		// 	absPosition: function(opts) {
		// 		var defaults = {startLeft: 0,
		// 						startTop: 0,
		// 						endLeft: 0,
		// 						endTop: 0},
		// 		settings = $.extend(defaults, opts);
		// 		this.startProperties['left'] = settings.startLeft;
		// 		this.startProperties['top'] = settings.startTop;
		// 		this.endProperties['left'] = settings.endLeft;
		// 		this.endProperties['top'] = settings.endTop;
		// 		this.startProperties['display'] = 'block';
		// 		this.endProperties['display'] = 'none';
		// 	},

		// 	bottomLeftOutside: function( anim, opts ) {
		// 		var defaults = {offset:0}, settings = $.extend(defaults, opts);
		// 		getPageInfo();
		// 		var portrait = false, //wHeight > wWidth ? true : false,
		// 			elemHalfWidth = anim._elem.width()/2,
		// 			elemHalfHeight = anim._elem.height()/2,
		// 			adj = portrait ? wWidth/2 + elemHalfWidth : adj = wHeight/2 + elemHalfHeight,
		// 			tan = Math.sqrt( Math.pow( adj, 2) + Math.pow( adj, 2) );

		// 		this.properties['top'] = wCenter.top + adj - elemHalfHeight + (portrait ? settings.offset : 0);
		// 		this.properties['left'] = wCenter.left - adj - elemHalfWidth + (portrait ? 0 : settings.offset);
		// 	},
		// 	topRightOutside: function( anim, opts ) {
		// 		var defaults = {offset:0}, settings = $.extend(defaults, opts);
		// 		var portrait = false, //wHeight > wWidth ? true : false,
		// 			elemHalfWidth = anim._elem.width()/2,
		// 			elemHalfHeight = anim._elem.height()/2,
		// 			adj = portrait ? wWidth/2 + elemHalfWidth : adj = wHeight/2 + elemHalfHeight,
		// 			tan = Math.sqrt( Math.pow( adj, 2) + Math.pow( adj, 2) );

		// 		this.properties['top'] = wCenter.top - adj - elemHalfHeight + (portrait ? settings.offset : 0);
		// 		this.properties['left'] = wCenter.left + adj - elemHalfWidth + (portrait ? 0 : settings.offset);
		// 	},
		// 	leftOutside: function( anim, opts ) {
		// 		var defaults = {offset:0}, settings = $.extend(defaults, opts);
		// 		this.properties['left'] = -anim._elem.width() + settings.offset;
		// 	},
		// 	rightOutside: function( anim, opts ) {
		// 		var defaults = {offset:0}, settings = $.extend(defaults, opts);
		// 		this.properties['left'] = wWidth + settings.offset;
		// 	},
		// 	centerV: function( anim, opts ) {
		// 		getPageInfo();
		// 		var defaults = {offset:0}, settings = $.extend(defaults, opts);
		// 		var elemHalfHeight = anim._elem.height()/2;
		// 		this.properties['top'] = wCenter.top - elemHalfHeight + settings.offset;
		// 	},
		// 	centerH: function( anim, opts ) {
		// 		getPageInfo();
		// 		var defaults = {offset:0}, settings = $.extend(defaults, opts);

		// 		var elemHalfWidth = anim._elem.width()/2;

		// 		this.properties['left'] = wCenter.left - elemHalfWidth + settings.offset;
		// 	},
		// 	bottomOutside: function( anim, opts ) {
		// 		var defaults = {offset:0}, settings = $.extend(defaults, opts);
		// 		this.properties['top'] = wHeight + settings.offset;
		// 	},
		// 	topOutside: function( anim, opts) {
		// 		var defaults = {offset:0}, settings = $.extend(defaults, opts);
		// 		this.properties['top'] = -anim._elem.height() + settings.offset;
		// 	}
		// }

		this.getAnim = function() {

		return [
			{
				id: 'building-large',
				startAt: 250,
				endAt: 650,
				keyframes: [
					{
						position: 0,
						ease: TWEEN.Easing.Linear.EaseNone,
						onInit: function( anim ) {
							console.log (" building large key 1 ", anim );
						},
						properties: {
						}
					},
					{
						position: 1,
						ease: TWEEN.Easing.Linear.EaseNone,
						onProgress: function( progress ) {
							animationFunctions.spin.call( this, progress, imageSequences['building-large'], 0, .28)
						},
						properties: {
						}
					}
				]
			},
			{
				id: 'residences-gallery',
				startAt: 1300,
				endAt: 2500,
				keyframes: [
	         				{
	         					position: 0,
	         					onInit: function( anim ) {},
	         					properties: { left: 0, position: 'absolute' }
	         				},
	         				{
	         					position: .01,
	         					onInit: function( anim ) {
	         						anim._elem.css( {
	         							left: 0,
	         							top: 0,
	         							position: 'absolute'
	         						})
	         					},
	         					properties: { left: 0, position: 'absolute' }
	         				},
	         				{
	         					position: .5,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						console.log ( 'residences_gallery.containerWidth: ', residences_gallery.settings.containerWidth, residences_gallery.settings.itemWidth );

	         					},
	         					properties: { left:  ( residences_gallery.settings.containerWidth - residences_gallery.settings.itemWidth), position: 'fixed', top: 0 }
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         					},
	         					properties: { left:  ( residences_gallery.settings.containerWidth - residences_gallery.settings.itemWidth), position: 'absolute', bottom: 0 }
	         				}
				]
			}
		];
			// {
			// 	id: 'choose-flight-3',
			// 	startAt: 0,
			// 	endAt: 325,
			// 	keyframes: [
			// 				{
			// 					position: 0,
			// 					ease: TWEEN.Easing.Linear.EaseNone,
			// 					onInit: function( anim ) {
			// 						animationFunctions.centerH.call( this, anim, {});
			// 						animationFunctions.centerV.call( this, anim, {});
			// 					},
			// 					properties: {
			// 					}
			// 				},
			// 				{
			// 					position: 1,
			// 					ease: TWEEN.Easing.Linear.EaseNone,
			// 					onInit: function( anim ) {
			// 						animationFunctions.centerH.call( this, anim, {});
			// 						animationFunctions.topOutside.call( this, anim, {});
			// 					},
			// 					properties: {
			// 					}
			// 				}
			// 			]
			// },
			// {
			// 	id: 'choose-flight-4',
			// 	startAt: 0,
			// 	endAt: 360,
			// 	keyframes: [
			// 				{
			// 					position: 0,
			// 					ease: TWEEN.Easing.Linear.EaseNone,
			// 					onInit: function( anim ) {
			// 						animationFunctions.centerH.call( this, anim, {});
			// 						animationFunctions.centerV.call( this, anim, {});
			// 					},
			// 					properties: {
			// 					}
			// 				},
			// 				{
			// 					position: 1,
			// 					ease: TWEEN.Easing.Linear.EaseNone,
			// 					onInit: function( anim ) {
			// 						animationFunctions.centerH.call( this, anim, {});
			// 						animationFunctions.topOutside.call( this, anim, {});
			// 					},
			// 					properties: {
			// 					}
			// 				}
			// 			]
			// },
			// {
			// 	id: 'scroll-to-control-1',
			// 	startAt: 0,
			// 	endAt: 10,
			// 	onStartAnimate: function( anim ) {
			// 		var delay = '1s';
			// 		$(this._elem).css({
	 	// 			'opacity': '1',
	 	// 			'display': 'block',
	 	// 			'transition-delay': delay,
			// 		'-moz-transition-delay': delay,
			// 		'-webkit-transition-delay': delay,
			// 		'-o-transition-delay': delay
	 	// 		});

			// 	},
			// 	onEndAnimate: function( anim ) {
			// 		var delay = '0s';
			// 		$(this._elem).css({
			// 			'opacity': '0',
			// 			'transition-delay': delay,
			// 		'-moz-transition-delay': delay,
			// 		'-webkit-transition-delay': delay,
			// 		'-o-transition-delay': delay
			// 		});
			// 	},
			// 	keyframes: [
			// 				{
			// 					position: 0,
			// 					ease: TWEEN.Easing.Linear.EaseNone,
			// 					onInit: function( anim ) {
			// 						animationFunctions.centerH.call( this, anim, {});
			// 						animationFunctions.centerV.call( this, anim, {offset:240});
			// 					},
			// 					properties: {
			// 					}
			// 				},
			// 				{
			// 					position: 1,
			// 					ease: TWEEN.Easing.Linear.EaseNone,
			// 					onInit: function( anim ) {
			// 						animationFunctions.centerH.call( this, anim, {});
			// 						animationFunctions.centerV.call( this, anim, {offset:240});
			// 					},
			// 					properties: {
			// 					}
			// 				}
			// 			]
			// },


			// // ---------------------------------------------
			// // OVER

			// {
			// 	id: 'over-bg-2',
			// 	section: 'over',
			// 	startAt: 0+animationSections.over,
			// 	endAt: 520+animationSections.over,
			// 	keyframes: [
			// 		{
			// 			position: 0,
			// 			onInit: function( anim ) {
			// 				animationFunctions.leftOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: .3,
			// 			ease: TWEEN.Easing.Cubic.EaseOut,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {offset:-1100});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: .4,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {offset:-1100});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: 1,
			// 			ease: TWEEN.Easing.Cubic.EaseIn,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}
			// 		}
			// 	]

			// },
			// {
			// 	id: 'over-bg-3',
			// 	section: 'over',
			// 	startAt: 60+animationSections.over,
			// 	endAt: 750+animationSections.over,
			// 	keyframes: [
			// 		{
			// 			position: 0,
			// 			onInit: function( anim ) {
			// 				animationFunctions.leftOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: .2,
			// 			ease: TWEEN.Easing.Cubic.EaseOut,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {offset:-2499});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: .5,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {offset:-2499});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: 1,
			// 			ease: TWEEN.Easing.Cubic.EaseIn,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}
			// 		}
			// 	]

			// },
			// {
			// 	id: 'over-bg-4',
			// 	section: 'over',
			// 	startAt: 500+animationSections.over,
			// 	endAt: 1300+animationSections.over,
			// 	keyframes: [
			// 		{
			// 			position: 0,
			// 			onInit: function( anim ) {
			// 				animationFunctions.leftOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: 1,
			// 			ease: TWEEN.Easing.Linear.EaseNone,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}
			// 		}
			// 	]

			// },
			// {
			// 	id: 'over-bg-5',
			// 	section: 'over',
			// 	startAt: 1050+animationSections.over,
			// 	endAt: 1350+animationSections.over,
			// 	keyframes: [
			// 		{
			// 			position: 0,
			// 			onInit: function( anim ) {
			// 				animationFunctions.leftOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: 1,
			// 			ease: TWEEN.Easing.Linear.EaseNone,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}
			// 		}
			// 	]

			// },
			// {
			// 	id: 'over-bg-6',
			// 	section: 'over',
			// 	startAt: 1100+animationSections.over,
			// 	endAt: 1500+animationSections.over,
			// 	keyframes: [
			// 		{
			// 			position: 0,
			// 			onInit: function( anim ) {
			// 				animationFunctions.leftOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: 1,
			// 			ease: TWEEN.Easing.Linear.EaseNone,
			// 			onInit: function( anim ) {
			// 				animationFunctions.rightOutside.call( this, anim, {});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}
			// 		}
			// 	]

			// },
			// {
			// 	id: 'jet-container',
			// 	startAt: 170+(animationSections.over-=300),
			// 	endAt: 1000+animationSections.over,
			// 	keyframes: [
			// 		{
			// 			position: 0,
			// 			onInit: function( anim ) {
			// 				animationFunctions.bottomLeftOutside.call( this, anim, {offset:40});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: .5,
			// 			ease: TWEEN.Easing.Cubic.EaseOut,
			// 			onInit: function( anim ) {
			// 				animationFunctions.centerH.call( this, anim, {offset:40});
			// 				animationFunctions.centerV.call( this, anim, {offset:0});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}

			// 		},
			// 		{
			// 			position: 1,
			// 			ease: TWEEN.Easing.Cubic.EaseIn,
			// 			onInit: function( anim ) {
			// 				animationFunctions.topRightOutside.call( this, anim, {offset:40});
			// 			},
			// 			properties: {
			// 				top: 0, left: 0
			// 			}
			// 		}
			// 	]
			// },

			// jetPartAnimation('jet-l-sole', [332, 20], [55, -1040]),
			// jetPartAnimation('jet-r-sole', [343, 26], [102, -480]),


			// jetPartAnimation('jet-l-intake', [230, 82], [110, -810]),
			// jetPartAnimation('jet-r-intake', [270, 130], [510, -310]),

			// jetPartAnimation('jet-l-shell', [210, 90], [250, -600]),
			// jetPartAnimation('jet-r-shell', [257,112], [370, -270]),

			// jetPartAnimation('jet-l-outer', [38, 122], [600, -400]),
			// jetPartAnimation('jet-r-outer', [205,215], [270, -70]),

			// jetPartAnimation('jet-laces', [90, 190], [780, -300]),

			// jetPartAnimation('jet-l-sole-bottom', [2, 267], [1050, -250]),
			// jetPartAnimation('jet-r-sole-bottom', [123,300], [250, -050])

		};

	};

})(jQuery);