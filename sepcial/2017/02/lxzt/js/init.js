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
    //require('placeholder');
    var login=require('login');
    var isSubmit=false;
    var $yhqDialog=$('.yhq-dialog');
    var $yhqDialogLogin=$('.yhq-dialog-login');
    var $yhqDialogSorry=$('.yhq-dialog-sorry');
    var $yhqDialogSuc=$('.yhq-dialog-success');
    var $yhqDialogError=$('.yhq-dialog-error');

    //点击获取优惠券
    $('.jsLqYhq').on('click',function(){
        if(isSubmit===true){return false;}//阻止表单重复提交
        isSubmit=true;
        $.get("//api.csc86.com/Couponscg/index",{couponId:'20170302001'},function (data){
            if(data.status){
                var code=data.data.Code;
                if(code==="1"){
                    $yhqDialog.show();
                    $yhqDialogSuc.show();
                }
                else if(code==="3"){
                    $yhqDialog.show();
                    $yhqDialogSorry.show();
                }else{
                    $yhqDialog.show();
                    $yhqDialogError.show();
                    $yhqDialogError.find('.bd').html(data.data.msg);
                }
            }else {
                $yhqDialog.show();
                $yhqDialogLogin.show();
                $('.jsYhqLoginOpt').on('click',function(){
                    login.showPop({
                        isPop:true,
                        isrefresh:true
                    });
                    return false;
                });
            }
            isSubmit=false;
        },"jsonp");
        return false;
    });

    //关闭优惠券相关的弹窗
    $('.yhq-dialog .close,.jsYhqQrOpt,.jsYhqLjsy').on('click',function(){
        var $this=$(this);
        var $parent=$this.parents('.yhq-dialog-bd:first');
        $yhqDialog.hide();
        $parent.hide();
    });

    $('.msyg-tab li .bd').hover(function(){
        var index=$('.msyg-tab li .bd').index(this);
        var $msyg=$('.msyg');
        if(index==1){
            $msyg.addClass('msyg-cur2');
        }else{
            $msyg.removeClass('msyg-cur2');
        }
    });

    $('.xrzx-list .get-zxj').on('click',function(){
        if(isSubmit===true){return false;}//阻止表单重复提交
        isSubmit=true;
        var $this=$(this);
        var $li=$this.parent();
        var $xrzxLogin=$li.find('.xrzx-login');
        var $xrzxFail=$li.find('.xrzx-fail');
        var $xrzxPrc=$li.find('.xrzx-prc');

        $this.html('正在获取新人专享价,请稍等...').css('background-color','#999');
        $.get("//api.csc86.com/zhuanti/getpurchase",function (data){
             if(data.status){
                 $xrzxFail.find('.bd p').html('新人专享价仅适用于首次在平台购进货的买家');
                 $xrzxFail.show();
             }else {
                 if(data.No===-1){
                     $xrzxLogin.show();
                     $xrzxLogin.find('.login-opt').on('click',function(){
                         login.showPop({
                             isPop:true,
                             isrefresh:true
                         });
                         return false;
                     });
                 }
                 else if(data.No===0){
                     $xrzxPrc.show();
                 }
                 else{
                     $xrzxFail.find('.bd p').html('系统异常，请稍后重试！');
                     $xrzxFail.show();
                 }
            }
            $this.html('点击获取新人专享价').css('background-color','#0389de');
            isSubmit=false;
         },"jsonp");
        /*$.get("//login.csc86.com/islogin/ajax",function (data){
            if(data.status){
                //当页面一进来就已经登录时 执行的代码()

            }else {
                $xrzxLogin.show();
                $xrzxLogin.find('.login-opt').on('click',function(){
                    login.showPop({
                        isPop:true,
                        isrefresh:true
                    });
                    return false;
                });
            }
        },"jsonp");*/
        return false;
    })

    $('.xrzx-list li').on('mouseleave',function(){
        var $this=$(this);
        $this.find('.msk:visible').hide();
    });

});
