//验证之后样式切换

csc.showFormError = function (id,msg,obj){
	var	obj = obj || {},
		parentClass = obj.parentClass || "aff-value",
		msgBoxTag = obj.msgBoxTag || "div",
		msgBoxClass = obj.msgBoxClass || "g-f-msg-box",
		errorTag = obj.errorTag || "p",
		errorClass = obj.errorClass || "g-f-error",
		eleClass = obj.eleClass || (errorClass == "g-f-error" ? "aff-text-error" : "aff-text"),
		$content = id.closest("."+parentClass),
		$msgBox = $content.children("."+msgBoxClass);
	id.is("."+eleClass) || id.addClass(eleClass);
	$content.is("."+errorClass) || $content.addClass(errorClass);
	$msgBox.length ? 
		$msgBox.children("."+errorClass).length ?
			$msgBox.children("."+errorClass).html(msg) : $msgBox.append('<'+ errorTag +' class="' + errorClass + '">' + msg + '</'+ errorTag +'>')
		: $content.append('<'+msgBoxTag+' class="'+msgBoxClass+'"><'+ errorTag +' class="' + errorClass + '">' + msg + '</'+ errorTag +'></'+msgBoxTag+'>');
};

csc.formErros = function (errors,obj){
	var	othis = this,
			obj = obj || {};
	if(errors.status == false){
		window.art ? csc.alert(errors.msg) : alert(errors.msg);
		return;
	}
	$.each(errors,function (i,v){
		othis.showFormError($("[name='" + i + "']"),v,obj);
	});
};

csc.showFormEx = function (id,msg){
	var	$id = $(id),
			othis = this,
			obj = {
				errorClass:"g-f-ex"
			},
			$parent = $id.closest(".g-f-content");
	$id.on("focus",function (){
		$parent.removeClass("g-f-error");
		othis.showFormError($id,msg,obj);
	}).on("blur",function (){
		$parent.removeClass(obj.errorClass);
	});
};