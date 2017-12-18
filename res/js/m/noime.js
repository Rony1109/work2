/*
* 限制文本框输入
* author: why
* Date: 2012年11月2日13时58分13秒
*/


/*
* 限制文本框只能输入数字
* id jQuery选择字符串，或HTMLelement对像
* enter 是否响应回车（在表单中回车是否提交表单，默认为true）可以为function
*/
csc.noime=function(id,enter){
	var hc = typeof(enter);
	$(id).bind("keydown",function(e){
		var keynum = window.event?event.keyCode:e.which,keychar,numcheck;
		keynum ;
		if (keynum == 13) {
			if( hc == "undefined" ) {return true;}
			if( hc == "function" ) {enter(this); return false;} else if (!!enrer){return true;}
		}; //回车
		if((keynum >= 96 && keynum <= 105) || keynum==9 || keynum==37 || keynum==38 || keynum==39 || keynum==40 || keynum==46) return true;//小键盘数字,tabe键,方向键;
		keychar = String.fromCharCode(keynum);
		numcheck = /[\d\ch]/; //匹配数字,退格;
		return numcheck.test(keychar);
	})
}