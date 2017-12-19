/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': './jquery.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'scrollLoading':'./jquery.scrollLoading.js',
		'scroll':'./scroll.js'
		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	require('scrollLoading');
	require('scroll');
	

    /*
     * 以下为专题js代码
     * ......
     */
	 
	 (function(){
		var arry=[];
		var fix=$('.fix');
		var fixscroll=fix.find('.fixscroll');
		$('.content1').each(function(){
            arry.push($(this).offset().top);
        });
		$(window).scroll(function(){
			var _top=$(this).scrollTop();
			_top>=500?fix.fadeIn():fix.fadeOut();
			
			for(var i=0;i<=arry.length;i++){
				if(_top>=arry[i]-200&&_top<=arry[i+1]){
					fixscroll.eq(i).addClass('active').siblings().removeClass('active');
					
				}
			}
							if(_top>=arry[arry.length-1]-400){
					
					fixscroll.eq(arry.length-1).addClass('active').siblings().removeClass('active');
				} 
		});
		fix.find('.fixscroll').on('click',function(){
			var _index=fix.find('.fixscroll').index(this);
			$('html,body').animate({scrollTop:arry[_index]},500);
			return false;
		});
	})();
	
		$('.fixtop').on('click',function(){
		$('html,body').animate({scrollTop:0},500);
		return false;
		
	});
		$('.con .left').hover(function(){$(this).find(".context").stop().fadeIn()},function(){$(this).find(".context").stop().fadeOut()});
    var timer=null;
    $("#play").CscScroll({
        Left: 462,
        Right: 231,
        Time: 2000,
        linedUp: timer,
        Auto: true,
        Visual: 3
    });
	
	$(".imgloading").scrollLoading();
	
	
		var fx ='<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网">人人网</a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a><a href="#" class="bds_more" data-cmd="more"></a></div>';
		$(".fx").html(fx);
	
	window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

});
