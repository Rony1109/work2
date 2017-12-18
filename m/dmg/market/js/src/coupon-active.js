define(function(require, exports, module) {
    (function(){
        var dialog=require('layer');//弹框插件
        var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');//加载登录接口
        $.debug=false;
        var hostmap=seajs.hostmap;//域名配置
        var tips = function(tip) {//提示
            dialog.open({
                content:tip
                ,skin: 'msg'
                ,time:2 //2秒后自动关闭
            });
            return false;
        }
        function _draw_page(){//渲染页面函数
            if($.debug||isLogin.status){
                $.ajax({
                    url:"//"+hostmap.test+"/coupon/myCoupon",
                    type:"get",
                    contentType:"application/json; charset=utf-8",
                    dataType:"jsonp",
                    data:{"memberId":isLogin.data.id},
                    success: function (data) {
                        $("#_waiting_load").hide();
                        if(data.status==200){
                            $(".active-btn").on("click",active_coupon);
                            if(data.data.couponList.length>0){
                                var str="";
                                for(var i=0;i<data.data.couponList.length;i++){
                                    str+=
                                        '<div class="sh_separate20"></div>\
                                         <div class="sh_margin_a sh_width_92 sh_bor_a ">\
                                            <ul class="sh_bg_color_1 coupon-bg clearfix">\
                                                <li class="sh_pd_top20 sh_pd_bottom20 sh_margin_a sh_width_11">\
                                                    <h1 class="sh_font_sz44 sh_font_color25 sh_pd_top10 sh_pd_bottom10 sh_lingheight_100">'+data.data.couponList[i].couponRange+'</h1>\
                                                    <div class="sh_pd_top10 sh_pd_bottom10 sh_font_sz24 li-ht26 sh_font_color6">使用平台：<span>'+data.data.couponList[i].platform+'</span></div>\
                                                    <div class="sh_pd_top10 sh_pd_bottom10 sh_font_sz24 li-ht26 sh_font_color6">使用范围：<span>'+data.data.couponList[i].catnames+'</span></div>\
                                                </li>\
                                            </ul>\
                                            <div class="sh_pd_top20 sh_pd_bottom20 sh_font_sz24 sh_lingheight_100 sh_font_color7 sh_bg_color_16">\
                                                <div class="sh_margin_a sh_width_11 sh_ellipsis">使用时间：<span>'+data.data.couponList[i].startTime+'</span><span>至</span><span>'+data.data.couponList[i].endTime+'</span></div>\
                                            </div>\
                                         </div>'
                                }
                                $("article").html(str);

                            }else{
                                //信息框
                                dialog.open({
                                    type: 2,
                                    content:"<label class='sh_font_sz34 sh_font_color8 li-ht42'>暂无可用优惠券... </label>",
                                    time:2
                                });
                            }

                        }else if(data.status==201){
                            tips("<label class='sh_font_sz32'>未登录,2秒后跳转到登录界面....</label>");
                            window.location.href="//res.csc86.com/v3/dmg/market/html/login.html";
                        }else if(data.status==500){
                            tips("<label class='sh_font_sz32'>系统异常...</label>");
                        }
                    },
                    error: function (xhr, type) {
                        tips("<label class='sh_font_sz32'>系统异常...</label>");
                    }
                })
            }
        }
        _draw_page();
        function active_coupon(){
            //询问框
            dialog.open({
                content: "<div class='sh_pd_top10 sh_pd_bottom10 sh_lingheight_100'><label class='sh_font_sz32 sh_margin_r_3 sh_di_inblock sh_lingheight_100' style='width: 20%'>券号：</label><input type='text' class='sh_bor_a_2 sh_pr_hg60  sh_font_sz32 coupon_num sh_di_inblock' style='border:1px solid #e0e0e0;border-radius:0.06rem;width: 70% ' placeholder='请输入优惠券号'/></div><div class='sh_pd_top10 sh_pd_bottom10 sh_lingheight_100'><label class='sh_font_sz32 sh_margin_r_3 sh_di_inblock sh_lingheight_100' style='width:20%'>密码：</label><input type='password' style='border:1px solid #e0e0e0;border-radius:0.06rem;width: 70%' class='sh_bor_a_2 sh_pr_hg60 sh_font_sz32 coupon_psd sh_di_inblock' placeholder='无密码可不填写' /></div>",
                btn: ['确认', '取消'],
                yes: function(){
                    var $num= $.trim($(".coupon_num").val()),$psd= $.trim($(".coupon_psd").val()),flag=true;
                    if (!$num) {
                        $(".coupon_num").attr('placeholder',"请输入优惠券号");
                        flag=false;
                        return
                    }else {
                        flag=true;
                    }
                    if(!flag){
                        return false;
                    }
                    if(flag){
                        if($.debug||isLogin.status){
                            $.ajax({
                                url:"//"+hostmap.test+"/coupon/activeCoupon",
                                type:"get",
                                data:{"memberId":isLogin.data.id,"user":isLogin.data.username,"couponNum":$num,"password":$psd},
                                dataType:"jsonp",
                                success: function (data) {
                                    switch (data.status){
                                        case "200" :
                                            tips("<label class='sh_font_sz32'>成功...</label>");
                                            setTimeout(function(){
                                                location.reload();
                                            },2000);
                                            break;
                                        case "201" :
                                            tips("<label class='sh_font_sz32'>未登录,2秒后跳转到登录界面...</label>");
                                            window.location.href="//res.csc86.com/v3/shopping_center/market/html/login.html";
                                            break;
                                        case "202" :
                                            $(".coupon_num").attr('placeholder',"请输入优惠券号");
                                            break;
                                        case "203" :
                                            tips("<label class='sh_font_sz32'>优惠券密码不能为空！</label>");
                                            break;
                                        case "204" :
                                            tips("<label class='sh_font_sz32'>无效优惠券号，请检查是否填写有误！</label>");
                                            break;
                                        case "205" :
                                            tips("<label class='sh_font_sz32'>密码输入错误...</label>");
                                            break;
                                        case "206" :
                                            tips("<label class='sh_font_sz32'>此优惠券已过期，激活失败！</label>");
                                            break;
                                        case "207" :
                                            tips("<label class='sh_font_sz32'>此优惠券无效，激活失败！</label>");
                                            break;
                                        case "500" :
                                            tips("<label class='sh_font_sz32'>激活优惠券出错！</label>");
                                            break;
                                    }
                                },
                                error: function (xhr, type) {
                                    tips("<label class='sh_font_sz32'>激活优惠券出错！</label>");
                                }
                            })
                        }else{
                            window.location.href="//res.csc86.com/v3/shopping_center/market/html/login.html";
                        }

                    }
                },
                no: function(){
                    layer.close();
                },
                style: 'border:none; background-color:fff; color:black;',
                anim:'up'
            });
        }
    })()
})
