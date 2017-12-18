//特惠管理 、商家管理、活动管理、专题管理、消息管理、找货类目管理、特惠类目、商家类目 JS

var url = BASEURL + "bops-app/bops/";

//删除弹出框
var delmode = function(tmp) {
	art.dialog({
		title: '删除',
		content: '<div>你确认删除所选项吗？</div>',
		fixed: true,
		background: "#000",
		opacity: "0.3",
		ok: function() {
			tmp();
		},
		cancel: true,
		lock: true
	});
};

//列表页 删除状态
var delstart = function(tmp) {
	if (tmp == "false") {
		poFi("删除失败！");
	} else {
		poTS("删除成功");
	}
};

//编辑页 提交状态
var editstart = function(tmp) {
	if (tmp == "false") {
		poFi("操作失败！");
	} else {
		art.dialog({
			content: "操作成功！",
			icon: 'succeed',
			fixed: true,
			time: 1.5
		});
		setTimeout(function() {
			history.back();
		}, 1500);
	}
};

//返回
var pageall = function(tmp) {
	var page = [];
	page[0] = $(tmp).parent(".page-r").children("b").eq(1).html(); //当前页
	page[1] = $(tmp).parent(".page-r").children("b").eq(0).html(); //总条数
	page[2] = $(tmp).parent(".page-r").children("strong").html(); //返回总页
	page[3] = location.href.split("?")[0]; //获取当前地址
	return page;
};
//跳转分页
// var pageto = function(tmp, pagecur) {
// 	var page = pageall(tmp);
// 	var currentPage = page[2] < parseInt(pagecur) ? page[2] : pagecur;
// 	var keyhy = $("#searchType").length > 0 ? ($("#searchType option:selected").val() == "" ? "" : "&categoryId=" + $("#searchType option:selected").val()) : "";
// 	var keyWord = $("#searchValue").length > 0 ? ($("#searchValue").val() == "" ? "" : "&keyWord=" + $("#searchValue").val()) : "";
// 	location.href = page[3] + "?currentPage=" + currentPage + "&total=" + page[1] + keyWord + keyhy;
// };

//成功提示
function poTS(tmp) {
	art.dialog({
		content: tmp,
		icon: 'succeed',
		fixed: true,
		time: 1.5
	});
	setTimeout(function() {
		location.href = location.href;
	}, 1500);
}

//错误提示
function poFi(tmp) {
	art.dialog({
		content: tmp,
		icon: 'error',
		fixed: true,
		time: 1.5
	});
}

// 分页跳转
// var topage = function(tmp, startTime, endTime, businessPlatform, payType, status, keyWordField, keyWord, total) {
// 	var pagecur = $(tmp).prev("input").val();
// 	if (pagecur < 1) {
// 		alert("请输入要跳转的页码");
// 		return false;
// 	} else if (pagecur > total) {
// 		alert("输入页数要小于总页数！");
// 		return false;
// 	} else {
// 		location.href = "sz.financeManage?currentPage=" + pagecur + "&startTime=" + startTime + "&endTime=" + endTime + "&businessPlatform=" + businessPlatform + "&payType=" + payType + "&status=" + status + "&keyWordField=" + keyWordField + "&keyWord=" + keyWord;
// 	}
// };


//特惠管理 批量删除
var delset = function(tmp) {
	var leng = arguments.length;
	var list = [];
	if (leng == 1) {
		list.push($(tmp).closest("tr").children("td:eq(0)").children("input").attr("value"));
	} else {
		var thLeng = $(".app-tab tbody input:checked").length;
		if (thLeng == 0) {
			poFi("请先选择您要操作的项！");
			return false;
		}
		for (var i = 0; i < thLeng; i++) {
			list.push($(".app-tab tbody  input:checked").eq(i).attr("value"));
		}
	}
	delmode(function() {
		$.post("app.couponsDelete", {
			"ListcouponId": JSON.stringify(list)
		}, function(data) {
			delstart(data.success);
		}, "json");
	});


};

