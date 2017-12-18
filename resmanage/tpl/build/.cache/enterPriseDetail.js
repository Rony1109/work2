/*TMODJS:{"version":2,"md5":"57ce8759c6f46918c3d54b1bd84d3a20"}*/
template('enterPriseDetail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,enterpriseName=$data.enterpriseName,address=$data.address,model=$data.model,trades=$data.trades,goods=$data.goods,enterpriseType=$data.enterpriseType,userName=$data.userName,mobile=$data.mobile,email=$data.email,telephone=$data.telephone,licenseEnterpriseName=$data.licenseEnterpriseName,licenseNumber=$data.licenseNumber,legalPerson=$data.legalPerson,licenseImgUrl=$data.licenseImgUrl,$out='';$out+='<table class="at-look-v212" width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td colspan="2" class="g-fw-b">旺铺基本资料：</td> </tr> <tr> <td>企业名称：</td> <td id="enterprise">';
$out+=$escape(enterpriseName);
$out+='</td> </tr> <tr> <td>企业联系地址：</td> <td id="address">';
$out+=$escape(address);
$out+='</td> </tr> <tr> <td>经营模式：</td> <td id="model">';
$out+=$escape(model);
$out+='</td> </tr> <tr> <td >主营行业：</td> <td id="trades">';
$out+=$escape(trades);
$out+='</td> </tr> <tr> <td>主营产品/服务：</td> <td id="sellList">';
$out+=$escape(goods);
$out+='</td> </tr> <tr> <td>企业类型：</td> <td id="enterpriseType">';
$out+=$escape(enterpriseType);
$out+='</td> </tr> <tr> <td colspan="2" class="g-fw-b">联系方式：</td> </tr> <tr> <td>姓名：</td> <td id="userName">';
$out+=$escape(userName);
$out+='</td> </tr> <tr> <td>手机号码：</td> <td id="mobile">';
$out+=$escape(mobile);
$out+='</td> </tr> <tr> <td>电子邮箱：</td> <td id="email">';
$out+=$escape(email);
$out+='</td> </tr> <tr> <td>固定电话：</td> <td id="telephone">';
$out+=$escape(telephone);
$out+='</td> </tr> <tr> <td colspan="2" class="g-fw-b">企业资质：</td> </tr> <tr> <td>企业名称：</td> <td id="licenseEnterpriseName">';
$out+=$escape(licenseEnterpriseName);
$out+='</td> </tr> <tr> <td>营业执照编号：</td> <td id="licenseNumber">';
$out+=$escape(licenseNumber);
$out+='</td> </tr> <tr> <td>法定代表人：</td> <td id="person">';
$out+=$escape(legalPerson);
$out+='</td> </tr> <tr> <td>营业执照扫描件：</td> <td id="licenseImgUrl"> <a class="highslide " href="http://img.csc86.com/';
$out+=$escape(licenseImgUrl);
$out+='"> <img src="http://img.csc86.com/';
$out+=$escape(licenseImgUrl);
$out+='" width="45" height="45"> </a> </td> </tr> </table> ';
return new String($out);
});