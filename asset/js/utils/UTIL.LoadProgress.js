/*
@description Load Progress
*/

var LoadProgress = function( opts ) {

	var defaults = {},
		settings = $.extend(defaults, opts),
		total = 0,
		progress = 0,
		done = false;
	
	var register = function( val ) {
		total += val;
	};

	var update = function( val ) {
		progress += val = 1;
		if (progress == total && done === false) {
			if ( typeof settings.onUpdate === 'function' ) settings.onUpdate( progress/total );
			if ( typeof settings.onComplete === 'function' ) settings.onComplete();
			done = true;
		} else {
			if ( typeof settings.onUpdate === 'function' ) settings.onUpdate( progress/total );
		}
	}
	
	return {
		register: register,
		update: update
	}
};