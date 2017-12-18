$(function(){
	var outerBox = $("#ctgryBox");
	var innerBox = $("#box-bd");
	var arrow = $(".box-hd h2 .s2");
	outerBox.mouseover(function(){
		innerBox.show();
		//innerBox.mouseover(function(){
			arrow.css("background","url(http://res.csc86.com/css/m/new-search/img/arrow-2.gif) no-repeat");
		//})
		});
	outerBox.mouseout(function(){
		innerBox.hide();
		arrow.css("background","url(http://res.csc86.com/css/m/new-search/img/arrow.gif) no-repeat");
		});	
	});