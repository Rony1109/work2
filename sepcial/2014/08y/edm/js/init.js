/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');

    //表单序列化插件
	(function($) {
		$.fn.serializeJson = function() {
			var serializeObj = {};
			var array = this.serializeArray();
			var str = this.serialize();
			$(array).each(function() {
				if (serializeObj[this.name]) {
					if ($.isArray(serializeObj[this.name])) {
						serializeObj[this.name].push(this.value);
					} else {
						serializeObj[this.name] = [serializeObj[this.name], this.value];
					}
				} else {
					serializeObj[this.name] = this.value;
				}
			});
			return serializeObj;
		};
	})(jQuery);
	
	$('form[name=bmForm]').submit(function(){
		var _form=$(this);
		var _json=_form.serializeJson();
		if(_json['info[name]']==""||_json['info[name2]']==""||_json['info[tel]']==""||_json['info[email]']==""||_json['info[html]']==""||_json['info[html2]']==""||_json['info[html3]']==""){
			alert("所有表单均为必填项，请填写完整！");
			return false;
		}
		$.post(_form.attr('action'), _json, function(data) {
			if (data.status == true) {
				alert("提交成功！");
				_form[0].reset();
			} else {
				alert("提交失败，请重新填写并提交！");
			}
		}, "jsonp");
		return false;
	});
	 
});
