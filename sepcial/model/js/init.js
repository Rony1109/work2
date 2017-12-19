/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({
    alias: {
        'top': 'c2/newcgsc/js/newtop.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'login':'c2/ucenter/js/login.js'
    }
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
    var login=require('login');
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
            $jMember.removeClass('g-dn').html('您好， <a class="g-e username" href="'+ucUrl+'" target="_blank">' + m.data.username + ' ！</a><a href="//i.csc86.com/user/message" target="_blank"><span class="usermsg">消息</span><span class="msg">' + m.data.message+'</span></a><i class="v-line">|</i><a href="//login.csc86.com/signout" class="top-signout">退出</a><i class="v-line">|</i>');
        },
        init:function(){
            /*弹窗登录demo*/
            $('.jsPopLogin').on('click',function(){
                var $this=$(this);
                /*
                 * 先判断是否登录
                 * */
                $.get("//login.csc86.com/islogin/ajax",function (data){
                    if(data.status){
                        //当页面一进来就已经登录时 执行的代码()
                        location.href='//i.csc86.com';
                    }else{
                        //当页面一进来未登录时 显示弹窗登录页面（下面的代码为登录后不刷新页面的情况）
                        login.showPop({
                            isPop:true,
                            isrefresh:false,
                            callback:function(data){
                                //回调函数
                                topic.hasLoginTop(data);

                                $this.html('您已经登录，再次点击我进入会员中心');
                            }
                        });

                        //当页面一进来未登录时 显示弹窗登录页面（以下注释代码为登录后刷新页面的情况）
                        /*login.showPop({
                         isPop:true,
                         isrefresh:true
                         });*/

                    }
                },"jsonp");
            });
        }
    }
    topic.init();
});
