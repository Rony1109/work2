/*
 * 返回顶部
 */
define(function(require, exports, module) {
    exports.init = (function (w,d){
        var ie6 = (function(){
            return ('undefined' == typeof(document.body.style.maxHeight));
        })();
        var	$backTop = $("#backTop");
        $backTop.length || $("body").append('<div class="g-o back-top" id="backTop"><div class="bt-bd"><a href="#">返回顶部</a></div></div>');
        var	$backTop = $('#backTop'),
            E=d.documentElement,
            $btBd = $backTop.children("div.bt-bd");
        function rePosition(){
            $backTop.css("margin-top",E.clientHeight-$backTop.position().top+E.scrollTop);
            $btBd.css("right",E.clientWidth<1040 ?
                E.clientWidth < 1000 ? E.scrollWidth -E.clientWidth - E.scrollLeft : ( 1000 - E.clientWidth)/2
                : "20px") ;
        }
        $(w).bind("scroll",function (){
            ie6 && rePosition();
            (E.scrollTop + d.body.scrollTop) > 10 ? $btBd.removeClass("bt-hide") : $btBd.addClass("bt-hide");
        }).trigger("scroll");
        $(w).bind("resize",function (){
            ie6 && setTimeout(function (){
                $(w).trigger("scroll");
            },200);
        }).trigger("resize");
    })(window,document);
});