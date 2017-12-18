define(function(require, exports, module) {
	require('./init');
	//banenr
	$(".classify span").click(function() {
		$(".classify p").toggleClass("h-auto");
	});
	//banner 产品图PNG处理
	var ie6 = !-[1, ] && !window.XMLHttpRequest;
	if (ie6) {
		$('.banner-product a').each(function() {
			var imgUrl = $(this).find('img').attr('src')
			$(this).css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + imgUrl + '");').html('');
		})
	};
	
	//排序
	$('.select').hover(function() {
		$(this).find('ul').show();
	}, function() {
		$(this).find('ul').hide();
	});
	//瀑布流数据组装
	var GetData = require('./getData');
	GetData.GetData({
		cLickElements: $('.key-words-link')
	});
	//关键字展开全部
	$('.key-words-link p').removeClass('h-48');
	$('#first-key').addClass('h-48');

})