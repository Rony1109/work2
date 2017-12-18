//突出显示当前页的菜单项
csc.statusTab = function (id,filter){
	var	filter = filter || "[href$='" + location.pathname + "']";
	$(id).filter(filter).closest("li").addClass("cur").siblings(".cur").removeClass("cur");
	return this;
};