define(function(require, exports, module) {
	require('WdatePicker');
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
            url: "matchmaker.getrefuseReason",
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
                Operate.adopt(othis, "matchmaker.adopt", ids, "1");
                break;
            case "unadopt":
                Operate.refuseMore(othis, "matchmaker.notAdopt", ids, refuseReason, "1");
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
                case "opOk":
                case "toAdopt":
                    Operate.adopt(othis, "matchmaker.batchAdopt", ids, "n");
                    break;
                case "opRefuse":
                case "toNotAdopt":
                    Operate.refuseMore(othis,"matchmaker.batchNotAdopt", ids, refuseReason, "n");
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


    //详情页
    $(document).delegate('.operatebtns a','click', function(event) {
        var
        status = $(".operatebtns").data("status"),
        currentId = $("#currentId").val(),
        _next = $("#next"),
        nextId = _next.val(),
        line = _next.data("line"),
        page = _next.data("page"),
        href;

    	var othis = $(this),operate = othis.data('operate');
    	switch(operate){

            //通过
    		case "adopt" :
                if(status == 'N'){
                    href = "matchmaker.waitMatchmaker";
                }else if(status == 'R'){
                    href = "matchmaker.notadoptMatchmaker";
                }
                Operate.adopt(othis, "matchmaker.adopt", currentId, "1" ,href);
                break;

            //拒绝
    		case "refuse" :
                if(status == 'N'){
                    href = "matchmaker.waitMatchmaker";
                }else if(status == 'Y'){
                    href = "matchmaker.adoptMatchmaker";
                }
                Operate.refuseMore(othis, "matchmaker.notAdopt", currentId, refuseReason, "1", href);
                break;

            //返回
            // case "back" :
            //     window.history.back(-1);
            //     break;

            //下一条
            // case "next" :
            //     var 
            //     url = location.href.split('?')[0],
            //     para = {"inquiryId":nextId,"line":line,"page":page,"status":status};
            //     $.get(url,para,function(data){
            //         $(".details").html($(".details").html(),data);
            //     });
            //     break;
            default :
            ;
    	}
    });
});