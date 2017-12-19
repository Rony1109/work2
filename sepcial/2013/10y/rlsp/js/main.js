$(function() {
	$.ajax({
		url : "http://cncms.csc86.com/api/block.php?pageid=useshop&blockno=1",
		type : "get",
		dataType : "html",
		success : function(data){
			var html = data.slice(0 , data.lastIndexOf(">") + 1);
			$(".claim_wrapper .rows .info").append(html);
		}
	});
	
	$('.msg_form').submit(function(){
		var $area = $(this).find('.msg_area'), flag = false;
		
		if($.trim($area.val()) != ""){
			flag = true;
		}
		return flag;
	});
	//marquee
	setTimeout(function(){
		//marquee
		$('ul.marquee').marquee({yScroll:"bottom"});
	}, 3000);

});