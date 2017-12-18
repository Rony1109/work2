define(function(require, exports, module){
	var tabs = function(nav, ctn, type, fn){
		//初始化
		$(nav).find('ul>li:eq(0)').addClass('cur').siblings().removeClass('cur');
		$(ctn+'>div').eq(0).show().siblings().hide();

		$(nav).find('ul>li').each(function(index){
			$(this).on(type, function(){
				$(ctn+'>div').eq(index).show().siblings().hide();
				$(this).addClass('cur').siblings().removeClass('cur');
				if(fn) fn.call(null, $(this), index);
			});
		});
	};
	module.exports = tabs;
});