function uploadSuccess(file,serverData){
	var data = eval("("+serverData+")");
	csc.useDialog(function (){
		uploadProgressClose();
		if(data.result == "success"){
			var url=csc.url("img",data.key),arr=file.id.split("_"),id=arr[1];
			$("#imgload0"+id).attr("src",url);
			$("#imgurl0"+id).val(data.key);
		}else{
			csc.alert(data.msg);
		}
	});
}

csc.auth = {};
csc.auth.mustStatus = true;

function checkRegNo(id) {
	var _id = id || "#regNo", regNo = $.trim($(_id).val()), $enterpriseName = $("input[name='enterpriseName']"),$registeredAddress = $("select[name='registeredAddress']"),$enterpriseEmail = $("input[name='enterpriseEmail']"),$officeTel =  $("input[name='officeTel']"),$officeAddress = $("input[name='officeAddress']"),$enterpriseType = $("input[name='enterpriseType']");
	if (regNo) {
		$(".regbtn").addClass("dis-btn").attr("disabled",true);
		$.ajax({
			type: "GET",
			url : csc.url("api","/business/reginfo.html"),
			dataType : "jsonp",
			data : {"regNo" : regNo},
			success : function(data){			
			if (!data.status) {
				if(data.enterpriseName){
					$enterpriseName.hide().next().remove();
					$enterpriseName.val(data.enterpriseName).after('<span class="abletext">'+data.enterpriseName +'</span>');
				}else{
					$enterpriseName.next("span").remove();
					$enterpriseName.show();
				}
				if(data.areaValue){
					$registeredAddress.find("option[value='"+ data.areaValue +"']").attr("selected",true);
					var areaTxt = '<span>'+ $registeredAddress.find(":selected").text() +'</span>';
					$registeredAddress.next().remove();
					$registeredAddress.hide().after(areaTxt);
				}else{
					$registeredAddress.find("option").removeAttr("selected");
					$registeredAddress.show().trigger("change").next().remove();
				}
				if(data.enterpriseEmail){
					$enterpriseEmail.hide().next().remove();
					$enterpriseEmail.val(data.enterpriseEmail).after('<span class="abletext">'+data.enterpriseEmail +'</span>');
				}else{
					$enterpriseEmail.next("span").remove();
					$enterpriseEmail.show();
				}
				if(data.officeTel){
					$officeTel.hide().next().remove();
					$officeTel.val(data.officeTel).after('<span class="abletext">'+data.officeTel +'</span>');
				}else{
					$officeTel.next("span").remove();
					$officeTel.show();
				}
				if(data.officeAddress){
					$officeAddress.hide().next().remove();
					$officeAddress.val(data.officeAddress).after('<span class="abletext">'+data.officeAddress +'</span>');
				}else{
					$officeAddress.next("span").remove();
					$officeAddress.show();
				}
				if(data.enterpriseType.length){
					var enterprise = '';
					$(".ty input").removeAttr("checked");
					$.each(data.enterpriseType, function(i,v) {
						$(".ty input[value="+ data.enterpriseType[i] +"]").attr("checked",true);
						enterprise = $(".ty :checked").text() + ' ';
					});
					$(".ty").hide();
					$(".ty:has(':checked')").show().find("input").hide();
				}else{
					$(".ty input").removeAttr("checked");
					$(".ty").show().find("input").show();
				}
			}else{
				csc.useDialog(function(){
					csc.tip(data.msg);
				});
					$enterpriseName.next().remove();
					$enterpriseName.show();
					$registeredAddress.find("option").removeAttr("selected");
					$registeredAddress.show().trigger("change").next().remove();
					$enterpriseEmail.next("span").remove();
					$enterpriseEmail.show();
					$officeTel.next("span").remove();
					$officeTel.show();
					$officeAddress.next("span").remove();
					$officeAddress.show();
					$(".ty input").removeAttr("checked");
					$(".ty").show().find("input").show();
			}
		},
		 complete: function() {
		 	$(".regbtn").removeClass("dis-btn").removeAttr("disabled");
		 }           
		});
		return true;
	} else {
		return false;
	}
}

