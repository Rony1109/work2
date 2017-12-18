var _move=false;//移动标记
var _x,_y;//鼠标离控件左上角的相对位置
var mebUrl="//member.csc86.com";//会员消息
$(function(){
	$("a.s-h-b").live("click",function(){
		if($(".m-history").is(":hidden")){
			$(this).removeClass("l-hidd").addClass("l-show");
			$(".m-history").addClass("m-show");
		}else{
			$(this).removeClass("l-show").addClass("l-hidd");
			$(".m-history").removeClass("m-show");
		}
	 });
	//弹出信息可拖动
	 $("#pBlockBox h1").live("mousedown",function(e){
		_move = true;							   
        _x = e.pageX - parseInt($("#pBlockBox").css("left"));
        _y = e.pageY - parseInt($("#pBlockBox").css("top"));
        $("#pBlockBox").css({"background":"#0099FF", "cursor":"move"});
        $("#pBlockBox").fadeTo(20,0.85);
    });
	 $("#pBlockBox h1").live("mousemove",function(e){
        if(_move)
        {
            var x=e.pageX-_x;
            var y=e.pageY-_y;
			var h=document.body.scrollHeight;
			if((y+460)>h){
				$("#pBlockBox").css({top:(h-460),left:x});
			}else{
				$("#pBlockBox").css({top:y,left:x});
			}
        }
    });
	 $("#pBlockBox h1").live("mouseout",function(){
		stopMove();
    });
	 $("#pBlockBox h1").live("mouseup",function(){
		stopMove();
    });

});
//信息停止拖动
function stopMove(){
	_move=false;
    $("#pBlockBox").fadeTo("fast",1);
   	$("#pBlockBox").css({"background":"#fff", "cursor":"default"});
}

function closeDiv(){
	$("select").removeClass("sel-hidden");
	var pBlockBox=document.getElementById("pBlockBox");
	pBlockBox.style.display="none";
	document.body.style.overflow = "auto"; //恢复页面滚动条
	//$("html").css("overflow","auto");//document.body.style.overflow
	$("html").removeAttr("style");
	var bodya= document.getElementsByTagName("body");
	var mybg = document.getElementById("mybg");
	bodya[0].removeChild(mybg);
	$("#pBlockBox").html("");
	
}

