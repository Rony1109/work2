seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
	
	
    var index={
		/**
		*点击小图显示大图
		*/
		showPic:function(){
			$(".jsSpicLst li").on("click",function(){
				var $this=$(this),
					$jsBpic=$this.parent().siblings(".jsBpic"),
					bsrc=$this.find("img").data("bsrc"),
					bhref=$this.data("bhref");
				$jsBpic.find("img").attr("src",bsrc);
				$jsBpic.find("a").attr("href",bhref);
			});
		},
		
		/**
		*左右轮播
		*/
		lrScroll:function(tag,un,time){
			var $ul=$(tag).find("ul"),
			$w=$ul.find("li:first").width();
			if(!$ul.is(":animated")){
				if(un==1){
					$ul.animate({
						left:-$w
					},time,function(){
						$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
				}else{
					$ul.css({left:-$w}).find("li:last").prependTo($ul);
					$ul.animate({
						left:0
					},time);
				}
			}
		},
		
		/**
		*左右轮播自动播放
		*/
		lrAutoPlay:function(tag,un,time,n){
			var scrollTimer,
				$tag=$(tag),
				len=$tag.find("ul li").length;
			if(len>n){
				$(tag).hover(function(){
					clearInterval(scrollTimer);
				},function(){
					var _this=$(this);
					scrollTimer=setInterval(function(){
						 index.lrScroll(_this,un);
					},time);
				}).trigger("mouseleave");
			}
		},
		
		/**
		*右侧菜单显示与隐藏
		*/
		showHideAside:function(){
			$(window).scroll(function(){
				var top=$(this).scrollTop(),
					flrTop1=$("#flr1").offset().top;
					$aside=$("#aside");
				if(top>=flrTop1){
					$aside.slideDown();
				}else{
					$aside.slideUp();
				}
			});
		},
		
		/**
		*本专题入口js
		*/
		init:function(){
			index.showPic();
			index.lrAutoPlay("#topicScroll","1",5000,4);
			index.showHideAside();
		}
	};
	
	index.init();
});