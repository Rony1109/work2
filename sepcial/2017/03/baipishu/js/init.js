/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */
seajs.config({
	// 别名配置
	alias: {
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js',
		'login':'c2/ucenter/js/login.js'
	},
	// Sea.js 的基础路径
	base: 'http://res.csc86.com/v2/'
});
define(function(require, exports, module) {
	$(function(){
		var login=require('login');
		function tab(btn,show){
			$(btn).on('click', function (event) {//tab函数
				$(btn).eq($(this).index()).addClass("sh_active").siblings().removeClass('sh_active');
				$(show).hide().eq($(this).index()).show();
			})
		}
		tab(".aside-nav li",".tab");

		function jump_page(ele,goal){
           $(ele).on("click",function(){
				   $.get("//login.csc86.com/islogin/ajax",function (data){
					   if(data.status){
						   window.location.href=goal
					   }else{
						   //当页面一进来未登录时 显示弹窗登录页面（下面的代码为登录后不刷新页面的情况）
						    login.showPop({
						        isPop:true,
						        isrefresh:false,
						        callback:function(data){
									window.location.href=goal
						        }
						    });

					   }
				   },"jsonp");
		   })
		}
		jump_page(".content span.index-thumb","index-thumb.html");
		jump_page(".content span.version","version.html");
		jump_page(".content span.first","first.html");
		jump_page(".content span.second","second.html");
		jump_page(".content span.third","third.html");
		jump_page(".content span.fourth","fourth.html");
		jump_page(".content span.fifth","fifth.html");
	});
});
