/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */
define(function(require, exports, module) {
	$(function(){
		var dialog=require('./layer.js');
		var bg={}
		<!-- 弹窗功能判断 -->
		bg.dialogs=function(circleId,type,ele,content) {
			dialog.open({
				content:type?$("."+circleId).html() : ele,
				skin: 'msg',
				success: function(elem){
					var This=$(elem);
					This.find(".close").on("click",function(){
						layer.closeAll()
					})
					if(This.find(".confirm")){
						This.find(".achiement").html(content);
						This.find(".confirm").on('click',function(){
							if(This.find(".person").val()==""){
								alert("联系人不能为空！");
								return;
							}else if(This.find(".phone").val()==""){
								alert("联系方式不能为空！");
								return;
							}else if(This.find(".address").val()==""){
								alert("联系地址不能为空");
								return;
							}else{$.get('http://api.csc86.com/newestlottery/WriteMemallContact', {"huodid":11,"linkman":$(".person").val(),"phone":$(".phone").val(),"address":$(".address").val()}, function(data) {
								alert(data.msg);
								layer.closeAll()
							}, 'jsonp');
							}
						})
					}
				}
			});
		}
		$(".coupon").on("click",function(){<!--领取优惠券功能-->
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
								bg.dialogs('null',false, "<h2 class='fo_sz_7  li_hg_0 te_al_c fon_w_n pd-16 fon_c_9 bg-img-9 mg-au wh-24'>"+dataMsg.data.Msg+"<img src='con_img/dialog-2.png' alt='' class='po_a  tp_1 rg_1 close' /></h2>",null);
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
								"<li class='fl wh_5 fon_c_4 li_hg_1'>"+"<em class='wh_5 mg-au block te_al_r'>"+data.data[i].account+"</em>"+"</li>"+
								"<li class='fl wh_5 fon_c_4 li_hg_1'>"+"<em class='wh_5 mg-au block te_al_l no_wrap'>"+data.data[i].awards+"</em>"+"</li>"
						}
						$(".ov-fl").html(str)
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
								bg.dialogs('null',false, "<h2 class='fo_sz_7  li_hg_0 te_al_c fon_w_n pd-16 fon_c_9 bg-img-9 mg-au wh-24'>"+dataMsg.msg+"<img src='con_img/dialog-2.png' alt='' class='po_a  tp_1 rg_1 close'/></h2>",null);
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
});
