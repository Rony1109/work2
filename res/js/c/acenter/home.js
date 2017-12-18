// 账户中心首页 by lg 2013.07.12

/*
 *widthHover(
 *	id,			事件标签
 *	maxw,		最大宽度
 *	minw		最小宽度
 *);
*/
function widthHover(id){
	var id = $(id).children(),t = t || 300 , m1 = id.outerWidth(true) , m2 = id.children("a").outerWidth(true) , i = 0;
	id.hover(function(){
		if($(this).index()==0){
			id.eq(1).stop();id.eq(2).stop();
			id.eq(1).animate({"left":m1},t);
			id.eq(2).animate({"left":m1+m2},t);
		}else if($(this).index()==1){
			$(this).stop();id.eq(2).stop();
			$(this).animate({"left":m2},t);
			id.eq(2).animate({"left":m1+m2},t);
		}else if($(this).index()==2){
			i=$(this).index();
			id.eq(1).stop();$(this).stop();
			id.eq(1).animate({"left":m2},t);
			$(this).animate({"left":m2*i},t);
		}
	},function(){});
}
$(function(){
	widthHover("#s_img");
});