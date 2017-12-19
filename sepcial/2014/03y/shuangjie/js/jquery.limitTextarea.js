(function($){
  $.fn.limitTextarea = function(opts){
	  var defaults = {
        maxNumber:140,//允许输入的最大字数
		position:'bottom',//提示文字的位置，top：文本框上方，bottom：文本框下方
		onOk:function(){},//输入后，字数未超出时调用的函数
		onOver:function(){}//输入后，字数超出时调用的函数   
	  }
	  var option = $.extend(defaults,opts);
	  this.each(function(){
		  var _this = $(this);
		  var info = '<span class="tips">还可以输入<i>'+(option.maxNumber- _this.val().length)+'</i>字</span>';
		  var fn = function(){
			var extraNumber = option.maxNumber - _this.val().length;
			var $info = $('.tips');
			if(extraNumber>=0){
			  $info.html('还可以输入<i>'+extraNumber+'</i>个字');	
			  option.onOk();
			}
			else{
			  $info.html('已经超出<i style="color:red;">'+(-extraNumber)+'</i>个字'); 
			  option.onOver();
			}  
		  };
		  switch(option.position){
			  case 'top' :
			    _this.before(info);
			  break;
			  case 'bottom' :
			  default :
			    _this.find('p').after(info);
		  }
		  //绑定输入事件监听器
		  if(window.addEventListener) { //先执行W3C
			_this.get(0).addEventListener("input", fn, false);
		  } else {
			_this.get(0).attachEvent("onpropertychange", fn);
		  }
		  if(window.VBArray && window.addEventListener) { //IE9
			_this.get(0).attachEvent("onkeydown", function() {
			  var key = window.event.keyCode;
			  (key == 8 || key == 46) && fn();//处理回退与删除
			});
			_this.get(0).attachEvent("oncut", fn);//处理粘贴
		  }		  
	  });   
  }	
})(jQuery)