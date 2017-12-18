function MControl(){//管理控制类;
	var obj=this;
	this.config=new ConfigModel(g_var.path+"data/config.txt");
	this.view=new ViewModel();
	this.map=new MapModel();
	
	this.init=function(){
		g_var.Base=Util.getBasePath();
		obj.config.init();
		if(g_var.noManage==1){
			obj.view.setView(obj.config);
		}else{
			obj.view.init(obj.config);
		}
		obj.map.init(obj.view,obj.config,1);
		
	  obj.map.setOrgPoint(obj.view,mapdata["zoom_"+obj.map.czoom][2],mapdata["zoom_"+obj.map.czoom][3]);
	  obj.map.showMap(obj.view);
		obj.mouseMoveMap();
		
		obj.map.initHotData(obj.config);
		if(g_var.noManage==1){
			obj.regWheelFun();
			Util.getDatax(g_var.relPath+"findEnterpriseGroup","jsonp","",obj.map.setXData);
			obj.locationTo(".downList span");
		}
		//obj.getMouseAtMap();
		
		
		
	}//init end;
	this.mouseMoveMap=function(){
			obj.map.mapc.mousedown(function(evt){
				var ob=this;
				obj.map.mapc.css("cursor","move");
		  	var offset = $(this).position();
		  	var x = evt.pageX - offset.left;
	      var y = evt.pageY - offset.top;
	      $(document).bind("mousemove",function(evt){
	      	g_var.mf=true;
	        var _x=evt.pageX-x;
	        var _y=evt.pageY-y;
	        $(ob).css({top:_y+"px",left:_x+"px"});
	        //Util.debug(g_var.trace,"地图原点x:"+$(ob).position().left+",y:"+$(ob).css("top")+"::_x="+_x+",_y"+_y);
	        obj.map.showMap(obj.view);
	       });
	      $(document).mouseup(function(){
		       $(document).unbind("mouseup");
					 $(this).unbind("mousemove");
					 obj.map.mapc.css("cursor","default");
					if(g_var.mf){
						 var topy=obj.map.mapc.position().top;
						 var leftx=obj.map.mapc.position().left;
						 var mintopy=obj.view.vsize[1]-obj.map.msize[1];
						 var minleftx=obj.view.vsize[0]-obj.map.msize[0];
						 topy=topy<mintopy?mintopy:topy>0?0:topy;
						 leftx=leftx<minleftx?minleftx:leftx>0?0:leftx;
						 if(obj.map.msize[0]<obj.view.vsize[0]){
						 	leftx=leftx<minleftx?minleftx/2:leftx>0?minleftx/2:leftx;
						}
						 obj.map.mapc.animate({top:topy+"px",left:leftx+"px"},function(){
						 	obj.map.showMap(obj.view);
						});
					}
	     	g_var.mf=false;
				 });
			});
		
	}//mouseMoveMap end;
		this.mouseWheelFun=function(evt){
			obj.map.hotArray=null;
			obj.map.hotArray=new Array();
			Util.debug(g_var.trace,"鼠标事件");
			var mouseVP=[0,0];//相对于视图坐标原点的值;
			var deltXY=[0,0];//鼠标点与地图原点在视图坐标系里的差值,这点也是鼠标点在地图坐标系里的坐标值;
			mouseVP[0]=evt.clientX-obj.view.orgPoint[0];
			mouseVP[1]=evt.clientY-obj.view.orgPoint[1];//求得当前鼠标相对视图中的坐标;

			deltXY[0]=mouseVP[0]-obj.map.mapc.position().left;
			deltXY[1]=mouseVP[1]-obj.map.mapc.position().top;//当前不放大缩小前的差值;
			
			var ozoom=obj.map.czoom;
			var deltXY1=[0,0];//放大缩小后的值;
			
			var delZoom=evt.wheelDelta||evt.detail;
			delZoom=delZoom>0?1:-1;
			obj.map.czoom=delZoom*1+parseInt(obj.map.czoom);

			obj.map.czoom=obj.map.czoom>obj.config.maxLevel?obj.config.maxLevel:obj.map.czoom<=0?1:obj.map.czoom;
			var k=mapdata["zoom_"+obj.map.czoom][0]/mapdata["zoom_"+ozoom][0];
	
			deltXY1[0]=deltXY[0]*k;
			deltXY1[1]=deltXY[1]*k;
		
			var deltx=deltXY1[0]-deltXY[0];
			
			var delty=deltXY1[1]-deltXY[1];
			
			var newP=[0,0];
			newP[0]=obj.map.mapc.position().left-deltx;
			//newP[0]=obj.view.orgPoint[0]/2-newP[0];
			newP[1]=obj.map.mapc.position().top-delty;
			//newP[1]=obj.view.orgPoint[1]/2-newP[1];
			

			obj.map.init(obj.view,obj.config,obj.map.czoom);
			obj.map.mapc.css({top:newP[1]+"px",left:newP[0]+"px"});//设置地图中心点;
	 	 	obj.map.showMap(obj.view);
	 	 	obj.map.initHotData(obj.config);
	 	 	if(g_var.noManage==1){
	 	 		obj.map.showXData();
	 	 	}
	 	 	
	 	 	Util.debug(g_var.trace,"热区的个数"+obj.map.hotArray.length);
			
	}//mouseWheelMap end;
	this.regWheelFun=function(){
		$(document).bind("mousewheel",obj.mouseWheelFun);
		if(document.addEventListener){ 
			document.addEventListener('DOMMouseScroll',obj.mouseWheelFun); 
		}

	}//regWheelFun end;
	
	this.getMouseAtMap=function(){
		
		obj.map.mapc.mousemove(function(evt){
			var mapx,mapy;
			mapx=obj.map.mapc.position().left;
			mapy=obj.map.mapc.position().top;
			mapx=evt.pageX-mapx-obj.view.orgPoint[0];
			mapy=evt.pageY-mapy-obj.view.orgPoint[1];
			Util.debug(g_var.trace,"mouseX:"+mapx+"mouseY:"+mapy);
		});
	}//getMouseAtMap end;
	
	this.gotoMapAt=function(zoom,cx,cy){
		obj.map.init(obj.view,obj.config,zoom);
	  obj.map.setOrgPoint(obj.view,cx,cy);
	  obj.map.showMap(obj.view);
	  	if(g_var.noManage==1){
	 	 		obj.map.showXData();
	 	 	}
	  
	}//gotoMapAt end;
	
	this.locationTo=function(downList){
		$(downList).click(function(){
			var k=mapdata["zoom_"+obj.config.maxLevel][0]/mapdata["zoom_"+obj.map.czoom][0];
			var i=$(this).attr("name");
			obj.map.setOrgPoint(obj.view,areadata[i]["area"][0]/k,areadata[i]["area"][1]/k);
			obj.map.showMap(obj.view);
		});
	}//locationTo end;
}//MControl end;




