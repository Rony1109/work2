function MapModel(){//地图模型;
	var obj=this;
	this.rows=0;//地图总行数;
	this.cols=0;//地图总列数;
	this.orgPoint=[0,0];//相对view的原点左上角;
	this.cenPoint=[0,0];//中心点;
	this.msize=[0,0];//当前地图大小;
	this.csize=0;//当前地图最小单元的大小;
	this.czoom=1;//当前的放大比例;
	this.ozoom=1;//默认比例;
	this.imgPath="";//当前地图的图片基址;
	this.hotArray=new Array();//热区管理;
	this.xArray=new Array();//商铺管理;
	this.mapc=null;//地图容器;
	this.xpId="xpzzjwd";//商铺id;
	this.init=function(view,config,zoom){
		obj.mapc=$("#"+config.mapId);
		obj.csize=config.mapCellSize;
		obj.czoom=zoom;
		obj.mapc.html("");//初始化地图数据，清空;
		//Util.debug(g_var.trace,"---地图模型初始化开始---");

		obj.msize[0]=mapdata["zoom_"+obj.czoom][0];
		obj.msize[1]=mapdata["zoom_"+obj.czoom][1];
		
		obj.imgPath=config.mapImgBasePath+"/zoom_"+obj.czoom;
		
		obj.orgPoint[0]=view.vsize[0]/2-mapdata["zoom_"+obj.czoom][2];
		obj.orgPoint[1]=view.vsize[1]/2-mapdata["zoom_"+obj.czoom][3];
		obj.rows=Math.ceil(obj.msize[1]/config.mapCellSize);
		obj.cols=Math.ceil(obj.msize[0]/config.mapCellSize);	
		
		//Util.debug(g_var.trace,"地图的原点:"+obj.orgPoint[0]+","+obj.orgPoint[1]);
		//Util.debug(g_var.trace,"地图的大小:"+obj.msize[0]+","+obj.msize[1]);
		//Util.debug(g_var.trace,"地图的图片路径："+obj.imgPath);
		//Util.debug(g_var.trace,"地图的行列数："+obj.rows+","+obj.cols);
		//Util.debug(g_var.trace,"地图的当前的放大级数"+obj.czoom);
	}//init end;
	this.setOrgPoint=function(view,x,y){
		obj.orgPoint[0]=view.vsize[0]/2-x;
		obj.orgPoint[1]=view.vsize[1]/2-y;
		obj.mapc.css({top:obj.orgPoint[1]+"px",left:obj.orgPoint[0]+"px"});//设置地图中心点;
	}//setOrgPoint end;
//	this.showMap=function(view){
//	try{
//		//Util.debug(g_var.trace,"重绘了一次");
//		//obj.mapc.css({"width":obj.msize[0]+10+"px","height":obj.msize[1]+10+"px","border":"1px solid red"});
//		obj.mapc.css({"border":"1px solid red"});
//		//Util.debug(g_var.trace,"zoom前后:"+obj.czoom+","+obj.ozoom);
//		obj.mapc.find(".zzjwd").remove();
//		var deltX=-obj.mapc.position().left;
//		var deltY=-obj.mapc.position().top;
//		var col=Math.floor(deltX/obj.csize);
//		var row=Math.floor(deltY/obj.csize);
//		col=col<=0?0:col>=obj.cols?obj.cols-2:col-1;
//		row=row<=0?0:row>=obj.rows?obj.rows-2:row-1;
//		//Util.debug(g_var.trace,"开始行列row:"+row+",col:"+col);
//		
//		var cell=null,mapt=$(Util.createObj("div","mapt"));
//		for(var i=0;i<=Math.ceil(view.vsize[1]/obj.csize)+1;i++){
//			for(var j=0;j<=Math.ceil(view.vsize[0]/obj.csize)+1;j++){
//				if((row+i)<obj.rows&&(col+j)<obj.cols){
//					cell=obj.createCell(row+i,j+col,i+"zx"+j);
//					mapt.append(cell);
//				}//if end;
//			}//for j end;
//		}//for i end;
//		obj.mapc.append(mapt.html());
//	}catch(e){
//		alert(e.toString());
//	}
//	}//showMap end;
	
	
	this.showMap=function(view){
	try{
		//Util.debug(g_var.trace,"重绘了一次");
		obj.mapc.css({"width":obj.msize[0]+10+"px","height":obj.msize[1]+10+"px"});
		//obj.mapc.css({"border":"1px solid red"});
		//Util.debug(g_var.trace,"zoom前后:"+obj.czoom+","+obj.ozoom);
		obj.mapc.find(".zzjwd").css("display","none");
		var deltX=-obj.mapc.position().left;
		var deltY=-obj.mapc.position().top;
		var col=Math.floor(deltX/obj.csize);
		var row=Math.floor(deltY/obj.csize);
		col=col<=0?0:col>=obj.cols?obj.cols-2:col-1;
		row=row<=0?0:row>=obj.rows?obj.rows-2:row-1;
		//Util.debug(g_var.trace,"开始行列row:"+row+",col:"+col);
		
		var cell=null,mapt=$(Util.createObj("div","mapt"));
		for(var i=0;i<=Math.ceil(view.vsize[1]/obj.csize)+1;i++){
			for(var j=0;j<=Math.ceil(view.vsize[0]/obj.csize)+1;j++){
				if((row+i)<obj.rows&&(col+j)<obj.cols){
					cell=obj.createCell(row+i,j+col,i+"zx"+j);
					mapt.append(cell);
				}//if end;
			}//for j end;
		}//for i end;
		obj.mapc.append(mapt.html());
	}catch(e){
		alert(e.toString());
	}
	}//showMap end;
	
	this.createCell=function(row,col,uid){//填充图片;

		//var name=Util.get2Value(parseInt(row*obj.cols+col+1));
		var name=parseInt(row*obj.cols+col+1);
		var bg=obj.imgPath+"/img_"+name+".jpg";

		var Div=$(Util.createObj("DIV",uid));
		Div.css({"width":obj.csize+"px","height":obj.csize+"px","top":row*obj.csize+"px","left":col*obj.csize+"px","background":"url("+bg+") no-repeat","display":"block"});
		Div.addClass("zzjwd");
		return Div;
	}//createCell end;
	
//	this.createCell=function(row,col,uid){//填充图片;
//		var img=Util.createObj("IMG","img"+uid);
//		var name=Util.get2Value(parseInt(row*obj.cols+col+1));
//		//setTimeout(function(){
//			img.src=obj.imgPath+"/img_"+name+".jpg";
//
//		//},1000);
//		
//		img.width=obj.csize;
//		img.height=obj.csize;
//		$(img).css("position","absolute");
//		$(img).css("border","1px solid #ccc");
//		$(img).css("top",row*obj.csize+"px");
//		$(img).css("left",col*obj.csize+"px");
//		//Div.appendChild(img);
//		$(img).addClass("zzjwd");
//		return img;
//	}//createCell end;
	

	
	this.initHotData=function(config){

		//obj.hotArray.length=0;
		var k=mapdata["zoom_"+obj.czoom][0]/mapdata["zoom_"+config.maxLevel][0];
		for(var i=0;i<areadata.length;i++){
			var hot=new HotAreaModel();
			hot.cenPoint[0]=areadata[i]["area"][0]*k;
			hot.cenPoint[1]=areadata[i]["area"][1]*k;
			//hot.cenPoint[0]=areadata[i]["area"][0];
			//hot.cenPoint[1]=areadata[i]["area"][1];
			hot.htype=areadata[i]["type"];
			if(hot.htype=="0"){
				hot.hsize[0]=areadata[i]["area"][2];
				hot.hsize[1]=areadata[i]["area"][3];
			}else{
					hot.hsize[0]=areadata[i]["area"][2]*k;
					hot.hsize[1]=areadata[i]["area"][3]*k;
			}
			hot.bg=g_var.path+"/img/"+areadata[i]["bg"];
			hot.bx=areadata[i]["bx"];
			hot.by=areadata[i]["by"];
			hot.infor=areadata[i]["text"];
			
			hot.czoom=areadata[i]["czoom"];
			hot.nzoom=areadata[i]["nzoom"];
			hot.xId=areadata[i]["xid"];
			hot.createHotArea(obj.mapc,i,k);
			//obj.hotArray.push(hot);
		}
	}//initHotData end;
	

	this.setXData=function(config,xdata){

		var testp=Util.createObj("div",obj.xpId);
		
		for(var i=0;i<xdata.length;i++){
			var hot=new HotAreaModel();
			hot.cenPoint[0]=xdata[i]["coordinates"].split(',')[0];
	
			hot.cenPoint[1]=xdata[i]["coordinates"].split(',')[1];
			hot.xId=xdata[i]["shopId"];
			hot.htype="0";
			hot.czoom=config.maxLevel+","+(config.maxLevel-1)+","+(config.maxLevel-2)+","+(config.maxLevel-3);
			hot.czoom=config.maxLevel;
			hot.flag=xdata[i]["status"];
			
			prefix=hot.xId.substr(0,3);
			firstx=hot.xId.substr(0,1);
			suffix=hot.xId.substr(3,3);
			
			hot.hsize[1]=28;
			if(firstx.indexOf("L")>=0||firstx.indexOf("P")>=0){//前缀为L,P;
    		if(prefix.substr(2,1)%2==0){//序号为偶的时候;
					if(suffix.indexOf("101")>=0||suffix.indexOf("102")>=0||suffix.indexOf("135")>=0||suffix.indexOf("136")>=0){		
							hot.hsize[0]=21;
					}else{
							hot.hsize[0]=14;
					}
				 }else{//序号为奇数的时候;
					if(suffix.indexOf("101")>=0||suffix.indexOf("102")>=0||suffix.indexOf("127")>=0||suffix.indexOf("128")>=0){
							hot.hsize[0]=21;
					}else{
							hot.hsize[0]=14;
					}
				}//序号为偶的时候结束;
    	}else{//前缀为T,M
    		if(suffix.indexOf("101")>=0||suffix.indexOf("102")>=0||suffix.indexOf("127")>=0||suffix.indexOf("128")>=0){		
							hot.hsize[0]=21;
				}else{
							hot.hsize[0]=14;
				}
    	}//if end;
    	hot.createHotArea($(testp),i);
    	obj.xArray.push(hot);
		}//for end;
	}//setXData end;
	
	
	
	this.showXData=function(){
		if(obj.xArray[0].czoom.indexOf(g_var.mc.map.czoom)<0) return false;
		var k=parseInt(mapdata["zoom_"+obj.czoom][0]/mapdata["zoom_"+config.maxLevel][0]*100)/100;
		var testp=Util.createObj("div",obj.xpId);
		$(testp).html("");
		for(var i=0;i<obj.xArray.length;i++){
			obj.xArray[i].createXArea($(testp),i,k);
		}
		obj.mapc.append(testp);
		$(testp).css({"position":"absolute","top":"0px","left":"0px","width":obj.msize[0]+"px","height":obj.msize[1]+"px","z-index":"2"});
	}//showXData end;
	

}//MapModel end;