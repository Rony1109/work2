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

    $q = $('.fixed-nav');
    var fixed_num = parseInt($q.css('top')) || 690;
    $(window).on('scroll', function() {
        var sT = $(this).scrollTop();
        var ua = navigator.userAgent.toLowerCase();
        var check = function(r) {
            return r.test(ua);
        };

        var isOpera = check(/opera/);
        var isIE = !isOpera && check(/msie/);
        var isIE6 = isIE && check(/msie 6/);
        if (isIE6) {
            if (sT > fixed_num) {
                $q.stop(true).animate({
                    top: $(window).scrollTop()
                }, 200);

            } else if (sT < fixed_num) {
                $q.css({
                    top: fixed_num
                });
            }
            return;
        }
        if (sT > fixed_num && $q.is(':not([style])')) {
            $q.css({
                position: 'fixed',
                top: 0
            });
        } else if (sT < fixed_num && $q.is('[style]')) {
            $q.removeAttr('style');
        }
    });


    $('div.banner').find('div.g-o').prepend('<div class="g-fr g-comment-share" style="width:160px"><div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_t163" data-cmd="t163" title="分享到网易微博"></a></div><script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName(\'head\')[0]||body).appendChild(createElement(\'script\')).src=\'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=\'+~(-new Date()/36e5)];</script></div>');

});