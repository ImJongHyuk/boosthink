/*
 * jquery.grunt-test
 * https://github.com/andymatthews/jquery.grunt-test
 *
 * Copyright (c) 2012 andy matthews
 * Licensed under the MIT, GPL licenses.
 */
 
(function($) {
 
	// Collection method.
	$.fn.awesome = function() {
		return this.each(function() {
			$(this).html('awesome');
		});
	};
 
	// Static method.
	$.awesome = function() {
		return 'awesome';
	}; 
	// Custom selector.
	$.expr[':'].awesome = function(elem) {
		return elem.textContent.indexOf('awesome') >= 0;
	};
 
}(jQuery));