function pBlockBoxinit(){
	var pBlockBox=document.getElementById("pBlockBox");
	//$("#pBlockBox").show();
	pBlockBox.style.display="block";
	//以下部分要将弹出层居中显示
	pBlockBox.style.left=(document.documentElement.clientWidth-860)/2+document.documentElement.scrollLeft+"px";
	pBlockBox.style.top=(document.documentElement.clientHeight-500)/2+document.documentElement.scrollTop+"px";
	 
	//以下部分使整个页面至灰不可点击
	var procbg = document.createElement("div"); //首先创建一个div
	procbg.setAttribute("id","mybg"); //定义该div的id
	procbg.style.background = "#000000";
	procbg.style.width = "100%";
	procbg.style.height = "100%";
	procbg.style.position = "fixed";
	procbg.style.top = "0";
	procbg.style.left = "0";
	procbg.style.zIndex = "500";
	procbg.style.opacity = "0.3";
	procbg.style.filter = "Alpha(opacity=30)";
	 
	//背景层加入页面
	document.body.appendChild(procbg);
	//document.body.style.overflow = "hidden"; //取消滚动条
}
/*
* 以下内容描述作者:张大权
* 功能描述：发信息一套流程
*/
function setValue(obj,t){
	$(obj).children(".h-r").children("div").removeAttr("style");
	html="<div class=\"mes-all mes-"+("myself"==t?"self":"other")+"\">";
	html+="<p><b>标题：</b>";
	html+=$(obj).children("li").children("div").html()+"</p><p><b>内容：</b>";
	html+=$(obj).children("li").children("input").val()+"</p></div>";	
	$(".l-t12").html(html).scrollTop(5000);
	
}
csc._ajax=function(box,url){
	$.get(url,function(data){
		data =  data.code;
		//console.info(data);return;
		if(box){		
			$("#"+box).html(data);	
		}else{
			if(1==data){
				csc.success("操作成功");
				closeDiv();
			}else{
				var html="<div class=\"mes-all mes-self\"><p><b>主题：</b>"+$("#title_arm").val()+"</p><p><b>内容：</b>"+$("#content_arm").val()+"</p></div>";
				$(".l-t12").html($(".l-t12").html()+html).scrollTop(1000);
				$("#title_arm").val("");
				$("#content_arm").val("");
				csc._ajax("messageListBox",mebUrl+'/personal/message/messagelist?fuid='+$("#fuid").val());
			}
		}
		if(location.href.indexOf("allMessage")>-1){
			ajaxRe(mebUrl+"/personal/message/allMessagelist?t=f&page="+$("#curPage").val(),"AllMessageBox");
			ajaxRe(mebUrl+"/personal/message/getmessagenum","allmsg");
			
		}		   
	},"jsonp");
	/*
	$.ajax({
	type: "GET",
	url: url,
	data:url,
	success: function(data){
		
		
	}
});*/
}
function showMessage(fuid){
	var url=mebUrl+"/personal/message/?fuid="+fuid;
	$("select").addClass("sel-hidden");
	$("html").css("overflow","hidden");//document.body.style.overflow
	document.body.style.overflow = "hidden"; //恢复页面滚动条
	pBlockBoxinit();
	csc._ajax("pBlockBox",url);
}
function messageSend(fuid,t){
	var data="";
	if("m"==t){
		fuid=$("#fuidlist").val();
		if(!fuid){csc.alert("请选择要发信息的好友列表");return;}
		data=$("#fuidListForm").serialize();
		
	}else{
		data=$("#fuidListForm").serialize()+"&fuid="+fuid;
	}
	var tit=document.getElementById("title_arm").value;
	var cont=document.getElementById("content_arm").value;
	if(tit=="不超过20汉字...."||tit==""){
		csc.alert("请正确填写标题");
		$("#title_arm").focus();
		return;
	}
	if("不超过200汉字...."==cont||""==cont){
		csc.alert("请正确填写内容");
		$("#content_arm").focus();
		return;
	}
	var url=mebUrl+"/personal/message/send?t="+t+"&"+data;	
	csc._ajax("",url);
}
////选择多个好友
function selFriendsBySendMessage(obj,fuid){
	var name=$(obj).children("strong").html();
	var v=$("#friendslist").val();
	var tf=v.split(",");
	if(tf.length>5){
		csc.alert("您最多只能选择5个好友");
		return;
	}
	//判断是否已经选择了数据
	key=name+"|"+fuid;
	for(var i=1;i<tf.length;i++){
		
		if(key==tf[i]) return ;
	}
	tv=v.replace(","+name+"|"+fuid,"");//如果再次点击就替换之后在赋值		
	$("#friendslist").val(tv+","+name+"|"+fuid);//赋值
	html="<div class=\"sel-name cur\"><strong>"+name+"</strong><a href=\"javascript:\" onclick=\"del(this,'"+fuid+"','"+name+"','s')\" class=\"sel-close\">关闭</a></div>";
	if("cur"==obj.className) return;//避免列表中重复出现相同到用户信息
	var th=$(".sel-pr").html();
	$(obj).addClass("cur");
	$("#getFriendInMessageBOx").html(th+html);		
}
function del(obj,fuid,name,t){
	if("s"==t){
		$("#"+fuid+"_messageBox").removeClass("cur");
		var v=$("#friendslist").val();
		tv=v.replace(","+name+"|"+fuid,"");
		$("#friendslist").val(tv);		
		var th=tv.split(",");
		var html="";
		for(var i=1;i<th.length;i++){
			tmp=th[i].split("|");
			html+="<div class=\"sel-name cur\"><strong>"+tmp[0]+"</strong><a href=\"javascript:\" onclick=\"del(this,'"+tmp[1]+"','"+tmp[0]+"','s')\" class=\"sel-close\">关闭</a></div>";;
		}
		$("#getFriendInMessageBOx").html(html);
		
	}else if("m"==t){
		key=","+name+"|"+fuid;
		fuidlist=$("#fuidlist").val();
		$("#fuidlist").val(fuidlist.replace(key,""));
		flist=$("#fuidlist").val();
		th=flist.split(",");
		html = "";
		for(var i=1;i<th.length;i++){
			tmp=th[i].split("|");
			html += "<span>"+tmp[0]+"<a href=\"javascript:\" onclick=\"del(this,'"+tmp[1]+"','"+tmp[0]+"','m')\" >关闭</a></span>";
		}
		$('#friendListMessageBox').html(html);
		
	}
}
function selFriendsSuccess(){
	csc._ajax('pBlockBox',mebUrl+'/personal/message/?t=g_m&'+$("#_fuidListForm").serialize());
}

//显示个人名片
