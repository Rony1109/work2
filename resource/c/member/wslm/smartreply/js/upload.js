/**
 * 前端模板js文件
 * 
 */
seajs.config({
	alias:  {
		//'focus': 'c/home/index/js/focusPlay',
	}			  
});
define(function(require, exports, module) {
	//var csc = require('focus');
	//图片上传
    require('c/member/wslm/public/js/fileUpload/jquery.ui.widget');
	require('c/member/wslm/public/js/fileUpload/jquery.iframe-transport');
	require('c/member/wslm/public/js/fileUpload/jquery.fileupload');
});


