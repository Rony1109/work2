<?php
/**
 * 获取碎片数据
 */
defined('IN_PHPCMS') or exit('No permission resources.'); 

$callback	= isset($_GET['callback'])? $_GET['callback']:null;
$mid		= (isset($_GET['mid'])&& $_GET['mid'])?$_GET['mid']:14;		// 模型id
$cateid		= (isset($_GET['id'])&& $_GET['id'])?$_GET['id']:null;		// 栏目id
$page		= (isset($_GET['p'])&& $_GET['p'])?$_GET['p']:1;			// 第几页
$limit		= (isset($_GET['l'])&& $_GET['l'])?$_GET['l']:3;			// 限制条数

if (empty($cateid)) {
	exit('invalid param');
}

require_once 'cscApiModel.php';
$contentapi	= new cscApiModel;

$list		= $contentapi->getList($mid, $cateid, $page, $limit);

if ($callback){	
	exit($callback.'('.json_encode($list).')');
}else{
	echo (json_encode($list));
}

?>