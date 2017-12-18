/*自动绑定页面*/
define(function(require, exports, module) {

function veryfyInput(inputdom){//验证是否为空
	var $inputdom = $(inputdom), inpuval = $.trim($inputdom.val());

	if (!inpuval){
		$inputdom.siblings('font.erro').remove();
		$inputdom.parent().append('<font class="erro c-red">不能为空</font>');
		return false;
	}else{ $inputdom.siblings('font.erro').remove(); return true; }
}

function submitAutoBind(submitbtn,account,password){
	var $submitbtn = $(submitbtn) , $account = $(account) , $password = $(password) , autopost = function autoPost(){
		var veryfyaccount = veryfyInput($account), veryfypassword = veryfyInput($password), account = $.trim($account.val()) , password = $password.val();
		if(veryfyaccount && veryfypassword){
			$submitbtn.unbind('click').val('正在绑定中');
			$.ajax({
			　　url:'',
			　　timeout : 60000,
			　　type : 'post',
			　　data :{'username':account,'password':password},
			　　dataType:'json',
			　　success:function(response){
					if(response.status){
						window.location.href = response.data['redirectUrl'];
					}else{
						csc.useDialog(function(){csc.error(response.msg);});
						$account.val('');$password.val('');
						$submitbtn.bind('click',autopost).val('智能绑定');
					}
				},
				error:function (XMLHttpRequest, textStatus, errorThrown){
					if(textStatus=='timeout'){
			 			csc.useDialog(function(){csc.error('请求超时，请稍候重试！');});
			 			$account.val('');$password.val('');
						$submitbtn.bind('click',autopost).val('智能绑定');
			　　　　}else if(XMLHttpRequest.responseText =='' || XMLHttpRequest.responseText.indexOf('id="loginName"') > 0){//判断是否登录错误状态
						csc.useDialog(function(){
							csc.alert("登录超时，请重新登录！",function (){
			                   location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
			                });
						})
					}
			}
			});
		}
	}
	$account.bind('blur',function(){veryfyInput($account)});
	$password.bind('blur',function(){veryfyInput($password)});
	$submitbtn.bind('click',autopost);
}

$(function(){
	submitAutoBind('#submitBtn','#account','#password');
});

});