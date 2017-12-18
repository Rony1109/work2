/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
	require('dialog');
    var placeholder=require('placeholder');
	
	/*解决ie下占位符不兼容问题*/
	placeholder.placeholder('#srchKeyTxt','#aaa');
	
	/*点击我要提问*/
	$('.jsIwantAsk').click(function(){
		var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');
		if (isLogin.status != true) {
			location.href = "//member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href);
			return false;
		}
		
		var _html='<div class="g-tr ask-pop">\
					  <form id="askPopForm" action="//finance.csc86.com/bg/qa-add" name="">\
					  <input type="hidden" name="product_id" value=""/>\
					  <textarea id="askTxtArea" name="question" cols="" rows="" maxlength="100" placeholder="允许输入100字以内"></textarea>\
					  <input type="submit" name="" value="提交"/>\
					  </form>\
				  </div>';
		var dg=art.dialog({
			title:'我要提问',
			content:_html,
			width:410,
			fixed: true,
			lock: true,
			padding:'20px 25px 30px',
			init:function(){
				
				/*解决ie下占位符不兼容问题*/
				placeholder.placeholder('#askTxtArea','#666');
				
				$('input[name=product_id][type=hidden]').val($('input[name=prdctId][type=hidden]').val());
				
				/*我要提问弹窗提交表单*/
				$('#askPopForm').submit(function(){
					var _form=$(this);
					var _smtBtn=_form.find('input[type=submit]');
					var _val=$.trim($('#askTxtArea').val());
					if(!_val){
						artDialog.tip('请输入问题！');
						return false;
					}
					if(_val.length>100){
						artDialog.tip('请将字数控制在100字以内！');
						return false;
					}
					_smtBtn.val('正在提交中...').attr('disabled',"disabled").css('cursor','default');
					$.post(_form.attr('action'),_form.serializeArray(), function(data) {
						if (data.result=="Y") {
							artDialog.tip('提交成功<br/>客服将在48h内回复您的问题，请耐心等候！',3,function(){
								dg.close();
							});
						} else {
							artDialog.tip("提交失败，请重新填写提交！");
							_smtBtn.val('提交').removeAttr("disabled").css('cursor','pointer');
							return false;
						}
					}, "json");
					return false;
				});
			}
		});
		
		return false;
	});
	
	/*问题列表*/
	$(function(){
		$('.problem-list li').each(function(){
			var _this=$(this),
				_opt=_this.find('.opt'),
				_dtl=_this.find('.itm-bd p'),
				_h=_dtl.height();
			if(_h>30){
				_dtl.height(22);
				_this.append('<a class="opt" href="">展开</a>');
			}
		});
		$('.problem-list').delegate(".opt", "click", function(){
			var _this=$(this);
			var _dtl=_this.closest('li').find('.itm-bd p');
			if(_this.hasClass('unfold')){
				_this.removeClass('unfold').html('展开');
				_dtl.height(22);
			}else{
				_this.addClass('unfold').html('收起');
				_dtl.height('auto');
			}
			return false;
		});
	});

});
