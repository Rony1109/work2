/*
* 获取登录状态
* 弹窗登录后不刷新页面修改登录后的页面相关信息
* */
define(function(require, exports, module){
    var loginJs=require('loginJs');//获取登录相关js(弹窗和非弹窗)
    //获取登录后的信息
    var hasLoginInfo={
        //显示登录后的顶部
        hasLoginTop:function(data){
            var $topSign=$('.top-sign');
            var $mycnt=$('.jsTopMycnt');
            var $mycntHd=$mycnt.find('.hd');
            var $mycntBd=$mycnt.find('.bd');
            var html1='您好，<span><a id="J_signEd" href="http://member.csc86.com" target="_blank" rel="nofollow" data-memberid="'+data.data.id+'">'+data.data.username+'</a>！消息<a class="top-msg-num" href="http://member.csc86.com/membercenter/messageall/" target="_blank" rel="nofollow"><em class="msg">'+data.data.message+'</em></a><i class="sprt">|</i><a href="https://login.csc86.com/signout" rel="nofollow">退出</a><i class="sprt">|</i></span>';

            var html2='<div class="g-fr mycnt-itm2"><h2>卖家中心</h2><ul><li><a href="//i.csc86.com/seller/sellerOrders" target="_blank" rel="nofollow">已卖出货物</a></li><li><a href="//member.csc86.com/product/sell.html" target="_blank" rel="nofollow">发布产品</a></li><li><a href="//member.csc86.com/product/sell/list.html" target="_blank" rel="nofollow">管理产品</a></li><li><a href="//member.csc86.com/shop/shopinfo.html" target="_blank" rel="nofollow">我的旺铺</a></li></ul></div>';
            $topSign.html(html1);
            $mycntBd.width(62);
            if(!$mycntBd.find('.mycnt-itm2')[0]&&data.data.userkinds=='GY'){
                $mycntHd.find('a').attr('href','//i.csc86.com/#mem_Seller');
                $mycntBd.append(html2);
                $mycntBd.width(160);
            }
        },
        //弹窗登录及登录后显示各信息
        loginInfo:function(){
            loginJs.showPop({
                callback:function(data){
                    hasLoginInfo.hasLoginTop(data);
                    $('input[type=hidden][name=buyerId]').val(data.data.id);
                }
            });
        }
    };
    module.exports=hasLoginInfo;
});