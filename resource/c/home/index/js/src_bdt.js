/**
 *
 循环滚动
 * 
 */

define(function(require, exports, module) {
	var src={};
	src.left_right=function(tag,un){
		var $ul=$(tag).find("ul"),
			$w=$ul.find("li:first").width();
		//	console.log($w);
		if(!$ul.is(":animated")){
			if(un==1){
				$ul.animate({
					left:-$w
				},300,function(){
					$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
			}else{
				$ul.css({left:-$w}).find("li:last").prependTo($ul);
				$ul.animate({
					left:0
				},300);
			}
		}
	}
	
	module.exports =src;			
});



