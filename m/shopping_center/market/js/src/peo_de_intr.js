define(function (require, exports, module) {
    require('swiper');//滑动插件
    require('//res.csc86.com/f=v3/shopping_center/market/js/src/tab')(".sh_tab_box li",".sh_tab",true);//tab切换
    var formatNum=require('//res.csc86.com/f=v3/shopping_center/market/js/src/formatNum');//加载金额三位数一逗号函数
    var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');//加载登录接口
    var dialog=require('layer');//弹框插件
    var cart_show=require('//res.csc86.com/f=v3/shopping_center/market/js/src/isLogin_not');//加载购物车数量显示函数
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
    var pro_de_intr = {
        show_img: function () {//商品详情页面轮播以及热选精销轮播
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true
            });
            var _window_height = $(window).height();
            function _scrollTopC(){ //返回顶部
                $(window).scrollTop() > 1 * _window_height ? $("#backToTop").css("display", "block") : $("#backToTop").css("display", "none");
            }
            function scroll_top(){
                var goTop = setInterval(scrollMove, 10);
                function scrollMove() {
                    $(window).scrollTop(($(window).scrollTop() / 1.1));
                    if ($(window).scrollTop() < 1) clearInterval(goTop);
                }
            }
            $("#backToTop").on('click',function(){
                scroll_top()
            });
            _scrollTopC();
            $(window).on('scroll',_scrollTopC);//商品详情页面置顶按钮函数
        },
        size_choose: function (shangPin) {//SKU区域方法汇总
            var $num = $("#sys_spec_number");//数量区域
            var $ok = $("#sys_spec_ok");//确定键
            var $num_input = $num.find("input").eq(0).on("change", _onNumChange);//数量改变
            var $totalPrice = $("#sys_spec_totalprice");//总价区域
            var shCart_buyRi=false;//判断是由购物车发起弹窗还是立刻购买发起弹窗
            var _is_store_not=null;
            function _show(e) {//弹窗显示函数
                $(".pro_de_siP").addClass("am-modal-active");
                if($(".sharebg").length>0){
                    $(".sharebg").addClass("sharebg-active");
                }else{
                    $(".pro_de_siP").css("display","block").before('<div class="sharebg"></div>');
                    $(".sharebg").addClass("sharebg-active");
                }
                $(window).scrollTop(0);
                $(e.target).hasClass("pro_de_intrSc") ? shCart_buyRi=true : shCart_buyRi=false;
                shangPin.specNames.forEach(function (name) {
                    $("#sys_spec_" + name).find("ul>li").removeClass("selected");
                    $("#sys_spec_" + name).find("ul>li:first-child").addClass("selected");
                    shangPin.setSpec(name,  $("#sys_spec_" + name).find("ul>li:first-child").data("aid"));//存放sku值的数组
                    shangPin.setSpecProperty(name,  $("#sys_spec_" + name).find("ul>li:first-child").find("a").text());//存放sku值的数组
                });
                if (shangPin.specNames.length >= 0) {//如果是传入的属性名字为空，既是颜色及规格都没有时，则执行下面的函数此处必须是规格报价时
                    _enableSubmit(true);
                }
                if (shangPin.isAllSpecSetted()){
                    _ajaxGetPrice();
                }
            }
            function _hide() {//弹窗隐藏函数
                $(".pro_de_siP").removeClass("am-modal-active");
                setTimeout(function(){
                    $(".sharebg-active").removeClass("sharebg-active");
                    $(".sharebg").remove();
                },300);
                _enableSubmit(false);
            }
            $(".pro_de_intrSc").on('click', _show);//弹出窗展示
            $(".pro_de_intrSc").next().on('click', _show);//弹出窗展示
            $(".pro_de_intrSi").parent().on('click', _show);//弹出窗展示
            $('.pro_de_wr').parent().parent().on('click', _hide);//弹出窗消失隐藏

            function _onNumChange() {//数量改变函数
                var num = +$(this).val();
                if (isNaN(num) || num < shangPin.minNum || num > shangPin.maxNum) {
                    $(this).val(shangPin.num);
                } else {
                    shangPin.num = num;
                    _calcTotal();
                }
            }
            function _calcTotal() {//数量改变总价改变函数
                var total = shangPin.calcTotal().toFixed(2);
                $totalPrice.text(formatNum(total));
            }
            function _onMinusClick() {//减号函数
                if (shangPin.num > 1) {
                    shangPin.num--;
                    $num_input.val(shangPin.num); _calcTotal();
                    $num.find(".good_size_plus").off("click").removeClass("disabled").click(_onPlusClick);
                }
                if (shangPin.num <= shangPin.minNum) {
                    $(this).addClass("disabled").off("click");
                }
            }
            function _onPlusClick() {//加号函数
                shangPin.num++;
                $num_input.val(shangPin.num); _calcTotal();
                $num.find(".good_size_min").off("click").removeClass("disabled").click(_onMinusClick);
                if (shangPin.num >= shangPin.maxNum) {
                    $(this).addClass("disabled").off("click");
                }
            }

            function addShopcart_buyAjax(type,url){//加入购物车以及立刻购买共用ajax函数
                var params,params2;
                if(type){
                    params={
                        "productId": shangPin.id,
                        "sellerId":shangPin.sellerId,
                        "productDetailList":[{
                            "num":shangPin._num,"colorId":shangPin.specs.color,"sizeId":shangPin.specs.size
                        }]}
                }else{
                    params={
                        "productId": shangPin.id,//产品id
                        "sellerId":shangPin.sellerId,//卖家id
                        "quantity":shangPin._num,//产品数量
                        "colorId":shangPin.specs.color,//sku颜色id
                        "sizeId":shangPin.specs.size,//sku尺寸id
                        "sellerName":shangPin.sellerName,//卖家名字
                        "productName":shangPin.productName,//产品名字
                        "totalMoney":$totalPrice.text(),//总价
                        "priceRange":shangPin.priceRange,//价格区间
                        "priceMethod":shangPin.quoteType,//报价方式
                        "image":shangPin.image,//图片路径
                        "color":shangPin.specsProperty.color,//颜色值（"红色、黄色等"）
                        "size":shangPin.specsProperty.size,//规格值（"L、M等"）
                        "curentPrice":shangPin.price,//当前价格
                        "catId":shangPin.candId//商品类目id
                    }
                }

                params2={
                    "productId": shangPin.id,//产品id
                    "price":shangPin.price,//当前价格
                    "quantity": shangPin.num,//产品数量
                };

                $.get(url,params, function(data) {
                    //var datasobj=cscStatis.setParamkeys(params);
                    if(type){
                        if(data.status==200){
                            var newsobj=cscStatis.obj2extend(params2,{"eventAction":"addToCartSuccess","hitType": "event"});
                            cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t","quantity":"pr1qt","price":"pr1pr","productId":"pr1id"}}).send({"Tracer": "addToCartSuccessTracker"});
                            var sh_cart = +$(".pro_de_num_c").html();
                            $(".pro_de_num_c").html(sh_cart+=shangPin.num);
                            if(sh_cart>0){
                                $(".sh_cart").show()
                            };
                            if(sh_cart>=100){
                                $(".pro_de_num_c").html("99");
                                $(".pro_de_add_c").show()
                            }
                            _hide()
                        }else{
                            tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                            _hide();
                        }
                    }else{
                        if(data.status==100){
                            var newsobj=cscStatis.obj2extend(params2,{"eventAction":"quickBuy","hitType": "event"});
                            cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t","quantity":"pr1qt","price":"pr1pr","productId":"pr1id"}}).send({"Tracer": "quickBuyTracker"});
                            shangPin.token=data.data.token;
                            _hide();
                            window.location.href="//res.csc86.com/v3/shopping_center/market/html/con_order.html?pageId=1&token="+shangPin.token
                        }else{
                            tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                            _hide();
                        }
                    }
                },"jsonp");
            }
            function _notBuyorAdd(content){
                if(isLogin.data.id==shangPin.sellerId){
                    tips("<label class='sh_font_sz32'>"+content+"</label>");
                    _hide();
                    return;
                }
            }
            function _onOKClick() {//点击加入购物车确定键，当已经登录直接加入购物车，否则跳转到登录页面
                if ($.debug||isLogin.status) {//该处确定按钮判断是加入购物车还是立刻购买；立刻购买直接到订单页面
                    if(shCart_buyRi){
                        _notBuyorAdd("亲,不能对自己店铺的商品下单哦~~~");
                        addShopcart_buyAjax(true,"//"+hostmap.test+"/addShoppingCar")
                    }else{
                        _notBuyorAdd("亲,不能对自己店铺的商品下单哦~~~");
                        addShopcart_buyAjax(false,"//"+hostmap.test+"/order/quickBuyToken")
                    }
                } else {
                    window.location.href = "//res.csc86.com/v3/shopping_center/market/html/login.html"
                }
            }
            function _enableSubmit(type) {//是否置灰函数
                if (type) {
                    //debugger;
                    if (shangPin.enabled) return;//undefined
                    if (shangPin.maxNum > shangPin.minNum) {
                        $num_input.removeAttr("disabled");
                        $num.find(".good_size_min").off("click").addClass("disabled");
                        $num.find(".good_size_plus").removeClass("disabled").click(_onPlusClick);
                    }
                    if (shangPin.maxNum >= shangPin.minNum) {
                        shangPin.num = shangPin.minNum;
                        $num_input.val(shangPin.num); _calcTotal();
                        $ok.removeClass("disabled").on('click',_onOKClick);
                        shangPin.enabled = true;
                    }
                } else {
                    if (!shangPin.enabled) return;
                    shangPin.num = 0;
                    $num_input.attr("disabled", true).val(shangPin.num); _calcTotal();
                    $num.find(".good_size_min").off("click").addClass("disabled");
                    $num.find(".good_size_plus").off("click").addClass("disabled");
                    $ok.addClass("disabled").off("click");
                    shangPin.enabled = false;
                }
            }
            function _ajaxGetPrice() {//从后台获取价格函数
                shangPin.getPriceDefer().then(function (rslt) {
                    if (rslt === true) {
                        _enableSubmit(true);
                        if(shangPin.priceList.length>0&&shangPin.priceList.length<=1){
                            var str=""
                            for(var i= 0,len=shangPin.priceList.length;i<len;i++){
                                str+=
                                    "<div class=' sh_width_4 sh_float_l sh_pd_bottom30'>"+
                                    "<div class='sh_bor_left_1 sh_pd_left14 pro-de-prsh'>"+
                                    "<div  class='sh_pd_bottom10 sh_font_color13 sh_font_sz24 sh_ellipsis sh_lingheight_100'>"+
                                    "<span>"+">="+"<em class='pro_de_num'>"+ shangPin.priceList[i].min+"</em></span><span>件</span>"+
                                    "</div>"+
                                    "<div  class='sh_font_color2 sh_font_sz28  sh_ellipsis sh_lingheight_100'>"+
                                    "<span>￥</span>"+
                                    "<span><em class=''>"+formatNum(shangPin.priceList[i].price)+"</em></span>"+
                                    "<span>起</span>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>"
                            }
                            $(".pro_de_intr_spa").html(str)
                        }else{
                            var res="";
                            for(var j= 0,len=shangPin.priceList.length;j<len;j++){
                                res+=
                                    "<div class=' sh_width_4 sh_float_l sh_pd_bottom30'>"+
                                    "<div class='sh_bor_left_1 sh_pd_left14'>"+
                                    "<div class=' sh_pd_bottom10 sh_font_color3 sh_font_sz24 sh_ellipsis sh_lingheight_100'>"+
                                    "<span><em class='pro_de_num'>";
                                if ((j+1)==len) {
                                    res +=">="+shangPin.priceList[j].min
                                } else {
                                    res += shangPin.priceList[j].min + "</em> - <em class='pro_de_num'> " + (shangPin.priceList[j+1].min - 1);
                                }
                                res +="</em></span><span>件</span>"+
                                "</div>"+
                                "<div  class=' sh_font_color2 sh_font_sz28  sh_ellipsis sh_lingheight_100'>"+
                                "<span>￥</span>"+
                                "<span><em class=''>"+formatNum(shangPin.priceList[j].price)+"</em></span>"+
                                "<span>起</span>"+
                                "</div>"+
                                "</div>"+
                                "</div>"
                            }
                            $(".pro_de_intr_spa").html(res)
                        }

                    } else {
                        _enableSubmit(false);
                    }
                });
            }
            function _callBack(type) {//有颜色规格选中之后再执行的函数
                return function () {
                    if (shangPin.isAjaxing) return false;
                    _enableSubmit(false);
                    if (!!$(this).hasClass("selected")) {
                        $(this).removeClass("selected");
                        shangPin.setSpec(type, 0);
                        shangPin.setSpecProperty(type, 0);
                    } else {
                        $(this).addClass("selected").siblings("li").removeClass("selected");
                        shangPin.setSpec(type, $(this).data("aid"));//存放sku值的数组
                        shangPin.setSpecProperty(type, $(this).find("a").text());//存放sku值的数组
                    }
                    if (shangPin.isAllSpecSetted()){
                        _ajaxGetPrice();
                    }
                };
            }
            shangPin.specNames.forEach(function (name) {//给属性下面对应的每个属性绑定事件,颜色置灰的除外，specNames是初始化时页面上判断是颜色属性还是规格属性，数组存放
                $("#sys_spec_" + name).delegate("ul>li:not(.pro_de_sizeNn)", "click", _callBack(name));
            });

            function  _change_storeAjax(type,url){//收藏与取消收藏共用ajax函数
                var params,params2;
                if(type){
                    params={"collectId":shangPin.id}
                }else{
                    params={"productId":shangPin.id,"shopId":shangPin.sellerId}
                }
                params2={"productId":shangPin.id};
                $.ajax({
                    url:url,
                    type: $.debug ? "get":"post",
                    data:params,
                    dataType:$.debug ? "json":"jsonp",
                    success: function (data) {
                        if(type){
                            if(data.status==200){
                                var newsobj=cscStatis.obj2extend(params2,{"eventAction":"delFavorate","hitType": "event"});
                                cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t","productId":"prid"}}).send({"Tracer": "delFavorateTracker"});
                                $(".pro_intrStore_ch").eq(0).attr("src", "//res.csc86.com/v3/shopping_center/market/demo/pro_intrStore_f.png");
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                _is_store_not=false;
                                return;
                            }else{
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                            }
                        }else{
                            if(data.status==200){
                                var newsobj=cscStatis.obj2extend(params2,{"eventAction":"favSuccess","hitType": "event"});
                                cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t","productId":"prid"}}).send({"Tracer": "favSuccessTracker"});
                                $(".pro_intrStore_ch").eq(0).attr("src", "//res.csc86.com/v3/shopping_center/market/demo/pro_intrStore_l.png");
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                _is_store_not=true;
                                return;
                            }else{
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                            }
                        }
                    },
                    error: function (xhr, type) {
                        tips("<label class='sh_font_sz32'>后台程序报错，操作失败</label>");
                    }
                });
            }
            function _change_store() {//添加到收藏夹功能
                if ($.debug||isLogin.status){
                    if(_is_store_not){//已经收藏过则是取消收藏
                        _change_storeAjax(true,$.debug ? "../../market/json/price.json":"//"+hostmap.test+"/cancelFavorites");
                    }else{
                        _change_storeAjax(false,$.debug ? "../../market/json/price.json":"//"+hostmap.test+"/addFavorites");
                    }
                } else {
                    $(this).attr("src", $.debug ? "../demo/pro_intrStore_f.png":"//res.csc86.com/v3/shopping_center/market/demo/pro_intrStore_f.png");
                    window.location.href = $.debug ? "../market/html/login.html":"//res.csc86.com/v3/shopping_center/market/html/login.html";
                }
            }
            function _store(){//判断是否收藏
                $.ajax({
                    url:$.debug ? "../../market/json/price.json":"//"+hostmap.test+"/judgeIsFavorites",
                    type: $.debug ? "get":"post",
                    data:{"collectId":shangPin.id},
                    dataType:$.debug ? "json":"jsonp",
                    success: function (data) {
                        if(data.status==200){
                            $(".pro_intrStore_ch").eq(0).attr("src", $.debug ? "../demo/pro_intrStore_l.png":"//res.csc86.com/v3/shopping_center/market/demo/pro_intrStore_l.png");
                            _is_store_not=true;//已经收藏
                        }else{
                            _is_store_not=false;//没有被收藏
                        }
                        $(".pro_intrStore_ch").eq(0).on('click',_change_store);
                        cart_show("//"+ hostmap.test +"/carCount",".sh_cart",".pro_de_add_c");//产品详情页面初始化时判断是否登录调用后台展示购物车数量
                    },
                    error: function (data) {
                        tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                    }
                });
            }
            _store();
        }
    };//此对象是商品详情页对应js;
    pro_de_intr.show_img();
    module.exports = pro_de_intr;
});