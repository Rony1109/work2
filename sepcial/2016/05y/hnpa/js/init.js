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
		'scroll':'./scroll.js',
		'play':'./play.js'
		
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
	require('play');
	

    /*
     * 以下为专题js代码
     * ......
     */
	 
	 (function(){
		var arry=[];
		var arry2=[];
		var gcont=$('.gcont4 .title');
		var tscroll=gcont.find('li');
		var fixtop = gcont.offset().top;
		$('.glo').each(function(){
            arry.push($(this).offset().top);
        });

		$(window).scroll(function(){
			var _top=$(this).scrollTop();
			
			_top>=fixtop?gcont.addClass("fix"):gcont.removeClass("fix");
			
			for(var i=0;i<=arry.length;i++){
				if(_top>=arry[i]-200&&_top<=arry[i+1]){
					tscroll.eq(i).addClass('active').siblings().removeClass('active');
					
				}
			}
							if(_top>=arry[arry.length-1]-400){
					
					tscroll.eq(arry.length-1).addClass('active').siblings().removeClass('active');
				} 
		});
		tscroll.on('click',function(){
			var _index=gcont.find('li').index(this);
			$('html,body').animate({scrollTop:arry[_index]-60},500);
			return false;
		});
		


  $("#play").cscplay();
	


		
	})();

});