$(function(){
	seajs.use(csc.url("res","/f=js/m/hover"),function (){
			csc.hover("#indu");
	});
});

function selectPosition() {
	var top = $("#indus-sele").outerHeight();
	$("#indus-con").css("top", top);
}

csc.auth.formVerify = function(form) {
	var _form = form, verify = _form.find('input.verify:visible');
	$.each(verify, function() {
		var $t = $(this), $val = $.trim($t.val());
		if ($val === '') {
			$t.trigger('blur').val('');			
			csc.auth.mustStatus = false;			
		}else{
			csc.auth.mustStatus = true;
		}
	});
	return csc.auth.mustStatus;
}

csc.authError = function(id,msg){
	id.find(".g-f-msg-box").remove();
	id.addClass("g-f-error").append('<div class="g-f-msg-box"><p class="g-f-error">'+ msg +'</p></div>')
}

function SelectMust(id,msg){
	var $id = $(id);
	if($id.find("input:checked").length === 0){
		csc.authError($id.find(".aff-value"),msg);
		return false;
	}else{
		$id.find(".g-f-msg-box").remove();
		return true;
	}
}

function PicMust(id,msg){
	var $id = $(id);
	if($.trim($id.find("input").val()) === ''){
		csc.authError($id.find(".aff-value"),msg);
		return false;
	}else{
		$id.find(".g-f-msg-box").remove();
		return true;
	}
}

$(function() {
	seajs.use(csc.url("res", "/f=js/m/showFormError"), function() {
		$("#authenticate").submit(function() {
			var $t = $(this), $description = $("#cdescription");
			if(!(csc.auth.formVerify($t) && SelectMust(".comtype","请选择公司类型") && SelectMust(".industry","请选择主营行业") && PicMust(".license","请上传营业执照") && PicMust(".cshoplogo","请上传旺铺logo"))){
				return false;
			}
			if ($description.val() === '') {
				csc.authError($description.parents(".aff-value"), "不能为空");
				return false;
			} else if ($description.val().length < 20 || $description.val().length > 500) {
				csc.authError($description.parents(".aff-value"), "详细介绍为20-500个字");
				return false;
			} else {
				$description.next().remove();
			}
			if ($(".agreement:checked").length < 1) {
				return false;
			}
		});
	});

	 if(csc.auth.errors){
	 	$.each(csc.auth.errors, function(i,v) {
	 		if(csc.auth.errors[i]==csc.auth.errors['content']){
	 			csc.showFormError($(".description"),v);
	 		}else if(csc.auth.errors[i]==csc.auth.errors['mainIndustry']){
	 			csc.showFormError($("#indu"),v);
	 		}else{
	 			csc.showFormError($("input[name*='"+ i +"']"),v);
	 		}
		 });
	 }
	 
	$("#indus-con").delegate("input", "change", function() {
		var txt = $.trim($(this).parent().text()),i = $("#indus-con input").index(this),cate=$(this).val().split(":")[0];
		if ($(this)[0].checked) {
			$("#indus-sele").append("<span data-q='"+ i +"'>" + txt + "</span>");
		} else {
			$("#indus-sele span[data-q='"+ cate +"']").remove();
			$("#indus-sele span[data-q='"+ i +"']").remove();
		}
		selectPosition();
	});
	$("#indus-sele").delegate("span", "click", function() {
		var txt = $.trim($(this).text()),i=$(this).data("q");
		$(this).remove();
		$("#indus-con input[value*='"+i+"']").attr("checked", false);
		selectPosition();
	});
	
	var failMsg = $.trim($("#failmsg").val());
	csc.useDialog(function(){
		if(failMsg !== ''){
			csc.alert(failMsg);
		}
	});
});
