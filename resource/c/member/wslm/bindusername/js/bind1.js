/*手动绑定 */
define(function(require, exports, module) {
	
function veryfyInput(inputdom){//验证是否为空
	var $inputdom = $(inputdom), inpuval = $.trim($inputdom.val());

	if (!inpuval){
		$inputdom.siblings('font.erro').remove();
		$inputdom.parent().append('<font class="erro c-red">不能为空</font>');
		return false;
	}else{ $inputdom.siblings('font.erro').remove(); return true; }
}

function submitAutoBind(account,openid,agreement){
	var accountval = veryfyInput(account), openidval = veryfyInput(openid) , agreement = Checked(agreement);
	if(!accountval || !openidval || !agreement){
		return false;
	};
}


function Checked(agreement){
	var $agreement = $(agreement);
	if($agreement.attr('checked')){
		$agreement.siblings('font.erro').remove();		
		console.log($agreement.attr('checked'))
		return true;
	}else{
		$agreement.siblings('font.erro').remove();
		$agreement.parent().append('<font class="erro c-red m-l-20">必须同意协议</font>');
		console.log($agreement.attr('checked'))
		return false;
	}
}

function Agreement(html){
	var html = $(html).html();
	csc.useDialog(function(){
		art.dialog({
			padding:'15px 20px 5px',
			title: false,
			lock:true,
			okVal:'同意并接受协议',
			ok:function(){},
			content:html
		});
	});
}

$(function(){
	$('#account').bind('blur',function(){veryfyInput('#account')});
	$('#openId').bind('blur',function(){veryfyInput('#openId')});
});
});