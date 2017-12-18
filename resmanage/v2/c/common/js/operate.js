define(function(require, exports, module) {
    var dialog = require('v2/m/dialog/js/init');

    //列表审核通过
    module.exports.adopt = function(obj,url,ids,status,href){        
        var othis = $(obj),
            that = this,
            ids = $.isArray(ids) ? ids.join(',') : ids,
            para,
            obj = {},
            href = href || '';
        switch(status){
            case "1" :
                para = "id";
                break;
            case "n" :
                para = "idList";
                break;
            default :
                ;
        }
        obj[para] = ids;
        $.post(url,obj,function (data){
            if(href !== ''){
                that.aReturn2(data, "操作成功！", "操作失败！",href);
            }else{
                that.aReturn(data, "操作成功！", "操作失败！");
            }
        });
    }
    
    module.exports.getref_html = function(res) {
        var html;
        html = '<div class="ly-d-art"><p>请选择或输入拒绝理由:</p>';
        for (i = 0; i < res.length; i++) {
            html += '<p><input type="checkbox" name="refuse_reason" value="' + res[i] + '">' + (i + 1) + '、' + res[i] + '</p>'
        }
        html += '</div>';
        html += '<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';
        return html;
    };

    module.exports.aReturn2 = function(tmp, po, pt, href) {
        if (tmp >= 1) {
            dialog.success(po,1.5);
            setTimeout(function() {
                window.location = href;
            }, 1500);
        }else{
            dialog.tip(pt,1.5);
        }
    }

    module.exports.aReturn = function(tmp, po, pt) {
        if (tmp >= 1) {
            dialog.success(po,1.5);
            setTimeout(function() {
                window.location.reload();
            }, 1500);
        }else{
            dialog.tip(pt,1.5);
        }
    }

    //验证拒绝理由选框
    module.exports.verifyReason = function(text, id) {
        if (text.length == 0) {
            this.aReturn(0, "", "请选择或输入理由");
            return false;
        } else if (text.length <= 5) {
            this.aReturn(0, "", "理由少于5个字符");
            return false;
        }
        var id = id || "#testVal",
            $id = $(id);
        if (this.maxLength(text)) {
            $id.next("p.error-msg").remove();
            return true;
        } else {
            $id.next().is("p.error-msg") ? '' : $id.after('<p class="error-msg" style="position:absolute;margin-top:-2px;color:#f00">输入了超过2000个字符数限制</p>');
            return false;
        };
    }

    //添充拒绝理由
    module.exports.selVal = function(tmp) {
        $(".test-focus").find(".test-lay").remove();
        var ly = $("#testVal").val(),
            addstr = tmp.value.replace(/[\.,;!。，；！、]\s*$/, "");
        if ($(tmp).prop("checked")) {
            if ($.trim(ly) != "" && !(/[；。！，!,\.;!]\s*$/ig.test(ly))) {
                ly += "；";
            }
            ly += addstr;
            if (!/[；。！，!,\.;!]\s*$/ig.test(addstr)) {
                ly += "；";
            }
        } else { //删除己选的拒绝理由(tmp为checkbox时有效);
            var reg = new RegExp($.trim(addstr) + "(\s*；\s*)*");
            ly = ly.replace(reg, "");
        }
        $("#testVal").val(ly);
    }

    module.exports.maxLength = function(text, num) {
        var num = num || 2000;
        return text.length <= num ? true : false;
    }

    //列表拒绝
    module.exports.refuseMore = function(obj,url,ids,refuseReason,status,href) {
        var
        that = this,
        ids = $.isArray(ids) ? ids.join(',') : ids,
        para,
        obj = {},
        href = href || '';
        switch(status){
            case "1" :
                para = "id";
                break;
            case "n" :
                para = "idList";
                break;
            default :
                ;
        }
        obj[para] = ids;
        dialog({
            title: "拒绝理由",
            content: refuseReason,
            fixed: true,
            okVal: '保存',
            background: "#000",
            opacity: "0.3",
            ok: function() {
                var textVal = document.getElementById("testVal").value;
                obj["refuseReason"] = textVal;
                if (that.verifyReason(textVal, "#testVal")) {
                    $.post(url,obj, function(data) {
                        if(href !== ''){
                            that.aReturn2(data, "操作成功！", "操作失败！",href);
                        }else{
                            that.aReturn(data, "操作成功！", "操作失败！");
                        }
                    });
                } else {
                    return false;
                }
            },
            init: function() {
                $(".test-focus").click(function() {
                    $(this).children(".test-lay").remove();
                });
            },
            cancel: true,
            lock: true
        });
    }
});
