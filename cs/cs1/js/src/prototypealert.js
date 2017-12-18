define(function(require,exports, module) {
	exports.foo = 'bar';
	module.constructor.prototype.aaa=function(){
		this.foo = 'aabb';
		return 123;
		};
});