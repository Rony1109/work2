/*copyright by zzjwd!QQ:550703900; */
$().ready(function(){
	//pulbic js;
	//rintingList js start;
	doCurrentHref("map",function(){
		downList(".sobt",".downList",".downList span","#sov",".sobox");
		addMapClick();
		var mc=new MControl();
			g_var.mc=mc;
			mc.init();
			gotoMap("#皮革",2985,1011,mc.gotoMapAt,"L");
			gotoMap("#纺织",3852,999,mc.gotoMapAt,"T");
			gotoMap("#印刷包装电子",3002,2592,mc.gotoMapAt,"P");
			gotoMap("#五金化工塑胶",3908,2594,mc.gotoMapAt,"M");

	});//rintingList end;
	/*
 copyright by zzjwd!QQ:550703900;
 */
});

g_var.noManage=1;

function downList(downbt,boxList,spanId,sov,pbox){
	$(downbt).mouseover(function(){
		$(boxList).slideDown();
	});
	$(pbox).mouseleave(function(){
		$(boxList).hide();
	});
	$(spanId).click(function(){
		$(sov).val($(this).text());
		$(sov).attr("name",$(this).attr("name"));
	});
}//downList end;

function gotoMap(id,cx,cy,fn,dj){
	$(id).click(function(){
		fn(7,cx,cy);
		//json=Util.getData("data/xdata.txt","json","");
		json=Util.getData(g_var.Base+"map.findEnterpriseBySourceMarket","jsonp","sourceMarket="+dj);
		g_var.mc.map.setXData(g_var.mc.config,json);
	});
}//gotoMap end;

function addMapClick(){
	$("#mp").live("click",function(evt){
		if(!$.contains($("#tpzzjwd")[0],evt.target)){
			$("#tpzzjwd").hide();
		}
		if(evt.target.id=="zzjwd_close"){
			$("#tpzzjwd").hide();
		}
	});
}//addMapClick end;