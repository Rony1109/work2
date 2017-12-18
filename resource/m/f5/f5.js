define(function(require, exports, module){
	var f5={
		init:function(){
			//按下f5键后未释放时不刷新页面
			$(document).keydown(function(e){
				e=window.event||e;
				if(e.keyCode==116){
					e.keyCode = 0; 
					return false; 
				}
			});
			
			//按下f5建后释放时刷新页面
			$(document).keyup(function(e){
				if(e.keyCode==116){
					location.reload()
				}
			});
		}
	}
	f5.init();
});