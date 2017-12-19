/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js'
    },

    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    //require('./textScroll');
    require('http://res.csc86.com/js/');

    require('top');
    require('./ZeroClipboard.min.js');

    //弹出

    (function topBrand() {
        var list = require('http://192.168.0.152:8089/sns-app/topic/api/specialtopiclist?circleId=a3ef2d21-9919-4557-9d70-afce6cfc378e&offset=0&limit=10&callback=define')['data']['list'];
        var html = '';
        for (var i = 0; i < list.length; i++) {
            html += '<li class="g-cf"><p class="p11"><span class="' + (i < 3 ? 'num t' : 'num') + '">' + (i + 1) + '</span>' + list[i]['topicTitle'].split('（')[0].split('--')[0] + '</p><p class="p12"><span>' + list[i]['likeCount'] + '</span>票</p></li>';
        }
        $('.top-brand').html(html);
    }());



    $(document).delegate('.sup', 'click', function() { //拉票弹窗
        csc.useDialog(function() {
            artDialog({
                title: false,
                lock: true,
                content: '<div class="pup g-cf">' +
                    '   <h5>为我拉票</h5>' +
                    '   <div class="txtin">' +
                    '       <p class="p13">PC投票：</p>' +
                    '       <div class="pup-in">' +
                    '               <div class="g-cf">' +
                    '                   <div class="pp-txt">' +
                    '                       <input type="text" class="txt J_text" name="q" value="' + location.href + '" maxlength="35" autocomplete="off" id="J_text">' +
                    '                   </div>' +
                    '                   <input type="button" value="复制" class="btn J_copy" id="J_copy" data-clipboard-target="J_text">' +
                    '               </div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <p class="p14">把此链接分享给你的小伙伴吧</p>' +
                    '</div>',
                init: function() {

                    // 定义一个新的复制对象
                    var clip = new ZeroClipboard(document.getElementById("J_copy"), {
                        moviePath: "js/ZeroClipboard.swf"
                    });

                    // 复制内容到剪贴板成功后的操作
                    clip.on('complete', function(client, args) {
                        alert("复制成功，和好朋友一起分享吧！");
                    });
                }
            });
        });
    }).delegate('.mid-top-nav li:not(.cur) a', 'click', function() { //地区选项卡
        var $li = $(this).parent(),
            index = $li.index();
        $li.addClass('cur').siblings().removeClass('cur')
        $('.all-tp:eq(' + index + ')').addClass('all-tp-cur').siblings().removeClass('all-tp-cur');
    }).delegate('.md-page i:not(.cur)', 'click', function() { //翻页
        var $t = $(this),
            $tp = $t.parents('.all-tp');
        $tp.find('li').addClass('g-dn');
        $tp.find('li[data-page=' + $t.text() + ']').removeClass('g-dn');
        $t.addClass('cur').siblings().removeClass('cur');
    }).delegate('.md-page span', 'click', function() { //上下页
        var $t = $(this),
            $cur = $t.siblings('.cur');
        if ($t.is('.page-l')) {
            if ($cur.prev().is('.page-l')) return;
            $cur.prev().trigger('click');
        }
        if ($t.is('.page-r')) {
            if ($cur.next().is('.page-r')) return;
            $cur.next().trigger('click');
        }
    }).delegate('.p-z', 'click', function() {
        var $li = $(this).parents('li');
        if (window.csc) {
            zan($li, $li.data("topicid"));
        } else {
            seajs.use('http://res.csc86.com/js/', function() {
                zan($li, $li.data("topicid"));
            });
        }
        return false;
    }).delegate('.pnu','click',function(){
        $(this).parents('li').find('.p-z').trigger('click');
    }).delegate('.ebox', 'mouseenter', function() {
        $(this).addClass('ebox-hover');
    }).delegate('.ebox', 'mouseleave', function() {
        $(this).removeClass('ebox-hover');
    });


    /*
     * 以下为专题js代码
     * ......
     */
    require('./scroll');
    $(".img-scroll").CscScroll({
        Left: 422,
        Right: 211,
        Time: 2000,
        Auto: true,
        Visual: 4
    });

    //点赞
    function zan($li, id) {
        $.get(csc.url("quan", "/likeB.html?topicId=" + id), function(data) {
            if ("sns_likeTopic_000" == data.code) {
                $.get("http://quan.csc86.com/interface/hldlikeCount", {
                    "topicId": id
                }, function(data) {
                    $li.find('.g-p').html(data.code + '票');
                    $li.find('p.p3').html(data.code + '&nbsp;<img src="css/img/redarrow.png" width="9" height="8" alt="" />&nbsp;');
                }, "jsonp");
            } else if ("login_fail" == data.code) {
                seajs.use(csc.url("res", "/f=js/m/sign"), function() {
                    csc.checkSign("location.reload()");
                });
            } else if ("sns_likeTopic_001" == data.code) {
                alert("投过票了！");
            } else {
                alert(data.desc);
            }
        }, "jsonp");
    }
    $("li[data-topicid]").each(function() {
        var $t = $(this),
            topicId = $t.data("topicid") || "000";
        $.get("http://quan.csc86.com/interface/hldlikeCount", {
            "topicId": topicId
        }, function(data) {
            $t.find('.g-p').html(data.code + '票');
            $t.find('p.p3').html(data.code + '&nbsp;<img src="css/img/redarrow.png" width="9" height="8" alt="" />&nbsp;');
        }, "jsonp");
    });

    function createPage(total, $wrap, page) { //创建分页html
        total = total || 0;
        page = page || 16;
        if (total <= page) return;
        var page = total / page;
        var html = '<div class="md-page">' +
            '    <span class="page-l"></span>' +
            '    <i class="cur">1</i>';


        page = page !== parseInt(page) ? page + 1 : page;

        for (var i = 2; i <= page; i++) {
            html += '<i>' + i + '</i>';
        }

        html += '    <span class="page-r"></span></div>';
        $wrap.append(html);
    }


    var $midBd = $('.mid-bd');

    $midBd.find('.all-tp').each(function() {
        var $t = $(this);
        var $li = $t.find('li');
        createPage($li.length, $t);
    });


    $midBd.find('li').each(function() {
        var $t = $(this);
        $t.attr('data-page', parseInt($t.index() / 16) + 1);
    });

    $midBd.find('li[data-page!=1]').addClass('g-dn');

    // //分页
    // $(".page-r").click(function() {
    //     var leng = $(".all-tp ul.cur").nextAll().length;
    //     if (leng == 0) {
    //         return;
    //     }
    //     $(".all-tp ul.cur").removeClass("cur").next().addClass("cur");
    //     $(".md-page i.cur").removeClass("cur").next().addClass("cur");
    // });
    // $(".page-l").click(function() {
    //     var leng = $(".all-tp ul.cur").prevAll().length;
    //     if (leng == 0) {
    //         return;
    //     } else {
    //         $(".all-tp ul.cur").removeClass("cur").prev().addClass("cur");
    //         $(".md-page i.cur").removeClass("cur").prev().addClass("cur");
    //     }
    // });
    // $(".md-page i").click(function() {
    //     $(".md-page i,.all-tp ul").removeClass("cur");
    //     var i = $(this).index();
    //     $(this).addClass("cur");
    //     $(".all-tp ul:eq(" + (i - 1) + ")").addClass("cur");
    // });

    //搜索
    //
    $('.J_search').bind('submit', function() {
        var q = $.trim($(this).find('[name="q"]').val());
        if (q == '') {
            alert('请输入选手姓名');
            return false;
        }
        var $q = $('p.p7:contains(' + q + '):first');
        if ($q.length > 0) {
            $('li.active').removeClass('active');
            var $li = $q.parents('li');
            setTimeout(function() {
                $(window).scrollTop($li.offset()['top']);
            }, 50);
            var page = $li.data('page');
            var $allTp = $li.parents('.all-tp');
            $li.addClass('active').siblings().removeClass('active');
            $allTp.find('li').addClass('g-dn').filter('[data-page="' + page + '"]').removeClass('g-dn');
            $allTp.find('i:contains(' + page + ')').trigger('click');
            if ($allTp.is('.all-tp-cur')) {
                return false;
            }
            $('.mid-top-nav a:eq(' + $allTp.index() + ')').trigger('click');
        } else {
            alert('没有找到名为 ' + q + ' 的选手');
        }
        return false;
    });

});