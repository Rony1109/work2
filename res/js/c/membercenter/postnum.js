(function($) {
	$.post("/personal/message/getmessagenum",function(data){
		var str=$.trim(data);
		if(Number(str)){
			$("#allmsg").text(str).parent().show()
		}
	});
	$.post("/sns/card/getcardnum",function(data){
		var str=$.trim(data);
		if(Number(str)){
			$("#cardnum").text(str).parent().show();
		}
	});
})(jQuery)