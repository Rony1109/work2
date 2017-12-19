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
		'dialog':'m/dialog/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    var dialog=require('dialog');
	var bg={}
	<!-- 弹窗功能判断 -->
	bg.dialogs=function(circleId){
	  dialog({
		   id: circleId,
		   title:'',
		   fixed: true,
		   lock:true,
		   background:"#f1f1f1",
		   opacity:0.3,
		   content:$("#"+circleId).html()

      });
    }
	
	<!--判断用户是否注册 -->	
	    
		$("body").delegate(".coupon","click",function(){
			var couponId=$(this).data("id");
			var params=couponId.split(",");
			debugger;
			 $.ajax({
			url: 'http://api.csc86.com/couponswj',
		 	data:{"couponIds":params},
			dataType: 'jsonp',
			type: 'get',

			success: function(dataMsg) {
				console.log(dataMsg)
			   if (dataMsg.status) {
				   switch (dataMsg.data.Code) {
					   case "1"://领取成功
						   bg.dialogs('no_success');
						   break;
					   case "2"://接口异常
						   bg.dialogs('wrong');
						   break;
					   case "3"://无领取资格
						   bg.dialogs('no_certificate');
						   break;
					   default://领取失败
						   bg.dialogs('no_success');
						   break;
				   }
			   }else{
				   bg.dialogs('no_login');
				}
			 }
		  })	
	});
	exports.module=bg;
});
