/**
 * 商机订阅
 * 
 */
define(function(require, exports, module) {
    require('c/member/common/js/sideNav');
    require("c/member/common/js/page");
    require("c/member/common/js/list");
    require("./category").selectCate();
    var dialog = require("m/dialog/js/init");

    //同步
    module.exports.ajaxSync = function(url,para,fun){
        $.ajax({
            async: false,
            url: url,
            type: 'GET',
            dataType: 'json',
            data: para,
            success: fun
        });
    }
    var M = module.exports;

    //城市地区
    var getArea = require("m/jsM/area");
    var areaSelect = $("#areaSelected");
    if(areaSelect.length){
        var areaId = areaSelect.val().split(',');
        getArea.getArea("#province","#city",areaId[0],areaId[1]);
    }else{
        getArea.getArea("#province","#city","","");
    }
    
    //提示框
    $(".tips").delegate(".fold","click",function(event){
    	var _this = $(this);
    	if(_this.is(".unfold")){
    		_this.prev("p").show().end().removeClass("unfold");
    	}else{
    		_this.prev("p").hide().end().addClass("unfold");
    	}
    });

    //修改邮箱
    $(".modify_email").bind("click",function(){
        var 
        oldEmail = $(".s_info span").text(),
        uid = $(this).data("uid"),
        dom = '<div class="emailModify"><ul class="af-form"><li class="g-c-f aff-item"><div class="aff-key">新邮箱地址：</div><div class="aff-value"><input type="text" class="aff-text w150 newEmail"><input type="button" class="ml15 codebtn" value="获取验证码"></div></li><li class="g-c-f aff-item"><div class="aff-key">验证码：</div><div class="aff-value"><input type="text" class="aff-text w150 code"></div></li><li class="g-c-f aff-item"><div class="aff-key">&nbsp;</div><div class="aff-value"><span class="msgError"></span></div></li></ul></div>',
        status;
        dialog({
            title:'修改邮箱',
            content: dom,
            ok: function () {
                var code = $.trim($(".code").val());
                var newEmail = $(".newEmail").val();
                if(code === ''){
                    dialog.tip("验证码不能为空",1.5);
                    return false;
                }else{
                    M.ajaxSync("/inquiry/management/checkCode",{'code': code,'email':oldEmail},function(data){
                        if(!data[0].result){
                            status = false;
                            dialog.tip("验证失败，请确认验证码是否正确",1.5);
                        }else{
                            M.ajaxSync("/inquiry/management/updateEmail",{'memberId': uid,'newEmail':newEmail},function(data){
                                if(data[0].result){
                                    status = true;
                                    dialog.tip("邮箱修改成功！",3);
                                    $(".s_info span").html(newEmail);
                                }else{
                                    status = false;
                                    dialog.tip("邮箱修改失败!",2); 
                                }
                            });
                        }
                    });
                }
                return status;
            },
            cancelVal : '取消',
            cancel : true,
            lock : true
        });
    });

    //修改邮箱-获取验证码
    $("body").delegate(".codebtn","click",function(){
        var newEmail = $(".newEmail").val();
        if (!verifyEmail(newEmail)){
            dialog.tip("请填写正确的电子邮箱",1.5);
        }else{
            M.ajaxSync("/inquiry/management/sendCode",{"email":newEmail},function(data){
                if(data.code !== ''){
                    dialog.tip("验证码已发送到您的邮箱",2.5);
                }else{
                    dialog.tip("获取验证码失败",1.5);
                }
            });
        }
    });

    //退订
    $(".unsubscribe").bind("click",function(){
        var 
        email = $(".s_info span").text(),
        unSubscribe = function(){
            M.ajaxSync("/inquiry/management/unsubscribeEmail",{"email":email},function(data){
                if(data[0].result){
                    dialog.success(data[0].text,1.5);
					setTimeout(function(){window.location.reload();},1500);
                }else{
                    dialog.tip(data[0].text,1.5);
                }
            });
        },
        tip = '退订邮件有可能导致您无法及时收阅订阅信息，确定退订吗？';
        M.ajaxSync("/inquiry/management/judgeEmail",{"email":email},function(data){
            if(data == 0){
                dialog.tip("邮箱未绑定或者已退订",1.5);
            }else{
                dialog.confirm(tip,unSubscribe);
            }
        });
    });

    //Email禁用
    var email = $("input[name='email']"),
        verifyEmailBtn = email.next(),
        emailCheckBox = $("#emailCheck");
    emailCheckBox.bind("click",function(){
        emailCheckBox.is(":checked") ? email.prop("disabled",false) : email.prop("disabled",true);
    });

    function verifyEmail(email){
        return /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
    }

    function verifyKeywords(key){
        return /^[\u4e00-\u9fa5\/a-zA-Z]+$/.test(key);
    }

    //表单验证码
    verifyEmailBtn.bind("click",function(){
        if(emailCheckBox.is(":checked")){
            if (!verifyEmail(email.val())){
                dialog.tip("请填写正确的电子邮箱",1.5);
            }else{
                M.ajaxSync("/inquiry/management/sendCode",{"email":email.val()},function(data){
                    if(data.code !== ''){
                        dialog.tip("验证码已发送到您的邮箱",2.5);
                    }else{
                        dialog.tip("获取验证码失败",1.5);
                    }
                });
            }
        };
    });

    //表单提交
    $("form[name='rssform']").on("submit",function() {
        var
        businessType = $("input[name='businessType']:checked"),
        keyword = $.trim($("input[name='keyword']").val()),
        emailAddress = $.trim(email.val()),
        verifyCode = $.trim($("#verifyCode").val()),
        uid = $("#uid").val();
        var status;
        if(!businessType.length){
            dialog.tip("订阅商机类型不可为空",1.5);
            return false;
        }else if(keyword === ''){
            dialog.tip("产品关键字不可为空",1.5);
            return false;
        }
        if(keyword !== ''){
            if(!verifyKeywords(keyword)){
                dialog.tip("产品关键字不含特殊符号、数字",1.5);
                return false;
            }else{
                var oldKey = $("input[name='keyword']").data("key");
                if(keyword !== oldKey){
                    M.ajaxSync("/inquiry/management/judgeKeyword",{'keyword': keyword,'memberId':uid},function(data){
                        if(data != 0){
                            status = false;
                            dialog.tip("产品关键字有重复",1.5);
                        }
                    });
                }
            }
        }
        if(emailCheckBox.is(":checked")){
            if(verifyCode === ''){
                dialog.tip("验证码不可为空",1.5);
                return false;
            }else{
                M.ajaxSync("/inquiry/management/checkCode",{'code': verifyCode,'email':emailAddress},function(data){
                    if(!data[0].result){
                        status = false;
                        dialog.tip("验证失败，请确认验证码是否正确",1.5);
                    }
                });
            }
        }
        return status; 
    });
    
    //发布时间
    var timeSelected = $("#timeSelected");
    if(timeSelected.length){
        $("select[name='reTime']").find("option[value="+ timeSelected.val() +"]").prop("selected",true);
    }

    //新增订阅
    $(".rss_add,.rss_add2").bind("click",function(){
        var _this = $(this),
            type = _this.data("type"),
            num = _this.data("num");
        function _toSubscribe(){
            location.href = "subscribe";
        }
        switch(type){
            case "vip":
                num >= 8 ? dialog.tip("VIP会员最多可以订阅8个关键字") : _toSubscribe();
                break;
            case "cst":
                num >= 4 ? dialog.tip("成商通会员最多可以订阅4个关键字") : _toSubscribe();
                break;
            case "pt":
                num >= 2 ? dialog.tip("普通会员最多可以订阅2个关键字") : _toSubscribe();
                break;
            default :
                break;
        }
    });

    //全选删除
    $("ul.afp-option").delegate(">li.item>a", 'click', function() {
        var $t = $(this),msg;
            console.info(othis);
            if (othis.checkedLength()) {
                var ids = [];
                $(".c>:checkbox:checked").each(function(i, v) {
                    ids[i] = v.value;
                });
                msg = "删除后，数据将不可恢复，确定删除吗？";
                dialog.confirm(msg, function() {
                    othis.ajaxDo(ids, "delSubscribe");
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
            case "delSubscribe" :
            url = "/inquiry/management/remove";
            msg = "删除后，数据将不可恢复，确定删除吗？";
            break;
            default :
            ;
        }
        dialog.confirm(msg, function() {
            $.post(url,{"id":id},function (data){
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

