/*会员中心 旭日排名*/
function showbding(){
	$("#xrsltlist").hover(function(){
		$("#bding").parent().show();
	},function(){
		$("#bding").parent().hide();
	});
}

function xrHover(){
	$("#bding").children("li").bind("mouseover",function(){
		$(this).addClass("hover").siblings(".hover").removeClass("hover");
	});
}

function xrClick(){
	$("#bding").children("li").bind("click",function(){
		var a = $(this).children("div").clone();
		$("#xrslt").children("div").replaceWith(a);
		$("#bding").parent().hide();
	});
}

function cancelkey(id){
	artDialog({
		id:"cscSuccess",
		title: false,
		fixed: true,
		close:true,
		content:"<span class='l-h-24'>这个关键词好像带来不少曝光,<br>取消排名后，有可能抢不回来了哦！</span>",
		icon:_ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
		ok:function(){
			$.post("//search.csc86.com/deletePayKeyword.do",{"id":id},function(data){
				if(data.success){location.reload();}else{
					artDialog({id:"cscError",content:data.msg,fixed: true,title: false,icon:_ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',ok:true,time:3});
				}
			},"jsonp");
		},
		okVal:"我要换词",
		cancelVal: "那算了",
		cancel:true
	});
}

/*绑定关键词*/
function bindKey(){
	var div = $("#xrslt").children("div"), 
		id = div.attr("id"),
		txt = $("#keyword").val(),
		msg = '<div class="g-t-c"><img src="//res.csc86.com/js/p/artDialog/4.1.5/skins/icons/mem-c.png"><strong class="g-fs-14 m-l-15">添加成功</strong></div><div class="m-t-25 g-t-c"><a href="//search.csc86.com/user/gotoAddNoPayKeyword.do" class="uu-btn-s"><em>&nbsp;&nbsp;继续添加&nbsp;&nbsp;</em></a><a href="//search.csc86.com/user/noPayKeywordList.do" class="uu-btn-s m-l-30"><em>&nbsp;&nbsp;查看&nbsp;&nbsp;</em></a></div>';
	if(id!=null && id!=undefined && id!=""){
		var _data={'productId':id,'keyword':txt},
		_url='//search.csc86.com/addNoPayKeyword.do';
		if($("#addPayKey")[0]){
			var paywordCountId=$("select[name=paywordCountId] option:selected").val();
			msg = '<div class="g-t-c"><img src="//res.csc86.com/js/p/artDialog/4.1.5/skins/icons/mem-c.png"><strong class="g-fs-14 m-l-15">添加成功</strong></div><div class="m-t-25 g-t-c"><a href="//search.csc86.com/user/gotoAddPayKeyword.do" class="uu-btn-s"><em>&nbsp;&nbsp;继续添加&nbsp;&nbsp;</em></a><a href="//search.csc86.com/user/payKeywordList.do" class="uu-btn-s m-l-30"><em>&nbsp;&nbsp;查看&nbsp;&nbsp;</em></a></div>';
			_data={'productId':id,'keyword':txt,'paywordCountId':paywordCountId};
			_url='//search.csc86.com/addPayKeyword.do';
		}
		if($("#modifyPayKey")[0]){
			var payWordId=$("input[name=payWordId]").val();
			msg='<div class="g-t-c"><img src="//res.csc86.com/js/p/artDialog/4.1.5/skins/icons/mem-c.png"><strong class="g-fs-14 m-l-15">修改成功</strong></div><div class="m-t-25 g-t-c"><a href="//search.csc86.com/user/payKeywordList.do" class="uu-btn-s"><em>&nbsp;&nbsp;查看&nbsp;&nbsp;</em></a></div>';
			_data={'productId':id,'keyword':txt,'payWordId':payWordId};
			_url='//search.csc86.com/updatePayKeyword.do';
		}
		$.ajax({
			async:false,
			url:_url,
			type:'post',
			data:_data,
			success:function(data){
				if(data.success){
					artDialog({
						id:"cscSuccess",
						content:msg,
						width: 270,
						height: 135,
						fixed: true,
						title: false,
						close:true,
						time:3
					});	
				}else{
					artDialog({id:"cscError",content:data.msg,fixed: true,title: false,icon:_ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',ok:true,time:3});
				}
			},
			dataType:'jsonp'
		});
	}else{csc.useDialog(function(){csc.tip("先选个产品吧",1)})}
}


$(function(){
	showbding();
	xrHover();
	xrClick();
	
	/*排名管理选择关键词状态*/
	$("#selectDateType").change(function(){
		var _this=$(this);
		var _url=_this.attr("data-url");
		window.location = _url+"?dateType=" + _this.val();
	});
	
	/*排名管理分页*/
	$(".gotoPage").click(function(){
		var _this=$(this);
	    var pageNo = _this.siblings(".pageNo").val(); 
	    var pageCount = _this.attr("pageCount");
	    var currentPage = _this.attr("pageNo");
		if(pageNo == null || pageNo == ""){
		    return false;
		}
		pageNo = parseInt(pageNo);
		pageCount = parseInt(pageCount);

		if(pageNo > pageCount){
		    pageNo.val(pageCount);
		}
		
		_this.closest(".getoForm").submit();
	});
	
	/*添加关键词排名 切换*/
	$('.addkey-tab input').change(function(){
		var _index=$('.addkey-tab input').index(this);
		_index==1?window.location.href="//search.csc86.com/user/gotoAddPayKeyword.do":window.location.href="//search.csc86.com/user/gotoAddNoPayKeyword.do";
	});
})