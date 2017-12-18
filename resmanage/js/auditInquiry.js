
$(function () {
	$("li.li-last a:contains('" + $("#masterCur").attr("value") + "')").closest("li").addClass("ln-3th-cur");

	editorContent();

});

jQuery(function ($) {
	$("#jump").click(function () {
		if ($.trim($("#goPage1").val()) == "") {
			ajaxSearch(0);
			$(".page").html("1");
			return;
		}
		var currentPage = parseInt($("#goPage1").val());
		var maxPage = parseInt($(".totalPage").html());
		if (currentPage < 1)
			currentPage = 1;
		if (currentPage > maxPage)
			currentPage = maxPage;
		var offset = (currentPage - 1) * 10;
		ajaxSearch(offset);
		$(".page").html(currentPage);
	});
});

jQuery(function ($) {
	$("#go").click(function () {
		if ($.trim($("#goPage2").val()) == "") {
			ajaxSearch(0);
			$(".page").html("1");
			return;
		}
		var currentPage = parseInt($("#goPage2").val());
		var maxPage = parseInt($(".totalPage").html());
		if (currentPage < 1)
			currentPage = 1;
		if (currentPage > maxPage)
			currentPage = maxPage;
		var offset = (currentPage - 1) * 10;
		ajaxSearch(offset);
		$(".page").html(currentPage);
	});
});

//跳转到详情页
//id 记录ID
function getDetail(id,line,tag){
	var url = "audinquiry.getDetailedInformation?inquiryId="+id;
	var currentPage = parseInt($(".page").html());
	var keyWord =$.trim($("#keyword").val());
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var condition = $("select").find("option:selected").val();
	window.location.href="audinquiry.getDetailedInformation?inquiryId="+id+"&tag="+tag+"&page="+
	currentPage+"&startTime="+startTime+"&keyWord="+keyWord+"&endTime="+endTime+"&condition="+condition+"&line="+line;
}

//详请页,下一条
function nextDetail(tag,n){
   var line = parseInt( $("#line").val())+(n?0:1);
   var startTime = $("#startTime").val();
   var endTime = $("#endTime").val();
   var condition = $("#condition").val();
   var keyWord = $("#keyWord").val();
   var currentPage =parseInt($("#currentPage").val());
   var count=parseInt($("#count").val());
   $("#line").val(line);
   var resultList = $("#resultList").val();
	if(line>resultList.split(",").length&&line!=11){
	   //alert("已经是最后一页了！");
	   art.dialog({
			content : "已经是最后一条了！",
			title: false,
			fixed : true,
			icon : 'error',
			time : 1.5
		});
	   $("#line").val($("#line").val()-1);
	   return;
   }
   if(line>10){
	   var data = {startTime:startTime,endTime:endTime,"tag":tag,currentPage:currentPage,keyWord:keyWord,condition:condition};
	   $.post("audinquiry.getInquiryIdByState",data,function(result){
		 $("#resultList").val(result);
		 if($.trim(result) == ""){
			 art.dialog({
				content : "已经是最后一条了！",
				title: false,
				fixed : true,
				icon : 'error',
				time : 1.5
			 });
		 	$("#line").val($("#line").val()-1);
	   		return;
		 }
		 $.post("audinquiry.getInquiryDetail",{id: result.split(",")[0],"tag":tag},function(result){
					   $("#divtemp").html(result);
					   editorContent();
			 });
		});
		$("#line").val(1) ;
		$("#currentPage").val(currentPage+1);
		return true;
   }
   var array = resultList.split(",");
   for(var i=1;i<array.length+1;i++){
		if(i==line){
		  var data = {id:array[i-1],"tag":tag}
		  $.post("audinquiry.getInquiryDetail",data,function(result){
		  $("#divtemp").html(result);
		  editorContent();
		});
		}
  }
}

function search() {
	ajaxSearch(0);
	$(".page").html("1");
	$(".goPage").val("");
}

function secKeyDown(e, tmp, id) {
	　 var e = e || event;
	　 var currKey = e.keyCode || e.which || e.charCode;
	　 if ((currKey == 13)) {
		search();
	}
}

