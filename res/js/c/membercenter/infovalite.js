var
	focu = true,
	regNum = /^\d+$/,
	regtele = /^\d{5,9}$/,
	regName = /^([A-Za-z]|[\u4e00-\u9fa5])+$/,
	mgName = /^([A-Za-z0-9]|[\u4e00-\u9fa5])+$/,
	regxemail = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
	regxphone = /^1\d{10}$/,
	spPattern = /^[^A-Za-z0-9\u4e00-\u9fa5]+$/;
var _tips = function(adress, msg, id, tips) {
	$("#" + adress).html(msg).show();
	$("#" + tips).hide();
	id && $("#" + id).keydown(function() {
		$("#" + adress).hide().removeClass("g-f-success");;
	}).change(function() {
		$("#" + adress).hide();
	});

	return false;
};

function _hide(id) {
	focu = false;
	$(id).focus();
}

function getStrByteLen(str) {
	return str.replace(/[^\x00-\xff]/ig, '**');
}

function IsURL(str_url) {
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@
		+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
		+ "|" // 允许IP和DOMAIN（域名）
		+ "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.
		+ "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名
		+ "[a-zA-Z]{2,6})" // first level domain- .com or .museum
		+ "(:[0-9]{1,4})?" // 端口- :80
		+ "((/?)|" + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re = new RegExp(strRegex);
	return re.test(str_url);
}



