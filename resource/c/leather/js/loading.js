/**
 * 页面加载
 *
 */
define(function(require, exports, module) {
    $(".pgfloor").each(function(){
        var $t = $(this),l = $t.find(".alink a").length-1;
        $t.find(".alink a:lt("+ l +")").after("<span>|</span>");
    });
    $(".snsbox").eq(1).addClass("bdn");
    $(".zh-zhrb li.g-cf:last,.zh-zhhg li:last").addClass("last");
    $(".popcate li h5,.zx-activi .rec span,.zx-s5box .rec span,.like-list span a").each(function(){
        $(this).attr("title",$(this).text());
    });
});