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
	this.tpw=309;//提示面板的宽;
	this.tph=285;//提示面板的高;
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
	
		$(obj.hotObj).css("position","absolute");
		$(obj.hotObj).css("top",(obj.cenPoint[1]-obj.hsize[1]/2)+"px");
		$(obj.hotObj).css("left",(obj.cenPoint[0]-obj.hsize[0]/2)+"px");
		$(obj.hotObj).css("z-index","2");
		$(obj.hotObj).css({"filter":"alpha(opacity=0)","opacity":0});
		//$(obj.hotObj).text(i);
		pc.append(obj.hotObj);
			$(obj.hotObj).mouseenter(function(){
				$(this).css("cursor","pointer");
					$(this).css({"filter":"alpha(opacity=0.5)","opacity":0.5});
				}).mouseout(function(){
					$(this).css({"filter":"alpha(opacity=0)","opacity":0});
					$(this).css("cursor","default");
			}).click(function(evt){
				var mapx,mapy;
				var map=g_var.mc.map;
				var view=g_var.mc.view;
				mapx=map.mapc.position().left;
				mapy=map.mapc.position().top;
				mapx=evt.pageX-mapx-view.orgPoint[0];
				mapy=evt.pageY-mapy-view.orgPoint[1];
				var k=mapdata["zoom_"+map.czoom][0]/mapdata["zoom_"+obj.nzoom][0];
				g_var.mc.gotoMapAt(obj.nzoom,mapx/k,mapy/k);
				//g_var.mc.map.setXData(g_var.mc.config,json);
			});

	}//showHotArea end;
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
	
	this.initDataModel=function(json,tw,th){
		obj.tpw=tw;
		obj.tph=th;
		obj.dataModel.shopId=json["shopId"];
		obj.dataModel.contactPerson=json["contactPerson"];
		obj.dataModel.enterpriseName=json["enterpriseName"];
		obj.dataModel.industry=json["industry"];
		obj.dataModel.shopAddress=json["shopAddress"];
		obj.dataModel.userImgUrl=json["userImgUrl"];
		obj.dataModel.enterpriseImgUrl=json["enterpriseImgUrl"];
		obj.dataModel.telephone=json["telephone"];
		obj.dataModel.phone=json["phone"]=="null"?"":json["phone"];
	}//initDataModel end;


	this.createXArea=function(pc,i,k){//i为id序号;
		if(obj.czoom.indexOf(g_var.mc.map.czoom)<0) return false;
		obj.hotObj=Util.createObj("DIV","zzjwdhot"+i);
		$(obj.hotObj).width(obj.hsize[0]*k);//19;
		$(obj.hotObj).height(obj.hsize[1]*k);//20;
		$(obj.hotObj).css("background",obj.bgcolor);//url(images/icon_mark.png);
	
		$(obj.hotObj).css("position","absolute");
		$(obj.hotObj).css("top",(obj.cenPoint[1]*k-obj.hsize[1]/2*k)+"px");
		$(obj.hotObj).css("left",(obj.cenPoint[0]*k-obj.hsize[0]/2*k)+"px");
		$(obj.hotObj).css("z-index","2");
		$(obj.hotObj).css({"filter":"alpha(opacity=0)","opacity":0});
		//$(obj.hotObj).text(i);
		pc.append(obj.hotObj);
				$(obj.hotObj).mouseenter(function(evt){
					$(this).css("cursor","pointer");
					$(obj.hotObj).css({"filter":"alpha(opacity=0.2)","opacity":0.3});
					g_var.mxy[0]=evt.clientX-g_var.mc.view.orgPoint[0];
					g_var.mxy[1]=evt.clientY-g_var.mc.view.orgPoint[1];
					//alert(g_var.mxy[0]+","+g_var.mxy[1]);
					clearTimeout(g_var.stimer);
					g_var.stimer=setTimeout(function(){
						$.ajax({
				        type: "GET",
				        url: "http://10.10.10.53:8080/map-app/map/findEnterpriseById",
				        async: false, 
				        dataType: "jsonp",
				        data:"shopId="+obj.xId,
				        success: function (d) {
									obj.createTPX(d["status"],pc,k);
									Util.moveMap();
				        },
				        error: function (d) { alert("err:ajax报错"); }
				    });
						},500);
          g_var.mc.map.showMap(g_var.mc.view);
				}).mouseout(function(){
					$(this).css("cursor","default");
					$(obj.hotObj).css({"filter":"alpha(opacity=0)","opacity":0});
				}).click(function(){
						
				});
	}//showHotArea end;
	this.createTPX=function(d,pc,k){
		var html=template;
		var tp=Util.createObj("DIV",obj.tpId);
		if(d["enterpriseName"]!=null&&d["enterpriseName"]!=""){
			for(var inkey in d){
				html=html.replace("{"+inkey+"}",d[inkey]);
			}
			$(tp).html(html);
			pc.append(tp);
		}else{
			$(tp).html(template1);
		}
		$("#"+obj.tpId).css("display","block");
		$("#"+obj.tpId).css("left",parseInt(obj.cenPoint[0]*k-obj.tpw/2));
		$("#"+obj.tpId).css("top",parseInt(obj.cenPoint[1]*k-obj.tph-10));
	}//creatTPX end;
	
}//HotAreaModel end;

var template="<div id='tpin'><h1><img id='tpimg' src='{enterpriseImgUrl}'/><span id='tph'>{enterpriseName}</span><a id='zzjwd_close' href='javascript:;'></a></h1><div id='tphimg'><img id='himg' src='{userImgUrl}'/><div id='tpsinfor'><p><label>店　　主：</label>{contactPerson}</p><p><label>联系电话：</label>{phone}</p><p><b id='tpxy'>诚信服务，美好共赢</b></p></div></div><div id='tplinfor'><p><label>主营：</label><span>{industry}</span></p><p><label>铺位：</label><span>{shopId}</span></p><p><label>电话：</label><span>{telephone}</span></p></div><div id='wp'><i id='wpi'></i><a id='wpa' href='{shopAddress}' target='_blank'>旺铺</a></div></div>";
var template1="<div id='tpzx'><h1><span id='tph'>该商铺未有商家入驻，期待您的加盟</span><a id='zzjwd_close' href='#'></a></h1><h2><i class='zi'></i><span>招商电话：0755-28498888</span></h2><h2><i class='ci'></i><span>招商网址：<a href='#'>#######</a></span></h2></div><!--tpin end-->";