/*TMODJS:{"version":118,"md5":"f821dd90ef7f7d10a64aa1d05f5db314"}*/
template('gqk/detail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,importBuyer=$data.importBuyer,$each=$utils.$each,v=$data.v,i=$data.i,qTrackings=$data.qTrackings,$out='';$out+=' <div class="buyerDetail"> <table class="buyerDetail_1"> <tr> <td class="buyerDetail_title">企业名称</td> <td>';
$out+=$escape(importBuyer.company);
$out+='</td> <td class="buyerDetail_title">主营行业</td> <td>';
$out+=$escape(importBuyer.mainIndustry);
$out+='</td> <td class="buyerDetail_title">区域</td> <td>';
$out+=$escape(importBuyer.area);
$out+='</td> <td class="buyerDetail_title">客服</td> <td>';
$out+=$escape(importBuyer.servicePersonnel);
$out+='</td> </tr> <tr> <td class="buyerDetail_title">采购类目</td> <td>';
$out+=$escape(importBuyer.categoryName);
$out+='</td> <td class="buyerDetail_title">跟进次数</td> <td>';
$out+=$escape(importBuyer.trackingCount);
$out+='</td> <td class="buyerDetail_title">地址</td> <td colspan="3">';
$out+=$escape(importBuyer.address);
$out+='</td> </tr> <tr> <td class="buyerDetail_title">导入时间</td> <td>';
$out+=$escape(importBuyer.importTime);
$out+='</td> <td class="buyerDetail_title">来源</td> <td colspan="5">';
$out+=$escape(importBuyer.source);
$out+='</td> </tr> </table> <table class="buyerDetail_1 mt10"> ';
$each(importBuyer.importContactPersonDtos,function(v,i){
$out+=' <tr> <td class="buyerDetail_title">联系人</td> <td>';
$out+=$escape(v.name);
$out+='</td> <td class="buyerDetail_title">职位</td> <td>';
$out+=$escape(v.position);
$out+='</td> <td class="buyerDetail_title">电话</td> <td>';
$out+=$escape(v.moblie);
$out+='</td> <td class="buyerDetail_title">座机</td> <td>';
$out+=$escape(v.telephone);
$out+='</td> <td class="buyerDetail_title">QQ</td> <td>';
$out+=$escape(v.qqNo);
$out+='</td> <td class="buyerDetail_title">邮箱</td> <td>';
$out+=$escape(v.email);
$out+='</td> </tr> ';
});
$out+=' </table> <p class="setMessage_t mt10">跟进记录</p> <ul class="buyerDetail_2"> ';
if(qTrackings.length === 0){
$out+=' <li> <p>无根据记录</p> </li> ';
}
$out+=' ';
$each(qTrackings,function(v,i){
$out+=' <li> <p>';
$out+=$escape(v.remark);
$out+='</p> <p class="g-tr buyerDetail_2_1"><span>';
$out+=$escape(v.operator);
$out+='</span> 与 <span>';
$out+=$escape(v.trackingTime);
$out+='</span> 录入</p> </li> ';
});
$out+=' </ul> </div>';
return new String($out);
});