function compvalite() {
	var $submit = $('form[action^="/membercenter/companyinfo/"]').find('span.aff-submit');
	$submit.addClass("aff-cancel").find("input").attr("disabled", true);
	focu = true;
	var $this = $("#userName"),
		l = $this.length,
		$val = $.trim($this.val()),
		$val = $.trim($this.val()),
		intrlen = $("#indus-sele > span").length,
		flag = false,
		fleviod = true,
		lenFlag = false,
		$enterpriseType = $.trim($("#enterpriseType").find(":selected").text()),
		$statutory = $.trim($("#statutory").val()),
		$registerMoney = $.trim($("#registerMoney").val()),
		$province = $.trim($("#province").find(":selected").text()),
		$city = $.trim($("#city").find(":selected").text()),
		$areas = $.trim($("#area-s").find(":selected").text()),
		dressLen = $("#useradress").length,
		useradress = $.trim($("#useradress").val()),
		website = $.trim($("#website").val()),
		intr = $.trim($("#area-intr").val()),
		submain = $.trim($("#submain").val()),
		returntips = true;
	var inCsc = $('[name="result"]:checked').val() === 'Y';
	var $jCsc=$('#J_csc');//哪个华南城下拉列表
	var $jygc=$('#jygc');//广场下拉列表
	var $gcFlr=$('#gcFlr');//楼层下拉列表
	var $flrQy=$('#flrQy');//楼层区域下拉列表
	var jCscVal=$jCsc.val();
	var jygcVal=$jygc.val();
	var gcFlrVal=$gcFlr.val();
	var flrQyVal=$flrQy.val();
	var $shopPicUrl=$('#shopPicUrl');
	var shopPicUrl=$shopPicUrl.val();//图片地址
	$("#nu-pro>input").each(function(index, value) {
		var $val = $.trim($(this).val());
		if ($val) {
			fleviod = false;
		}
		$(this).keydown(function() {
			$("#nu-protips").hide().removeClass("g-f-success");
		})
		if ($val && (!mgName.test($val) || regNum.test($val))) {
			flag = true;
			$(this).focus();
		}

		if ($val && getStrByteLen($val).length > 20) {
			$(this).focus();
			lenFlag = true;
		}
	});
	if ($("#submain").length && !submain) {
		$("#submain").focus();
		return false;
	}
	if (l && !$val) {
		if (focu) {
			_hide("#userName");
		}
		returntips = _tips("userNametips", "请输入企业名称", "userName");
	} else if ($("#status").val()) {
		if (focu) {
			_hide("#userName");
		}
		returntips = _tips("userNametips", "您的企业名称已被注册，请更换", "userName");
	} else if (l && $val && regNum.test($val)) {
		if (focu) {
			_hide("#userName");
		}
		returntips = _tips("userNametips", "企业名称须由4-128位字符组成​", "userName");
	} else if (l && $val && ($val.length < 4 || $val.length > 128)) {
		if (focu) {
			_hide("#userName");
		}
		returntips = _tips("userNametips", "长度有误,请输入4-128个字", "");
	}

	if (inCsc) {
		if($jCsc.is(':visible')&&jCscVal===""){
			if (focu) {
				_hide("#J_csc");
			}
			returntips = _tips("cscArTips", "请完善华南城城内地址", "");
		}
		
		if($jygc.is(':visible')&&jygcVal===""){
			if (focu) {
				_hide("#jygc");
			}
			returntips = _tips("cscArTips", "请完善华南城城内地址", "");
		}
		
		if($gcFlr.is(':visible')&&gcFlrVal===""){
			if (focu) {
				_hide("#gcFlr");
			}
			returntips = _tips("cscArTips", "请完善华南城城内地址", "");
		}
		
		if($flrQy.is(':visible')&&flrQyVal===""){
			if (focu) {
				_hide("#flrQy");
			}
			returntips = _tips("cscArTips", "请完善华南城城内地址", "");
		}
		
		if(shopPicUrl===""){
			if (focu) {
				_hide("#shopPicUrl");
			}
			returntips = _tips("shopPicTips", "请上传店铺实景照片", "");
		}
	} else {
		if ($province === "请选择省") {
			if (focu) {
				_hide("#province");
			}
			returntips = _tips("useradresstips", "请选择省份", "");
		}
		if ($province != "请选择省" && $city === "请选择市") {
			if (focu) {
				_hide("#city");
			}
			returntips = _tips("useradresstips", "请选择市", "");
		}
	}

	if (dressLen && !useradress) {
		if (focu) {
			_hide("#useradress");
		}
		returntips = _tips("adressdeailtips", "请输入详细地址", "useradress");
	} else if (useradress && getStrByteLen(useradress).length > 80) {
		if (focu) {
			_hide("#useradress");
		}
		returntips = _tips("adressdeailtips", "详细地址不能超过40个字", "");
	}

	if (website && !IsURL(website)) {
		if (focu) {
			_hide("#website");
		}
		returntips = _tips("websitetips", "网址输入有误，请重新输入", "");
	}

	if (intrlen <= 0) {
		if (focu) {
			_hide("#ind-txt");
		}
		returntips = _tips("m-intrstips", "请选择主营行业", "");
	} else if (intrlen > 5) {
		if (focu) {
			_hide("#ind-txt");
		}
		returntips = _tips("m-intrstips", "主营行业最多选择5个", "");
	}
	if (fleviod) {
		if (focu) {
			focu = false;
			$("input:first", $("#nu-pro")).focus();
		}
		returntips = _tips("nu-protips", "主营产品/服务至少填写一个", "");
	} else if (flag) {
		returntips = _tips("nu-protips", "主营产品/服务只能输入中文，英文，数字，但不能全是数字", "");
	} else if (lenFlag) {
		returntips = _tips("nu-protips", "主营产品/服务不能超过10个汉字", "");
	}
	if ($enterpriseType === "请选择企业类型") {
		returntips = _tips("enterpriseTypetips", "请选择企业类型", "");
	} else if ($statutory && !mgName.test($statutory)) {
		if (focu) {
			_hide("#statutory");
		}
		returntips = _tips("statutorytips", "请输入汉字、数字或者字母", "statutory");
	} else if ($statutory && regNum.test($statutory)) {
		if (focu) {
			_hide("#statutory");
		}
		returntips = _tips("statutorytips", "法人代表不能全为数字", "statutory");
	} else if ($statutory && $statutory.length > 50) {
		if (focu) {
			_hide("#statutory");
		}
		returntips = _tips("statutorytips", "法人代表不能输入太长", "statutory");
	} else if ($registerMoney && !regNum.test($registerMoney)) {
		if (focu) {
			_hide("#registerMoney");
		}
		returntips = _tips("regtips", "格式不对(必须全为数字)", "registerMoney");
	} else if (parseInt($registerMoney, 10) > 2147483647) {
		if (focu) {
			_hide("#registerMoney");
		}
		returntips = _tips("regtips", "最多输入10位金额数字，请重新输入", "registerMoney");
	}

	if (!intr) {
		if (focu) {
			_hide("#area-intr");
		}
		returntips = _tips("area-intrtips", "请输入公司介绍", "area-intr");
	} else if (intr && ($.trim(intr).length < 50 || $.trim(intr).length > 5000)) {
		if (focu) {
			_hide("#area-intr");
		}
		returntips = _tips("area-intrtips", "请控制在50-5000个字", "");
	} else if (intr && (intr && regNum.test(intr))) {
		if (focu) {
			_hide("#area-intr");
		}
		returntips = _tips("area-intrtips", "不可以全部为数字", "");
	} else if (intr && (intr && spPattern.test(intr))) {
		if (focu) {
			_hide("#area-intr");
		}
		returntips = _tips("area-intrtips", "不可以全部为特殊字符", "");
	}
	if (!returntips) {
		$submit.removeClass("aff-cancel").find("input").removeAttr('disabled');
		return false;
	}
}

