define(function(require, exports, module) {
    var login=require('./login.js');//具体情况请查看源码

    $('.jsLogin').on('click',function(){
        var $this=$(this);

        /*
         * 先判断是否登录
         * */
        $.get("//login.csc86.com/islogin/ajax",function (data){
            if(data.status){
                //当页面一进来就已经登录时 执行的代码
                location.href='//i.csc86.com';
            }else{
                //当页面一进来未登录时 显示弹窗登录页面（下面的代码为登录后不刷新页面的情况）
                login.showPop({
                    isPop:true,
                    isrefresh:false,
                    callback:function(data){
                        //获取登录后的信息，并在不刷新页面的情况下将会员名显示在页面里
                        $this.html(data.data.username);
                    }
                });

                //当页面一进来未登录时 显示弹窗登录页面（以下注释代码为登录后刷新页面的情况）
                /*login.showPop({
                    isPop:true,
                    isrefresh:true
                });*/

            }
        },"jsonp");
    })


});