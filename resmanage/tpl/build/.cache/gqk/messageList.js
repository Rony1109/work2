/*TMODJS:{"version":67,"md5":"746f62c5fcce8194532f976839148427"}*/
template('gqk/messageList',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,data=$data.data,$each=$utils.$each,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <div class="messList"> <table class="messList_t"> <tr> <td class="g-fb" width="50">类型</td> <td class="g-fb">时间</td> <td class="g-fb">发送人</td> <td class="g-fb">发送内容</td> </tr> ';
if(data.length === 0){
$out+=' <tr> <td style="text-align:center;padding:20px;color:#999;font-size:16px;" colspan="4">无已发通知</td> </tr> ';
}
$out+=' ';
$each(data,function(v,i){
$out+=' <tr> <td>';
$out+=$escape(v.informType);
$out+='</td> <td>';
$out+=$escape(v.sendTime);
$out+='</td> <td>';
$out+=$escape(v.servicePersonnel);
$out+='</td> <td>';
$out+=$escape(v.sendContent);
$out+='</td> </tr> ';
});
$out+=' </table> </div> ';
return new String($out);
});