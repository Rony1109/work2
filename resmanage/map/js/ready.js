/*copyright by zzjwd!QQ:550703900; */
$().ready(function(){
	//pulbic js;
	//rintingList js start;
	doCurrentHref("map",function(){
		var url=getBasePath();
		url+="map.updateEnterprise"
		clickItem(".mbbt",".modify",".cbt",".sbt",url,".item");
		addEs(".boxList li");
		gotoPage("#offset","#pv1","#goto1");
		gotoPage("#offset","#pv2","#goto2");
		try{
			var mc=new MControl();
			g_var.mc=mc;
			mc.init();
			gotoMap("#皮革",2985,1011,mc.gotoMapAt,"L");
			gotoMap("#纺织",3852,999,mc.gotoMapAt,"T");
			gotoMap("#印刷包装电子",3002,2592,mc.gotoMapAt,"P");
			gotoMap("#五金化工塑胶",3908,2594,mc.gotoMapAt,"M");
			
		}catch(e){
		}
		
	});//rintingList end;
	/*
 copyright by zzjwd!QQ:550703900;
 */
});
function gotoMap(id,cx,cy,fn,dj){
	$(id).click(function(){
		fn(7,cx,cy);
		//json=Util.getData("data/xdata.txt","json","");
		json=Util.getData(g_var.Base+"map.findEnterpriseBySourceMarket","jsonp","sourceMarket="+dj);
		g_var.mc.map.setXData(g_var.mc.config,json);
	});
}//gotoMap end;

function clickItem(mbt,mdialog,cbt,sbt,url,dItem){
	$(mbt).click(function(){
		$(mdialog).hide();
		$(this).parent().parent().children(mdialog).show();
	});
	$(cbt).click(function(){
		$(mdialog).hide();
		location.reload();
	});
	$(sbt).bind("click",function(){
		var qstr="qstr=";
		var q=getFormDataY($(this).parent().parent().find(dItem),[1000,1000,35,30,10,"tel","phone"]);
		if(!q){
			return;
		}
		qstr+=q;
		ajaxSend(qstr, url, function(d){
			if(d=="0"){
							alert("保存成功");
						}
						if(d=="1"){
							alert("未修改");
						}
						if(d=="2"){
							alert("会员帐号输入有误");
						}

			$(mdialog).hide();
			location.reload();
			});
		
	});
	
}//clickItem end;

function gotoPage(totaId,inId,gotoBt){
	var curPage=0;
	var totalPage=0;
	var telm=$(gotoBt).attr("href");
	$(gotoBt).mouseenter(function(){
		totalPage=$(totaId).val();
		if($(inId).val()==""||$(inId).val()==null){
			curPage=0;
		}else{
			if(isReg(reg["interger"],inId)){
				curPage=parseInt($(inId).val());
			}else{
				curPage=0;
			}
		}
		curPage=curPage<0?0:curPage>totalPage?totalPage:curPage;
		hrefs=telm.replace("{page}",curPage);
		$(this).attr("href",hrefs);
	});
	
}//gotoPage end;

function addEs(obj){
	$(obj).each(function(i){
		$(this).click(function(){
			$(obj).addClass("es");
			$(this).removeClass("es");
		});
	});
}//addEs end;















