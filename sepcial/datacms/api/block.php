<?php
$pos = trim($_GET['block']);
if(!preg_match('/^[\x{4e00}-\x{9fa5}\w]+$/iu', $pos)){
	exit('标签不存在！');
}
include template('content','block');