/*copyright by zzjwd!QQ:550703900; */
$().ready(function(){
	//pulbic js;
	//rintingList js start;
	doCurrentHref("/",function(){
		isLogin(".top-sign-info","isLogin.html","messagecount.html");
		setView();
		dragMove();
		getxData($("#type").val(),"//map.csc86.com/ajax/map?path=findEnterpriseBySourceMarket",handlerData);
		addEvent();
		addMapClick();
	});//rintingList end;
	/*
 copyright by zzjwd!QQ:550703900;
 */
});

function addMapClick(){
	$("#view div").live("click",function(evt){
		try{
		if(!$.contains($("#tpzzjwd")[0],evt.target)){
			$("#tpzzjwd").hide();
		}}catch(e){}
		if(evt.target.id=="zzjwd_close"){
			$("#tpzzjwd").hide();
		}
	});

}//addMapClick end;
function setView(){//控制视图随窗口变化而变化;
	var bs=Util.getBodyWH();
		$("#view").width(bs[0]);
		$("#view").height(bs[1]-152);
	$(window).resize(function(){
		bs=Util.getBodyWH();
		$("#view").width(bs[0]);
		$("#view").height(bs[1]-152);
	});
	
}//setView end;
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
        		
        	}
        },
        error: function (d,d1,d2) {
            alert(this.url);
           
        }
    });
}//isLogin end;


function dragMove(){
	$("#view div").mousedown(function(evt){
		var offset = $(this).position();
		var xx = evt.pageX - offset.left;
	  var yy = evt.pageY - offset.top;
	  var ob=this;
	  $(document).bind("mousemove",function(evt){
	        var _x=evt.pageX-xx;
	        var _y=evt.pageY-yy;
	        $(ob).css({top:_y+"px",left:_x+"px"});
	        $("#tpzzjwd").hide();
	    });
	  $(document).mouseup(function(evt){
	  	 $(document).unbind("mousemove");
	  	 $(document).unbind("mouseup");
	  	});
	});
}//dragMove end;

function getxData(name,path,fn){
	var qstr="key="+name;
	$.ajax({
        type: "GET",
        url: path,
        dataType: "jsonp",
        data:qstr,
        success: function (d) {
					fn(d["status"],name);
        },
        error: function (d) { alert("err:ajax报错"); }
    });
}//getxData end;
var mapArray={};
function handlerData(d,type){

	if("LP".indexOf(type)>=0){
		for(var key in d){
			var lia =$("."+key+" li");
			if(key.substr(-1,1)%2!=0){//看楼层是否为奇数;
				for(var i=0,j=0,k=0;i<d[key].length;i++){
					if(d[key][i]["shopId"].substr(-1,1)%2!=0){
						lia.eq(13-j).attr("name",d[key][i]["shopId"]);
						lia.eq(13-j).addClass("c"+d[key][i]["status"]);
						j++;
					}else{
						lia.eq(27-k).attr("name",d[key][i]["shopId"]);
						lia.eq(27-k).addClass("c"+d[key][i]["status"]);
						k++;
					}
					lia.eq(i).text("");
					
				}
				
			}else{
				for(var i=0,j=0,k=0;i<d[key].length;i++){
					if(d[key][i]["shopId"].substr(-1,1)%2!=0){
						lia.eq(17-j).attr("name",d[key][i]["shopId"]);
						lia.eq(17-j).addClass("c"+d[key][i]["status"]);
						j++;
					}else{
						lia.eq(35-k).attr("name",d[key][i]["shopId"]);
						lia.eq(35-k).addClass("c"+d[key][i]["status"]);
						k++;
					}
					lia.eq(i).text("");
					
				}//else end;
			}
		}
	}else if("MT".indexOf(type)>=0){
		for(var key in d){
			var lia =$("."+key+" li");
				for(var i=0,j=0,k=0;i<d[key].length;i++){
					if(d[key][i]["shopId"].substr(-1,1)%2!=0){
						lia.eq(j).attr("name",d[key][i]["shopId"]);
						lia.eq(j).addClass("c"+d[key][i]["status"]);
						
						j++;
					}else{
						lia.eq(14+k).attr("name",d[key][i]["shopId"]);
						lia.eq(14+k).addClass("c"+d[key][i]["status"]);
						k++;
					}
					lia.eq(i).text("");
				}
		}
	}
	
}//handlerData end;

function addEvent(){
	$("#view li").mouseenter(function(evt){
		var shopId=$(this).attr("name");
	  var x1=Util.getLeft(evt.target);
		var y1=Util.getTop(evt.target);
		clearTimeout(stimer);
					stimer=setTimeout(function(){
						$.ajax({
				        type: "GET",
				        url: "//map.csc86.com/ajax/map?path=findEnterpriseById",
				        async: false, 
				        dataType: "jsonp",
				        data:"shopId="+shopId,
				        success: function (d) {
									createTPX(d["status"],$("#view"),x1,y1);
									//Util.moveMap(200);
				        },
				        error: function (d) { alert("err:ajax报错"); }
				    });
						},500);
	}).mouseleave(function(){
		clearTimeout(stimer);
	});
}//addEvent end;



function createTPX(d,pc,x1,y1){
		var html=template;
		var tp=$(Util.createObj("DIV","tpzzjwd"));
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
		tp.css({"display":"block","left":(x1-150)+"px","top":(y1-395)+"px"});
		$("#product").unbind("click").click(function(evt){
			if($("#tproduct").css("display")=="block"){$("#tproduct").hide();return;}
			//g_var.mxy[0]=evt.pageX;
			//g_var.mxy[1]=evt.pageY;
			$.ajax({
				   type: "GET",
				   url:"//map.csc86.com/ajax/map?path=getProductByMemberId",
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

var stimer=null;
var template="<div id='tpin'><h1><img id='tpimg' src='{enterpriseImgUrl}'/><span id='tph' title='{enterpriseName}'><b>{enterpriseName}</b><i class='iren{isClaim}'></i></span><a id='zzjwd_close' href='javascript:;'></a></h1><div id='tphimg'><img id='himg' src='{userImgUrl}'/><div id='tpsinfor'><p><label>店　　主：</label>{contactPerson}</p><p><label>移动电话：</label>{phone}</p><p><b id='tpxy'>诚信服务，美好共赢</b></p></div></div><div id='tplinfor'><p><label>主营：</label><span>{industry}</span></p><p><label>铺位：</label><span>{shopId}</span></p><p><label>座机：</label><span>{telephone}</span></p></div><div id='wp'><i id='wpi'></i><a id='wpa' target='_blank' href='{shopAddress}'>旺铺</a><b id='product'>产品橱窗&gt;&gt;</b></div></div><ul id='tproduct'></ul>";
var template1="<div id='tpzx'><h1><span id='tph'>该商铺未有商家入驻，期待您的加盟</span><a id='zzjwd_close' href='#'></a></h1><h2><i class='zi'></i><span>招商电话：0755-28498888</span></h2><h2><i class='ci'></i><span>招商网址：<a href='//sz.csc86.com/invest/' target='_blank'>//sz.csc86.com/invest/</a></span></h2></div><!--tpin end-->";
var litemp="<li><a href='{shopAddress}{productid}' target='_blank'><img src='{pictUrl}'/></a><span><i></i><a href='{shopAddress}{productid}' target='_blank'>{productName}</a></span></li>";



