<?php
/**
 * 获取单条内容信息
 *
 */
defined('IN_PHPCMS') or exit('No permission resources.'); 

/**
 * 数据库内容模型
 */
pc_base::load_sys_class('model', '', 0);
class api_content extends model {
	public $table_name = '';
	public $category = '';
	public function __construct() {
		$this->db_config = pc_base::load_config('database');
		$this->db_setting = 'default';
		parent::__construct();
		$this->url = pc_base::load_app_class('url', 'content');
		$this->siteid = get_siteid();
	}
	public function set_model($modelid) {
		$this->model = getcache('model', 'commons');
		$this->modelid = $modelid;
		$this->table_name = $this->db_tablepre.$this->model[$modelid]['tablename'];
		$this->model_tablename = $this->model[$modelid]['tablename'];
	}

	/**
	 * 获取内容信息
	 * @param unknown $modelid
	 * @param unknown $id
	 * @return boolean|multitype:|array/null
	 */
	function get_content($modelid,$id) {

		if($modelid && $id) {
			$this->set_model($modelid);
			$r = $this->get_one(array('id'=>$id), '`id`,`title`,`price`,`count`,`companyname`,`shopurl`,`contact`,`productname`,`contactname`,`address`');
			//附属表
			$this->table_name = $this->table_name.'_data';
			$r2 = $this->get_one(array('id'=>$id), '`id`,`content`');
			if($r2) {
				return array_merge($r,$r2);
			} else {
				return $r;
			}
		}
		return array();
	}
}

$host		= $_SERVER['HTTP_HOST'];
if (!preg_match("/.*\.csc86\.com/", $host)) {
	exit('No permission resources');
}
$callback	= isset($_GET['callback'])? $_GET['callback']:'callback';
$id			= (isset($_GET['id'])&& $_GET['id'])?$_GET['id']:null;
$mid		= (isset($_GET['mid'])&& $_GET['mid'])?$_GET['mid']:12;

if (empty($id) || empty($mid)) {
	exit('invalid param');
}
$contentapi	= new api_content;
$content	= $contentapi->get_content($mid, $id);
	
exit($callback.'('.json_encode($content).')');


?>