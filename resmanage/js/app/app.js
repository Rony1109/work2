//特惠管理 、商家管理、活动管理、专题管理、消息管理、找货类目管理、特惠类目、商家类目 JS

var url = BASEURL + "bops-app/bops/";

$(function() {
	//特惠选项
	$("select[name='enterpriseId']").change(function() {
		$("input[name='enterpriseName']").val($("select[name='enterpriseId'] option:selected").html());
	});
	$("select[name='categoryId']").change(function() {
		$.get("app.getEnterprises", {
			"categoryId": $("select[name='categoryId'] option:selected").val()
		}, function(data) {
			var list = '<option value="">请选择商家</option>';
			$(data.data).each(function(i, v) {
				list += '<option value="' + v.enterpriseId + '">' + v.enterpriseName + '</option>';
			});
			$("select[name='enterpriseId']").html(list);
		}, "json");
	});

	//商家管理编辑相册（显示删除按钮）
	$(".phoall span").live("mouseover", function() {
		$(this).children("i").css("display", "block")
	}).live("mouseout", function() {
		$(this).children("i").css("display", "none")
	});

	//商家管理编辑相册个数 是否显示上传 及特惠上传
	if ($("#appbusstar").length > 0) {
		$("tr.imgupload:visible").each(function(i, v) {
			var th = $(this).find(".phoall");
			if (th.hasClass("pth")) {
				if (th.find("span").length > 4) {
					th.siblings(".swfupload").css("display", "none");
				} else {
					th.siblings(".swfupload").css("display", "inline-block");
				}
			} else {
				if (th.find("span").length > 9) {
					th.siblings(".swfupload").css("display", "none");
				} else {
					th.siblings(".swfupload").css("display", "inline-block");
				}
			}

		});
	}

	//商家管理 单个分类
	$("table.app-tab select[name='category']").change(function() {
		var $th = $(this).closest("tr").children("td:eq(0)");
		var categoryId = $(this).children("option:selected").val(),
			enterpriseId = $th.children("input:eq(0)").attr("value");
		$.post("app.enterpriseUpdate", {
			"categoryId": categoryId,
			"enterpriseId": enterpriseId
		}, function(data) {
			if (data.success == "false") {
				poFi("分类失败！");
			} else {
				poTS("分类成功！");
			}
		}, "json");
	});

	//商家相册删除
	$(".phoall span i").live("click", function() {
		var key = $(this).siblings("img").attr("src").split(/\/(?![^\/]*\/)/)[1];
		var datakey = $("#appbusstar").val();
		if ($(this).siblings("img").attr("data") == "1") {
			$("#appbusstar").attr("value", datakey + "," + key);
		}
		$(this).closest(".phoall").siblings(".swfupload").css("display", "inline-block");
		$(this).parent("span").remove();
	});

	//特惠推荐  	前台显示
	$("label.showhid").delegate("input", "click", function() {
		var $th = $(this);
		$.post("app.updateCouponRecommend", {
			"status": $th.val(),
			"recommendId": $th.closest("tr").children("td:eq(0)").children("input").val(),
			"location": $th.closest("tr").children("td:eq(5)").children("input").val()
		}, function(data) {
			datasucc(data.success, data.msg || "此操作失败！", data.msg || "此操作成功！");
			if(data.success === 'false'){
				setTimeout(function(){
					location.href = location.href;
				},2000);
			}
		}, "json");
	});

	var sec = function(tmp) {
			var $th = tmp.children("option:selected").val();
			if ($th.split("@")[0] == "COUPON") {
				$("tr.imgupload:eq(1)").css("display", "none");
				$("tr span.font:eq(0)").html("300*110");
				$("tr span.font:eq(2)").html("330*122");
			} else {
				$("tr.imgupload:eq(1)").removeAttr("style");
				$("tr span.font:eq(0)").html("610*160");
				$("tr span.font:eq(2)").html("680*200");
			}
		}
		//广告上传3个版本
	if ($("tr.imgupload").length == 3) {
		sec($("select[name='location']"));
		$("select[name='location']").change(function() {
			sec($(this));
		});
	}


	//活动管理添加及更新
	var $contenForm = $('form[data-type="contentmag"]');
	$contenForm.bind('submit', function(event) {
		event.preventDefault();
		var title = $("input[name='title']").val(),
			url = $("input[name='url']").val(),
			img = true;
		$("tr.imgupload:visible").each(function(i, v) {
			var imgkey = $(this).find(".imgshow").children("img").attr("src").split(/\/(?![^\/]*\/)/)[1];
			if (imgkey == "no-img.png") {
				img = false;
			}
		});
		if (title == "" || url == "" || img == false) {
			poFi("带“*”为必填项！");
			return false;
		}
		$("tr.imgupload:visible").each(function(i, v) {
			var imgkey = $(this).find(".imgshow").children("img").attr("src").split(/\/(?![^\/]*\/)/)[1];
			if (imgkey == "no-img.png") {
				poFi("带“*”为必填项！");
				return false;
			}
		});
		$.post($contenForm.attr("action"), $contenForm.serializeArray(), function(data) {
			editstart(data.success,data);
		}, "json");
		return false;
	});

	//商家类目添加更新
	var $enterpriseedite = $('form[data-type="enterpriseedite"]');
	$enterpriseedite.bind('submit', function(event) {
		event.preventDefault();
		var $t = $(this);
		var title = $t.find('[name="enterpriseCategoryName"]').val(),
			rec = $t.find('[name="recommendation"]').val(),
			imgerr = false;
		$t.find("tr.imgupload").each(function(i, v) {
			var imgkey = $(this).find("img").attr("src");
			if (imgkey.indexOf('/img/no-img.png') > 0) {
				imgerr = true;
			}
		});
		if (rec ==='' || title === '' || imgerr) {
			poFi("带“*”为必填项！");
			return false;
		}
		$.post($enterpriseedite.attr("action"), $enterpriseedite.serializeArray(), function(data) {
			editstart(data.success,data);
		}, "json");
		return false;
	});

	//消息选项
	$(".startx input").bind("click", function() {
		var val = $(this).attr("value");
		$(".at-look input[name='title']").val("");
		$(".at-look textarea[name='content']").val("");
		Kmsg_text.html("");
		if (val == "NOTICE") {
			$(".at-look tr:eq(1)").removeAttr("style");
			$("textarea.texts ").addClass("censhow");
			$(".at-look .potuping ").removeClass("censhow");
		} else if (val == "MESSAGE") {
			$(".at-look tr:eq(1)").css("display", "none");
			$("textarea.texts ").addClass("censhow");
			$(".at-look .potuping ").removeClass("censhow");
		} else if (val == "MEDIA") {
			$(".at-look tr:eq(1)").removeAttr("style");
			$("textarea.texts ").removeClass("censhow");
			$(".at-look .potuping ").addClass("censhow");
			$(".at-look .ke-container-qq ").css("width", "750px");
		}

	})


})

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
}

