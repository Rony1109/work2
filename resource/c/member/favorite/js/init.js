/**
 * 会员中心
 * 
 */
define(function(require, exports, module) {
	require('c/member/common/js/sideNav');
	require("c/member/common/js/page");
	require("c/member/common/js/list");
	var dialog = require("m/dialog/js/init");

	$(".af-list").delegate("a[data-operate]","click",function(event) {
		var 
			othis = $(this),
			operate = othis.data("operate"),
			id = [],
			url,
            para;
            id[0] = othis.parents("tr").find("input").val();
		switch(operate){
			case "unfavorite" :
			url = "/user/deleteFavorites";
			break;
			default :
			;
		}
		dialog.confirm("确定要取消收藏吗？", function() {
			$.post(url,{favoriteIds:id},function (data){
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

	$("ul.afp-option").delegate(">li.item>a", 'click', function() {
        var $t = $(this),msg;        	
            if (othis.checkedLength()) {
                var ids = [];
                $(".c>:checkbox:checked").each(function(i, v) {
                    ids[i] = v.value;
                });
                msg = "确定要取消收藏吗？";
                dialog.confirm(msg, function() {
                    othis.ajaxDo(ids, "favorite");
                });
            } else {
                dialog.tip("请选中数据后操作");
            }
        return false;
    });

});