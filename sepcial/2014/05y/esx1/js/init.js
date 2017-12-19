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
	
	//问号、叹号由上往下运动
	$(window).scroll(function(){
		var _top = $(this).scrollTop();
		var _flrTop1=$('.topic_flr1').offset().top;
		var _flrTop4=$('.topic_flr4').offset().top;
		if(_top>=_flrTop1-150){
			$('.wh').animate({
				top:180,
				opacity:1
			},600);
		}
		if(_top>=_flrTop4-150){
			$('.th').animate({
				top:142,
				opacity:1
			},600);
		}
	});
	
	//点击go
	$('.go').click(function(){
		var _flrTop2=$('.topic_flr2').offset().top; 
		$('html,body').animate({scrollTop:_flrTop2},500);
	});
	
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
	
	//投票调查提交表单
	$('form[name=cms_form_diaocha]').submit(function(event){
		var _form = $(this),
			_json=_form.serializeJson();
		if(!_json['info[question01]']||!_json['info[question02]']||!_json['info[question03]']||!_json['info[question04]']||!_json['info[question05]'])
		{
			alert("请对各问题作出回答！");
			return false;
		}
		if(typeof(_json['info[question02]'])=="object"){
			_json['info[question02]']=_json['info[question02]'].join(",");
		}
		$.post(_form.attr('action'),_json,function(data){
			if(data.status == true){
				alert("投票成功！"); 
			}else{
				alert("投票失败，请重新投票！");
			}
        },"jsonp");
		return false;
	});
	
});
