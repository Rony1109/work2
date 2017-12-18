define(function(require, exports, module){
	require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');
	var $dialog=require('dialog');
	var setMdl=require('./init.js');
		
	/*数据展示方式*/
	setMdl.setDataShowType($('.setbnnr-bd'));
	
	//上传logo
	setMdl.upload($('.jsLogoUpld'),function(e,data){
		var result = data.result;
		if(result.status){
			$('.jsLogoPic img').attr('src',result.filePath);
			$('.jsLogoUrl').val(result.fileName);
		}else{
			result.msg==""?$dialog.tip("上传失败，请重新上传！"):$dialog.tip(result.msg);
		}
	});
	
	//上传店招图片
	(function(){
		var _jsPicUpld=$('.jsPicUpld');
		var _iptTxt=_jsPicUpld.parents('.upld-box').find('.ipt-txt[type=text]');
		setMdl.upload($('.jsPicUpld'),function(e,data){
			var result = data.result;
			if(result.status){
				_iptTxt.val(result.fileName);
			}else{
				result.msg==""?$dialog.tip("上传失败，请重新上传！"):$dialog.tip(result.msg);
			}
		});
	})();
	
	//删除图片
	setMdl.picDel();
	
	//上传图片大小提示
	(function(){
		var _jsBnnrBox=$('.jsBnnrBox',window.top.document);
		var _jsBnnrSize=$('.jsBnnrSize');
		_jsBnnrSize.find('.w').html(_jsBnnrBox.attr('data-width'));
		_jsBnnrSize.find('.h').html(_jsBnnrBox.attr('data-height'));
	})();
	
	//提交表单
	$('.jsSetBnnrFrm').find('.jsOkBtn').removeAttr('disabled').css('cursor','pointer');
	$('.jsSetBnnrFrm').bind('submit',function(){
		var _form=$(this);
		var _smtBtn=_form.find('.jsOkBtn');
		var _xyMdlRdo=$.trim($('input[name=dataShowType]:checked').val());
		var _hrefArry=[];
		var loading;
		
		//若选中“上传图片”时 图片不可为空
		if(_xyMdlRdo=="1"&&!$.trim($('input[name=banner]').val())){
			$dialog.tip("请上传图片！",2);
			return false;
		}
		
		//判断是否为华南城内部地址
		$('.jsHref').each(function(){
			_hrefArry.push(setMdl.validUrl($(this)));
		});
		if($.inArray(false,_hrefArry)>=0){
			return false;
		}
		
		loading=$dialog.loading('正在提交中，请稍后……');
		_smtBtn.attr('disabled','disabled').css('cursor','default');
		$.post(_form.attr('action'),_form.serializeArray(),function(data){
			loading.close();
			if(data.status){
				data.msg==""?$dialog.tip("提交成功！",2,function(){
					parent.location.reload();
				}):$dialog.tip(data.msg,2,function(){
					parent.location.reload();
				});
			}else{
				data.msg==""?$dialog.tip("提交失败！"):$dialog.tip(data.msg);
				_smtBtn.removeAttr('disabled').css('cursor','pointer');
			}
        },"json");
		return false;
	});

});