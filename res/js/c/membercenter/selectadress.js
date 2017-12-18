 
$(function(){ 
	 //常用地址选择
	$("#province,#province1,#province2,#province3").change(function(){ 
	$("#useradresstips,#licenseadretips,#businesstips").hide();
	var $t = $(this).removeClass("border-error"),valueId=$t.find(":selected").val().split(":")[0]; 
		$.get(csc.url("api","/area/getCity.html"),{"provinceId":valueId},function (data){
			   if(data.length){
					var str="<option>请选择市</option>";
					$.each(data,function(index,value){
						str+='<option value="'+value.id+":"+value.name+'">'+value.name+'</option>';
					});
					$t.next().html(str).trigger("change");
				}else{
					$t.next().html("<option>请选择市</option>");
				}
			},"jsonp");
	});
	
	$("#city,#city1,#city2,#city3").change(function(){
		$("#useradresstips,#licenseadretips,#businesstips").hide();
		 var $t = $(this).removeClass("border-error"),value=$t.val(),valueId=$t.find(":selected").val().split(":")[0];
		 $.get(csc.url("api","/area/getCity.html"),{"provinceId":valueId},function (data){
				   if(data.length){
						var str="<option>请选择区</option>";
						$.each(data,function(index,value){
							str+='<option value="'+value.id+":"+value.name+'">'+value.name+'</option>';
						});
						$("#area-s").html(str);
					}else{
						$("#area-s").html("<option>请选择区</option>");	
					}
				},"jsonp");
	});
	$("#area-s").change(function(){
		$("#useradresstips").hide();
	});
})