//列表页 删除状态
var delstart = function(tmp) {
	if (tmp == "false") {
		poFi("删除失败！");
	} else {
		poTS("删除成功")
	}
}

//编辑页 提交状态
var editstart = function(tmp,data) {
	data = data || {};
	if (tmp == "false") {
		poFi(data.msg || "操作失败！");
	} else {
		art.dialog({
			content: data.msg || "操作成功！",
			icon: 'succeed',
			fixed: true,
			time: 1.5
		});
		setTimeout(function() {
			history.back();
		}, 1500);
	}
}

//返回
var pageall = function(tmp) {
		var page = [];
		page[0] = $(tmp).parent(".page-r").children("b").eq(1).html(); //当前页
		page[1] = $(tmp).parent(".page-r").children("b").eq(0).html(); //总条数
		page[2] = $(tmp).parent(".page-r").children("strong").html(); //返回总页
		page[3] = location.href.split("?")[0]; //获取当前地址
		return page;
	}
	//跳转分页
var pageto = function(tmp, pagecur) {
	var page = pageall(tmp);
	var currentPage = page[2] < parseInt(pagecur) ? page[2] : pagecur;
	var keyhy = $("#searchType").length > 0 ? ($("#searchType option:selected").val() == "" ? "" : "&categoryId=" + $("#searchType option:selected").val()) : "";
	var keyWord = $("#searchValue").length > 0 ? ($("#searchValue").val() == "" ? "" : "&keyWord=" + $("#searchValue").val()) : "";
	var keyWordMerchant = $("#keyWordMerchant").length > 0 ? ($("#keyWordMerchant").val() == "" ? "" : "&keyWord=" + $("#keyWordMerchant").val()) : "";
	var searchTypeMerchant = $("#searchTypeMerchant").length > 0 ? ($("#searchTypeMerchant").val() == "" ? "" : "&searchType=" + $("#searchTypeMerchant").val()) : "";
	var tradeIdMerchant = $("#tradeIdMerchant").length > 0 ? ($("#tradeIdMerchant").val() == "" ? "" : "&trades=" + $("#tradeIdMerchant").val()) : "";
	location.href = page[3] + "?currentPage=" + currentPage + "&total=" + page[1] + keyWord + keyhy + keyWordMerchant + searchTypeMerchant + tradeIdMerchant;
}

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
var topage = function(tmp) {
		var pagecur = $(tmp).siblings(".innu").val();
		if (pagecur < 1) {
			alert("请输入要跳转的页码");
			return false;
		} else {
			pageto(tmp, pagecur);
		}
	}
	// 回车分页跳转
var pageKeyDown = function(e, tmp) {
		var e = e || event;　
		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey == 13) {
			var pagecur = $(tmp).val();
			if (pagecur < 1) {
				alert("请输入要跳转的页码");
				return false;
			} else {
				pageto(tmp, pagecur);
			}
		}
	}
	// 上一页
