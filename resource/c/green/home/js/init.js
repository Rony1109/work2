define(function(require, exports, module) {
    require('c/green/common/js/init');
	var slide = require('slide');
	new slide(".J-slide ul",".J-slide ul>li",{
		slideWidth: 560,
		slideHeight:350, 
		slideDirection: 0,
		slides_xssm:1,
		slideSeries:1,
		zantin: true,
		slides_auto_span : 6000,
		slideButs : '.J-slide>ol', //切换按钮容器，样式自定义
		slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj : "mouseover",
		slideButs_selectclass : "cur",
		slides_controller: '.J-slide>ol',
		slides_fun:slide.definedfun
	});


	$('.J_hover').find('li').each(function(){
		$(this).on('mouseover', function(){
			$(this).addClass('cur').siblings('li').removeClass('cur');
		});
	});


	//tab切换
		var tab = require("tab");
		tab($(".list-tab-nav li"),$(".list-tab-box"),"mouseover","cur");
		tab($(".tab-nav  li"),$(".hot-products"),"mouseover","hover");
		tab('.tab-sev-til a', '.sev-til', 'mouseover',"cur");
		tab('.hq-nav li', '.hq-con','mouseover',"cur");
		//图片滚动
		require('c/green/common/js/scroll')();
		var times;
		$(".bp-product").CscScroll({
			Left:496,
			Right:248,
			/*Time:1000,*/
			linedUp:times,
			Auto:false,
			Visual:1
		});
		$(".bp-product").hover(function(){
			$(this).find(".ctr-l").show();
			$(this).find(".ctr-r").show();
		},function(){
			$(this).find(".ctr-l").hide();
			$(this).find(".ctr-r").hide();
		})
		var tm;
		$(".imgScroll3").CscScroll({
			Left:392,
			Right:196,
			Time:2000,
			linedUp:tm,
			Auto:true,
			Visual:5  
		});
		var tm1;
		$(".imgScroll").CscScroll({
			Left:392,
			Right:196,
			Time:2000,
			linedUp:tm1,
			Auto:true,
			Visual:5  
		});
		var tm2;
		$(".imgScroll1").CscScroll({
			Left:392,
			Right:196,
			Time:2000,
			linedUp:tm2,
			Auto:true,
			Visual:5  
		});
		$(".ctr-l").hover(function(){
			$(this).addClass("ctr-on");
		},function(){
			$(this).removeClass("ctr-on");
		});
		$(".ctr-r").hover(function(){
			$(this).addClass("ctr-on");
		},function(){
			$(this).removeClass("ctr-on");
		})
		//登录状态
		$.ajax({
			url: '//api.csc86.com/notify/notify',
			dataType: 'jsonp',
			type: 'get',
			success: function(data){
				if(data.status) {
					$(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>'+data.data.purchase+'</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>'+data.data.bank+'</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>'+data.data.message+'</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
					$(".log-mess").show();
					$(".log-reg").hide();
				}
			}
		});

});
