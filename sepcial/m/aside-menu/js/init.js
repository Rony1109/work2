define(function(require, exports, module) {
    // 检查登录，设置首页，收藏，设置搜索,频道选择
	(function () {
		var special = require('special');
		special.isLogin();
		special.placeholder('#search-txt');
		special.search();
		special.searchType("div.m-search");
	
		var browser = navigator.userAgent.toLowerCase();
		$('.sethome').click(function () {
			if(browser.indexOf('webkit') > 0) {
				alert('您的浏览器未开启该功能');
			}
			special.setHome();
			return false;
		});
		$('.addfav').click(function(){
			special.addFav(location.href, document.title);
			return false;
		});
		$('.top-my-account').hover(function(){
			$(this).addClass('hover').find('.bd').show();
		}, function(){
			$(this).removeClass('hover').find('.bd').hide();
		});
		//频道选择
		$('.selected_channel').on({
			mouseover: function() {
				$(this).find('.sel_chnel').addClass('hover');
				$(this).find('.chnel_list').show();
			},
			mouseout: function() {
				$(this).find('.sel_chnel').removeClass('hover');
				$(this).find('.chnel_list').hide();
			}
		});
		require('http://res.csc86.com/v2/m/head-search/js/searchComplete');
		$('.ss-txt').SearchComplete();
	})();
    /*
     * 以下为专题js代码
     * ......
     */
	 
	var aside={
		
		/*滚动到对应位置*/
		scrollTop:function(num){
			$("html,body").animate({scrollTop:num},500);
		},
		
		/*返回头部*/
		backTop:function(options){
			var opts={
				obj:$("#backTop")
			};
			
			opts=$.extend({},opts,options);
			
			var $obj=opts.obj;
			
			$obj.on("click",function(){
				aside.scrollTop(0);
				return false;
			});
		},
		
		/*右侧导航*/
		asideScroll:function(options){
			var opts={
				flrObj:$(".flr"),
				asideObj:$("#aside"),
				asideMenuTag:"ul",
				asideMenuChildTag:"li",
				curClass:'cur'
			};
			
			opts=$.extend({},opts,options);
			
			var arry=[],
				$flr=opts.flrObj,
				$aside=opts.asideObj,
				$asideMenu=$aside.find(opts.asideMenuTag),
				$asideMenuChild=$asideMenu.find(opts.asideMenuChildTag),
				curClass=opts.curClass;
			
			$flr.each(function(){
				arry.push($(this).offset().top);
			});
			
			$(window).scroll(function(){
				var top=$(this).scrollTop();
				top>=arry[0]?$aside.slideDown():$aside.slideUp();
				
				if(curClass){
					for(var i=0;i<=arry.length;i++){
						if(top>=arry[i]&&top<=arry[i+1]){
							$asideMenuChild.eq(i).addClass(curClass).siblings().removeClass(curClass);
						}
						if(top>=arry[arry.length-1]){
							$asideMenuChild.eq(arry.length-1).addClass(curClass).siblings().removeClass(curClass);
						} 
					}
				}
			});
			
			$asideMenuChild.on('click',function(){
				var index=$asideMenuChild.index(this);
				aside.scrollTop(arry[index]);
				return false;
			});
		}
	};
	
	
	//右侧导航
	aside.asideScroll({
		flrObj:$(".flr"),
		asideObj:$("#aside"),
		asideMenuTag:"ul",
		asideMenuChildTag:"li",
		curClass:'cur'
	});
	
	//返回头部
	aside.backTop({
		obj:$("#backTop")
	});
	
	
});