var toup = function(tmp) {
		var pagecur = parseInt($(tmp).parent(".page-r").children("b").eq(1).html()) - 1;
		pagecur = pagecur < 1 ? 1 : pagecur;
		pageto(tmp, pagecur)
	}
	// 下一页
var todown = function(tmp) {
	var pagecur = parseInt($(tmp).parent(".page-r").children("b").eq(1).html()) + 1;
	pageto(tmp, pagecur)
}

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
}

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
}

//添加商家页面搜索按钮
var searchbns = function(e) {
	var searchType = $("#searchTypeMerchant").length > 0 ? $("#searchTypeMerchant").val() : '',
		tradeId = $("#tradeIdMerchant").length > 0 ? $("#tradeIdMerchant").val() : '',
		keyWord = $("#keyWordMerchant").length > 0 ? $("#keyWordMerchant").val() : '',
		tolink = "?searchType=" + searchType + "&trades=" + tradeId + "&keyWord=" + keyWord;
	location.href = location.href.split("?")[0] + tolink;
}

//回调状态提示
var datasucc = function(start, fal, tru) {
	if (start == "false") {
		poFi(fal);
	} else {
		poTS(tru);
	}
}

//价格控制
var record = {
	num: ""
}
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
}

//特惠管理及添加
var editor = function() {
	var categoryId = $("select[name='couponCategoryId'] option:selected").val(),
		enterpriseId = $("select[name='enterpriseId'] option:selected").val(),
		enterpriseName = $("select[name='enterpriseId'] option:selected").html(),
		title = $("input[name='title']").val(),
		subtitle = $("input[name='subtitle']").val(),
		iosPhotoId = $("input[name='iosPhotoId']").val(),
		androidPhotoId = $("input[name='androidPhotoId']").val(),
		imgKey01 = $("tr.imgupload:eq(0) .imgshow:eq(0) img").attr("src").split(/\/(?![^\/]*\/)/)[1] == "no-img.png" ? "" : $("tr.imgupload:eq(0) .imgshow img").attr("src").split(/\/(?![^\/]*\/)/)[1],
		imgKey = $("tr.imgupload:eq(1) .imgshow:eq(0) img").attr("src").split(/\/(?![^\/]*\/)/)[1] == "no-img.png" ? "" : $("tr.imgupload:eq(0) .imgshow img").attr("src").split(/\/(?![^\/]*\/)/)[1],
		startTime = $("input[name='startTime']").val(),
		endTime = $("input[name='endTime']").val(),
		totalNum = $("input[name='totalNum']").val(),
		useNum = $("input[name='useNum']").val() == "" ? 0 : $("input[name='useNum']").val(),
		sellPrice = $("input[name='sellPrice']").val() == '' ? 0 : $("input[name='sellPrice']").val(),
		price = $("input[name='price']").val(),
		check_code_startTime = $("input[name='check_code_startTime']").val(),
		check_code_endTime = $("input[name='check_code_endTime']").val(),
		limit = Kmsg_text.html(),
		content = Kmsg_text02.html(),
		couponId = location.href.split("couponId=")[1],
		wxcontent = $("textarea[name='wxcontent']").val();
		cateid=$("#tree").find("option:selected").attr("value"),
		purchase=$("input[name='purchase']").val() == "" ? 0 : $("input[name='purchase']").val(),
		supportrefund=$('#refund').prop('checked') ? 0 : 1;
	var del = $("#appbusstar").val().replace(/^,/, '').split(",");
	var uploadImgData = [],
		deleteImgData = [];
	$("div.phoall span.imgshow").each(function(i) {
		var id = $(this).parent().siblings("#photoId").attr("name");
		if ($("div.phoall span:eq(" + i + ")").find("img").attr("data") == "0") {
			var imky = $("div.phoall span:eq(" + i + ")").find("img").attr("src").split(/\/(?![^\/]*\/)/)[1];
			var ti = {
				"imgKey": imky,
				"useClient": id
			};
			uploadImgData.push(ti);
		}
	});

	if (categoryId == "" || enterpriseId == "" || title == "" || subtitle == "" || startTime == "" || endTime == "" || totalNum == "" || price == "" || imgKey == "" || imgKey01 == "" || check_code_endTime == "" || check_code_startTime == "" ) {
		poFi("带“*”为必填项！");
		return false;
	}
	var wait01 = $(".wait-btn").attr("data-gm");
	var wait02 = $(".wait-btn").attr("data-xq");
	if (wait01 == 1) {
		poFi("购买须知最多为1000字！");
		return;
	}
	if (wait02 == 1) {
		poFi("本单详情最多为1000字！");
		return;
	}

	useNum = parseInt(useNum, 10);
	totalNum = parseInt(totalNum, 10);
	var $useNum = $('input[name="useNum"]');
	var minUseNum = parseInt($useNum.data('default'), 10);

	if (useNum < minUseNum || useNum > totalNum) {
		poFi('修改数量必须大于原数量且小于发行量');
		$useNum.trigger('focus');
		return;
	}

	var tojson = JSON.stringify({
		"categoryId": categoryId,
		"enterpriseId": enterpriseId,
		"enterpriseName": enterpriseName,
		"title": title,
		"subtitle": subtitle,
		"iosPhotoId": iosPhotoId,
		"androidPhotoId": androidPhotoId,
		"imgKey": imgKey,
		"startTime": startTime,
		"endTime": endTime,
		"totalNum": totalNum,
		"useNum": useNum,
		"price": price,
		"sellPrice": sellPrice,
		"limit": limit,
		"content": content,
		"check_code_startTime": check_code_startTime,
		"check_code_endTime": check_code_endTime,
		"wx_code_content": wxcontent,
		"cateid":cateid,
		"purchase":purchase,
		"supportrefund":supportrefund
	});
	$.post("app.couponAdd", {
		"coupon": tojson,
		"couponId": couponId,
		"uploadImgData": JSON.stringify(uploadImgData),
		"deleteImgData": JSON.stringify(del)
	}, function(data) {
		editstart(data.success,data);
	}, "json");
}

