// JavaScript Document 
$(function(){
	$__sc();
	$__rz();
	$__page();
});

//弹出登录框
function $_open_login(comm){
	csc.useDialog(function(){
		seajs.use(csc.url("res","/f=js/m/sign"),function(){
			csc.checkSign(comm);
		});
	});
}

//清楚登录框并刷新登录信息
function $__clear_login(){
	csc.signDialogClose();
	$.get(location.herf,"",function(data){
		var new_html = data.toString();
		if(/<body[^>]*>[\s|\S|.]*?<\/[^<]*body>/ig.test(new_html)){
			var hh = new_html.match(/<body[^>]*>([\s|\S|.]*?)<\/[^<]*body>/i)[1];
			var new_o = $("<div></div>").html(hh);
			$(".web-top>.g-o-a>span").html(new_o.find(".web-top>.g-o-a>span").html());
			$(".index_log_box").html(new_o.find(".index_log_box").html());
			seajs.use(csc.url("res","/f=js/m/usermsg"),function(){
				csc.usermsg.unreadmsg();
				csc.usermsg.offermsg();
				//setInterval(function(){csc.usermsg.unreadmsg();csc.usermsg.offermsg();},30000);
			});
		}
	})
}

function $__sc(){//收藏
	$("a[spid]").each(function(index) {
		var o = $(this);
		o.bind("click",function(){
			csc.$_sc_o = o;
			$_comm_sc();
			return false;
		})
	});	
}

this.$_comm_sc=function(login){
	if(login){$__clear_login();}
	csc.$_sc_o.attr("spid") && $.ajax({ 
		url: "/home/collect?spid=" + csc.$_sc_o.attr("spid"),
		type: "GET",
		success: function(data){
			var data = $.trim(data);
			switch (data){
				case "1":
					$_open_login(encodeURIComponent("$_comm_sc(1);eval"));
					return;
					break;
				case "2":
					csc.useDialog(function(){csc.success("收藏成功！",1.5);});
					var html = $(csc.$_sc_o).html(); 
					var nub = parseInt(html.match(/\d+/)[0]);
					if(nub!==nub) {return;}
					html = html.replace(/\d+/,nub+1);
					html = html.replace("收藏","己收藏");
					$(csc.$_sc_o).html(html);
					$(csc.$_sc_o).addClass("cur-d");
					$(csc.$_sc_o).attr("spid","");
					if(login){setTimeout("location.reload()",1000);}
					break;
				case "3":
					$art_alert("你己经收藏过了！",null,null,1.5);
					var html = $(csc.$_sc_o).html(); 
					var nub = parseInt(html.match(/\d+/)[0]);
					html = html.replace("收藏","己收藏");
					html = html.replace("藏藏","藏");
					$(csc.$_sc_o).html(html);
					$(csc.$_sc_o).addClass("cur-d");
					$(csc.$_sc_o).attr("spid","");
					if(login){setTimeout("location.reload()",1000);}
					break;
				default:
					if(login){
						$art_alert("操作失败！请重试。","mem-e",function(){location.reload();});
					}else{
						$art_alert("操作失败！请重试。","mem-e");
					}
					break;
			}
		}
	});
}

function $__rz(){//入驻
	$("a[inid]").each(function(index) {
		var o = $(this);
		o.bind("click",function(){
			var inid = o.attr("inid");
			csc.useDialog(function(){
				csc.confirm("只能入驻一个批发市场，是否继续？",function(){
						csc.$_rz_id = inid;
						$_comm_rz();
						//$_open_login("$_comm_rz('"+inid+"',1).toString");
				});
			})
			return false;
		})
	});	
}
this.$_comm_rz = function(login){
	var msg = ["操作失败！请重试。",
			"您需要先登录才能执行此操作！是否跳转到登录页？",
			"恭喜！入驻成功！",
			"该市场人数已满额！",
			"你还未开通旺铺，暂不能入驻市场，<a href=\"//member.csc86.com/shop/introduce.html\" target=\"_blank\">去开通旺铺</a>",
			"你已经入驻该批发市场！",
			"您已入驻其他市场，不能入驻该市场",
			"获取数据失败！请重试。"];
	if(login){$__clear_login();}
	$.ajax({ 
		url: "/home/join?spid=" + csc.$_rz_id,
		type:"GET",
		success: function(data){
			var data = $.trim(data);
			if(data=="1"){
				$_open_login(encodeURIComponent("$_comm_rz(1);eval"));
				return;
			}else if(/^2$/.test(data)){
				csc.useDialog(function(){csc.success(msg[data],1.5);})
			}else if(/^[3456]$/.test(data)){
				$art_alert(msg[data],null,true);
			}else{
				var msg_ = msg[data] || msg[0];
				$art_alert(msg_,"mem-e",true);
			}
			return;
		}
	});
}


function $art_alert(msg,ico,okcall,time){
	csc.useDialog(function(){
		artDialog({
			id:"_msg_why",
			lock:false,
			resize:false,
			time:time||0,
			title: false,
			ok: okcall,
			icon:ico || "mem-w",
			content: msg
		});
	})
}

function $__page(){
	$("#companyListBox .market-showpage a.ajax").live("click",function(){
		$.get("/home/CompanyList"+$(this).attr("href"),"",function(data){
			$("#companyListBox").html(data);
		})
		return false;
	})
	$("#discuss_list .market-showpage a.ajax").live("click",function(){
		$.get("/home/Marketdiscuss"+$(this).attr("href"),"",function(data){
			$("#discuss_list").html(data);
		})
		return false;
	})
}