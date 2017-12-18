define(function(require, exports, module) {
    var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');//加载登录接口
    $.debug=false;
    function isLogin_not(url,ele,shele) {
        if ($.debug||isLogin.status){//购物车图标数量统计
            $.ajax({
                url:url,
                type:$.debug ? "get":"post",
                dataType:$.debug ? "json":"jsonp",
                 success: function (data) {
                    if(data.status==200) {
                        if (+data.data.count > 0) {
                            $(ele).css("display","block").find("span").html(data.data.count);
                            if (data.data.count >= 100) {
                                $(ele).addClass("cart-common-size cart-common-img1").find("span").html("99");
                                $(shele).show()
                            }else if(data.data.count >= 10){
                                $(ele).addClass("cart-common-size cart-common-img2");
                            }else{
                                $(ele).addClass("cart-common-size cart-common-img3");
                            }
                        }
                        $(".pro_sh_de_scr").on("click", function (event) {
                            event.preventDefault();
                            window.location.href = "//res.csc86.com/v3/dmg/market/html/pro_de_cart.html"
                        })
                    }
                },
                error: function (xhr, type) {
                    console.log('系统报错!');
                }
            });
        }else {
            $(".pro_sh_de_scr").on("click", function (event) {
                event.preventDefault();
                window.location.href = "//res.csc86.com/v3/dmg/market/html/login.html"
            })
        }
    }
    module.exports=isLogin_not;
})