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
		'dialog':'m/dialog/js/init.js'
    },
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	$(function(){
		require('top');
		require('header');
		require('jquery');
		var dialog=require('dialog');
		var bg={}
		<!-- 弹窗功能判断 -->
		bg.dialogs=function(circleId,type,ele,content){
			dialog({
				id: circleId,
				title:'',
				//fixed: true,
				//lock:true,
				//background:"black",
				//opacity:0.3,
				content:type?$("."+circleId).html() : ele,
				init:function(){
					$(".achiement").html(content)
					$(".confirm").on('click',function(){
						if($(".person").val() == ""){
							alert("联系人不能为空！");
							return;
						}
						if($(".phone").val() == ""){
							alert("联系方式不能为空！");
							return;
						}
						if($(".address").val() == ""){
							alert("联系地址不能为空");
							return;
						}
						$.get('http://api.csc86.com/newestlottery/WriteMemallContact', {"huodid":11,"linkman":$(".person").val(),"phone":$(".phone").val(),"address":$(".address").val()}, function(data) {
                            alert(data.msg)
						}, 'jsonp');
					})
				}
			});
		}
		$("body").delegate(".coupon","click",function(){<!--领取优惠券功能-->
			//debugger;
			var couponId=$(this).data("id");
			$.ajax({
				url: '//api.csc86.com/Couponscg/index?couponId='+couponId,
				dataType: 'jsonp',
				type: 'get',
				success: function(dataMsg) {
					if (dataMsg.status) {
						switch (dataMsg.data.Code) {
							case "1"://领取成功
								bg.dialogs('success',true,null,null);
								break;
							case "2"://接口异常
								bg.dialogs('wrong',true,null,null);
								break;
							case "3"://无领取资格
								bg.dialogs('no_certificate',true,null,null);
								break;
							default://领取失败
								bg.dialogs('null',false, "<h2 class='fo_sz_1  li_hg_0 te_al_c fon_w_n pd-16 fon_c_9 bg-img-9 mg-au wh-24'>"+dataMsg.data.Msg+"</h2>",null);
								break;
						}
					}else{
						bg.dialogs('no_login',true,null,null);
					}
				}
			})
		});
		//获取中奖名单
		function draw_image(url,data){
			$.ajax({
				url: url,
				dataType: 'jsonp',
				type: 'get',
				data:data,
				success:function(data) {
                if(data.status){
					var str="";
					for(var i in data.data){
						str+=
					      "<span class='block fon_c_7 fo_sz_2 li_hg_0 li_hg_2 no_wrap'>"+
							"<em >"+data.data[i].account+"</em>"+
							"<em class='mg-lt-2'>"+data.data[i].awards+"</em>"+
							"</span>"
					}
					$(".o-flow").html(str)
				}
				}
			})
		}
		draw_image('http://api.csc86.com/newestlottery/getHit',{"huodid":11});

     function active_all(url,data){//抽奖功能
		 $.ajax({
			 url: url,
			 dataType: 'jsonp',
			 type: 'get',
			 data:data,
			 success: function(dataMsg) {
				 if (dataMsg.status) {
					 bg.dialogs('active_success',true,null,dataMsg.msg);
				 }else{
					 switch (dataMsg.No) {
						 case -1:
							 bg.dialogs('no_login_active',true,null,null);//没有登录
							 break;
						 case -1000:
							 bg.dialogs('no_success',true,null,null);
							 break;
						 default://其余抽奖情况
							 bg.dialogs('null',false, "<h2 class='fo_sz_1  li_hg_0 te_al_c fon_w_n pd-16 fon_c_9 bg-img-9 mg-au wh-24'>"+dataMsg.msg+"</h2>",null);
							 break;
					 }

				 }
			 }
		 })
	 }
	$(".active-all").click(function(){
		active_all("http://api.csc86.com/newestlottery/orderMemallDraw",{"huodid":11})
		})
	});

	$('.code').hover(function(){ //移入移除
		var pars=$(this).parentsUntil('.code-imgOp');
		pars.eq(pars.length -1).find("img.product").removeClass("visible").addClass("hide");
		pars.eq(pars.length -1).find("img.code-img").removeClass("hide").addClass("visible");
	},function(){
		var pars=$(this).parentsUntil('.code-imgOp');
		pars.eq(pars.length -1).find("img.product").removeClass("hide").addClass("visible");
		pars.eq(pars.length -1).find("img.code-img").removeClass("visible").addClass("hide");
	});

	$('.main2').css('left',-($(".main2").outerWidth()));
	$('.main').click(function(){
			$(this).animate({left:-($(this).outerWidth())},500,function(){
				$('.main2').animate({left:'0'},500);
			});
			$('.bar').click(function(){
				$(this).parents(".main2").animate({left:-($(".main2").outerWidth())},500,function(){
					$('.main').animate({left:'0'},500)
				});
			})
	});
});
