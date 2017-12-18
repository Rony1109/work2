/**
 * 会员中心
 * 
 */
define(function(require, exports, module) {
	require('c/member/common/js/sideNav');
	require("c/member/common/js/page");
	require("c/member/common/js/list");
	require("l/My97DatePicker/4.8/WdatePicker");
	var dialog = require("m/dialog/js/init");

	$("ul.afp-option").delegate(">li.item>a", 'click', function() {
        var $t = $(this),msg,type = $("#type").val();
            if (othis.checkedLength()) {
                var ids = [];
                $(".c>:checkbox:checked").each(function(i, v) {
                    ids[i] = v.value;
                });
                msg = "确定要执行删除操作吗？";
                dialog.confirm(msg, function() {
                	if(location.href.indexOf("supplier-list") != -1){
 						othis.ajaxDo(ids, "supplyDel",type);
                	}else{
                		othis.ajaxDo(ids, "inquiryDel");
                	}
                });
            } else {
                dialog.tip("请选中数据后操作");
            }
        return false;
    });

    $(".af-list").delegate("a[data-operate]","click",function(event) {
		var 
			othis = $(this),
			operate = othis.data("operate"),
			id = [],
			url,
            para,
            msg;
            id[0] = othis.parents("tr").find("input").val();
		switch(operate){
			case "close" :
			url = "/inquiry/closequotation";
			msg = "确定要关闭吗？";
			break;
			default :
			;
		}
		dialog.confirm(msg, function() {
			$.post(url,{ids:id},function (data){
				if(data.status){
					dialog.success(data.msg);
					setTimeout(function(){
	                    location.reload();
	                },2000);
				}else{
					dialog.alert(data.msg);
				}
			},"json");
		});
		return false;
	});
});