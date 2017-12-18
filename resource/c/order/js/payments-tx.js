define(function(require, exports, module) {
	var isSubmit=false;
	var dialog=require('dialog');
	require('newtop');
	require('//res.csc86.com/v2/c/order/css/payments-tx.css');
	
	var $sroll=$('.sroll');
	
	var tipHtml='<form class="txzfFrm" action="https://i.csc86.com/pay/orderPay" method="post">\
   				<table class="txzftable" cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="185">\
				<col>\
				</colgroup>\
				<tbody>\
                <tr>\
				<td class="left top first">银行卡信息：</td>\
				<td class="right first">刘大爷<p>中国建设银行 尾号3689</p></td>\
				</tr>\
				<tr>\
				<td class="left top">提现金额：</td>\
				<td class="right"><span class="s3">125.32</span><span class="s4">元</span></td>\
				</tr>\
				<tr>\
				<td class="left top">交易密码：</td>\
				<td class="right"><input value="" placeholder="输入交易密码"><span class="s2"><a href=#>忘记密码?</a></span></td>\
				</tr>\
                <tr>\
                <td class="left top"></td>\
				<td class="left center tl"><a href="#" class="red-abtn pt1">确认提现</a><span class="s1">返回修改</span></td>\
				</tr>\
				</tbody>\
				</table>\
                </form>';
				var dg=dialog({
					id:'payFail',
					title:"确认提现",
					content:tipHtml,
					padding:0,
					fixed:true,
					lock:true,
					opacity:0.5,
					init:function(){
						$('.aui_state_lock').addClass('paymentszf');
						//取消
						$('.jsCancel').on('click',function(){
							dg.close();
							return false;
						});
						
						//重新支付
						$('.jsRePay').on('click',function(){
							$('.jsPaySmt').trigger('click');
							return false;
						});
					}
				});
	//确认支付
	$('.jsPaySmt').on('click',function(){
		var $this=$(this);
		var $form=$this.parents('.jstxFrm');
		var $datapay=$this.data('pay');
		if(!$datapay){
			dialog.tip('请选择支付方式！',2);
			return false;
		}
		//console.log(isSubmit);
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		$.post($form.attr('action'),$form.serializeArray(),function(data){
			if(data.status==="200"){
				//document.write(data.data);
				$(document.body).html(data.data);
			}
			else{
				var tipHtml='<div class="payment-fail-pop"><div class="bd">您的支付请求提交失败</div><div class="ft"><a class="repay-btn jsRePay" href="">重新支付</a><a class="cancel-btn jsCancel" href="">取消</a></div></div>';
				var dg=dialog({
					id:'payFail',
					title:"提交支付",
					content:tipHtml,
					padding:0,
					fixed:true,
					lock:true,
					opacity:0.2,
					init:function(){
						//取消
						$('.aui_state_lock').addClass('paymentszf');
						$('.jsCancel').on('click',function(){
							dg.close();
							return false;
						});
						
						//重新支付
						$('.jsRePay').on('click',function(){
							$('.jsPaySmt').trigger('click');
							return false;
						});
					},
					width:366,
					height:196
				});
			}
			isSubmit=false;
		},'jsonp');
		return false;
	});
});