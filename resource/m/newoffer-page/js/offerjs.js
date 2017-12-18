$(function(){
	var outerBox = $("#ctgryBox");
	var innerBox = $("#box-bd");
	var arrow = $(".box-hd h2 .s2");
	outerBox.mouseover(function(){
		innerBox.show();
		arrow.html("&and;");
		});
	outerBox.mouseout(function(){
		innerBox.hide();
		arrow.html("&or;");
		});	
	});