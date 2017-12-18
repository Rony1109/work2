var e = document.createElement("iframe");
//获取srcipt路径
var urlParameters = (function(script){
    var l = script.length;
    for(var i = 0; i < l; i++){
        src = script[i].src;
    }
    return src.split('?')[1];

})(document.getElementsByTagName('script'))
//获取srcipt参数
var GetParameters = function ( name ){
    if( urlParameters && urlParameters.indexOf('&') > 0 ){
        var parame = urlParameters.split('&'), i = 0, l = parame.length, arr;
        for(var i=0 ; i < l; i++ ){
            arr = parame[i].split('=');
            if( name === arr[0] ){
                return arr[1];
            }
        }
    }
    return null;
}
e.setAttribute('frameborder', '0', 0);
e.src = "ad_" + GetParameters("adsId") + ".html";
e.style.width = GetParameters("w") +"px";
e.style.height = GetParameters("h") + "px";
e.style.overflow = "hidden";
e.scrolling = "no";
document.body.appendChild(e);





