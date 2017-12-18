define(function (require, exports, module) {
    var hostmap=seajs.hostmap;//域名配置
    var locationHref = require('./url_express')(window.location.href);
    var orderId = locationHref.params.orderId;
    $.get("//"+ hostmap.test +"/wxpay/qrcode?callback=?",{
        orderId : orderId
    },function(data){
        $("#qrcode-con").css("display","block");
        $("#_waiting_load").css("display","none");
        if(data.status == 1){
            cscStatis({"data": {"orderId": orderId, "eventAction": "submitOrderSuccess","eventLabel":"m.csc86.com","hitType": "event"}, "format": {"eventLabel":"el","hitType": "t","eventAction":"ea"}}).send({"Tracer": "submitOrderSuccesstracker"});
            cscStatis({"data": {"orderId": orderId,"defaultbank":'wxpcpay', "eventAction": "ConfirmPayments","eventLabel":"m.csc86.com","hitType": "event"}, "format": {"eventLabel":"el","hitType": "t","eventAction":"ea"}}).send({"Tracer": "ConfirmPaymentstracker"});
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: data.code_url,
                colorDark: '#000',
                colorLight: '#fff',
                correctLevel: QRCode.CorrectLevel.H
            })
        }else{
              $("#qrcode").html(data.msg);
        }
    },"jsonp")


});