var getWXCode = function(tmp) {
	$.get("app.getWXCode", {
		"id": $(tmp).siblings("input[name='codeId']").val()
	}, function(data) {
		if (data.success == "true") {
			art.dialog({
				title: '微信二维码',
				content: '<img src="' + data.data + '" />',
				fixed: true,
				background: "#000",
				opacity: "0.3",
				cancel: true,
				lock: true
			});
		} else {
			poFi(data.msg);
		}
	}, "json");
}
var createWXCode = function(tmp) {
	$.post("app.createWXCode", {
		"id": $(tmp).siblings("input[name='codeId']").val()
	}, function(data) {
		datasucc(data.success, "生成微信二维码失败！", "生成微信二维码成功！");
	}, "json");
}


//商家管理  批量分类左右移动
var movelr = function(tmp, star) {
	var $th = $(tmp);
	$(star).append('<li data="' + $th.attr("data") + '">' + $th.html() + '</li>');
	$th.remove();
	starlr = true;
}


//商家管理  批量商家分类
var bacthfl = function() {
	art.dialog({
		title: '批量分类',
		content: '<div class="lay-fl"><div class="lay-l"><div class="title">未分类商家</div><ul class="nobus" data-type="1"></ul></div><div class="lay-c"><span class="left-lay"></span><span class="right-lay"></span></div><div class="lay-r"><div class="title"></div><ul class="nobus" data-type="1"></ul></div></div>',
		fixed: true,
		background: "#000",
		opacity: "0.3",
		ok: function() {
			var etd = [];
			$("div.lay-r ul.nobus li").each(function(i) {
				etd.push($(this).attr("data"));
			});
			$.post("app.updateEnterpriseCategory", {
				"categoryId": $("div.lay-r select option:selected").val(),
				"enterpriseIds": JSON.stringify(etd)
			}, function(data) {
				datasucc(data.success, "分类失败！", "分类成功！");
			}, "json");
		},
		init: function() {
			$.get("app.getNoCategoryenterprise", function(data) {
				var list = '<select id="layLeft">',
					rightset = '';
				$(data.data.enterpriseCategoryData).each(function(i, v) {
					list += '<option value="' + v.categoryid + '">' + v.categoryName + '</option>';
				});
				$(data.data.enterpriseData).each(function(i, v) {
					rightset += '<li data="' + v.enterpriseId + '">' + v.enterpriseName + '</li>';
				});
				$(".lay-l .nobus").html(rightset);
				$(".lay-r .title").html(list + "</select>");
			}, "json");
			$(".nobus").on("click", "li", function() {
				$(".nobus li").removeClass("cur");
				$(this).addClass("cur");
			});

			$("div.lay-l").on("dblclick", "li", function() {
				movelr(this, "div.lay-r ul.nobus");
			});
			$("div.lay-r").on("dblclick", "li", function() {
				movelr(this, "div.lay-l ul.nobus");
			});

		},
		cancel: true,
		lock: true
	});
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
	var teseinput = $("#tese").find("input:checked"),
		tese = [];
	for (i = 0; i < teseinput.length; i++) {
		tese.push((teseinput).eq(i).val());
	}
	$.post("app.enterpriseUpdate", {
		"businessTime": $("div.wait-m table tr:eq(2) input").val(),
		"enterpriseId": $("#enterpriseId").val(),
		"uploadIosImgData": JSON.stringify(imgkey),
		"uploadAndroidImgData": JSON.stringify(andkey),
		"deleteImgData": JSON.stringify(del),
		"memberId": $("#memberId").val(),
		"enterpriseName": $("#enterpriseName").val(),
		"logo": $("#logo").val(),
		"memberAccount": $("#memberAccount").val(),
		"feature": JSON.stringify(tese)
	}, function(data) {
		editstart(data.success,data);
	}, "json");
};