//搜索按钮
var searchto = function(e) {
	var keyhy = $("#searchType").length > 0 ? $("#searchType option:selected").val() : "",
		keyWord = $("#searchValue").val(),
		tolink;
	if (keyhy == "" && keyWord == "") {
		tolink = "";
	} else if (keyhy != "" && keyWord == "") {
		tolink = "?categoryId=" + keyhy;
	} else if (keyhy == "" && keyWord != "") {
		tolink = "?keyWord=" + keyWord;
	} else {
		tolink = "?categoryId=" + keyhy + "&keyWord=" + keyWord;
	}
	var leng = arguments.length;
	if (leng == 1) {
		var e = e || event;　
		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey != 13) {
			return false;
		}
	}
	location.href = location.href.split("?")[0] + tolink;
};

//回调状态提示
var datasucc = function(start, fal, tru) {
	if (start == "false") {
		poFi(fal);
	} else {
		poTS(tru);
	}
};

//价格控制
var record = {
	num: ""
};
var checkDecimal = function(n) {
	var decimalReg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
	if (n.value != "" && decimalReg.test(n.value)) {
		record.num = n.value;
	} else {
		if (n.value != "" && /^\D/.test(n.value)) {
			n.value = record.num = "";
		} else if (n.value != "") {
			n.value = record.num;
		}
	}
};


//商家管理 删除
var besdel = function(tmp) {
	var etid = $(tmp).closest("tr").children("td:eq(0)").children("input:eq(0)").attr("value");
	var geid = $(tmp).closest("tr").children("td:eq(0)").children("input:eq(1)").attr("value");
	delmode(function() {
		$.post("app.enterpriseDelete", {
			"enterpriseIds": "['" + etid + "']",
			"guangEnterpriseIds": "['" + geid + "']"
		}, function(data) {
			delstart(data.success);
		}, "json");
	});
};


//商家管理编辑页
var editorbus = function() {
	var imgkey = [],
		andkey = [];
	var del = $("#appbusstar").val().replace(/^,/, '').split(",");
	$("div.phoall:eq(0) span").each(function(i) {
		if ($("div.phoall:eq(0) span:eq(" + i + ")").find("img").attr("data") == "0") {
			var imky = $("div.phoall:eq(0) span:eq(" + i + ")").find("img").attr("src").split(/\/(?![^\/]*\/)/)[1];
			var ti = {
				"imgKey": imky,
				"userid": $("#enterpriseId").val()
			};
			imgkey.push(ti);
		}
	});
	$("div.phoall:eq(1) span").each(function(i) {
		if ($("div.phoall:eq(1) span:eq(" + i + ")").find("img").attr("data") == "0") {
			var andk = $("div.phoall:eq(1) span:eq(" + i + ")").find("img").attr("src").split(/\/(?![^\/]*\/)/)[1];
			var ti = {
				"imgKey": andk,
				"userid": $("#enterpriseId").val()
			};
			andkey.push(ti);
		}
	});
	$.post("app.enterpriseUpdate", {
		"businessTime": $("div.wait-m table tr:eq(2) input").val(),
		"enterpriseId": $("#enterpriseId").val(),
		"uploadIosImgData": JSON.stringify(imgkey),
		"uploadAndroidImgData": JSON.stringify(andkey),
		"deleteImgData": JSON.stringify(del)
	}, function(data) {
		editstart(data.success);
	}, "json");
};

var linkaction = window.location.href.split("?")[0].split(/\/(?![^\/]*\/)/)[1];
//linkaction：app.specialManage为专题、app.activitiesManage为活动、app.messageManage为消息、app.productCategoryManage为找货、app.couponCategoryManage特惠、app.enterpriseCategoryManage商家


