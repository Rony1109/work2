/*
* SNS圈子活动_审核图片放大功能
* author: lg
* date  : 2013.2.27
*/
$(function(){
	if (typeof hs == "undefined") hs= null;
	if (hs){
		hs.graphicsDir = 'http://resmanage.csc86.com/js/highslide-4.1.13/highslide/graphics/';
		hs.showCredits = false;
		hs.dimmingOpacity = 0.75;
		hs.align = 'center';
		hs.outlineType = 'rounded-white';
		hs.wrapperClassName = 'draggable-header';
		hs.lang["restoreTitle"] = "点击还原,支持鼠标拖动.";
		ImgZoomFun("a.highslide");
	};
});
function ImgZoomFun(str){
	$(str).on("click", function () {return hs.expand(this);})
}