var linkaction = window.location.href.split("?")[0].split(/\/(?![^\/]*\/)/)[1];
//linkaction：app.specialManage为专题、app.activitiesManage为活动、app.messageManage为消息、app.productCategoryManage为找货、app.couponCategoryManage特惠、app.enterpriseCategoryManage商家


//活动管理、专题管理 、消息管理、新闻管理  商家类目、特惠类目列表页删除
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
		} else if (linkaction == "app.newsManage") {
			$.post("app.newsDelete", {
				"newsIds": JSON.stringify(list)
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
		editstart(data.success,data);
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
			return fun();
		},
		cancel: true,
		lock: true
	});
};



//找货类目管理 添加类目
var pdcadd = function() {
	$.get('app.getAlllevel1Category', function(data) {
		var options = '';
		if (data['success'] === 'true') {
			var cates = data['data'];
			for (var i = cates.length - 1; i > -1; i--) {
				options = '<option value="' + cates[i]['categoryid'] + '" data-level="' + cates[i]['level'] + '">' + cates[i]['categoryName'] + '</option>' + options;
			}
		}

		pdc('添加类目', '<form action="" id="J_addCategory">所属类目：<select name="parentCategoryId" class="pdcadd-input">' + options + '</select><br /><br />类目名称：<input type="text" name="productCategoryName" class="pdcadd-input" maxlength="15" /></form>', function() {
			if ($.trim($("[name='productCategoryName']").val()) == "") {
				alert("类目名称不能为空！");
				return false;
			}
			var $form = $('#J_addCategory');
			$form.append('<input type="hidden" name="level" value="' + ($form.find('[name="parentCategoryId"]>:selected').data('level') + 1) + '" />');
			if (linkaction == "app.productCategoryManage") {
				$.post("app.addProductCategory", $form.serializeArray(), function(data) {
					datasucc(data.success, "添加类目失败！", "添加类目成功！");
				}, "json");
			}

		});
	}, 'json');

};

