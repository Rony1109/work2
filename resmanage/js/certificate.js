var url = BASEURL + "bops-app/bops/";
var ref_arr = [
	"请选择与此证书相符合的证书类别",
	"请填写正确的证书名称",
	"请填写与证书相符的发证机构",
	"生效日期填写有误",
	"请填写与证书显示一致的生效日期",
	"请上传与证书名称相符的证书图片",
	"请上传有效的证书图片",
	"请上传清晰的证书图片",
	"相同的证书图片不能重复添加",
	"严禁上传淫秽、低俗、反动等国家违禁图片",
	"证书必须是由政府机构或第三方机构核准并颁发的企业、产品等资质证明",
	"企业证书的公司名称与该企业会员的公司名称不相符",
	"图片有第三方水印",
	"请根据证书填写正确的证书编号"
];

var ref = function(){
	var html;
	html = '<p style="height:20px;">请选择或输入拒绝理由：</p><div class="ly-d-art">';
	for(i=0;i<ref_arr.length;i++){
		html += '<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="'+ref_arr[i]+'">'+(i+1)+'、'+ref_arr[i]+'</p>'
	}
	html += '</div>';
	html += '<div class="test-focus"><textarea class="test-val" onfocus="textarea_maxlen.dRMouse()"  onblur="textarea_maxlen.eRMouse()" id="testVal" ></textarea><div id="test_msg" style="color:#F00;"></div><div class="test-lay">请输入理由，最多2000个文字。</div></div>';
	return html;
}();
//

/*
待审核中批量：	<input type="button" value="通过" onclick="passSig(this,'C','C','all')" />
<input type="button" value="拒绝" onclick="noPass(this,'N','C','all')" />
待审核中单个：	<input type="button" value="通过" onclick="passSig(this,'C','C','one')" />
<input type="button" value="拒绝" onclick="noPass(this,'N','C','one')" />
待审核中详情页：<input type="button" value="通过" onclick="passSig(this,'C','C','sign')" />
<input type="button" value="拒绝" onclick="noPass(this,'N','C','sign')" />
已通过中批量：	<input type="button" value="移动到'未通过'" onclick="noPass(this,'N','Y','all')" />
已通过中详情页：<input type="button" value="移动到'未通过'" onclick="noPass(this,'N','Y','sign')" />
未通过中批量：	<input type="button" value="移动到'已通过'" onclick="passSig(this,'Y','N','all')" />
未通过中详情页：<input type="button" value="移动到'已通过'" onclick="passSig(this,'Y','N','sign')" />
 */

$(function(){
	$("li.li-last a:contains('" + $("#masterCur").attr("value") + "')").closest("li").addClass("ln-3th-cur");
	if (typeof hs == "undefined") hs= null;
	if (hs){
		hs.graphicsDir = 'http://resmanage.csc86.com/js/highslide-4.1.13/highslide/graphics/';
		hs.showCredits = false;
		hs.dimmingOpacity = 0.75;
		hs.align = 'center';
		hs.wrapperClassName = 'wide-border';
		hs.outlineType = 'rounded-white';
		hs.wrapperClassName = 'draggable-header';
		hs.lang["restoreTitle"] = "点击还原,支持鼠标拖动.";
		$("a.highslide").on("click", function () {
			return hs.expand(this);
		})
	}
});

