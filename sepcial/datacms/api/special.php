<?php
/**
 * 获取单条内容信息
 *
 */
defined('IN_PHPCMS') or exit('No permission resources.'); 


$host		= $_SERVER['HTTP_HOST'];
if (!preg_match("/.*\.csc86\.com/", $host)) {
	exit('No permission resources');
}
$callback	= isset($_GET['callback'])? $_GET['callback']:null;
$mid		= (isset($_GET['mid'])&& $_GET['mid'])?$_GET['mid']:12;
$type		= $_GET['type']?$_GET['type']:'info';

require_once 'cscApiModel.php';
$contentapi	= new cscApiModel;


switch ($type) {
	case 'list':
		$cateid		= (isset($_GET['id'])&& $_GET['id'])?$_GET['id']:null;
		$date		= (isset($_GET['t'])&& $_GET['t'])?$_GET['t']:date('Y-m-01');
		$page		= (isset($_GET['p'])&& $_GET['p'])?$_GET['p']:1;
		$limit		= (isset($_GET['l'])&& $_GET['l'])?$_GET['l']:20;
		if (empty($cateid)) {
			exit('invalid param');
		}
		$content	= $contentapi->get_list($mid, $cateid, $date, $page, $limit);
	break;
	
	default:
		$id			= (isset($_GET['id'])&& $_GET['id'])?$_GET['id']:null;
		if (empty($id)) {
			exit('invalid param');
		}
		$content	= $contentapi->get_content($mid, $id);	
	break;
}

if ($callback){	
	exit($callback.'('.json_encode($content).')');
}else{
	echo (json_encode($content));
}

?>