/* 授权设置 */
define(function(require, exports, module) {
	var upload=require('c/member/wslm/smartreply/js/upload'),
		  dialog = require('m/dialog/js/init');
		 // login=require('c/member/common/js/verfylogin');
		
	if($('#fileuploadimg').length>0){
		  $('#fileuploadimg').fileupload({
				dataType: 'json',
				maxFileSize: 2000000,//文件最大2MB
				done:function (e,data) {
					var $img = $("img.uphead");
					if(data.result.status==true){
						$img.attr("src","/temp/"+data.result.data.fileName);
						$img.siblings("input[name='fileName']").attr("value",data.result.data.fileName);
					}else{
						dialog.tip(data.result.msg,1.5);
					}
				}
		});
	}
	
	//接口回调状态
	function startdata(tmp,fun){
		if(tmp.status==true){
			dialog.success(tmp.msg,1.5);
			fun();
		}else{
			dialog.tip(tmp.msg,1.5);
		}
	}
	
	//修改个人信息
	var $homeForm = $('form[data-type="home-read"]');
	$homeForm.bind('submit', function(event){
		event.preventDefault();
		$.post(window.location.href,$homeForm.serializeArray(),function(data){
			startdata(data,function(){
				window.location.reload()
			});
		},"json");
		return false;
	});

});

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
				$btn.unbind('click');
				$.post('',{'ac':inputval},function(response){
					if(response.status){
						csc.useDialog(function(){ csc.success(response.msg) });
						$id.find('input[name="ac"]').removeAttr("disabled")
						$btn.bind('click',submitradio);
					}else{
						csc.useDialog(function(){csc.error(response.msg);});
						$id.find('input[name="ac"]').removeAttr("disabled")
						$btn.bind('click',submitradio);
					}
				},'json')
			}else{
				var appid = veryfyInput($appid) , appsecret = veryfyInput($appsecret) , appidval = $appid.val() , appsecretval = $appsecret.val() ;
				if(!appid || !appsecret){ return false };
				$id.find('input[name="ac"]').attr("disabled","disabled");
				$btn.unbind('click');
				$.post('',{'ac':inputval,'appId':appidval,'appSecret':appsecretval},function(response){
					if(response.status){
						csc.useDialog(function(){ csc.success(response.msg) });
						$id.find('input[name="ac"]').removeAttr("disabled");
						$btn.bind('click',submitradio);
					}else{
						csc.useDialog(function(){csc.error(response.msg);});
						$id.find('input[name="ac"]').removeAttr("disabled")
						$btn.bind('click',submitradio);
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