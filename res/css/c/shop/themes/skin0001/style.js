$(function(){
	//会员信息块，增加底部div，用于处理底部背景图

	var $mi =$(".member-info");
	if($mi.length){
		$mi.append('<div class="m-btm"/>');
	}

	if(csc.ie6){
		$("div.main-cate").find("a").each(function (){
			var $t = $(this);
			$t.width()<120 || $t.width(120);
		});
	}
	
	if(location.pathname=="/detail.html"){
		$("h2.bs-hd:contains('相关产品')").addClass('related');
	}
});