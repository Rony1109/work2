/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('jquery');
	require('dialog');
	var placeholder=require('placeholder');
	var valid=require('./valid');
	
	/*解决ie下占位符不兼容问题*/
	placeholder.placeholder('#jkYt','#cecece');
	var jkYt=$('.jsCnsltForm').find('#jkYt'),
		iptTxt=$('.jsCnsltForm').find('input[type=text]');
	
	/*表单失去焦点时验证*/	
	valid.validInput(jkYt,$('.jsJkytTip'));
	iptTxt.each(function(){
		var _this=$(this);
		var validObj=null;
		if(_this.attr('id')=='jkJe'){
			validObj=$('.jsJkJeTip');
		}
		if(_this.attr('id')=='zhouQi'){
			validObj=$('.jsZhouQiTip');
		}
		valid.validInput(_this,validObj);
	});
	/*提交表单*/
	$.ajaxSetup({
		error:function (XMLHttpRequest, textStatus, errorThrown){
			if(XMLHttpRequest.responseText =='' || XMLHttpRequest.responseText.indexOf('id="loginName"') > 0){
				artDialog.alert("登录超时，请重新登录！",function (){
					artDialog.close();
				});
			}
		}
	});
	$('.jsCnsltForm').submit(function(){

		var _form=$(this),
			_smtBtn=_form.find('input[type=submit]'),
			arry1=[],
			arry2=[];
		arry1.push(valid.validNull(jkYt,$('.jsJkytTip')));
		iptTxt.each(function(){
			var _this=$(this);
			var validObj=null;
			if(_this.attr('id')=='jkJe'){
				validObj=$('.jsJkJeTip');
			}
			if(_this.attr('id')=='zhouQi'){
				validObj=$('.jsZhouQiTip');
			}
			arry2.push(valid.validNull(_this,validObj));
		});
		if($.inArray(false,arry1)>=0||$.inArray(false,arry2)>=0){
			return false;
		}
		_smtBtn.val('正在提交中...').attr('disabled',"disabled").css('cursor','default');
		var pid = $(window.parent.document).find("input[name='product_id']").val();
		$("body").find("input[name='product_id']").val(pid);
		$.post(_form.attr('action'),_form.serializeArray(), function(data) {
			if (data.result=="Y") {
				artDialog.tip('提交成功<br/>谢谢您的关注，银行客户经理会在72小时内联系您，<br/>请保持手机畅通！',3,function(){
					window.top.location.reload();
				});
			} else {
				var desc = data.desc; if(desc=="" || desc == null){ desc = "提交失败，请重新填写提交！"; }
				artDialog.tip(desc);
				_smtBtn.val('提交').removeAttr("disabled").css('cursor','pointer');
				return false;
			}
		}, "json");
		return false;
	});	
	

	
});