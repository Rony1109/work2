<?php
defined('CMS_CACHE_PATH') or define('CMS_CACHE_PATH', dirname(__FILE__).DIRECTORY_SEPARATOR);
defined('_CACHE_EXT_') or define('_CACHE_EXT_', '.cache');
class Cache{

	public static $saveTime = 600; //10 分钟
	
	/**
	 * 获取缓存
	 * @param string $file
	 * @return multitype:
	 */
	public static function getCache($file){
		if (file_exists(CMS_CACHE_PATH.$file._CACHE_EXT_)){
			return @include (CMS_CACHE_PATH.$file._CACHE_EXT_);
		}
		return array();
	}
	/**
	 * 添加缓存
	 * @param string $file
	 * @param array $data
	 * @return number
	 */
	public static function setCache($file,$data){
        
		$len = 0;
		if(!empty($data))
		{
			$result = "<?php\nreturn ".var_export($data, true).";\n?>";
			$len = file_put_contents(CMS_CACHE_PATH.$file._CACHE_EXT_,$result);
			@chmod(CMS_CACHE_PATH.$file._CACHE_EXT_, 0755);
		}
        
		return $len;
	}
	/**
	 * 添加缓存
	 * @param string $file
	 * @param string $time	eg:2013-05-01
	 * @return number
	 */
	public static function isOut($file, $time){
		$filename	= CMS_CACHE_PATH.$file._CACHE_EXT_;
		if (file_exists($filename) && date('Y-m-d',filemtime($filename))==$time){
			return false;
		}else {
			return true;
		}
	}
	/**
	 * 获取内容
	 * @param string $url
	 * @param string $type
	 * @return string
	 */
	public static function getContent($url, $type='r'){
		$handle = fopen($url, $type);
		$contents = '';
		while (!feof($handle)) {
			$contents .= fread($handle, 8192);
		}
		fclose($handle);
		return $contents;
	}
};
/**
 * 获取列表信息
 * @param unknown $cateid
 * @param unknown $time
 * @param number $limit
 * @param number $page
 * @param number $modelid
 * @return Ambigous <multitype:, unknown, multitype:>
 */
function getlist($cateid, $time, $limit=20, $page=1, $modelid=12){
	$cachename	= 'list'.$cateid.$time.$page;
	$result		= array();
	if (Cache::isOut($cachename, $time)) {
		$url	= 'http://data.csc86.com/api.php?op=special&id='.$cateid.'&l='.$limit.'&type=list&p='.$page.'&t='.$time;
		$data	= @Cache::getContent($url);
		$error	= error_get_last();
		if ($error) {
			$result	= Cache::getCache($cachename);
		}else {
			$result	= json_decode($data,true);
		}
		if ($data) {
			Cache::setCache($cachename, json_decode($data, true));
		}
	}
	return $result;	
}
?>