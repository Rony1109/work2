csc.buyoffer = {};

csc.buyoffer.quoteErrors = function (errors){
	var	othis = this;
	function showError(id,m){
		var	$td = id.closest("td,.leave-msg,.order-other"),
				$error = $td.children(".error");
		$td.is(".msg-box") || $td.addClass("msg-box");
		$error.length ? $error.html(m) : id.after('<p class="error">' + m + '</p>');
	}
	$.each(errors,function (n,m){
		showError($("[name='" + n + "']"),m);
	});
};

csc.buyoffer.showDetail = function (id){
	var	$id = $(id);
	$id.toggleClass("show-less");
	$id.html( $id.is(".show-less") ? "收起详情" : "展开详情").siblings(".ba-bd").toggleClass("ba-bd-cur");
};

csc.buyoffer.count = function (t){
	var	v = t.val() ? t.val() : 0,
			$td = t.closest("tr").children(":last"),
			$table = t.closest("table"),
			total = 0;
	$td.text(t.is("[name='productPrice']") ? v * $td.prev().text() : v);
	$table.find("th.total>strong").text(function (){
		$table.find("tbody tr>td:last-child").each(function (){
			total+=$(this).text()*1
		});
		return total;
	});
};

csc.buyoffer.upMsg = function (file,msg){
	var
		$li = $("#file-"+file.index),
		$upMsg = $("#upMsg");
	$li.length ? $li.html('<strong>'+file.name+'</strong> '+msg) :
		$upMsg.length ? $upMsg.append('<li id="file-'+file.index+'"><strong>'+file.name+'</strong> '+msg+'</li>') : $('<ul id="upMsg" class="up-img"><li id="file-'+file.index+'"><strong>'+file.name+'</strong> '+msg+'</li></ul>').appendTo($("input[name='imgUrl']").parent());	
};

csc.buyoffer.delPic = function (id,index){
	$(id).closest("li").remove();
	if(index){
		upFile.setStats({successful_uploads:upFile.getStats().successful_uploads-1});
	}
};

$(function (){
	var	othis = csc.buyoffer,
			isNum = /^\d+(\.\d+)?$/;
	$("form").on("submit",function (){
		var	$t = $(this);
		if($("#upMsg a[data-img]").length){
			var val="[";
			$("#upMsg a[data-img]").each(function (index,element){
				if(index>0){
					val += ","+JSON.stringify($(element).data("img"));
				}else{
					val += JSON.stringify($(element).data("img"));
				}
			});
			val += "]";
			$("input[name='imgUrl']").val(val);
		}
		$t.find(".msg-box").removeClass("msg-box");
		$.post(location.href,$t.serializeArray(),function (data){

			var failStatus=data.status;
			var a=[],b=[],errtxt='';
			for(var i in data.msg){//遍历json
				a.push(i);//key
				b.push((data.msg)[i]);//value
			}
			for(var i = 0; i <a.length; i++){//构建错误信息
				if(a[i]=="message"){
					errtxt += '<p><strong>留言</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
				}else if(a[i]=="instruction"){
					errtxt += '<p><strong>其他说明</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
				}
			}

			csc.useDialog(function (){
				if(data.status==="1"){
					csc.success(data.msg);
					$.get(location.href,function (data){
						$t.find("input[name='types']").val() == 'message' || upFile.setStats({successful_uploads:0});
						$t.find("input[name='imgUrl'],textarea").val("");
						$("#upMsg").remove();
						$("div.quote-order").html($("div.quote-order",data).html());
						$("div.leave-msg").html($("div.leave-msg",data).html());
						$("ul.quote-dialog").html($("ul.quote-dialog",data).html());
					});
				}if(data.status==="-2"){
					artDialog({
						id:'errorTip',
						title:false,
						content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2>'+errtxt,
						fixed: true,
						lock:true,
						width:380,
						padding:'25px 50px 25px 25px',
						opacity:0,
						icon:'mem-n',
						ok:function(){},
						close:function(){
							$("textarea[name='"+a[0]+"']").focus();//默认第一个设置焦点
						}
					});
				}else{
					if(data.msg){
						csc.alert(data.msg);
						return;
					}
					othis.quoteErrors(data.errors);
				}
			});			
		},"jsonp");
		return false;
	});
	$("td>.aff-text").live("change",function (){
		var	$t = $(this),
				$td = $t.parent("td"),
				msg = $td.prev("th").text().slice(0,4) + " 只能为数字";
		if(isNum.test($t.val()) || !$t.val()){
			$td.removeClass("msg-box");
			othis.count($t);
			return;
		}else{
			$td.addClass("msg-box");
			$t.next().is(".error") ? $t.next().html(msg) : $t.after('<p class="error">'+msg+'</p>')
		}
	});
});