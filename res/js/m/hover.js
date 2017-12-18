/*
	让IE6支持hover:伪类
*/

/*
* 绑定对像鼠标移入移出的样式及事件
* id 绑定对像 JQ选择器字符串
* hover 样式名称
* fun_in 鼠标移入的回调函数
* fun_out 鼠标移出的回调函数
*/
csc.hover = function ( id , hover , fun_in , fun_out){
	var hover = hover || "hover";
	$(id).hover(function (){
		$(this).addClass(hover);
		if(typeof(fun_in)=="function") {fun_in(this);}
	},function (){
		$(this).removeClass(hover);
		if(typeof(fun_out)=="function") {fun_out(this);}
	});
	return this;
};