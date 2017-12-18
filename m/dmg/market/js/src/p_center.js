/**
 * Created by Administrator on 2016/10/10.
 */
define(function(require, exports, module) {
    var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');//加载登录接口
    var dialog=require('layer');//弹框插件
    $.debug=false;
    var hostmap=seajs.hostmap;//域名配置
    var tips = function(tip) {//提示
        dialog.open({
            content:tip
            ,skin: 'msg'
            ,time:2 //2秒后自动关闭
        });
        return false;
    };
    var p_center={
            p_center_jump:function(){
             function p_c_jump(c_ele,jump_pag){//个人中心点击各个按钮页面跳转函数
                     $(c_ele).on('click',function(event){
                         event.preventDefault();
                         if($.debug||isLogin.status){
                            window.location.href =jump_pag;
                         }else{
                             window.location.href="//res.csc86.com/v3/dmg/market/html/login.html"
                         }
                     });
             }
                p_c_jump(".p_center_str","//res.csc86.com/v3/dmg/market/html/p_collect.html");//我的收藏页面调整
                p_c_jump(".p_center_ord","//res.csc86.com/v3/dmg/market/html/p_order.html");//我的订单页面跳转
                p_c_jump(".p_center_addr","//res.csc86.com/v3/dmg/market/html/con_order_addrList.html");//地址管理页面跳转
                p_c_jump(".p_center_acc","//res.csc86.com/v3/dmg/market/html/p_centerAccSetting.html");//个人账户设置跳转
                p_c_jump(".p_center_coupon","//res.csc86.com/v3/dmg/market/html/coupon-active.html");//优惠券跳转
           function _isLogin_center(conele){ //是否登录banner渲染函数
               var res=
               "<div class='sh_pr_hg37_84'></div>"+
               "<div class='sh_clear  sh_margin_a sh_pr_hg18_92 sh_width_64'>"+
                   "<div class='sh_width_5 sh_float_l sh_te_align_r sh_lingheight_100 sh_font_sz0'>"+
                        "<input type='button' value='登录' class='sh_width_8 sh_lingheight_100 sh_font_sz30 sh_font_color8 sh_bg_color_6 sh_pd_bottom20 sh_pd_top20  sh_border_radius_5 p_center_login'/>"+
                   "</div>"+
                   "<div class='sh_width_5 sh_float_r sh_lingheight_100 sh_font_sz0'>"+
                        "<input type='button' value='注册' class='sh_width_8 sh_lingheight_100 sh_font_sz30 sh_font_color8 sh_bg_color_6 sh_pd_bottom20 sh_pd_top20  sh_border_radius_5 p_center_resg'/>"+
                   "</div>"+
               "</div>"+
               "<div class='sh_pr_hg43_24'></div>";
               if ($.debug||isLogin.status){
                   $.get("//"+hostmap.test+"/member/getUserInfo",{
                       }, function(data) {
                       var str="";
                       if(data.status==200){
                           if(data.hasOwnProperty('data')){
                               if(data.data.hasOwnProperty('userInfo')){
                                   str+=
                                       "<div class='sh_pr_hg18_92'></div>";
                                   if(data.data.userInfo.hasOwnProperty('imgUrl')&&!!data.data.userInfo.imgUrl){
                                       str+=
                                           "<div class='sh_te_align_c sh_pr_hg52_46'>"+
                                               "<div class='sh_te_align_c sh_margin_a sh_ellipsis sh_border_radius_50 sh_pr_hg162 sh_width_162 sh_bor_a_10'>"+
                                                    "<img src='http://img.csc86.com"+data.data.userInfo.imgUrl+"' alt='' class='pers_ctr_input sh_img_max'/>"+
                                               "</div>"+
                                           "</div>"
                                   }else{
                                       str+=
                                           "<div class='sh_te_align_c sh_pr_hg52_46'>"+
                                               "<div class='sh_te_align_c sh_margin_a sh_ellipsis sh_border_radius_50 sh_pr_hg162 sh_width_162 sh_bor_a_10'>"+
                                                    "<img src='//res.csc86.com/v3/shopping_center/market/demo/p_center_noImg.png' alt='' class='pers_ctr_input sh_img_max'/>"+
                                               "</div>"+
                                           "</div>"
                                   }
                                   if(isNaN(data.data.userInfo.userName)){
                                       str+="<div class='sh_te_align_c sh_font_color8 sh_wor_space sh_ellipsis sh_lingheight_100 sh_pr_hg28_62 sh_font_sz30'>"+data.data.userInfo.userName+"</div>";
                                   }else{
                                       str+="<div class='sh_te_align_c sh_font_color8 sh_wor_space sh_ellipsis sh_lingheight_100 sh_pr_hg28_62 sh_font_sz30'>"+"你好!"+"</div>";
                                   }
                                   $(conele).html(str);
                               }
                           }else{
                               str+=
                                   "<div class='sh_pr_hg18_92'></div>"+
                                   "<div class='sh_te_align_c sh_pr_hg52_46'>"+
                                       "<div class='sh_te_align_c sh_margin_a sh_ellipsis sh_border_radius_50 sh_pr_hg162 sh_width_162 sh_bor_a_10'>"+
                                             "<img src='//res.csc86.com/v3/shopping_center/market/demo/p_center_noImg.png' alt='' class='pers_ctr_input sh_img_max'/>"+
                                       "</div>"+
                                   "</div>";
                               if(isNaN(isLogin.data.username)){
                                   str+="<div class='sh_te_align_c sh_font_color8 sh_wor_space sh_ellipsis sh_lingheight_100 sh_pr_hg28_62 sh_font_sz30'>"+isLogin.data.username+"</div>";
                               }else{
                                   str+="<div class='sh_te_align_c sh_font_color8 sh_wor_space sh_ellipsis sh_lingheight_100 sh_pr_hg28_62 sh_font_sz30'>"+"你好!"+"</div>";
                               }
                               $(conele).html(str);
                           }
                       }

                   },"jsonp");
               }else{
                   $(conele).html(res);
                   $(".p_center_login").on("click", function (event) {
                           event.preventDefault();
                       window.location.href="//res.csc86.com/v3/dmg/market/html/login.html"
                      });
                   $(".p_center_resg").on('click',function(event){
                       event.preventDefault();
                       window.location.href="//res.csc86.com/v3/dmg/market/html/login_reg_acc.html"
                   })
               }
           }
            _isLogin_center(".pers_ctr_banner") ;

            },
        exist_login:function(){
            $(".exist_login").on('click', function (event){ //账户设置页面退出登录函数
                if($(this).hasClass("disabled")) return;
                $.get("//"+hostmap.test+"/member/signout",function(data) {
                    if(data.status==200){
                        $(".exist_login").addClass("disabled");
                        tips("<label class='sh_font_sz32'>退出登录成功</label>");
                        window.location.href="//res.csc86.com/v3/dmg/market/html/p_center.html"
                    }else{
                        tips("<label class='sh_font_sz32'>退出登录失败</label>");
                        $(".exist_login").removeClass("disabled")
                    }
                },"jsonp");
            })
        }
    };
    p_center.p_center_jump();
    p_center.exist_login();

});