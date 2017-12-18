define(function(require, exports, module) {
    var CreateJs = function() {
        var oScript = $('<script></script>');
        oScript.attr('type', 'text/javascript');
        return oScript
    }
    var JsTagA = new CreateJs();
    JsTagA.attr({
        'id': 'bdshare_js',
        'data': 'type=tools'
    });
    $('body').append(JsTagA);
    var JsTagB = new CreateJs();
    JsTagB.attr({
        'id': 'bdshell_js',
        'src': "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours()
    });
    $('body').append(JsTagB);
    $('.share').on('mouseenter mouseleave', function(e) {
        var $me = $(this);
        if (e.type == "mouseenter") {
            $me.addClass('share-on').find('.share-box').show();
        } else if (e.type == 'mouseleave') {
            $me.removeClass('share-on').find('.share-box').hide();
        }
    });
    $('.fix-more').click(function(){
        $('.bds_more').trigger('click');
    })
})