function infovalite() {
	focu = true;
	var $firemail = $.trim($("#fir-email").val()),
		$firphone = $.trim($("#fir-phone").val()),
		$this = $("#userName"),
		$val = $.trim($this.val()),
		$phone = $.trim($("#phone").val()),
		$email = $.trim($("#email").val()),
		v86 = $.trim($("#telephoneUsePrefix").val()),
		areaCode = $.trim($("#telephoneAreaCode").val()),
		telephone = $.trim($("#telephone").val()),
		faxUsePrefix = $.trim($("#faxUsePrefix").val()),
		faxAreaCode = $.trim($("#faxAreaCode").val()),
		fax = $.trim($("#fax").val()),
		address = $.trim($("#address").val()),
		company1 = $.trim($('input[name="work[0][company]"]').val()),
		section1 = $.trim($('input[name="work[0][section]"]').val()),
		post1 = $.trim($('input[name="work[0][post]"]').val()),
		company2 = $.trim($('input[name="work[1][company]"]').val()),
		section2 = $.trim($('input[name="work[1][section]"]').val()),
		post2 = $.trim($('input[name="work[1][post]"]').val()),
		company3 = $.trim($('input[name="work[2][company]"]').val()),
		section3 = $.trim($('input[name="work[2][section]"]').val()),
		post3 = $.trim($('input[name="work[2][post]"]').val());
	if ($firphone && !regxphone.test($firphone)) {
		if (focu) {
			_hide("#fir-phone");
		}
		return _tips("fir-phonetips", "手机格式不正确", "fir-phone");
	} else if ($firemail && !regxemail.test($firemail)) {
		if (focu) {
			_hide("#fir-email");
		}
		return _tips("fir-emailtips", "邮箱格式不正确", "fir-email");
	} else if ($val && !regName.test($val)) {
		if (focu) {
			_hide("#userName");
		}
		return _tips("userNametips", "你输入的姓名不符合格式，不能使用数字或者特殊符号", "userName");
	}
	if ($phone && !regxphone.test($phone)) {
		if (focu) {
			_hide("#phone");
		}
		return _tips("phonetips", "手机格式不正确", "phone");
	} else if ($email && !regxemail.test($email)) {
		if (focu) {
			_hide("#email");
		}
		return _tips("emailtips", "邮箱格式不正确", "email");
	} else if ($val && (getStrByteLen($val).length > 20)) {
		if (focu) {
			_hide("#userName");
		}
		return _tips("userNametips", "您填写字符不能超过20个", "userName");
	} else if (v86 && !regNum.test(v86)) {
		if (focu) {
			_hide("#telephoneUsePrefix");
		}
		return _tips("teletips", "你输入的区号(国际)不是数字", "telephoneUsePrefix");
	} else if (areaCode && !regNum.test(areaCode)) {
		if (focu) {
			_hide("#telephoneAreaCode");
		}
		return _tips("teletips", "你输入的区号不是数字", "telephoneAreaCode");
	} else if (telephone && !regtele.test(telephone)) {
		if (focu) {
			_hide("#telephone");
		}
		return _tips("teletips", "你输入的电话号码格式不正确", "telephone");
	} else if (!regNum.test(faxUsePrefix) || !regNum.test(faxAreaCode)) {
		if (focu) {
			_hide("#faxAreaCode");
		}
		return _tips("prefixtips", "你输入的区号不是数字！", "faxAreaCode");
	} else if (fax && !regtele.test(fax)) {
		if (focu) {
			_hide("#fax");
		}
		return _tips("prefixtips", "你输入的传真号码格式不正确", "fax");
	} else if (company1 && !regName.test(company1)) {
		if (focu) {
			_hide('input[name="work[0][company]"]');
		}
		return _tips("companytips1", "公司名称只能是汉字,英文", "");
	} else if (company1 && (getStrByteLen(company1).length > 100)) {
		if (focu) {
			_hide('input[name="work[0][company]"]');
		}
		return _tips("companytips1", "公司名称不能超过50个汉字", "");
	} else if (section1 && !regName.test(section1)) {
		if (focu) {
			_hide('input[name="work[0][section]"]');
		}
		return _tips("sectiontips1", "部门只能输入汉字,英文", "");
	} else if (section1 && (getStrByteLen(section1).length > 40)) {
		if (focu) {
			_hide('input[name="work[0][section]"]');
		}
		return _tips("sectiontips1", "部门不能超过20个汉字", "");
	} else if (post1 && !regName.test(post1)) {
		if (focu) {
			_hide('input[name="work[0][post]"]');
		}
		return _tips("posttips1", "职位只能输入汉字,英文", "");
	} else if (post1 && (getStrByteLen(post1).length > 40)) {
		if (focu) {
			_hide('input[name="work[0][post]"]');
		}
		return _tips("posttips1", "职位不能超过20个汉字", "");
	} else if (company2 && !regName.test(company2)) {
		if (focu) {
			_hide('input[name="work[1][company]"]');
		}
		return _tips("companytips2", "公司名称只能是汉字,英文", "");
	} else if (company2 && (getStrByteLen(company2).length > 100)) {
		if (focu) {
			_hide('input[name="work[1][company]"]');
		}
		return _tips("companytips2", "公司名称不能超过50个汉字", "");
	} else if (section2 && !regName.test(section2)) {
		if (focu) {
			_hide('input[name="work[1][section]"]');
		}
		return _tips("sectiontips2", "部门只能输入汉字,英文", "");
	} else if (section2 && (getStrByteLen(section2).length > 40)) {
		if (focu) {
			_hide('input[name="work[1][section]"]');
		}
		return _tips("sectiontips2", "部门不能超过20个汉字", "");
	} else if (post2 && !regName.test(post2)) {
		if (focu) {
			_hide('input[name="work[1][post]"]');
		}
		return _tips("posttips2", "职位只能输入汉字,英文", "");
	} else if (post2 && (getStrByteLen(post2).length > 40)) {
		if (focu) {
			_hide('input[name="work[1][post]"]');
		}
		return _tips("posttips2", "职位不能超过20个汉字", "");
	} else if (company3 && !regName.test(company3)) {
		if (focu) {
			_hide('input[name="work[2][company]"]');
		}
		return _tips("companytips3", "公司名称只能是汉字,英文", "");
	} else if (company3 && (getStrByteLen(company3).length > 100)) {
		if (focu) {
			_hide('input[name="work[2][company]"]');
		}
		return _tips("companytips3", "公司名称不能超过50个汉字", "");
	} else if (section3 && !regName.test(section3)) {
		if (focu) {
			_hide('input[name="work[2][section]"]');
		}
		return _tips("sectiontips3", "部门只能输入汉字,英文", "");
	} else if (section3 && (getStrByteLen(section3).length > 40)) {
		if (focu) {
			_hide('input[name="work[2][section]"]');
		}
		return _tips("sectiontips3", "部门不能超过20个汉字", "");
	} else if (post3 && !regName.test(post3)) {
		if (focu) {
			_hide('input[name="work[2][post]"]');
		}
		return _tips("posttips3", "职位只能输入汉字,英文", "");
	} else if (post3 && (getStrByteLen(post3).length > 40)) {
		if (focu) {
			_hide('input[name="work[2][post]"]');
		}
		return _tips("posttips3", "职位不能超过20个汉字", "");
	}
}

