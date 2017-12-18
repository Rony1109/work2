/*自动绑定页面*/

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
			　　timeout : 60000,
			　　type : 'post',
			　　data :{'username':account,'password':password},
			　　dataType:'json',
			　　success:function(response){
					if(response.status){
						window.location.href = response.data['redirectUrl'];
					}else{
						artDialog({title:false,id:'cscerror',time:5,content:response.msg,fixed:true,icon:_ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',ok:true});
						$account.val('');$password.val('');
						$submitbtn.bind('click',autopost).val('智能绑定');
					}
				},
				error:function (XMLHttpRequest, textStatus, errorThrown){
					if(textStatus=='timeout'){
						artDialog({title:false,id:'cscerror',time:3,content:'请求超时，请稍候重试！',fixed:true,icon:_ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',ok:true});
			 			$account.val('');$password.val('');
						$submitbtn.bind('click',autopost).val('智能绑定');
			　　　　}else if(textStatus=='error'){
						artDialog({title:false,id:'cscerror',time:3,content:'请求出错，请刷新后重试！',fixed:true,icon:_ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',ok:true});
			 			$account.val('');$password.val('');
						$submitbtn.bind('click',autopost).val('智能绑定');
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
})