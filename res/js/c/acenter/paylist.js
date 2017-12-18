// 账户中心 交易明细查询 JS by lg 2013.07.12
$(function() {
	verifyCheck('#startTime', '#endTime', '#check_paylist', '#checkList')
})

function verifyCheck(startime, endtime, form, subtn) {
		var startTime = startime,
			endTime = endtime,
			form = form,
			subBtn = subtn,
			s, e,
			tips = "<span class='ver-tips'><b class='erro_icon'></b>请选择查询日期</span>",
			tipsClass = $(tips).attr("class");
		$(subBtn).on("click", function() {
			s = $(startTime).val();
			e = $(endTime).val();
			if (s != "" && s != null && s != "undefined" && e != "" && e != null && e != "undefined") {
				$(form).submit();
			} else {
				$(endTime).next().remove("." + tipsClass);
				$(endTime).after(tips);
			}
		});
	}
	//console.log("sd");
$(function() {
	$(".uc-table").on("click", "a.cancel", function(e) {
		var $t = $(this);
		csc.useDialog(function() {
			artDialog({
				id: "memtool",
				content: '<div class="con_art"><em class="iocl"></em><span>您确定要取消此订单？</span><div class="art_btn"><a  class="y-btn m-t-20" id="btn_ajsq" href="javascript:"><em>确定</em></a><a id="canesl_t" onclick="closet()" href="javascript:" class="m-t-20 cncl-btn"><em>取消</em></a></div></div>',
				fixed: true,
				title: "温馨提醒",
				width: 400,
				height: 200,
				padding: "5px 19px 0 15px",
				init: function() {
					var uid = $t.data("oid");
					$("#btn_ajsq").click(function() {
						$.get("/account/cancelOrder.html", {
							"oid": uid
						}, function(data) {
							if (data.status) {
								closet("memtool");
								location.reload();
							}
						}, "jsonp");
					});
				}
			});
		});

		e.preventDefault();
	});


	var $f = $('#payform'),
		$d = $f.find('div.protocol'),
		$p = $d.find('input.J_protocol');
	$("#fr_sub").on('click', function() {
		if ($p.prop('checked') == false) {
			//console.log("dd");
			$d.addClass('protocol-error');
			return false;
		} else {
			var sid = $('input[name="sid"]').val(),
				itemId = $('input[name="itemId"]:checked').val(),
				cstcheck = $('input[name="cstcheck"]').val();
			$.post("serve.add.do", {
				"sid": sid,
				"itemId": itemId,
				"cstcheck": cstcheck
			}, function(data) {
				csc.useDialog(function(){
					if (data.status) {
						var url = data.url;
						location.href = url;
					} else {
						var url = data.url;
						if (url) {
							//console.log(data.msg)

							artDialog({
								id: "memtool",
								content: '<div class="con_art"><em class="iocl"></em><span>对不起，您还有未支付订单，请勿重复下单。</span></div><div class="art_btn"><a id="showOrder" class="y-btn m-l-80 m-t-20"><em>查看订单</em></a></div>',
								fixed: true,
								title: "温馨提醒",
								width: 400,
								height: 200,
								padding: "5px 19px 0 15px",
								init: function() {
									$("#showOrder").click(function() {
										closet();
										window.location.href = url;
									});
								}
							});
						} else {
							//console.log(data.msg)
							csc.alert(data.msg);
						}
						//$f.submit();
					}
				});
			}, "json");
		}
	});

	$p.on('change', function() {
		if (this.checked) {
			$d.removeClass('protocol-error');
		}
	});
});

function closet() {
	csc.useDialog(function () {
		// body...
		art.dialog({
			id: 'memtool'
		}).close();
	});
}