$(function() {
	var regName = /^([A-Za-z]|[\u4e00-\u9fa5])+$/;

	function getStrByteLen(str) {
		return str.replace(/[^\x00-\xff]/ig, '**');
	}
	var $val = $("#tipsmsg").val();
	if (location.href.indexOf("companyinfo") != -1 || location.href.indexOf("introduce") != -1) {
		$("#userName").blur(function() {
			var $this = $(this),
				$val = $.trim($this.val()),
				regNum = /^[0-9]+$/g,
				regtele = /^\d{5,9}$/,
				regName = /^([A-Za-z]|[\u4e00-\u9fa5])+$/;
			if (!$val) {
				$("#userNametips").removeClass("g-f-success").html("公司名称不能为空").show();
			} else if ($val && regNum.test($val)) {
				$("#userNametips").removeClass("g-f-success").html("公司名称不能出现数字").show();
			} else if ($val && $val.length < 4 || $val.length > 128) {
				$("#userNametips").removeClass("g-f-success").html("请填写4-128个字").show();
			} else {
				$.post(csc.url("api", "/member/checkcompany.html"), {
					"companyName": $(this).val(),
					"id": $(this).parent().attr("id")
				}, function(data) {
					if (data.status) {
						$("#status").val(data.status);
						$("#userNametips").html(data.data.msg || "").show().removeClass("g-f-success");
					} else {
						$("#status").val("");
						$("#userNametips").html(data.data.msg || "").addClass("g-f-success").show().parent().addClass("g-f-success");
					}
				}, "jsonp");
			}
		}).keydown(function() {
			$("#userNametips").hide().removeClass("g-f-success");
			$("#usertips").css("visibility", "hidden");
		});
		/*公司介绍字段*/
		$("#area-intr").keyup(function() {
			$("#area-intrtips").hide();
			var len = $.trim($(this).val()).length;
			if (len < 5000) {
				$("#areacount").html(5000 - len);
			} else {
				$("#areacount").html(0);
			}
		}).bind("focus", function() {
			var len = $.trim($(this).val()).length;
			if (len < 5000) {
				$("#areacount").html(5000 - len);
			} else {
				$("#areacount").html(0);
			}
			$(".areacount").show();
		}).bind("blur", function() {
			var len = $.trim($(this).val()).length;
			if (len < 5000) {
				$("#areacount").html(5000 - len);
			} else {
				$("#areacount").html(0);
			}
		});
		/*企业类型字段*/
		$("#enterpriseType").change(function() {
			$("#enterpriseTypetips").hide();
		});
		if ($val) {
			var  cc = $.parseJSON($val);
			if(cc>=0){
				csc.useDialog(function() {
					csc.success($val);
				});
			}
		}

	} else {

		$('input[name="work[0][company]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#companytips1").html("公司名称只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 100)) {
				$("#companytips1").html("公司名称不能超过50个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#companytips1").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}
		});
		$('input[name="work[0][section]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#sectiontips1").html("部门只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 40)) {
				$("#sectiontips1").html("部门不能超过20个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#sectiontips1").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}

		});
		$('input[name="work[0][post]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#posttips1").html("职位只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 40)) {
				$("#posttips1").html("职位不能超过20个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#posttips1").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}
		});
		$('input[name="work[1][company]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#companytips2").html("公司名称只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 100)) {
				$("#companytips2").html("公司名称不能超过50个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#companytips2").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}
		});
		$('input[name="work[1][section]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#sectiontips2").html("部门只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 40)) {
				$("#sectiontips2").html("部门不能超过20个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#sectiontips2").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}

		});
		$('input[name="work[1][post]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#posttips2").html("职位只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 40)) {
				$("#posttips2").html("职位不能超过20个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#posttips2").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}
		});
		$('input[name="work[2][company]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#companytips3").html("公司名称只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 100)) {
				$("#companytips3").html("公司名称不能超过50个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#companytips3").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}
		});
		$('input[name="work[2][section]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#sectiontips3").html("部门只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 40)) {
				$("#sectiontips3").html("部门不能超过20个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#sectiontips3").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}

		});
		$('input[name="work[2][post]"]').blur(function() {
			var val = $.trim($(this).val());
			if (val && !regName.test(val)) {
				$("#posttips3").html("职位只能是汉字,英文").removeClass("g-f-success").show();
			} else if (val && (getStrByteLen(val).length > 40)) {
				$("#posttips3").html("职位不能超过20个汉字").removeClass("g-f-success").show();
			} else if (val && regName.test(val)) {
				$("#posttips3").html("").addClass("g-f-success").show().parent().addClass("g-f-success");
			}
		});

		//会员名验证(判断唯一性)
		$('#memberName').on('blur',function(){
			var $this=$(this);
			var $memberNametips=$('#memberNametips');
			if(/^[\w\W]{5,25}$/.test($this.val())){
				$.get('//member.csc86.com/membercenter/checkmembername?memberName='+$this.val(),function(data){
					var status=data.status;
					var msg=data.message;
					if(status){
						$memberNametips.html(msg).removeClass("g-f-success").show().parent().removeClass("g-f-success");
					}else{
						$memberNametips.html('').addClass("g-f-success").show().parent().addClass("g-f-success");
					}
				},'jsonp');
			}else{
				$memberNametips.html('会员名需在5-25个字符范围内').removeClass("g-f-success").show().parent().removeClass("g-f-success");
			}

		});
		
		//显示后台返回的提示信息
		if ($val) {
			csc.useDialog(function() {
				/*csc.alert('您的资料修改已经提交成功，正在等待审核，现在您可以:"完善<a class="add" href="/membercenter/companyinfo">企业资料</a>让<br />更多的朋友认识你,或是到<a class="add" href="/">我的首页</a>看看"');*/
				csc.tip($val,3);
			});
		}
	}

	$('#compvalite').on('submit', function(event) {
		return compvalite();
	});

	$('#infovalite').on('submit', function(event) {
		return infovalite();
	});

	(function() {
		var $csc = $('#J_csc');//哪个华南城下拉列表
		var $jygc=$('#jygc');//广场下拉列表
		var $gcFlr=$('#gcFlr');//楼层下拉列表
		var $flrQy=$('#flrQy');//楼层区域下拉列表
		var $wrap = $csc.parents('div.aff-value');
		var $cscItems = $wrap.find('.csc-items');
		var $adressJw2 = $wrap.find('.adress-jw2');
		$wrap.on('change', 'input[name="result"]', function(event) {
			var $t = $(this);
			if ($t.val() === 'Y') {
				
				$cscItems.show();
				$adressJw2.hide();
			} else {
				$cscItems.hide();
				$adressJw2.show();
			}
		});
		
		/*由华南城获取交易广场*/
		$csc.on('change',function(){
			var	id=$(this).val().split(':')[0],
				html='';
			$jygc.find('option:gt(0)').remove();
			$gcFlr.find('option:gt(0)').remove();
			$flrQy.find('option:gt(0)').remove();
			$.get('http://member.csc86.com/membercenter/companyinfo/venue.html',{cityId:id},function(data){
				if(data){
					$.each(data,function(i,n){
						html+='<option value="'+i+':'+n+'">'+n+'</option>';
					});
					$jygc.show().append(html);
				}else{
					$jygc.hide();
					$gcFlr.hide();
					$flrQy.hide();
				}
			},'jsonp');
		});
		
		/*由交易广场获取楼层*/
		$jygc.on('change',function(){
			var	id=$(this).val().split(':')[0],
				cityId=$csc.val().split(':')[0],
				html='';
			$gcFlr.find('option:gt(0)').remove();
			$flrQy.find('option:gt(0)').remove();
			$.get('http://member.csc86.com/membercenter/companyinfo/floor.html',{cityId:cityId,venueId:id},function(data){
				if(data){
					$.each(data,function(i,n){
						html+='<option value="'+i+':'+n+'">'+n+'</option>';
					});
					$gcFlr.show().append(html);
				}else{
					$gcFlr.hide();
					$flrQy.hide();
				}
			},'jsonp');
		});
		
		/*由楼层获取区域*/
		$gcFlr.on('change',function(){
			var	id=$(this).val().split(':')[0],
				cityId=$csc.val().split(':')[0],
				html='';
			$flrQy.find('option:gt(0)').remove();
			$.get('http://member.csc86.com/membercenter/companyinfo/area.html',{cityId:cityId,floorId:id},function(data){
				if(data){
					$.each(data,function(i,n){
						html+='<option value="'+i+':'+n+'">'+n+'</option>';
					});
					$flrQy.show().append(html);
				}else{
					$flrQy.hide();
				}
			},'jsonp');
		});

		/*$csc.on('change',function(event){
			if(this.value){
				$("#useradresstips").hide();
			}
		});*/
	}());

	//违禁词判断
	var failTip = $.parseJSON($("input#tipsmsg").val());
	if(failTip){
		var failStatus=failTip.status;
		var a=[],b=[],msg='';
		for(var i in failTip.msg){//遍历json
			a.push(i);//key
			b.push((failTip.msg)[i]);//value
		}
		for(var i = 0; i <a.length; i++){//构建错误信息
			if(a[i]=="enterprise"){
				msg += '<p><strong>企业名称</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="address"){
				msg += '<p><strong>详细地址</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="introduce"){
				msg += '<p><strong>公司介绍</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="person"){
				msg += '<p><strong>法定代表人</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="sell"){
				msg += '<p><strong>主营产品/服务</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}
		}
		if(failStatus==='-2'){
			csc.useDialog(function(){
				artDialog({
					id:'errorTip',
					title:false,
					content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2>'+msg,
					fixed: true,
					lock:true,
					width:380,
					padding:'25px 50px 25px 25px',
					opacity:0,
					icon:'mem-n',
					ok:function(){},
					close:function(){
						$("input[name='"+a[0]+"']").focus();//默认第一个设置焦点
					}
				});
			});
		}
	}

});