//��ý���(focus) ʧȥ����(blur) ��ʽ�л�
csc.focus = function (id,classname){
	var style = classname || "focus";
	$(id).on("focus",function (){
		$(this).addClass(style);
	}).on("blur",function (){
		$(this).removeClass(style);
	});
	return this;
};
