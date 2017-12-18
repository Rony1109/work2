$(function(){
	var $this=$("#work-con a.work"),len=$this.length;
	if(len==1){
		$this.parent().removeClass("g-d-n").nextAll(":lt(4)").removeClass("g-d-n");	
	}else if(len==2){
		$this.parent().removeClass("g-d-n").nextAll().removeClass("g-d-n");
		
	}
	$("#work-con .del").live("click",function(){
		var li=$(this).parents("li").addClass("g-d-n");
		li.nextAll(":lt(4)").addClass("g-d-n");
		$("#work-con li input:hidden").val("");
		$("li.add-p").removeClass("g-d-n");
	});	
	$("#work-con .add").live("click",function(){
		var len=$("#work-con li.del-p:visible").length;
		$("#work-con").find("li:hidden:lt(5)").removeClass("g-d-n");
		if(len>0){$("li.add-p").addClass("g-d-n");return ;}
	});	
	
});