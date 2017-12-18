// JavaScript Document
var mapClass = {};
mapClass.mark_bj = true; //感应边界开关
mapClass.mark_tdBzb = {};
$(function(){	
	mosemove();
})
function inval(val,max_v,min_v){
	var max_x = max_v>min_v?max_v:min_v,
		min_x = max_v>min_v?min_v:max_v;
	return val>max_x?max_x:val<min_x?min_x:val;
}
var oMouse=function(e){
	if(e.pageX || e.pageY){
		return {x:e.pageX-(document.documentElement.scrollLeft+document.body.scrollLeft), y:e.pageY-(document.documentElement.scrollTop+document.body.scrollTop)}; 
	}else{//IE
		return{x:e.clientX - document.documentElement.clientLeft,y:e.clientY - document.documentElement.clientTop};
	};
}
//地图拖动事件
function mosemove(){
	$(document).on("mousemove",function(e){
		if(!mapClass.mark_td){return;}
		var oM = oMouse(e||window.event);
		var to_x = mapClass.mark_tdBzb.offset.x+(oM.x+(document.documentElement.scrollLeft+document.body.scrollLeft))
		var to_y = mapClass.mark_tdBzb.offset.y+(oM.y+(document.documentElement.scrollTop+document.body.scrollTop))
		if(true){
			var min_x = (document.documentElement.scrollLeft+document.body.scrollLeft);
			var max_x = $("#map_main")[0].clientWidth-$("#move_box")[0].offsetWidth + (document.documentElement.scrollLeft+document.body.scrollLeft);
			var min_y = (document.documentElement.scrollTop+document.body.scrollTop);;
			var max_y =  $("#map_main")[0].clientHeight-$("#move_box")[0].offsetHeight + (document.documentElement.scrollTop+document.body.scrollTop);
			to_x = inval(to_x,min_x,max_x);
			to_y = inval(to_y,max_y,min_y);
		};
		/*var html_ = "鼠标：" + oM.x + " * " + oM.y + "<br>"
					+ "鼠标：" + (oM.x+(document.documentElement.scrollLeft+document.body.scrollLeft)) + " * " + (oM.y+(document.documentElement.scrollTop+document.body.scrollTop)) + "<br>"
					+ to_x +  " * " + to_y;
		$("#time_bd").html(html_);*/
		$("#move_box").css({"left":to_x+"px","top":to_y+"px"});
		e.returnValue=false;
	});
	if(document.all){//禁用选择文本;
	   $("#map_main")[0].onselectstart= function(){return false;}; //for ie
	}
	$("#map_main").on("mousedown",function(e){
		var oM = oMouse(e||window.event);
		mapClass.mark_tdjb = setTimeout(function(){
			mapClass.mark_td = true;
			$("#move_box").addClass("cur_p");
			var offset = $("#move_box").position();
			mapClass.mark_tdBzb.offset = {
				"x":offset.left - (oM.x+(document.documentElement.scrollLeft+document.body.scrollLeft)),
				"y":offset.top - (oM.y+(document.documentElement.scrollTop+document.body.scrollTop))
			};
			//$("#time_bd1").html(mapClass.mark_tdBzb.offset.x + " * " + mapClass.mark_tdBzb.offset.y); 
		},150)
	}).on("mouseup",function(){
		clearTimeout(mapClass.mark_tdjb);
		mapClass.mark_td = false;
		$("#move_box").removeClass("cur_p");
	})
}
