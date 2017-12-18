/*
* 一个简单生成遮罩层的东西
* author: 汪航洋
* Date: 2013年11月9日15时23分09秒
* explain: new ()
*/

csc.shade = function(id,option) {//生成遮罩层
    this.oDiv;
	var _option = {color:"#000",opacity:"30",zIndex:10,show:true};
	for(var k in option){
		_option[k] = option[k];
	};
	if (!document.getElementById(id)) {
		var Zdiv = document.createElement("div");
		Zdiv.id = id;
		document.body.appendChild(Zdiv);
	};
	this.oDiv = document.getElementById(id);
	var ie6 =!-[1,]&&!window.XMLHttpRequest;
	if(ie6){
		this.oDiv.style.cssText =
			 "width:expression(eval(document.documentElement.scrollLeft+document.documentElement.clientWidth));"+
			"height:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight));";
	}
	with (this.oDiv.style) {
		position = ie6 ? "absolute" : "fixed";
		backgroundColor = _option.color;
		filter = "Alpha(style=0,opacity=" + _option.opacity + ")"; //IE6,IE7
		opacity = _option.opacity / 100; //FF,IE8,Opera;
		display = _option.show ? "block" : "none";
		zIndex = _option.zIndex;
		top = "0";
		left = "0";			
		if(!ie6){
			width = "100%";
			height = "100%";
		};
	};
};

csc.shade.prototype.bom = function() {return this.oDiv;};
csc.shade.prototype.Show = function() {this.oDiv.style.display = "block";};
csc.shade.prototype.Close = function() {this.oDiv.style.display = "none";};