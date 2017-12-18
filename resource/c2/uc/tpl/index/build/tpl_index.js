/*TMODJS:{"version":144,"md5":"20a937215500e997cd115de09c5b55da"}*/
define(function(require){require('./tpl_index_center');return require('./template')('tpl_index', function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,importUserStatus=$data.importUserStatus,host=$data.host,isCg=$data.isCg,role=$data.role,usrData=$data.usrData,leftMenuData=$data.leftMenuData,$each=$utils.$each,v=$data.v,i=$data.i,t=$data.t,k=$data.k,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},playBuzzs=$data.playBuzzs,$out='';$out+='<input type="hidden" id="importUserStatus" value="';
$out+=$escape(importUserStatus);
$out+='">  <div class="navbar"> <div class="wwrap g-o g-cf"> <div class="g-fl"><a href="http://csc86.com';
/*$out+=$escape(host.i);*/
$out+='" class="g-db" title="华南城网首页"><img src="//res.csc86.com/v2/c2/uc/images/logo.png" height="50" width="204" alt="华南城网" class="g-db"></a></div> ';
$out+='<div class="g-fl whyzxlj"><a href="//i.csc86.com" class="g-db" title="会员中心首页">会员中心</a></div>';
if(isCg === false){
$out+=' <div class="navmenu g-fl g-cf" id="navmenu"> ';
if(role === 'mem_Seller'){
$out+=' <a href="#buyers" class="g-fl a" title="我是买家">我是买家</a> <a href="#mem_Seller" class="g-fl hover a" title="我是卖家">我是卖家</a> ';
}else{
$out+=' <a href="#buyers" class="g-fl hover a" title="我是买家">我是买家</a> <a href="#mem_Seller" class="g-fl a" title="我是卖家">我是卖家</a> ';
}
$out+=' <a href="//payment.csc86.com" class="g-fl ts" title="钱包" target="_blank">钱包</a> <span class="ts"><div class="tscon"><p class="an"><span class="s1">我知道了</span><span class="s2">立即体验>></span></p></div></span>  </div> ';
}
$out+=' </div> </div> <div class="bgcontainer g-pt15 g-pb30"> <div class="wwrap g-o g-cf">  <div class="ly-l g-fl"> <div class="box"> <div class="usr">  <div class="g-cf"> <a href="javascript://" class="g-fl g-pr figupload g-mt10"> <img id="infoimg" src="';
$out+=$escape(usrData.figimg);
$out+='" width="65" height="65" /> <span id="infoloadimg"></span> <span></span> <input type="hidden" name="" id="imgurl"> </a> <!-- <a href="javascript:;" class="g-fl g-pr"> <img src="';
$out+=$escape(usrData.figimg);
$out+='" height="65" width="65" class="g-db"> <input type="file" name="figimg" id="figupload"> </a> --> <div class="g-fr g-mt10"> <p class="g-fs16 g-cf"> <a class="g-e g-fl g-w50" href="http://';
$out+=$escape(host.member);
$out+='/membercenter/userinfo" title="';
$out+=$escape(usrData.name);
$out+='">';
$out+=$escape(usrData.name);
$out+='</a><span class="g-fl">,您好<span class="corange g-ffs g-fs16 g-fwb">&gt;&gt;</span></span> </p> <div class="g-cf g-ml3 g-mt10"> ';
if(usrData.phone){
$out+=' <a href="http://';
$out+=$escape(host.member);
$out+='/membercenter/userinfo" class="g-fl icon icon-ph-2"></a> ';
}else{
$out+=' <a href="http://';
$out+=$escape(host.member);
$out+='/membercenter/userinfo" class="g-fl icon icon-ph-1"></a> ';
}
$out+=' ';
if(usrData.email){
$out+=' <a href="http://';
$out+=$escape(host.member);
$out+='/membercenter/userinfo" class="g-fl icon icon-em-2 mt7 g-ml10"></a> ';
}else{
$out+=' <a href="http://';
$out+=$escape(host.member);
$out+='/membercenter/userinfo" class="g-fl icon icon-em-1 mt7 g-ml10"></a> ';
}
$out+=' </div> </div> </div>  <div class="g-mt30 g-fs14 g-fwb"> ';
if(isCg === false){
$out+=' <p>可提货款：<a class="corange" href="https://';
$out+=$escape(host.i);
$out+='/draw/list">';
$out+=$escape(usrData.money);
$out+='</a>&nbsp;元</p> ';
}
$out+=' ';
if(role === 'buyers'){
$out+=' <p>本月订单：<a class="corange" href="https://';
$out+=$escape(host.i);
$out+='/buyer/buyerOrder">';
$out+=$escape(usrData.order);
$out+='</a>&nbsp;单</p> ';
}else{
$out+=' <p>本月订单：<a class="corange" href="https://';
$out+=$escape(host.i);
$out+='/seller/sellerOrders">';
$out+=$escape(usrData.order);
$out+='</a>&nbsp;单</p> ';
}
$out+=' </div> </div> </div>  <div class="box g-mt10"> <ul class="leftmenu"> <li class="g-c8 t g-pr">';
$out+=$escape(leftMenuData.header);
$out+=' <i class="icon icon icon-1"></i></li> ';
$each(leftMenuData.menus,function(v,i){
$out+=' ';
if(v.type === 1){
$out+=' <li> <p><a href="';
$out+=$escape(v.href);
$out+='" title="';
$out+=$escape(v.text);
$out+='" target="';
$out+=$escape(v.target);
$out+='">';
$out+=$escape(v.text);
$out+='</a></p> </li> ';
}
$out+=' ';
if(v.type === 2){
$out+=' <li class="g-c8 b g-pr">';
$out+=$escape(v.text);
$out+=' <div class="icon-2"></div></li> ';
}
$out+=' ';
if(v.type === 3){
$out+=' <li> ';
$each(v.items,function(t,k){
$out+=' <p><a href="';
$out+=$escape(t.href);
$out+='" title="';
$out+=$escape(t.text);
$out+='" target="';
$out+=$escape(t.target);
$out+='">';
$out+=$escape(t.text);
$out+='</a></p> ';
});
$out+=' </li> ';
}
$out+=' ';
});
$out+=' </ul> </div> </div> ';
include('./tpl_index_center');
$out+='  <div class="ly-r g-fr"> ';
if(isCg === false){
$out+=' <div class="box"> <div class="g-cf g-bbd g-pt5 g-pb5"> <i class="icon g-fl icon-6 g-ml15 g-mt5"></i> <div class="r-h">玩转电商</div> </div> <ul class="r-list"> ';
$each(playBuzzs,function(v,i){
$out+=' <li class="g-cf"><i class="g-fl icon-dot"></i><a href="';
$out+=$escape(v.link);
$out+='" title="';
$out+=$escape(v.name);
$out+='" class="g-e" target="_blank">';
$out+=$escape(v.name);
$out+='</a></li> ';
});
$out+=' </ul> </div> <div class="box g-mt10"> \
<div class="g-cf g-bbd g-pt5 g-pb5"> \
<i class="icon g-fl icon-8 g-ml15 g-mt3"></i> \
<div class="r-h">服务</div>\
 <a href="https://payment.csc86.com/serve.index.do" class="g-fr g-fs12 g-mr10 g-mt3" title="更多" target="_blank">更多&gt;&gt;</a> \
 </div> \
 <div class="g-cf g-bbd g-tc">\
  	<div class="g-fl g-brd g-pw50 ml-1 g-pt10 g-pb10"> \
  		<a href="http://quan.csc86.com" class="g-db icon icon-s icon-s-2" title="生意圈" target="_blank"></a> \
    	<div><a href="http://quan.csc86.com" title="生意圈" class="g-fs14" target="_blank">生意圈</a></div>\
   </div> \
   <div class="g-fr g-pw50 g-pt10 g-pb10"> \
    	<a href="http://quan.csc86.com/cards/index" class="g-db icon icon-s icon-s-3" title="名片墙" target="_blank"></a>\
    	<div><a href="http://quan.csc86.com/cards/index" title="名片墙" class="g-fs14" target="_blank">名片墙</a></div> \
   </div> \
</div>   \
<div class="g-cf g-bbd g-tc"> \
   <div class="g-fl g-brd g-pw50 ml-1 g-pt10 g-pb10"> \
    	<a href="http://';
		$out+=$escape(host.approve);
			$out+='/user/approveInfo?approveType=prove" class="g-db icon icon-s icon-s-6" title="身份认证" target="_blank">\
		</a>\
		<div>\
			<a href="http://';
				$out+=$escape(host.approve);
				$out+='/user/approveInfo?approveType=prove" title="身份认证" class="g-fs14" target="_blank">身份认证\
			</a>\
		</div>\
    </div>\
    <div class="g-fr g-pw50 g-pt10 g-pb10">  \
    	<a href="http://';
		$out+=$escape(host.member);
		$out+='/accreditation/enterpriserealnamefirstauthentication/index.html" class="g-db icon icon-s icon-s-5" title="实名认证" target="_blank">\
		</a>\
		<div>\
			<a href="http://';
				$out+=$escape(host.member);
				$out+='/accreditation/enterpriserealnamefirstauthentication/index.html" title="实名认证" class="g-fs14" target="_blank">实名认证\
			</a>\
		</div>\
	</div>\
</div>\
<div class="g-cf g-bbd g-tc"> \
	<div class="g-fl g-brd g-pw50 ml-1 g-pt10 g-pb10"> \
		<a href="http://';
		$out+=$escape(host.approve);
			$out+='/user/localIndex?approveType=local" class="g-db icon icon-s icon-s-4" title="实地认证" target="_blank">\
		</a> \
		<div>\
			<a href="http://';
			$out+=$escape(host.approve);
				$out+='/user/localIndex?approveType=local" title="实地认证" class="g-fs14" target="_blank">实地认证\
			</a>\
		</div>\
	</div>\
</div> ';
}
$out+=' <div class="box';
if(isCg === false){
$out+=' g-mt10';
}
$out+='"> <div class="g-cf g-bbd g-pt5 g-pb5"> <i class="icon g-fl icon-9 g-ml15"></i> <div class="r-h">客服中心</div> </div> <div class="g-bbd g-pt10 g-pb10 g-pl15 g-pr10"> <p class="g-fs14">热线电话</p> <div class="g-cf g-pl15 g-mt5"> <i class="icon g-fl icon-10 g-mt3"></i> <span class="g-fl corange g-fwb g-ml5">400-184-8666</span> </div> </div> <div class="g-pt10 g-pb10 g-pl15 g-pr10"> <p class="g-fs14">在线咨询</p> <div class="g-cf g-pl15 g-mt5"> <i class="icon g-fl icon-11 g-mt3"></i> <a class="g-fl corange g-fwb g-ml5" href="http://help.csc86.com/service" target="_blank">在线客服</a> </div> </div> </div> </div> </div> </div> <script src="//res.csc86.com/f=js/m/config.js,js/c/memberhome/m-home.js,js/c/membercenter/member.js"></script> <script src="//res.csc86.com/f=js/p/SWFUpload/v2.2.0.1/swfupload.js,js/m/handlers.js,js/c/memberhome/uploadimg.js,js/c/memberhome/infouploadimg.js"></script>';
return new String($out);
});});