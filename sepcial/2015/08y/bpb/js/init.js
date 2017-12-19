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
        'placeholder': 'm/sea-modules/placeholder.js',
		'comment':'m/comment/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	//var comment=require('comment');
   
   	//右侧浮动菜单
	(function(){
		var arry=[];
		var fix=$('.aside-menu');
		var fixUl=fix.find('ul');
		var fixLi=fix.find('li');
		$('.flr').each(function(){
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
	})();
	
	//返回头部
	$('.back-top a').on('click',function(){
		$('html,body').animate({scrollTop:0},500);
		return false;
	});
	
	//评论
	//comment.init('6b99a8f0-e227-4b55-8185-4a556bd5ec65',$('#JComment'),{pn:2});
	
	//其他专题左右轮播
	var left_right=function(tag,un){
		var $ul=$(tag).find("ul"),
			$w=$ul.find("li:first").width();
		if(!$ul.is(":animated")){
			if(un==1){
				$ul.animate({
					left:-$w
				},500,function(){
					$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
			}else{
				$ul.css({left:-$w}).find("li:last").prependTo($ul);
				$ul.animate({
					left:0
				},500);
			}
		}
	};
	$(".topic-bd .next").click(function(){
		left_right(".topic-scrll","1");
		return false;
	});
	$(".topic-bd .prev").click(function(){
		left_right(".topic-scrll","2");
		return false;
	});
});
