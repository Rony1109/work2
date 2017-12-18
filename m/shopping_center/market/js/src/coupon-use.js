/**
 * Created by Administrator on 2016/9/23.
 */

define(function(require, exports, module) {
    (function(){
        var dialog=require('layer');//弹框插件
        var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');//加载登录接口
        var local_st=require('//res.csc86.com/f=v3/shopping_center/market/js/src/pro_de_intrLstorage');//加载本地存储
        var pageId=require('./url_express')(window.location.href).params.pageId;//获取url参数
        var token=require('./url_express')(window.location.href).params.token;//获取url参数
        var tips=function(ele){//消息提示函数
            dialog.open({
                content:ele
                ,skin: 'msg'
                ,time:2 //2秒后自动关闭
            });
        }
        $.debug=true;
        var hostmap=seajs.hostmap;//域名配置
        function _use_couponAjax(url,type,id,token,productIds){ //点击优惠券使用按钮调用ajax函数
            var params;
            switch (type){
                case "1" :
                    params={"tooken":token,"couponId":id,"type":"quick"};
                    break;
                case "2" :
                    params={"tooken":token,"couponId":id,"type":"car","cuproduct":productIds};
                    break;
                default:
                    params=null;//从购物车进来页面使用优惠券
                    break;
            }
            $.ajax({
                url:url,
                type:"get",
                contentType:"application/json; charset=utf-8",
                dataType:"jsonp",
                data:params,
                success: function (data) {
                    if(data.status=="100"){
                        window.location.href='//res.csc86.com/v3/shopping_center/market/html/con_order.html?pageId='+type+'&token='+token;
                    }else {
                        tips("<label class='sh_font_sz32'>"+data.msg+"</label>")
                    }
                }
            })
        }
        function _draw_page(type){ //渲染优惠券页面调用ajax函数
            if($.debug||isLogin.status){
                var parms,url,arr=[];
                switch (type){
                    case "1" :
                        parms=local_st.get("argument");
                        arr.push(parms);
                        url="//"+hostmap.test+"/order/getAvaCoupons?data=["+arr+"]"
                        break;
                    default :
                        parms=local_st.get("cart-argument");
                        url="//"+hostmap.test+"/order/getAvaCoupons?data="+parms;
                        break;
                }
                $.ajax({
                    url:url,
                    type:"get",
                    contentType:"application/json; charset=utf-8",
                    dataType:"jsonp",
                    success: function (data) {
                        $("#_waiting_load").css("display","none");
                        if(data.status==100){
                            if(data.data.getAvaCoupons.length>0){
                                var str="";
                                for(var i= 0,len=data.data.getAvaCoupons.length;i<len;i++){
                                    str+=
                                        "<div class='sh_separate20'></div>"+
                                        "<div class='sh_margin_a sh_width_92 sh_bor_a  coupon-list'>"+
                                        "<ul class='sh_bg_color_1 coupon-bg clearfix'>"+
                                        "<li class='sh_pd_top20 sh_pd_bottom20 sh_margin_a sh_width_92 sh_float_l sh_width_8'>"+
                                        "<div class='sh_width_10  sh_margin_a'>"+
                                        "<h1 class='sh_font_sz44 sh_font_color25 sh_pd_top10 sh_pd_bottom10 sh_lingheight_100'>"+data.data.getAvaCoupons[i].couponRange+"</h1>"+
                                        "<div class='sh_pd_top10 sh_pd_bottom10 sh_font_sz24 li-ht26 sh_font_color6'>使用平台：<span>"+data.data.getAvaCoupons[i].platform+"</span></div>"+
                                        "<div class='sh_pd_top10 sh_pd_bottom10 sh_font_sz24 li-ht26 sh_font_color6'>使用范围：<span>"+data.data.getAvaCoupons[i].catnames+"</span></div>"+
                                        "</div>"+
                                        "</li>"+
                                        "<li class='sh_float_l sh_width_4 sh_pd_top90'>"+
                                        "<img src='//res.csc86.com/v3/shopping_center/market/demo/use-btn.png' alt='' class='use-btn' data-id='"+data.data.getAvaCoupons[i].id+"' data-aid='"+data.data.getAvaCoupons[i].productIds+"'/>"+
                                        "</li>"+
                                        "</ul>"+
                                        "<div class='sh_pd_top20 sh_pd_bottom20 sh_font_sz24 sh_lingheight_100 sh_font_color7 sh_bg_color_16'>"+
                                        "<div class='sh_margin_a sh_width_11 sh_pd_left14 sh_ellipsis'>使用时间<span>"+data.data.getAvaCoupons[i].startTime+"</span><span>至</span><span>"+data.data.getAvaCoupons[i].endTime+"</span></div>"+
                                        "</div>"+
                                        "</div>"
                                }
                                $("article").html(str);
                                $(".use-btn").on('click',function(event){
                                    event.preventDefault();
                                    var coupon_id=$(this).data("id");
                                    var productIds=$(this).data("aid");
                                    _use_couponAjax('//'+hostmap.test+'/order/updateBuyOrderCouponInfo',pageId,coupon_id,token,productIds)
                                })
                            }else{
                                //信息框
                                dialog.open({
                                    type: 2,
                                    content:"<label class='sh_font_sz34 sh_font_color8 li-ht42'>您暂时还没有优惠券...</label>"
                                });
                            }
                        }else if(data.status==201){
                            tips("<label class='sh_font_sz32'>您还没有登录...</label>")
                        }else if(data.status==500){
                            tips("<label class='sh_font_sz32'>系统异常...</label>")
                        }else{
                            tips("<label class='sh_font_sz32'>"+data.msg+"</label>")
                        }
                    },
                    error: function (xhr, type) {
                        tips("<label class='sh_font_sz32'>系统异常...</label>")
                    }
                })
            }
        }
        _draw_page(pageId);


    })()
})
