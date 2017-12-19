/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
	require('top');
	
	//右侧颜色导航
    (function(){
		var arry=[];
		var fix=$('.fixed');
		var fixUl=fix.find('ul');
		var fixLi=fix.find('li');
		$('.topic_flr').each(function(){
            arry.push($(this).offset().top);
        });
		$(window).scroll(function(){
			var _top=$(this).scrollTop();
			_top>=arry[0]-50?fixUl.css('visibility','visible'):fixUl.css('visibility','hidden');
			for(var i=0;i<=arry.length;i++){
				if(_top>=arry[i]&&_top<=arry[i+1]){
					fixLi.eq(i).addClass('curr').siblings().removeClass('curr');
				}
				if(_top>=arry[arry.length-1]){
					fixLi.eq(arry.length-1).addClass('curr').siblings().removeClass('curr');
				} 
			}
		});
		fixLi.find('a').bind('click',function(){
			var _index=fixLi.find('a').index(this);
			$('html,body').animate({scrollTop:arry[_index]},500);
			return false;
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
	
	//加入华南城提交表单
	$('form[name=cms_form_weimeng]').submit(function(){
		var _form = $(this),
			_json=_form.serializeJson();
		if(_json['info[name]']==""||_json['info[gongsi]']==""||_json['info[tel]']==""||_json['info[ps]']=="")
		{
			alert("姓名、公司、联系方式及留言不可以为空！");
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
});
