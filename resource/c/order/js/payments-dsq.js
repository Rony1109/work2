define(function(require, exports, module) {
	var dialog=require('dialog');	
	//require('top');
	require('newtop');
		
	//支付
	var payhost = location.host;
	var paydsq = function(){
		var $form = $('.jsPymntFrm');
		var $formoption = $form.serializeArray();
		$.post('https://i.csc86.com/B2BPay/checkPayStatus',$formoption,function(data){
			if(data.status=="0"){
			location.href='https://'+payhost+'/B2BPay/toPayResultPage?status=1&'+$formoption[0].name+'='+$formoption[0].value;
			clearInterval(dsqgo);
			}
		},'jsonp');
			$("head").find("script").eq(0).remove();
				
		}
var dsqgo = setInterval(paydsq,2000);
	});
