/* 授权设置 */

function veryfyInput(inputdom){//验证是否为空
	var $inputdom = $(inputdom), inpuval = $.trim($inputdom.val());

	if (!inpuval){
		$inputdom.siblings('font.erro').remove();
		$inputdom.parent().append('<font class="erro c-red">不能为空</font>');
		return false;
	}else{ $inputdom.siblings('font.erro').remove(); return true; }
}

function radioType(id,inputapp){
	var $id = $(id) , $inputapp = $(inputapp);
	$id.find('input[name="ac"]').bind('click',function(){
		var $this = $(this);
		if($this.val() == 1){
			$inputapp.hide();
		}else{$inputapp.show();}
	})
}

function submitApp(id,btn,appid,appsecret){
	var $id = $(id) , $btn = $(btn) , $appid = $(appid) , $appsecret = $(appsecret) ,
		l = $id.find('input[name="ac"]:checked').length ,
		submitradio = function(){
			var inputval = $id.find('input:checked').val();
			if(inputval == 1){
				$id.find('input[name="ac"]').attr("disabled","disabled");
				$btn.unbind('click').val('设置中...');
				$.post('/member/default/empower',{'ac':inputval},function(response){
					if(response.status){
						csc.useDialog(function(){ csc.success(response.msg) });
						$id.find('input[name="ac"]').removeAttr("disabled")
						$btn.bind('click',submitradio).val('保存设置');
					}else{
						csc.useDialog(function(){csc.error(response.msg);});
						$id.find('input[name="ac"]').removeAttr("disabled")
						$btn.bind('click',submitradio).val('保存设置');
					}
				},'json')
			}else{
				var appid = veryfyInput($appid) , appsecret = veryfyInput($appsecret) , appidval = $appid.val() , appsecretval = $appsecret.val() ;
				if(!appid || !appsecret){ return false };
				$id.find('input[name="ac"]').attr("disabled","disabled");
				$btn.unbind('click').val('设置中...');
				$.post('/member/default/empower',{'ac':inputval,'appId':appidval,'appSecret':appsecretval},function(response){
					if(response.status){
						csc.useDialog(function(){ csc.success(response.msg) });
						$id.find('input[name="ac"]').removeAttr("disabled");
						$btn.bind('click',submitradio).val('保存设置');
					}else{
						csc.useDialog(function(){csc.error(response.msg);});
						$id.find('input[name="ac"]').removeAttr("disabled")
						$btn.bind('click',submitradio).val('保存设置');
					}
				},'json')
			}
		};

	$appid.bind('blur',function(){veryfyInput($appid)});
	$appsecret.bind('blur',function(){veryfyInput($appsecret)});
	$btn.bind('click',submitradio);

}

$(function(){
	radioType('#radioType','#inputApp');
	submitApp('#radioType','#submitApp','#appId','#appSecret');
})