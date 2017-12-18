 $(function() {
 	setInterval(function() {
 		$.get("/ajax/Referer");
 	}, 50000);
 	//常用地址选择
 	//全选（全国）
 	var lall = $("#select input[type=checkbox]").length;
 	$("#all-adr").click(function() {
 		var chk = $(this)[0].checked,
 			sele = $("#chkadress");
 		if (chk) {
 			$("#ye-adress input:checkbox").attr("checked", chk);
 			sele.html("<span>全国</span>");
 		} else {
 			$("#ye-adress input:checkbox").attr("checked", false);
 			sele.html("");
 		}
 	});
 	//选择区域
 	$("#area input[type=checkbox]:not(:first)").change(function() {
 		var fl = $(this).prop("checked");
 		var flag = true;
 		var value = $.trim($(this).parent().text());
 		var lall = $("#area input:not(:first)").length;
 		var selectchk = $("#area input[type=checkbox]:not(:first):checked").length;
 		var emtxt = $("#select em").each(function(index, element) {
 			if ($.trim($(this).text()) == value) {
 				$(this).next().find(":input").prop("checked", fl);
 			}
 		})
 		if (selectchk == lall) {
 			$("#chkadress").html("<span>全国</span>");
 			$("#all-adr").prop("checked", true);
 			return;
 		} else {
 			$("#chkadress").find("span:contains('全国')").remove();
 			$("#all-adr").prop("checked", false);

 			$("#area input:checked").parent().each(function() {
 				var l = $("#chkadress span:contains(" + $.trim($(this).text() + ")")).length;
 				if (!l) {
 					$("<span>" + $(this).text() + "</span>").appendTo("#chkadress");
 				}
 			});
 		}
 		if (fl) {
 			$("#chkadress").children().each(function() {
 				if ($.trim($(this).text()) == value) {
 					flag = false;
 				}
 			});
 			if (flag) {
 				$("<span>" + value + "</span>").appendTo("#chkadress");
 			}
 		} else {
 			$("#chkadress span").each(function(index, element) {
 				if ($.trim($(this).text()) == value) {
 					$(this).remove();
 				}
 			});
 		}
 	});

 	//选择省
 	$("#select input[type=checkbox]").change(function() {
 		var $this = $(this),
 			flag = true,
 			check = $(this).attr("checked"),
 			id = $this.attr("id"),
 			value = $.trim($this.parent().text());
 		var selectchk = $("#select input[type=checkbox]:checked").length;
 		var sibchk = $this.parents("span").find("input[type=checkbox]").length;
 		var selesibchk = $this.parents("span").find("input[type=checkbox]:checked").length;
 		var emtxt = $.trim($this.parents("span").prev().text());
 		if (selectchk == lall) {
 			$("#chkadress").html("<span>全国</span>");
 			$("#area input[type=checkbox]").prop("checked", true);
 			return;
 		} else {
 			$("#all-adr").prop("checked", false);
 		}
 		if (sibchk == selesibchk) {
 			var arr = $this.parents("span").find("input[type=checkbox]:checked").parent();
 			$("#chkadress").children("span").each(function() {
 				var $this = $(this);
 				var text = $.trim($(this).text());
 				arr.each(function() {
 					if (text == $.trim($(this).text())) {
 						$this.remove();
 					}
 				});
 			});
 			$("#chkadress").children().each(function() {
 				if ($.trim($(this).text()) == emtxt) {
 					flag = false;
 				}
 			});
 			$("#area label:contains(" + emtxt + ")").children("input").prop("checked", true);
 			if (flag) {
 				$("<span>" + emtxt + "</span>").appendTo("#chkadress");
 			}
 			return;
 		} else {
 			$("#area label:contains(" + emtxt + ")").children("input").prop("checked", false);
 		}

 		if (check) {
 			$("<span>" + value + "</span>").appendTo("#chkadress");
 		} else {
 			$("#chkadress span:contains(" + emtxt + ")").remove();
 			$("#chkadress span:contains('全国')").remove();
 			$("#area label input:checked").parent().each(function() {
 				var l = $("#chkadress span:contains(" + $.trim($(this).text()) + ")").length;
 				if (!l) {
 					$("<span>" + $.trim($(this).text()) + "</span>").appendTo("#chkadress");
 				}
 			});
 			$this.parent().siblings().children(":checked").each(function() {
 				var l = $("#chkadress span:contains(" + $.trim($(this).parent().text()) + ")").length;
 				if (!l) {
 					$("<span>" + $.trim($(this).parent().text()) + "</span>").appendTo("#chkadress");
 				}
 			});
 			$("#chkadress").children("span").each(function() {
 				var text = $.trim($(this).text());
 				if (text == value) {
 					$(this).remove();
 				}
 			});
 		}
 	});
 	$("#chkadress span").live("click", function() {
 		var txt = $.trim($(this).text());
 		var areal = $("#area label:contains('" + txt + "')");
 		if (txt == "全国") {
 			$("#ye-adress input:checkbox").attr("checked", false);
 		}
 		if (areal.length > 0) {
 			areal.find(":input").attr("checked", false);
 			$("#select em:contains('" + $.trim(txt) + "')").next().find(":input").attr("checked", false);
 		} else {
 			var l = $("#select span label:contains('" + txt + "')").find(":input").attr("checked", false);
 		}
 		$(this).remove();
 	});

 	//旺铺类型
 	$("select[name='shopType']").on('change', function() {
 		var parameters = $(this).val();
 		var $this = $(this);
 		$.get('//api.csc86.com/member/getShopType.html?shopType=' + parameters, function(data) {

 			if (data['data'] != null) {
 				var data = data['data'];
 				var sOption = '';
 				for (var i = 0; i < data.length; i++) {
 					sOption += '<option value="' + data[i]['countryCode'] + '::' + data[i]['countryName'] + '">' + data[i]['countryName'] + '</option>'
 				}
 				$this.after('<select name="country" style="margin-left:10px;width:200px;">' + sOption + '</select>');

 			} else {
 				$("select[name='country']").remove();
 			}
 		}, 'jsonp');
 	})
 })