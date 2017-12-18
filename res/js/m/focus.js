//获得焦点(focus) 失去焦点(blur) 样式切换
csc.focus = function (id,classname){
	var style = classname || "focus";
	$(id).on("focus",function (){
		$(this).addClass(style);
	}).on("blur",function (){
		$(this).removeClass(style);
	});
	return this;
};
