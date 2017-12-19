define(function(require, exports, module) {
    var navH=$(".protit").height();    
    // 导航点击
    $("#nav li").each(function(index, el) {
        var topValue = $(".products").eq(index)[0].offsetTop;
        $(el).on("click", function(e) {            
            $(el).addClass("act").siblings("li").removeClass("act");
            index==0 ? $(window).scrollTop(0) :$(window).scrollTop(topValue-navH*3);
        });
    });
    // 滚动时执行
    $(window).scroll(function() {
        var top = $(this).scrollTop();
        top >= $(".banner").height()?  $("#main").addClass("fixed").css("padding-top",navH+"px") : $("#main").removeClass("fixed").css("padding-top","0");
        for (var i = 0; i < $(".products").length; i++) {
            if(top>$(".products").eq(i)[0].offsetTop-navH*3){
                $("#nav li").eq(i).addClass("act").siblings("li").removeClass("act");
             }
        };
    })
});