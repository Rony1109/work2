seajs.config({
	// 别名配置
	alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js'
	},
	// Sea.js 的基础路径
	base: 'http://res.csc86.com/v2/'
});
define(function (require, exports, module) {
	require('jquery');
	require('top');
	/*
	 * 以下为专题js代码
	 * ......
	 */
	var $floorNav = $('ul.floor-nav'),
		$li = $floorNav.find('li'),
		top = $floorNav.offset().top,
		$w = $(window),
		top1 = $('div.floor-1').offset().top,
		top2 = $('div.floor-2').offset().top,
		top3 = $('div.floor-3').offset().top,
		top4 = $('div.floor-4').offset().top,
		top5 = $('div.factory').offset().top;
	$w.bind('scroll', function(event) {
		var wT = $w.scrollTop();
		if(!-[1,]&&!window.XMLHttpRequest){
			if(wT > top){
				$floorNav.stop(true).css({
					position:'position'
				}).animate({
					top:wT-top
				},200);
			}else if(wT < top && $floorNav.is('[style]')){
				$floorNav.removeAttr('style');
			}
		}else if(wT > top && $floorNav.is(':not([style])')){
			$floorNav.css({
				top:0,
				position:'fixed',
				width:990
			});
		}else if(wT < top && $floorNav.is('[style]')){
			$floorNav.removeAttr('style');
		}
		wT = wT + 80;
		if(wT > top5){
			$li.removeClass('active').filter(':last').addClass('active');
		}else if(wT > top4){
			$li.removeClass('active').filter(':eq(3)').addClass('active');
		}else if(wT > top3){
			$li.removeClass('active').filter(':eq(2)').addClass('active');
		}else if(wT > top2){
			$li.removeClass('active').filter(':eq(1)').addClass('active');
		}else{
			$li.removeClass('active').filter(':first').addClass('active');
		}
	}).trigger('scroll');
	$floorNav.delegate('li', 'click', function(event) {
		event.preventDefault();
		$w.scrollTop(eval('top'+($(this).index()+1))- 65).trigger('scroll');
	});
	$('div.banner').find('div.g-o').append('<div class="g-fr g-comment-share"><div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_t163" data-cmd="t163" title="分享到网易微博"></a></div><script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName(\'head\')[0]||body).appendChild(createElement(\'script\')).src=\'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=\'+~(-new Date()/36e5)];</script></div>');
	if(!-[1,]&&!window.XMLHttpRequest){
		$('div.factory').delegate('a.i', 'mouseover', function(event) {
			$(this).find('span').show();
		}).delegate('a.i', 'mouseout', function(event) {
			$(this).find('span').hide();
		});
	}
});