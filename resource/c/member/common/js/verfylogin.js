define(function(require, exports, module) {

    var dialog = require('m/dialog/js/init');//调用弹出框插件

    $.ajaxSetup({//检测ajax错误信息
        error:function (XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest, textStatus, errorThrown)
			if(XMLHttpRequest.responseText =='' || XMLHttpRequest.responseText.indexOf('id="loginName"') > 0){//判断是否登录错误状态
                dialog.alert("登录超时，请重新登录！",function (){
                   location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
                });	
			}
		}
	});
});