//活动管理、专题管理 、消息管理  商家类目、特惠类目列表页删除
var actdel = function(tmp) {
	var leng = arguments.length;
	var list = [];
	if (leng == 1) {
		list.push($(tmp).closest("tr").children("td:eq(0)").children("input").attr("value"));
	} else {
		var thLeng = $(".app-tab .list-id input:checked").length;
		if (thLeng == 0) {
			poFi("请先选择您要操作的项！");
			return false;
		}
		for (var i = 0; i < thLeng; i++) {
			list.push($(".app-tab .list-id input:checked").eq(i).attr("value"));
		}
	}
	delmode(function() {
		var loctlink = "",
			loctid = ""; //判断是活动还是专题
		if (linkaction == "app.specialManage") {
			$.post("app.specialDelete", {
				"specialIds": JSON.stringify(list)
			}, function(data) {
				delstart(data.success);
			}, "json");
		} else if (linkaction == "app.activitiesManage") {
			$.post("app.activitieDelete", {
				"activityids": JSON.stringify(list)
			}, function(data) {
				delstart(data.success);
			}, "json");
		} else if (linkaction == "app.messageManage") {
			$.post("app.messageDelete", {
				"messageIds": JSON.stringify(list)
			}, function(data) {
				delstart(data.success);
			}, "json");
		} else if (linkaction == "app.enterpriseCategoryManage") {
			$.post("app.deleteEnterpriseCategory", {
				"enterpriseCategoryIds": JSON.stringify(list)
			}, function(data) {
				delstart(data.success);
			}, "json");
		} else if (linkaction == "app.couponCategoryManage") {
			$.post("app.deleteCouponCategory", {
				"couponCategoryIds": JSON.stringify(list)
			}, function(data) {
				delstart(data.success);
			}, "json");
		}
	});

};

//消息管理添加及更新
var editorMsg = function() {
	var
		messageId = $("input[name='messageId']").val(),
		title = $("input[name='title']").val(),
		type = $(".startx input[name='type']:checked").attr("value"),
		//imgKey=$("#imgsrc").attr("src").split(/\/(?![^\/]*\/)/)[1],
		content = type == "MEDIA" ? Kmsg_text.html() : $("textarea.texts").val(),
		client = $("input[name='client']:checked").attr("value"),
		userScope = $("select[name='userScope'] option:selected").val();

	if ((title == "" && type != "MESSAGE") || content == "") {
		poFi("带“*”为必填项！");
		return false;
	}
	$.post("app.messageSave", {
		"messageId": messageId,
		"title": title,
		"type": type,
		"content": content,
		"client": client,
		"userScope": userScope
	}, function(data) {
		editstart(data.success);
	}, "json");

};


//找货类目管理
var pdc = function(til, conten, fun) {
	art.dialog({
		title: til,
		content: conten,
		fixed: true,
		background: "#000",
		opacity: "0.3",
		ok: function() {
			fun();
		},
		cancel: true,
		lock: true
	});
};



//找货类目管理 添加类目
var pdcadd = function() {
	pdc('添加类目', '<input type="text" class="pdcadd-input" maxlength="5" />', function() {
		var padlist = $(".pdcadd-input").val();
		if (padlist == "") {
			alert("类目名称不能为空！");
			return false;
		}
		if (linkaction == "app.productCategoryManage") {
			$.post("app.addProductCategory", {
				"productCategoryName": padlist
			}, function(data) {
				datasucc(data.success, "添加类目失败！", "添加类目成功！");
			}, "json");
		}

	});
};

//找货类目管理 修改类目
var pdcmodify = function(tmp) {
	var padval = '<input type="text" class="pdcadd-input" maxlength="5" value="' + $(tmp).parent().siblings(".na01").children("span").html() + '" />';
	pdc('添加类目', padval, function() {
		var padlist = $(".pdcadd-input").val();
		var padid = $(tmp).parent().siblings(".na01").children("#categoryId").val();
		if (padlist == "") {
			alert("类目名称不能为空！");
			return false;
		}
		if (linkaction == "app.productCategoryManage") {
			$.post("app.updateProductCategory", {
				"productCategoryName": padlist,
				"productCategoryId": padid
			}, function(data) {
				datasucc(data.success, "修改类目失败！", "修改类目成功！");
			}, "json");
		}
	});
};
//找货类目管理 删除类目
var pdcdel = function(tmp) {
	var padid = $(tmp).parent().siblings(".na01").children("#categoryId").val();
	if (linkaction == "app.productCategoryManage") {
		delmode(function() {
			$.post("app.deleteProductCategory", {
				"productCategoryIds": "['" + padid + "']"
			}, function(data) {
				delstart(data.success);
			}, "json");
		});
	}

};