function backPage() {
	var offset = parseInt($("#offset").val()) - 10;
	if (offset < 0) {
		alert("当前页已经是第一页！");
		return false;
	}
	ajaxSearch(offset);
	var currentPage = parseInt($(".page").html()) - 1;
	if (currentPage < 1)
		currentPage = 1;
	$(".page").html(currentPage);
}

function nextPage() {
	var rowCount = parseInt($(".rowNumber").html());
	var offset = parseInt($("#offset").val()) + 10;
	if (offset >= rowCount) {
		alert("当前页已经是最后一页！");
		return false;
	}
	ajaxSearch(offset);
	var currentPage = parseInt($(".page").html()) + 1;
	var maxPage = parseInt($(".totalPage").html());
	if (currentPage > maxPage)
		currentPage = maxPage;
	$(".page").html(currentPage);
}



//跟据更新数据
function jump(count) {
	window.setTimeout(function () {
		count--;
		if (count > 0) {
			jump(count);
		} else {
			location.href = location.href;
		}
	}, 1000);
}

//批量操作_结果提示
function prSucceed(num) {
	art.dialog({
		title : '信息提示',
		content : '<div>一共有' + num + '条操作成功！</div>',
		icon : 'succeed',
		fixed : true,
		time : 2
	});
}

//列表页批量通过审核
function batchAdopt() {
	var n = $("table tbody .list-id input:checked").length;
	if (n < 1) {
		alert("请先选择要操作的一行");
		return false;
	}
	art.dialog({
		title : '提示',
		content : '确定要执行操作么？',
		fixed : true,
		okVal : '确定',
		background : "#000",
		opacity : "0.3",
		ok : function () {
			var idList = '';
			$($("table tbody .list-id input:checked")).each(function () {
				idList += $(this).attr("value") + ',';
			});
			$.post("audinquiry.batchAdopt", {
				idList : idList
			}, function (data) {
				prSucceed(data);
				jump(2);
			});
		},
		cancel : true,
		lock : true
	});
}

//列表页批量拒绝通过
function batchNotAdopt() {
	var n = $("table tbody .list-id input:checked").length;
	if (n < 1) {
		alert("请先选择要操作的一行");
		return false;
	}
	var idList = '';
	$($("table tbody .list-id input:checked")).each(function () {
		idList += this.value + ',';
	});
	nopassfun(function(nostr){
		$.post("audinquiry.batchNotAdopt", {
			idList : idList,
			refuseReason : nostr
		}, function (data) {
			prSucceed(data);
			jump(2);
		});
	})
}

function undis_text(o) {
	$(".ly-d-art input[name='refuse_reason'][type='radio']").removeAttr("checked");
	$(o).css({
		"background" : "#FFF",
		"color" : "#333"
	});
}

function adopt(obj) {
	var id = $(obj).attr("name");
	
	//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
	isHaveMgc('audinquiry.check',{inquiryIds:[id]},function(){
		$.post("audinquiry.detectionAdopt", {id: id}, function ( res ) {
			if ( res.data && res.data.length > 0 ) {
				var str = res.data.join(",");
				art.dialog({
					title: "提示",
					content: "询盘中包括违禁词&quot;" + str + "&quot;,是否审核通过？",
					fixed: true,
					background: "#000",
					opacity: "0.5",
					padding: "10px",
					lock: true,
					okVal: '审核通过',
					cancelVal: '返回修改',
					ok: function () {
						$.post("audinquiry.adopt", {
							id : id
						}, function (data) {
							aReturn(data, "审核成功！", "审核不通过");
						});
					},
					cancel: function () {
					},
					init: function () {
					}
				});
			} else {
				$.post("audinquiry.adopt", {
					id : id
				}, function (data) {
					aReturn(data, "审核成功！", "审核不通过");
				});
			}
		}, 'json');
	});
}

//详情页,通过审核
function adopt_xq(id, tag) {
	//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
	isHaveMgc('audinquiry.check',{inquiryIds:[id]},function(){
		$.post("audinquiry.detectionAdopt", {id: id}, function ( res ) {
			if ( res.data && res.data.length > 0 ) {
				var str = res.data.join(",");
				art.dialog({
					title: "提示",
					content: "询盘中包括违禁词&quot;" + str + "&quot;,是否审核通过？",
					fixed: true,
					background: "#000",
					opacity: "0.5",
					padding: "10px",
					lock: true,
					okVal: '审核通过',
					cancelVal: '返回修改',
					ok: function () {
						$.post("audinquiry.adopt", {
							"id" : id
						}, function (data) {
							aReturn(data, "审核成功！", "审核不通过", tag);
						});
					},
					cancel: function () {
					},
					init: function () {
					}
				});
			} else {
				$.post("audinquiry.adopt", {
					"id" : id
				}, function (data) {
					aReturn(data, "审核成功！", "审核不通过", tag);
				});
			}
		}, 'json');
	});
}

