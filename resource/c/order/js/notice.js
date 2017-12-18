//支付页面临时通告

define(function(require, exports, module) {
	var notice = {
		payCon:'<div class="notice">\
			<div class="pingan">\
        	<h2>温馨提示</h2>\
        	<span class="dear">尊敬的用户：</span>\
        	<p class="explain">由于银行系统在10-14 12:00~10-17 00:00进行维护升级，在此期间，个人银行支付和企业银行支付将暂停使用，请使用微信和支付宝进行支付，对您造成不便，敬请谅解！</p>\
        	<span class="close">我知道了</span>\
      		</div>\
    		</div>',
		walletCon:'<div class="notice">\
			<div class="pingan">\
        	<h2>温馨提示</h2>\
        	<span class="dear">尊敬的用户：</span>\
        	<p class="explain">由于银行系统在10-14 12:00~10-17 00:00进行维护升级，在此期间，钱包的提现等功能将暂停使用，金额的显示也会存在滞后，对您造成不便，敬请谅解！</p>\
        	<span class="close">我知道了</span>\
      		</div>\
    		</div>',
		pinganBank:function(content){
    		$('body').append(content);
    		const endTime = new Date(2016,9,17,00,00,00);
			var startTime = new Date(),
				deadTime = endTime.getTime() - startTime.getTime(),
				container = $('.notice'),
		 		close = $('.pingan').find('.close'),
		 		cWidth = container.innerWidth(),
		 		cHeight = container.innerHeight(),
		 		//获取页面的宽度,可是区域的高度
		 		sWidth = $(document).width(),
		 		sHeight = $(window).height(),
		 		autoWidth = (sWidth - cWidth)/2 + "px",
		 		autoHeight = (sHeight- cHeight)/2 + "px";
		 		//alert(autoWidth)
		 	container.css({"position": "fixed", "left": autoWidth, "top": autoHeight});
		 	close.on("click",function(){
		 		container.fadeOut(500);
		 	});

		 	//超过规定时间，通告自动消失
		 	if(deadTime <= 0){
		 		container.fadeOut();
		 	}else{
		 		container.fadeIn();
		 	}
		}
	}
	module.exports = notice;
})
