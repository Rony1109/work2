(function($){
  $.fn.limitTextarea = function(opts){
	  var defaults = {
        maxNumber:140,//允许输入的最大字数
		dom:'span.g-comment-let',//提示文字的位置，top：文本框上方，bottom：文本框下方
		onOk:function(){},//输入后，字数未超出时调用的函数
		onOver:function(){}//输入后，字数超出时调用的函数   
	  }
	  var option = $.extend(defaults,opts);
	  this.each(function(){
		  var _this = $(this);
		  var fn = function(){
			var extraNumber = option.maxNumber - _this.val().length;
			var $info = $(option.dom);
			if(extraNumber>=0){
			  $info.html('还可以输入<strong>'+extraNumber+'</strong>个字');	
			  option.onOk();
			}
			else{
			  $info.html('已经超出<strong style="color:red;">'+(-extraNumber)+'</strong>个字'); 
			  option.onOver();
			}
			if(_this.val().length == 0){
				option.onOver();
			}
		  };
		  //绑定输入事件监听器
		  _this.bind('focus change blur cut keydown keyup',fn);
	  });
  }	
})(jQuery)