//通过
function passSig(obj, sta, val) {
	var allId,
	allMid;
	switch (val) {
	case "all":
		var selT = $("table tbody .list-id input:checked").length;
		if (selT > 0) {
			var tmp = [],
			tmp1 = [];
			for (var i = 0; i < selT; i++) {
				tmp.push($("table tbody .list-id input:checked").eq(i).attr("value"));
				tmp1.push($("table tbody .list-id input:checked").eq(i).data("id"));
			}
			allId = tmp.join(",");
			allMid = tmp1.join(",");
			$.post("shopBookAudit.setMoreBookState", {
				"tId" : allMid,
				"mId" : allId,
				"checked" : sta
			}, function (data) {
				aReturn(data, "审核成功！", "审核失败！");
			}, "jsonp");
		} else {
			art.dialog({
				content : '请先选择您要转移的证书！',
				fixed : true,
				time : 1.5
			});
		}
		break;
	case "one":
		var allId = $(obj).parent("td").siblings(".list-id").children("input").attr("value");
		var allMid = $(obj).parent("td").siblings(".list-id").children("input").data("id");
		var $tr=$(obj).parents("tr:first");
		var dataObj=JSON.stringify({"company":$tr.data("company"),"bookname":$tr.data("bookname"),"agency":$tr.data("agency")});
		
		//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
		isHaveMgc('shopBookAudit.check',{rows:[dataObj]},function(){
			$.post("shopBookAudit.setOneBookState", {
				"tId" : allMid,
				"mId" : allId,
				"checked" : sta
			}, function (data) {
				aReturn(data, "审核成功！", "审核失败！");
			}, "jsonp");
		});
		break;
	case "sign":
		var allId = $("#hidID").attr("value");
		var allMid = $("#hidID").data("id");
		var $btn=$(obj);
		var dataObj=JSON.stringify({"company":$btn.data("company"),"bookname":$btn.data("bookname"),"agency":$btn.data("agency")});
		//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
		isHaveMgc('shopBookAudit.check',{rows:[dataObj]},function(){
			$.post("shopBookAudit.setOneBookState", {
				"tId" : allMid,
				"mId" : allId,
				"checked" : sta
			}, function (data) {
				aReturnHo(data, "审核成功！", "审核失败！");
			}, "jsonp");
		});
		break;
	}
}
function noPass(obj, sta, val) {
	var allId,
	allMid;
	switch (val) {
	case "all":
		var selT = $("table tbody .list-id input:checked").length;
		if (selT > 0) {
			var tmp = [],
			tmp1 = [];
			for (var i = 0; i < selT; i++) {
				tmp.push($("table tbody .list-id input:checked").eq(i).attr("value"));
				tmp1.push($("table tbody .list-id input:checked").eq(i).data("id"));
			}
			allId = tmp.join(",");
			allMid = tmp1.join(",");
			refun(allId, allMid, sta, "shopBookAudit.setMoreBookState", val);
		} else {
			art.dialog({
				content : '请先选择您要转移的证书！',
				fixed : true,
				time : 1.5
			});
		}
		break;
	case "one":
		var allId = $(obj).parent("td").siblings(".list-id").children("input").attr("value");
		var allMid = $(obj).parent("td").siblings(".list-id").children("input").data("id");
		refun(allId, allMid, sta, "shopBookAudit.setOneBookState", val);
		break;
	case "sign":
		var allId = $("#hidID").attr("value");
		var allMid = $("#hidID").data("id");
		refun(allId, allMid, sta, "shopBookAudit.setOneBookState", val);
		break;
	}
}

