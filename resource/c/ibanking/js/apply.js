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
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});




define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    var placeholder=require('placeholder');
	var valid=require('./valid');
	   
	var Apply={
		/*点击取消按钮*/
		cancel:function(){
			$('.jsCancelBtn').click(function(){
				window.location.href="//finance.csc86.com/fg/topic-index";
				return false;
			});
		},
		
		/*融资申请第一步*/
		step1:function(){
			
			var frmSlt=$('.jsApplyForm1').find('select'),
				iptTxt=$('.jsApplyForm1').find('input[type=text]');
			
			/*表单失去焦点时验证*/	
			frmSlt.each(function(){
				valid.validInput($(this));
			});	
			iptTxt.each(function(){
				valid.validInput($(this));
			});
			
			/*提交按钮默认状态*/
			$('.jsApplyForm1').find('input[type=submit]').removeAttr("disabled");
			/*提交表单*/
			$('.jsApplyForm1').submit(function(){
				var _form=$(this),
					_smtBtn=_form.find('input[type=submit]'),
					arry1=[],
					arry2=[];
				frmSlt.each(function(){
					arry1.push(valid.validNull($(this)));
				});	
				iptTxt.each(function(){
					arry2.push(valid.validNull($(this)));
				});
				if($.inArray(false,arry1)>=0||$.inArray(false,arry2)>=0){
					return false;
				}
				
				_smtBtn.val('正在提交中...').attr('disabled',"disabled").css('cursor','default');
				$.post(_form.attr('action'),_form.serializeArray(), function(data) {
					if (data.id) {
						window.location.href="//finance.csc86.com/bg/add-tosteptwo?id="+data.id;
					} else {
						data.desc == "" ? alert("提交失败，请稍候再试！") : alert(data.desc);
						_smtBtn.val('保存并下一步').removeAttr("disabled").css('cursor','pointer');
						return false;
					}
				}, "json");
				return false;
			});	
			
			/*取消按钮*/
			Apply.cancel();		
		},
		
		/*融资申请第二步*/
		step2:function(){
			/*解决ie下占位符不兼容问题*/
			placeholder.placeholder('#zzs','#cecece');
			placeholder.placeholder('#yys','#cecece');
			placeholder.placeholder('#jkYt','#cecece');
			
			var jkYt=$('.jsApplyForm2').find('#jkYt'),
				iptTxt=$('.jsApplyForm2').find('input[type=text]');
			
			/*表单失去焦点时验证*/	
			valid.validInput(jkYt);
			iptTxt.each(function(){
				var _this=$(this);
				var validObj=null;
				if(_this.attr('id')=='jkJe'){
					validObj=$('.jsJkJeTip');
				}
				if(_this.attr('id')=='zhouQi'){
					validObj=$('.jsZhouQiTIp');
				}
				valid.validInput(_this,validObj);
			});
			
			/*提交按钮默认状态*/
			$('.jsApplyForm2').find('input[type=submit]').removeAttr("disabled");
			/*提交表单*/
			$('.jsApplyForm2').submit(function(){
				var _form=$(this),
					_smtBtn=_form.find('input[type=submit]'),
					arry1=[],
					arry2=[];
				arry1.push(valid.validNull(jkYt));
				iptTxt.each(function(){
					var _this=$(this);
					var validObj=null;
					if(_this.attr('id')=='jkJe'){
						validObj=$('.jsJkJeTip');
					}
					if(_this.attr('id')=='zhouQi'){
						validObj=$('.jsZhouQiTIp');
					}
					arry2.push(valid.validNull(_this,validObj));
				});
				if($.inArray(false,arry1)>=0||$.inArray(false,arry2)>=0){
					return false;
				}
				_smtBtn.val('正在提交中...').attr('disabled',"disabled").css('cursor','default');
				$.post(_form.attr('action'),_form.serializeArray(), function(data) {
					if (data.result=="Y") {
						window.location.href="//finance.csc86.com/bg/add-tostepthree";
					} else {
						alert(data.desc);
						_smtBtn.val('保存并下一步').removeAttr("disabled").css('cursor','pointer');
						return false;
					}
				}, "json");
				return false;
			});
			
			/*返回上一步按钮*/
			$('.jsBackBtn').click(function(){
				window.history.back(-1); 
				return false;
			});
			
			/*取消按钮*/
			Apply.cancel();	
		},
		
		//申请提交成功页
		step3:function(){
			/*点击确定*/
			$('.jsOkBtn').click(function(){
				window.location.href="//finance.csc86.com/bg/myfinance-list";
				return false;
			});
		}
	}
	
	module.exports=Apply;
    
});
