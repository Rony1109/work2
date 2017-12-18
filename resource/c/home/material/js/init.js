/**
 * 前端模板js文件
 *
 */
seajs.config({
	alias: {
		'focus': 'c/home/index/js/focusPlay',
		'src': 'c/home/index/js/src_bdt'
	}
});

define(function(require, exports, module) {
	var csc = require('focus');
	var src = require('src');

	//设置首页及添加收藏
	require('m/top-bar/js/init');
	require('m/head-search/js/init');
	//弹出框
	//require('m/dialog/js/init');
	//require('./sign_up');
	//轮播
	$(".src-img ul").find("script").remove();
	csc.focusPlay("div.src-img");

	//供求库 行业热推左移动
	$(".act_t .l").click(function() {
		src.left_right(".act_t", "1");
	});
	//供求库 行业热推右移动
	$(".act_t .r").click(function() {
		src.left_right(".act_t", "2");
	});
	//供求库 行业热推轮播
	var timerT;
	$('#act_t').mouseenter(function() {
		clearInterval(timerT);
	}).mouseleave(function() {
		var $th = $(this);
		timerT = setInterval(function() {
			src.left_right($th, "1");
		}, 5000);
	}).trigger("mouseleave");



	//供求库 优质供应商左移动
	$(".hot-seller .sle-l").click(function() {
		src.left_right(".hot-seller", "1");
	});
	//供求库 优质供应商右移动
	$(".hot-seller .sle-r").click(function() {
		src.left_right(".hot-seller", "2");
	});
	//供求库 优质供应商轮播
	var timert;
	$('.hot-seller').hover(function() {
		clearInterval(timert);
	}, function() {
		var $th = $(this);
		timert = setInterval(function() {
			src.left_right($th, "1");
		}, 5000);
	}).trigger("mouseleave");

	$(".mel-sib li").click(function() {
		$(".mel-sib li,.til-sech .genre-all").removeClass("cur");
		$(this).addClass("cur");
		var idx = $(this).index();
		$(".til-sech .genre-all:eq(" + idx + ")").addClass("cur");
	})

	//热门活动标题切换
	$(".bor_con .item>a").hover(function() {
		$(".bor_con .item").removeClass("cur");
		$(this).parent().addClass("cur");
	});
	//供应类品库标题切换
	$(".til-leter li").hover(function() {
		var $th = $(this);
		var tmp = $th.children("span.t").find("a").html();
		$(".til-leter li").removeClass("cur");
		var dataid = $th.children("span.t").find("a").attr("data-id");
		if (dataid == 1) {
			$.get("//api.csc86.com/category/categorybychar/" + $.trim(tmp), function(data) {
				var htmlval = "";
				for (var i = 0; i < data.length; i++) {
					htmlval += '<a href="//offer.csc86.com/' + data[i].categoryNo + '.html" title="' + data[i].categoryName + '">' + data[i].categoryName + '</a>';
				};
				$th.find("div").html(htmlval);
				$th.children("span.t").find("a").attr("data-id", "2")
				$th.addClass("cur");
			}, "jsonp");
		} else {
			$th.addClass("cur");
		}
	}, function() {
		$(".til-leter li").removeClass("cur");
	});


	//公司黄页
	$(".mel-title select[name='area'],.mel-title select[name='profession']").bind("change", function() {
		var hy = $(".mel-title select[name='profession'] option:selected").val();
		var are = $(".mel-title select[name='area'] option:selected").val();
		$.get("//symanage.csc86.com/api.php?op=get_lists&type=com&aid=" + are + "&cid=" + hy, function(data) {
			var htmlval = "";
			for (var i = 0; i < data.length; i++) {
				if (i == data.length - 1) {
					htmlval += '<a href="' + data[i].companyurl + '" title="' + data[i].title + '" target="_blank">' + data[i].title + '</a>';
				} else {
					htmlval += '<a href="' + data[i].companyurl + '" title="' + data[i].title + '" target="_blank">' + data[i].title + '</a><i>|</i>';
				}
			};
			$(".cy-all").html(htmlval);
		}, "jsonp");
	});

	$(".huo_inner form").on('submit',function() {
		var q = $(".huo_inner input[name='q']").val(),
			area = $(".huo_inner select[name='area'] option:selected").html() || '',
			city = $(".huo_inner select[name='city'] option:selected").html() || '',
			selectOneCate = $(".huo_inner select[name='selectOneCate'] option:selected").val(),
			selectTwoCate = $(".huo_inner select[name='selectTwoCate'] option:selected").val(),
			businessType = $(".huo_inner select[name='businessType'] option:selected").val();
		var s_OK = true;
		if (q == "") {
			alert('请输入搜索关键词！');
			s_OK = false;
		}
		if (area == "选择省") {
			area = "";
		}
		if (city == "选择市") {
			city = "";
		}
		if (selectOneCate == "s") {
			selectOneCate = "";
		}
		if (selectTwoCate == "s") {
			selectTwoCate = "";
		}
		if (s_OK == false) {
			return false;
			s_OK = true
		}
	});

	//登录后采购数
	$.get("//api.csc86.com/shop/countproduct", function(data) {
		if (data.status == true && data.data.hasOpened == true) {
			$(".bor_con li.item:eq(0)").find(".go_b").children(".btn_shop").css("display", "none");
			$(".bor_con li.item:eq(0)").find(".f_push").css("display", "block").children("em").html(data.data.product);
			$(".bor_con li.item:eq(1)").find(".go_b").children(".btn_shop").css("display", "none");
			$(".bor_con li.item:eq(1)").find(".f_push").css("display", "block").children("em").html(data.data.inquiry);
		} else if (data.status == true && data.data.hasOpened == false) {
			$(".bor_con li.item:eq(1)").find(".go_b").children(".btn_shop").css("display", "none");
			$(".bor_con li.item:eq(1)").find(".f_push").css("display", "block").children("em").html(data.data.inquiry);
		}
	}, "jsonp");

$('select[name="selectOneCate"],select[name="area"],select[name="city"],select[name="selectTwoCate"]').find('option:first').val('')
	//获取第二级类目
	$("select[name='selectOneCate']").change(function() {
		var strone = $(this).children("option:selected").val();
		if (strone != "") {
			$.get("//api.csc86.com/category/getcategory.html?cateid=" + strone, function(data) {
				var tmp = "<option value=''>二级栏目</option>";
				$.each(data, function(i, v) {
					tmp += '<option value="' + v.categoryNo + '">' + v.categoryName + '</option>';
				});
				$("select[name='selectTwoCate']").html(tmp);
			}, "jsonp");
		} else {
			$("select[name='selectTwoCate']").html('<option value="">二级栏目</option>');
		}

	});
	//获取市
	$("select[name='area']").change(function() {
		var strone = $(this).children("option:selected").val();
		$("select[name='city']").html("");
		if (strone != "") {
			$.get("//api.csc86.com/area/getcity?provinceId=" + strone, function(data) {
				var tmp = "<option value=''>选择市</option>";
				$.each(data, function(i, v) {
					tmp += '<option value="' + v.id + '">' + v.name + '</option>';
				});
				$("select[name='city']").html(tmp);
			}, "jsonp");
		} else {
			$("select[name='city']").html('<option value="">选择市</option>');
		}
	});

	//友情链接更多
	require('c/home/links/js/linkMore');

});