function refun(allId, allMid, sta, url, val) {
	art.dialog({
		title : "拒绝理由",
		content : ref,
		fixed : true,
		okVal : '保存',
		background : "#000",
		opacity : "0.3",
		ok : function () {
			var textVal = document.getElementById("testVal").value,
				testValue;
			if(!re_jc(textVal)){
				return false;
			}
			testValue = textVal;
			if (val == "sign") {
				$.post(url, {
					"tId" : allMid,
					"mId" : allId,
					"checked" : sta,
					"reason" : testValue
				}, function (data) {
					aReturnHo(data, "操作成功！", "操作失败");
				}, "jsonp");
			} else {
				$.post(url, {
					"tId" : allMid,
					"mId" : allId,
					"checked" : sta,
					"reason" : testValue
				}, function (data) {
					aReturn(data, "操作成功！", "操作失败");
				}, "jsonp");
			}
		},
		init : function () {
			$(".test-focus").click(function () {
				//$(".ly-d-art input").removeAttr("checked");
				$(this).children(".test-lay").remove();
			});
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
//时间搜索
function searchByTime(obj, key) {
	var startTime = document.getElementById("startTime").value;
	var endTime = document.getElementById("endTime").value;
	if (startTime == "" && endTime == "") {
		switch (key) {
		case "all":
			window.location.href = "shopBookAudit.findBooksByTime?start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "C":
			window.location.href = "shopBookAudit.findBooksByTime?checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "Y":
			window.location.href = "shopBookAudit.findBooksByTime?checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "N":
			window.location.href = "shopBookAudit.findBooksByTime?checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		}
	} else if (startTime == "" && endTime != "") {
		switch (key) {
		case "all":
			window.location.href = "shopBookAudit.findBooksByTime?endTime=" + endTime + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "C":
			window.location.href = "shopBookAudit.findBooksByTime?endTime=" + endTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "Y":
			window.location.href = "shopBookAudit.findBooksByTime?endTime=" + endTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "N":
			window.location.href = "shopBookAudit.findBooksByTime?endTime=" + endTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		}
	} else if (endTime == "" && startTime != "") {
		switch (key) {
		case "all":
			window.location.href = "shopBookAudit.findBooksByTime?beginTime=" + startTime + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "C":
			window.location.href = "shopBookAudit.findBooksByTime?beginTime=" + startTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "Y":
			window.location.href = "shopBookAudit.findBooksByTime?beginTime=" + startTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "N":
			window.location.href = "shopBookAudit.findBooksByTime?beginTime=" + startTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		}
	} else {
		switch (key) {
		case "all":
			window.location.href = "shopBookAudit.findBooksByTime?beginTime=" + startTime + "&endTime=" + endTime + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "C":
			window.location.href = "shopBookAudit.findBooksByTime?beginTime=" + startTime + "&endTime=" + endTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "Y":
			window.location.href = "shopBookAudit.findBooksByTime?beginTime=" + startTime + "&endTime=" + endTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		case "N":
			window.location.href = "shopBookAudit.findBooksByTime?beginTime=" + startTime + "&endTime=" + endTime + "&checked=" + key + "&start=0&actionType=byTime";
			document.getElementById("begin_time").value = startTime;
			document.getElementById("end_time").value = endTime;
			break;
		}
	}
	//$.get("shopBookAudit.findBooksByTime",{"beginTime": startTime,"endTime":endTime,"start":"0"},function(data){
	//},"jsonp");
}

function fieldPage(pageVal, key) {
	var field = $("#condition_field").val();
	var number = $("#select_number").val();
	var url = "shopBookAudit.findBooksByField?actionType=byField&";
	if (pageVal == "") {
		if (key == "all") {
			if (field == "") {
				url += "start=0";
				window.location.href = url;
			} else {
				url += "start=0" + "&number=" + number + "&field=" + field;
				window.location.href = url;
			}
		} else {
			if (field == "") {
				url += "start=0" + "&checked=" + key;
				window.location.href = url;
			} else {
				url += "start=0" + "&number=" + number + "&field=" + field + "&checked=" + checked;
				window.location.href = url;
			}
		}
	} else {
		if (key == "all") {
			if (field == "") {
				url += "start=" + pageVal;
				window.location.href = url;
			} else {
				url += "start=" + pageVal + "&field=" + field + "&number=" + number;

				window.location.href = url;
			}
		} else {
			if (field == "") {
				url += "start=" + pageVal + "&checked=" + key;
				window.location.href = url;
			} else {
				url += "start=" + pageVal + "&field=" + field + "&checked=" + key + "&number=" + number;
				window.location.href = url;
			}
		}
	}
}

function timePage(pageVal, key) {
	var beginTime = $("#begin_time").val();
	var endTime = $("#end_time").val();
	var url = "shopBookAudit.findBooksByTime?actionType=byTime&";
	if (pageVal == "") {
		if (key == "all") {
			if (beginTime == "" && endTime == "") {
				window.location.href = "shopBookAudit.findBooksByState?actionType=byState&start=0";
			} else if (beginTime == "" && endTime != "") {
				url += "start=0" + "&endTime=" + endTime;
				window.location.href = url;
			} else if (beginTime != "" && endTime == "") {
				url += "start=0" + "&beginTime=" + beginTime;
				window.location.href = url;
			} else {
				url += "start=0" + "&beginTime=" + beginTime + "&endTime=" + endTime;
				window.location.href = url;
			}
		} else {
			if (beginTime == "" && endTime == "") {
				window.location.href = "shopBookAudit.findBooksByState?actionType=byState&start=0" + "&checked=" + key;
			} else if (beginTime == "" && endTime != "") {
				url += "start=0" + "&checked=" + key + "&endTime=" + endTime;
				window.location.href = url;
			} else if (beginTime != "" && endTime == "") {
				url += "start=0" + "&checked=" + key + "&beginTime=" + beginTime;
				window.location.href = url;
			} else {
				url += "start=0" + "&checked=" + key + "&beginTime=" + beginTime + "&endTime=" + endTime;
				window.location.href = url;
			}
		}
	} else {
		if (key == "all") {
			if (beginTime == "" && endTime == "") {
				window.location.href = "shopBookAudit.findBooksByState?actionType=byState&start=" + pageVal;
			} else if (beginTime == "" && endTime != "") {
				url += "start=" + pageVal + "&endTime=" + endTime;
				window.location.href = url;
			} else if (beginTime != "" && endTime == "") {
				url += "start=" + pageVal + "&beginTime=" + beginTime;
				window.location.href = url;
			} else {
				url += "start=" + pageVal + "&beginTime=" + beginTime + "&endTime=" + endTime;
				window.location.href = url;
			}
		} else {
			if (beginTime == "" && endTime == "") {
				window.location.href = "shopBookAudit.findBooksByState?actionType=byState&start=" + pageVal + "&checked=" + key;
			} else if (beginTime == "" && endTime != "") {
				url += "start=" + pageVal + "&checked=" + key + "&endTime=" + endTime;
				window.location.href = url;
			} else if (beginTime != "" && endTime == "") {
				url += "start=" + pageVal + "&checked=" + key + "&beginTime=" + beginTime;
				window.location.href = url;
			} else {
				url += "start=" + pageVal + "&checked=" + key + "&beginTime=" + beginTime + "&endTime=" + endTime;
				window.location.href = url;
			}
		}
	}
}

function page(state, pageNo) {
	var beginTime = $("#begin_time").val();
	var endTime = $("#end_time").val();
	var field = $("#condition_field").val();
	var number = $("#select_number").val();
	var action = $("#action_type").val();
        var url="shopBookAudit.findBooksByTime?actionType=byTime";
        var URL="shopBookAudit.findBooksByField?actionType=byField";
        var Url="shopBookAudit.findBooksByState?actionType=byState";
	if (state == "all") {
		if (action == "byTime") {
			url += "&start=" + pageNo
		}
		if (action == "byField") {
			URL += "&start=" + pageNo + "&number=" + number;
		}
		if (action == "byState") {
			Url += "&start=" + pageNo;
		}
	} else {
		if (action == "byTime") {
			url += "&start=" + pageNo + "&checked=" + state;
		}
		if (action == "byField") {
			URL += "&start=" + pageNo + "&checked=" + state + "&number=" + number;
		}
		if (action == "byState") {
			Url += "&start=" + pageNo + "&checked=" + state;
		}
	}
	switch (state) {
	case "all":
		if (action == "byTime") {
			if (beginTime.length > 0) {
				url += "&beginTime=" + beginTime;
				window.location.href = url;
			} else {
				window.location.href = url;
			}

			if (endTime.length > 0) {
				url += "&endTime=" + endTime;
				window.location.href = url;
			} else {
				window.location.href = url;
			}
		}
		if (action == "byField") {
			if (field.length > 0) {
				URL += "&field=" + field;
				window.location.href = URL;
			} else {
				window.location.href = URL;
			}
		}
		if (action == "byState") {
			window.location.href = Url;
		}
		break;
	case "Y":
		if (action == "byTime") {
			if (beginTime.length > 0) {
				url += "&beginTime=" + beginTime;
				window.location.href = url;
			} else {
				window.location.href = url;
			}

			if (endTime.length > 0) {
				url += "&endTime=" + endTime;
				window.location.href = url;
			} else {
				window.location.href = url;
			}
		}
		if (action == "byField") {
			if (field.length > 0) {
				URL += "&field=" + field;
				window.location.href = URL;
			} else {
				window.location.href = URL;
			}
		}
		if (action == "byState") {
			window.location.href = Url;
		}
		break;
	case "C":
		if (action == "byTime") {
			if (beginTime.length > 0) {
				url += "&beginTime=" + beginTime;
				window.location.href = url;
			} else {
				window.location.href = url;
			}

			if (endTime.length > 0) {
				url += "&endTime=" + endTime;
				window.location.href = url;
			} else {
				window.location.href = url;
			}
		}

		if (action == "byField") {
			if (field.length > 0) {
				URL += "&field=" + field;
				window.location.href = URL;
			} else {
				window.location.href = URL;
			}
		}
		if (action == "byState") {
			window.location.href = Url;
		}
		break;
	case "N":
		if (action == "byTime") {
			if (beginTime.length > 0) {
				url += "&beginTime=" + beginTime;
				window.location.href = url;
			} else {
				window.location.href = url;
			}

			if (endTime.length > 0) {
				url += "&endTime=" + endTime;
				window.location.href = url;
			} else {
				window.location.href = url;
			}
		}
		if (action == "byField") {
			if (field.length > 0) {
				URL += "&field=" + field;
				window.location.href = URL;
			} else {
				window.location.href = URL;
			}
		}
		if (action == "byState") {
			window.location.href = Url;
		}
		break;
	}
}

//跳转
function skip(obj, key) {
	var pageVal = $(obj).prev("#inputpagetop").attr("value");
	var action = $("#action_type").val(),
	$page = parseFloat($(".page-r strong").html());
	if ($page < parseFloat(pageVal)) {
		art.dialog({
			content : "您当前输入的页码数超出实际页码数！",
			icon : 'error',
			fixed : true,
			time : 1.5
		});
	} else {
		if (action == "byTime") {
			timePage(pageVal, key);
		}
		if (action == "byField") {
			fieldPage(pageVal, key);
		}
		if (action == "byState") {
			page(key, pageVal);
		}
	}

}

//搜索
function searchByField(key) {
	var field = $("#text_field").val();
	var number = $("#select_Field").val();
	var url = "shopBookAudit.findBooksByField?start=0&actionType=byField&";
	switch (key) {
	case "all":
		if (field == "" || field == null) {
			url += "number=" + number;
			window.location.href = url;
		} else {
			url += "number=" + number + "&field=" + field;
			window.location.href = url;
		}
		break;
	case "C":
		if (field == "" || field == null) {
			url += "number=" + number + "&checked=" + key;
			window.location.href = url;
		} else {
			url += "number=" + number + "&field=" + field + "&checked=" + key;
			window.location.href = url;
		}
		break;
	case "Y":
		if (field == "" || field == null) {
			url += "number=" + number + "&checked=" + key;
			window.location.href = url;
		} else {
			url += "number=" + number + "&field=" + field + "&checked=" + key;
			window.location.href = url;
		}
		break;
	case "N":
		if (field == "" || field == null) {
			url += "number=" + number + "&checked=" + key;
			window.location.href = url;
		} else {
			url += "number=" + number + "&field=" + field + "&checked=" + key;
			window.location.href = url;
		}
		break;

	}

}

function aReturn(tmp, po, pt) {
	if (tmp >= 1) {
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
function aReturnHo(tmp, po, pt) {
	if (tmp >= 1) {
		art.dialog({
			content : po,
			icon : 'succeed',
			fixed : true,
			time : 1.5
		});
		setTimeout(function () {
			history.back();
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
function selVal(tmp) {
	$(".test-focus").find(".test-lay").remove();
	var ly = $("#testVal").val();
	if ($(tmp).attr("checked")) {
		if ($.trim(ly) != "" && !/；\s*$/ig.test(ly)) {
			ly += "；";
		}
		ly += tmp.value;
	} else {
		var reg = new RegExp("(\s*；\s*)*" + $.trim(tmp.value));
		ly = ly.replace(reg, "");
		ly = ly.replace(/^(\s*；\s*)*/, "");
	}
	$("#testVal").val(ly);
}
function nextBook() {
	var checked = $("#hid_state").val();
	var num = $("#hid_number").val();
	var start = $("#hid_start").val();
	var totalPage = $("#hid_totalPage").val();
	var currentPage = $("#hid_currentPage").val();
	var size = $("#hid_size").val();
	var field=$("#hid_field").val();
	var item=$("#hid_item").val();
	var random=$("#hid_random").val();
	num = parseInt(num) + 1;
	size = parseInt(size) + 1;
	var url = "shopBookAudit.findNextBook?";
	if (start == totalPage && num == size) {
		alert("已经没有下一条了！");
	} else {
                if(field != "" && item !=""){
                    url+="state=" + checked + "&number=" + num + "&currentPage=" + currentPage + "&field=" +field+"&item="+item+"&random="+random;
                }else{
                    url+="state=" + checked + "&number=" + num + "&currentPage=" + currentPage + "&random="+random;
                }
		window.location.href = url;
	}
}

function closeBook() {
	var pageNo = $("#hid_currentPage").val();
	var checked = $("#hid_state").val();
	var actionType = $("#hid_action").val();
	var beginTime = $("#hid_beginTime").val();
	var endTime = $("#hid_endTime").val();
	var field = $("#hid_field").val();
	var item = $("#hid_item").val();
/*	var url_state = "shopBookAudit.findBooksByState?actionType=byState";
	var url_time = "shopBookAudit.findBooksByTime?actionType=byTime";
	var url_field = "shopBookAudit.findBooksByField?actionType=byField";*/
	var url_a = {
		"byState":"shopBookAudit.findBooksByState?actionType=byState",
		"byTime":"shopBookAudit.findBooksByTime?actionType=byTime",
		"byField":"shopBookAudit.findBooksByField?actionType=byField"}
	var url = url_a[actionType] + "&start=" + pageNo;
	if (checked != "A"){url += "&checked=" + checked;}
	if (beginTime !=""){url += "&beginTime=" + beginTime;}
	if (endTime != ""){url += "&endTime=" + endTime;}
	if (field != "" && item != "") {url += "&field=" + field + "&number=" + item;}
	window.location.href  = url;

	/*if (actionType == "byState") {
		if (checked != "A") {
			url_state += "&start=" + pageNo + "&checked=" + checked;
		} else {
			url_state += "&start=" + pageNo;
		}
           	window.location.href = url_state;
	}
	if (actionType == "byTime") {
		if (checked != "A") {
			if (beginTime == "" && endTime == "") {
				url_time = "&start=" + pageNo + "&checked=" + checked;
			} else if (beginTime != "" && endTime == "") {
				url_time = "&start=" + pageNo + "&checked=" + checked + "&beginTime=" + beginTime;
			} else if (beginTime == "" && endTime != "") {
				url_time = "&start=" + pageNo + "&checked=" + checked + "&endTime=" + endTime;
			} else {
				url_time = "&start=" + pageNo + "&checked=" + checked + "&beginTime=" + beginTime + "&endTime=" + endTime;
			}
		} else {
			if (beginTime == "" && endTime == "") {
				url_time = "&start=" + pageNo
			} else if (beginTime != "" && endTime == "") {
				url_time = "&start=" + pageNo + "&beginTime=" + beginTime;
			} else if (beginTime == "" && endTime != "") {
				url_time = "&start=" + pageNo + "&endTime=" + endTime;
			} else {
				url_time = "&start=" + pageNo + "&beginTime=" + beginTime + "&endTime=" + endTime;
			}
		}
                window.location.href = url_time;
	}
	if (actionType == "byField") {
		if (checked != "A") {
			if (field != "" && item != "") {
				url_field = "&start=" + pageNo + "&checked=" + checked + "&field=" + field + "&number=" + item;
			} else {
				url_field = "&start=" + pageNo + "&checked=" + checked;
			}
		} else {
			if (field != "" && item != "") {
				url_field = "&start=" + pageNo + "&field=" + field + "&number=" + item;
			} else {
				url_field = "&start=" + pageNo;
			}
		}
                window.location.href = url_field;
	}*/
}
