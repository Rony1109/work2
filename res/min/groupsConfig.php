<?php
/**
 * Groups configuration for default Minify implementation
 * @package Minify
 */

/** 
 * You may wish to use the Minify URI Builder app to suggest
 * changes. http://yourdomain/min/builder/
 *
 * See http://code.google.com/p/minify/wiki/CustomSource for other ideas
 **/

return array(
	'js' => array('//js/l/jquery.js', '//js/p/seajs/1.2.0/dist/sea.js', '//js/m/config.js'),
	'css' => array('//css/base-reset.css'),
	'bhf' => array('//css/base-reset.css','//css/m/web-head/top.css','//css/m/web-head/web-search.css','//css/m/web-head/web-nav.css','//css/m/web-foot/web-foot.css'),
	'shop' => array('//css/base-reset.css','//css/c/shop/style.css'),
	'dialog' => array('//js/p/artDialog/4.1.5/jquery.artDialog.js','//js/p/artDialog/4.1.5/plugins/iframeTools.source.js','//js/m/dialog.js'),
	'editor' => array('//js/p/kindeditor/4.1.2/kindeditor.js','//js/p/kindeditor/4.1.2/lang/zh_CN.js'),
	'app' => array('//css/base-reset.css', '//css/m/app-frame/style.css'),
	'swfupload' => array('//js/p/SWFUpload/v2.2.0.1/swfupload.js','//js/m/handlers.js'),
);