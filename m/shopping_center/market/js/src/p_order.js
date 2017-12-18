/**
 * Created by Administrator on 2016/10/12.
 */

define(function (require, exports, module) {
    var isLogin_stu = require('//api.csc86.com/notify/count/all/?callback=define'); //判断是否登录
    var weixins = require("./weixin"); //判断是不是微信浏览器
    var dialog=require('layer');//弹框插件
    var hostmap=seajs.hostmap;//域名配置
    var tips = function(tip) {
        dialog.open({
            content:tip
            ,skin: 'msg'
            ,time:2 //2秒后自动关闭
        });
        return false;
    };
    var porder = {
        init:function(){
            var num=1;
            if(isLogin_stu.status){
                this.list(num);
                this.slideoperaction(num);
            }else{
                //没有登录状态
                $("#_waiting_load").hide();
                var blank=
                    "<img src='//res.csc86.com/v3/shopping_center/market/demo/p_order_de_noLogin.png' alt=''class='sh_margin_a  sh_img_max' style='width: 9.8rem'/>" +
                    "<a href='//res.csc86.com/v3/shopping_center/market/html/login.html'>" +
                    "<img src='//res.csc86.com/v3/shopping_center/market/demo/pro_de_cart_noLoginB.png' alt=''class='sh_margin_a  sh_img_max' style='height:1.1733333rem'/>" +
                    "</a>";
                $('#order-list').html(blank);
            }
        },
        list:function(num){
            $.ajax({
                url:'//'+hostmap.test+'/order/myOrderList',
                data:{page:num,pageSize:5},
                type: "post",
                dataType: 'jsonp',
                success: function (data) {
                    $("#_waiting_load").hide();
                    if(data.status==101){
                       if(num==1){
                          $("#order_null").show()
                       }
                    }else {
                        var len = data.data.myOrderList.resultList.length;
                        var imgurl = '//img.csc86.com/';
                        var str = "";
                        for (var i = 0; i < len; i++) {
                            var status;
                            var btnhtml;
                            if (data.data.myOrderList.resultList[i].status == 1) {
                                status = "待付款";
                                btnhtml = "<div class='sh_positon_a sh_right_22  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis goordermoney' data-goordermoney='"+data.data.myOrderList.resultList[i].orderNo+"'>" + "去付款" + "</div>"+
                                "<div class='sh_positon_a sh_right_3  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis cancel-order' data-memberId='"+data.data.myOrderList.resultList[i].memberId+"' data-orderNo='"+data.data.myOrderList.resultList[i].orderNo+"' data-seller='"+data.data.myOrderList.resultList[i].seller+"'>" + "取消订单" + "</div>"
                            } else if (data.data.myOrderList.resultList[i].status == 2) {
                                status = "待发货";
                                btnhtml = "<div class='sh_positon_a sh_right_22  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis remind-order' data-memberId='"+data.data.myOrderList.resultList[i].memberId+"' data-orderNo='"+data.data.myOrderList.resultList[i].orderNo+"' data-seller='"+data.data.myOrderList.resultList[i].seller+"'>" + "提醒发货" + "</div>" +
                                "<div class='sh_positon_a sh_right_3  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis cancel-order' data-memberId='"+data.data.myOrderList.resultList[i].memberId+"' data-orderNo='"+data.data.myOrderList.resultList[i].orderNo+"' data-seller='"+data.data.myOrderList.resultList[i].seller+"'>" + "取消订单" + "</div>"
                            } else if (data.data.myOrderList.resultList[i].status == 5) {
                                status = "已取消";

                                btnhtml = "<a href='p_order_de.html?id="+data.data.myOrderList.resultList[i].orderNo+"'><div class='sh_positon_a sh_right_3  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis'>" + "查看详情" + "</div></a>"

                            } else if (data.data.myOrderList.resultList[i].status == 3) {
                                status = "交易完成";
                                btnhtml = "<a href='p_order_de.html?id="+data.data.myOrderList.resultList[i].orderNo+"'><div class='sh_positon_a sh_right_3  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis'>" + "查看详情" + "</div></a>"

                            } else if (data.data.myOrderList.resultList[i].status == 15) {
                                status = "待收货";
                                btnhtml = "<div class='sh_positon_a sh_right_3  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis confirm-order'  data-orderNo='"+data.data.myOrderList.resultList[i].orderNo+"' data-seller='"+data.data.myOrderList.resultList[i].seller+"'>" + "确认收货" + "</div>"

                            }

                            str += "<div class='order-module sh_bg_color_1'><div class='sh_width_92 sh_margin_a sh_clear  sh_font_sz26 sh_pd_top30 sh_font_color6'>订单编号:<em>" + data.data.myOrderList.resultList[i].orderNo + "</em></div>" +
                            "<div class='sh_clear   line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top10 sh_pd_bottom20  sh_font_color5'>" +
                            "<div class='sh_width_92 sh_margin_a sh_font_sz24'>" +
                            "<div  class='sh_width_9 sh_float_l sh_lingheight_100  sh_ellipsis sh_font_color4'>" + data.data.myOrderList.resultList[i].createTime + "</div>" +
                            "<div  class='sh_width_3 sh_float_l sh_te_align_r sh_lingheight_100 sh_ellipsis sh_status_txt'>" + status + "</div>" +
                            "</div>" +
                            "</div>" +
                            "<div class='sh_clear sh_pd_top13 sh_pd_bottom13 sh_bor_bottom_1 save_store_imgh '>" +
                             "<a href='//res.csc86.com/v3/shopping_center/market/html/p_order_de.html?id="+data.data.myOrderList.resultList[i].orderNo+"'class='sh_font_sz0'>"+
                            "<div class='sh_width_92 sh_margin_a sh_height_100 order_nourl'  data-orderNo='"+data.data.myOrderList.resultList[i].orderNo+"'>" +
                            "<div class='sh_float_l sh_lingheight_100  sh_font_sz0 sh_margin_l_1'>";
                            if (data.data.myOrderList.resultList[i].imageUrl1 != '') {
                                str += "<img src='" + imgurl + data.data.myOrderList.resultList[i].imageUrl1 + " 'class='order_store_img' alt=''/>";
                            } else {
                                str += "";
                            }
                            str += "</div>" +
                            "<div class=' sh_float_l sh_lingheight_100  sh_font_sz0 sh_margin_l_1'>";
                            if (data.data.myOrderList.resultList[i].imageUrl2 != '') {
                                str += "<img src='" + imgurl + data.data.myOrderList.resultList[i].imageUrl2 + " 'class='order_store_img' alt=''/>";
                            } else {
                                str += "";
                            }
                            str += "</div>" +
                            "<div class='sh_float_l sh_lingheight_100  sh_font_sz0 sh_margin_l_1'>";
                            if (data.data.myOrderList.resultList[i].imageUrl3 != '') {
                                str += "<img src='" + imgurl + data.data.myOrderList.resultList[i].imageUrl3 + " 'class='order_store_img' alt=''/>";
                            } else {
                                str += "";
                            }
                            str += "</div>" +
                            "<div class='sh_width_8_8 sh_float_r   sh_font_sz0  sh_te_align_c  sh_ellipsis sh_margin_l_1' >" +
                            "<img src='//res.csc86.com/v3/shopping_center/market/demo/pers_order_1.png' class='pers_order_ar sh_v_middle' alt=''/>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                             "</a>"+
                            "<div class='sh_clear line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color5 sh_positon_r'>" +
                            "<div class='sh_width_92 sh_margin_a sh_font_sz24 sh_lingheight_100  sh_ellipsis'>" +
                            "共&nbsp;<em class='sh_font_color2'>" + data.data.myOrderList.resultList[i].totalAmount + "</em>&nbsp;件,订单金额&nbsp;<em class='sh_font_color2'>" +data.data.myOrderList.resultList[i].totalMoney + "</em><em class='sh_font_color2'>元</em>" +
                            "</div>";
                            str += "<div class='btnswhid'>"+btnhtml+"</div>";
                            str += "</div>" +
                            "<div class='sh_separate20 sh_bg_color_3'></div></div>";
                            status = null;
                            btnhtml = null;
                        }
                        var htm = $('#order-list').html();
                        $('#order-list').html(htm + str);
                        //去支付按钮
                        $('.goordermoney').on('click',function(){
                            var $goordermoney= $(this).attr('data-goordermoney');
                            if(weixins.isWeiXin()){
                               // 新增跳转到二维码付款页面
                                var newsobj=cscStatis.obj2extend({"orderId":$goordermoney},{"eventAction":"goPayment","hitType": "event"});
                                cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t"}}).send({"Tracer": "goPaymentTracker"});
                                window.location.href = "//res.csc86.com/v3/shopping_center/market/html/qrcode_payment.html?orderId=" + $goordermoney;
                            }else{
                                tips("<label class='sh_font_sz32'>不是微信浏览器</label>");
                            }
                        });
                        //待发货 取消按钮
                        $('.cancel-order').on('click',function(){
                            var This=$(this);
                            var seller=This.attr('data-seller');
                            var orderNo=This.attr('data-orderNo');
                            $.ajax({
                                url:'//'+hostmap.test+'/order/canceOrder',
                                data:{orderNo:orderNo,sellerId:seller},
                                type: "post",
                                dataType: 'jsonp',
                                success: function (data) {
                                    if(data.status==100){
                                        var newsobj=cscStatis.obj2extend({"orderId":orderNo},{"eventAction":"cancelOrderSuccess","hitType": "event"});
                                        cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t"}}).send({"Tracer": "cancelOrderSuccessTracker"});
                                        This.parents('.order-module').find('.sh_status_txt').html('已取消');
                                        var  btnhtml = "<a href='p_order_de.html?id="+orderNo+"'><div class='sh_positon_a sh_right_3  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis'>" + "查看详情" + "</div></a>"
                                        tips("<label class='sh_font_sz32'>取消成功</label>");
                                        This.parent('.btnswhid').html(btnhtml);
                                    }else if (data.status==101){
                                        tips("<label class='sh_font_sz32'>用户未登录或取消失败</label>");
                                    }
                                }
                            });
                        });
                        //待发货 提醒发货按钮
                        $('.remind-order').on('click',function(){
                            var This=$(this);
                            var seller=This.attr('data-seller');
                            var orderNo=This.attr('data-orderNo');
                            $.ajax({
                                url: '//'+hostmap.test+'/order/urgingSellerShipped',
                                data: {orderNo: orderNo, sellerId: seller},
                                type: "post",
                                dataType: 'jsonp',
                                success: function (data) {
                                    if(data.status==100){
                                        tips("<label class='sh_font_sz32'>已成功提醒卖家发货</label>");
                                    }else if(data.status==101){
                                        tips("<label class='sh_font_sz32'>提醒卖家发货失败</label>");
                                    }
                                }
                            });
                        });
                        $('.confirm-order').on('click',function(){
                            var This=$(this);
                            var seller=This.attr('data-seller');
                            var orderNo=This.attr('data-orderNo');
                            $.ajax({
                                url: '//'+hostmap.test+'/order/confirmReceive',
                                data: {orderNo: orderNo, sellerId: seller},
                                type: "post",
                                dataType: 'jsonp',
                                success: function (data) {
                                    if(data.status==100){
                                        This.parents('.order-module').find('.sh_status_txt').html('交易完成');
                                        var  btnhtml = "<a href='p_order_de.html?id="+orderNo+"'><div class='sh_positon_a sh_right_3  sh_pd_bottom10 sh_pd_top10 sh_pd_left14 sh_pd_right14 sh_bottom_2 sh_font_color9 sh_bor_a_3 sh_border_radius_5  sh_font_sz24 sh_lingheight_100 sh_te_align_c sh_ellipsis'>" + "查看详情" + "</div></a>"
                                        This.parent('.btnswhid').html(btnhtml);
                                        tips("<label class='sh_font_sz32'>交易完成</label>");
                                    }else if(data.status==101){
                                        tips("<label class='sh_font_sz32'>确认异常</label>");
                                    }
                                }
                            });
                        });
                    }
                }
            });
        },
        slideoperaction:function(num){
                $(window).scroll(function(){
                    if($(document).scrollTop()>=$(document).height()-$(window).height())
                    {
                        num++;
                        porder.list(num);
                    }
                });

        }
    }
    porder.init();
});