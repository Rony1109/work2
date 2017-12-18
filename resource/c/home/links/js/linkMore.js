/**
 * 前端模板js文件
 *
 */

define(function(require, exports, module) {
    //友情链接更多
    $(".frie-links .more span").bind("click",function(){
        var $t = $(this),$dd = $(".frie-links dd");
        if($t.hasClass("s1")){
            $t.removeClass("s1");
            $dd.addClass("hide");
        }else{
            $t.addClass("s1");
            $dd.removeClass("hide");
        }
    });
});
