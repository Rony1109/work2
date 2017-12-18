/*TMODJS:{"version":7,"md5":"244c4d6db51e59cfd5e30f353bbb341c"}*/
template('index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';include('./public/header');
$out+=' ';
include('./public/content');
$out+=' ';
include('./public/footer');
return new String($out);
});