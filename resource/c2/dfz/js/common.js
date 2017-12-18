define(function(require, exports, module) {
	var ph=require('m/sea-modules/placeholder');
	//var isLoginObj=require('m/newtopnav/js/init.js');/*顶部导航*/
	var isLoginObj=require('c2/newcgsc/js/newtop.js');/*统一用www.csc86.com页面的顶部导航*/
	require('m/bot-rightcopy/js/init.js');/*网站底部样式*/
	var isLogin=isLoginObj.status;//是否登录 true为登录 false为未登录
	var username=isLoginObj.data.username;//登录的会员id
	var common={
		/*搜索*/
		srch:function(){
			ph.placeholder('#search-txt');
			$.fn.extend({
				Search: function() {
					$(this).find('form').on("submit", function() {
						var
							$q = $(this).find("input[name='q']"),
							val = $.trim($q.val()),
							arr = ["请输入公司名称或关键词", "请输入产品名称"];
						if (val.length == 0 || $.inArray(val, arr) != -1) {
							$q.trigger("focus");
							return false;
						}
					});
					this._SearchSwitch($(this));
				},
				_SearchSwitch: function($parent) {
					var arr = ["请输入产品名称", "请输入公司名称或关键词"];
					var url = ['/placesite/products.html', '/placesite/companys.html']
					var $ch_search = $parent.find('.search_txt');
					var $form = $parent.find('form');
					var $cscId=$('input[name=cscId]')[0];
					$parent.find('.ch_search').on('click', 'a', function() {
						var index = $parent.find('.ch_search').find('a').index(this);
						var $input = '<input type="text" id="search-txt" maxlength="50" autocomplete="off" value="" placeholder="' + arr[index] + '" name="q" class="txt">';
						$(this).addClass('ared').siblings('a').removeClass('ared');
						$form.attr('action', url[index]);
						$ch_search.html($input);
						$ch_search.append($cscId);
						ph.placeholder('#search-txt');
						//window.open(url[index]);
						return false
					});
				}
			});
			$('.g_search').Search();
		},
		/*搜索旁边的登录信息*/
		loginInf:function(){
			var $nologInf=$('.nolog-inf');
			var html='<a class="g-corg log" href="https://login.csc86.com/" >登录</a> | <a class="g-c4" href="http://member.csc86.com/register/phonereg" target="_blank">注册</a>';
			if (isLogin){
				html='<span>Hi</span> '+
					'<a class="g-corg g-e" href="//i.csc86.com" target="_blank">'+username+'</a><br/>'+
					'<a class="g-c4" href="//i.csc86.com" target="_blank">我的会员中心</a>';
				$nologInf.addClass('islog-inf');
				
			}else{
				$nologInf.removeClass('islog-inf');
			}
			$nologInf.html(html);
		},
		/*商铺商品分类*/
		ctgry:function(){
			var $ctgry=$('#ctgry');
			var $data =$('#ctgry').attr('data-shownav');
			if($data==0)
			{
				$ctgry.hover(function(){
					$(this).addClass('ctgry-unfold');
				},function(){
					$(this).removeClass('ctgry-unfold');
				});
			}
			if($ctgry.is(':visible')){
				$('.ctgry-lst li').hover(function(){
					$(this).addClass('hover');
				},function(){
					$(this).removeClass('hover');
				});
			}
			
		},
		/*返回头部*/
		backup:function(){
			var $backUp=$('#backUp');
			
			//初始返回头部按钮是隐藏的，当滚动条滚动到500的时候就显示
			$(window).scroll(function(){
				var top=$(this).scrollTop();
				top>=300?$backUp.fadeIn():$backUp.fadeOut();
			});
			
			//点击返回头部
			$backUp.on('click',function(){
				$('html,body').animate({scrollTop:0},500);
				return false;
			});
		},
		/*图片懒加载(请根据需要像news.js里面那样引入)*/
		lazyload:function(){
			require.async('l/lazyload/1.9.1/jquery.lazyload.js',function(){
				$('img.lazy').lazyload({
					effect : "fadeIn"
				});
			});
		},
		init:function(){
			common.srch();
			common.ctgry();
			common.loginInf();
			common.backup();
		}
	};
	common.init();
	module.exports=common;
	
});