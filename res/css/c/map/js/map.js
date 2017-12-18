/*copyright by zzjwd!QQ:550703900; */
$().ready(function(){
	//pulbic js;
	//rintingList js start;
	doCurrentHref("/",function(){
		isLogin(".top-sign-info","isLogin.html","messagecount.html");
		addMapClick();
		var mc=new MControl();
			g_var.mc=mc;
			mc.init();
			$("#vc").click(function(evt){
				//alert(evt.target.id);
				if(!evt.target.id||evt.target.id!="vc") return;
						 var obj=g_var.mc;
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
		});

	});//rintingList end;
	/*
 copyright by zzjwd!QQ:550703900;
 */
});

function addMapClick(){
	$("#mp").live("click",function(evt){
		try{
		if(!$.contains($("#tpzzjwd")[0],evt.target)){
			$("#tpzzjwd").hide();
		}}catch(e){}
		if(evt.target.id=="zzjwd_close"){
			$("#tpzzjwd").hide();
		}
	});

}//addMapClick end;
var isFlag=false;
function isLogin(obj,url1,url2){
	var path="//api.csc86.com/member/";
	url1=path+url1;
	url2=path+url2;
	$.ajax({
        type: "get",
        url: url1,
        dataType:"jsonp",
        data: "", //例如："name=John&location=Boston";
        success: function(data){
        	if(data.status){
        		$.get(url2,{type:"json"},function(dataMsg){	
        			var html="<b>您好,</b><a class='aa' href='//member.csc86.com/'>";
        			html+=data.data.userName+"!";
        			html+="</a><b>消息</b><a class='msg aa' href='//member.csc86.com/membercenter/messageall/'>";
        			html+=dataMsg.data.count;
        			html+="</a><a href='//member.csc86.com/login/logout' class='logout aa'>退出</a>";
        			$(obj).html(html);
        		},"jsonp");
        		isFlag=true;
        	}else{
        		isFlag=false;
        	}
        	
        },
        error: function (d,d1,d2) {
        		isFlag=false;
            alert(this.url);
            
           
        }
    });
}//isLogin end;