//找货类目管理 修改类目
var pdcmodify = function(tmp) {
	var padval = '<input type="text" class="pdcadd-input" maxlength="15" value="' + $(tmp).parent().siblings(".na01").children("span").html() + '" />';
	pdc('修改类目', padval, function() {
		var padlist = $(".pdcadd-input").val();
		var padid = $(tmp).parent().siblings(".na01").children("[name='categoryId']").val();
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
	var padid = $(tmp).parent().siblings(".na01").children("[name='categoryId']").val();
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

//找货、特惠、商家类目管理 修改类目排序
var pdcsort = function(tmp, un) {
	var $th, $id, $dnid, idup, sortup, iddown, sortdown, idxfas, idxlast, maxleng, minleng;
	if ($(tmp).closest(".area").find("table").length > 0) {
		$th = $(tmp).closest("tr");
		$id = $th.next("tr");
		$dnid = $th.prev("tr");
		idup = un == "1" ? $th.children("td.list-id").children("[name='categoryId']").val() : $id.children("td.list-id").find("[name='categoryId']").val();
		//sortup = un == "1" ? $dnid.children("td:eq(3)").html() : $th.children("td:eq(3)").html();
		sortup = un == "1" ? $dnid.find('input[name=categorySort]').val() : $th.find('input[name=categorySort]').val();
		iddown = un == "1" ? $dnid.children("td.list-id").find("[name='categoryId']").val() : $th.children("td.list-id").find("[name='categoryId']").val();
		//sortdown = un == "1" ? $th.children("td:eq(3)").html() : $id.children("td:eq(3)").html();
		sortdown = un == "1" ? $th.find('input[name=categorySort]').val() : $id.find('input[name=categorySort]').val();
		idxfas = $th.index();
		idxlast = $th.index() + 1;
		maxleng = $th.closest(".area").find("tbody").find("tr").length;
		//minleng = linkaction == "app.enterpriseCategoryManage" ? 3 : 0;
		minleng = 0;
	} else {
		var isFirst = $(tmp).parent().parent().parent().is('div.area');
		$th = $(tmp).parent().siblings(".na01");
		$id = isFirst ? $(tmp).closest("ul").next().next("ul") : $(tmp).closest("ul").next("ul");
		$dnid = isFirst ? $(tmp).closest("ul").prev().prev("ul") : $(tmp).closest("ul").prev("ul");
		idup = un == "1" ? $th.children("[name='categoryId']").val() : $id.find("[name='categoryId']").val();
		sortup = un == "1" ? $dnid.find("[name='categorySort']").val() : $th.children("[name='categorySort']").val();
		iddown = un == "1" ? $dnid.find("[name='categoryId']").val() : $th.find("[name='categoryId']").val();
		sortdown = un == "1" ? $th.children("[name='categorySort']").val() : $id.find("[name='categorySort']").val();
		idxfas = $th.closest("ul").index();
		idxlast = (isFirst ? ($th.closest("ul").index() / 2) : $th.closest("ul").index()) + 1;
		maxleng = isFirst ? $th.parents(".area").children("ul").length : $th.parents(".cate-2th").children("ul").length;
		minleng = 0;
	}
	if (un == "1" && idxfas == minleng) {
		poFi("此类目已排列第一！");
		return false;
	}
	if (un == "0" && idxlast == maxleng) {
		poFi("此类目已排列最后！");
		return false;
	}
	if (linkaction == "app.productCategoryManage") {
		$.post("app.updateProductCategorySort", {
			"upProductCategoryId": idup,
			"upSort": sortup,
			"downProductCategoryId": iddown,
			"downSort": sortdown
		}, function(data) {
			datasucc(data.success, "排列失败！", "排列成功！");
		}, "json");
	} else if (linkaction == "app.couponCategoryManage") {
		$.post("app.updateCouponCategorySort", {
			"upCouponCategoryId": idup,
			"upSort": sortup,
			"downCouponCategoryId": iddown,
			"downSort": sortdown
		}, function(data) {
			datasucc(data.success, "排列失败！", "排列成功！");
		}, "json");
	} else if (linkaction == "app.enterpriseCategoryManage") {
		$.post("app.updateEnterpriseCategorySort", {
			"upEnterpriseCategoryId": idup,
			"upSort": sortup,
			"downEnterpriseCategoryId": iddown,
			"downSort": sortdown
		}, function(data) {
			datasucc(data.success, "排列失败！", "排列成功！");
		}, "json");
	}

};


function createOptions(data, noDefault) {
	var html = ''
	for (var i = data.length - 1; i > -1; i--) {
		html = '<option value="' + (data[i]['categoryNo'] || data[i]['categoryid']) + '">' + data[i]['categoryName'] + '</option>' + html;
	}
	if (!noDefault) html = '<option value="">请选择</option>' + html;

	return html;
}

var CACHED = {};



//找货类目管理 关联
var pdcrelation = function(dom, cateObj) {
	CACHED['cate2thId'] = cateObj['categoryId'];
	var $th = $(dom).parent().siblings(".na01");
	art.dialog({
		title: '关联',
		content: '<div class="lay-fl" id="J_ass"><div class="lay-l"><strong>关联分类：</strong><br /><div class="title"><select class="scate" name="cate1th">' + (CACHED.cate1th || '<option value="">请选择</option>') + '</select><select class="scate" name="cate2th"><option value="">请选择</option></select></div><select name="cate3th" size="8" class="nobus"></select></div><div class="lay-c"><span class="left-lay"></span><span class="right-lay"></span></div><div class="lay-r"><strong>基础分类：</strong><br /><div class="title"><select class="scate" name="scate1th">' + (CACHED.scate1th || '<option value="">请选择</option>') + '</select><select class="scate" name="scate2th"><option value="">请选择</option></select></div><select name="scate3th" size="8" class="nobus"></select></div></div>',
		fixed: true,
		background: "#000",
		opacity: "0.3",
		ok: function() {
			var dialog = this;
			var $ass = $('#J_ass');
			var categoryNo = $ass.find('[name="cate2th"]').val();
			if (categoryNo == '') {
				alert('关联失败，请选择待关联的分类！')
				return false;
			}

			if ($ass.find('[name="cate3th"] option').length < 1) {
				alert('关联失败，请选择要关联的基础分类！');
				return false;
			}

			var deleteCategoryNos = CACHED[categoryNo + 'Arr'].concat([]);
			var mapProductCategorys = [];
			$ass.find('[name="cate3th"] option').each(function(index, item) {
				var i = $.inArray(item.value, deleteCategoryNos);
				if (i < 0) {
					mapProductCategorys.push(item.value);
				} else {
					deleteCategoryNos.splice(i, 1);
				}
			});

			if (mapProductCategorys.length < 0 && deleteCategoryNos.length < 0) {
				alert('没有任何改动！');
				return false;
			}

			$.post("app.addMapProductCategory", {
				categoryNo: categoryNo,
				mapProductCategorys: '["' + mapProductCategorys.join('","') + '"]',
				deleteCategoryNos: '["' + deleteCategoryNos.join('","') + '"]'
			}, function(data) {
				if (data.success == "false") {
					poFi("关联类目失败！");
				} else {
					dialog.close();
					poTS("关联类目成功！");
				}
			}, "json");
			return false;
		},
		init: function() {
			CACHED.scate1th || $.get("app.getPCLevel1Category", function(data) {
				CACHED.scate1th = createOptions(data.data);
				$('#J_ass').find('[name="scate1th"]').html(CACHED.scate1th);
			}, "json");
			CACHED.cate1th || $.get('app.getAlllevel1Category', function(data) {
				CACHED.cate1th = '';
				var cates = data['data'];
				cates[0] = {
					categoryid: '',
					categoryName: '请选择'
				}
				for (var i = cates.length - 1; i > -1; i--) {
					CACHED.cate1th = '<option value="' + cates[i]['categoryid'] + '">' + cates[i]['categoryName'] + '</option>' + CACHED.cate1th;
				}
				$('#J_ass').find('[name="cate1th"]').html(CACHED.cate1th).val(cateObj.parentCategoryId).trigger('change');
			}, 'json');
			$('#J_ass').find('[name="cate1th"]').val(cateObj.parentCategoryId).trigger('change');
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
}

//特惠删除推荐
var rectoyn = function(tmp) {
	var set = $(tmp).closest("tr").children("td:eq(0)").find("input").val();
	$.post("app.deleteCouponRecommend", {
		"recommendid": JSON.stringify(set.split(","))
	}, function(data) {
		datasucc(data.success, "操作失败！", "操作成功！");
	}, "json");
}

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
}

// 特惠推荐排序跳转
var inputKeyDown = function(e, tmp) {
	var e = e || event;　
	var currKey = e.keyCode || e.which || e.charCode;
	if (currKey == 13) {
		z
		var pagecur = $(tmp).val();
		if (pagecur < 1) {
			alert("请输入排序数");
			return false;
		} else {
			pflok(tmp);
		}
	}
}

//特惠上架 下架
var sellCoupon = function(obj, id, str) {
	$.post("app.couponisSell", {
		"couponId": id,
		"couponisSell": str
	}, function(response) {
		if (response.success) {
			art.dialog({
				content: response.msg,
				icon: 'succeed',
				fixed: true,
				time: 1.5,
				close: function() {
					location.href = location.href
				}
			});
		} else {
			art.dialog({
				content: response.msg,
				icon: 'error',
				fixed: true,
				time: 1.5
			});
		}
	}, "json");
};

function returntime(starttime) { //返回有效期(最小)结束时间
	var myDate = new Date(),
		curtime = myDate.getFullYear() + '-' + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + '-' + myDate.getDate(),
		startTime = $(starttime).val();
	return compareTime(curtime, startTime);
}

function returnyzmtime(starttime, checkcodestartTime) { //返回验证码(最小)结束时间
	var myDate = new Date(),
		curtime = myDate.getFullYear() + '-' + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + '-' + myDate.getDate(),
		startTime = $(starttime).val(),
		codestartTime = $(checkcodestartTime).val();
	return compareTime(curtime, startTime, codestartTime);
}

function compareTime(a, b, c) { //日期比较:年-月-日 返回最大日期
	var timeary = [a, b, c].sort(function(a, b) {
		return a < b
	});
	return timeary[0];
}

function checkMemberAccount(obj) { //商家管理查询验证会员账号
	var v = $("#memberAccount").val();
	if (v) {
		$.get("app.checkMemberAccount", {
			"account": v
		}, function(response) {
			if (response.success == 'true') {
				$(obj).addClass("g-ico ico-wa-su");
				$("#memberId").val(response.data.memberId);
				$("#enterpriseName").val(response.data.enterpriseName);
				$("#logo").val(response.data.logo);
			} else {
				$(obj).removeClass("g-ico ico-wa-su");
				art.dialog({
					content: response.msg,
					icon: 'error',
					fixed: true,
					time: 1.5
				});
			}
		}, 'json')
	}
}

function addEnterpriseSingle(obj) { //单个添加商家
	var tr = $(obj).parents("tr"),
		ary = [],
		v = {
			"memberId": $(tr).children("td:eq(0)").find("input").val(),
			"logo": $(tr).children("td:eq(1)").find("img").attr("src"),
			"enterpriseName": $(tr).children("td:eq(2)").text(),
			"account": $(tr).children("td:eq(3)").text()
		};
	ary.push(v);
	$.post('app.saveEnterprise', {
		'enterpriseList': JSON.stringify(ary)
	}, function(response) {
		if (response.success == 'true') {
			art.dialog({
				content: response.msg,
				icon: 'succeed',
				fixed: true,
				time: 1.5,
				close: function() {}
			});
		} else {
			art.dialog({
				content: response.msg,
				icon: 'error',
				fixed: true,
				time: 1.5
			});
		}
	}, 'json')
}

function addEnterpriseSingle(obj) { //批量添加商家
	var tr = $(obj).parents("tr"),
		ary = [],
		v = {
			"memberId": $(tr).children("td:eq(0)").find("input").val(),
			"logo": $(tr).children("td:eq(1)").find("img").attr("src"),
			"enterpriseName": $(tr).children("td:eq(2)").text(),
			"account": $(tr).children("td:eq(3)").text()
		};
	ary.push(v);
	$.post('app.saveEnterprise', {
		'enterpriseList': JSON.stringify(ary)
	}, function(response) {
		if (response.success == 'true') {
			art.dialog({
				content: response.msg,
				icon: 'succeed',
				fixed: true,
				time: 1.5,
				close: function() {
					location.href = location.href
				}
			});
		} else {
			art.dialog({
				content: response.msg,
				icon: 'error',
				fixed: true,
				time: 1.5
			});
		}
	}, 'json')
}

function addEnterpriseBatch(obj) { //批量添加商家
	var checkbox = $("table.app-tab td.list-id input:checked"),
		tr = $(checkbox).parents("tr"),
		ary = [];
	if (checkbox.length <= 0) {
		art.dialog({
			content: '请先选择您要操作的项！',
			icon: 'error',
			fixed: true,
			time: 1.5
		});
		return false
	}
	for (i = 0; i < tr.length; i++) {
		var v = {
			"memberId": $(tr[i]).children("td:eq(0)").find("input").val(),
			"logo": $(tr[i]).children("td:eq(1)").find("img").attr("src"),
			"enterpriseName": $(tr[i]).children("td:eq(2)").text(),
			"account": $(tr[i]).children("td:eq(3)").text()
		};
		ary.push(v);
	}
	$.post('app.saveEnterprise', {
		'enterpriseList': JSON.stringify(ary)
	}, function(response) {
		if (response.success == 'true') {
			art.dialog({
				content: response.msg,
				icon: 'succeed',
				fixed: true,
				time: 1.5,
				close: function() {
					location.href = location.href
				}
			});
		} else {
			art.dialog({
				content: response.msg,
				icon: 'error',
				fixed: true,
				time: 1.5
			});
		}
	}, 'json')
}

$(function() {
	$('#content').delegate('.na01>a>img', 'click', function() {
		var $t = $(this),
			$ul = $t.parents('ul'),
			$div = $ul.next('div.cate-2th');
		if ($div.is(':hidden')) {
			$div.show();
			$t.attr('src', 'http://resmanage.csc86.com/img/icons/less.png');
		} else {
			$div.hide();
			$t.attr('src', 'http://resmanage.csc86.com/img/icons/unless.png');
		}
	});



	$(document).delegate('[name="cate1th"]', 'change', function() {
		var $t = $(this),
			val = $t.val();
		$t.next().html('<option value="">请选择</option>');
		if (val != '') {
			CACHED[val] ? $t.next().html(CACHED[val]) : $.get('app.getSubCategory', {
				categoryId: val
			}, function(data) {
				CACHED[val] = createOptions(data.data);
				$t.next().html(CACHED[val]).val(CACHED['cate2thId']).trigger('change');
			}, 'json');
			$t.next().val(CACHED['cate2thId']).trigger('change');
		}
	}).delegate('[name="cate2th"]', 'change', function() {
		var $t = $(this),
			val = $t.val();
		$t.parent().next().empty();
		if (val != '') {
			CACHED[val] ? $t.parent().next().html(CACHED[val]) : $.get('app.getPCMapCategory', {
				categoryId: val
			}, function(data) {
				CACHED[val] = createOptions(data.data, true);
				CACHED[val + 'Arr'] = [];
				$.each(data.data, function(index, item) {
					CACHED[val + 'Arr'][index] = item['categoryNo'];
				});
				$t.parent().next().html(CACHED[val]);
			}, 'json');
		}

	}).delegate('[name="scate1th"]', 'change', function() {
		var $t = $(this),
			val = $t.val();
		$t.next().html('<option value="">请选择</option>');
		if (val != '') {
			CACHED[val] ? $t.next().html(CACHED[val]) : $.get('app.getPCSubCategory', {
				categoryId: val
			}, function(data) {
				CACHED[val] = createOptions(data.data);
				$t.next().html(CACHED[val]);
			}, 'json');
		}
		$t.parent().next().empty();
	}).delegate('[name="scate2th"]', 'change', function() {
		var $t = $(this),
			val = $t.val();
		$t.parent().next().empty();
		if (val != '') {
			CACHED[val] ? $t.parent().next().html(CACHED[val]) : $.get('app.getPCSubCategory', {
				categoryId: val
			}, function(data) {
				CACHED[val] = data.data.length === 0 ? ('<option value="' + val + '">' + $t.find(':selected').html() + '</option>') : createOptions(data.data, true);
				$t.parent().next().html(CACHED[val]);
			}, 'json');
		}
	}).delegate('[name="cate3th"] option', 'dblclick', function() {
		$(this).remove();
	}).delegate('[name="scate3th"] option', 'dblclick', function() {
		var $cate3th = $('[name="cate3th"]');
		var $t = $(this);
		if ($cate3th.find('[value="' + $t.val() + '"]').length < 1) {
			$t.clone().appendTo($cate3th);
		} else {
			alert('此分类已选择！');
		}
	}).delegate('.left-lay', 'click', function() {
		$('[name="cate3th"] :selected').remove();
	}).delegate('.right-lay', 'click', function() {
		var $cate3th = $('[name="cate3th"]');
		var $t = $('[name="scate3th"] :selected');
		if ($cate3th.find('[value="' + $t.val() + '"]').length < 1) {
			$t.clone().appendTo($cate3th);
		} else {
			alert('此分类已选择！');
		}
	});
});