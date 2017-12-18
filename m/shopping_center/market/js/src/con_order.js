define(function(require, exports, module) {
//地址栏交互
    var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');//加载登录接口
    var weixins = require("./weixin"); //判断是不是微信浏览器
    var dialog=require('layer');//弹框插件
    var local_st=require('//res.csc86.com/f=v3/shopping_center/market/js/src/pro_de_intrLstorage');//加载本地存储函数
    var hostmap=seajs.hostmap;//域名配置；
    var formatNum = require("./formatNum"); //价格的格式
    var ShopCart = require("./shopcart"); //购物车的数据模型
    var shopCart;
    var tips = function(tip) {
        dialog.open({
            content:tip
            ,skin: 'msg'
            ,time:2 //2秒后自动关闭
        });
        return false;
    };
    var pageId=require('./url_express')(window.location.href).params.pageId;//获取url参数
    var token=require('./url_express')(window.location.href).params.token;//获取url参数

    function clear(str) {//去掉所有逗号的函数方法
        str = str.replace(/,/g, "");//取消字符串中出现的所有逗号
        return str;
    }
    function conmon_dom(ar1,ar2,ar3,ar4){//优惠券部分共用dom函数
      var str= /*优惠券*/
          "<div class='clearfix sh_bg_color_15 sh_box-sizing_C sh_bor_bottom_1 sh_font_color6'>"+
          "<div class='clearfix sh_width_92 sh_margin_a sh_pd_top30 sh_pd_bottom30 coupon_jp'>"+
          "<div class=' sh_width_6 sh_float_l li-ht30 sh_font_sz28 sh_te_align_l'>优惠券</div>"+
          "<div class='sh_width_6 sh_float_l sh_te_align_r  li-ht30 sh_font_sz28  sh_font_color19 '>"
        if(ar1){
            str+="<em class='sh_pd_right20'>有可用</em>";
        }else{
            str+="<em class='sh_pd_right20'>无可用</em>"
        }
        str+="<img src='//res.csc86.com/v3/shopping_center/market/demo/pro_intrSize_choose.png' alt='' class=' sh_v_middle pro_intrSize_choose'>"+
        "</div>"+
        "</div>"+
        "</div>"+
            /*优惠券*/
        "<div class='sh_separate20 sh_bg_color_3'></div>"+
        "<div class='clearfix  sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color5 sh_bg_color_15'>"+
        "<div class='sh_margin_a sh_width_92 sh_lingheight_100 sh_font_sz26'>订单金额：<em class='sh_font_color2'>"+ar2+"</em>"+ "</div>"+
        "</div>"+
        "<div class='clearfix  sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color5 sh_bg_color_15'>"+
        "<div class='sh_margin_a sh_width_92 sh_lingheight_100 sh_font_sz26'>优惠金额：<em class='sh_font_color2'>"+ar3+"</em>"+ "</div>"+
        "</div>"+
        "<div class='clearfix  sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color5 sh_bg_color_15'>"+
        "<div class='sh_margin_a sh_width_92 sh_lingheight_100 sh_font_sz26'>实付金额：<em class='sh_font_color2'>"+ar4+"</em>"+ "</div>"+
        "</div>"+
        "<div class='sh_separate20 sh_bg_color_3'></div>"+
        "<div class='clearfix  sh_box-sizing_C sh_pd_top20 sh_pd_bottom20  sh_font_color5 sh_bg_color_7'>"+
        "<div class='sh_margin_a sh_width_92  sh_lingheight_100 sh_font_sz26'>"+
        "<img src='//res.csc86.com/v3/shopping_center/market/demo/con_order_noAddr.png' class='sh_v_middle pro_intrSend_labe  sh_pd_bottom10 sh_pd_top13'> &nbsp;&nbsp;<span class='sh_font_color13 sh_font_sz32  sh_v_middle'>微信支付</span> &nbsp;&nbsp;<span class='sh_font_color13 sh_font_sz24  sh_v_middle '>(推荐安装微信5.0及以上版本的用户使用)</span>"+
        "</div>"+
        "</div>";
        return str
    }

    function com_address(condi1){//地址共用dom函数 /*头部个人信息*/
        var str="";
        if(condi1.hasOwnProperty("memAddressDTO")){
            str="<div class='clearfix  sh_box-sizing_C  sh_pd_top40 sh_pd_bottom40  con_order_borderBg con_order-userhref '>"+
            "<div class='sh_width_92 sh_margin_a pers_order_detail'>"+
            "<dl class='sh_width_10 sh_margin_a'>"+
            "<dt class='clearfix sh_font_sz30 sh_font_color5 sh_box-sizing_C' >"+
            "<span class='sh_width_5 sh_float_l sh_lingheight_100 '>"+condi1.memAddressDTO.consignee+"</span>"+
            "<span class='sh_width_7 sh_float_l sh_te_align_c sh_lingheight_100'>"+condi1.memAddressDTO.mobile+"</span>"+
            "</dt>"+
            "<dt class=' sh_font_sz28 sh_font_color13 sh_pd_top20 li-ht32'>"+condi1.memAddressDTO.provinceName+condi1.memAddressDTO.cityName+condi1.memAddressDTO.districtName+condi1.memAddressDTO.address+"</dt>"+
            "</dl>"+
            "</div>"+
            "</div>";
        }else{
            str="<div class='clearfix  sh_box-sizing_C  sh_pd_top40 sh_pd_bottom40  con_order_borderBg con_order-userhref '>"+
            "<div class='sh_width_92 sh_margin_a'>"+
            "<dl class='sh_width_5 sh_margin_a  sh_pd_top20  sh_pd_bottom20 con_order_noAddr'>"+
            "<dt class='sh_width_10 sh_margin_a sh_font_sz28 sh_font_color5  sh_lingheight_1_5 sh_te_align_c'>"+"请添加收货地址"+
            "</dt>"+
            "</dl>"+
            "</div>"+
            "</div>";
        }
        return str
    }

    function submit_orderAjax(url,sengData,jpr2,type,getData,newdata){ //确认订单提交共用函数
        if(getData.hasOwnProperty("memAddressDTO")===false){
            tips("<label class='sh_font_sz32'>您还没有收货地址，请添加收货地址</label>");
            return;
        }else{
            $('#conderloading').css("display","block");
            $.ajax({
                url: url,
                data:sengData,
                type: "post",
                dataType: 'jsonp',
                success: function (data) {
                    $('#conderloading').css("display","none");
                    if(data.status==100){
                        if(weixins.isWeiXin()){
                            var datasobj=cscStatis.setParamkeys(newdata,"pr",{"format":{"quantity":"qt","productId":"id","price":"pr"}});
                            cscStatis({"data": datasobj, "format": { "eventAction": "ea","hitType": "t"}}).send({"Tracer": "submitorderSuccessTracker"});
                            if(type){
                                window.location.href="//res.csc86.com/v3/shopping_center/market/html/qrcode_payment.html?orderId=" + data.data.buyOrder+"&payMoney="+newdata.allprice;
                            }else{
                                window.location.href ="//res.csc86.com/v3/shopping_center/market/html/qrcode_payment.html?orderId=" + data.data.addOrder+"&payMoney="+newdata.allprice;
                            }
                        }else{
                            tips("<label class='sh_font_sz32'>不是微信浏览器</label>");
                        }
                    }else if(data.status==101){
                        tips("<label class='sh_font_sz32'>系统异常</label>");
                    }else if(data.status==102){
                        tips("<label class='sh_font_sz32'>订单确定超时,请重新选择</label>");
                        setTimeout(function(){
                            window.location.href=jpr2
                        },4000);
                    }else if(data.status==103){
                        tips("<label class='sh_font_sz32'>确认订单提交已成功,请不要重复操作</label>");
                    }else if(data.status==300){
                        window.location.href="//res.csc86.com/v3/shopping_center/market/html/p_order.html"
                    }
                }
            });
        }
    }
    function _draw_imageAjax(url,data,type){ //渲染页面函数
        if(isLogin.status){
        $.ajax({
            url:url,
            data:data,
            type: "post",
            dataType: 'jsonp',
            success: function (data) {
                $("#_waiting_load").hide();
                if(type=="1"){
                    if(data.status==100){
                        var res="";
                        /*订单商品件数*/
                        res+=
                            com_address(data.data.goodsToOrder)+"<div class='sh_bg_color_1'>"+
                               "<div class='sh_separate20 sh_bg_color_3'></div>"+
                                "<div class='clearfix  line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color5'>"+
                                    "<div class='sh_width_92 sh_margin_a '>"+
                                        "<div class='sh_margin_a sh_width_9 sh_float_l sh_lingheight_100 sh_font_sz26'>订单商品</div>"+
                                        "<div class=' sh_width_3 sh_float_l sh_te_align_r  sh_lingheight_100  sh_font_sz24'>共&nbsp;<em class='sh_font_color2'>"+data.data.goodsToOrder.quantity+"</em>&nbsp;件</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>";
                        /*订单商品公司名称*/
                        res+=
                        "<div class='sh_bg_color_15 sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30'>" +
                            "<div class='pro_de_cartContent sh_bg_color_1  sh_width_92 sh_margin_a '>"+ data.data.goodsToOrder.sellerName +"</div>"+
                        "</div>"+
                         /*确认订单详情信息*/
                        "<div class='clearfix  sh_pd_top30  sh_pd_bottom30 sh_bor_bottom_1 sh_bg_color_15'>"+
                            "<div class='clearfix save_store_imgh sh_margin_a  sh_width_92 '>"+
                                "<div class='sh_width_30 sh_float_l sh_lingheight_100  sh_font_sz0 '>"+
                                    "<img src='"+data.data.goodsToOrder.image+"' class='save_store_img' alt=''/>"+
                                "</div>"+
                                "<div class='clearfix sh_width_61 sh_float_l   sh_wor_space  sh_positon_r sh_font_sz32 li-ht42  sh_font_color5'>"+
                                     data.data.goodsToOrder.productName+
                                    "<div class='sh_pd_top20 sh_font_color13 sh_font_sz26' >";
                                        if(data.data.goodsToOrder.color!==""){
                                            res+="<span>颜色/款式：</span><em>"+data.data.goodsToOrder.color+"</em>;";
                                        }
                                        if(data.data.goodsToOrder.size!==""){
                                            res+="<span>尺码/规格：</span><em>"+data.data.goodsToOrder.size+"</em>";
                                        }
                                    res+=
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                            /*数量单价*/
                            "<div class='sh_font_sz30  sh_pd_top20 sh_font_color7 clearfix'>"+
                                "<div class='sh_margin_a  sh_width_92 clearfix'>"+
                                    "<div class=' sh_width_30  sh_float_l sh_lingheight_100'>数量:<em>"+data.data.goodsToOrder.quantity+"</em></div>"+
                                    "<div class=' sh_width_7 sh_float_r   sh_lingheight_100'>单价:<em class='sh_font_color2'>￥</em><em class='sh_font_color2'>"+data.data.goodsToOrder.curentPrice+"</em></div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                         /*总价*/
                        "<div class='clearfix sh_bg_color_1   sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color5 sh_font_sz26 sh_te_align_r sh_margin_a'>"+
                            "<div class='sh_margin_a  sh_width_92'>"+
                                "总价：<em class='sh_font_color2'>"+data.data.goodsToOrder.totalMoney+"</em>"+
                            "</div>"+
                        "</div>"+conmon_dom(data.data.goodsToOrder.hasCoupons,data.data.goodsToOrder.totalMoney,data.data.goodsToOrder.favourableMoney,data.data.goodsToOrder.totalPayMoney);
                        $('.con_order_tophtm').html(res);
                        var sellerId=data.data.goodsToOrder.sellerId;
                        var colorId =data.data.goodsToOrder.colorId;
                        var sizeId =data.data.goodsToOrder.sizeId;
                        var quantity =data.data.goodsToOrder.quantity;
                        var favourableMoney =data.data.goodsToOrder.favourableMoney;
                        var curentPrice =data.data.goodsToOrder.curentPrice;
                        var cpId =data.data.goodsToOrder.cpId;
                        var totalMoney =data.data.goodsToOrder.totalMoney;
                        var quickBuyToken =data.data.goodsToOrder.quickBuyToken;
                        var productId=data.data.goodsToOrder.productId;
                        if(data.data.goodsToOrder.hasOwnProperty("memAddressDTO")){
                            if(data.data.goodsToOrder.memAddressDTO.hasOwnProperty("addressId")){
                                var addressId=data.data.goodsToOrder.memAddressDTO.addressId;
                            }
                        }
                        if(data.data.goodsToOrder.hasCoupons){
                            $(".coupon_jp").on("click",function(event){//详情页进入快速购买优惠券可用
                                local_st.set("argument",JSON.stringify({"productId":productId,"shopId":sellerId,"catId":data.data.goodsToOrder.catId,"price":clear(data.data.goodsToOrder.totalMoney)}));
                                window.location.href='//res.csc86.com/v3/shopping_center/market/html/coupon-use.html?pageId='+type+'&token='+quickBuyToken;
                            })
                        }
                        $('.con_order-userhref').on("click",function(event){ //地址栏点击改变地址
                            window.location.href='//res.csc86.com/v3/shopping_center/market/html/con_order_addrListPre.html?pageId='+type+'&token='+quickBuyToken;
                        });
                        $(".con-order-submit").on("click",function(event){//详情页进入快速购买提交订单提交按钮
                            var gaprocucobj=[{'productId':productId,'price':curentPrice,'quantity':quantity}];
                            var cpn=favourableMoney;
                            var newdata={data: gaprocucobj,eventAction:'submitOrder','cpnid':cpId,'allprice':totalMoney,'allSpecies':1,'CpnPrc':cpn,"hitType": "event"};
                            submit_orderAjax( '//'+hostmap.test+'/order/buyOrder',{productId:productId,addressId: addressId,sellerId:sellerId,colorId:colorId,sizeId:sizeId,quantity:quantity,quickBuyToken:quickBuyToken,token:quickBuyToken,cpId:data.data.goodsToOrder.cpId},'//'+hostmap.test+'/search/product_detail.ftl?productId='+data.data.goodsToOrder.productId,true,data.data.goodsToOrder,newdata)
                        })
                    }else if(data.status==102){
                        tips("<label class='sh_font_sz32'>订单超时失效</label>");
                        setTimeout(function(){
                            window.location.href='//'+hostmap.test
                        },2000)
                    }else{
                        tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                    }
                    //详情页快速购买渲染结束，购物车前来渲染开始
                }else{
                    if(data.status==100){
                        var str="";
                        shopCart=new ShopCart(data.data.goodsToOrder.cars);
                        str+=com_address(data.data.goodsToOrder);
                        shopCart.compIds.forEach(function (compId) {
                            var comp=shopCart.comps[compId];
                            str+=
                                "<div class='sh_bg_color_1'>"+
                                "<div class='sh_separate20 sh_bg_color_3'> </div>"+
                                "<div class='clearfix  line_hg1_5 sh_box-sizing_C sh_bor_bottom_1 sh_pd_top30 sh_pd_bottom30  sh_font_color5'>"+
                                "<div class='sh_width_92 sh_margin_a '>"+
                                "<div class='sh_margin_a sh_width_9 sh_float_l sh_lingheight_100 sh_font_sz26'>订单商品</div>"+
                                "<div class=' sh_width_3 sh_float_l sh_te_align_r  sh_lingheight_100  sh_font_sz24'>共&nbsp;<em class='sh_font_color2'>"+comp.shangpinIds.length+"</em>&nbsp;件</div>"+
                                "</div>"+
                                "</div>"+
                                "</div>";
                            str +=
                                "<div class='sh_bg_color_15 sh_bg_color_1'>" +
                                "<div class='pro_de_cartContent sh_bg_color_1 sh_bor_bottom_1'>"+
                                "<div class='clearfix sh_pd_bottom30 sh_pd_top30 pro_de_cart_title'>"+
                                "<div class='sh_width_92 sh_margin_a  sh_font_sz26 '>"+comp.name+"</div>"+
                                "</div>"+
                                "</div>";
                                //公司标题结束区域
                            comp.shangpinIds.forEach(function (spGrpId) {
                                var spGrp = comp.shangpins[spGrpId];
                                str += "<div class='pro_de_cart_group'>";//产品详细区域开始
                                spGrp.ids.forEach(function (spId) {
                                    var sp = spGrp.sameSPs[spId];
                                    var cs = sp.property;
                                    var si = sp.sku;
                                    str +=
                                    "<div class='clearfix sh_pd_top30  sh_pd_bottom30 sh_bor_bottom_1 sh_bg_color_1'>"+//   图片标题栏
                                        "<div class=' sh_margin_a  clearfix save_store_imgh sh_width_92'>"+
                                            "<div class='sh_width_30 sh_float_l sh_lingheight_100  sh_font_sz0 '>"+
                                                "<img src='http://img.csc86.com" + sp.image + "' class='save_store_img' alt=''/>"+
                                            "</div>"+
                                            "<div class='clearfix sh_width_61 sh_float_l   sh_wor_space  sh_positon_r sh_font_sz32 li-ht42  sh_font_color5 '>"+
                                                                     sp.name+
                                                "<div class='sh_pd_top20 sh_font_color13 sh_font_sz26 sh_font_color7' >";
                                                if(cs!==""){
                                                    str+="<span>颜色/款式：</span><em>"+cs+"</em>;";
                                                }
                                                if(si!==""){
                                                    str+="<span>尺码/规格：</span><em>"+si+"</em>";
                                                }
                                                str+="</div>"+
                                            "</div>"+
                                        "</div>"+
                                        "<div class='sh_font_sz30 sh_pd_top20 sh_font_color7 clearfix '>"+
                                            "<div class='sh_width_92 sh_margin_a clearfix'>"+
                                                "<div class=' sh_width_30  sh_float_l sh_lingheight_100'>数量：<em>"+sp.num+"</em></div>"+
                                                "<div class=' sh_width_7 sh_float_r  sh_lingheight_100'>单价：<em class='sh_font_color2'>￥</em><em class='sh_font_color2'>"+formatNum( sp.price.toFixed(2))+"</em></div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class='clearfix sh_bg_color_1   sh_box-sizing_C  sh_pd_top30 sh_pd_bottom30  sh_font_color5'>"+
                                        "<div class='   sh_font_sz26 sh_te_align_r sh_lingheight_100 sh_margin_a sh_width_92'>"+
                                        "总价：<em class='sh_font_color2'>"+formatNum(sp.calcTotal().toFixed(2))+"</em>"+
                                        "</div>"+
                                    "</div>";
                                });
                                str += "</div>";
                            });
                            str += "<div class='sh_pr_hg30 sh_bg_color_9'></div>" +//分割区域
                            "</div>"
                        });
                        str+=conmon_dom(data.data.goodsToOrder.hasCoupons,data.data.goodsToOrder.totalMoney,data.data.goodsToOrder.favourableMoney,data.data.goodsToOrder.totalPayMoney);//动态获取内容开始结束
                        $('.con_order_tophtm').html(str);
                        //切换头部信息
                        if(data.data.goodsToOrder.hasOwnProperty("memAddressDTO")){
                            if(data.data.goodsToOrder.memAddressDTO.hasOwnProperty("addressId")){
                                var addressId=data.data.goodsToOrder.memAddressDTO.addressId;
                            }
                        }
                        var token=data.data.goodsToOrder.token;
                        var lineIds=[],argument=[],gaprocucobj=[];
                        for(var i=0;i<data.data.goodsToOrder.cars.length;i++){
                            for(var j=0;j<data.data.goodsToOrder.cars[i].detail_list.length;j++){
                                lineIds.push(data.data.goodsToOrder.cars[i].detail_list[j].detail_id);
                                gaprocucobj.push({'id':data.data.goodsToOrder.cars[i].detail_list[j].productId,'price':data.data.goodsToOrder.cars[i].detail_list[j].line_money,'quantity':data.data.goodsToOrder.cars[i].detail_list[j].quantity});
                                argument.push({"productId":data.data.goodsToOrder.cars[i].detail_list[j].productId,"price":data.data.goodsToOrder.cars[i].detail_list[j].line_money,"catid":data.data.goodsToOrder.cars[i].detail_list[j].catid,"shopId":data.data.goodsToOrder.cars[i].seller_id})
                            }
                        }
                        lineIds=lineIds.join(",");
                        $('.con_order-userhref').on("click",function(event){ //购物车前来地址栏点击改变地址
                            event.preventDefault();
                            window.location.href='//res.csc86.com/v3/shopping_center/market/html/con_order_addrListPre.html?pageId='+type+'&token='+token;
                        });
                        if(data.data.goodsToOrder.hasCoupons){
                            $(".coupon_jp").on("click",function(event){ //购物车前来优惠券可用
                                event.preventDefault();
                                local_st.set("cart-argument",JSON.stringify(argument));
                                window.location.href='//res.csc86.com/v3/shopping_center/market/html/coupon-use.html?pageId='+type+'&token='+token;
                            })
                        }
                        $(".con-order-submit").on("click",function(event){//确认订单购物车进入提交按钮
                            var goodsToOrder=data.data.goodsToOrder;
                            var favourableMoney=goodsToOrder.favourableMoney,totalMoney=goodsToOrder.totalMoney,cpId=goodsToOrder.cpId;
                            var newdata={data: gaprocucobj,eventAction:'submitOrder','cpnid':cpId,'allprice':totalMoney,'allSpecies':gaprocucobj.length,'CpnPrc':favourableMoney,"hitType": "event"};
                            event.preventDefault();
                            submit_orderAjax( '//'+hostmap.test+'/order/addOrder',{addressId:addressId,token: token,confirmOrderToken:token,lineIds:lineIds,cpId:data.data.goodsToOrder.cpId,cuproduct:data.data.goodsToOrder.cuproduct},"//res.csc86.com/v3/shopping_center/market/html/pro_de_cart.html",false,data.data.goodsToOrder,newdata)
                        })
                    }else if(data.status==102){
                        tips("<label class='sh_font_sz32'>订单超时失效label>");
                        setTimeout(function(){
                            window.location.href='//'+hostmap.test;
                        },2000)
                    }
                }
            }
        });
    }
    }
    function _draw_image(type,token){//确认订单页面渲染函数
        if(type=="1"){
            _draw_imageAjax('//'+hostmap.test+'/order/quickOrder',{token: token},type);//从详情页立即购买来页面
        }else{
            _draw_imageAjax('//'+hostmap.test+'/order/goodsToOrder',{token: token},type);//从购物车来页面
        }
    }
    _draw_image(pageId,token)
});
