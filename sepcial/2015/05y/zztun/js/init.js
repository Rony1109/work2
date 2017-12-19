/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },

    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */


    (function mscroll(id, limit) {
        var $focusNext = $(id);
        var $focusUl = $focusNext.find('ul');
        var $focusLi = $focusUl.find('li');
        var itemWidth = $focusLi.outerWidth(true);
        var width = itemWidth * $focusLi.length;
        var onceWidth = itemWidth * limit;
        if ($focusLi.length > limit) {
            $focusNext.find('a.prev').addClass('dis');
            $focusNext.on('click', 'a.prev:not(.dis)', function(event) {
                event.preventDefault();
                if ($focusUl.is(':animated')) return;
                var mL = parseInt($focusUl.css('marginLeft'), 10);
                if ((mL + onceWidth) < 0) {
                    $focusUl.animate({
                        marginLeft: '+=' + onceWidth
                    }, function() {
                        $focusNext.find('a.next').removeClass('dis');
                        if (parseInt($focusUl.css('marginLeft'), 10) === 0) {
                            $focusNext.find('a.prev').addClass('dis');
                        }
                    });
                } else {
                    $focusUl.animate({
                        marginLeft: '+=' + (0 - mL)
                    }, function() {
                        $focusNext.find('a.prev').addClass('dis');
                        $focusNext.find('a.next').removeClass('dis');
                    });
                }
            }).on('click', 'a.next:not(.dis)', function(event) {
                event.preventDefault();
                if ($focusUl.is(':animated')) return;
                var mL = parseInt($focusUl.css('marginLeft'), 10);
                var mW = width + mL - onceWidth;
                if (mW > onceWidth) {
                    $focusUl.animate({
                        marginLeft: '-=' + onceWidth
                    }, function() {
                        $focusNext.find('a.prev').removeClass('dis');
                        if (onceWidth - parseInt($focusUl.css('marginLeft'), 10) === width) {
                            $focusNext.find('a.next').addClass('dis');
                        }
                    });
                } else {
                    $focusUl.animate({
                        marginLeft: '-=' + mW
                    }, function() {
                        $focusNext.find('a.prev').removeClass('dis');
                        $focusNext.find('a.next').addClass('dis');
                    });
                }
            });
        } else {
            $focusNext.find('a.prev,a.next').remove();
        }
    }('.dfy',4));


    var $disBg = $('.dis-bg');
    var $product = $('.product');
    var $form = $('.time-form');
    var $success = $('.success');
    var $count = $('.count-wrap');
    var $busBd = $('.free-bus-bd');

    $('.box-bd').on('click','.J_y',function(event){
        event.preventDefault();
        var html = $(this).parents('li').find('.for-pop').html();
        $product.find('.bd').html(html).find('.info-wrap').append(
        '           <form action="http://jiancai.csc86.com/api.php">'+
        '        <input type="hidden" name="op" value="special">'+
        '        <input type="hidden" name="act" value="joinActivity">'+
        '    <input type="text" placeholder="请输入手机号码" name="mobile" maxlength="11"><button>免费报名</button>'+
        '    </form>');

        $product.removeClass('g-dn');
        $disBg.removeClass('g-dn');
    });

    $product.on('click','.close',function(event){
        event.preventDefault();
        $product.addClass('g-dn');
        $disBg.addClass('g-dn');
    });

    $success.on('click','.back',function(event){
        event.preventDefault();
        $success.addClass('g-dn');
        $disBg.addClass('g-dn');
    });


function getCount(){
    $.post('http://jiancai.csc86.com/api.php?op=special&act=joinNumber',function(res){
        if(res.status === '0'){
            $count.html('已报 <strong class="g-fs30">'+res.data+'</strong> 人');
        }else{
            $count.text('加载失败');
        }
    },'jsonp');
}
    function showSuccess(){
        $product.addClass('g-dn');
        $success.removeClass('g-dn');
        $disBg.removeClass('g-dn');
    }


    $form.on('submit',function(event){
        event.preventDefault();

        if($form.data('submit')){
            return;
        }


        var $name = $form.find('[name="name"]');
        var $mobile = $form.find('[name="mobile"]');
        var $address = $form.find('[name="address"]');
        var name = $name.val();
        var mobile = $mobile.val();
        var address = $address.val();

        if(!!name && !/^[\u2E80-\u9FFF]{2,4}$/.test(name)){
            alert('您的姓名输入有误，请重新输入');
            $name.trigger('focus');
            return;
        }
        if(mobile === ''){
            alert('手机号码不能为空');
            $mobile.trigger('focus');
            return;
        }
        if(!!mobile & !/^1\d{10}$/.test(mobile)){
            alert('手机号码输入有误，请重新输入');
            $mobile.trigger('focus');
            return;
        }
        $form.data('submit',true);

        $.post($form.attr('action'),$form.serializeArray(),function(res){
            $form.data('submit',false);
            if(res.status === '0'){
                showSuccess();
                getCount();
                return;
            }
            alert(res.msg);
        },'jsonp');
    });

    $('.product').on('submit','form',function(event){
        event.preventDefault();
        var $form = $(this);
        if($form.data('submit')){
            return;
        }


        var $mobile = $form.find('[name="mobile"]');
        var mobile = $mobile.val();

        if(mobile === ''){
            alert('手机号码不能为空');
            $mobile.trigger('focus');
            return;
        }
        if(!!mobile & !/^1\d{10}$/.test(mobile)){
            alert('手机号码输入有误，请重新输入');
            $mobile.trigger('focus');
            return;
        }
        $form.data('submit',true);

        $.post($form.attr('action'),$form.serializeArray(),function(res){
            $form.data('submit',false);
            if(res.status === '0'){
                showSuccess();
                getCount();
                return;
            }
            alert(res.msg);
        },'jsonp');
    });
    getCount();

    $('div.banner').find('div.g-o').prepend('<div class="g-fr g-comment-share" style="width:160px"><div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_t163" data-cmd="t163" title="分享到网易微博"></a></div><script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName(\'head\')[0]||body).appendChild(createElement(\'script\')).src=\'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=\'+~(-new Date()/36e5)];</script></div>');

    $('.free-bus-hd').on('mouseenter','li:not(.active)',function(){
        var $t = $(this);
        $t.addClass('active').siblings().removeClass('active');
        $busBd.find('div:eq("'+$t.index()+'")').addClass('active').siblings().removeClass('active');
    });
});
