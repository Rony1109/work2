mapClass.Cord_Div;
//mapClass.mark_td = false; //开始拖动标示
mapClass.mark_tdjb = null;
mapClass.Cord_type = ["#639602","#19A8F6","#F24727","#F9EC4F"];
mapClass.Cord_ajax = 0;
$.ajaxSetup({
	error:function (XMLHttpRequest, textStatus, errorThrown){
		alert("加载数据失败!");
	},
	timeout:10000
})

$(function(){
	//生成商铺,加载商家信息
	info_tabel(info_sp);
	//绑定商家单击事件;
	$("#move_box").on("click","div.sj",function(e){
		var o = this;
		mapClass.Cord_ajax++;
		mapClass.showCord(o,mapClass.Cord_ajax);
		return false;
	}).on("mousedown","div.cord_sp",function(event){event.stopPropagation()});//.on("mousedown","div",function(event){event.stopPropagation();});
	
	//单击隐藏商家信息
	$(document).on("mousedown",function(){
		mapClass.Cord_Div && mapClass.Cord_Div.remove();
		mapClass.Cord_Div = null;	
	})
})

function info_tabel(callback){
	for(var sp in mapClass.Data_market){
		var l = mapClass.Data_market[sp];//"L01" : {zb:[377,280],n:28,type:0,size:mapClass.Data_market_size},
		var tabl = market_tab(l.type,l.n,l.size);
		tabl.attr("id",sp).addClass("market_tab").css({left:l.zb[0]+"px",top:l.zb[1]+"px"});
		$("#move_box").append(tabl);
		tabl.fadeIn(800);
	}
	if(typeof callback == "function"){
		callback();
	}
}

function info_sp(){
	//set_sp(0);
	$.ajax({
		//url:data_url+"/shopdomains-app/remoting/shopDamainsSevice.getIntByShopDomains",
		url:"shopdomains.getOneGroupJson",
		data:{"start":Market_start},
		type:"GET",
		dataType : "jsonp",
		success: function(data){
			//console.log("获取店铺总数: " + data.length);
			mapClass.Data = data;
			set_sp(0);
		},
		error: function(){
			alert("获取商铺数据失败!");
		}
	})
}

var cg = 0 , sb = 0 , sj = 0,sb_arr=[];
function set_sp(i){
	if(!!mapClass.Data[i]){
		var o = mapClass.Data[i],
			market_dId = o.shopId.substring(0,3),
			market_dNumb = o.shopId.substring(3)-0,
			qfq_d = mapClass.Data_market[market_dId],wz;
		var dj_div = $("<div class=\"sj\" title=\""+mapClass.Data[i]["enterprise"]+"\">"+market_dNumb+"</div>").hide();
		if(qfq_d){
			cg++;
			$("#move_box").append(dj_div);
			wz = market_spwz(market_dId,market_dNumb);
			if(wz){
				sj++
				dj_div.css({width:qfq_d.size[0]+"px",height:qfq_d.size[1]+"px",left:wz[0]+"px",top:wz[1]+"px","background-color":mapClass.Cord_type[o.status-0]});
				dj_div.attr("data_C_type",o.status).attr("data_C_id",o.number).attr("data_C_shopId",o.shopId);
				dj_div.fadeIn(300);
			};
			+function(){
				var ii = i+1;
				setTimeout(function(){set_sp(ii)},10);
			}()
		}else{
			sb++
			sb_arr[sb_arr.length]=mapClass.Data[i];
			+function(){
				var ii = i+1;
				setTimeout(function(){set_sp(ii)},10);
			}()
		}
	}else{
		//console.log("成功找到商家:"+cg);
		//console.log("没有找到商家:"+sb)
		//console.log("实际生成商家:"+sj)
		//console.log(sb_arr);
		return null;
	}
}

