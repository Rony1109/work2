
/* 工具类开始*/
Util=new Object();
Util.getTop=function(obj){
	var t = obj.offsetTop;
	while(obj = obj.offsetParent){
		t += obj.offsetTop;
	}
	return t;
};
Util.getLeft=function(obj){
	var t = obj.offsetLeft;
	while(obj = obj.offsetParent){
		t += obj.offsetLeft;
	}
	return t;
};


Util.createObj=function(eName,id){
	var obj=document.getElementById(id);
	if(obj){
		return obj;
	}
	obj=document.createElement(eName);
	obj.id=id;
	return obj;
	
}//createObj end;

Util.createUniqueID = function(prefix) {
    if (prefix == null) {
        prefix = "zzjwd_";
    }
    return prefix + Math.round(Math.random() * 10000000);        
};

Util.getData=function(path,dtype,qstr){
	var data=null;
	//alert(path);
	$.ajax({
		type: "GET",
		url:path,
		async: false, 
		dataType:dtype,
		data:qstr,
		success:function(d){
        		data=d["status"];
        	
        },
        error: function (d) { alert("err:ajax报错"); }
    });

    return data;
}//getXml end;
Util.moveMap=function(w){
	Util.debug(g_var.trace,"移动进来");
	var deltx=g_var.mxy[0];
	var delty=g_var.mxy[1];
	delty=delty-300>0?0:300-delty;
	delty=g_var.mc.map.mapc.position().top+delty;
	
	deltx=w-deltx>0?w-deltx:g_var.mc.view.vsize[0]-deltx>w?0:g_var.mc.view.vsize[0]-deltx-w;
	deltx=g_var.mc.map.mapc.position().left+deltx;
	try{
		if(g_var.mc.map.mapc.is(':animated')){obj.map.mapc.stop(true,true);}
		}catch(e){
			//alert(e.toString());
			}
	g_var.mc.map.mapc.animate({top:delty+"px",left:deltx+"px"},function(){
		g_var.mc.map.showMap(g_var.mc.view);
	});

}//moveMap end;

Util.getDatax=function(path,dtype,qstr,fn){
	$.ajax({
        type: "GET",
        url: path,
        async: false, 
        dataType: dtype,
        data:qstr,
        success: function (d) {
					fn(g_var.mc.config,d["status"]);
        },
        error: function (d) { alert("err:ajax报错"); }
    });
}//getXml end;


Util.get2Value=function(v){
	if((v+"").length<2){
		return "0"+v;
	}
	return v;
}//get2Value end;

Util.getBasePath=function(){
	var reg = /^http:\/\/[^\/]+\//i;
	return location.href.match(reg)+"bops-app/bops/";
}//getBasePath end;

Util.getBodyWH=function(){
	 var wW=document.body.clientWidth,wH=document.body.clientHeight;
		if(document.documentElement){
			wH=document.documentElement.clientHeight;
			wW=document.documentElement.clientWidth;
		}
		return [wW,wH];
}//getBodyWidth end;



Util.debug=function(obj,val){
	if(!g_var.debug){
		return;
	}
	var promt=document.createElement("DIV");
	$(promt).text("|| "+val+" ||");
	if(obj){
		
	}else{
		obj=document.createElement("DIV");
		g_var.trace=obj;
		$(obj).width(200);
		$(obj).height(400);
		$(obj).css("z-index",2);
		$(obj).css("position","absolute");
		$(obj).css("left",0);
		$(obj).css("top",0);
		$(obj).css("overflow","auto");
		$(obj).css("background","#000");
		$(obj).css("color","#fff");
		$("body").append(obj);
	}
	
	var fc=obj.firstChild;
	if(fc){
		obj.insertBefore(promt,fc);
	}else{
		obj.appendChild(promt);
	}
	
}//debug end;

Util.mLeaveIE=function(){
	$("body").mouseleave(function(){
		$(document).trigger("mouseup");
	});
}//mLeaveIE end;

Util.setScroll=function(bar,barBg,obj){
	var topy0=152;
	$(bar).bind("mousedown",function(){
		$("#slideCon").bind("mousemove",function(e){
			//alert("ddd");
			var topy=e.pageY;
			$(bar).offset({top:topy});
			$(obj).scrollTop(topy-topy0);
		});
	});
	$("body").mouseup(function(){
		$("#slideCon").unbind("mousemove");
	});
	
}//setHeight end;