//列表页拒绝通过
function Refuse(obj) {
	var id = $(obj).attr("name");
	nopassfun(function(nostr){
		var parId = id;
		$.post("audinquiry.notAdopt", {
			id : parId,
			refuseReason : nostr
		}, function (data) {
			aReturn(data, "审核成功！", "审核不通过");
		});
	})
}


//详情页,拒绝通过
function Refuse_xq(id, tag) {
	nopassfun(function(nostr){
		var parId = id;
		$.post("audinquiry.notAdopt", {
			id : parId,
			refuseReason : nostr
		}, function (data) {
			aReturn(data, "操作成功！", "操作失败！", tag);
		});
	})
}

//根据tmp弹出出错或成功提示框
//tm1 成功提示信息
//tm2 出错提示信息
//tag 为内页提示标示
function aReturn(tmp, tm1, tm2, tag) {
	if (tmp != 1) {
		art.dialog({
			content : tm2,
			icon : 'error',
			fixed : true,
			time : 1.5
		});
	} else {
		art.dialog({
			content : tm1,
			icon : 'succeed',
			fixed : true,
			time : 1.5
		});
		if(tag){
			nextDetail(tag, 1);
		}else{
			setTimeout(function () {
				location.href = location.href;
			}, 1500);
		}
	}
}

function getDetail_(id, line, tag) {
	var currentPage = parseInt($(".page").html());
	var keyWord = $.trim($("#keyword").val());
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var condition = $("select").find("option:selected").val();
	var url = "audinquiry.getDetailedInformation?inquiryId=" + id + "&tag=" + tag + "&page=" +
	currentPage + "&startTime=" + startTime + "&keyWord=" + keyWord + "&endTime=" + endTime + "&condition=" + condition + "&line=" + line;
	location.href = url;
}

function setURL_argument(){//修改、添加,删除URL参数
	var set = function(key,val,url_){
		var url = url_ || location.href;
		if(url.indexOf("?")<=-1){ url += "?";};
		var paraString = url.substring(url.indexOf("?")+1,url.length) , key = key || "", val = val || "";
		if(key=="") {return url.replace(/\?*\s*$/,"")};
		var reg = new RegExp('\\b' + key + '=[^&]*',"");
		if(reg.test(paraString) && val !=="" ){//值不为空，则替换
			paraString = paraString.replace(reg,key + "=" + val);
		}else if(reg.test(paraString) && val ==""){//值为空，则删除
			paraString = paraString.replace(reg,"");
		}else if(val!==""){//没有则添加
			paraString += "&" + key + "=" + val;
		}
		paraString = paraString.replace(/(^&*|&*$|&*(?=&))/g,"")
		return url.split("?")[0] + (paraString == "" ? "" : "?" + paraString);
	}
	if(typeof(arguments[0]) == "string"){
               return set.apply(this,arguments);
	}else if(typeof(arguments[0])=="object"){
		var arg = arguments[0],url = arguments[1] || location.href;
		for(aaa in arg){
			url = set(aaa,arg[aaa],url);
		};
		return url;
	}else{return location.href;}
}

function getURL_argument(kdy){//JS获取URL参数
	var url = location.href;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {}
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf ("=")+1,j.length);
	}
	var returnValue = paraObj[kdy.toLowerCase()];
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}
};



