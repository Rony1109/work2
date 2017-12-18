/*发布产品中保存草稿成功*/
define(function(require, exports, module) {
	//3秒后自动跳转至草稿箱
	setTimeout(function(){
		location.href="http://member.csc86.com/product/sell/list.html?status=C";	
	},3000);
});