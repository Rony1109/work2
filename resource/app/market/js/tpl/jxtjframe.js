/*TMODJS:{"version":1,"md5":"a6fc757f09716dd67496fbbf2b41447d"}*/
define(function(require){return require("./template")("jxtjframe",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.rowset,e=(a.value,a.a,b.$escape),f="";return f+=' <div class="jstj"> <h2 class="tjtit g-cf"><a href="#" class="g-cf"><span class="g-fl tjtitxt">\u7cbe\u9009\u63a8\u8350</span><span class="g-fr"><span class="xsqg">\u9650\u65f6\u62a2\u8d2d</span><i class="moreLink"></i></span></a></h2> <div class="flr-bd"> <div id="scroll" class="swiper-container swiper-container-horizontal"> <ul class="g-cf pro-lst scroll-lst swiper-wrapper"> ',c(d,function(a){f+=' <li class="swiper-slide"> <a href="gsc:product?productId=',f+=e(a.product_id),f+='" data-href="gsc:product?productId=',f+=e(a.product_id),f+='"> <p class="pic"><img src="',f+=e(a.thumb),f+='" alt=""/></p> <p class="t">',f+=e(a.title),f+=e(a.product_id),f+='</p> <p class="prc">&yen; ',f+=e(a.desc),f+="</p> </a> </li> "}),f+=" </ul> </div> </div> </div> ",new String(f)})});