define(function(require , exports , module){
	module.exports = function(obj , className){
		//底部更多
		var el_height = $(obj).siblings('span').get(0).scrollHeight;
		if(el_height <= 25) {
			$(obj).hide();
		}
		else {
			$(obj).show().click(function(){
				var span = $(this).siblings('span');
				
				//alert($(this).siblings('span').height());
				if(span.height() <= 22){
					span.height(44); 
					$(this).addClass(className);
				}
				else{
					span.height(22); 
					$(this).removeClass(className);
				}
			});
		}
	};
});