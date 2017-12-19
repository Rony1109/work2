/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');

    require('//res.csc86.com/v2/c/member/common/js/alertDialog');//按钮弹窗组件

    /*
     * 以下为专题js代码
     * ......
     */
    //左右轮播
    
    $('.jscrolllist').each(function (index, el) {
        var clen = $(el).children().length;
        var width = $(el).children().first().width();
        $(this).width(clen * width);

        var prev = $(this).parent().next();
        var next = $(this).parent().next().next();

        var _self = $(this);
        prev.click(function () {
            lrScroll(_self, -1, width);
        });
        next.click(function () {
            lrScroll(_self, 1, width);
        });
    })

    function lrScroll(elem,un, w){
        if(!elem.is(":animated")){
            if(un==1){
                elem.animate({
                    left:-w
                },500,function(){
                    elem.css({left:0}).children().first().appendTo(elem);});
            }else{
                elem.css({left:-w}).children().last().prependTo(elem);
                elem.animate({
                    left:0
                },500);
            }
        }
    }

    // dialog($('#htmlsuccess').html(), 2)
    function dialog (html, type) {
        var titleImg = '19';
        var headClass = 'pophead';
        if (type === 1) {
            titleImg = '19';
        } else if (type === 2) {
            titleImg = '20'
        } else if (type === 3) {
            titleImg = '22'
            headClass = 'pophead2'
        }
        var dt = '<div class="maskwrap" id="maskwrap">' +
                 '<div class="mask"></div>' +
                 '<div class="popwin">' + 
                 '<div class="'+ headClass +' g-tc"><img src="css/img/'+ titleImg +'.png"/></div>' +
                 '<a href="javascript:;" class="close" id="dclose" title="关闭"></a>' +
                 '<div class="popwin-wi"><div class="popwin-i g-ffy" id="dcontent"></div></div>' +
                 '<div class="popwinfooter"></div>' +
                 '</div>' + 
                 '</div>';
        $(document.body).append(dt);
        var close = $('#dclose'),
            content = $('#dcontent'),
            d = $('#maskwrap');
        content.append(html);
        close.click(function(event) {
            d.remove();
        });
        d.find('.popwin').css({
            marginLeft: -(d.find('.popwin').width() / 2),
            marginTop: -(d.find('.popwin').height() / 2)
        });
    }
    function closeDialog () {
        $('#maskwrap').remove();
    }

    $('.jscrolllist .getBtn').click(function () {
        var couponId = $(this).attr('juan200');
        var couponId2 = $(this).attr('juan80');
        var shopname = $(this).attr('shopname');
        $.get('http://wslm.csc86.com/api/coupons?couponId='+ couponId +'&couponId2=' + couponId2, function (data) {
            if (data && data.status) {
                var code = data.data.Code;
                switch (code) {
                    case '1':
                        // 领取成功
                        dialog($('#htmlsuccess').html(), 2);
                        $('.shopname').text(shopname);
                        var submain = data.data.detail.submain + 'product.html';
                        if (submain.indexOf('http://') < 0) {
                            submain = 'http://' + submain;
                        }
                        $('.gotobuy').attr('href', '').attr('href', submain);
                        break;
                    case '180110105006':
                        // 您已经领过了
                        dialog($('#htmlgeted').html(), 3);
                        break;
                    case '180110105002':
                        // 该优惠卷已过期
                        $.tip({
                            content: '该优惠卷已过期',
                            closeCallback: function() {
                            }
                        });
                        break;
                    case '180110105005':
                        // 该优惠卷已被领完了
                        $.tip({
                            content: '该优惠卷已被领完了',
                            closeCallback: function() {
                            }
                        });
                        break;
                    default :
                        // 异常
                        alert('领取失败！！');
                }
            } else {
                csc.checkSign("location.reload");
            }
        }, 'jsonp')
    });

    $('#ckrules').click(function () {
        dialog($('#htmlrules').html(), 1);
    });
});
