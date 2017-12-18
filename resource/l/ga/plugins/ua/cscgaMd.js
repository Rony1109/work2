var cscgaMd = {
    /*获取url参数*/
    getUrlParam:function(_url,key){
        if(_url.lastIndexOf("?") != -1){
            var queryStr = _url.substring(_url.lastIndexOf("?") + 1, _url.length);
            if(!key)
                return queryStr;//返回所有参数
            else{
                var params  = queryStr.split("&");
                for(var j = 0 ;j < params.length;j++){
                    var tmp = params[j].split("=");
                    if(tmp[0]==key){
                        return tmp[1];
                        break;
                    }
                }
            }
        }
    },

    //获取链接里面的文件名不包含后缀（这里主要用于根据商品详情链接获取商品id）
    getUrlFileName:function(url){
        var id;
        if(typeof url == 'string'){
            id=url.replace(/(.*\/)*([^.]+).*/ig,"$2");
        }
        return id;
    },

    //设置cookie
    setCookie:function(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },

    //获取cookie
    getCookie:function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },

    //清楚cookie
    clearCookie:function(cname){
        cscgaMd.setCookie(cname, "", -1);
    },

    //跟踪器id
    trackid: {
        pc: 'SU-10001-1'
    },

    //商品曝光
    commodityExposure: {
        //非scroll事件的情况下
        noScrollEvent: function (type, triggerEventNum, triggerEventArry) {
            if (typeof cscga == 'function') {
                cscga('create', cscgaMd.trackid[type], 'auto','eventExpsrTracker'+triggerEventNum);
                cscga('eventExpsrTracker'+triggerEventNum+'.require', 'ec');
                cscga('eventExpsrTracker'+triggerEventNum+'.require', 'cscplugin',{
                    data:triggerEventArry,
                    isEcAction:false
                });
                cscga('eventExpsrTracker'+triggerEventNum+'.cscplugin:commodityExposureInit');
            }
        }
    },

    //移除购物车
    removeCart:function(type, triggerEventNum, triggerEventArry){
        if (typeof cscga == 'function') {
            cscga('create', cscgaMd.trackid[type], 'auto','removeCartTracker'+triggerEventNum);
            cscga('removeCartTracker'+triggerEventNum+'.require', 'ec');
            cscga('removeCartTracker'+triggerEventNum+'.require', 'cscplugin',{
                data:triggerEventArry,
                isEcAction:true,
                ecActionType:'remove'
            });
            cscga('removeCartTracker'+triggerEventNum+'.cscplugin:removeCartInit');
        }
    },

    //购物车处的移至收藏夹
    moveToFav:function(type, triggerEventNum, triggerEventArry){
        if (typeof cscga == 'function') {
            cscga('create', cscgaMd.trackid[type], 'auto','moveToFavTracker'+triggerEventNum);
            cscga('moveToFavTracker'+triggerEventNum+'.require', 'ec');
            cscga('moveToFavTracker'+triggerEventNum+'.require', 'cscplugin',{
                data:triggerEventArry,
                isEcAction:true,
                ecActionType:'add'
            });
            cscga('moveToFavTracker'+triggerEventNum+'.cscplugin:moveToFavInit');
        }
    },

    //购物车处的结算
    cartJs:function(type,triggerEventArry){
        if (typeof cscga == 'function') {
            cscga('create', cscgaMd.trackid[type], 'auto','cartJsTracker');
            cscga('cartJsTracker.require', 'ec');
            cscga('cartJsTracker.require', 'cscplugin',{
                data:triggerEventArry,
                isEcAction:true,
                ecActionType:'add'
            });
            cscga('cartJsTracker.cscplugin:cartJsInit');
        }
    },

    defaultEvent:function(type, triggerEventNum, triggerEventArry,tracker,fun){
        if (typeof cscga == 'function') {
            cscga('create', cscgaMd.trackid[type], 'auto',tracker+''+triggerEventNum);
            cscga(tracker+''+triggerEventNum+'.require', 'cscplugin',{
                data:triggerEventArry
            });
            cscga(tracker+''+triggerEventNum+'.cscplugin:'+fun);
        }
    },

    //商品详情评价那里的tab
    proDtlTab:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'proDtlTabTracker','proDtlTabInit');
    },

    //立即采样
    takeSample:function(type,triggerEventNum,triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'takeSampleTracker','takeSampleInit');
    },

    //点击旺铺中的询盘相关的按钮
    ask:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'askTracker','askInit');
    },

    //绑定手机
    bindPhone:function(type,triggerEventNum,triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'bindPhoneTracker','bindPhoneInit');
    },

    //采购单发布
    buyApply:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'buyApplyTracker','buyApplyInit');
    },

    //找回密码
    findPwd:function(type,triggerEventNum,triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'findPwdTracker','findPwdInit');
    },

    //qq联系方式
    qq:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'qqTracker','qqInit');
    },

    //取消订单
    cancelOrder:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'cancelOrderTracker','cancelOrderInit');
    },

    //取消订单成功
    cancelOrderSuc:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'cancelOrderSucTracker','cancelOrderSucInit');
    },

    //确认收货
    qrsh:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'qrshTracker','qrshInit');
    },

    //确认收货成功
    qrshSuc:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'qrshSucTracker','qrshSucInit');
    },

    //催发货
    cfh:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'cfhTracker','cfhInit');
    },

    //催发货成功
    cfhSuc:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'cfhSucTracker','cfhSucInit');
    },

    //接受备货
    acceptBh:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'acceptBhTracker','acceptBhInit');
    },

    //接受备货成功
    acceptBhSuc:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'acceptBhSucTracker','acceptBhSucInit');
    },

    //查看物流
    viewWl:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'viewWlTracker','viewWlInit');
    },

    //评价
    comment:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'commentTracker','commentInit');
    },

    //评价成功
    commentSuc:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'commentSucTracker','commentSucInit');
    },

    //去支付
    goPayment:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'goPaymentTracker','goPaymentInit');
    },

    //第三方登录
    threeLoginSuc:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'threeLoginSucTracker','threeLoginSucInit');
    },

    //线下支付
    offlinePayment:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'offlinePaymentTracker','offlinePaymentInit');
    },

    //收藏
    favSuc:function(type, triggerEventNum, triggerEventArry){
        cscgaMd.defaultEvent(type, triggerEventNum, triggerEventArry,'favSucTracker','favSucInit');
    }
};

//第三方登录成功后的埋点
var sessionId=cscgaMd.getCookie('sessionId');
var triggerEventArry=[],triggerEventNum=0;
if(sessionId != null && sessionId != ""){
    var userId=cscgaMd.getCookie(sessionId+'_user');
    var loginType=cscgaMd.getCookie(sessionId+'_login');

    //loginType不为null、不为空，且不登录web时，等于web的时候代表页面登录非第三方登录
    if(loginType != null && loginType != "" && loginType !="web"){
        triggerEventArry.push({
            userId:userId
        });
        cscgaMd.threeLoginSuc('pc',triggerEventNum,triggerEventArry[0]);
    }

    //发送完后清掉这些cookie
    cscgaMd.clearCookie(sessionId+'_login');
    cscgaMd.clearCookie(sessionId+'_user');
}