//找货类目管理 关联
var pdcrelation = function(tmp) {
	var $th = $(tmp).parent().siblings(".na01"),
		val = $th.children("span").html(),
		mapno = $th.children("#mapCategoryNo").val();
	art.dialog({
		title: '关联',
		content: '<div class="lay-fl"><div class="lay-l"><div class="title">' + val + '</div><ul class="nobus"><li data="' + mapno + '"></li></ul></div><div class="lay-c"><span class="left-lay"></span><span class="right-lay"></span></div><div class="lay-r"><div class="title">相关联类目</div><ul class="nobus"></ul></div></div>',
		fixed: true,
		background: "#000",
		opacity: "0.3",
		ok: function() {
			$.post("app.addMapProductCategory", {
				"productCategoryId": $th.children("#categoryId").val(),
				"mapProductCategoryId": $("div.lay-l ul.nobus li").attr("data")
			}, function(data) {
				if (data.success == "false") {
					poFi("关联类目失败！");
				} else {
					poTS("关联类目成功！");
				}
			}, "json");
		},
		init: function() {
			$.get("app.getPCLevel1Category", function(data) {
				var rightset = '',
					mapval = '';
				$(data.data).each(function(i, v) {
					rightset += '<li data="' + v.categoryNo + '">' + v.categoryName + '</li>';
					mapval = v.categoryNo == mapno ? v.categoryName : mapval;
				});
				$(".lay-r .nobus").html(rightset);
				$("div.lay-l ul.nobus li").html(mapval);
			}, "json");
			$(".nobus").on("click", "li", function() {
				$(".nobus li").removeClass("cur");
				$(this).addClass("cur");
			});
			$("div.lay-r ul.nobus").on("dblclick", "li", function() {
				moveleft(this, "div.lay-l ul.nobus li");
			});
		},
		cancel: true,
		lock: true
	});
};

//特惠推荐 添加
var recadd = function() {
	art.dialog({
		title: '添加推荐',
		content: '<div class="lay-fl"><div class="lay-l"><div class="title">未分类商家</div><ul class="nobus"></ul></div><div class="lay-c"><span class="left-lay"></span><span class="right-lay"></span></div><div class="lay-r"><div class="title"></div><ul class="nobus"></ul></div></div>',
		fixed: true,
		background: "#000",
		opacity: "0.3",
		ok: function() {
			var etd = [];
			$("div.lay-r ul.nobus li").each(function(i) {
				var ob = {
					sort: parseInt($("select[name='layRight'] option:selected").attr("data")),
					location: $("select[name='layRight'] option:selected").attr("value"),
					couponid: $(this).attr("data")
				}
				etd.push(ob);
			});
			$.post("app.addCouponRecommend", {
				"data": JSON.stringify(etd)
			}, function(data) {
				datasucc(data.success, "添加推荐失败！", "添加推荐成功！");
			}, "json");
		},
		init: function() {
			$.get("app.getRecommendCouponInfo", function(data) {
				var listl = '<select name="layLeft">',
					listr = '<select name="layRight">',
					rightset = '';
				$(data.data.couponCategorys).each(function(i, v) {
					listl += '<option value="' + v.categoryid + '">' + v.categoryName + '</option>';
				});
				$(data.data.locations).each(function(i, v) {
					listr += '<option value="' + v.location + '" data="' + v.sort + '" >' + v.show + '</option>';
				});
				$(data.data.coupons).each(function(i, v) {
					rightset += '<li data="' + v.couponid + '">' + v.title + '</li>';
				});
				$(".lay-l .nobus").html(rightset);
				$(".lay-l .title").html(listl + "</select>");
				$(".lay-r .title").html(listr + "</select>");
			}, "json");
			$(".nobus").on("click", "li", function() {
				$(".nobus li").removeClass("cur");
				$(this).addClass("cur");
			});
			$("div.lay-l ul.nobus").on("dblclick", "li", function() {
				movelr(this, "div.lay-r ul.nobus");
			});
			$("div.lay-r ul.nobus").on("dblclick", "li", function() {
				movelr(this, "div.lay-l ul.nobus");
			});
			$("select[name='layLeft']").live("change", function() {
				$.get("app.getCouponByCategoryId", {
					"categoryId": $("select[name='layLeft'] option:selected").val()
				}, function(data) {
					var rightset = '';
					$(data.data).each(function(i, v) {
						rightset += '<li data="' + v.couponid + '">' + v.title + '</li>';
					});
					$(".lay-l .nobus").html(rightset);
				}, "json");
			});

		},
		cancel: true,
		lock: true
	});
};

