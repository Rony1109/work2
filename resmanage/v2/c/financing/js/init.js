define(function(require, exports, module) {
    seajs.use('http://resmanage.csc86.com/v2/c/financing/css/style.css')
    require('page').init();
    var dialog = require('v2/m/dialog/js/init'),
        Operate = require('v2/c/common/js/operate');

    $("input.selectall").click(function() {
        var checkBoxs = $(".g-list input:checkbox");
        checkBoxs.prop("checked", checkBoxs.prop("checked"));
    });

    //获取拒绝理由
    var refuseReason = (function() {
        var tmp;
        $.ajax({
            type: "GET",
            async: false,
            dataType: "json",
            url: "finance.getRefuseReasonList",
            success: function(data) {
                tmp = data;
            }
        });
        return Operate.getref_html(tmp);
    })();

    //单个操作（通过、拒绝）
    $(".g-list").delegate('a[data-operate]', 'click', function(event) {
        var othis = $(this),
            operate = othis.data('operate'),
            ids = othis.parents("tr").find("input").val();
        switch (operate) {
            case "adopt":
                Operate.adopt(othis, ids, 1);
                break;
            case "unadopt":
                Operate.refuseMore(othis, ids, refuseReason, 2);
                break;
            default:
                ;
        }
    });

    //多个操作（通过、拒绝）
    $(".operation").delegate('.opreate-all', 'click', function(event) {
        var othis = $(this),
            operate = othis.data('operate'),
            checked = $(".g-list :checked"),
            ids = checked.map(function() {
                return this.value;
            }).get().join(',');
        if (checked.length) {
            switch (operate) {
                case "opOK":
                case "toBy":
                    Operate.adopt(othis, ids, 2);
                    break;
                case "opRefuse":
                case "toNotby" :
                    Operate.refuseMore(othis, ids, refuseReason, 2);
                    break;
                default:
                    ;
            }
        } else {
            dialog.tip("请选择数据后操作");
        }
    });

    $(document).delegate('.ly-d-art p input', 'click', function(event) {
        var othis = $(this).get(0);
        Operate.selVal(othis);
    });

    $(".operatebtns").delegate('a','click', function(event) {
    	var othis = $(this),operate = othis.data('operate');
    	switch(operate){
    		case "adopt" :
    		dialog.tip("需要标示是哪个页面：（“待审核”，“已通过”，“未通过”）");
    		case "refuse" :
    		dialog.tip("需要标示是哪个页面：（“待审核”，“已通过”，“未通过”）");

    	}
    });
});
