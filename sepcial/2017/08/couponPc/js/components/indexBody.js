/*页面公用方法*/
var WEBCommon={
	//获取网址附带参数，如/index.html?ttt=1&yyy=2,则WEBCommon.searchObj()['ttt']=1,为WEBCommon.searchObj()['yyy']=2
	searchObj:function(){
		var searchArr=(location.search==""?[]:location.search.substr(1).split('&'));
		var result=[];
		for(var i=0,len=searchArr.length; i<len; i++){
			result.push(searchArr[i].split('=')[0]+':"'+searchArr[i].split('=')[1]+'"');
		}
		return eval('({'+result.join(',')+'})');
	},
	//获取优惠券相关情形
	getCoupon:function(couponId,callBackFn,errCallbanck){
		var _this=this;
		var params=couponId;
		var dataArr=function(){
				if(_this.searchObj()['city']){
					return {"couponIds":params,city:_this.searchObj()['city']};
				}else{
					return {"couponIds":params};
				}
			}();	
		$.ajax({  
			type : "get",  
			async:false,  
			url : "http://api.csc86.com/couponsdown/index",
			data:dataArr,
			dataType : "jsonp",//数据类型为jsonp  
			jsonp: "callback",//服务端用于接收callback调用的function名的参数  
			success : function(data){  
				callBackFn(data);
			},  
			error:function(){  
				errCallbanck();  
			}  
		}); 
	},
	//判断是否登录
	isLogin:function(callBackFn){
		$.ajax({  
			type : "get",  
			async:false,  
			url : "http://api.csc86.com/member/islogin",  
			dataType : "jsonp",//数据类型为jsonp  
			jsonp: "callback",//服务端用于接收callback调用的function名的参数  
			success : function(data){  
				callBackFn(data);
			},  
			error:function(){  
				alert('fail');  
			}  
		}); 
	}
}
$(document).ready(function(e) {
	WEBCommon.isLogin(function(data){
		if(data.status){
			$("#js-regbtn").hide();
			$("#js-iptUserName").val(data.data.userName);
		}else{
			$("#js-regbtn").css('display','inline-block');
		}
		//console.log("isLoginResult:"+JSON.stringify(data));
	});
	
	/*点击领取优惠券*/
	var isRepeat=true;
    $(document).on('click',"#js-getCouponBtn",function(){
		var _this=$(this);
		if(isRepeat){
			isRepeat=false;
			_this.text('提交中...');
			var couponIdStr=['20170606001','555','533335','44444','44444'];//优惠券ID数组，刘宁修改此处
			WEBCommon.getCoupon(couponIdStr,function(data){
				data.userNickname=$("#js-iptUserName").val();
				var renderHtml = template('tpl-infoCouponBox',data);//渲染模板
				$("#js-couponBagDia").html(renderHtml);
				isRepeat=true;
				_this.text('立即领取优惠券');
				//console.log("ajaxCouponResult:"+JSON.stringify(data));
			},function(){
				isRepeat=true;
				_this.text('立即领取优惠券');
			});
		}
	});
	
	/*关闭弹框*/
	$(document).on('click',".js-closeDialog",function(){
		$("#js-couponBagDia").text('');
	});	
});
