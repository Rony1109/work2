define(function(require, exports, module) {
	var $dialog=require('//res.csc86.com/v2/m/dialog/js/init');
	var $proPic=$('.szsy-bd .pro-pic');
	var $qyOpts=$('.qyname-opts');
	var qyName=$('#companyName').val();
	var qyUrl=$('#companyUrl').val();
	
	//显示旺铺链域名相关函数
	var showWqUrlFun=function(obj){
		var _checked=obj.is(':checked');
		if(_checked){
			$proPic.append('<sub class="url">'+qyUrl+'</sub>');
			if($proPic.find('.rb')[0]){
				$proPic.find('.rb').css('bottom','40px');
			}
		}else{
			$proPic.find('.url').remove();
			if($proPic.find('.rb')[0]){
				$proPic.find('.rb').css('bottom','25px');
			}
		}
	};
	
	//企业名称位置相关函数
	var qyNameWzFun=function(obj){
		var _this=obj;
		var _id=_this.attr('id');
		switch(_id){
			case 'midRadio':
			$proPic.find('.name').remove();
			$proPic.append('<div class="name mid">'+qyName+'</div>');
			break;
			case 'lrRadio':
			$proPic.find('.name').remove();
			$proPic.append('<span class="name lt">'+qyName+'</span><span class="name rb">'+qyName+'</span>');
			if(!$proPic.find('.url')[0]){
				$proPic.find('.rb').css('bottom','25px');
			}
			break;
			case 'rRadio':
			$proPic.find('.name').remove();
			$proPic.append('<span class="name rb">'+qyName+'</span>');
			if(!$proPic.find('.url')[0]){
				$proPic.find('.rb').css('bottom','25px');
			}
			break;
		}
	};
	
	//显示企业名称相关函数
	var showQyNameFun=function(obj){
		var _checked=obj.is(':checked');
		if(_checked){
			$qyOpts.show();
			qyNameWzFun($qyOpts.find('input[type=radio]:checked'));
			$qyOpts.find('input[type=radio]').change(function(){
				qyNameWzFun($(this));
			});
		}else{
			$qyOpts.hide();
			$qyOpts.find('input[type=radio]').removeAttr('checked');
			$proPic.find('.name').remove();
		}
	};
	
	//显示旺铺域名
	(function(){
		var showWqUrl=$('#showWpName');
		showWqUrlFun(showWqUrl);
		showWqUrl.click(function(){
			showWqUrlFun($(this));
		});
	})();
	
	//显示旺铺名称
	(function(){
		var showQyName=$('#showQyName');
		showQyNameFun(showQyName);
		showQyName.click(function(){
			showQyNameFun($(this));
		});
	})();
	
	
	//保存设置
	$('.jsSzsyForm').find('input[type=submit]').val('保存设置').removeAttr("disabled");
	$('.jsSzsyForm').submit(function(){
		var _form=$(this);
		var _smtBtn=_form.find('input[type=submit]');
		if($('#showQyName').is(':checked')&&!$('input[name=enterpriseName]:checked')[0]){
			$dialog.alert('请选择显示您的企业名称的位置！',function(){});
			return false;
		}
		_smtBtn.val('提交中...').attr('disabled',"disabled").css('cursor','default');
		$.post('//member.csc86.com/shop/watermark.html',_form.serializeArray(),function(data){
			if(data.status=="1"){
				$dialog.success('保存成功',2);
				_smtBtn.val('保存设置').removeAttr("disabled").css('cursor','pointer');
			}else{
				data.error==""?$dialog.alert('保存失败，请重新提交！',function(){}):$dialog.alert(data.error,function(){});
				_smtBtn.val('保存设置').removeAttr("disabled").css('cursor','pointer');
			}
		},"json");
		return false;
	});
	
});