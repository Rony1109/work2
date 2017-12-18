define(function(require, exports, module) {
	require('newtop');
	var status={
		jump:function(count,show,url,obj){//倒计时跳转
			obj=obj?obj:null;
			setInterval(function(){               
				if(count<0){
					if(url==="-1"){//返回上一页
						window.history.go(-1);
					}else{
						location.href = url;
					}
				    return false;
				}
				if(obj&&show){
					obj.html(count);
				}
				count--;
            },1000);
		}	
	};
	
	//提交订单成功2秒倒计时
	if($('.status')[0]){
		var host = location.host;
		var $ulr = $('.status').find('input[type=hidden][name=returnurl]').val();
		var payUrl='https://'+host+'/'+$ulr;
		status.jump(5,true,payUrl,$('.status em'));
	}
	
});