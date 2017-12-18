/*
	mdl-setAdpic.html,mdl-sethotpro.html,mdl-setpro-autoslt.html 这三页面的js都在此文件
	mdl-setAdpic.html 设置广告位
	mdl-sethotpro.html 设置广告位和产品（自动和手动）
	mdl-setpro-autoslt.html 设置产品（自动）
*/

define(function(require, exports, module){
	require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');
	var $dialog=require('dialog');
	var placeholder =require('placeholder');
	var setMdl=require('./init.js');	
	
	/*数据展示方式*/
	setMdl.setDataShowType($('.setpro-bd'));
	
	function setpicTbl(ismove,xcw,obj){
		xcw.each(function(){
			var _this=$(this);
			var _trHtml;
			var _img=_this.attr('data-img')?_this.attr('data-img'):"";
			var _href=_this.attr('data-href')?_this.attr('data-href'):"";
			if(_this.hasClass('jsAdXcw')){
				_trHtml='<tr>\
						<td>\
							<div class="upld-box">\
								<input class="ipt-txt" type="text" name="adXcwPic[]" value="'+_img+'" placeholder="图片尺寸为宽'+_this.width()+'*高'+_this.height()+'" /><span class="gray-xbtn">浏览<input class="upld-btn jsPicUpld" type="file" name="" data-url="/uploadPhoto"></span>\
							</div>\
						</td>\
						<td><input class="ipt-txt jsHref" type="text" name="adXcwUrl[]" value="'+_href+'" /></td>\
						<td class="td-last">\
							<span class="g-cf mdl-cz-box">\
								<a class="move-up jsMoveUp">上移</a>\
								<a class="move-down jsMoveDown">下移</a>\
								<a class="del-opt jsDelOpt">删除</a>\
							</span>\
						</td>\
					</tr>';
			}
			if(_this.hasClass('jsProXcw')){
				_trHtml='<tr>\
						<td>\
							<div class="upld-box">\
								<input class="ipt-txt" type="text" name="proXcwPic[]" value="'+_img+'"/><span class="gray-xbtn">浏览<input class="upld-btn jsPicUpld" type="file" name="" data-url="/uploadPhoto"></span>\
							</div>\
						</td>\
						<td><input class="ipt-txt jsHref" type="text" name="proXcwUrl[]" value="'+_href+'" /></td>\
						<td class="td-last">\
							<span class="g-cf mdl-cz-box">\
								<a class="move-up jsMoveUp">上移</a>\
								<a class="move-down jsMoveDown">下移</a>\
								<a class="del-opt jsDelOpt">删除</a>\
							</span>\
						</td>\
					</tr>';
			}
			obj.append(_trHtml);
		});
		if(ismove){
			
			//移动图片
			setMdl.picMove();
			
			//删除图片
			setMdl.picDel();
			
		}else{
			placeholder.placeholder('input[name="adXcwPic[]"]');
			obj.find('.jsMoveUp').addClass('no-move-up');
			obj.find('.jsMoveDown').addClass('no-move-down');
			//删除图片
			setMdl.picDel($('.jsSetAdTbl'));
		}
		
	}
	

	(function(){
		var $wpXcw=$('.wp-mdl-hover',window.top.document);
		$wpXcw.each(function(){
			var _this=$(this);
			var _proXcw=_this.find('.jsProXcw');
			var _adXcw=_this.find('.jsAdXcw');
			
			//广告图设置
			setpicTbl(0,_adXcw,$('.jsSetAdTbl tbody'));
			
			//产品设置
			$('.jsSltNum .ttl').html(_proXcw.length);
			$('.jsJySize .w').html(_proXcw.eq(0).width());
			$('.jsJySize .h').html(_proXcw.eq(0).height());
			setpicTbl(1,_proXcw,$('.jsSetPicTbl tbody'));
		});
	})();
	
	
	//上传图片
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
	
	/*选择产品*/
	$('.jsSltPro').bind('click',function(){
		var $this=$(this);
		var $url=$this.attr('data-url');
		$dialog.open($url,{
			id:'mdlSltPro',
			title:'选择产品',
			width:800,
			height:450,
			fixed:true,
			lock:true,
			opacity:0,
			padding:0,
			close:function(){
				/*初始化编辑弹窗中的$('.jsChseHtml')信息*/
				var _jsChseHtml=$('.jsChseHtml');
				_jsChseHtml.attr('data-chsenum',0);
				_jsChseHtml.html('');
			}
		});
		return false;
	});
	
	/*提交表单*/
	$('.jsSetHotFrm').find('.jsOkBtn').removeAttr('disabled').css('cursor','pointer');
	$('.jsSetHotFrm').bind('submit',function(){
		var _form=$(this);
		var _smtBtn=_form.find('.jsOkBtn');
		var _hrefArry=[];
		var $setproBd=$('.setpro-bd');
		var $setadrItm=$('.setadr-itm');
		var loading;
		
		//判断是否为华南城内部地址
		if($setproBd[0]&&$setproBd.not('.zd-slt-bd').is(':visible')){
			$setproBd.find('.jsHref').each(function(){
				_hrefArry.push(setMdl.validUrl($(this)));
			});
		}
		if($setadrItm[0]){
			$setadrItm.find('.jsHref').each(function(){
				_hrefArry.push(setMdl.validUrl($(this)));
			});
		}
		if($.inArray(false,_hrefArry)>=0){
			return false;
		}
		if($.trim($('input[name=mdlTitle]').val()).length>6){
			$dialog.tip('版块标题字数已超出限制，请重新输入！',3);
			return false;
		}
		
		loading=$dialog.loading('正在提交中，请稍后……');
		_smtBtn.attr('disabled','disabled').css('cursor','default');
		$.post(_form.attr('action'),_form.serializeArray(),function(data){
			loading.close();
			if(data.status){
				//debugger
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