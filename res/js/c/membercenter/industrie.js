$(function(){
	$("#indus-con>label>input").change(function(){
		$("#m-intrstips").hide();
	  var txt=$.trim($(this).parent().text()),lef,flag = $(this)[0].checked,lef=true;
	  if(flag){
		 $("#indus-sele span").each(function(index,element) {
			if($(this).text()===txt){
				lef=false;
			}
         });
		 if(lef){
			$("#indus-sele").append("<span>"+txt+"</span>");
		 }
	  }else{
		  $("#indus-sele span:contains("+txt+")").remove();
	  }
	});
	
	$("#main-con>label>input").change(function(){
		
	  var txt=$.trim($(this).parent().text()),lef,flag = $(this)[0].checked,lef=true;
	  if(flag){
		 $("#main-sele span").each(function(index, element) {
			if($(this).text()===txt){
				lef=false;
			}
         });
		 
		 if(lef){
			$("#main-sele").append("<span>"+txt+"</span>");
		 }
	  }else{
			$("#main-sele span:contains("+txt+")").remove();  
	  }
	});
	$("#indus-sele span").live("click",function(){
		$("#m-intrstips").hide();
		  var txt=$.trim($(this).text());	
		  $(this).remove();
		  $("#indus-con label:contains("+txt+")").find("input:checkbox").attr("checked",false);
	});
	
	$("#main-sele span").live("click",function(){
		  var txt=$.trim($(this).text());	
		  $(this).remove();
		  $("#main-con label:contains("+txt+")").find("input:checkbox").attr("checked",false);
	});
	
	
	
	csc.ie6 && $("#indu,#cion,#ye-adress").hover(function(){
			$(this).addClass("hover");
	},function(){
			$(this).removeClass("hover");
	});
	csc.ie6 && $("#ye-adress").hover(function(){
			$("#enterpriseType,select[name=registerDate]").css("visibility","hidden");
	},function(){
		    $("#enterpriseType,select[name=registerDate]").css("visibility","visible");
	});
	
	
	
	
});
























