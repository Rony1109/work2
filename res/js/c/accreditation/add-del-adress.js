$(function(){ 
 	seajs.use(csc.url("res","/f=js/m/area"),function (){
		csc.selectArea("#select",function (val,text){
			var hval0=$("#licenseadress");
			var hval1=$("#sphere");
			if(hval0.length>0){
				hval0.val(val);
			}else if(hval1.length>0){
				hval1.val(val);
			}
	    },"所有地区");
	});
 	var flag=document.createDocumentFragment();
	 //删除输入地址
	 $("div.adres-con .del-adress").live("click",function(){
		var pare=$(this).parents("div.adres-con").addClass("g-d-n");
		pare.find(":input").val("");
		pare.children("span").children("select").each(function(){
			$(this).val("");	
		});	
	 });
	
	//增加输入地址
	 $("#add-adress").click(function(){
		var paresib=$(this).parents("div.adres-con");
		if(paresib.next().is(":visible")){
			 paresib.nextAll().removeClass("g-d-n");
		 }else{ 
		  	 paresib.next().removeClass("g-d-n"); 
		};
	});
	
	function getStrByteLen(str){
		return str.replace(/[^\x00-\xff]/ig,'**');
	}
});