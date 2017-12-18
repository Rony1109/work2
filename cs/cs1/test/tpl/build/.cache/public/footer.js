/*TMODJS:{"version":1,"md5":"ed9ecd6c88cbbe2dac690d2fe45b9810"}*/
template('public/footer',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,time=$data.time,$escape=$utils.$escape,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div id="footer"> ';
if(time){
$out+=' <p class=\'time\'>';
$out+=$escape(time);
$out+='</p> ';
}
$out+=' ';
include('../copyright');
$out+=' </div>';
return new String($out);
});