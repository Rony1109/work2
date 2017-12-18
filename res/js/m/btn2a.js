//新窗口打开 或 跳转 指定页面 //?框架页面里用的?
csc.btn2a = function (href, target){
	if( target == "_blank" ){
		window.open(href);
		return;
	}
	location.href = href;
};