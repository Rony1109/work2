$(function(){
    $(".showlist li").hover(function(){
        var $t= $(this);
        $t.addClass("cur").siblings().removeClass("cur");
    })
});