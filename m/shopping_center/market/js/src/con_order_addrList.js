define(function(require, exports, module) {
    $.debug = false;
    var addrList_show_del=require('./addrList_show_del');
    var hostmap=seajs.hostmap;//域名配置
    var con_order_addrList={//地址列表
       addrList_init:function(){
               $(".addr_list_plusPar").on('click',function(){//新建地址跳转
                   window.location.href="../../market/html/con_order_ediAddr.html"
               });
               if($.debug||location.pathname==="/v3/shopping_center/market/html/con_order_addrList.html"||location.pathname==="/v3/shopping_center/market/html/con_order_addrListPre.html"){
                   addrList_show_del.call(this, $.debug ? "../../market/json/addr_list.json" : "//" + hostmap.test + "/order/loadMemAddressList","_addr_list",".addr_list_cont",null,"post");//测试用加载地址列表
               }
           //以上是地址列表删除、新增功能、展示地址列表数据函数
       }
    };
    con_order_addrList.addrList_init();
});