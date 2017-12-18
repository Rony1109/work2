/*
	mdl-setslide.html,mdl-setslide2.html 这两页面的js都在此文件
	mdl-setslide.html 为skin0015及之前的模板设置轮播图的模块
	mdl-setslide2.html 比 mdl-setslide.html 多了显示和隐藏模块功能、设置轮播时间功能
*/

define(function(require, exports, module){
	require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');
	var $dialog=require('dialog');
	var setMdl=require('./init.js');
	
	//建议轮播图片大小
	(function(){
		var _wpMdlHover=$('.wp-mdl-hover',window.top.document);
		var _jsSlideBox=_wpMdlHover.find('.jsSlideBox');
		var _jsSldSize=$('.jsSldSize');
		_jsSldSize.find('.w').html(_jsSlideBox.data('width'));
		_jsSldSize.find('.h').html(_jsSlideBox.data('height'));
	})();
	
	//上传轮播图片
	$('.jsPicUpld').each(function(){
		var _this=$(this);
		var _iptTxt=_this.parents('.upld-box').find('.ipt-txt[type=text]');
		setMdl.upload(_this,function(e,data){
			var result = data.result;
			if(result.status){
				_iptTxt.val(result.fileName);
			}else{
				result.msg==""?$dialog.tip("上传失败，请重新上传！"):$dialog.tip(result.msg);
			}
		});
	});	
	
	//图片移动
	setMdl.picMove();
	
	//删除
	setMdl.picDel();
	
	//提交表单
	$('.jsSetSldFrm').find('.jsOkBtn').removeAttr('disabled').css('cursor','pointer');
	$('.jsSetSldFrm').bind('submit',function(){
		var _form=$(this);
		var _smtBtn=_form.find('.jsOkBtn');
		var _slideW=$.trim(_form.find('input[type=text][name=slideW]').val());
		var _slideH=$.trim(_form.find('input[type=text][name=slideH]').val());
		var _imgArry=[];
		var _hrefArry=[];
		var loading;
		
		//至少上传一张图片
		$('input[name="img[]"]').each(function(){
			var _this=$(this);
			var _val=$.trim(_this.val());
			if(_val){
				_imgArry.push(_val);
			}
		});
		
		if(_imgArry.length<=0){ 
			if(!$("#hideMdlRdo").is(":checked"))
			{
			    $dialog.tip("至少需要上传一张轮播图片！",2);
				return false;

			}
		}
		
		//判断是否为华南城内部地址
		$('.jsHref').each(function(){
			_hrefArry.push(setMdl.validUrl($(this)));
		});
		if($.inArray(false,_hrefArry)>=0){
			return false;
		}
		
		if(_slideW&&(_slideW<1000||_slideW>1440)){
			$dialog.tip("尺寸不符合规范，请重新设置！",2);
			return false;
		}
		if(_slideH&&(_slideH<=0||_slideH>800)){
			$dialog.tip("尺寸不符合规范，请重新设置！",2);
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