;(function($) {
	
	// Create the Caesars namespace if it doesn't exist
	if (!$.UTIL ){ 
		$.UTIL = {}; 
	}
	
	$.UTIL.offClick = function(el, options){

		// use a reference for the plugin
		var root = this;
		
		root.init = function(){
			
			// copy and override the passed defaultOptions with the passed in options
			root.options = $.extend({}, $.Caesars.offClick.defaultOptions, options);
			
			return root.$el.each(function(i, el){
				var $el = $(el);
				
				// check if the element is listening for an offClick
				if (!!($el.data('offclick'))){
					return false; // and get out of here if it is true
				}
				
				// Add a public method to the $element
				$el.offTargetTrigger = function(e){
				
					root.options.$el = $el;
					
					// Check if the forceClose option is in place.
					if (root.options.forceClose){
						// Ensure that the callback provided is a function
						if ($.isFunction(root.options.callback)) {
							root.options.callback(e); // and execute
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
					
					
					if($.isFunction(root.options.callback)){
						root.options.callback(e);
					}
					
					$(document).off('click', $el.offTargetTrigger);
					$el.removeData('offclick');
					
				};
				
				$(document).on('click', $el.offTargetTrigger);
				$el.data('offclick', true);
				
			});
		};
		
		// Run init
		root.init();
	};
	
	
})(jQuery);
