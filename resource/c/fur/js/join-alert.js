define(function(require, exports, module) {
	//对话框
	var merchant = {};
	//遮罩
	merchant.shade = function() {
		var $dom = $("<div>")
		$dom.addClass("dailog-shade")
		$dom.css({
			height: $("body").height() + "px",
			width: $(window).width() + "px"
		});
		$("body").append($dom);
	}

	//弹出框
	merchant.FixDialog = function(title) {
		var $d = $(".dailog")
		var LF = $(window).width() / 2 - $d.width() / 2,
			TP = $(window).height() / 2 - $d.height() / 2 + $(window).scrollTop();
		$d.find("h2").text(title);
		$d.css({
			display: "block",
			left: LF + "px",
			top: TP + "px"
		});
		merchant.shade();
		$(".close").unbind().bind("click", function() {
			$d.hide();
			$(".dailog-shade").remove();
		});
	}
	//登录窗
	merchant.LoginAlert = function(func, title) {
		if (window.csc) {
			$(document).unbind().bind('cscSignEd', function() {
				func()
			});
			seajs.use('//res.csc86.com/f=js/m/sign', function() {

				csc.checkSign();;
			});
		} else {
			require.async('//res.csc86.com/js/', function() {
				$(document).unbind().bind('cscSignEd', function() {
					func()
				});
				seajs.use('//res.csc86.com/f=js/m/sign', function() {
					csc.checkSign();;
				});
			});
		}
	}
	//登录状态
	var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');
	//加盟
	$('.btn_join,.price span').click(function() {
		var $me = $(this);
		var _name = $me.attr("name")
		$("#item").val(_name + '-我要加盟');
		if (isLogin.status) {
			merchant.FixDialog("我要加盟");
		} else {
			merchant.LoginAlert(function() {
				merchant.FixDialog("我要加盟");
			}, "我要加盟");
		}
	});
	//考察
	$('.btn-find').click(function() {
		var $me = $(this);
		var _name = $me.attr("name")
		$("#item").val(_name + '-我要考察');
		if (isLogin.status) {
			merchant.FixDialog("我要考察");
		} else {
			merchant.LoginAlert(function() {
				merchant.FixDialog("我要考察");
			}, "我要考察");
		}
	});
	//表单提交
	$("#myform").delegate("input[type='button']", "click", function() {
		var reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
		if ($("#name").val() == "") {
			alert("请填写您的真实姓名！");
			$("#name").focus();
		} else if (reg.test($("#tel").val()) == false) {
			alert("请填写您的真实电话号码！")
			$("#tel").val('').focus();
		} else {
			var _Json = $("#myform").serialize();
			$.get('//pcc.csc86.com/index.php?m=formguide&c=index&a=show&formid=17&action=js&siteid=1&ajax=1&' + _Json, function(data) {
				switch (data.stutas) {
					case true:
						$(".close").trigger("click");
						$("form[name='myform']").get(0).reset();
						alert("提交成功！")
						break;
					case false:
						alert("提交失败！")
						break;
				}
			}, 'jsonp');
		}

	});
	$("textarea").attr("maxlength", "250");
	$("#myform").delegate("textarea", "keyup focus blur", function(e) {
		if (e.type == "keyup") {
			var _val = $(this).val();
			if ($(this).length > 250) {
				e.returnValue = false;
			}
		} else if (e.type == "focusin") {
			if ($.trim($(this).html()) == "请您填写留言") {
				$(this).text('').val('').addClass('fc-444');
			}
		} else if (e.type == "focusout") {
			if ($.trim($(this).val()).length == 0) {
				$(this).text('请您填写留言').val('请您填写留言').removeClass('fc-444').show();
			}
		}
	});
})