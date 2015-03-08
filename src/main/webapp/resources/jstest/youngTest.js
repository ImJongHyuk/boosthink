/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {
 
	test("chainable", function() {
		ok($("p b").awesome().addClass("testing"), "can be chained");
		equal($("p b").hasClass("testing"), true, "class was added correctly from chaining");
	});
 
}(jQuery));