function inALook(obj, tmp) {
	var $th = $(obj);
	var $tmp = $th.closest("tr");
	var parId = $tmp.children("td:eq(0)").children("input").attr("value");
	$.post("audinquiry.getDetailedInformation", {
		"id" : parId
	}, function (data) {
		//alert(data);
		var day = '询盘单&nbsp;有效期' + data.validDays + '天（截至' + data.expireDate + '）',
		arr;
		switch (tmp) {
		case "1":
			arr = "";
			break;
		case "2":
			arr = [{
					name : '通过审核',
					callback : function () {
						var $this = $(obj).next();
						$.post("audinquiry.adopt", {
							id : $this.attr("name")
						}, function (data) {
							aReturn(data, "审核成功！", "审核不通过");
						}); ;
					}
				}, {
					name : '拒绝通过',
					callback : function () {
						Refuse(obj);
					}
				}
			];
			break;
		case "3":
			arr = [{
					name : '拒绝通过',
					callback : function () {
						Refuse(obj);
					}
				}
			];
			break;
		case "4":
			arr = [{
					name : '通过审核',
					callback : function () {
						var $th = $(obj);
						var $tmp = $th.closest("tr");
						var parId = $tmp.children("td:eq(0)").children("input").attr("value");
						$.post("audinquiry.adopt", {
							id : parId
						}, function (data) {
							aReturn(data, "审核成功！", "审核不通过");
						}); ;
					}
				}
			];
			break;
		default:
			break;
		}
		function _file(data) {
			if (!data)
				return "";
			var
			data = eval("(" + data + ")"),
			tmp = '</tr><tr><th style="vertical-align:top">附件：</th><td style="vertical-align:top">';
			$.each(data, function (i, v) {
				$.each(v, function (ii, vv) {
					tmp += '<a href="http://img.csc86.com/' + ii + '" target="_blank">' + vv + '</a><br />';
				});
			});
			return tmp + '</td>';
		}
		var tVal = "";
		if (data.startTme == "" && data.endTime == "") {
			tVal = "";
		} else if (data.startTme == "") {
			tVal = ' 最晚时间为  ' + data.endTime;
		} else if (data.endTime == "") {
			tVal = data.startTme + '  为开始时间  ';
		} else {
			tVal = data.startTme + '  至  ' + data.endTime;
		}
		art.dialog({
			title : day,
			content : '<div class="audit-art"><table width="100%" border="0" cellspacing="0" cellpadding="0">' +
			'<tr><th>信息标题：</th><td>' + data.inquiryName + '</td>' +
			'</tr><tr><th>采购数量：</th><td>' + data.purchaseNumber + '</td>' +
			'</tr><tr><th>采购单位：</th><td>' + data.purchaseUnits + '</td>' +
			'</tr><tr><th>采购类型：</th><td>' + data.purchaseType + '</td>' +
			'</tr><tr><th>产品类别：</th><td>' + data.productCategory + '</td>' +
			'</tr><tr><th>产品描述：</th><td><div class="td-width-h"><pre>' + data.content + '</pre></div></td>' +
			_file(data.annex) +
			'</tr><tr><th>期望交货时间：</th><td>' + tVal + '</td></tr></table></div>',
			fixed : true,
			background : "#000",
			opacity : "0.3",
			button : arr,
			cancelVal : "关闭",
			cancel : true,
			lock : true
		});
	}, "json");
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

function goback(){
	var tag = getURL_argument("tag");
	url = setURL_argument({"inquiryId":null,"tag":null,"line":null});
	tag_str = {"N":"audinquiry.waitInquiry","Y":"audinquiry.adoptInquiry","R":"audinquiry.notadoptInquiry","all":"audinquiry.allInquiry",'P':'audinquiry.expiredInquiry','C':'audinquiry.closedInquiry'};
	document.location.href = tag_str[tag] + "?" + url.replace(/^[^\?]*\?/ig,"");
}

//拒绝提示框
function nopassfun(callback){
	$.get("audinquiry.getrefuseReason", function (data) {
		var tmpV = '<div class="ly-d-art sel-i-val">';
		for (var i in data) {
			tmpV += '<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="' + data[i] + '">' + (parseInt(i) + 1) + "、" + data[i] + '</p>';
			//tmpV += '<p><input onclick="selVal(this)" type="radio" name="refuse_reason" value="' + data[i] + '">' + (parseInt(i) + 1) + "、" + data[i] + '</p>';
		}
		tmpV += '</div>';
		art.dialog({
			title : '拒绝理由',
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
				$(".test-focus").click(function () {
					$(this).children(".test-lay").remove();
				});
			},
			cancel : true,
			lock : true
		});
	}, "json");
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