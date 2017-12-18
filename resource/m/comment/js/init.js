/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	var form = require('./form'),//评论表单
		list = require('./list');//评论列表
	exports.init = function(id,$id,obj){//话题id，jquery选择容器
		obj = obj || {};
		form.init(id,$id,obj);
		if($('link[href*="v2/m/comment/style.css"]').length < 1){
			require('../css/style.css');
		}
		list.init(id,$id,obj);
		$id.delegate('#JSayText', 'refresh', function(event) {
			list.refresh(id,obj);
		});
	};
});