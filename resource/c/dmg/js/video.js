/*东盟馆首页 2014.1.21 by lg*/

function off(){//收起列表
	var menuWidth = $(".player-menu").children("ul").width()+4,playerWidth =$("#player").outerWidth(true);
	$("#player").animate({width:playerWidth+menuWidth},300,function(){$("#onOff").unbind().html("&lt;&lt;").attr("title","展开列表").bind("click",on);$("#on").show()});
}

function on(){//展开列表
	var menuWidth = $(".player-menu").children("ul").width()+4,playerWidth =$("#player").outerWidth(true);
	$("#player").animate({width:playerWidth-menuWidth},300,function(){$("#onOff").unbind().html("&gt;&gt;").attr("title","收起列表").bind("click",off);$("#on").hide();});
}

function player(){//播放视频
	var ul = $("#playeMenu").children("ul"),
		staticLink = ul.children().first().attr("src"),
		staticVideo = '<embed src="'+staticLink+'" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
		$("#player").html(staticVideo);
		ul.children().each(function(){
			$(this).bind("click",function(){
				var _link = $(this).attr("src"),
					str = _link.substring(_link.indexOf("sid/")+4,_link.indexOf("/v.swf")),
					autoVideo = '<embed src="http://static.youku.com/v/swf/qplayer.swf?VideoIDS='+str+'=&isAutoPlay=true&embedid" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
				$("#player").html(autoVideo);
				$(this).addClass("hover").siblings().removeClass("hover")
			});
		})
}