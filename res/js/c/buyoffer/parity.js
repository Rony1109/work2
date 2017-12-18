csc.buyoffer = {};

csc.buyoffer.agreeQuote = function (objData){
	objData.status = "Y";
	$.get("/inquiry/view/agree/",objData,function (data){
		csc.useDialog(function (){
			if(data.status){
				csc.success(data.msg);
				setTimeout(function (){
					location.href="/inquiry/list/?status=F";
				},2000);
			}else{
				csc.alert(data.msg);
			}
		});
	},"jsonp");
};

csc.buyoffer.showDetail = function (id){
	var	$id = $(id);
	$id.toggleClass("show-less");
	$id.html( $id.is(".show-less") ? "收起详情" : "展开详情").siblings(".ba-bd").toggleClass("ba-bd-cur");
};

csc.buyoffer.selectAll = function (){
	var	$all = $("input[name='selectAll']"),
			$inquiryId = $("ul :checkbox:not(:disabled)");
	$all.on("change",function (){
		var	prop = $(this).prop("checked");
		$all.prop("checked",prop);
		$inquiryId.prop("checked",prop);
	});
	$inquiryId.on("change",function (){
		$inquiryId.filter(":not(:checked)").length ? $all.prop("checked",false) : $all.prop("checked",true);
	});
	return this;
};

csc.buyoffer.parity = function (){
	var
		$form = $("form[name='compareform']"),
		$checked = $form.find("ul :checked");
	csc.useDialog(function (){
		if( $checked.length < 2){
			csc.tip("请至少选择两家报价进行对比！");
		}else if($checked.length > 4){
			csc.confirm("对不起，最多只能选择四家报价进行对比，是否清除已选报价！",function (){
				$form.find(":checked").prop("checked",false);
			});
		}else{
			$checked.closest("form").trigger("submit");
		}
	});
};

$(function (){
	var	othis = csc.buyoffer;
	$("span:contains('比价')").on("click",function (){
		othis.parity();
	});
	$("form[action^='/inquiry/viewPrice.html']").on("submit",function (){
		var	$t = $(this);
		$.post($t.attr("action"),$t.serializeArray(),function (data){
			csc.useDialog(function (){
				if(data.status === "1"){
					csc.success(data.msg);
					$.get(location.href,function (data){
						$("div.leave-msg").html($("div.leave-msg",data).html());
						$("ul.quote-dialog").html($("ul.quote-dialog",data).html());
					});
				}else if(data.status === "-2"){
					artDialog({
						id:'errorTip',
						title:false,
						content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2><p>'+data.msg+'</p>',
						fixed: true,
						lock:true,
						width:380,
						padding:'25px 50px 25px 25px',
						opacity:0,
						icon:'mem-n',
						ok:function(){},
						close:function(){ $("textarea[name='message']").focus() }
					});
				}else{
					csc.alert(data.msg);
				}
			});
		},"jsonp");
		return false;
	});
	othis.selectAll();
});