define(function(require, exports, module){
	module.exports = function(){

		$('.cate-dl dd .cat-cont ul li:last-child').css({
			'border-bottom': 'none',
			'margin-bottom': '0',
			'padding-bottom': '0'
		});

		//$('.content-r .tab-inner ul li:last-child').css('margin-right','0');
		
		$('.mod-ind .content .rank ul li:last-child').css('border-bottom','0');
		//$('.server-ext .services ul li:last-child').css('margin-right','0');
		//$('.com-star .com .ctn-r ul li:last-child').css('margin-right','0');
		//$('.team-platform ul li:last-child').css('margin-right','0');

		//楼层右边数据排列
		var a_nums = $('.ind-list a').length;
		if(a_nums != 1) {
			for(var i = 0; i < a_nums-1; i++) {
				$('.ind-list a').eq(i).after('<i>|</i>');
			}
		}
		

		$('.idx-r .tab-sev ul li').each(function(){
			$(this).on('mouseover', function(){
				$(this).addClass('cur').siblings().removeClass('cur');
			});
		});

		//检查是否登录
		$.get("//api.csc86.com/notify/notify",function(data){
			if(data.status==true){
				$(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>'+data.data.purchase+'</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>'+data.data.bank+'</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>'+data.data.message+'</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
			}
		},"jsonp");


		function hover_more(tmp, elem, add, num) {
			var length = arguments.length;
			
			if(length == 3) {
				$th = tmp.index();
				$(add).removeClass('cur');
				$(add).eq($th).addClass('cur');
			}
			$(elem).removeClass('cur');
			tmp.addClass('cur');
		}

		$('.tab-sev-til a').hover(function(){
			hover_more($(this), '.tab-sev-til a', '.sev-til');
		});

		//tab切换
		var tab = require("tab");
		tab($(".hot-supply ol li"),$(".hot-supply .J_autoplay"),"mouseover","cur");
	};
});

