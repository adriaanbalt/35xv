;(function($) {
	
	if (!$.BALT){ 
		$.BALT = {}; 
	}
	if (!$.BALT.UTIL){ 
		$.BALT.UTIL = {}; 
	}
	
	$.BALT.UTIL.dropdown = function(target, options){
	 
		// use a reference for the plugin
		var root = this,
		$target = $(target),
		defaults = {
		},
		settings = $.extend({}, defaults, options);

		// private methods
		root.init = function(){
			settings.multiSelection = $target.find('select').attr('multiple') === 'multiple';

			$target.on('click', function(e){
				root.onOpen(this, e);
			});

			$target.on('click', 'li', function(e){
				e.preventDefault();
				settings.selected = $(e.target).data('value');
				root.onClose(this, e);
			});

			return settings.onInit !== undefined ? settings.onInit() : true;
		};

		/**
		* @name onOpen(el, event)
		* @description This method runs when the .dropdown element is clicked.
		* @param {DOM Node} el The element being clicked
		* @param {Object} event The jQuery event
		*/
		root.onOpen = function(el, event){
			var $el = $(el),
				multi = settings.multiSelection;
			if ( $target.hasClass('active') && !multi){
				$target.removeClass('active');
			} else {
				$target.siblings().removeClass('active');

				new $.BALT.UTIL.offClick( $(this), {
					callback: function(e){
						this.$el.removeClass('active');
					}
				});

				$target.addClass('active');
console.log ( "" );
				console.log ( "$target ", $el );
				
				if (multi) {
				
					$target.find('ol').children('li').each(function(i, el){
						// If there is a match,
						if ($target.find('select option').eq(i).attr('selected') === 'selected') {
							$(this).addClass('active');
							// $target.find('.current-value').text($target.find('.current-value').text() + ', ' + $el.data('value'));
						} else {
							$(this).removeClass('active');
						}
						
					});
				 
				} else {
					// Store the current value of the displayed dropdown.
					var _currentValue = $target.find('.current-value').eq(0).text();
					var _currentSelection = $target.find('select option[selected]').text();
					
					console.log ( '_currentValue: ', _currentValue );

					// Loop through the li elements inside of the menu dropdown.
					$target.find('ol').children('li').each(function(){
						
						console.log ( "li: ", $(this), $(this).data('value') );

						// If there is a match,
						if ( $(this).data('value') ) {
							if ( $(this).data('value') == _currentSelection ){
								$(this).addClass('active'); // apply the class active to show the checkmark
								return false; // and break out of the menu.
							}
						} else {
							if ( $(this).find('.option').text() === _currentSelection){
								$(this).addClass('active'); // apply the class active to show the checkmark
								return false; // and break out of the menu.
							}
						}
					});
				}
				
				return settings.onOpen !== undefined ? settings.onOpen() : true;
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
				multi = settings.multiSelection;

			$target.find('.active').removeClass('active');
			
			console.log ( "" );
			console.log ( "$el.data('value') ", $el.data('value') );
			
			if (!multi) {
				
				console.log ( "$target.find('.current-value').length: ", $target.find('.current-value') );

				$target.find('select option').removeAttr('selected');
				$target.find('.current-value').text( $el.data('value') );
			} else if ( $target.find('select option:eq(' + $target.find($el).index() + ')').attr('selected') === 'selected' ) {
				$target.find('select option:eq(' + $target.find($el).index() + ')').removeAttr('selected');
				return settings.onClose !== undefined ? settings.onClose() : true;
			}

			$target.find('select option:eq(' + $target.find($el).index() + ')').attr('selected', 'selected');

			return settings.onClose !== undefined ? settings.onClose() : true;
		};

		// Initialize the plugin
		root.init();

	};
	
})(jQuery);