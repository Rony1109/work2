<?php
defined('IN_PHPCMS') or exit('No permission resources.');
define('CACHE_MODEL_PATH',PHPCMS_PATH.'caches'.DIRECTORY_SEPARATOR.'caches_model'.DIRECTORY_SEPARATOR.'caches_data'.DIRECTORY_SEPARATOR);

if(!$_GET['act'] || !in_array($_GET['act'], array('getcount','count')) || !$_GET['formid'] || !$_GET['id'])  exit(json_encode(array('status'=>false, 'data'=>array(),'msg'=>'error')));

switch($_GET['act']) {
	case 'getcount':
		$index	= new index(1);
		$index->getCount($_GET['formid'],$_GET['id'],$_GET['ref']);
		break;

	case 'count':
		$index	= new index(1);
		$index->counts($_GET['formid'],$_GET['id'],$_GET['ref']);
		break;
	default:
		exit(json_encode(array('status'=>false, 'data'=>array('points'=>0),'msg'=>'error')));
}


class index {
	private $db, $m_db, $M;
	function __construct($siteid) {
		$this->db = pc_base::load_model('sitemodel_model');
		$this->m_db = pc_base::load_model('sitemodel_field_model');
		$this->M = new_html_special_chars(getcache('formguide', 'commons'));
		$this->siteid = intval($siteid) ? intval($siteid) : get_siteid();
		$this->M = $this->M[$siteid];
	}
	/**
	 * 更新并获取点赞数量
	 * @param number $formid	表单id
	 * @param unknown $id		信息id
	 */
	public function counts($formid=16, $id, $ref=0) {
		$callback	= $_GET['callback'];
		$r = $this->db->get_one(array('modelid'=>$formid, 'siteid'=>$this->siteid, 'disabled'=>0), 'tablename, setting');
		$tablename = 'form_'.$r['tablename'];
		$this->m_db->change_table($tablename);
		$set		= array('points'=>'+=1');
		if ($ref=='ref') {
			$set	= array('except'=>'+=1');
		}
		$result	= $this->m_db->update($set,array('dataid'=>$id));
		$data	= $this->m_db->get_one(array('dataid'=>$id));
		
		if (isset($data['points'])) {
			setcache('data_csc86_com_api_dianzan_'.$formid.'_'.$id, $data);
			$json	= array('status'=>true, 'data'=>array('points'=>$data['points'],'except'=>$data['except']));
		}else {
			$json	= array('status'=>true, 'data'=>array('points'=>0,'except'=>0));
		}
		echo $callback, "(", json_encode( $json ), ");";
	}

	/**
	 * 获取点赞数量
	 * @param number $formid	表单id
	 * @param unknown $id		信息id
	 */
	public function getCount($formid=16, $id, $ref=0) {
		$callback	= $_GET['callback'];
		$r = $this->db->get_one(array('modelid'=>$formid, 'siteid'=>$this->siteid, 'disabled'=>0), 'tablename, setting');
		$tablename = 'form_'.$r['tablename'];
		$this->m_db->change_table($tablename);
		$data	= getcache('data_csc86_com_api_dianzan_'.$formid.'_'.$id);
//		$data	= $this->m_db->get_one(array('dataid'=>$id));				// 取消数据库调用，直接读取缓存，yrq

		if (isset($data['points'])) {
			$json	= array('status'=>true, 'data'=>array('points'=>$data['points'],'except'=>$data['except']));
		}else {
			$json	= array('status'=>true, 'data'=>array('points'=>0,'except'=>0));
		}

		echo $callback, "(", json_encode( $json ), ");";
	}
}
?>