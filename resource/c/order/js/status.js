/*购物车为空时、提交订单成功与失败、支付成功与失败*/
define(function(require, exports, module) {
	//require('top');
	require('newtop');
	var curHref=location.href;
	var orderNo=$('input[type=hidden][name=orderNo]').val()||'';//订单号
	var payMoney=$('input[type=hidden][name=payMoney]').val()||'';//订单总额
	var status={
		jump:function(count,show,url,obj){//倒计时跳转
			obj=obj?obj:null;
			var go=setInterval(function(){
				if(count<0){
					if(url==="-1"){//返回上一页
						window.history.go(-1);
					}else{
						location.href = url;
					}
					clearInterval(go);
				    return false;
				}
				if(obj&&show){
					obj.html(count);
				}
				count--;
            },1000);
		}	
	};

	//针对提交订单成功页
	if(curHref.indexOf('orderPay')>0&&orderNo){
		cscga('create', 'SU-10001-1', 'auto','smtOrderSuc');
		cscga('smtOrderSuc.require', 'cscplugin',{
			orderId:orderNo,
			payMoney:payMoney,
			eventAction:'submitOrderSuccess'
		});
		cscga('smtOrderSuc.cscplugin:smtOrderSucInit');
	}

	//提交订单成功2秒倒计时
	if($('.jsSmtSucTime em')[0]){
		var payUrl="//i.csc86.com/pay/doPaymemt?orderNo="+orderNo+"&payMoney="+payMoney;
		status.jump(2,true,payUrl,$('.jsSmtSucTime em'));
	}

	if(location.pathname.indexOf("toPayResultPage")>=0){
		cscga('create', 'SU-10001-1', 'auto','PayResult');
		cscga('PayResult.require', 'cscplugin');
		cscga('PayResult.cscplugin:PayResultInit');
	}
	//提交订单失败2秒倒计时
	if($('.jsSmtFailTime')[0]){
		var smtOrderUrl="-1";
		status.jump(2,false,smtOrderUrl,$('.jsSmtFailTime'));
	}
	
});