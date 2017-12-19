/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({
    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
		'comment': 'm/comment/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js'
    },
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	require('http://res.csc86.com/f=js/m/config.js');
	var dialog=require('dialog');

     //右侧浮动菜单
	/*(function(){
		var arry=[];
		var fix=$('.jqjhj-list-menu');
		var fixUl=fix.find('ul');
		var fixLi=fix.find('li');
		$('.jqjhj-right-menu').each(function(){
            arry.push($(this).offset().top);
        });
		$(window).scroll(function(){
			var _top=$(this).scrollTop();
			_top>=790?fix.fadeIn():fix.fadeOut();
			for(var i=0;i<=arry.length;i++){
				if(_top>=arry[i]&&_top<=arry[i+1]){
					fixLi.eq(i).addClass('cur').siblings().removeClass('cur');
				}
				if(_top>=arry[arry.length-1]){
					fixLi.eq(arry.length-1).addClass('cur').siblings().removeClass('cur');
				} 
			}
		});
		fixLi.find('a').on('click',function(){
			var _index=fixLi.find('a').index(this);
			$('html,body').animate({scrollTop:arry[_index]},500);
			return false;
		});
	})();*/

	$(".jqjhj-hrefimg").find('a').on('click',function(){
	    
		var index=$(".jqjhj-hrefimg").length;
		for(var i=0;i<index;i++)
		{
		    $(".jqjhj-hrefimg").removeClass("jqjhj-hrefimg1");
			
		}
		$(this).parent().addClass("jqjhj-hrefimg1");
	});
	
	$(".jqjhj-hrefimg").mousemove(function(){
	    $(this).addClass("jqjhj-hrefimg1");
	});
	
	$(".jqjhj-hrefimg").mouseout(function(){
	    $(this).removeClass("jqjhj-hrefimg1");
	});
	
		
 });
