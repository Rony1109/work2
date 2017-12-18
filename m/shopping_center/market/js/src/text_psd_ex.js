define(function(require, exports, module) {
    var _login_psd={
        login_psd_eActiveObj:function (ele) {
            var _login_psd_tr=true;
            $(ele).on('click',function(){
                if (_login_psd_tr) {
                    $('#password').attr("type","text");
                    $(this).attr("src","//res.csc86.com/v3/shopping_center/market/demo/login_psd_e_active.png");
                    _login_psd_tr=false;
                } else {
                    $('#password').attr("type","password");
                    $(this).attr("src","//res.csc86.com/v3/shopping_center/market/demo/login_psd_e.png");
                    _login_psd_tr=true;

                }
            });//密码与字符串切换;
        }
    };
    module.exports =_login_psd;
});