//特惠删除推荐
var rectoyn = function(tmp) {
	var set = $(tmp).closest("tr").children("td:eq(0)").find("input").val();
	$.post("app.deleteCouponRecommend", {
		"recommendid": JSON.stringify(set.split(","))
	}, function(data) {
		datasucc(data.success, "操作失败！", "操作成功！");
	}, "json");
};

//特惠推荐 修改编号
var pflok = function(tmp) {
	var $th = $(tmp),
		set = $(tmp).closest("tr").children("td:eq(0)").find("input").val(),
		star = $th.hasClass("rectonu") ? $(tmp).prev("input").val() : $th.val();
	$.post("app.updateCouponRecommend", {
		"recommendId": set,
		"sort": star
	}, function(data) {
		datasucc(data.success, "操作失败！", "操作成功！");
	}, "json");
};

// 特惠推荐排序跳转
var inputKeyDown = function(e, tmp) {
	var e = e || event;　
	var currKey = e.keyCode || e.which || e.charCode;
	if (currKey == 13) {
		var pagecur = $(tmp).val();
		if (pagecur < 1) {
			alert("请输入排序数");
			return false;
		} else {
			pflok(tmp);
		}
	}
};


var statusDes = {
	'1': '<option value="2">已付款</option>',
	'2': '<option value="9">申请退款</option>',
	'9': '<option value="7">退款中</option>',
	'18': '<option value="5">交易取消</option><option value="2">已付款</option>',
	'15':'<option value="3">交易完成</option>'
};

var changeOrderStatus = function() {
	var $status = $("#statusbtn"),
		status = $status.data('val');
	art.dialog({
		title: '确认订单',
		lock: true,
		content: '<div id="selectStatus">请选择订单状态：<br /><br /><select style="width:200px;">' +
			statusDes[status] +
			'</select></div>',
		fixed: true,
		background: "#000",
		opacity: "0.3",
		ok: function() {
			$status.val($("#selectStatus").find("select").val());
			$("#whtstart").prev("span").text($("#selectStatus").find("option:selected").text());
		}
	});
};

var infoSubimtForm = function(obj) {
	var $form = $(obj);
	var $remark = $form.find('[name="remark"]');

	if ($('#statusbtn').val() == 7) {
		var $refundWay = $('select[name="refundWay"]');
		if ($refundWay.val() == '') {
			alert('请选择退款方式');
			$refundWay.trigger('focus');
			return false;
		}
	}


	if ($.trim($remark.val()) === '') {
		alert('订单备注不能为空！');
		$remark.val('').trigger('focus');
		return false;
	}


	$.get("sz.financeUpdate", $form.serialize(), function(data) {
		if (data.success) {
			art.dialog({
				content: data.msg,
				icon: 'succeed',
				fixed: true,
				time: 1.5
			});
			setTimeout(function() {
				history.back();
			}, 1500);
		} else {
			art.dialog({
				content: data.msg,
				icon: 'error',
				fixed: true,
				time: 1.5
			});
		}
	}, "json");
};

