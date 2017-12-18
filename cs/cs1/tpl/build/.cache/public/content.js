/*TMODJS:{"version":1,"md5":"f360c050404a4a259052bb2f49133eb1"}*/
template('public/content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$out='';$out+='<div id="main"> <h3>';
$out+=$escape(title);
$out+='</h3> <ul> ';
$each(list,function($value,$index){
$out+=' <li><a href="';
$out+=$escape($value.url);
$out+='">';
$out+=$escape($value.title);
$out+='</a></li> ';
});
$out+=' </ul> </div>';
return new String($out);
});