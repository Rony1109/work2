function HotAreaModel(){
	var obj=this;
	this.cenPoint=[0,0];//热区的中心点;
	this.hsize=[0,0];//热区的大小;
	this.infor="";//热区的提示信息;
	this.htype="0";//热区的类弄;0为普通，1为可点击;
	this.czoom="1";//在哪个级上显示;
	this.nzoom="6";//热区点击进入下一层级;
	this.bgcolor="#cfedf7";//热区的背景色;
	this.tp="无语";//热区上的文字信息;
	this.hotObj=null;//热区对像;
	this.tpw=309;//提示面板的宽;
	this.tph=285;//提示面板的高;
	this.tpId="tpzzjwd";//热区公用的提示标签id;
	this.xId="";//特殊标志;检查商铺标志;
	this.bg="";//热区背景;
	this.bx="";//热区背景位置;
	this.by="";//热区背景位置;
	this.flag="";//商铺标志;
	this.dataModel=new Object();
	
	this.init=function(){ 
	}//init end;
	this.createHotArea=function(pc,i,k){//i为id序号;
		if(obj.czoom.indexOf(g_var.mc.map.czoom)<0) return false;
		obj.hotObj=Util.createObj("DIV","zzjwdhot"+i);
		var obHot=$(obj.hotObj);
		obHot.width(obj.hsize[0]);//19;
		obHot.height(obj.hsize[1]);//20;
		//url(images/icon_mark.png);
		obHot.attr("name",obj.xId);
		//obHot.attr("title",obj.infor);
		if(obj.htype=="1"){
			obHot.css({"filter":"alpha(opacity=0)","opacity":0,"z-index":"3","position":"absolute","background":obj.bgcolor,"top":(obj.cenPoint[1]-obj.hsize[1]/2)+"px","left":(obj.cenPoint[0]-obj.hsize[0]/2)+"px"});
		}else{
			obHot.css({"filter":"alpha(opacity=1)","opacity":1,"z-index":"3","position":"absolute","background":"url("+obj.bg+") "+obj.bx+"px "+obj.by+"px","top":(obj.cenPoint[1]-obj.hsize[1]/2)+"px","left":(obj.cenPoint[0]-obj.hsize[0]/2)+"px"});
		}
		
		pc.append(obj.hotObj);
			obHot.mouseenter(function(){
				$(this).css("cursor","pointer");
				if(obj.htype=="1"){
					
					$(this).css({"filter":"alpha(opacity=0.5)","opacity":0.5});
				}else{
					obj.createTP2(pc,k);
				}
				}).mouseleave(function(){
					$(this).css("cursor","default");
					if(obj.htype=="1"){
					$(this).css({"filter":"alpha(opacity=0)","opacity":0});
				}else{
					$("#"+obj.tpId).hide();
				}
			}).click(function(evt){
				if(!g_var.clickf||obj.htype=="0"){
					return;
				} 
				g_var.mxy[0]=evt.clientX-g_var.mc.view.orgPoint[0];
				g_var.mxy[1]=evt.clientY-g_var.mc.view.orgPoint[1];
				//g_var.mxy[0]=obj.cenPoint[0]*k;
				//g_var.mxy[1]=obj.cenPoint[1]*k;
				obj.createMP(pc,null,k);
				Util.moveMap(200);
				//g_var.mc.gotoMapAt(obj.nzoom,areadata[xy[$(evt.target).attr("name")]]["area"][0],areadata[xy[$(evt.target).attr("name")]]["area"][1]);
				//g_var.mc.map.setXData(g_var.mc.config,json);
			});

	}//showHotArea end;
	this.createLabel=function(pc,i,k){//i为id序号;
		obj.hotObj=Util.createObj("DIV","label"+i);
		var obHot=$(obj.hotObj);
		obHot.width(obj.hsize[0]);//19;
		obHot.height(obj.hsize[1]);//20;
		obHot.attr("name",obj.xId);
		obHot.css({"z-index":"3","position":"absolute","background":"url("+obj.bg+") no-repeat","top":(obj.cenPoint[1]-obj.hsize[1]/2)+"px","left":(obj.cenPoint[0]-obj.hsize[0]/2)+"px"});

		
			pc.append(obj.hotObj);
				obHot.mouseenter(function(evt){
					g_var.mxy[0]=evt.clientX-g_var.mc.view.orgPoint[0];
					g_var.mxy[1]=evt.clientY-g_var.mc.view.orgPoint[1];
					//alert(g_var.mxy[0]+","+g_var.mxy[1]);
					clearTimeout(g_var.stimer);
					g_var.stimer=setTimeout(function(){
						$.ajax({
				        type: "GET",
				        url: g_var.relPath+"?path=findEnterpriseById",
				        async: false, 
				        dataType: "jsonp",
				        data:"shopId="+obj.xId,
				        success: function (d) {
									obj.createTPX(d["status"],g_var.mc.map.mapc,k);
									Util.moveMap(200);
				        },
				        error: function (d) { alert("err:ajax报错"); }
				    });
						},500);
          
				}).mouseleave(function(){
					obHot.css({"cursor":"default"});
					clearTimeout(g_var.stimer);
				});
	}//showHotArea end;
	
	
	this.createLabel2=function(pc,i,k){//i为id序号;
		obj.hotObj=Util.createObj("DIV","label"+i);
		var obHot=$(obj.hotObj);
		obHot.width(obj.hsize[0]);//19;
		obHot.height(obj.hsize[1]);//20;
		obHot.attr("name",obj.xId);
		obHot.css({"z-index":"3","position":"absolute","background":"url("+obj.bg+") no-repeat","top":(obj.cenPoint[1]-obj.hsize[1]/2)+"px","left":(obj.cenPoint[0]-obj.hsize[0]/2)+"px"});

		
			pc.append(obj.hotObj);
				obHot.mouseenter(function(evt){
					clearTimeout(g_var.stimer);
					g_var.stimer=setTimeout(function(){
				
							obj.createTP2(g_var.mc.map.mapc);
					
						},500);
          
				}).mouseleave(function(){
					obHot.css({"cursor":"default"});
					clearTimeout(g_var.stimer);
				});
	}//showHotArea end;
	this.createTP2=function(pc){
		var tp=$(Util.createObj("div",obj.tpId));
		tp.html("");
		tp.text(obj.infor);
		tp.css("width","auto");
		tp.height(20);
		tp.css("z-index","3");
		tp.css("position","absolute");
		tp.css("border","1px solid #ccc");
		tp.css("background","#F7F7F7");
		tp.css("padding","0px 5px 0px 5px");
		tp.css("line-height","20px");
		
		pc.append(tp);
		tp.css({"display":"block","left":parseInt(obj.cenPoint[0])+10+"px","top":parseInt(obj.cenPoint[1])-13+"px"});
	}//createTP2 end;
	
	this.createMP=function(pc,data,k){
		var tp=$(Util.createObj("div","mingp"));
		var numb=0;
		if(obj.xId=="L"){
			numb=Util.getData(g_var.relPath+"?path=getBusinessCount","jsonp","q=l");
			mingpL=mingpL.replace("{number}",numb["count"]);
			tp.html(mingpL);
		}
		if(obj.xId=="P"){
			numb=Util.getData(g_var.relPath+"?path=getBusinessCount","jsonp","q=p");
			mingpP=mingpP.replace("{number}",numb["count"]);
			tp.html(mingpP);
		}
		if(obj.xId=="M"){
			numb=Util.getData(g_var.relPath+"?path=getBusinessCount","jsonp","q=m");
			mingpM=mingpM.replace("{number}",numb["count"]);
			tp.html(mingpM);
		}
		if(obj.xId=="T"){
			numb=Util.getData(g_var.relPath+"?path=getBusinessCount","jsonp","q=t");
			mingpT=mingpT.replace("{number}",numb["count"]);
			tp.html(mingpT);
		}
		
		pc.append(tp);
		tp.css({"display":"block","left":parseInt(obj.cenPoint[0])-150+"px","top":parseInt(obj.cenPoint[1])-250+"px"});
	}//createMP end;
	
	this.createTP=function(pc){
		var tp=Util.createObj("DIV",obj.tpId);
			var h1=Util.createObj("H1",obj.tpId+"h1");
			$(h1).width(parseInt(obj.tpw));$(h1).height(30);
			var span1=Util.createObj("span",obj.tpId+"span");
			$(span1).html("商铺id："+obj.xId);
			$(h1).append(span1);
			$(span1).css("float","left");
			var close_a=Util.createObj("A","zzjwd_close");
			$(h1).append(close_a);
			$(close_a).css("float","right");
			$(close_a).css("width","25px");
			$(close_a).css("height","25px");
			$(close_a).css("cursor","pointer").click(function(){$(tp).hide();});
			$(tp).append(h1);
			obj.flag="1";
		if(obj.flag!=""){
			obj.resetTP();
			var p0=Util.createObj("p",obj.tpId+"p0");
			var shopId=Util.createObj("input",obj.tpId+"inputshopId");
			$(shopId).attr("name","shopId");
			$(shopId).val(obj.xId);
			var label2=Util.createObj("label",obj.tpId+"label2");
			$(label2).text("商铺号:");
			$(p0).append(label2);
			
			$(p0).append(shopId);
			$(tp).append(p0);
			var p1,label1,input1,mbt,sbt,cbt;
			for(var inkey in obj.dataModel){
				p1=Util.createObj("p",obj.tpId+"p"+inkey);
				label1=Util.createObj("label",obj.tpId+"label"+inkey);
				$(label1).text(LName[inkey]+":");
				if(inkey=="industry"||inkey=="businessModel"){
					input1=Util.createObj("em",obj.tpId+"em"+inkey);
				}else{
					input1=Util.createObj("input",obj.tpId+"input"+inkey);
					$(input1).attr("name",inkey);
					$(input1).val(obj.dataModel[inkey]);
				}
				$(p1).append(label1);
				$(p1).append(input1);
				$(tp).append(p1);
			}//for end;	
			
		}else{
			var p1=Util.createObj("P",obj.tpId+"p1");
			$(p1).html("名称:"+obj.infor);
			$(tp).append(p1);
		}//if end;
		
		
		$(tp).width(parseInt(obj.tpw));
		$(tp).height(parseInt(obj.tph));
		$(tp).css("z-index","2");
		$(tp).css("position","absolute");
		$(tp).css("border","1px solid #ccc");
		$(tp).css("background","#F7F7F7");
		pc.append(tp);
		
	}//createTP end;
	

	this.createXArea=function(pc,i,k){//i为id序号;
		if(obj.czoom.indexOf(g_var.mc.map.czoom)<0) return false;
		obj.hotObj=Util.createObj("DIV","zzjwdx"+i);
		var obHot=$(obj.hotObj);
		obHot.width(obj.hsize[0]*k);//19;
		obHot.height(obj.hsize[1]*k);//20;
		obHot.css({"z-index":"2","left":(obj.cenPoint[0]*k-obj.hsize[0]/2*k)+"px","top":(obj.cenPoint[1]*k-obj.hsize[1]/2*k)+"px","position":"absolute","background":obj.bgcolor,"filter":"alpha(opacity=0)","opacity":0});

		//$(obj.hotObj).text(i);
		pc.append(obj.hotObj);
				obHot.mouseenter(function(evt){
					obHot.css({"cursor":"pointer","filter":"alpha(opacity=0.2)","opacity":0.3});
					g_var.mxy[0]=evt.clientX-g_var.mc.view.orgPoint[0];
					g_var.mxy[1]=evt.clientY-g_var.mc.view.orgPoint[1];
					//alert(g_var.mxy[0]+","+g_var.mxy[1]);
					clearTimeout(g_var.stimer);
					g_var.stimer=setTimeout(function(){
						$.ajax({
				        type: "GET",
				        url: g_var.relPath+"?path=findEnterpriseById",
				        async: false, 
				        dataType: "jsonp",
				        data:"shopId="+obj.xId,
				        success: function (d) {
									obj.createTPX(d["status"],g_var.mc.map.mapc,k);
									Util.moveMap(200);
				        },
				        error: function (d) { alert("err:ajax报错"); }
				    });
						},500);
          
				}).mouseleave(function(){
					obHot.css({"cursor":"default","filter":"alpha(opacity=0)","opacity":0});
					clearTimeout(g_var.stimer);
				});
	}//showHotArea end;
	this.createTPX=function(d,pc,k){
		var html=template;
		var tp=$(Util.createObj("DIV",obj.tpId));
		if(d["enterpriseName"]!=null&&d["enterpriseName"]!=""){
			for(var inkey in d){
				html=html.replace(new RegExp("{"+inkey+"}","g"),d[inkey]);
				if(d["shopAddress"]==null||d["shopAddress"]==""){
					
					var reg=/<a id='wpa' [\s|\S]*<\/b>/;
					//alert(reg.test(html));
					html=html.replace(reg,"无旺铺");
					//alert("ddd");
				}
			}
			tp.html(html);
			pc.append(tp[0]);
		}else{
			tp.html(template1);
		}
		//alert(k);
		//alert(obj.cenPoint[0]);
		tp.css({"display":"block","left":parseInt(obj.cenPoint[0]-obj.tpw/2)+"px","top":parseInt(obj.cenPoint[1]-obj.tph-10)+"px"});
		$("#product").unbind("click").click(function(evt){
			if($("#tproduct").css("display")=="block"){$("#tproduct").hide();return;}
			g_var.mxy[0]=evt.pageX-g_var.mc.view.orgPoint[0];
			g_var.mxy[1]=evt.pageY-g_var.mc.view.orgPoint[1];
			$.ajax({
				   type: "GET",
				   url: g_var.relPath+"?path=getProductByMemberId",
				   async: false, 
				   dataType: "jsonp",
				   data:"memberId="+d["memberId"],
				   success: function (dd) {
				   
					 if(dd["status"].length<=0){$("#tproduct").html("<p>&nbsp;&nbsp;该商家暂未发布产品信息</p>");$("#tproduct").show();Util.moveMap(390);return;};
					 $("#tproduct").show();
					 var hs="",htms="";
					 var ds=dd["status"];
					 for(var i=0;i<ds.length;i++){
					 	hs=litemp;
					 	for(var inks in ds[i]){
					 		
					 		hs=hs.replace(new RegExp("{"+inks+"}","g"),ds[i][inks]);
					 	}
					 	htms+=hs;
					}
					htms=htms.replace(/\{shopAddress\}/g,d["shopAddress"]);
					 $("#tproduct").html(htms);
					 Util.moveMap(390);
				   },
				   error: function (d) { alert("err:ajax报错"); }
				 });
		});
	}//creatTPX end;
	
}//HotAreaModel end;

