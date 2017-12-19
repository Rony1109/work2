$(function(){
	soSubmit();
	submitSo();
});
function soSubmit(){
	$(".menu2").hover(function(){
		$(".list").show();
	},function(){$(".list").hide()});
	$("#aobj").bind("click",function(){$(".list").show();});
	$(".list").children("div").bind("click",function(){
		var a=$(this).children("a").text();
		$("#inobj").attr("value",a)
		$(".list").hide();
	})
}
function submitSo(){
	var q = $("#searchbtn") , f = $("#inobj") ;
	q.bind("click",function(){
		var qstr=$("#search-txt").val();
		if(qstr!=""){
			if(f.val().indexOf("产品")>=0){
				q.attr("href","http://search.csc86.com/selloffer/products.html?q="+qstr);
			}else{
				q.attr("href","http://search.csc86.com/company/company.html?q="+qstr);
			}
		}else{
			return false;
		}
	})
}