//显示商家信息卡片:
mapClass.showCord = function(obj,ajax_n){
	var o = $(obj);
	var Color = mapClass.Cord_type[$(o).attr("data_C_type")] || "#CCC";
	if(!mapClass.Cord_Div){
		mapClass.Cord_Div = $("<div class=\"cord_sp\"><i class=\"cord_sj\"></i><div class=\"cord_main\"></div></div>")
		$("#map_main .move_box").append(mapClass.Cord_Div);
	}
	mapClass.Cord_Div.css("border-top-color",Color).on("click",function(event){event.stopPropagation();}).find("i.cord_sj").css("border-bottom-color",Color);
	if(o.attr("cordhtml")){
		mapClass.Cord_Div.hide();
		mapClass.Cord_Div.find(".cord_main").html(o.attr("cordhtml"));
		mapClass.Cord_Div.fadeIn(500);
	}else{
		var ajax_url,ajax_data;
		if(o.attr("data_C_id")){
			//ajax_url = data_url+"/shopdomains-app/remoting/shopDamainsSevice.getMemberIdByShopMessage";
			ajax_url = "shopdomains.getMemberIdMessage";
			ajax_data = {"number":o.attr("data_C_id")};
		}else if(o.attr("data_C_shopId")){
			//ajax_url = data_url+"/shopdomains-app/remoting/shopDamainsSevice.getShopIdByShopMessage";
			ajax_url = "shopdomains.getShopDomains";
			ajax_data = {"shopId":o.attr("data_C_shopId")}
		}else{
			mapClass.Cord_Div.show().find(".cord_main").html("<span style=\"color:#F00;\">没有数据!</span>");
		}
		
		mapClass.Cord_Div.show().find(".cord_main").html("正在加载...");
		$.ajax({
			url:ajax_url,
			data:ajax_data,
			type:"GET",
			dataType : "jsonp",
			success: function(data,textStatus){
				if(textStatus != 'success' || ajax_n != mapClass.Cord_ajax){return true;};
				var html = "";
				if(data){
					html += '<h2>'+ data.belongMarket + data.shopId.substring(3) + '</h2>' + 
						(data.enterprise?'<dl><dt>企业名称：</dt><dd title="'+data.enterprise+'">'+data.enterprise+'</dd></dl>':"") + 
						((data.submain && data.submain !='无')?'<dl><dt>旺铺地址：</dt><dd><a href="http://'+data.submain+'.csc86.com" target="_blank">'+data.submain+'.csc86.com</a></dd></dl>':"") + 
						(data.person?'<dl><dt>法定代表人：</dt><dd title="'+data.person+'">'+data.person+'</dd></dl>':"") + 
						(data.trades?'<dl><dt>主营行业：</dt><dd title="'+data.trades+'">'+data.trades+'</dd></dl>':"") + 
						(data.model?'<dl><dt>经营模式：</dt><dd title="'+data.model+'">'+data.model+'</dd></dl>':"") + 
						(data.contact?'<dl><dt>联系人：</dt><dd title="'+data.contact+'">'+data.contact+'</dd></dl>':"") + 
						(data.mobileTelephone?'<dl><dt>移动电话：</dt><dd title="'+data.mobileTelephone+'">'+data.mobileTelephone+'</dd></dl>':"");
					mapClass.Cord_Div.find(".cord_main").html(html).hide();
					mapClass.Cord_Div.find(".cord_main").fadeIn(500);
					//mapClass.Cord_Div.hide().show(500);
				}else{
					mapClass.Cord_Div.find(".cord_main").html("<span style=\"color:#F00;\">加载失败!</span>");
				}
				o.attr("cordhtml",html);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				mapClass.Cord_Div.find(".cord_main").html("<span style=\"color:#F00;\">加载失败!</span>");
			}
		})
	}
	
	mapClass.Cord_Div.find(".cord_main").length<=0 && mapClass.Cord_Div.show().append(cordhtml);
	var o = $(obj);
	var wz = {
		x:parseInt(o.css("top"))+ o.outerHeight() + 8,
		y:parseInt(o.css("left"))+ (o.outerWidth()-mapClass.Cord_Div.outerWidth())/2
	};
	mapClass.Cord_Div.css({"top":wz.x+"px","left":wz.y + "px"});
}

//生成Table(铺位)
function market_tab(type,maxn,size){//生成Table
	var table = $("<table></table>");
	if(type==0){
		for(var z = 2; z>0; z--){
			var tr = $("<tr></tr>");
			for(var i = Math.floor(maxn/2)+1; --i ;){
				var nub = 100 + (i*2-z+1);
				var td = $("<td>"+nub+"</td>").css({"width":size[0]+"px","height":size[1]+"px"});
				tr.append(td);
			}
			table.append(tr);
		}
	}else if(type==1){
		for(var z = 2; z>0; z--){
			var tr = $("<tr></tr>");
			for(var i = 1 ; i< Math.floor(maxn/2)+1; i++ ){
				var nub = 100 + (i*2-z+1);
				var td = $("<td>"+nub+"</td>").css({"width":size[0]+"px","height":size[1]+"px"});
				tr.append(td);
			}
			table.append(tr);
		}
	}else if(type==2){
		var tr = $("<tr></tr>");
		for(var i = 1 ; i < maxn+1;i++){
			var nub = 100 + i;
			var td = $("<td>"+nub+"</td>").css({"width":size[0]+"px","height":size[1]+"px"});
			tr.append(td);
		}
		table.append(tr);
	}else if(type==3){
		var tr = $("<tr></tr>");
		for(var i = 1 ; i < maxn+1;i++){
			var tr = $("<tr></tr>");
			var nub = 100 + i;
			var td = $("<td>"+nub+"</td>").css({"width":size[0]+"px","height":size[1]+"px"});
			tr.append(td);
			table.append(tr);
		}
	}
	return table;
}

//标出商家位置
function market_spwz(market_d,n){
	var Data_market=mapClass.Data_market[market_d],nb = n % 100,wz=[];
	if(Data_market && Data_market.n>=nb){
		var zb = Data_market.zb;
		var size = Data_market.size;		
		if(Data_market.type == 0){
			wz[1] = nb%2 ? zb[1] + 1 : zb[1] + size[1] + 2;
			wz[0] = zb[0] + Math.floor((Data_market.n - nb)/2)*(size[0]+1)+ 1;
		}else if(Data_market.type == 1){
			wz[1] = nb%2 ? zb[1] + 1 : zb[1] + size[1] + 2;
			wz[0] = zb[0] + Math.floor((nb-1)/2)*(size[0]+1) + 1;
		}else if(Data_market.type == 2){
			wz[1] = zb[1] + 1;
			wz[0] = zb[0] + Math.floor(nb-1)*(size[0]+1) + 1;
		}else if(Data_market.type == 3){
			wz[1] = zb[1] + Math.floor(nb-1)*(size[1]+1) + 1;
			wz[0] = zb[0] + 1 ;
		}
		return wz;
	}else{return null;}
}