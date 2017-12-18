;

csc.buyoffer = {};

csc.buyoffer.pass = function (url){
	$.get(url,function (data){
		if(data.status){
			csc.success(data.msg);
			setTimeout(function (){
				location.href="/inquiry/audit/?status=Y";
			},2000);
		}else{
			csc.alert(data.msg);
		}
	},"jsonp")
};

csc.buyoffer.refuse = function (){
	var	othis = this;
	artDialog({
		title: '请输入拒绝理由',
		padding:"10px 10px 0 10px",
		content:'<textarea name="auditMessage" style="width:298px;height:94px" id="auditMessage"></textarea>',
		fixed:true,
		lock:true,
		opacity:0.1,
		okVal:"提交",
		ok:function (){
			$.post("/inquiry/audit/auditInquiry/",{
				id:location.href.slice(-36),
				auditState:"R",
				auditMessage:$("#auditMessage").val()
			},function (data){
				if(data.status){
					csc.success(data.msg);
					setTimeout(function (){
						location.href="/inquiry/audit/?status=R";
					},2000);
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");
		}
	});
};

$(function (){
	var	othis = csc.buyoffer;
	$("div.ui-re-btn>a").bind("click",function (){
		var	$t = $(this);
		$t.text() == "通过审核" ? othis.pass($t.attr("href")) : othis.refuse();
		return false;
	});
});