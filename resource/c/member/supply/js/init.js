/**
 * 会员中心
 *
 */
define(function(require, exports, module) {
	require('c/member/common/js/sideNav');
	require("c/member/common/js/page");
	require("c/member/common/js/list");
	//日期
	require('l/My97DatePicker/4.8/buyoffer_WdatePicker');
	var dialog = require("m/dialog/js/init");

	$("ul.afp-option").delegate(">li.item>a", 'click', function() {
		var $t = $(this),
			msg;
		if (othis.checkedLength()) {
			var ids = [];
			$(".c>:checkbox:checked").each(function(i, v) {
				ids[i] = v.value;
			});
			msg = "确定要执行删除操作吗？";
			dialog.confirm(msg, function() {
				othis.ajaxDo(ids, "buyerDel");
			});
		} else {
			dialog.tip("请选中数据后操作");
		}
		return false;
	});

	$(".af-list").delegate("a.t-del", "click", function(event) {
		var
			othis = $(this),
			id = [],
			url,
			para;
		id[0] = othis.parents("tr").find("input").val();
		dialog.confirm("确定要删除吗？", function() {
			$.post("/inquiry/purchaser-delete", {
				ids: id
			}, function(data) {
				if (data.status) {
					dialog.success(data.msg);
					setTimeout(function() {
						location.reload();
					}, 2000);
				} else {
					dialog.alert(data.msg);
				}
			}, "json");
		});
		return false;
	});
	require('c/member/supply/js/tikuan');
});