var codeDes = {
	N: '未使用，有效期至：',
	Y: '已使用，使用时间：',
	P: '已废弃',
	J: '已结算',
	G: '已过期'
};

function formatTime(data) {
	var time = '';
	if (data['status'] === 'N') {
		time = data['limitEndTime'];
	}
	if (data['status'] === 'Y') {
		time = data['consumTime'];
	}

	time = time.slice(0, 19);

	return time;
}

function createCode(codes) {
	var code = '';
	for (var i = 0; i < codes.length; i++) {
		code += codes[i]['code'] + '（' + codeDes[codes[i]['status']] + formatTime(codes[i]) + '）<br />';
	}
	return code;
}

$(function() {
	$('table.app-tab').delegate('a.refund', 'click', function(event) {
		event.preventDefault();
		var $t = $(this);
		var orderId = $t.data('orderid');
		if (confirm('是否确定退款？')) {
			$.post('/bops-app/bops/sz.refundConfirm', {
				orderId: orderId
			}, function(data) {
				if (data['success'] === 'true') {
					$t.after('<span style="color:#ccc;">退款</span>').parent().prev().text('退款中').prev().text(data['data'] || '');
					$t.remove();
				} else {
					alert('退款失败！')
				}
			}, 'json');
		}
	});


	$('table.shows').delegate('tr:not(.cached)', 'click', function() {
		var $tr = $(this);
		if ($tr.next().is('.cached')) {
			$tr.next().removeClass('g-d-n');
			return;
		}
		var orderId = $tr.find('.list-id').text();
		var colspan = $tr.find('td').length;
		$.get('/bops-app/bops/sz.findFinanceOpenById', {
			orderId: orderId
		}, function(data) {
			if (data['success'] !== 'true') {
				$tr.addClass('cached');
				return;
			}
			data = data['data'][0];
			$tr.after('<tr class="cached"><td colspan="' + colspan + '"><div>' +
				'<div class="g-f-l close-wrap"><strong>^</strong><br /><a href="javascript:" class="close">收起</a></div>' +
				'<div class="title-wrap g-f-l">' +
				'<strong>商品名称：</strong><p>' + data['title'] + '</p>' +
				'</div>' +
				'<div class="g-f-l">' +
				'<strong>验证码：</strong><br />' + createCode(data['codes']) +
				'<br />' +
				'</div>' +
				'</div></td></tr>');
		}, 'json');
	}).delegate('.cached .close', 'click', function() {
		$(this).parents('tr').addClass('g-d-n');
	});


	var $form = $('form');


	$form.delegate('input[name$="Time"]', 'click', function() {
		$(this).next().trigger('click');
	});

	$('#content').delegate('h2 a[href^="sz.merchantEdit"]', 'click', function(event) {
		event.preventDefault();
		var $t = $(this);
		var $h2 = $t.parent();
		var $div = $h2.next();
		var href = $t.attr('href');
		$.get(href, function(data) {
			$h2.before($('form[action^="sz.merchantUpdate"]', data));
			$h2.remove();
			$div.remove();
		});
	}).delegate('form[action^="sz.merchantUpdate"]', 'submit', function(event) {
		var $f = $(this);
		$.post($f.attr('action'), $f.serializeArray(), function(data) {
			if (data.success === 'true') {
				alert('编辑完成！');
				location.href = location.href;
			} else {
				alert(data.msg);
			}
		}, 'json');
		return false;
	});

	window.seajs && seajs.use(['http://resmanage.csc86.com/v2/m/page.js'], function(page) {
		page.init(null, {
			name: 'currentPage'
		});
	});

	$('form[action="sz.merchantDetails"]').find('[name="keyWord"]').on('change', function() {
		$(this).parents('form').trigger('submit');
	});


	//在线交易-打款相关
	function Dsucceed(OurStatus, msg) {
		if (OurStatus) {
			art.dialog({
				content: msg,
				icon: 'succeed',
				fixed: true,
				time: 1.5,
				close: function() {
					window.location = 'http://bops.csc86.com/bops-app/bops/sz.drawManage';
				}
			});
		} else {
			art.dialog({
				content: msg,
				icon: 'succeed',
				fixed: true,
				time: 1.5
			});
		}

	}

	$('.dk-tool').on('click', '#accept', function(e) {
		e.stopPropagation();
		var id = $(this).attr('data-id');
		$.get('http://bops.csc86.com/bops-app/bops/sz.drawUpdate?drawId=' + id + '&state=1', function(data) {
			Dsucceed(data.success, data.msg);
		}, 'json')

	}).on('click', '#affirm', function(e) {//确认打款
		e.stopPropagation();
		var $this = $(this);
		var sForm = '<form action="">' +
			'<table class="dk-affirm">' +
			'<tr>' +
			'<th>交易流水号</th>' +
			'<td><input type="text" name="tradeNo" /></td>' +
			'</tr>' +
			'<tr>' +
			'<th>打款时间</th>' +
			'<td>' +
			'<input type="text" class="g-d-text" name="payTime" id="dk-time"/>' +
			'<a class = "g-data" href = "javascript:" onclick="WdatePicker({el:\'dk-time\'})" id="dk-titme"></a>' +
			'</td> ' +
			'</tr>' +
			'</table>' +
			'</form>';
		art.dialog({
			id:'qrDk',
			title: "确认打款",
			content: sForm,
			fixed: true,
			lock:true,
			opacity:0.2,
			ok: function() {
				var $form = $(this.DOM.content[0]).find('form');
				var submitOk = true;
				$form.on('submit', function() {
					var sSradeNo = $('input[name=tradeNo]').val();
					var spayTime = $('input[name=payTime]').val();
					var $data = $(this).serialize();
					var Reg = /^[0-9]*$/g;
					var mastNum = Reg.test(sSradeNo);
					if (sSradeNo == '' || sSradeNo == 'undefined' || mastNum == false) {
						submitOk = false;
						alert('交易流水号只能是数字并且不能为空！');
					}
					if (spayTime == '' || spayTime == 'undefined') {
						alert('打款时间不能为空！');
						submitOk = false
					};
					if (submitOk) {
						var id = $this.attr('data-id');
						var url = 'http://bops.csc86.com/bops-app/bops/sz.drawUpdate?drawId=' + id + '&state=2&' + $data;
						$.get(url, function(data) {
							Dsucceed(data.success, data.msg);
						}, 'json');
					}
					return false;
				}).trigger('submit');
				return submitOk;
			},
			cancel: true,
			cancelVal: '关闭'
		});
	}).on('click', '#dkFail', function(e) {//打款失败
		e.stopPropagation();
		var $this = $(this);
		var sForm = '<form action="">' +
			'<table class="dk-affirm">' +
			'<tr>' +
			'<td>打款失败原因：<br/><textarea class="dkfail-txtarea" name="reason" cols="" rows=""></textarea></td>' +
			'</tr>' +
			'</table>' +
			'</form>';
		art.dialog({
			id:'dkFail',
			title: "打款失败",
			content: sForm,
			fixed: true,
			lock:true,
			opacity:0.2,
			ok: function() {
				var $form = $(this.DOM.content[0]).find('form');
				var submitOk = true;
				$form.on('submit', function() {
					var reason=$.trim($('textarea[name=reason]').val());
					var $data = $(this).serialize();
					if (!reason||reason.length>50) {
						alert('请输入打款失败原因，50个字内！');
						submitOk = false
					};
					if (submitOk) {
						var id = $this.attr('data-id');
						var url = 'http://bops.csc86.com/bops-app/bops/sz.drawUpdate?drawId=' + id + '&state=3&' + $data;
						$.get(url, function(data) {
							Dsucceed(data.success, data.msg);
						}, 'json');
					}
					return false;
				}).trigger('submit');
				return submitOk;
			},
			cancel: true
		});
	});
});

