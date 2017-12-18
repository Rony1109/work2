define(function(require, exports, module) {
    require('c/member/common/js/sideNav');
	var dialog = require("m/dialog/js/init");

    module.exports.selectAll = function() {
        var
        $all = $("[name='all']"),
            $offerId = $(".c>:checkbox");
        $all.on("change", function() {
            var prop = $(this).prop("checked");
            $all.prop("checked", prop);
            $offerId.prop("checked", prop);
        });
        $offerId.on("change", function() {
            $offerId.filter(":not(:checked)").length ? $all.prop("checked", false) : $all.prop("checked", true);
        });
        return this;
    };

    module.exports.checkedLength = function() {
        return $(".c>:checkbox:checked").length;
    };
           
    module.exports.ajaxDo = function (ids, type, tabStatus){
		var	othis = this,
			ids = $.isArray(ids) ? ids : [ids],
			url,
            para,
            obj = {},
            tabStatus = tabStatus || '';
		switch(type){
			case "inquiryDel":
			url = "/inquiry/deleteproducts";
            para = "ids";
            break;
            case "favorite":
            url = "/user/deleteFavorites";
            para = "favoriteIds";
			break;
            case "delSubscribe":
            url = "/inquiry/management/remove";
            para = "id";
            break;
            case "buyerDel":
            url = "/inquiry/purchaser-delete";
            para = "ids";
            break;
            case "supplyDel":
            url = "/inquiry/supplier-delete";
            para = "ids";
            obj['type'] = tabStatus;
            break;
			default:
			;
		}
        obj[para] = ids;
        $.ajax({
            type : "POST",
            url : url,
            data : obj,
            success : function(data){
                if(data.status){
                    dialog.success(data.msg);
                    setTimeout(function(){
                        location.reload();
                    },2000);
                }else{
                    dialog.alert(data.msg);
                }
            },
            dataType : "json"
        });
	};

	othis = module.exports;
    othis.selectAll();
});
