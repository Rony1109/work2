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
class cscApiModel extends model {
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
	/**
	 * 获取列表信息
	 * @param int $modelid	模型id
	 * @param int $cateid	分类id
	 * @param string $date	日期
	 * @param int $limit	条数限制
	 * @param number $page	分页
	 * @return multitype:
	 */
	public function get_list($modelid, $cateid, $date, $page=1, $limit=30){
		$result	= array('page'=>1, 'data'=>array());
		if (empty($cateid) || !is_numeric($cateid) || empty($date)){
			return $result;
		}
		$starttime 	= strtotime($date);
		$endtime 	= strtotime("$date +1 month");
		$where		= 'catid='.$cateid.' and inputtime<'.$endtime.' and inputtime>'.$starttime;

		if ($modelid) {
			$this->set_model($modelid);
			$total 	= $this->count($where);
			if (empty($total))	return $result;
			$ptotal	= ceil($total/$limit);
			$page 	= max(intval($page), 1);
			$page	= ($ptotal<$page)?$ptotal:$page;
			$offset = $limit*($page-1);
			$data 	= $this->select($where, '`id`,`title`,`count`,`address`', "$offset, $limit", ' inputtime desc');
			$result	= array('page'=>$ptotal, 'data'=>$data);
		}
		return $result;
	}
	
	/**
	 * 获取碎片信息
	 * @param	int $modelid	模型id
	 * @param	int	$cateid		栏目id
	 * @param	int	$limit		条数
	 * @param	int	$page		第几页
	 */
	public function getList($modelid=14, $cateid, $page=1, $limit=6){
		$result	= array();
		if (empty($cateid)){
			return $result;
		}
		$where	= 'catid='.$cateid;
		
		if ($modelid) {
			$this->set_model($modelid);
			$total	= $this->count($where);
			if (empty($total)) {
				return $result;
			}
			$ptotal	= ceil($total/$limit);
			$page 	= max(intval($page), 1);
			$page	= ($ptotal<$page)?$ptotal:$page;
			$offset = $limit*($page-1);
			$data 	= $this->select($where, '`id`,`title`,`thumb`,`url`,`updatetime`,`inputtime`', "$offset, $limit", ' id desc');
			$result	= $data;
		}
		return	$result;
	}
}
?>