function selVal(tmp) {
	var ly = $("#testVal").val(),addstr = tmp.value.replace(/[\.,;!。，；！、]\s*$/,"");
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
// 拒绝
function refuse ( id ) {
	var html = '';
	html += '<div class="refuse" id="refusediv">';
	html += '<p>选择或者输入拒绝的理由</p>';
	html += '<ul>';
	html += '<li><label><input type="checkbox" onclick="selVal(this)" name="refuse" value="收款人姓名和法人姓名不一致"> <span>收款人姓名和法人姓名不一致</span></label></li>';
	html += '<li><label><input type="checkbox" onclick="selVal(this)" name="refuse" value="银行卡号不正确"> <span>银行卡号不正确</span></label></li>';
	html += '<li><label><input type="checkbox" onclick="selVal(this)" name="refuse" value="收款人和收款账号不符"> <span>收款人和收款账号不符</span></label></li>';
	html += '</ul>';
	html += '<div><textarea id="testVal" name="refusez" placeholder="请输入理由，最多200个字"></textarea></div>';
	html += '<div id="tip" style="color: #f00; display: none;">不能超过200个字</div>';
	html += '</div>';
	art.dialog({
		title: "拒绝理由",
		content: html,
		fixed: true,
		lock:true,
		opacity:0.2,
		ok: function() {
			var t = $("#refusediv").find("textarea").val();
			if ($.trim(t).length === 0) {
				art.dialog({
					content: "请输入拒绝理由",
					icon: 'error',
					fixed: true,
					time: 1.5
				});
				return false;
			}
			if (t.length > 200) {
				$("#tip").show();
				setTimeout(function() {
					$("#tip").hide();
				}, 3000);
				return false;
			}
			$.post('sz.drawUpdateRefuse', {drawId: id, reason: t || ""}, function(data, textStatus, xhr) {
				if (data.success === "true") {
					art.dialog({
						content: data.msg,
						icon: 'success',
						fixed: true,
						time: 1.5
					});
					setTimeout(function() {
						window.location.reload();
					}, 1500);
				} else {
					art.dialog({
						content: data.msg,
						icon: 'error',
						fixed: true,
						time: 1.5
					});
				}
			}, 'json');
		},
		init: function () {
			$("#testVal").click(function(){
				$("#refusediv input").removeAttr("checked");
			});
		},
		cancel: true
	});
}

/*订单详情*/
function hostPost(url,callback){
	var xmlhttp;
	if (window.XMLHttpRequest){
	  xmlhttp=new XMLHttpRequest();
	  }
	else{
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
		  if(xmlhttp.readyState==4){
		  
			  if (xmlhttp.status==0 || xmlhttp.status==200)
				{               
					callback && callback(xmlhttp.responseText); 
				}else{
					alert('网络出错，请刷新浏览器')
				}
		  }
	  } 
	xmlhttp.open("GET",url,true);
	xmlhttp.send();     
}

/****  /bops-app/bops/refundOrderDetali?orderId=1667*/	
function tipTop(id){
	hostPost("/bops-app/bops/refundOrderDetali?orderId="+id,function(data){
			var data=new Function('return'+data)();
			art.dialog({
				title: '退款信息',
				lock: true,
				content: '<p>特惠名称：'+data.title+'</p><p>订单号：'+data.orderNO+'</p><p>退款金额：'+data.refundMoney+'</p><p>退款申请时间：'+data.createTime+'</p>输入密码：<input type="password" value="" id="password"/>',
				fixed: true,
				background: "#000",
				opacity: "0.3",
				ok: function() {
					var passWord=document.getElementById("password").value;
					hostPost("http://bops.csc86.com/bops-app/bops/confirmationRefund?orderId="+data.orderId+"&thirdPassword="+passWord,function(data){
						var data = eval('(' + data + ')');
						if(data.success==="true"){
							alert("申请退款成功！");
						}else{
							alert("申请退款失败！");
						}
					})
				}
			});
	})
}