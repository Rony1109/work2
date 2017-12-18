// JavaScript Document
$(function(){
	$("#discuss_titlediv>a").bind("click",$discuss_new);
	$(".discuss_type1 .comm a[toname]").live("click",function(){
		var obj = $(this),o={name:obj.attr("toname"),disid:obj.attr("disid")};
		$discuss_to.call(o);
	})
})

function $discuss_to(){//回复评论
	if(!this.disid){return;}
	$("#discuss_titlediv>span").html("回复(<strong>"+this.name+"</strong>)：");
	$("#discuss_titlediv>a").show();
	$discusss_hf(this.disid);
}
function $discuss_new(){//回发表新评论
	$("#discuss_titlediv>span").html("发表评论：");
	$("#discuss_titlediv>a").hide();
	$discusss_hf("");
	return false;
}

function $discusss_hf(val){
	var val = typeof(val) == "undefined"?"":val;
	$("#pl_disid").val(val);
}

function pl_tex_kd(o,maxcount){//限制字符数onkeydown = "pl_tex_kd(this,100)"
	var obj = $(o);
	var max_l = maxcount || obj.attr("maxcount");
	if(obj.val().length>max_l) return;
	obj.attr("temptext",obj.val());
}

function pl_onpaste(o,maxcount){//限制字符数onpaste = "pl_onpaste(this,100)" 需要pl_tex_ku事件支持
	var obj = $(o);
	var max_l = maxcount || obj.attr("maxcount");
	//setTimeout(function(){pl_tex_ku(obj,max_l)},200);
	setTimeout(function(){obj.trigger("keyup")},200);
}

function pl_tex_ku(o,maxcount,errfun){//限制字符数onkeyup = "pl_tex_ku(this,100)"
	var obj = $(o);
	var max_l = maxcount || $(o).attr("maxcount");
	var d_num = max_l - obj.val().length;
	if(d_num<0){
		obj.val(obj.attr("temptext"));
/*		clearTimeout(obj.attr("err_dh"));
		obj.attr("err_dh",setTimeout(function(){pl_tex_err(obj)},200));*/
		if(typeof(errfun) == "function") {errfun(obj);}
		d_num = max_l - obj.val().length;
		$(".word_count").html(d_num);
	}else{
		obj.attr("temptext",obj.val());
		$(".word_count").html(d_num);
	}
}

//
function pl_tex_err(o){
	var obj = $(o);
	var pl_tex_err_dh = function(){
		var obj = $(o);
		var er_n = $(".word_count");
		for(i=0 ; i<2 ; i++){
			setTimeout(function(){
				er_n.addClass("err_n");
				obj.addClass("err");
				setTimeout(function(){
					er_n.removeClass("err_n");
					obj.removeClass("err");
				},300);
			},i*600);
		}
	}
	clearTimeout(obj.attr("err_dh"));
	obj.attr("err_dh",setTimeout(function(){pl_tex_err_dh(obj)},200));
}

function pl_submit(login){
	if(login){$__clear_login();}
	var obj = $("#pl_form");
	if($.trim(obj.find("[name='content']").val()) == ""){
		csc.useDialog(function(){
			artDialog({
				ok:function(){
					obj.find("[name='content']").focus();
				},
				icon:"mem-e",
				content: "内容不能为空！"
			});
		});
		return false;
	};
	$.post(obj.attr("action"),obj.serialize(),function(data){
		data = $.trim(data);
		switch (data){
			case "1":
				$_open_login("pl_submit(1);eval");
				break;
			case "2":
				csc.useDialog(function(){
					csc.success("发表成功！",1.5);
					setTimeout(function(){location.reload();},1.5);
				});
				$.get($("#discuss_list").attr("ajax_reload"),"",function(data1){
					$("#discuss_list").html(data1);
					$("#market-basic-box .comm .ico_dp>span").html($("#allpl").html());
				})
				$("#pl_form").find("textarea[name='content']").val("");
				$discuss_new();//
				break;
			default:
				csc.useDialog(function(){
					artDialog({
						time:2,
						icon:"mem-e",
						content: "发表失败！请重试。"
					});
				});
				break;
		}
	})
	return false;
};
