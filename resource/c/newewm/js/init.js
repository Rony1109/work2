/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        // 'zepto': 'l/mobile/zepto.min.js',
          'zepto': '../js/zepto.min.js'
    },
    
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('zepto');	
	// 错误提示
	$.fn.tipmsg = function(tip,time) {
		var _this = this,t;
		t= arguments[1] ? time : 3000;
		_this.text(tip).show().addClass("bounceInUp");
		setTimeout(function() {
			_this.removeClass("bounceInUp").hide();
		}, t);
	};
	//input number不支持maxlength	
	$("input[type='number']").on("input propertychange",function(){
		var maxnum=$(this).attr("maxlength");
		$(this).val($(this).val().substr(0,maxnum));
	});
      //获得焦点效果
      $("input[type='number'],input[type='password']").on("focus",function(){
        $(this).parents(".input-box").addClass("in-focus");
      });
      $("input[type='number'],input[type='password']").on("blur",function(){
        $(this).parents(".input-box").removeClass("in-focus");
      });
});
