function ViewModel(){//显示区域模型;
	var obj=this;
	this.orgPoint=[0,0];//显示区域原点位置;
	this.vsize=[0,0];//当前可见区域的大小;
	this.vcId="";
	this.init=function(config){
		Util.debug(g_var.trace,"---显示区域模型初始化开始---");
		
		
		obj.vsize=config.vsize;
		obj.vcId=config.mapViewId;
		var vc=$("#"+obj.vcId);
		vc.width(parseInt(obj.vsize[0]));
		vc.height(parseInt(obj.vsize[1]));
		obj.orgPoint[0]=Util.getLeft(vc[0]);
		obj.orgPoint[1]=Util.getTop(vc[0]);
		
		obj.autoSize();
		
		Util.debug(g_var.trace,"---初始化显示区域模型成功---");
		Util.debug(g_var.trace,"显示区域模型初始回显信息 如上：");
		Util.debug(g_var.trace,"显示区域原点x:"+obj.orgPoint[0]+",y:"+obj.orgPoint[1]);
		Util.debug(g_var.trace,"显示区域大小width:"+obj.vsize[0]+",height:"+obj.vsize[1]);
		Util.debug(g_var.trace,"---显示区域模型回显结束!");
	}//init end;
	
	this.setView=function(config){
		Util.debug(g_var.trace,"--设置视图开始--");
		obj.vcId=config.mapViewId;
		var vc=$("#"+obj.vcId);
		obj.vsize=Util.getBodyWH();
		obj.vsize[0]=obj.vsize[0]-config.mapViewLeft;
		obj.vsize[1]=obj.vsize[1]-config.mapViewTop;
		vc.width(parseInt(obj.vsize[0]));
		vc.height(parseInt(obj.vsize[1]));
		obj.orgPoint[0]=Util.getLeft(vc[0]);
		obj.orgPoint[1]=Util.getTop(vc[0]);
		
		Util.debug(g_var.trace,"---初始化显示区域模型成功---");
		Util.debug(g_var.trace,"显示区域模型初始回显信息 如上：");
		Util.debug(g_var.trace,"显示区域原点x:"+obj.orgPoint[0]+",y:"+obj.orgPoint[1]);
		Util.debug(g_var.trace,"显示区域大小width:"+obj.vsize[0]+",height:"+obj.vsize[1]);
		Util.debug(g_var.trace,"---显示区域模型回显结束!");
		
	}//setView end;
	this.autoSize=function(){
		$("#"+obj.vcId).resize(function(){
			obj.vsize=Util.getBodyWH();
			obj.vsize[0]=obj.vsize[0]-config.mapViewLeft;
			obj.vsize[1]=obj.vsize[1]-config.mapViewTop;
			vc.width(parseInt(obj.vsize[0]));
			vc.height(parseInt(obj.vsize[1]));
			obj.orgPoint[0]=Util.getLeft(vc[0]);
			obj.orgPoint[1]=Util.getTop(vc[0]);
		});
	}//autoSize end;
	
	this.addDiv=function(id,bg,w,h){
		var div=Util.createObj("div",id);
		$(div).css("background",bg);
		$(div).css({"width":w,"height":h,"z-index":5,"right":"25px","top":"10px","position":"absolute"});
		$("#"+obj.vcId).append(div);
	}//addDiv end;
}//ViewBound end;