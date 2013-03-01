;(function($) {
	
	if (!$.BALT){ 
		$.BALT = {}; 
	}
	if (!$.BALT.UTIL){ 
		$.BALT.UTIL = {}; 
	}
	
	$.BALT.UTIL.offClick = function(el, options){

		// use a reference for the plugin
		var root = this,
			$target = el,
			defaults = {

			},
			settings = $.extend({}, defaults, options);
		
		console.log ( "target: ", $target );

		return $target.each(function(i, el){
			var $el = $(el);
			
			// check if the element is listening for an offClick
			if (!!($el.data('offclick'))){
				return false; // and get out of here if it is true
			}
			
			// Add a public method to the $element
			$el.offTargetTrigger = function(e){

				console.log ( "off target trigger" );
			
				settings.$el = $el;
				
				// Check if the forceClose option is in place.
				if (settings.forceClose){
					// Ensure that the callback provided is a function
					if (settings.callback && typeof settings.callback === 'function') {
						settings.callback(e); // and execute
						return false; // and exit
					}
				}
				// Preventing bubbling
				e.stopPropagation();
				// isOffTarget is a boolean which stores whether the event target is
				// the element passed into the plugin.
				var isOffTarget = !(!!($(e.target).parents("[class='" + $el.attr('class') + "']").length) || (e.target == $el[0]));

				if(!isOffTarget){
					return false;
				}
				
				
				if($.isFunction(settings.callback)){
					settings.callback(e);
				}
				
				$(document).off('click', $el.offTargetTrigger);
				$el.removeData('offclick');
				
			};
			
			$(document).on('click', $el.offTargetTrigger);
			$el.data('offclick', true);
			
		});
	};
	
	
})(jQuery);
