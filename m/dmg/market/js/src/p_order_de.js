/**
 * Created by Administrator on 2016/10/12.
 */
define(function (require, exports, module) {
    var hostmap=seajs.hostmap;//域名配置
    var deurlid=require('./url_express')(window.location.href).params.id;
    var isLogin_stu = require('//api.csc86.com/notify/count/all/?callback=define'); //判断是否登录
    var deporder = {
        list:function(){
        if (isLogin_stu.status){
            $.ajax({
                url: '//'+hostmap.test+'/order/orderDetail',
                data: {orderNo:deurlid},
                type: "post",
                dataType: 'jsonp',
                success: function (data) {
                    $("#_waiting_load").hide();
                    if(data.status==100){
                        var str="";
                        var result=null;
                        var imgurl = 'http://img.csc86.com/';
                        var len=data.data.orderDetail.details.length;
                        str+="<div class='sh_clear  sh_box-sizing_C sh_bor_bottom_1 sh_pd_top40 sh_pd_bottom40 sh_bg_color_1'>"+
                        "<div class='sh_width_92 sh_margin_a pers_order_detail orderde-bgdetail'>"+
                        "<div class='sh_width_10 sh_margin_a sh_font_color6 sh_font_sz28'>"+
                        "<div class='sh_width_5 sh_float_l sh_lingheight_100'>"+data.data.orderDetail.receiverName+"</div>"+
                        "<div class=' sh_width_7 sh_float_l sh_te_align_c sh_lingheight_100'>"+data.data.orderDetail.receiverMobile+"</div>"+
                        "<div class='sh_clear_sp'></div>"+
                        "<span class='sh_clear sh_width_12 sh_font_sz24 sh_font_color5 sh_di_block sh_pd_top10 sh_lingheight_40'>"+ data.data.orderDetail.address+
                        "</span>"+
                        "</div>"+
                        "</div>"+
                        "</div>"+
                        "<div class='sh_separate20 sh_bg_color_3'></div>"+
                        "<div class='sh_clear   line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color13 sh_bg_color_1'>"+
                        "<div class='sh_width_92 sh_margin_a sh_font_sz24  sh_lingheight_100  sh_ellipsis'>"+
                        "订单编号："+"<em class='sh_font_color5'>"+data.data.orderDetail.orderId+"</em>"+
                        "</div>"+
                        "</div>"+
                        "<div class='sh_separate20 sh_bg_color_3'></div>"+
                        "<div class='sh_clear   line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color13 sh_bg_color_1'>"+
                        "<div class='sh_width_92 sh_margin_a sh_font_sz24  sh_lingheight_100  sh_ellipsis'>"+
                        "订单状态："+"<em class='sh_font_color5'>";
                        switch (data.data.orderDetail.status){
                            case 1 :
                                result = "待付款";
                                break;
                            case 2 :
                                result = "待发货";
                                break;
                            case 3 :
                                result = "交易完成";
                                break;
                            case 5 :
                                result = "已取消";
                                break;
                            case 15 :
                                result = "待收货";
                                break;
                            default:
                                result = "无状态";
                                break;
                        }
                        str+=""+result+""+ "</em>"+
                        "</div>"+
                        "</div>"+
                        "<div class='sh_separate20 sh_bg_color_3'></div>"+
                        "<div class='sh_clear   line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color5 sh_bg_color_1'>"+
                        "<div class='sh_width_92 sh_margin_a  '>"+
                        "<div  class='sh_margin_a sh_width_9 sh_float_l sh_lingheight_100 sh_font_sz26'>"+"订单商品"+"</div>"+
                        "<div  class='sh_width_3 sh_float_l sh_te_align_r  sh_lingheight_100  sh_font_sz24'>"+"共&nbsp;"+"<em class='sh_font_color2'>"+data.data.orderDetail.totalNumber+"</em>&nbsp;件</div>"+
                        "</div>"+
                        "</div>"+
                        "<div class='sh_clear   line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top20 sh_pd_bottom20  sh_font_color5 sh_bg_color_1'>"+
                        "<div class='sh_margin_a  sh_width_92 sh_font_sz24'>"+ data.data.orderDetail.shopName+"</div>"+
                        "</div>";
                        str+="<div class=' sh_bg_color_1'>";
                        for(var i=0;i<len;i++){
                            str+="<div class='sh_clear  sh_pr_hg198 sh_pd_top13  sh_pd_bottom13 sh_bor_bottom_1 sh_bg_color_1'>"+
                            "<div class='sh_width_92 sh_margin_a  sh_clear'>"+
                            "<div class='sh_width_4 sh_float_l sh_lingheight_100 sh_pr_hg198 sh_font_sz0'>"+
                            "<a href='http://m.csc86.com/dmg/product/"+data.data.orderDetail.details[i].productId+"' target='_blank' >"+
                            "<img src='"+imgurl+data.data.orderDetail.details[i].mainPicture+"' class='save_store_img' alt=''/>"+
                            "</a>"+
                            "</div>"+
                            "<div class='sh_float_l sh_font_sz24 sh_width_8'>"+
                            "<div>"+"<a href='http://m.csc86.com/dmg/product/"+data.data.orderDetail.details[i].productId+"' target='_blank' class='sh_font_color5'>"+ data.data.orderDetail.details[i].productName+"</a>"+"</div>"+
                            "<div class='sh_pd_top20 sh_font_color13'>"+ data.data.orderDetail.details[i].other+"</div>"+
                            "<div  class='sh_pd_top20 sh_font_color13'>"+
                            "<span class='display:block sh_float_l '>数量：<em>"+data.data.orderDetail.details[i].number+"</em></span>"+
                            "<span class='display:block sh_float_r '>单价：<em class='sh_font_color2'>￥</em><em class='sh_font_color2'>"+data.data.orderDetail.details[i].price+"</em></span>"+
                            "</div>"+
                            "</div>"+
                            "</div>"+
                            "</div>" +
                            "<div class='sh_clear   line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top20 sh_pd_bottom20  sh_font_color5'>"+
                            "<div class='sh_width_100 sh_margin_r_3 sh_ellipsis sh_font_sz24 sh_te_align_r'>"+"总价："+"<em class='sh_font_color2'><em class='sh_font_color2'>￥</em>"+data.data.orderDetail.details[i].totalMoney+"</em>"+
                            "</div>"+
                            "</div>";
                        }
                        str+="</div>";
                        str+=
                        "<div class='sh_font_sz32 sh_v_middle sh_pd_top20 sh_pd_bottom20 sh_bg_color_1'>"+
                        "<div class='sh_width_92 sh_margin_a sh_font_sz24 sh_ellipsis sh_lingheight_100 sh_font_color13'>"+
                        "订单金额：&nbsp;"+"<em class='sh_font_color2'>"+data.data.orderDetail.totalMoney+"</em><em class='sh_font_color2'>元</em>"+
                        "</div>"+
                        "</div>"+
                        "<div class='sh_font_sz32 sh_v_middle sh_pd_top20 sh_pd_bottom20 sh_bg_color_1'>"+
                        "<div class='sh_width_92 sh_margin_a sh_font_sz24 sh_ellipsis sh_lingheight_100 sh_font_color13'>"+
                        "优惠金额：&nbsp;"+"<em class='sh_font_color2'>"+data.data.orderDetail.favourMoney+"</em><em class='sh_font_color2'>元</em>"+
                        "</div>"+
                        "</div>"+
                        "<div class='sh_font_sz32 sh_v_middle sh_pd_top20 sh_pd_bottom20 sh_bg_color_1'>"+
                        "<div class='sh_width_92 sh_margin_a sh_font_sz24 sh_ellipsis sh_lingheight_100 sh_font_color13'>"+
                        "实付金额：&nbsp;"+"<em class='sh_font_color2'>"+data.data.orderDetail.realMoney +"</em><em class='sh_font_color2'>元</em>"+
                        "</div>"+
                        "</div>"
                        $('.order-delist').html(str);
                    }
                }
            })
        }else{
            //没有登录状态
            $("#_waiting_load").hide();
            var blank=
                "<img src='//res.csc86.com/v3/dmg/market/demo/p_order_de_noLogin.png' alt=''class='sh_margin_a  sh_img_max' style='width: 9.8rem'/>" +
                "<a href='//res.csc86.com/v3/dmg/market/html/login.html'>" +
                "<img src='//res.csc86.com/v3/dmg/market/demo/pro_de_cart_noLoginB.png' alt=''class='sh_margin_a  sh_img_max' style='height:1.1733333rem'/>" +
                "</a>";
            $('.order-delist').html(blank);
        }
        }
    }
    deporder.list();
});