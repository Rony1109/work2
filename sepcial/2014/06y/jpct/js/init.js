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
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	//require('l/artDialog/4.1.5/jquery.artDialog');
	//require('l/artDialog/4.1.5/plugins/iframeTools.source');
    require('http://res.csc86.com/f=js/p/artDialog/4.1.5/jquery.artDialog.js,js/p/artDialog/4.1.5/plugins/iframeTools.source.js');

    /*右侧浮层*/
	(function(){
		var _fixed=$(".fixed");
		var _topFlr1=$("#topic-flr1").offset().top;
		$(window).scroll(function(){
			var _top = $(this).scrollTop();
			_top>=_topFlr1?_fixed.fadeIn():_fixed.hide();
		});
	})();
	
	//表单序列化插件
	(function($){
		$.fn.serializeJson=function(){  
			var serializeObj={};  
			var array=this.serializeArray();  
			var str=this.serialize();  
			$(array).each(function(){  
				if(serializeObj[this.name]){  
					if($.isArray(serializeObj[this.name])){  
						serializeObj[this.name].push(this.value);  
					}else{  
						serializeObj[this.name]=[serializeObj[this.name],this.value];  
					}  
				}else{  
					serializeObj[this.name]=this.value;   
				}  
			});  
			return serializeObj;  
		};  
    })(jQuery);
	
	/*申请舌尖议员*/
	$('form[name=cms_form_delicious]').submit(function(){
		var _form = $(this),
			_json=_form.serializeJson();
		if(_json['info[Name]']==""||_json['info[mobilphone]']==""){
			alert("姓名、手机号码不可为空！");
			return false;
		}
		else if(!_json['info[mobilphone]'].match(/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/)){
			alert("请输入正确格式的手机号码！");
			return false;
		}
		$.post(_form.attr('action'),_json,function(data){
			if(data.status == true){
				alert("提交成功！"); 
				_form[0].reset();
			}else{
				alert("提交失败，请重新填写提交！");
			}
        },"jsonp");
		return false;
	});
	
	/*立即报名*/
	$(".jsStartNow").click(function(){
		var html=$("#bmPop").html();
		var dg=art.dialog({
			title:'立即报名',
			content:html,
			width:480,
			fixed:true,
			lock:true,
			init:function(){
				$('form[name=cms_form_goldnomin]').submit(function(){
					var _form=$(this),
					_json=_form.serializeJson();
					if(_json['info[name]']==""||_json['info[contact]']==""||_json['info[phone]']==""||_json['info[ADD]']==""){
						alert("餐厅名称、负责人、手机号码及餐厅地址不可以为空！");
						return false;
					}
					else if(!_json['info[phone]'].match(/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/)){
						alert("请输入正确格式的手机号码！");
						return false;
					}
					$.post(_form.attr('action'),_json,function(data){
						if(data.status == true){
							alert("提交成功！"); 
							_form[0].reset();
						}else{
							alert("提交失败，请重新填写提交！");
						}
					},"jsonp");
					return false;
				});
			}
		});
	});

});
