function ConfigModel(path){//配置数据模型;
	var obj=this;
	this.mapImgBasePath="";//图片基路径;
	this.mapCellSize=0;//单元格大小;
	this.vsize=[0,0];//显示区域大小;
	this.maxLevel=1;
	this.mapViewId="";
	this.mapId="";
	this.isCollapse="";
	this.mapLeft="";
	this.mapTop="";
	this.mapViewLeft="";
	this.mapViewTop="";
	this.path=path;
	
	this.init=function(){
		Util.debug(g_var.trace,"---配置文件初始化开始---");
		var xml=config;
		obj.mapImgBasePath=g_var.path+xml["mapImgBasePath"];
		obj.mapCellSize=xml["mapCellSize"];
		obj.vsize[0]=xml["mapViewWidth"];
		obj.vsize[1]=xml["mapViewHeight"];
		obj.maxLevel=xml["maxLevel"];
		obj.mapViewId=xml["mapViewId"];
		obj.mapId=xml["mapId"];
		obj.isCollapse=xml["isCollapse"];
		obj.mapViewLeft=xml["mapViewLeft"];
		obj.mapViewTop=xml["mapViewTop"];
		
		if(obj.isCollapse=="1"){
			var bodyW=document.body.clientWidth,bodyH=document.body.clientHeight;
			if(document.documentElement){
				bodyW=document.documentElement.clientWidth;
				bodyH=document.documentElement.clientHeight;
			}
			obj.vsize[0]=bodyW-$("#"+obj.mapLeft).outerWidth();
			obj.vsize[1]=bodyH=$("#"+obj.mapTop).outerHeight();
		}
		Util.debug(g_var.trace,obj.mapImgBasePath);
		Util.debug(g_var.trace,obj.mapCellSize);
		Util.debug(g_var.trace,obj.vsize[0]+","+obj.vsize[1]);
		Util.debug(g_var.trace,obj.mapViewId);
		Util.debug(g_var.trace,obj.mapId);
		Util.debug(g_var.trace,obj.isCollapse);
		Util.debug(g_var.trace,obj.mapLeft);
		Util.debug(g_var.trace,obj.mapTop);
		Util.debug(g_var.trace,"配置文件初化结束");
	}//initModel end;
}//ConfigModel end;