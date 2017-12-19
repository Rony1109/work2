define(function(require , exports , module){
	//弹框和遮罩层
	var shadow = function(elem , dialog , btn){
		var params = {
			width: $(document).width(),
			height: $(document).height(),
			opacity: 0.6
		};
		//点击按钮显示弹框
		$(btn).bind('click', function(){
			$(elem).css(params).show();
			$(dialog).show();
			return false;
		});
		$(dialog).find('.close').bind('click', function(){
			$(dialog).hide();
			$(elem).hide();
			return false;
		});
	};
	//
	var slide = function(elem, tip, img){
		//显示第一个
		$(tip).html($(elem).eq(0).find('a img').attr('alt'));
		$(elem).each(function(){
			$(this).bind('click', function(){
				$(img).attr('src', $(this).find('a img').attr('src'));
				$(this).addClass('cur').siblings('li').removeClass('cur');
				$(tip).html($(this).find('a img').attr('alt'));
			});
		});
	};

	//跑马灯
	var marquee = function(elem){
		var w_li = $(elem).find('li').width(),
			w_ul = $(elem).width();

		console.log(w_ul);
		function autoplay(){
			var timeStamp = setInterval(function(){

			}, 1000);
		}
		autoplay();
	};

	module.exports = {
		shadow: shadow,
		slide: slide,
		marquee: marquee
	};
});