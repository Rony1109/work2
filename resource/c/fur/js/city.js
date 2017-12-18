define(function(require, exports, module) {
	require('./init');
	var tabs = require('tab');
	tabs($(".nav-brand li"), $(".brand-img img"), 'mouseover', 'cur');
	tabs($(".server-nav li"), $(".server-list"), 'mouseover', 'cur');
	tabs($(".discount-tab-nav li"), $(".discount-tab-content"), 'mouseover', 'cur');
});