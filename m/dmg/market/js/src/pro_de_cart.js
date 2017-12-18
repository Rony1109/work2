/**
 * Created by Administrator on 2017-03-11.
 */
define(function (require, exports, module) {
    $.debug = false;
    var ShopCart = require("./shopcart"); //购物车的数据模型
    var shopCart;
    var formatNum = require("./formatNum"); //价格的格式
    var isLogin_stu = require('//api.csc86.com/notify/count/all/?callback=define'); //判断是否登录
    var hostmap=seajs.hostmap;//域名配置
    var dialog=require('layer');//弹框插件
    var tips = function(tip) {
        dialog.open({
            content:tip
            ,skin: 'msg'
            ,time:2 //2秒后自动关闭
        });
        return false;
    };
    var pro_cart = {
        shopping_cart: function () {//购物车
            var $els = {};
            function draw_image(url) {//展示购物车列表数据函数
                if ($.debug || isLogin_stu.status) {
                    $.ajax({
                        url: url,
                        type: "get",
                        dataType: $.debug ? "json" : "jsonp",
                        success: function (data) {
                            $("#_waiting_load").hide();
                            if($.debug? true: data.status==200){
                                var str = "";
                                if (!data.data.shoppingCar || data.data.shoppingCar.length == 0){//如果没有数据或者长度为0时
                                    str ="<img src='//res.csc86.com/v3/shopping_center/market/demo/pro_de_cart_bl.png' alt='' class=' sh_img_max sh_margin_a' style='width: 9.853333rem'/>";//当购物车内容为空时
                                    $("#pro_de_cartContainer").html(str);
                                    _checkAll_show(true);//底部全选按钮等不显示方法
                                    return;
                                }
                                shopCart = new ShopCart(data.data.shoppingCar);
                                shopCart.compIds.forEach(function (compId) {
                                    var comp = shopCart.comps[compId];
                                    str +=
                                        "<div class='pro_de_cartContent sh_bg_color_1'>" +//动态获取内容开始开始
                                        "<div class='sh_clear sh_pd_bottom30 sh_pd_top30 pro_de_cart_title'>" +//公司标题开始区域
                                        "<div class='sh_width_1 sh_float_l sh_lingheight_100 sh_te_align_r sh_font_sz26 sh_positon_r'>" +
                                        "<input type='checkbox' name='tittle_list' class='chkbox-in-list chkbox-comp' data-comp-id='" + compId + "'/>" +//标题复选框
                                        "</div>" +
                                        "<div class='sh_width_11 sh_float_l  sh_font_sz26 '>" +
                                        "<div class='sh_margin_a sh_width_11 sh_lingheight_100'>" + comp.name + "</div>" +
                                        "</div>" +
                                        "</div>";//公司标题结束区域
                                    comp.shangpinIds.forEach(function (spGrpId) {
                                        var spGrp = comp.shangpins[spGrpId];
                                        str += "<div class='pro_de_cart_group'>";//产品详细区域开始
                                        spGrp.ids.forEach(function (spId) {
                                            var sp = spGrp.sameSPs[spId];
                                            var cs = sp.property;
                                            cs = cs ? cs.split(";") : ["", ""];
                                            cs.push("");
                                            var dataStr = "data-detail-id='" + spId + "'data-sp-grp-id='" + spGrpId + "' data-comp-id='" + compId + "'";
                                            str +=
                                                "<div class='sh_clear sh_pd_top30  sh_pd_bottom30 sh_bor_top_1 pro_de_cart_list'>" +
                                                "<div class='sh_width_1 sh_float_l sh_lingheight_100 sh_font_sz28 sh_te_align_r'>" +
                                                "<input  type='checkbox' name='pro_list' class='chkbox-in-list chkbox-shangpin' " + dataStr + "/>" +//产品详细内容复选框
                                                "</div><!--复选框结束-->" +
                                                "<div class='sh_width_11 sh_float_l line'><!--产品详细图片开始-->" +
                                                "<div class='sh_margin_a sh_width_11'>" +
                                                "<div class='sh_clear sh_width_4 sh_float_l sh_lingheight_100  sh_font_sz0 sh_pd_bottom30'>" +
                                                "<a  href='//"+hostmap.test+"/search/product_detail.ftl?productId="+sp.id+"'>"+"<img src='http://img.csc86.com" + sp.image + "' class='pro_de_cart' alt=''/>" +"</a>"+//详细内容图片
                                                "</div>" +//产品详细图片栏结束
                                                "<div class='sh_clear sh_width_8 sh_float_l sh_wor_space  sh_pd_bottom30'>" +
                                                "<div class=' li-ht32 sh_font_sz28'>" +"<a href='//"+hostmap.test+"/search/product_detail.ftl?productId="+sp.id+"' class='sh_font_color5'>"+ sp.name + "</a>"+"</div>" +
                                                "<div class='sh_font_color13 sh_font_sz26 sh_lingheight_100 sh_pd_top10 sh_pd_bottom10 sh_font_color18'><em >￥</em><em class='label-unit-price'>" +formatNum( sp.price.toFixed(2)) + "</em><em></em></div>" +
                                                "<div  class='sh_clear  sh_font_color13 sh_font_sz24 sh_ellipsis pro_de_cart_fi'>" +
                                                "<div class='sh_float_l sh_ellipsis sh_width_4 sh_font_sz24 sh_lingheight_100 sh_pd_top15 sh_pd_bottom15'>购买数量:</div>" +
                                                "<div class=' sh_float_r sh_width_260 sh_pr_hg50 sh_border_radius_5 good_size_zone'>" +
                                                "<div " + dataStr + " class='sh_width_18 sh_float_l sh_pr_hg50  sh_lingheight_48 good_size_min  sh_bor_right_2 disabled sh_tab'>"+"</div>" +
                                                "<input disabled type='number' " + dataStr + " value='" + sp.num + "' class='sh_bg_color_1 input-shangpin-num text_box sh_width_61 sh_font_sz24 sh_te_align_c sh_float_l  sh_pr_hg50 sh_v_middle'/>" +
                                                "<div " + dataStr + " class='sh_width_18 sh_float_l sh_pr_hg50 sh_lingheight_48 good_size_plus  sh_bor_left_2 disabled sh_tab'>"+"</div>" +
                                                "</div>" +
                                                "</div>" +
                                                "</div>" +//数量栏结束
                                                "<div class='sh_clear_sp sh_font_color13 sh_font_sz24 sh_lingheight_100 '>" +
                                                "<div class='sh_ellipsis sh_pd_bottom20'><em>" + cs[0] + "</em>" + "</div>" +
                                                "<div class='sh_float_l sh_width_6 sh_ellipsis'><em>" + cs[1] + "</em></div>" +
                                                "<div class='sh_float_r  sh_width_6 sh_ellipsis sh_te_align_r'><span>总价：</span>" +
                                                "<em class='sh_font_color2'>￥</em>" + "<em class='sh_font_color2 pro_de_cartPl'>" + formatNum(sp.calcTotal().toFixed(2)) + "</em>" +
                                                "</div>" +
                                                "</div>" +//总价栏结束
                                                "</div>" +
                                                "</div>" +//产品详细图片结束
                                                "</div>"
                                        });
                                        str += "</div>";//产品详细区域结束
                                    });
                                    str += "<div class='sh_pr_hg30 sh_bg_color_9'></div>" +//分割区域
                                    "</div>";//动态获取内容开始结束
                                });
                                $("#pro_de_cartContainer").html(str);
                                _checkAll_show(false);//底部全选按钮等显示方法
                                _bindEvents();//整个购物车加载成功之后才能进行事件操作
                                return;
                            }
                        },
                        error: function (xhr, type) {
                            $("#_waiting_load").css("display","block");
                            _checkAll_show(true);//底部全选按钮等不显示方法
                        }
                    });
                } else {//没有登录状态
                    $("#_waiting_load").hide();
                    var blank=
                        '<img src="//res.csc86.com/v3/shopping_center/market/demo/pro_de_cart_nLogin.png" alt="" class="sh_margin_a  sh_img_max" style="width: 9.8rem"/>\
                        <a href="//res.csc86.com/v3/dmg/market/html/login.html">\
                          <img src="//res.csc86.com/v3/shopping_center/market/demo/pro_de_cart_noLoginB.png" alt="" class="sh_margin_a  sh_img_max" style="height:1.1733333rem"/>\
                        </a>';
                    $("#pro_de_cartContainer").html(blank);
                    _checkAll_show(true);//底部全选按钮等不显示方法
                }
            }
            draw_image($.debug ? "../../market/json/pro_de_cart.json" : "//"+hostmap.test+"/carDetail");//渲染页面用函数方法
            function enableEditASp($el, flag) {//点击编辑与完成按钮时数量区域变化方法
                var pars = $el.parentsUntil(".pro_de_cart_group");//产品复选框组
                var classMtd = (flag) ? "removeClass" : "addClass";
                var attrMtd = (flag) ? "removeAttr" : "attr";
                pars.eq(pars.length - 1).find(".good_size_min")[classMtd]("disabled");//第一次加载时数量减号不能进行编辑
                pars.eq(pars.length - 1).find(".good_size_plus")[classMtd]("disabled");//第一次加载时数量加号不能进行编辑
                pars.eq(pars.length - 1).find(".input-shangpin-num")[attrMtd]("disabled", true);//第一次加载时数量框不能进行编辑加入disabled
            }
            function enableEdit(flag) {//编辑与完成按钮切换
                $els.edit.html(flag ? "完成" : "编辑");//传入true则显示完成，否则是编辑
                $els.btnGrp2.css("display", flag ? "block" : "none");//移入收藏夹以及删除
                $els.btnGrp1.css("display", flag ? "none" : "block");//合计及结算按钮
                flag ? $(".good_size_zone").addClass("sh_bor_a_2"):$(".good_size_zone").removeClass("sh_bor_a_2");//数量加减区域是否有边框
                $(".good_size_min ").css("display", flag? "block" : "none");//数量相减区域
                $(".good_size_plus ").css("display", flag? "block" : "none");//数量相加区域
                $els.list.find(".chkbox-shangpin").each(function () {//整个购物车页面产品复选框执行函数
                    enableEditASp($(this), flag);
                });
                if (flag && $els.list.find(".chkbox-shangpin:checked").length){//如果产品复选框有无被选中时执行函数
                    toggleFavDel(true);//合计和计算按钮移入收藏夹以及删除不置灰
                }else{
                    toggleFavDel(false);//合计和计算按钮移入收藏夹以及删除置灰
                }
            }
            function _checkAll_show(type){  //底部全选按钮等是否显示方法
                $("footer").css("display", type ? "none" : "block");
            }
            function toggleFavDel(isEnabled) {//合计和计算按钮置灰与不置灰按钮，//移入收藏夹以及删除置灰与不置灰按钮
                var toggle = isEnabled ? "removeClass" : "addClass";
                $els.btnGrp2[toggle]("disabled");//移入收藏夹以及删除
                $els.btnGrp1[toggle]("disabled");//合计及结算按钮
            }
            function toggleEdit(isEnabled) {//编辑按钮是否可编辑函数
                var toggle = isEnabled ? "removeClass" : "addClass";
                $els.edit[toggle]("disabled");//编辑按钮
            }
            function getSpChkBoxsOfAComp($compChkBox) {//公司复选框组
                var pars = $compChkBox.parentsUntil('#pro_de_cartContainer');//找到传值的祖先元素，但是不包涵所带选择器
                return pars.eq(pars.length - 1).find(".chkbox-shangpin");//找到传值的祖先元素，但是不包涵所带选择器，复选框
            }
            function getElmOfASp($base, searchClass) {//产品复选框组
                var pars = $base.parentsUntil('.pro_de_cart_group');
                return pars.eq(pars.length - 1).find(searchClass);
            }
            function getElmOfASpGrp($base, searchClass) {
                var pars = $base.parentsUntil('.pro_de_cartContent');
                return pars.eq(pars.length - 1).find(searchClass);
            }
            function refreshSpPrice($el, type) {//价格更新方法
                var rslt = shopCart.chgNumFromUI(
                    $el.data("detailId"),
                    $el.data("spGrpId"),
                    $el.data("compId"),
                    type,
                    $el.val && $el.val()
                );
                rslt.err && console.log(rslt.err);
                getElmOfASp($el, ".input-shangpin-num").val(rslt.num);//数量输入框
                var pars = $el.parentsUntil('.pro_de_cartContent');//追溯祖先到整个公司和产品组
                var $grp = pars.eq(pars.length - 1);
                $grp.children().each(function () {
                    if ($(this).find(".chkbox-shangpin:checked").length) {
                        $(this).find(".label-unit-price").text(formatNum(rslt.price.toFixed(2)));
                        $(this).find(".pro_de_cartPl").text(function () {
                            var num = +getElmOfASp($(this), ".input-shangpin-num").val();
                            return formatNum((rslt.price * num).toFixed(2));
                        });
                    } else {
                        var $spCB = $(this).find(".chkbox-shangpin");
                        var sp = shopCart.getShangpin(
                            $spCB.data("detailId"),
                            $spCB.data("spGrpId"),
                            $spCB.data("compId")
                        );
                        $(this).find(".label-unit-price").text(formatNum(sp.price.toFixed(2)));
                        $(this).find(".pro_de_cartPl").text(formatNum((sp.price * sp.num).toFixed(2)));
                    }
                });
                $els.totalPrice.text(formatNum(shopCart.calcTotal().toFixed(2)));//合计总价
            }
            function updateTotalPrice() {//跟新结算价格以及数量
                $els.totalPrice.text(formatNum(shopCart.calcTotal().toFixed(2)));//合计总价
                $els.selectedNum.text(shopCart.SpSelcNum);//结算数量
                shopCart.SpSelcNum==0 && $els.chkAll.prop("checked", false);
            }
            function _bindEvents() {
                $els.totalPrice = $("#pro_de_totalprice");//合计总价
                $els.selectedNum = $("#pro_de_cartNum");//结算数量
                $els.list = $("#pro_de_cartContainer");//购物车整个页面
                $els.addFavr = $("#pro_de_cartSto");//移入收藏夹
                $els.delete = $("#pro_de_cartDe");//删除键
                $els.pay = $("#pay_money");//结算键
                $els.btnGrp1 = $(".pro_de_cartShow");//合计和结算按钮
                $els.btnGrp2 = $(".pro_de_cartOp");//移入收藏夹以及删除
                $els.edit = $("#edit-btn");//编辑按钮
                $els.chkAll = $(".check-all").on('click',function () {//全选按钮
                    $els.list.find(".chkbox-shangpin" + (this.checked ? ":not(:checked)" : ":checked")).trigger("click");//购物车整个页面下筛选产品复选框，判断产品复选框选中与不选中
                });
                $els.list.find(".chkbox-shangpin").on('click',function () {//整个页面下面产品旁复选框点击时
                    var el = $(this), compId = el.data("compId");//公司id
                    var spGrpId = el.data("spGrpId");//product_id
                    var spId = el.data("detailId");//detail_id
                    shopCart.clickAShangpinChk(spId, spGrpId, compId, this.checked);//
                    var pars = el.parentsUntil('#pro_de_cartContainer');
                    pars.eq(pars.length - 1).find(".chkbox-comp").prop("checked", shopCart.comps[compId].chkNum == shopCart.comps[compId].shangpinIds.length);
                    $els.chkAll.prop("checked", (shopCart.chkNum == shopCart.compIds.length));
                    refreshSpPrice(getElmOfASp($(this), ".input-shangpin-num"), "click-spchkbox");
                    toggleFavDel(!!shopCart.SpSelcNum);
                });
                $els.list.find(".chkbox-comp").on('click',function () {//选中公司名称时执行函数
                    var el = $(this), compId = el.data("compId");//获取公司id
                    getSpChkBoxsOfAComp(el).filter(this.checked ? ":not(:checked)" : ":checked").trigger("click");//filter匹配元素集合缩减

                });
                $els.list.find(".chkbox-in-list").on('click',function () {//整个页面下面产品旁复选框点击时，除非全选按钮
                    updateTotalPrice();
                });
                $els.list.find(".input-shangpin-num").change( function () {//当产品数量改变时
                    refreshSpPrice($(this), "input-change");
                });
                $els.list.find(".good_size_min").on('click',function () {//数量减法
                    if ($(this).hasClass("disabled")) return;
                    refreshSpPrice($(this), $(this).hasClass("good_size_plus") ? "+1" : "-1");
                });
                $els.list.find(".good_size_plus").on('click',function () {//数量加法
                    if ($(this).hasClass("disabled")) return;
                    refreshSpPrice($(this), $(this).hasClass("good_size_plus") ? "+1" : "-1");
                });
                $els.edit.on('click',function () {//修改数量功能点击完成
                    if (shopCart.isEditing) {//刚加载完成时为false
                        //debugger;
                        var shangpinCBs = $els.list.find(".chkbox-shangpin");
                        var params = [];
                        shangpinCBs.each(function () {
                            var sp = shopCart.comps[$(this).data("compId")].shangpins[$(this).data("spGrpId")].sameSPs[$(this).data("detailId")];
                            params.push({lineId: sp.detailId, quantity: sp.num});
                        });
                        $.post("//"+hostmap.test+"/batchUpdateCarQuantity",{"productDetailList":params}, function(data) {
                            if(data.status==200){
                                shopCart.isEditing = false;
                                enableEdit(false);
                                location.reload();
                            }
                        },"jsonp");
                    } else {//刚加载完成时为false，执行该流程
                        shopCart.isEditing = true;
                        enableEdit(true);
                    }
                });
                $els.addFavr.on('click',function () {//移入收藏夹功能
                    addFavOrDel1.call(this, $.debug ? "../../market/json/pro_de_cart.json" : "//"+hostmap.test+"/batchMoveToFavorites");
                });
                $els.delete.on('click',function () {//购物车删除功能
                    addFavOrDel1.call(this, $.debug ? "../../market/json/pro_de_cart.json" : "//"+hostmap.test+"/deleteCarLine", "delete");
                });
                $els.pay.on('click',function (){//购物车结算功能
                    if ($(this).hasClass("disabled")) return;
                    $(".popup_cover").show().css("z-index","9999");
                    var shangpinCBs = $els.list.find(".chkbox-shangpin:checked");
                    var params,params2;
                    var delarr = [],delarr2=[];
                    shangpinCBs.each(function (){
                        var sp = shopCart.comps[$(this).data("compId")].shangpins[$(this).data("spGrpId")].sameSPs[$(this).data("detailId")];
                        delarr.push(sp.detailId);
                        delarr2.push({"productId":sp.id,"price":sp.price,"quantity":sp._num});
                    });
                    enableEdit(false);
                    toggleEdit(false);
                    params={"lineId":delarr.join(","),"totalMoney": $els.totalPrice.text()};
                    params2={data:delarr2};
                    $.post("//"+hostmap.test+"/order/confirmOrder",params, function(data) {
                        if(data.status==100){
                            var datasobj=cscStatis.setParamkeys(params2,"pr",{"format":{"quantity":"qt","price":"pr","productId":"id"}});
                            var newsobj=cscStatis.obj2extend(datasobj,{"eventAction":"settlement","hitType": "event"});
                            cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t"}}).send({"Tracer": "settlementTracker"});
                            enableEdit(true);
                            toggleEdit(true);
                            $("input[type=checkbox]").prop("checked", false);
                            window.location.href="//res.csc86.com/v3/dmg/market/html/con_order.html?pageId=2&token="+data.data.confirmOrder
                        }else{
                            enableEdit(false);
                            toggleEdit(false)
                            $(".popup_cover").hide();
                            tips("<label class='sh_font_sz32'>+data.msg+</label>");
                        }
                    },"jsonp");
                });
            }
            // 数组格式
            function addFavOrDel1(url, type) {//购物车删除功能，移入收藏夹功能，完成功能
                if ($(this).hasClass("disabled")) return;
                var shangpinCBs = $els.list.find(".chkbox-shangpin:checked");
                var params;
                var delarr = [], favarr = [],favarr2 = [];
                shangpinCBs.each(function (){
                    var sp = shopCart.comps[$(this).data("compId")].shangpins[$(this).data("spGrpId")].sameSPs[$(this).data("detailId")];
                    favarr.push({
                        lineId: sp.detailId,//详细id
                        productId:sp.id,//产品id
                        shopId: sp.sellerId//卖家id
                    });
                    favarr2.push({
                        quantity: sp._num,//产品数量
                        productId:sp.id,//产品id
                        price: sp.price//卖家id
                    });
                    delarr.push(sp.detailId);
                });
                switch (type) {
                    case "delete":
                        params={"lineIds":delarr.join(",")};//删除功能
                        break;
                    default:
                        params={"favoritesList":favarr};//移入收藏夹
                        break;
                }
                var params2={"favoritesList":favarr2};

                $.ajax({
                    url: url,
                    type: $.debug ? "get" : "post",
                    contentType: "application/json; charset=utf-8",
                    dataType: $.debug ? "json" : "jsonp",
                    data:params,
                    success: function (data) {
                        if (data.status==200) {
                            switch (type) {
                                case "delete":
                                    var newsparams=cscStatis.setParamkeys(params2,"pr",{"format":{"price":"pr","productId":"id","quantity":"qt"}});
                                    var newsobj=cscStatis.obj2extend(newsparams,{"eventAction":"removeCartSuccess","hitType": "event"});
                                    cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t"}}).send({"Tracer": "removeCartSuccessTracker"});
                                    break;
                                default:
                                    var newsparams=cscStatis.setParamkeys(params2,"pr",{"format":{"price":"pr","productId":"id","quantity":"qt"}});
                                    var newsobj=cscStatis.obj2extend(newsparams,{"eventAction":"moveToFavSuccess","hitType": "event"});
                                    cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t"}}).send({"Tracer": "moveToFavSuccessTracker"});
                                    break;
                            }
                            shopCart.isEditing = false;
                            toggleFavDel(false);
                            shangpinCBs.each(function () {
                                shopCart.removeAShangpin(
                                    $(this).data("detailId"),
                                    $(this).data("spGrpId"),
                                    $(this).data("compId")
                                );
                                $(this).parentsUntil('.pro_de_cart_group').remove();
                            });
                            var compCBs = $els.list.find(".chkbox-comp:checked");
                            compCBs.each(function () {
                                $(this).parentsUntil('#pro_de_cartContainer').remove();
                            });
                            updateTotalPrice();
                            if(shopCart.compIds.length==0){
                                var result="";
                                result ="<img src='//res.csc86.com/v3/shopping_center/market/demo/pro_de_cart_bl.png' alt='' class=' sh_width_12 sh_margin_a' style='width: 9.853333rem'/>";//如果没有数据或者长度为0时
                                $("#pro_de_cartContainer").html(result);
                                _checkAll_show(true);
                                enableEdit(false);
                                return;
                            }
                        }
                    },
                    error: function (xhr, type) {
                        console.log('Ajax error!');
                    }
                });
            }

        }
    };
    pro_cart.shopping_cart();
});