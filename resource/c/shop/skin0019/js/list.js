define(function(require, exports, module) {
	var isLoginObj=require('c/shop/skin0019/js/newtop.js');
	require('l/jQueryCookie/1.4.1/jquery.cookie.js');//cookie插件
	var isSubmit=false,isxljz=false;
	
	
	var isLogin=isLoginObj.status;//是否登录 true为登录 false为未登
	var memberId=isLoginObj.data.id;//登录的会员id
	var list={
		
		//图片懒加载
		lazyLoadImg:function(){
			require.async('l/lazyload/1.9.1/jquery.lazyload.js',function(){
				$('img').lazyload({
					failure_limit:100,
					effect : "fadeIn",
					isProga:true
				});
			});
		},
		
		//分类导航
		catNavLst:function(){
			$('.jsCatNavLst').on('mouseenter','.itm .hd',function(){
				var $this=$(this);
				//var $thisindex= $this.index();
				var $parent=$this.parent();
				if($parent.find('li').length){
				$parent.addClass('unfold').find('i').addClass('ihover').end().siblings().removeClass('unfold').find('i').removeClass('ihover');	
					}
				
				});
		},

		//顶部固定导航
		topNav:function(){
				var fixnav = $(".top_bar");
				var topnavHeight = $(".top_bar").height();
				$(window).scroll(function(){
					var	scrHeight = $(this).scrollTop();
					(scrHeight>=topnavHeight)?fixnav.addClass('fixnav'):fixnav.removeClass('fixnav');
				});
			},
			
			//购物车
			gwc:function(){
			var host = location.host;
				$.post('//'+host+'/default/Buycar',function(data){
					if(data.status==true){
						if(data.data.carNum){
								$('.shop_cart').find('.amt').text(data.data.carNum);
								$('.aside_cart').find('em').text(data.data.carNum);
								if(data.data.carNum == 0){
									$('.shop_cart').find('.amt').remove();
									$('.aside_cart').find('em').remove();
								}
							}else{
								$('.shop_cart').find('.amt').remove();
								$('.aside_cart').find('em').remove();
							}
						  }else{
								$('.shop_cart').find('.amt').remove();
								$('.aside_cart').find('em').remove();
						}
						
					},'jsonp');
				},
	pagelist:function(){
		$('.nav_opt').on('click','.prev',function(){
			var $this=$(this);
			var $thisparents=$this.parents('.nav_opt');
			var pageNo=0;
			var $minval = $thisparents.find('.min').text()*1;
			var $maxval = $thisparents.find('.max').text()*1;
			pageNo = $minval>1?$minval-1:1;
			gotoPage(pageNo);
			return false;
			});
			
		$('.nav_opt').on('click','.next',function(){
			var $this=$(this);
			var $thisparents=$this.parents('.nav_opt');
			var pageNo=0;
			var $minval = $thisparents.find('.min').text()*1;
			var $maxval = $thisparents.find('.max').text()*1;
			pageNo = $minval<$maxval?$minval+1:$minval;
			gotoPage(pageNo);
			return false;
			});	
		
		$('.mem_ct').hover(function(){	
						$(this).addClass('hover').find('.mem_opt').show();
					},function(){
						$(this).removeClass('hover').find('.mem_opt').hide();
					});	
		
		/*			
	   var desc = $('.nav_opt').find('.price');
	   var href= desc.attr('href').replace(/(.*)price-desc(.*)/,"$1");
	   if(desc.attr('href').indexOf('price-desc')>0){
		   desc.attr('href','')
		   }	
		   */	
			
		function gotoPage(pageNo){
	var  pageUrl = window.location.href;
	if(pageUrl.indexOf("page")>0){
		var newPageh = pageUrl.substring(0,pageUrl.indexOf("page"));
		var newpageUrl = pageUrl.substring(pageUrl.indexOf("page"));
	 	var page;
		if(newpageUrl.indexOf("&")>0){
		    page = "page="+pageNo+newpageUrl.substring(newpageUrl.indexOf("&"));
		}else{
		    page = "page="+pageNo;
		}
		window.location = newPageh+page;
	}else{
		if(pageUrl.indexOf("?")>0){
			window.location = pageUrl+"&page="+pageNo;
		}else{
			if(pageUrl.charAt(pageUrl.length-1)=='#'){
	  	 		pageUrl = pageUrl.substring(0,pageUrl.length-1);
	  	 	}
			window.location = pageUrl+"?page="+pageNo;
		}
		
	}
}
		},			
		
		
		
		//列表页入口
		init:function(){
			
			//list.topNav();//顶部固定导航
			list.gwc();//分类导航
			list.pagelist();//分页
			list.catNavLst();//左侧分类
			list.lazyLoadImg();//图片懒加载
						
		}
	};
	list.init();
});