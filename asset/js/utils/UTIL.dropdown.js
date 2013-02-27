;(function($) {
	
	if (!$.UTIL){ 
		$.UTIL = {}; 
	}
	
	$.UTIL.dropdown = function(el, options){
	 
		// use a reference for the plugin
		var root = this;

		// private methods
		root.init = function(){

			// Copy and override the original defaultOptions with the passed in `options`.
			root.options = $.extend({}, $.Caesars.dropdown.defaultOptions, options);

			root.options.multiSelection = root.$el.find('select').attr('multiple') === 'multiple';

			root.$el.on('click', function(e){
				root.onOpen(this, e);
			});

			root.$el.on('click', 'li', function(e){
				e.preventDefault();
				root.options.selected = $(e.target).data('value');
				root.onClose(this, e);
			});

			return root.options.onInit !== undefined ? root.options.onInit() : true;
		};

		/**
		* @name onOpen(el, event)
		* @description This method runs when the .dropdown element is clicked.
		* @param {DOM Node} el The element being clicked
		* @param {Object} event The jQuery event
		*/
		root.onOpen = function(el, event){
			var $el = $(el),
			multi = root.options.multiSelection;
			if (root.$el.hasClass('is-active') && !multi){
				root.$el.removeClass('is-active');
			} else {
				root.$el.siblings().removeClass('is-active');
				
				$el.Caesars_offClick({
					callback: function(e){
						this.$el.removeClass('is-active');
					}
				});

				root.$el.addClass('is-active');
				
				
				if (multi) {
				
					root.$el.find('.menu').children('li').each(function(i, el){
						var $el = $(this);
						// If there is a match,
						if (root.$el.find('select option').eq(i).attr('selected') === 'selected') {
							$el.addClass('is-active');
							// root.$el.find('.current-value').text(root.$el.find('.current-value').text() + ', ' + $el.data('value'));
						} else {
							$el.removeClass('is-active');
						}
						
					});
				 
				} else {
					// Store the current value of the displayed dropdown.
					var _currentValue = root.$el.find('.current-value').eq(0).text();
					var _currentSelection = root.$el.find('select option[selected]').text();
					// Loop through the li elements inside of the menu dropdown.
					root.$el.find('.menu').children('li').each(function(){
						var $el = $(this);
						// If there is a match,
						if ($el.data('value')) {
							if ($el.data('value') == _currentSelection){
								$el.addClass('is-active'); // apply the class is-active to show the checkmark
								return false; // and break out of the menu.
							}
						} else {
							if ($el.find('.option').text() === _currentSelection){
								$el.addClass('is-active'); // apply the class is-active to show the checkmark
								return false; // and break out of the menu.
							}
						}
					});
				}
				
				return root.options.onOpen !== undefined ? root.options.onOpen() : true;
			}
		};

		/**
		* @name onClose(el, event)
		* @description This method runs when the li element is clicked.
		* @param {DOM Node} el The element being clicked
		* @param {Object} event The jQuery event
		*/
		root.onClose = function(el, event){
			var $el = $(el),
				multi = root.options.multiSelection;

			root.$el.find('.is-active').removeClass('is-active');

			if (!multi) {
				root.$el.find('select option').removeAttr('selected');
				if (root.$el.find('.current-value').length === 2 || root.$el.parents('#l-booker-mini').length) {
					root.$el.find('.current-value').text($el.data('value'));
				}
			} else if (root.$el.find('select option:eq(' + root.$el.find($el).index() + ')').attr('selected') === 'selected') {
				root.$el.find('select option:eq(' + root.$el.find($el).index() + ')').removeAttr('selected');
				return root.options.onClose !== undefined ? root.options.onClose() : true;
			}

			root.$el.find('select option:eq(' + root.$el.find($el).index() + ')').attr('selected', 'selected');

			return root.options.onClose !== undefined ? root.options.onClose() : true;
		};

		// Initialize the plugin
		root.init();

	};
	
})(jQuery);