/*TMODJS:{"version":70,"md5":"bded4e2c1783da37adb7e0aa1a494e5e"}*/
define(function(require){return require('./template')('tpl_index_table', function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,colData=$data.colData,type=$data.type,role=$data.role,$escape=$utils.$escape,host=$data.host,$each=$utils.$each,colNames=$data.colNames,v=$data.v,i=$data.i,k=$data.k,q=$data.q,$out='';if(colData.length === 0 && type === 1){
$out+=' <div class="g-btd cempty g-cf"> <i class="icon g-fl icon-ept-2"></i> <div class="g-fl g-fwb g-ml30"> <p class="g-fs18">您还没有采购货物，这里空空一片，快去采购需要的货物！</p> <p>现在去 <a href="http://www.csc86.com/purchase/" class="corange g-fs18" title="采购商城" target="_blank">采购商城</a></p> </div> </div> ';
}else if(colData.length === 0 && type !== 1){
$out+=' ';
if(role === 'buyers'){
$out+=' <div class="g-btd cempty g-cf"> <i class="icon g-fl icon-ept-2"></i> <div class="g-fl g-fwb g-ml30"> <p class="g-fs18">更多询盘可以获得更多的采购价格</p> <p>现在去 <a href="http://';
$out+=$escape(host.member);
$out+='/inquiry/openpublish.html" class="corange g-fs18" title="发布采购计划" target="_blank">发布采购计划</a></p> </div> </div> ';
}else{
$out+=' <div class="g-btd cempty g-cf"> <i class="icon g-fl icon-ept-3"></i> <div class="g-fl g-fwb g-ml30"> <p class="g-fs18">没有匹配到询盘记录，您可以通过下面操作，获取更多询盘！</p> <p>现在去 <a href="http://';
$out+=$escape(host.inquiry);
$out+='/inquiry/management/list" class="corange" title="订阅商机">订阅商机</a> 或 <a href="http://';
$out+=$escape(host.member);
$out+='/quote/index.html" class="corange g-fs18" title="询盘大厅">询盘大厅</a></p> </div> </div> ';
}
$out+=' ';
}else{
$out+=' <table class="table"> <tr> ';
$each(colNames,function(v,i){
$out+=' <th width="';
$out+=$escape(v.width);
$out+='">';
$out+=$escape(v.text);
$out+='</th> ';
});
$out+=' </tr> ';
$each(colData,function(v,i){
$out+=' <tr> ';
$each(v,function(k,q){
$out+=' ';
if(k.isPro){
$out+=' <td class="g-cf"> <a href="';
$out+=$escape(k.link);
$out+='" class="g-fl" target="_blank"><img src="//img.csc86.com';
$out+=$escape(k.imgurl);
$out+='" height="65" width="65" class="g-db"></a> <a href="';
$out+=$escape(k.link);
$out+='" class="g-fl a" title="';
$out+=$escape(k.text);
$out+='" target="_blank"> ';
$out+=$escape(k.text);
$out+=' </a> </td> ';
}else if(k.isBtn){
$out+=' <td> ';
if(type === 1){
$out+='  <a payhref="';
$out+=$escape(k.data.olderHref);
$out+='" href="javascript:;" title="';
$out+=$escape(k.text);
$out+='" class="corange op">';
$out+=$escape(k.text);
$out+='</a> <div class="g-dn"> {"productId":"';
$out+=$escape(k.data.orderDetails[0].productId);
$out+='","orderNo":"';
$out+=$escape(k.data.orderNo);
$out+='","orderTime":"';
$out+=$escape(k.data.creatTime);
$out+='","buyNum":"';
$out+=$escape(k.data.orderDetails.length);
$out+='","showImgs":"';
$out+=$escape(k.data.orderDetails[0].image);
$out+='","consumerAddress":"';
$out+=$escape(k.data.address);
$out+='","link":"';
$out+=$escape(k.data.orderDetails[0].link);
$out+='","proName":"';
$out+=$escape(k.data.orderDetails[0].productName);
$out+='","proImg":"//img.csc86.com';
$out+=$escape(k.data.orderDetails[0].image);
$out+='", "shopid": "';
$out+=$escape(k.data.shopId);
$out+='", "nu": "';
$out+=$escape(k.data.logisticsNO);
$out+='", "deliveryType": "';
$out+=$escape(k.data.deliveryType);
$out+='", "remark": "';
$out+=$escape(k.data.remark);
$out+='", "linkTel": "';
$out+=$escape(k.data.linkTel);
$out+='"} </div> ';
}else{
$out+=' <a inquiryhref="';
$out+=$escape(k.data.inquiryHref);
$out+='" href="javascript:;" title="';
$out+=$escape(k.text);
$out+='" class="corange op">';
$out+=$escape(k.text);
$out+='</a> <div class="g-dn"> {"productId":"';
$out+=$escape(k.data.productId);
$out+='","inquiryId":"';
$out+=$escape(k.data.inquiryId);
$out+='","showImgs":"';
$out+=$escape(k.data.productImgUrl);
$out+='","productName":"';
$out+=$escape(k.data.productName);
$out+='"} </div> ';
}
$out+=' </td> ';
}else if(k.isLink){
$out+=' <td> <a href="';
$out+=$escape(k.link);
$out+='" title="';
$out+=$escape(k.text);
$out+='" target="_blank">';
$out+=$escape(k.text);
$out+='</a> </td> ';
}else{
$out+=' <td>';
$out+=$escape(k.text);
$out+='</td> ';
}
$out+=' ';
});
$out+=' </tr> ';
});
$out+=' </table> ';
}
$out+=' ';
return new String($out);
});});