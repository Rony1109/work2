$(function(){

    //利用fastclick解决点击延时300MS的问题,以下为将fastclick初始化在body元素上，这样body下面的所有需要点击的元素可以直接用click事件，主要初始化必须在dom ready后初始化
    new FastClick(document.body);

    //选择器
    var $ztDialog=$('.zt-dialog');
    $dialogLoading=$ztDialog.find('.loading'),
        $yhqDialog1=$('.yhq-dialog1'),
        $yhqDialog2=$('.yhq-dialog2'),
        $yhqDialog3=$('.yhq-dialog3'),
        $xrzxjDialog1=$('.xrzxj-dialog1'),
        $xrzxjDialog2=$('.xrzxj-dialog2'),
        $xrzxjDialog3=$('.xrzxj-dialog3');

    //解决遮罩层跟着滚动的问题，同时阻止遮罩层下面的内容滚动
    $('.zt-dialog').on('touchmove',function(e){
        e.preventDefault();
    });

    //对含有data-href的a标签执行click事件跳入对应的页面
    $('body').on('click','a[data-href]',function(e){
        e.preventDefault();
        location.href=$(this).data('href');
    });

    //关闭弹窗
    $ztDialog.find('.close').on('click',function(){
        var $this=$(this),
            $parent=$this.parent();
        $parent.hide();
        $ztDialog.css('visibility','hidden');
    });
    $('.jsDialogOk').on('click',function(){
        var $this=$(this),
            $parent=$this.parents('.yhq-dialog3');
        $parent.hide();
        $ztDialog.css('visibility','hidden');
    });

    //点击获取优惠券
    $('.nav .itm1').on('click',function(){
        $ztDialog.css('visibility','visible');
        $dialogLoading.show();
        $.get("//api.csc86.com/Couponscg/index",{couponId:'20170302001'},function (data){
            $dialogLoading.hide();
            if(data.status){
                var code=data.data.Code;
                if(code==="1"){
                    $yhqDialog2.show();
                }
                else if(code==="3"){
                    $yhqDialog3.find('.p1').html('对不起，该优惠券只向新人发放！');
                    $yhqDialog3.show();
                }else{
                    $yhqDialog3.find('.p1').html(data.data.Msg);
                    $yhqDialog3.show();
                }
            }else {
                $yhqDialog1.show();
            }
        },"jsonp");
    });

    //点击新人专享价
    $('.nav .itm3').on('click',function(){
        var top=$('.xrzxj').offset().top;
        $(window).scrollTop(top);
    });

    //秒杀tab切换
    $('.kbms-tab li').on('click',function(){
        var $this=$(this),
            index=$('.kbms-tab li').index(this);
        $this.addClass('cur').siblings().removeClass('cur');
        $('.kbms-list').eq(index).addClass('kbms-list-cur').siblings('.kbms-list').removeClass('kbms-list-cur');
    });

    //点击获取新人价
    $('.jsGetPrc').on('click',function(){
        var $this=$(this);
        var price=$this.data('price');
        var url=$this.data('url');
        $ztDialog.css('visibility','visible');
        $dialogLoading.show();
        $.get("//api.csc86.com/zhuanti/getpurchase",function (data){
            $dialogLoading.hide();
            if(data.status){
                $xrzxjDialog2.find('.bd .g-tl').html('新人专享价仅适用于首次在平台购进货的买家');
                $xrzxjDialog2.show();
            }else {
                if(data.No===-1){
                    $xrzxjDialog3.show();
                }
                else if(data.No===0){
                    $xrzxjDialog1.find('.prc').html(price+'<span>RMB</span>');
                    $xrzxjDialog1.find('.opts a').attr('data-href',url);
                    $xrzxjDialog1.show();
                }
                else{
                    $xrzxjDialog2.find('.bd .g-tl').html('系统异常，请稍后重试！');
                    $xrzxjDialog2.show();
                }
            }
        },"jsonp");
    });

});

