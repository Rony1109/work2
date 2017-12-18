define(function(require, exports, module) {
    $.debug=false;
    var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');//加载登录接口
    var dialog=require('layer');//弹框插件
    $.debug=false;
    var hostmap=seajs.hostmap;//域名配置
    var tips = function(tip) {//提示弹框
        dialog.open({
            content:tip
            ,skin: 'msg'
            ,time:2 //2秒后自动关闭
        });
        return false;
    };
    var _url_type=require('./url_express')(window.location.href).params.pageId;//获取url参数
    var _url_token=require('./url_express')(window.location.href).params.token;//获取url参数
    function changeDefault(){//改变地址默认值
        $(this).data("address");
        $.post("//" + hostmap.test + "/order/updateDefaultAddress",{"addressId":$(this).data("address")}, function(data) {
            if(data.status==100&&(data.data.updateDefaultAddress)){
                window.location.href="http://res.csc86.com/v3/shopping_center/market/html/con_order.html?pageId="+_url_type+"&token="+_url_token;
            }
        },"jsonp");
    }
    $(".con_order_addrListPreBack").on('click',function(){//收货地址裂变页面如果是从确认订单页面前来，点击后退按钮退还到确认订单页面
        window.location.href="http://res.csc86.com/v3/shopping_center/market/html/con_order.html?pageId="+_url_type+"&token="+_url_token;
    });
    function addrList_show_del(url, type,container,param,meth, updateStoreFn) {//地址列表删除、新增功能、展示地址列表数据函数
        var params,method;
        switch (type) {
            case "_addr_list"://获取收货地址列表
                params=param;
                method=meth;
                break;
            case "edi_addr_saveBtn"://新建新地址
                params=param;
                method=meth;
                break;
            case "edit_addr_dust"://根据地址id删除详细地址
                params=param;
                method=meth;
                break;
            case "edit_addr_correct"://根据地址id编辑详细地址
                params=param;
                method=meth;
                break;
            case "edit_addr_getDetail"://根据地址id获取详细地址
                params=param;
                method=meth;
                break;
            default:
                params={"favoritesList":favarr};
                break;
        }
        if ($.debug ||isLogin.status) {
            $.ajax({
                url: url,
                type:$.debug ? "get" : method,
                contentType: "application/json; charset=utf-8",
                dataType: $.debug ? "json" : "jsonp",
                data:params,
                success: function (data) {
                    if(type=="_addr_list"){  //获取收获地址列表
                        $(".popup_cover").css("display","none");
                        if($.debug? true: data.status==100){
                            var str="";
                            if(data.data.loadMemAddressList.length>0&& $.isArray(data.data.loadMemAddressList)){
                                for(var i= 0,len=data.data.loadMemAddressList.length;i<len;i++){
                                    str+=
                                        "<div class='sh_clear  sh_bor_bottom_1'>"+
                                            "<div class='sh_clear sh_width_92 sh_margin_a sh_pd_top40 sh_pd_bottom40 sh_box-sizing_C'>"+
                                                "<dl class='sh_clear sh_width_11 sh_float_l sh_bor_right_1 sh_box-sizing_C addr_list_det' data-address='"+data.data.loadMemAddressList[i].addressId+"'>"+
                                                    "<dt class='sh_clear sh_font_sz30 sh_font_color5'>"+
                                                        "<span class='sh_width_5 sh_float_l sh_lingheight_100'>"+data.data.loadMemAddressList[i].consignee+"</span>"+
                                                        "<span class=' sh_width_7 sh_float_l sh_te_align_c sh_lingheight_100'>"+data.data.loadMemAddressList[i].mobile+"</span>"+
                                                    "</dt>"+
                                                    "<dt class=' sh_font_sz28 sh_font_color13 sh_pd_top20 li-ht32 sh_box-sizing_C index_img_alter addr_list_detInner'>"+data.data.loadMemAddressList[i].provinceName+data.data.loadMemAddressList[i].cityName+data.data.loadMemAddressList[i].districtName+data.data.loadMemAddressList[i].address+"</dt>"+
                                                "</dl>"+
                                                "<a href='//res.csc86.com/v3/shopping_center/market/html/con_order_ediAddr.html?addressId="+data.data.loadMemAddressList[i].addressId+"'>"+
                                                    "<dl class='sh_clear sh_width_1 sh_float_l sh_box-sizing_C sh_te_align_r addr_list_wri sh_font_sz0 flexbox-center flexbox-middle flexbox'>"+
                                                        "<dt>"+
                                                            "<img src='//res.csc86.com/v3/shopping_center/market/demo/addr_list.png' alt=''  class='addr_list'/>"+
                                                         "</dt>"+
                                                     "</dl>"+
                                                "<a/>"+
                                            "</div>"+
                                        "</div>"
                                }
                                str+="<div class='sh_pr_hg100'></div>";
                                $(container).html(str);
                                if(window.location.pathname!="/v3/shopping_center/market/html/con_order_addrList.html"){//如果来源页面是从确认订单页面则可以更换地址否则不能更改地址
                                     $(".addr_list_det").on('click',changeDefault)
                                }else{
                                    $(".addr_list_det").off('click',changeDefault)
                                }
                            }
                        }else if($.debug? true: data.status==101){
                            $("body,html").css("background-color","#eeeeee");
                            $(container).html("<img src='//res.csc86.com/v3/shopping_center/market/demo/addr_noList.png' alt='' class='sh_img_max'/>");
                        }else{
                            tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                        }
                    }
                    if(type=="edi_addr_saveBtn"){ //新建地址按钮
                        if(data.status==100){
                            tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                            window.location.href=document.referrer;//新建地址成功后返回到历史页面
                        }else{
                            tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                        }
                    }
                    if(type=="edit_addr_correct"){ //修改地址按钮
                        if(data.status==100){
                            if(data.data.updateAddress){
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                updateStoreFn();
                                window.location.href=document.referrer;//修改地址成功后返回到历史页面
                            }
                        }else{
                            tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                        }
                    }
                    if(type=="edit_addr_dust"){//删除地址
                        if(data.status==100){
                            if(data.data.deleteAddress){
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                window.location.href=document.referrer;//删除地址成功后返回到历史页面

                            }
                        }
                    }
                    if(type=="edit_addr_getDetail"){//获取地址详细
                        $("#_waiting_load").css("display","none");
                        if(data.status==100){
                            if(data.hasOwnProperty('data')){
                                if(data.data.hasOwnProperty('loadAddressDetail')){
                                    var _res_data=data.data.loadAddressDetail;
                                    $("#_add_list_getPers").val(_res_data.consignee);
                                    $("#_add_list_phone").val(_res_data.mobile);
                                    updateStoreFn(_res_data);
                                    $("#_add_list_pla").val(_res_data.provinceName+","+_res_data.cityName+","+_res_data.districtName);
                                    $("#_add_list_plaDetail").val(_res_data.address);
                                }
                            }
                        }
                    }
                },
                error: function (xhr, type){
                    tips("<label class='sh_font_sz32'>后台程序报错</label>");
                }
            });
        }else{
            window.location.href="//res.csc86.com/f=v3/shopping_center/market/html/login.html"
        }

    }
    module.exports =addrList_show_del;
});