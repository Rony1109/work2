/*
* 常用页面切换效果 v1.0
* author: why
* Date: 2012.11.28 10:34
* explain: 需要jQuery
*/

/*
* TAB切换效果(反应对像为显示/隐藏)
*	tab_bs 触发TAB效果对像
*	tab_ps 反应事件对像（可以是多个组）例：["#tab1_p li","#tab1_b div.more a"]
*	type	绑定的事件（多个事件用空格 分开如“click focus”）
*	classname	当前TAB标签添加的样式 (可选)
*	moren 激活的标签位置 默认为0  (可选)
*	callBack 回调函数，第一次参数为当前激活的位置 (可选)
* explain:
*	csc.tabconn("#tab li","#tab>div>li","hover",0,function(i){alert(i)});
*/
csc.tabconn = function(tab_bs,tab_ps,type,classname,moren,callBack){
	var $tab_bs = $(tab_bs);
	if($tab_bs.length<=0){return;}
	var $moren = moren || 0;	
	$($tab_bs.each(function(i){
		$(this).bind(type ? type : "hover",function(){
			try{
				var thistab=$(this);
				thistab.addClass(classname);
				$tab_bs.not(this).removeClass(classname);
				if(tab_ps instanceof Array){
					for (it in tab_ps){
						$($(tab_ps[it]).hide().get(i)).show();
					}
				}else{
					$($(tab_ps).hide().get(i)).show();
				}
				if(typeof(callBack)=="function"){callBack(i)}
			}catch(e){}
			return false;
		})
	}).get($moren)).trigger(type.match(/[^\s\b]+/)[0]);
}