define(function(require, exports, module){
    function tab(btn,show,type){
        $(btn).on('click', function (event) {//tabº¯Êý
            $(btn).eq($(this).index()).addClass("sh_active").siblings().removeClass('sh_active');
            if(type){$(show).hide().eq($(this).index()).show();}
        })
    }
    module.exports=tab

});

