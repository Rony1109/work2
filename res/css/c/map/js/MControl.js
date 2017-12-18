function MControl(){//管理控制类;
	var obj=this;
	this.config=new ConfigModel(g_var.path+"data/config.txt");
	this.view=new ViewModel();
	this.map=new MapModel();
	this.labelData=new Array();
  this.imgIcon=new Array("A","B","C","D","E","F","G","H","I","J");
  this.ptData=new Array();
	
	this.init=function(){
		
		Util.mLeaveIE();
		g_var.Base=Util.getBasePath();
		obj.config.init();
		obj.view.setView(obj.config);
		obj.map.init(obj.view,obj.config,2);
	  obj.map.setOrgPoint(obj.view,mapdata["zoom_"+obj.map.czoom][2],mapdata["zoom_"+obj.map.czoom][3]);
	  obj.map.showMap(obj.view);
		obj.mouseMoveMap();
		obj.map.initHotData(obj.config);
		obj.regWheelFun();
		//Util.getDatax(g_var.relPath+"?path=findEnterpriseGroup","jsonp","",obj.map.setXData);
		obj.locationToMax(".downList span");
		
		Util.setScroll("#bar span","#bar","#slideCon ul");
    obj.addZoomEvent();
		obj.getMouseAtMap();
		obj.addSoEvent();
		obj.pageHandler();
		obj.ptaoService();
		obj.submitForm();
		
	}//init end;
	this.mouseMoveMap=function(){
			obj.map.mapc.mousedown(function(evt){
				g_var.downf=true;
				var ob=this;
				obj.map.mapc.css("cursor","url(//res.csc86.com/css/c/map/img/img_02.ico),move");
		  	var offset = $(this).position();
		  	var xx = evt.pageX - offset.left;
	      var yy = evt.pageY - offset.top;
	      $(document).bind("mousemove",function(evt){
	      	if(!g_var.downf) return;
	      	g_var.mf=true;
	        var _x=evt.pageX-xx;
	        var _y=evt.pageY-yy;
	        $(ob).css({top:_y+"px",left:_x+"px"});
	        //Util.debug(g_var.trace,"地图原点x:"+$(ob).position().left+",y:"+$(ob).css("top")+"::_x="+_x+",_y"+_y);
	        
	       });
	      $(document).mouseup(function(evt){

	      	g_var.downf=false;
	      	$(document).unbind("mouseup");
	      	$(document).unbind("mousemove");
	      	
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
						if(obj.map.mapc.is(':animated')){obj.map.mapc.stop(true,true);}
						 obj.map.mapc.animate({top:topy+"px",left:leftx+"px"},function(){
						 	obj.map.showMap(obj.view);
						});
	      	}
		       g_var.mf=false;
				 });
			});
		
	}//mouseMoveMap end;
		this.mouseWheelFun=function(evt){
			
			//Util.debug(g_var.trace,"滚动的源"+evt.target.id);
			if(!evt.target.id) return;
			if(evt.target.id=="vc") return;
			if(evt.target.id=="sov") return;
			
		
			obj.map.hotArray.length=0;
			//Util.debug(g_var.trace,"鼠标事件");
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
			obj.map.init(obj.view,obj.config,obj.map.czoom);
			obj.map.mapc.css({top:newP[1]+"px",left:newP[0]+"px"});//设置地图中心点;
	 	 	obj.map.showMap(obj.view);
	 	 	obj.map.initHotData(obj.config);
	 	 	obj.initLabel();
	 	 	obj.initPT();
	 	 	var z=parseInt(obj.map.czoom);
			obj.zoomer(z);
			t=parseInt(130+(8-obj.map.czoom)*95/7);
			$("#bnbt").css("top",t+"px");
	 	 	//obj.map.showXData();
	
	 	 //alert(estime);
	 	 	//Util.debug(g_var.trace,"热区的个数"+obj.map.hotArray.length);
			
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
	 	obj.map.showXData();
	}//gotoMapAt end;
	
	this.locationTo=function(downList){
		$(downList).click(function(){
			
			var k=mapdata["zoom_"+obj.config.maxLevel][0]/mapdata["zoom_"+obj.map.czoom][0];
			var i=$(this).attr("name");
			obj.map.setOrgPoint(obj.view,areadata[i]["area"][0]/k,areadata[i]["area"][1]/k);
			obj.map.showMap(obj.view);
			obj.map.initHotData(obj.config);
		});
	}//locationTo end;
	
	this.locationToMax=function(downList){
		var downbt=".sobt",boxList=".downList",spanId=downList,sov="#sov",pbox=".sobox";
		$(downList).click(function(){
			$(sov).val($(this).text());
			$(sov).attr("name",$(this).attr("name"));
			$(".downList").hide();
			var i=$(this).attr("name");
			obj.map.init(obj.view,obj.config,obj.config.maxLevel);
			obj.map.setOrgPoint(obj.view,areadata[i]["area"][0],areadata[i]["area"][1]);
			obj.map.showMap(obj.view);
			obj.map.showXData();
			obj.map.initHotData(obj.config);
		});
		$(sov).css("cursor","pointer");
		$(downbt).mouseenter(function(){
			$(boxList).show();
			//$(boxList).slideDown("fast");
		});
		$(sov).click(function(){
			$(boxList).show();
			//$(boxList).slideDown("fast");
		});
		$(pbox).mouseleave(function(){
			$(boxList).hide();
		});
		$(sov).focus(function(){
			$(this).blur();
		});
	}//locationToMax end;
	this.zoomer=function(z){
			var mouseVP=[0,0];//相对于视图坐标原点的值;
			var deltXY=[0,0];//当前视图中心点与地图原点在视图坐标系里的差值,这点也是鼠标点在地图坐标系里的坐标值;
			mouseVP[0]=obj.view.vsize[0];
			mouseVP[1]=obj.view.vsize[1];//求得当前视图中心的坐标;
	
			deltXY[0]=mouseVP[0]-obj.map.mapc.position().left;//求得当前地图的在视图中显示的中心点;
			deltXY[1]=mouseVP[1]-obj.map.mapc.position().top;//当前不放大缩小前的差值;
				
			var ozoom=obj.map.czoom;
			var deltXY1=[0,0];//放大缩小后的值;
			
			obj.map.czoom=z;
			
			obj.map.czoom=obj.map.czoom>obj.config.maxLevel?obj.config.maxLevel:obj.map.czoom<=0?1:obj.map.czoom;
			var k=mapdata["zoom_"+obj.map.czoom][0]/mapdata["zoom_"+ozoom][0];
	
			deltXY1[0]=deltXY[0]*k;
			deltXY1[1]=deltXY[1]*k;
		
			var deltx=deltXY1[0]-deltXY[0];
			
			var delty=deltXY1[1]-deltXY[1];
			
			var newP=[0,0];
			newP[0]=obj.map.mapc.position().left-deltx;
			
			newP[1]=obj.map.mapc.position().top-delty;	
			obj.map.hotArray.length=0;	
			obj.map.init(obj.view,obj.config,obj.map.czoom);
			obj.map.mapc.css({top:newP[1]+"px",left:newP[0]+"px"});//设置地图中心点;
	 	 	obj.map.showMap(obj.view);
	 	 	obj.map.initHotData(obj.config);
	 	 	obj.initLabel();
	 	 	obj.initPT();
	}//zoomer end;
	
	this.addZoomEvent=function(){
		var flag=false;
		var clikf=false;
		var z=parseInt(obj.map.czoom);
			obj.zoomer(z);
			t=parseInt(225-(obj.map.czoom)*95/7);
			$("#bnbt").css("top",t+"px");
			
		$("#cq").bind("click",function(){
			if(!clikf){
				$("#ks").animate({top:-30+"px"},function(){
			});
			clikf=true;
			}else{
				$("#ks").animate({top:0+"px"},function(){});	
				clikf=false;
			}
			
		});
		$("#ziBt").bind("click",function(){
			var z=1+parseInt(obj.map.czoom);
			obj.zoomer(z);
			t=parseInt(225-(obj.map.czoom)*95/7);
			$("#bnbt").css("top",t+"px");
		});
		$("#zoBt").bind("click",function(){
			var z=-1+parseInt(obj.map.czoom);
			obj.zoomer(z);
			t=parseInt(130+(8-obj.map.czoom)*95/7);
			$("#bnbt").css("top",t+"px");
		});
		$("#bnbt").mousedown(function(){
			flag=true;
			$("body").mousemove(function(evt){
				var topy=evt.pageY-130;
				topy=topy<130?130:topy>225?225:topy;
				$("#bnbt").css("top",topy+"px");
			});
		});
		$("body").mouseup(function(){
			$("body").unbind("mousemove");
			if(flag){
				flag=false;
				var zoom=8-Math.floor(($("#bnbt").css("top").split('p')[0]-130)*7/95);
				//alert(zoom);
				obj.zoomer(zoom);
			}
		});
		
		$("#rBt").mouseover(function(){
			$(this).addClass("rBton");
		}).mouseout(function(){
			$(this).removeClass("rBton");
		}).click(function(){
				var topy1=obj.map.mapc.position().top;
				var leftx1=obj.map.mapc.position().left;
				leftx1=leftx1-200;
				obj.map.mapc.animate({top:topy1+"px",left:leftx1+"px"},function(){
				obj.map.showMap(obj.view);
				
			});
		});
		$("#lBt").mouseover(function(){
			$(this).addClass("lBton");
		}).mouseout(function(){
			$(this).removeClass("lBton");
		}).click(function(){
				var topy1=obj.map.mapc.position().top;
				var leftx1=obj.map.mapc.position().left;
				leftx1=leftx1+200;
				obj.map.mapc.animate({top:topy1+"px",left:leftx1+"px"},function(){
				obj.map.showMap(obj.view);
				
			});
		});
		$("#tBt").mouseover(function(){
			$(this).addClass("tBton");
		}).mouseout(function(){
			$(this).removeClass("tBton");
		}).click(function(){
				var topy1=obj.map.mapc.position().top;
				var leftx1=obj.map.mapc.position().left;
				topy1=topy1+200;
				obj.map.mapc.animate({top:topy1+"px",left:leftx1+"px"},function(){
				obj.map.showMap(obj.view);
				
			});
		});
		$("#bBt").mouseover(function(){
			$(this).addClass("bBton");
		}).mouseout(function(){
			$(this).removeClass("bBton");
		}).click(function(){
				var topy1=obj.map.mapc.position().top;
				var leftx1=obj.map.mapc.position().left;
				topy1=topy1-200;
				obj.map.mapc.animate({top:topy1+"px",left:leftx1+"px"},function(){
				obj.map.showMap(obj.view);
				
			});
		});
		$("#changPanel").click(function(){
			$(".cp").css("display","none");
			$("#kuaijie").css("display","block");
		});
		
			$("#slideCon ul li").live("click",function(evt){
				var ob=null
				if(evt.target.tagName=="LI"){
					ob=$(evt.target).find("h2");
				}
				if(evt.target.tagName=="H2"){
					ob=$(evt.target);
				}
				if(evt.target.tagName=="P"){
					ob=$(evt.target).parent().find("h2");
				}
				$("#slideCon ul li.curLi").removeClass("curLi");
				$(this).addClass("curLi");
				$("#label"+ob.attr("name")).trigger("mouseenter");
				//Util.moveMap(200);
			});
			
	}//addZoomEvent end;
	this.sosoKey=function(keyV,url,page){
		if(keyV==""||keyV=="请输入商家名称或商铺号") return;
		var x1,x2,y1,y2,qstr,k;
		obj.map.czoom=1;
		
		t=parseInt(130+(8-obj.map.czoom)*95/7);
	  $("#bnbt").css("top",t+"px");
	  
		k=parseInt(obj.config.maxLevel/obj.map.czoom*100)/100;
		qstr="en="+encodeURI(keyV);
		
		qstr+="&page="+page;
		qstr+="rnd="+Math.random();
		var data=Util.getData(url,"jsonp",qstr);
		obj.initPage(data["page"]["pagesize"],page);
		$(".cp").css("display","block");
			$("#kuaijie").css("display","none");
		if(data["page"]["total"]>0){
			
			obj.map.init(obj.view,obj.config,1);
	  	obj.map.setOrgPoint(obj.view,mapdata["zoom_"+obj.map.czoom][2],mapdata["zoom_"+obj.map.czoom][3]);
	  	obj.map.showMap(obj.view);
	  	obj.map.initHotData(obj.config);
			obj.initList(data["page"]);
			obj.labelData.length=0;
			obj.labelData=data["coordinatesList"];
		  obj.initLabel();
		  obj.initListIcon();
		}else{
			$("#pt").text("共有"+data["page"]["total"]+"条结果").show();
			$("#slideCon ul").html('<div>很抱歉，没有找到符合<i>"'+$("#soInput").val()+'" </i>的结果！</div>');
			$(".pageBar").hide();
		}
	}//sosoKey end;
	this.addSoEvent=function(){
		$("#soInput").keyup(function(evt){
			if(evt.keyCode==13){
				$("#sobt").trigger("click");
			}
			if(evt.keyCode==8){
				if($(this).val().length<=1){
					//$(this).blur();
					//$(this).val("请输入商家名称或商铺号");
					//$(this).css("color","#e3e3e3");
				}else{
					//$(this).css("color","#000");
				}
			}
			
		});
		$("#sobt").click(function(){
			//alert("ddd");
			obj.sosoKey($("#soInput").val(),g_var.relPath+"?path=findEnterpriseByParamKey",0);
		});
		$("#soInput").focus(function(){
			if($(this).val().indexOf("请输入商家名称或商铺")<0){
			}else{
				$(this).val("");
				$(this).css("color","#000");
			}
			
		}).blur(function(){
			if($(this).val()!=""){
				
			}else{
				$(this).val("请输入商家名称或商铺号");
				$(this).css("color","#e3e3e3");
			}
			
		});
	}//addSoEvent end;
	
	this.initList=function(data){
		$("#pt").text("共有"+data["total"]+"条结果");
		//alert(data["pagesize"]);
	
		//alert(data["list"].length);
		var html="";
		var list=data["list"];
		for(var i=0;i<list.length;i++){
			html+="<li><h2 title='"+list[i]["enterpriseName"]+"'>"+list[i]["enterpriseName"]+"</h2>";
			html+="<p>主营行业："+list[i]["industry"]+"</p>";
			html+="<p>商铺号："+list[i]["shopId"]+"</p>";
			html+="</li>";
		}
		
		$("#slideCon ul").html(html);
	}//initList end;
	this.initLabel=function(){
		var labelArray="";
		var data=obj.labelData;
		
		var k=parseInt(mapdata["zoom_"+obj.map.czoom][0]/mapdata["zoom_"+config.maxLevel][0]*100)/100;
		for(var i=0;i<data.length;i++){
			var hot=new HotAreaModel();
			hot.cenPoint[0]=(data[i]["coordinates"].split(',')[0]-500)*k;
			hot.cenPoint[1]=(data[i]["coordinates"].split(',')[1]-250)*k;
			if(i>9){
				hot.bg=g_var.path+"img/def.png";
			}else{
				hot.bg=g_var.path+"img/"+obj.imgIcon[i]+".png";
			}
			
			hot.xId=data[i]["shopId"];
			hot.hsize[0]=21;
			hot.hsize[1]=29;
			hot.createLabel(obj.map.mapc,i,k);
		}
	}//initLabel end;
	this.initPage=function(pagesize,page){
		var bar=$(".pageBar");
		switch(pagesize){
			case 1:
				bar.html('<a href="javascript:;" class="cur">1</a>');
				break;
			case 2:
			 bar.html('<a href="javascript:;" class="cur">1</a><a href="javascript:;" >2</a>');
			 break;
			case 3:
			 bar.html('<a href="javascript:;" class="cur">1</a><a href="javascript:;" >2</a><a href="javascript:;" >3</a>');
			 break;
			case 4:
				bar.html('<a href="javascript:;" class="cur">1</a><a href="javascript:;" >2</a><a href="javascript:;" >3</a><a href="javascript:;" >4</a>');
			  break;
			default:
				
			  //bar.html('<a href="javascript:;">上一页</a><a href="javascript:;" class="cur">1</a><a href="javascript:;" >2</a><a href="javascript:;" >3</a><a href="javascript:;" >4</a><a href="javascript:;">下一页</a>');
		}
		
	}//initPage end;
	this.pageHandler=function(){
		var html="";
		var page=0;
		$(".pageBar").live("click",function(evt){
			if($(evt.target).text()=="上一页"){
				page=parseInt($(".pageBar .cur").text());
				obj.sosoKey($("#soInput").val(),g_var.relPath+"?path=findEnterpriseByParamKey",page-1);
				if(page>1){
					html='<a href="javascript:;">上一页</a><a href="javascript:;"  class="cur" >'+(page-1)+'</a><a href="javascript:;">'+(page)+'</a><a href="javascript:;">'+(page+1)+'</a><a href="javascript:;">'+(page+2)+'</a><a href="javascript:;">下一页</a>';
				}else{
					html='<a href="javascript:;">上一页</a><a href="javascript:;"  class="cur" >'+(page)+'</a><a href="javascript:;">'+(page+1)+'</a><a href="javascript:;">'+(page+2)+'</a><a href="javascript:;">'+(page+3)+'</a><a href="javascript:;">下一页</a>';
				}
				
				$(this).html(html);
			}
			if($(evt.target).text()=="下一页"){
				page=parseInt($(".pageBar .cur").text());
				obj.sosoKey($("#soInput").val(),g_var.relPath+"?path=findEnterpriseByParamKey",page+1);
				html='<a href="javascript:;">上一页</a><a href="javascript:;"  class="cur" >'+(page+1)+'</a><a href="javascript:;">'+(page+2)+'</a><a href="javascript:;">'+(page+3)+'</a><a href="javascript:;">'+(page+4)+'</a><a href="javascript:;">下一页</a>';
				$(this).html(html);
			}
			if(parseInt($(evt.target).text())){

				$(".pageBar .cur").removeClass("cur");
				$(evt.target).addClass("cur");
				page=$(evt.target).text();
				//alert(page);
				obj.sosoKey($("#soInput").val(),g_var.relPath+"?path=findEnterpriseByParamKey",page);
			}
		});
	}//pageHandler end;
	
	this.initListIcon=function(){
		$("#slideCon ul h2").each(function(i){
			$(this).css("background","url("+g_var.path+"img/"+obj.imgIcon[i]+".png) no-repeat");
			$(this).attr("name",i);
		});
		
	}//initListIcon end;
	
	this.ptaoService=function(){
		$("#close").live("click",function(){
			$("#mingp").hide();
		});
		$("#kuaijie .knav li").click(function(evt){
			
	    
			obj.map.init(obj.view,obj.config,1);
	  	obj.map.setOrgPoint(obj.view,mapdata["zoom_"+obj.map.czoom][2],mapdata["zoom_"+obj.map.czoom][3]);
	  	obj.map.showMap(obj.view);
			$("#tpzzjwd").hide();
			t=parseInt(130+(8-obj.map.czoom)*95/7);
	    $("#bnbt").css("top",t+"px");
			var dat=pts[$(evt.target).attr("name")];
			obj.ptData=dat;
			obj.map.initHotData(obj.config);
			obj.initPT();
			
		});
	}//ptaoService end;
	
	this.initPT=function(){
		var datax=obj.ptData;
		//alert(data.length);
		var k=parseInt(mapdata["zoom_"+obj.map.czoom][0]/mapdata["zoom_"+config.maxLevel][0]*100)/100;
			for(var i=0;i<datax.length;i++){
				var hot=new HotAreaModel();
				hot.cenPoint[0]=(datax[i]["area"][0])*k;
				hot.cenPoint[1]=(datax[i]["area"][1])*k;
				if(i>9){
					hot.bg=g_var.path+"img/def.png";
				}else{
					hot.bg=g_var.path+"img/"+obj.imgIcon[i]+".png";
				}
				hot.infor=datax[i]["text"];
				hot.hsize[0]=21;
				hot.hsize[1]=29;
	
				hot.createLabel2(obj.map.mapc,i,k);
			}
}//initPT end

	this.submitForm=function(){
				$("#formBt").click(function(){
			if(!isFlag){window.location.href="//member.csc86.com/login/phone/";return false;}
			var inputArray=$("#form").find('input[type=text]');
			for(var i=0;i<inputArray.length;i++){
				if($(inputArray[i]).attr("tit")=="0"){
					$(inputArray[i]).css("border","1px solid red");
					return false;
				}
			}
			var qstr=getFormData($(".item"));
			$.get("//cncms.csc86.com/formguide/index.php",qstr,function(data){
				if(data.status == true){
					qstr="naame=1&"+qstr;
					document.cookie=qstr;
					$("#form .new").show();
					$("#form .new").eq(0).text($("#select").val());
					var ba=$("#form").find('.cl');
					for(var i=0;i<ba.length;i++){
						$("#form .new").eq(i+1).text($(ba[i]).val());
					}
					$("#select").hide();
					$("#form").find('.cl').hide();
					$("#formBt").hide();
					$("#form .new").show();
					$("#moddBt").show();
				}else{
					alert("申请失败，请刷新后重试！");
				}
			},"jsonp");
			
		});
		$("#moddBt").click(function(){
			$("#select").show();
			$("#form").find('.cl').show();
			$("#form .new").hide();
			$("#formBt").show();
			$(this).hide();
		});
		obj.valFormData($('input[type="text"]'));
		
		if(document.cookie.indexOf("naame=1")>=0){
				str=obj.getCookie("naame").split('&');
				var ina=$("#form .new");
				for(var i=4,j=0;i<str.length;i++,j++){
					$(ina[j]).text(str[i].split('=')[1]);
				}
				$("#select").hide();
				$("#form").find('.cl').hide();
				$("#formBt").hide();
				$("#form .new").show();
				$("#moddBt").show();
				return;
			}

	}
	this.valFormData=function(ob){
		ob.each(function(){
		$(this).blur(function(){
		  
			if($(this).attr("zrequired")=="1"){
			if($(this).val()==""){
				$(this).css("border","1px solid red");
				$(this).attr("tit","0");

					}
					else if(!(new RegExp($(this).attr("zpattern")).test($(this).val()))){
						$(this).css("border","1px solid red");
						$(this).attr("tit","0");
					}else{$(this).attr("tit","1");}
		}else{
			if($(this).val()==""){
						$(this).attr("tit","1");
					}
					else if(!(new RegExp($(this).attr("zpattern")).test($(this).val()))){
						$(this).css("border","1px solid red");
						$(this).attr("tit","0");
					}else{$(this).attr("tit","1");}
		}
		if($(this).attr("tit")=="1"){$(this).css("border","1px solid #dedddd");}
		
		});
	});
	}//valFormData end;
	this.getCookie=function(ob){
		var str=document.cookie.split(';');
		for(var i=0;i<str.length;i++){
			if(str[i].indexOf(ob)>=0){
				 return decodeURI(str[i]);
				 }
		}
		return false;
	}//getCookie end;
}//MControl end;




