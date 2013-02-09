/*
@client BALT
@project Parallax Plugin

@author Adriaan Scholvinck | adriaan@BALT.us
@description Keyframes used as a structure for parallaxing a website
@date September 2012
*/


;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};
	if ( !$.BALT.animation ) {
		$.BALT.animation = {};
	}

	$.BALT.animation.keyframes = function( o ) {

		var animationSections = $.extend{
			{},
			{
				'shop': 0,
				'accessories': 200,
				'share': 1600,
				'display': 3500,
				'performance': 5000,
				'reviews': 5000
			},
			o
		};

		var animationFunctions = {
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
			}
			calcProgress : function( startAt, endAt ) {
				progress = (startAt - scrollTopTweened) / (startAt - endAt);
				return progress;
			},
			calcDegrees2Radians : function( degrees ) {
				return ( degrees * Math.PI / 180 );
			}
		};

		var animation = [
			{
				id: 'shop',
				startAt: 399+animationSections.shop,
				endAt: 1350+animationSections.shop ,
				keyframes: [
							{
								position: 0,
								onInit: function( anim ) {
									animationFunctions.centerH.call( this, anim, {});
									animationFunctions.centerV.call( this, anim, {});
								},
								properties: {
									top: 0, left: 0
								}

							},
							{
								position: .21 *(thr_vid_mul = 1.2),
								onInit: function( anim ) {
									animationFunctions.centerH.call( this, anim, {});
									animationFunctions.centerV.call( this, anim, {});
								},
								onProgress: function( progress ) {
									animationFunctions.videoPause.call( this, progress, imageSequences['through'], 0, .28)
								},
								properties: {
									top: 0, left: 0
								}

							},
							{
								position: .36 * thr_vid_mul,
								onInit: function( anim ) {
									animationFunctions.centerH.call( this, anim, {});
									animationFunctions.centerV.call( this, anim, {});
								},
								properties: {
									top: 0, left: 0
								}

							},

							{
								position: .48 * thr_vid_mul,
								onInit: function( anim ) {
									animationFunctions.centerH.call( this, anim, {});
									animationFunctions.centerV.call( this, anim, {});
								},
								onProgress: function( progress ) {
									animationFunctions.videoPause.call( this, progress, imageSequences['through'], .28, .555)
								},
								properties: {
									top: 0, left: 0
								}
							},

							{
								position: .53 * thr_vid_mul,
								onInit: function( anim ) {
									animationFunctions.centerH.call( this, anim, {});
									animationFunctions.centerV.call( this, anim, {});
								},
								properties: {
									top: 0, left: 0
								}

							},

							{
								position: .7 * thr_vid_mul,
								onInit: function( anim ) {
									animationFunctions.centerH.call( this, anim, {});
									animationFunctions.centerV.call( this, anim, {});
								},
								onProgress: function( progress ) {
									animationFunctions.videoPause.call( this, progress, imageSequences['through'], .555, .92)
								},
								properties: {
									top: 0, left: 0
								}
							},



							{
								position: .78 * thr_vid_mul,
								onInit: function( anim ) {
									animationFunctions.centerH.call( this, anim, {});
									animationFunctions.centerV.call( this, anim, {});
								},
								properties: {
									top: 0, left: 0
								}

							},

							{
								position: 1,
								onInit: function( anim ) {
									animationFunctions.centerH.call( this, anim, {});
									animationFunctions.centerV.call( this, anim, {});
								},
								onProgress: function( progress ) {
									animationFunctions.videoPause.call( this, progress, imageSequences['through'], .92, 1)
								},
								properties: {
									top: 0, left: 0
								}
							}
						]
			},

			{
				id: 'accessories',
				startAt: 780+animationSections.accessories,
				endAt: 816+animationSections.accessories,
				keyframes: [
					{
						position: 0,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.bottomOutside.call( this, anim, {});
						},
						properties: {
							top: 0, left: 0
						}

					},
					{
						position: 1,
						//ease: TWEEN.Easing.Quadratic.EaseIn,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {offset: -5});
							animationFunctions.centerV.call( this, anim, {offset: -25});
						},
						properties: {
							top: 0, left: 0
						}
					}
				]

			},
			{
				id: 'share',
				startAt: 680+animationSections.share,
				endAt: 1063+animationSections.share,
				keyframes: [
					{
						position: 0,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.bottomOutside.call( this, anim, {});
						},
						properties: {
							top: 0, left: 0
						}

					},
					{
						position: 1,
						//ease: TWEEN.Easing.Quadratic.EaseIn,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.centerV.call( this, anim, {offset: -30});
						},
						properties: {
							top: 0, left: 0
						}
					}
				]

			},

			{
				id: 'display',
				startAt: 1350+animationSections.display,
				endAt: 1750+animationSections.display,
				keyframes: [
					{
						position: 0,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.centerV.call( this, anim, {});
						},
						properties: {
							top: 0, left: 0
						}

					},
					{
						position: 1,
						//ease: TWEEN.Easing.Quadratic.EaseIn,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.topOutside.call( this, anim, {});
						},
						properties: {
							top: 0, left: 0
						}
					}
				]

			},

			{
				id: 'performance',
				startAt: animationSections.performance,
				endAt: 800+animationSections.performance,
				keyframes: [
					{
						position: 0,
						onInit: function( anim ) {
							animationFunctions.bottomOutside.call( this, anim, {});

						},
						properties: {top: 0, left: 0}

					},
					{
						position: .4,
						//ease: TWEEN.Easing.Linear.EaseNone,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.centerV.call( this, anim, {offset:-60});
						},
						properties: {top: 0, left: 0}
					},
					{
						position: 1,
						//ease: TWEEN.Easing.Linear.EaseNone,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.centerV.call( this, anim, {offset:-60});
						},
						properties: {top: 0, left: 0}
					}

				]
			},

			{
				id: 'reviews',
				startAt: animationSections.reviews,
				endAt: 800+animationSections.reviews,
				keyframes: [
					{
						position: 0,
						onInit: function( anim ) {
							animationFunctions.bottomOutside.call( this, anim, {});

						},
						properties: {top: 0, left: 0}

					},
					{
						position: .4,
						//ease: TWEEN.Easing.Linear.EaseNone,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.centerV.call( this, anim, {offset:-60});
						},
						properties: {top: 0, left: 0}
					},
					{
						position: 1,
						//ease: TWEEN.Easing.Linear.EaseNone,
						onInit: function( anim ) {
							animationFunctions.centerH.call( this, anim, {});
							animationFunctions.centerV.call( this, anim, {offset:-60});
						},
						properties: {top: 0, left: 0}
					}

				]
			}
		];

		// public
		return {
			animationSections: animationSections,
			animation: animation
		};
	}


})(jQuery);