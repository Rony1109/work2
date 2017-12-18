/*TMODJS:{"version":124,"md5":"33cf5f3e87d652b8da25ce136d74471f"}*/
define(function(require){return require('./template')('tpl_index_center', function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,isCg=$data.isCg,role=$data.role,isHasShop=$data.isHasShop,personlACT=$data.personlACT,$escape=$utils.$escape,openShopUrl=$data.openShopUrl,companyInfo=$data.companyInfo,isCST=$data.isCST,endTime=$data.endTime,isVIP=$data.isVIP,isOnlineTrade=$data.isOnlineTrade,openTradeUrl=$data.openTradeUrl,shopUrl=$data.shopUrl,host=$data.host,$each=$utils.$each,orderTab=$data.orderTab,v=$data.v,i=$data.i,userInquiryInf=$data.userInquiryInf,$out='';$out+=' <div class="ly-c g-fl"> ';
if(isCg === false){
$out+=' <div class="box company" id="companyInfo"> <div class="g-cf"> <i class="g-fl icon icon-3 g-mt5"></i> ';
if(role === 'buyers'){
$out+='  ';
if(!isHasShop){
$out+=' <div class="g-fl g-ml15"> <div class="g-cf"> <div class="g-fl g-fwb g-fs18">您暂时未开通企业旺铺</div> ';
if(personlACT){
$out+=' <div class="g-fl g-cf g-mt3"> <a class="icon g-fl icon-rz icon-rz-1" href="javascript:;" title="个人实名认证"></a> </div> ';
}
$out+=' </div> <div class="g-fs12 g-c8">开通旺铺，轻松获得交易</div> </div> <a href="';
$out+=$escape(openShopUrl);
$out+='" class="g-fr orange-btn btn-1 g-mr30 g-mt5" title="开通旺铺" target="_blank">开通旺铺</a> ';
}else{
$out+=' <div class="g-fl g-ml15"> <div class="g-cf"> <div class="g-fl g-fwb g-fs18 g-mt5">';
$out+=$escape(companyInfo.name);
$out+='</div> <div class="g-fl g-cf mt7"> ';
if(personlACT){
$out+=' <a class="icon g-fl icon-rz icon-rz-1" href="javascript:;" title="个人实名认证"></a> ';
}
$out+=' </div> </div> </div> ';
}
$out+=' ';
}else{
$out+='  <div class="g-fl g-ml15"> ';
if(isHasShop){
$out+=' <div class="g-cf g-mt5"> <div class="g-fl g-fwb g-fs18">';
$out+=$escape(companyInfo.name);
$out+='</div> <div class="g-fl g-cf g-mt3"> ';
if(companyInfo.companyACT1){
$out+=' <a class="icon g-fl icon-rz icon-rz-2" href="javascript:;" title="企业实名认证"></a> ';
}else{
$out+=' ';
if(personlACT){
$out+=' <a class="icon g-fl icon-rz icon-rz-1" href="javascript:;" title="个人实名认证"></a> ';
}
$out+=' ';
}
$out+=' ';
if(companyInfo.companyACT2){
$out+=' <a class="icon g-fl icon-rz icon-rz-3" href="javascript:;" title="企业身份认证"></a> ';
}
$out+=' ';
if(companyInfo.companyACT3){
$out+=' <a class="icon g-fl icon-rz icon-rz-4" href="javascript:;" title="企业实地认证"></a> ';
}
$out+=' </div> </div> ';
if( isCST){
	$out+=' <div class="g-fs12 g-c8"></div> ';
// $out+=' <div class="g-fs12 g-c8">【城商通用户】';
// $out+=$escape(endTime);
// $out+=' 到期</div> ';
}else if(isVIP){
// $out+=' <div class="g-fs12 g-c8">【VIP用户】';
// $out+=$escape(endTime);
// $out+=' 到期</div> ';
	$out+=' <div class="g-fs12 g-c8"></div> ';
}else{
// $out+=' <div class="g-fs12 g-c8">【普通旺铺】开通城商通，享更多优质服务， <a href="http://cncms.csc86.com/special/yunyingguanli/cst/" title="立即开通" class="corange" target="_blank">立即开通</a> </div> ';
	$out+=' <div class="g-fs12 g-c8"></div> ';
}
$out+=' ';
}else{
$out+=' <div class="g-cf"> <div class="g-fl g-fwb g-fs18">您暂时未开通企业旺铺</div> ';
if(personlACT){
$out+=' <div class="g-fl g-cf g-mt3"> <a class="icon g-fl icon-rz icon-rz-1" href="javascript:;" title="个人实名认证"></a> </div> ';
}
$out+=' </div> <div class="g-fs12 g-c8">开通旺铺，轻松获得交易</div> ';
}
$out+=' </div> ';
if(!isHasShop){
$out+=' <a href="';
$out+=$escape(openShopUrl);
$out+='" class="g-fr orange-btn btn-1 g-mr30 g-mt5" title="开通旺铺" target="_blank">开通旺铺</a> ';
}else if(!isOnlineTrade){
$out+=' <a href="';
$out+=$escape(openTradeUrl);
$out+='" class="g-fr orange-btn btn-1 g-mr30 g-mt5" title="开通在线交易" target="_blank">开通在线交易</a> ';
}
$out+=' ';
}
$out+='  </div>  ';
if(role === 'mem_Seller'){
$out+=' <div class="g-btd g-mt15 g-cf g-pt10 pl46"> ';
if(!!shopUrl){
$out+=' <a href="http://';
$out+=$escape(shopUrl);
$out+='/?static=edit" class="g-fl shutbtn" title="装修旺铺" target="_blank"> <span class="icon icon-shutbtn icon-wp"></span> <p class="g-fs12">装修旺铺</p> </a> ';
}else{
$out+=' <a href="http://work.csc86.com/shop/guide.html" class="g-fl shutbtn" title="装修旺铺" target="_blank"> <span class="icon icon-shutbtn icon-wp"></span> <p class="g-fs12">装修旺铺</p> </a> ';
}
$out+=' ';
if(!!shopUrl){
$out+=' <a href="http://';
$out+=$escape(shopUrl);
$out+='" class="g-fl shutbtn" title="进入旺铺" target="_blank"> <span class="icon icon-shutbtn icon-jrwp"></span> <p class="g-fs12">进入旺铺</p> </a> ';
}else{
$out+=' <a href="http://work.csc86.com/shop/guide.html" class="g-fl shutbtn" title="进入旺铺" target="_blank"> <span class="icon icon-shutbtn icon-jrwp"></span> <p class="g-fs12">进入旺铺</p> </a> ';
}
$out+=' <a href="http://';
$out+=$escape(host.member);
$out+='/product/sell.html" class="g-fl shutbtn" title="发布产品"> <span class="icon icon-shutbtn icon-relpro"></span> <p class="g-fs12">发布产品</p> </a> <a href="http://';
$out+=$escape(host.member);
$out+='/shop/showcaseRecommend.html" class="g-fl shutbtn" title="橱窗推荐" target="_blank"> <span class="icon icon-shutbtn icon-cqtj"></span> <p class="g-fs12">橱窗推荐</p> </a> <a href="http://search.csc86.com/user/gotoAddPayKeyword.do" class="g-fl shutbtn" title="旭日排名" target="_blank"> <span class="icon icon-shutbtn icon-cqtj icon-xrpm"></span> <p class="g-fs12">旭日排名</p> </a> </div> ';
}
$out+=' </div> ';
}
$out+=' <div class="box';
if(isCg === false){
$out+=' g-mt10';
}
$out+='"> <div class="g-cf lc-head"> <i class="g-fl icon icon-4"></i> <span class="g-fl g-fs18 g-fwb g-mt5 g-ml10">我的订单</span> <span class="g-fr g-fs14 g-mt5"> ';
if(role==='buyers'){
$out+=' <a href="https://';
$out+=$escape(host.i);
$out+='/buyer/buyerOrder" title="查看所有订单">查看全部订单</a> ';
}else{
$out+=' <a href="https://';
$out+=$escape(host.i);
$out+='/seller/sellerOrders" title="查看所有订单">查看全部订单</a> ';
}
$out+=' <span class="corange">&gt;&gt;</span> </span> </div> <div class="tab-header g-cf" id="ordertab"> ';
$each(orderTab,function(v,i){
$out+=' ';
if(i === 0){
$out+=' <a href="javascript:;" class="g-fl hover" title="';
$out+=$escape(v.text);
$out+='">';
$out+=$escape(v.text);
$out+=' <span>(';
$out+=$escape(v.num);
$out+=')</span></a> ';
}else{
$out+=' <a href="javascript:;" class="g-fl" title="';
$out+=$escape(v.text);
$out+='">';
$out+=$escape(v.text);
$out+=' <span>(';
$out+=$escape(v.num);
$out+=')</span></a> ';
}
$out+=' ';
});
$out+=' </div> ';
if(role === 'mem_Seller'){
$out+=' ';
if(!isOnlineTrade){
$out+=' <div class="g-btd cempty g-cf"> <i class="icon g-fl icon-ept-4"></i> <div class="g-fl g-fwb g-ml30"> <p>您还没有开通在线交易，不能在线下单</p> <p>现在去 <a href="';
$out+=$escape(openTradeUrl);
$out+='" class="corange" title="采购商城" target="_blank">开通在线交易</a></p> </div> </div> ';
}else if(!isHasShop){
$out+=' <div class="g-btd cempty g-cf"> <i class="icon g-fl icon-ept-4"></i> <div class="g-fl g-fwb g-ml30"> <p>开通企业旺铺和在线交易，才能获取订单</p> <p>现在去 <a href="';
$out+=$escape(openShopUrl);
$out+='" class="corange" title="开通旺铺" target="_blank">开通旺铺</a></p> </div> </div> ';
}else{
$out+=' <div id="orderContainer"></div> ';
}
$out+=' ';
}else{
$out+=' <div id="orderContainer"></div> ';
}
$out+=' </div> <div class="box g-mt10" id="mybuyer"> <div class="g-cf lc-head"> <i class="g-fl icon icon-5"></i> <span class="g-fl g-fs18 g-fwb g-mt5 g-ml10"> ';
if(role==='buyers'){
$out+=' 我的采购 ';
}else{
$out+=' 我的报价 ';
}
$out+=' </span> <span class="g-fr g-fs14 g-mt5"><a href="http://';
$out+=$escape(host.member);
$out+='/quote/index.html" title="询盘大厅">询盘大厅</a><span class="corange">&gt;&gt;</span></span> </div> <div class="tab-header g-cf" id="inquiryTab"> <a href="javascript:;" class="g-fl hover" title="待报价">待报价 <span>(';
$out+=$escape(userInquiryInf.waitPendingCount || 0);
$out+=')</span></a> <a href="javascript:;" class="g-fl" title="已报价">已报价 <span>(';
$out+=$escape(userInquiryInf.pendedCount || 0);
$out+=')</span></a> </div> ';
if(role === 'mem_Seller'){
$out+=' ';
if(!isHasShop){
$out+=' <div class="g-btd cempty g-cf"> <i class="icon g-fl icon-ept-4"></i> <div class="g-fl g-fwb g-ml30"> <p>开通企业旺铺和在线交易，才能获取订单</p> <p>现在去 <a href="';
$out+=$escape(openShopUrl);
$out+='" class="corange" title="开通旺铺" target="_blank">开通旺铺</a></p> </div> </div> ';
}else{
$out+=' <div id="inquiryContainer"></div> ';
}
$out+=' ';
}else{
$out+=' <div id="inquiryContainer"></div> ';
}
$out+=' </div> </div>';
return new String($out);
});});