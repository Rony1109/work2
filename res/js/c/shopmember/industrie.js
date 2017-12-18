$(function(){
	$("#indus-con label").click(function(){
	  var txt=$.trim($(this).text());	
	  var flag = $(this).find("input").attr("checked");
	  if(flag){
		$("#indus-sele").append("<span>"+txt+"</span>");
	  }
	});
	$("#indus-sele span").click(function(){
		  var txt=$.trim($(this).text());	
		  $("#indus-con label:contains("+txt+")").find("input").attr("checked",false);
	});
});
























