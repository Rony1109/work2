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
    require('jquery');
    require('top');
    require('header');
	require('dialog');
    var placeholder=require('placeholder');
	
	placeholder.placeholder('#askTxtArea','#666');
	
	
	/*点击我要咨询按钮*/
	$('.jsIConsult').click(function(){
		$.post('//api.csc86.com/notify/count/all/?callback=define',function(data){
			if (data.status != true) {console.log(data);
				location.href = "//member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href);
				return false;
			}else{
				art.dialog.open('//finance.csc86.com/bg/pop-consult',{
					title:'我要咨询',
					width:610,
					height:380,
					fixed:true,
					lock:true
				});
			}
		},"jsonp");
		return false;
	});
	
	/*填写问题前先判断是否登录*/
	$('#askTxtArea').focus(function(){
		$.post('//api.csc86.com/notify/count/all/?callback=define',function(data){
			if (data.status != true) {
				location.href = "//member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href+'#ynjdBox');
			}
		},"jsonp");
		return false;
	});
	
	/*提交问题*/
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
			if (data.result == 'Y') {
				artDialog.tip('提交成功<br/>客服将在48h内回复您的问题，请耐心等候！',3,function(){
					_smtBtn.val('确认提问').removeAttr("disabled").css('cursor','pointer');
					_form.find('textarea').val("");
				});
			} else {
				artDialog.tip("提交失败，请重新填写提交！");
				_smtBtn.val('确认提问').removeAttr("disabled").css('cursor','pointer');
			}
		}, "json");
		return false;
	});
	
	/*问题列表*/
	$(function(){
		$('.problem-list li').each(function(){
			var _this=$(this),
				_opt=_this.find('.opt'),
				_dtl=_this.find('.itm-bd p'),
				_h=_dtl.height();
			if(_h>=44){
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
