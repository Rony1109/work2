//Enter键
function EnterKeyDown(obj,Obj) {
	var
	o = obj,
	O = Obj || {};
	$(o).keydown(function(e){
		var e=e||event;
　 		var currKey=e.keyCode||e.which||e.charCode;
		if(currKey == 13){
 			$(O).trigger("click");
			return;
		}
	});
}


$(function(){
	//EnterKeyDown("#goPage1","#jump");EnterKeyDown("#goPage2","#go");
	//分页跳转
	$("#jump,#go").bind("click",function(){
		var
		$t = $(this),
		pageVal = $t.parents("span.page-r").find(".goPage").val(),
		url = $t.prev("input:hidden").val(),
		totalPage = parseFloat($(".page-r strong").html());
		if(totalPage < parseFloat(pageVal)) {
			pageVal = totalPage;
		}
		if(pageVal == ""){
			pageVal = 1;
		}
		location = url + "&page=" + pageVal;
	});
});

//列表页批量删除
function del(){
	var n = $("table tbody .list-id input:checked").length;
	if (n < 1) {
		art.dialog({
		title : '提示',
		content : '请先选择操作项',
		fixed : true
		});
		return false;
	}
	var id=$("table tbody .list-id input:checked").map(function(){
		return this.value;
	}).get().join(",");
	deleteOne(id);
}

//列表页拒绝通过
function deleteOne(id) {
	nopassfun(function(nostr){
		$.post("auditOrderItem.batchNotAdopt", {
			id : id,
			refuseReason : nostr
		}, function (data) {
			aReturn(data, "审核成功！", "审核不通过");
		});
	})
	return false;
}
//列表页批量还原
function evert(){
	var n = $("table tbody .list-id input:checked").length;
	if (n < 1) {
		art.dialog({
		title : '提示',
		content : '请先选择操作项',
		fixed : true
		});
		return false;
	}
	var id=$("table tbody .list-id input:checked").map(function(){
		return this.value;
	}).get().join(",");
	evertOne(id,true);
}

//列表页单条还原
function evertOne(id,batch) {
	art.dialog({
		title : '提示',
		content : batch ? '确认要恢复所选的意向订单吗？' : '你确认需要将此条记录恢复吗？',
		fixed : true,
		okVal : '确认',
		opacity : "0.3",
		ok : function () {
			$.post("auditOrderItem.batchAdopt", {"id" : id}, function (data) {
				aReturn(data, "操作成功！", "操作失败！");
			});
		},
		cancel : true,
		lock : true
	});
}

//添充拒绝理由
function selVal(tmp) {
	$(".test-focus").find(".test-lay").remove();
	var ly = $("#testVal").val(),addstr = tmp.value.replace(/[\.,;!。，；！、]\s*$/,"");;
	if ($(tmp).attr("checked")) {
		if ($.trim(ly) != "" && !(/[；。！，!,\.;!]\s*$/ig.test(ly))){
			ly += "；";
		}
		ly += addstr;
		if(!/[；。！，!,\.;!]\s*$/ig.test(addstr)){
			ly += "；";
		}
	} else { //删除己选的拒绝理由(tmp为checkbox时有效);
		var reg = new RegExp($.trim(addstr)+"(\s*；\s*)*");
		ly = ly.replace(reg, "");
	}
	$("#testVal").val(ly);
}

//拒绝提示框
function nopassfun(callback){
		var tmpV = '<div class="ly-d-art sel-i-val"><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="非常抱歉，该意向订单存在恶意提交行为，已被管理员删除。如有任何疑问，请致电华南城网客服电话：400 184 8666" checked>1、非常抱歉，该意向订单存在恶意提交行为，已被管理员删除。如有任何疑问，请致电华南城网客服电话：400 184 8666</p></div>';
		art.dialog({
			title : '删除理由',
			content : tmpV + '<div class="test-focus"><textarea class="test-val" onfocus="textarea_maxlen.dRMouse()"  onblur="textarea_maxlen.eRMouse()" id="testVal" ></textarea><div id="test_msg" style="color:#F00;"></div><div class="test-lay">请输入理由，最多2000个字。</div></div>',
			fixed : true,
			okVal : '保存',
			background : "#000",
			opacity : "0.3",
			ok : function () {
				var textVal = document.getElementById("testVal").value;
				if(!re_jc(textVal)){//检查理由格式.
					return false;
				}
				callback(textVal);
			},
			init : function () {
				var $t = $(this.DOM.wrap[0]);
				$t.find(".test-focus").click(function () {
					$(this).children(".test-lay").remove();
				}).triggerHandler("click");
				$t.find("input:checked").triggerHandler("click");
			},
			cancel : true,
			lock : true
		});
}
//拒绝理由检测
function re_jc(str){
	var msg="";
	if ($.trim(str) == "") {
		msg = "请选择或输入理由!";
	}else if(str.length < 5){
		msg = "理由不能少于5个字！";
	}else if(str.length > 2000){
		msg = "理由不能超过2000个字！";
	}
	if(msg != ""){
		$("#test_msg").show().text(msg);
		return false;
	}else{
		$("#test_msg").hide();
		return true;
	}
}

function aReturn(tmp, po, pt) {
	if (tmp =="true") {
		art.dialog({
			content : po,
			icon : 'succeed',
			fixed : true,
			time : 1.5
		});
		setTimeout(function () {
			location.href = location.href;
		}, 1500);
	} else {
		art.dialog({
			content : pt,
			icon : 'error',
			fixed : true,
			time : 1.5
		});
	}
}

$(function (){
	$("#startTime,#endTime").bind("click",function (){
		$(this).next().triggerHandler("click");
	});
});