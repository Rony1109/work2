/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({
    alias: {
        'login':'c2/ucenter/js/login.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'dialog':'m/dialog/js/init.js'
    }
});

define(function(require, exports, module) {
    var login=require('login');
    var dialog=require('dialog');
    var topic={
        //登录后修改顶部导航为登录后的相关信息
        hasLoginTop:function(m){
            var $topNav=$('.top_nav'),
                $jGuest=$topNav.find('.J_guest'),
                $jMember=$topNav.find('.J_member'),
                $hyzxsp=$topNav.find('.hyzxsp'),
                $hyzxMenu=$hyzxsp.find('.dorp_menu'),
                ucUrl='//i.csc86.com',
                sallerHtml='<div class="right after">'
                    +'<p class="title">卖家中心</p>'
                    +'<ul>'
                    +'<li><a href="https://i.csc86.com/seller/sellerOrders" target="_blank">已卖出货物</a></li>'
                    +'<li><a href="http://member.csc86.com/product/sell.html" target="_blank">发布产品</a></li>'
                    +'<li><a href="http://member.csc86.com/product/sell/list.html" target="_blank">管理产品</a></li>'
                    +'<li><a href="http://member.csc86.com/shop/shopinfo.html" target="_blank">我的旺铺</a></li>'
                    +'</ul>'
                    +'</div>';
            if(!$hyzxMenu.find('.right')[0]&&m.data.userkinds=='GY'){
                console.log(1);
                ucUrl='//i.csc86.com/#mem_Seller';
                $hyzxsp.find('.navhover').attr('href',ucUrl);
                $hyzxMenu.append(sallerHtml);
                $hyzxMenu.width(160);
                $hyzxMenu.find('.right').show();
            }
            $jGuest.addClass('g-dn');
        },
        dialogs:function(circleId){
            dialog({
                id: circleId,
                title: '',
                fixed: true,
                lock: true,
                background: "#000",
                opacity: "0.3",
                content: $("#" + circleId).html(),
                init:function() {

                }
            });
        },
        init:function(){
            $('#zhibohg').find('li').on('click',function(){
                var $this=$(this).index();

                topic.dialogs('vedio'+ $this,true,null);
            })
           //topic.dialogs()

        }
    }
    topic.init();
});
