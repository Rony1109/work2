function HotAreaModel(){
	var obj=this;
	this.cenPoint=[0,0];//热区的中心点;
	this.hsize=[0,0];//热区的大小;
	this.infor="";//热区的提示信息;
	this.htype=0;//热区的类弄;0为普通，1为可点击;
	this.czoom=1;//在哪个级上显示;
	this.nzoom=6;//热区点击进入下一层级;
	this.bgcolor="black";//热区的背景色;
	this.tp="无语";//热区上的文字信息;
	this.hotObj=null;//热区对像;
	this.tpw=200;//提示面板的宽;
	this.tph=100;//提示面板的高;
	this.tpId="tpzzjwd";//热区公用的提示标签id;
	this.xId="";//特殊标志;检查商铺标志;
	this.flag="";//商铺标志;
	this.dataModel=new Object();
	
	this.init=function(){ 
	}//init end;
	this.createHotArea=function(pc,i){//i为id序号;
		if(obj.czoom.indexOf(g_var.mc.map.czoom)<0) return false;
		obj.hotObj=Util.createObj("DIV","zzjwdhot"+i);
		$(obj.hotObj).width(obj.hsize[0]);//19;
		$(obj.hotObj).height(obj.hsize[1]);//20;
		$(obj.hotObj).css("background",obj.bgcolor);//url(images/icon_mark.png);
		if(obj.flag!=""){
			if(obj.flag=="1"){
				$(obj.hotObj).css("background","#E2621D");//url(images/icon_mark.png);
			}
			
			if(obj.flag=="2"){
				$(obj.hotObj).css("background","#FF964E");//url(images/icon_mark.png);
			}
			if(obj.flag=="3"){
				$(obj.hotObj).css("background","#cccccc");//url(images/icon_mark.png);
			}
		}
		$(obj.hotObj).css("position","absolute");
		$(obj.hotObj).css("top",(obj.cenPoint[1]-obj.hsize[1]/2)+"px");
		$(obj.hotObj).css("left",(obj.cenPoint[0]-obj.hsize[0]/2)+"px");
		$(obj.hotObj).css("z-index","2");
		$(obj.hotObj).css({"filter":"alpha(opacity=0)","opacity":0});
		if(obj.flag!=""){
			$(obj.hotObj).css({"filter":"alpha(opacity=1)","opacity":1});
			$(obj.hotObj).css("border","1px solid #fff");
		}
		
		//$(obj.hotObj).text(i);
		pc.append(obj.hotObj);
		if(obj.htype=="0"){
				$(obj.hotObj).mouseenter(function(evt){
					$(this).css("cursor","pointer");
					//obj.createTP(pc);
					g_var.mxy[0]=evt.clientX-g_var.mc.view.orgPoint[0];
					//alert(g_var.mxy[0]);
					g_var.mxy[1]=evt.clientY-g_var.mc.view.orgPoint[1];
					clearTimeout(g_var.stimer);
					g_var.stimer=setTimeout(function(){
						if(obj.xId!=""){
								var json=Util.getData(g_var.Base+"map.findEnterpriseById","jsonp","shopId="+obj.xId);
							}
							obj.initDataModel(json,309,260);//初始化数据模型;
							obj.createTP(pc);
							$("#"+obj.tpId).show();
							$("#"+obj.tpId).css("display","block");
							$("#"+obj.tpId).css("left",parseInt(obj.cenPoint[0]-obj.tpw/2));
							$("#"+obj.tpId).css("top",parseInt(obj.cenPoint[1]-obj.tph-10));
							Util.moveMap();
						},500);
					g_var.mc.map.showMap(g_var.mc.view);
				}).mouseout(function(){
					$(this).css("cursor","default");
					clearTimeout(g_var.stimer);
				});
		}else{
			$(obj.hotObj).mouseenter(function(){
				$(this).css("cursor","pointer");
					$(this).css({"filter":"alpha(opacity=0.5)","opacity":0.5});
				}).mouseout(function(){
					$(this).css({"filter":"alpha(opacity=0)","opacity":0});
					$(this).css("cursor","default");
			}).click(function(evt){
				var json=null;
				if(obj.xId!=""){
						json=Util.getData(g_var.Base+"map.findEnterpriseBySourceMarket","jsonp","sourceMarket="+obj.xId);
					}
			
				
				var mapx,mapy;
				var map=g_var.mc.map;
				var view=g_var.mc.view;
				mapx=map.mapc.position().left;
				mapy=map.mapc.position().top;
				mapx=evt.pageX-mapx-view.orgPoint[0];
				mapy=evt.pageY-mapy-view.orgPoint[1];
				var k=mapdata["zoom_"+map.czoom][0]/mapdata["zoom_"+obj.nzoom][0];
				g_var.mc.gotoMapAt(obj.nzoom,mapx/k,mapy/k);
				g_var.mc.map.setXData(g_var.mc.config,json);
			});
		}
	}//showHotArea end;
	this.createTP=function(pc){
		var tp=Util.createObj("DIV",obj.tpId);
			$(tp).removeClass("mp");
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
			var p2=Util.createObj("p",obj.tpId+"pbt");
			$(p2).html("");
			mbt=Util.createObj("a",obj.tpId+"mbt");
			$(mbt).unbind("click");
			$(mbt).text("修改").click(function(){
				var pp=$(this).parent();
				pp.html("");
				sbt=Util.createObj("a",obj.tpId+"sbt");
				$(sbt).text("保存").unbind("click").click(function(){
					var qstr="qstr=";
					qstr+=getFormData(pp.parent().find("p input"));
					//alert(qstr);
					ajaxSend(qstr, g_var.Base+"map.updateEnterprise", function(d){
						if(d=="0"){
							alert("保存成功");
						}
						if(d=="1"){
							alert("修改失败");
						}
						if(d=="2"){
							alert("未知的会员帐号");
						}
						if(d=="3"){
							alert("未知的企业名称");
						}
						pp.parent().hide();
						});
				});
				cbt=Util.createObj("a",obj.tpId+"cbt");
				$(cbt).text("取消").unbind("click").click(function(){
					$(this).parent().parent().hide();
				});
				pp.append(sbt);
				pp.append(cbt);
				pp.parent().addClass("mp");
			});
			$(p2).append(mbt);
			$(tp).append(p2);
			
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
	
	this.initDataModel=function(json,tw,th){
		obj.tpw=tw;
		obj.tph=th;
		obj.dataModel.contactPerson=json["contactPerson"];
		obj.dataModel.enterpriseName=json["enterpriseName"];
		obj.dataModel.industry=json["industry"];
		obj.dataModel.businessModel=json["businessModel"]=="null"?"":json["businessModel"];
		obj.dataModel.telephone=json["telephone"];
		obj.dataModel.phone=json["phone"]=="null"?"":json["phone"];
		obj.dataModel.memberName=json["memberName"];
	}//initDataModel end;
	
	this.resetTP=function(){
		for(var inkey in LName){
			//alert($("#"+obj.tpId+"input"+inkey));
			$("#"+obj.tpId+"input"+inkey).val("");
			
		}
}//resetTP end;
	
}//HotAreaModel end;


var LName={
	"contactPerson":"联系人",
	"enterpriseName":"企业名称",
	"industry":"主营方向",
	"businessModel":"经营模式",
	"telephone":"公司电话",
	"phone":"手机电话",
	"memberName":"会员帐号"
};

