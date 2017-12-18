csc.hrefinfo = function (id,filter){
	var href=window.location.href,l=href.length-2,index=window.location.href.lastIndexOf("/",l), dd=href.substr(index+1,8),flag=true; 
	if($("#apply").length){
		$("#head-main li.apply").addClass("cur");flag=false;
	}
	$(id).each(function() {
        if($(this).attr("href").indexOf(dd)!=-1){
			$(this).parent("li").addClass("cur");
			flag=false;
			return;
		}		
    });		
	if(flag){	
		$("#head-main").find("li:first").addClass("cur");
	}
};

$(function(){
	
});







