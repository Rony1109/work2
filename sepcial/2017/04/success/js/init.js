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
		'index':'c2/newcgsc/js/index.js?v=161104'
    },
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	$(function(){
		require('top');
		require('header');
		require('jquery');
		require('placeholder');
		require('index');
		var dialog=require('dialog');
		var bg={};
		var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');//加载登录接口
		<!-- 弹窗功能判断 -->
		bg.dialogs=function(circleId,type,ele){
			dialog({
				id: circleId,
				title:'',
				fixed: true,
				//lock:true,
				background:"black",
				opacity:0.3,
				content:type?$("#"+circleId).html() : ele,
				init:function(){
					$(".confirm").on('click',function(){
						if($(".address").val() == ""){
							alert("公司全称不能为空！");
							return;
						}
						if($(".person").val() == ""){
							alert("联系人不能为空！");
							return;
						}
						if($(".phone").val() == ""){
							alert("联系方式不能为空！");
							return;
						}
						var datas=$(this).parent().serializeArray();
						$.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
							if(data.status==true){
								bg.dialogs('confirm-sub',true,null);
							}else{
								alert("数据发送异常，请刷新页面后重试！");
							}
						}, 'jsonp');

					})
				}
			});
		};
		$(".btn-vedio").add(".btn-vedio-other").on("click",function(){
			bg.dialogs('vedio',true,null);
		});
		$(".sign-right").on("click",function(){
			if (!isLogin.status){
				bg.dialogs('no-login',true,null);
			} else{
				bg.dialogs('register',true,null);
			}
		})

	});

	$('.hover-par ul li').hover(function(){ //移入移除
		$(".hover-son ul").hide().eq($(this).index()).show()
	},function(){
		$(".hover-son ul").hide().eq(0).show()
	});


	//左右轮播
	var $prev = $(".bo_btn_pr"),
		$next = $(".bo_btn_ne");
	function lrScroll(tag,un,time){
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
	};
	$next.on("click",function(){
		lrScroll(".wqzt",1,500);
	});

	$prev.on("click",function(){
		lrScroll(".wqzt",2,500);
	})


	$('.wqzt').hover(function(){ //移入移除
		$next.css("background-position","-155px -125px");
		$prev.css("background-position","-5px -125px")
	},function(){
		$next.css("background-position","-155px 0px");
		$prev.css("background-position","-5px 0px")
	});


	$(function() {//返回顶部
		$(".btn_top").on("click",function(){
			$('html, body').animate({scrollTop: 0},300);return false;
		})
	})
	function scroll(){
		var $scroll=$(window).scrollTop();
		var $banner=$(".banner-new").outerHeight();
		var $nav=$(".nav-son");
		if($scroll>=$banner){
			$nav.css({
				position:"fixed",
				top:0,
				left:0,
				right:0,
				zIndex:999
			})
		}else{
			$nav.css({
				position:"relative",
				top:0,
				left:0,
				right:0,
				zIndex:999
			})
		}

	}
	$(window).on('scroll resize',scroll);
	scroll()
});


