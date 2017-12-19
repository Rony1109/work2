seajs.config({

	// 别名配置
	alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js'
	},

	// Sea.js 的基础路径
	base: 'http://res.csc86.com/v2/'
});
define(function(require, exports, module) {
	require('jquery');
	require('top');
	require('header');
	require('placeholder');
	//表单提交
	$(".myform").submit(function(e) {
		e.preventDefault();
		submitOK = true;
		if ($("#companyname").val() == "") {
			alert("公司名称不能为空！");
			submitOK = false;
		}
		if ($("#contact").val() == "") {
			alert("联系人姓名不能为空！");
			submitOK = false;
		}
		if ($("#tel").val() == "") {
			alert("联系电话不能为空！");
			submitOK = false;
		}
		if (submitOK == false) {
			return false;
		}
		var Ojson = $(this).serialize();
		$.get('http://cncms.csc86.com/formguide/index.php?' + Ojson, function(data) {
			if (data.status == true) {
				alert('提交成功！');
			} else {
				alert('提交失败！');
			}
		}, 'jsonp');
		$(this).get(0).reset();
		$(".closed").trigger("click");
		return false
	});
	//弹出表单
	$(".nav").on('click', '.join-btn', function() {
		var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
		if (isLogin.status == true) {
			var W = $(window).width();
			var LF = W / 2 - $('.pop-up').outerWidth() / 2;
			var TP = $(window).height() / 2 - $('.join').outerHeight() / 2;
			var H = $("body").height();
			$('.shade').css({
				width: W + "px",
				height: H + "px"
			}).show();
			$('.pop-up').css({
				left: LF + "px",
				top: TP + "px"
			}).show();
		} else {
			alert("页面会跳转登录页，登录后会返回当前页！")
			window.location = "http://member.csc86.com/login/phone/"
		}

	});
	//关闭弹窗
	$(".closed").click(function() {
		$('.shade').hide();
		$('.pop-up').hide();
	});

	//滚动
	function myScroll($parent, $child, times) {
		var num = 0;
		var $ul = $parent.find('ul');
		$parent.hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(function() {
				num += 1;
				if (num == $ul.length) {
					num = 0
				}
				_animate(num);
			}, 5000);
		}).trigger('mouseleave');

		function _animate(num) {
			$ul.eq(num).show().siblings('ul').hide();
			$child.eq(num).addClass('cur').siblings('a').removeClass('cur');
		};
		$child.mouseover(function() {
			num = $child.index(this);
			_animate(num);
		});
	}

	$(".tcr").each(function(i){	
		new myScroll($('#tcr-'+(i+1)), $('#j-tab-'+(i+1)+' a'), eval('times_'+i+'=""'))
	})

	//浮动
	var ie6 = !-[1, ] && !window.XMLHttpRequest;
	var fixed_num = 600;
	$(window).scroll(function() {
		setTimeout(function() {
			var sT = $(window).scrollTop();
			if (ie6) {
				if (sT > fixed_num) {
					$("#fixed").animate({
						top: (sT - fixed_num + 330) + "px",
					}).show();
				} else {
					$("#fixed").removeAttr('style');
				}
			} else {
				if (sT >= fixed_num) {
					$("#fixed").css({
						position: "fixed",
						top: 0
					}).show();
				} else if (sT <= fixed_num) {
					$("#fixed").removeAttr('style');
				}
			}
		}, 400)
	});
	 $("#fixed li:last").click(function(){
	 	 $("#fixed").removeAttr('style');
        $(window).scrollTop(0);
     })
	var isLogin = require('http://api.csc86.com/api/member/islogin?callback=define');
	if (isLogin.status == true) {
		$("#myFormA").unbind('click');
	} else {
		$("#myFormA").bind('click', function() {
			alert("页面会跳转登录页，登录后会返回当前页！")
			window.location = "http://member.csc86.com/login/phone/"
		})
	}
	$("#myFormA").submit(function(e) {
		e.preventDefault();
		var Data = $(this).serialize();
		var $me=$(this)
		submitOK = "true"
        if ($("#msg").val() == "输入您的意见或建议") {
            alert("留言不能为空！");
            submitOK = "false";
        }
        if ($("#tel").val() == "留下您的联系方式") {
            alert("联系方式不能为空");
            submitOK = "false";
        }
        if (submitOK == "false") {
            return false;
        }
		$.get('http://cncms.csc86.com/formguide/index.php?' + Data, function(data) {
			if (data.status == true) {
				$me.get(0).reset();
				alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
			} else {
				alert("提交失败！")
			}
		},'jsonp');
	});




})