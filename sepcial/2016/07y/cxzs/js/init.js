/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'comment': 'm/comment/js/init.js',
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
    var comment = require('comment');
    /*
     * 以下为专题js代码
     */
    /*
        单次插值 {{* msg}}
        vm.$watch('a', callback)
        vm.$el,  vm.$data, vm.a
        {{{ html }}}
        {{ 支持表达式运算 }}
        {{ message | filterA | filterB }}  过滤器 内置 or 自定义
        computed 计算属性， 在new时定义
        指令  http://cn.vuejs.org/api/#指令
        <div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>
     */
    //评论
    // {"status":true,"data":{"memberId":"1b1e49f1-1470-4f8e-95d6-c53470b1c36b","userName":"13927498296"}}
    // {"status":false,"data":[]}
    // location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href)
    
    function dialog (html) {
        var dt = '<div class="maskwrap" id="maskwrap"><div class="mask"></div><div class="popwin"><a href="javascript:;" class="close" id="dclose"></a><div class="popwin-i g-tc g-fs18 g-ffy g-fwb" id="dcontent"></div></div></div>';
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
        // 登录按钮跳转
        $('.jlogin').click(function(event) {
            // location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href)
            csc.checkSign("location.reload");
        });
        $('.jstaypage').click(function(event) {
            closeDialog();
        });
    }
    function closeDialog () {
        $('#maskwrap').remove();
    }
    function treelv (growth) {
        if (growth < 1 || isNaN(growth)) {
            return;
        }
        var tree = $('#tree');
        var map = {};
        for (var i = 1; i <= 45; i++) {
            if (i < 16) {
                map['lv' + i] = 1;
            } else if (i < 31) {
                map['lv' + i] = 2;
            } else {
                map['lv' + i] = 3;
            }
        }
        for (i = 46; i <= 105; i++) {
            if (i < 66) {
                map['lv' + i] = 4;
            } else if (i < 86) {
                map['lv' + i] = 5;
            } else {
                map['lv' + i] = 6;
            }
        }
        for (i = 106; i <= 165; i++) {
            if (i < 136) {
                map['lv' + i] = 7;
            } else {
                map['lv' + i] = 8;
            }
        }
        var lv = map['lv' + growth] || 9;
        tree.addClass('lv' + lv);
    }
    // 从登录判断开始
    $.get('//api.csc86.com/member/isLogin.html',function (data){
        if (data.status) {

            comment.init("2ab95f03-57d2-4f9f-8e09-83242f253167", $('#JComment'), {
                pn: 2
            });

            $('#nologin').remove();
            $('#haslogin').show();
            $('#username').text(data.data.userName);

            $.get('//api.csc86.com/growth/growinfo', function (data) {
                var growth = data.data.growth;
                $('#growth').text(growth);
                growth = parseInt(growth, 10);
                if (data.status === false) {
					$('#hasloginjs').next().show();
                    $('#hasloginjs').remove();
					$('#yjjs').show();
                    
                }
                treelv(growth);         
            }, 'jsonp');

            // 点击兑换
            $('#dhjp').find('.probtn').click(function(event) {
                var fen = $(this).attr('fen');
                var currentFen = parseInt($('#growth').text(), 10);
                fen = parseInt(fen, 10);
                if (currentFen >= fen) {
                    dialog($('#bhtml').html());
                    // 减去成长值
                } else {
                    dialog($('#chtml').html());
                }
            });
            // 点击浇水
            var isclick = false;
            $('#hasloginjs').click(function(event) {
                // 更新成长值
                $.post('//api.csc86.com/growth/addgrow', function(data, textStatus, xhr) {
					
                    if (data.status) {
                        var cur = $('#growth').text();
                        cur = parseInt(cur, 10);
                        $('#growth').text(cur + 1);
                        treelv(cur + 1);
						$('#yjjs').show();
                        phb();
						
						 var _this = $(this);
                if (isclick) {
                    return false;
                }
                isclick = true;
                $('#shuifuimg')[0].src = 'css/img/js.gif';
                setTimeout(function () {
                    $('#czzid').show();
                    $("#czzid").animate({
                        bottom: 408 
                    }, 1000);
                }, 2000);
                setTimeout(function () {
                    $('#shuifuimg')[0].src = 'css/img/js.png';
                    dialog($('#ahtml').html());
                    $('#czzid').hide();
                    _this.next().show();
                    _this.remove();
                    isclick = false;
                }, 3000);
				
				
                    }else{
						 dialog($('#hdjs').html());
						return false;
						}
                }, 'jsonp');
               
            });
        } else {

            comment.init('2ab95f03-57d2-4f9f-8e09-83242f253167', $('#JComment'), {
                pn: 2
            });

            $('#nologin').show();
            $('#hasLogin').remove();
            // 没有登录时点击 浇水灌溉
            $('#nologinjs').click(function(event) {
                dialog($('#dhtml').html());
            });

            // 没有登录点击兑换
            $('#dhjp').find('.probtn').click(function(event) {
                dialog($('#ehtml').html());
            });
        }
    },"jsonp");

    // 获取排行榜
    function phb () {
        $.get('//api.csc86.com/growth/growlist', function (data) {
            var dm = $('#rankingid');
            dm.empty();
            dm.append('<tr><th>排行</th><th>会员名称</th><th class="brn">成长值</th></tr>');
            if (data && data.length > 0) {
                var len = data.length, tmp;
                for (var i = 0; i < len; i++) {
                    tmp = data[i];
                    dm.append('<tr><td>'+ (i + 1) +'</td><td>'+ tmp.name +'</td><td class="brn">'+ tmp.growth +'</td></tr>');
                }
            } else {
                dm.append('<tr><td colspan="3" class="brn">榜上无人</td></tr>');
            }
        }, 'jsonp');
    }
    phb();

    // 登录按钮跳转
    $('.jlogin').click(function(event) {
        // location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href)
        csc.checkSign("location.reload");
    });
});
